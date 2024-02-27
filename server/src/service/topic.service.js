const HotTopic = require("../model/hot_topic.model");
const User = require("../model/user.model");
const HotTopicLike = require("../model/hot_topic_like.model");
const UserConcernRelation = require("../model/user_concern_relation.model");
const { Op, where, literal, Sequelize } = require("sequelize");
const seq = require("../db/seq");

class HotTopicServices {
  // 根据条件查询沸点列表
  async searchTopicsByPaging({ pageNum, pageSize, audit_state, belong_user, topic_id, classify, view_user_id }) {
    // where、order、分页条件整合
    const offset = (pageNum - 1) * pageSize;
    const whereArr = [];
    if (audit_state) {
      whereArr.push({ audit_state });
    }
    // 默认按照沸点发布时间降序排序
    let order = [["createdAt", "desc"]]
    // 热门沸点
    if (classify === 'hot') {
      order = [['remark_number', 'desc'], ['like_number', 'desc']]
    }
    // 关注沸点
    if (classify === 'concern') {
      // 先把view_user_id关注的用户ids统计出来
      let concernUserIds = (await UserConcernRelation.findAll({
        where: {
          activeUserId: view_user_id
        },
        raw: true
      })).map(item => item.passiveUserId)
      whereArr.push({ user_id: { [Op.in]: concernUserIds } })
    }
    // 属于哪个用户的沸点
    if(belong_user) {
      whereArr.push({ user_id: belong_user })
    }
    // 只查询哪个沸点
    if(topic_id) {
      whereArr.push({ id: topic_id })
    }
    // 开始查询基础的沸点数据
    const res = await HotTopic.findAndCountAll({
      where: {
        [Op.and]: whereArr,
      },
      limit: pageSize,
      offset,
      include: [
        {
          model: User,
          as: "user",
        },
      ],
      order,
      raw: true,
    });
    const hotTopicList = res.rows;
    const total = res.count;
    const publish_user_ids = hotTopicList.map((item) => item["user.id"]);
    const hotTopicIds = hotTopicList.map((item) => item.id);
    // 在沸点喜欢表中查: 点赞的用户是观看的用户并且沸点是这些列表中的
    const view_user_like_topics = await HotTopicLike.findAll({
      where: {
        [Op.and]: [
          {
            hot_topic_id: {
              [Op.in]: hotTopicIds,
            },
          },
          {
            user_id: view_user_id,
          },
        ],
      },
      raw: true,
    });
    // 在沸点喜欢表中查: 分页查询出来的每个沸点列表的前三个点赞的用户
    const likeHotTopicUsers = await seq.query(
      "select id,user_id,hot_topic_id from (select id,user_id,hot_topic_id,ROW_NUMBER() OVER(PARTITION BY hot_topic_id) AS rn from laf_hot_topic_likes where hot_topic_id in (:hot_topic_id)) AS t where t.rn <=3",
      {
        replacements: { hot_topic_id: hotTopicIds.length > 0 ? hotTopicIds : [-1] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // 收集id
    let likeHotTopicUserIds = likeHotTopicUsers.map(item => item.user_id)
    // 去重id
    likeHotTopicUserIds = likeHotTopicUserIds.filter((item, index) => likeHotTopicUserIds.indexOf(item, 0) === index)
    const likeHotTopicUserInfo = await User.findAll({
      where: {
        id: {
          [Op.in]: likeHotTopicUserIds
        }
      },
      raw: true
    })
    // 在用户关注表中查: 主动关注的用户是观看者, 被关注的用户是发布者
    const view_user_concern_users = await UserConcernRelation.findAll({
      where: {
        [Op.and]: [
          {
            passiveUserId: {
              [Op.in]: publish_user_ids,
            },
          },
          {
            activeUserId: view_user_id,
          },
        ],
      },
      raw: true,
    });
    hotTopicList.forEach((hotTopic) => {
      // 整理每个沸点前三个点赞的用户的信息
      const likeUsers = []
      likeHotTopicUsers.filter(item => item.hot_topic_id === hotTopic.id).forEach(likeItem => {
        likeUsers.push(likeHotTopicUserInfo.find(r => r.id === likeItem.user_id))
      })
      hotTopic.rankLikeUsers = likeUsers
      // 处理观看的用户对这个沸点点赞过没有
      hotTopic.already_like = false;
      if (
        view_user_like_topics.find((item) => item.hot_topic_id === hotTopic.id)
      ) {
        hotTopic.already_like = true;
      }
      // 构建publish_user
      let userObj = {};
      Object.keys(hotTopic).forEach((key) => {
        if (key.includes("user.")) {
          if (key.split(".")[1] !== "password") {
            userObj[key.split(".")[1]] = hotTopic[key];
          }
          Reflect.deleteProperty(hotTopic, key);
        }
      });
      // 处理观看的用户对这个沸点的发布者关注了没有
      hotTopic.publish_user = userObj;
      hotTopic.already_concern_publish_user = false;
      if (
        view_user_concern_users.find(
          (item) => item.passiveUserId === hotTopic.publish_user.id
        )
      ) {
        hotTopic.already_concern_publish_user = true;
      }
    });
    console.log(hotTopicList);
    return {
      hotTopicList,
      total,
    };
  }
  // 添加一条沸点
  async insertOneTopic(topic) {
    const topicAfterInsert = await HotTopic.create(topic);
    return topicAfterInsert;
  }
  // 修改沸点
  async modifyTopic(topic, whereObj) {
    await HotTopic.update(topic, { where: whereObj });
  }
  // 删除沸点
  async deleteTopic(id) {
    // 其他有关系的表的记录会自动删除
    await HotTopic.destroy({ where: { id } });
  }
  // 点赞沸点
  async likeTopic(user_id, topic_id) {
    // 查出这个用户对这个沸点是否已点赞
    const res = await HotTopicLike.findAll({
      where: {
        user_id,
        hot_topic_id: topic_id,
      },
      raw: true,
    });
    // 如果该用户已经点赞了该沸点，则不管
    if (res.length >= 1) {
      return;
    }
    // first step: 点赞关系表中存入记录
    await HotTopicLike.create({
      user_id,
      hot_topic_id: topic_id,
    });
    // second step: 给点赞数+1
    await HotTopic.update(
      {
        like_number: literal("like_number + 1"),
      },
      {
        where: {
          id: topic_id,
        },
      }
    );
  }
  // 取消点赞沸点
  async cancelLikeTopic(user_id, topic_id) {
    // 查出这个用户对这个沸点是否已点赞
    const res = await HotTopicLike.findAll({
      where: {
        user_id,
        hot_topic_id: topic_id,
      },
      raw: true,
    });
    // 如果该用户本来就没点赞该沸点，则不管
    if (res.length === 0) {
      return;
    }
    // first step: 点赞关系表中删除记录
    await HotTopicLike.destroy({
      where: {
        user_id,
        hot_topic_id: topic_id,
      },
    });
    // second step: 给点赞数-1
    await HotTopic.update(
      {
        like_number: literal("like_number - 1"),
      },
      {
        where: {
          id: topic_id,
        },
      }
    );
  }
  // 查询指定沸点的所有点赞用户
  async searchAllUserOfLikeTopic(topic_id,view_user_id) {
    const likeTopicUserIds = (await HotTopicLike.findAll({
      where: {
        hot_topic_id: topic_id
      },
      raw: true,
    })).map(item => item.user_id)
    const concernList = await UserConcernRelation.findAll({
      where: {
        activeUserId: view_user_id,
        passiveUserId: {
          [Op.in]: likeTopicUserIds
        }
      },
      raw: true
    })
    // 点赞者的信息
    const userInfos = await User.findAll({
      where: {
        id: {
          [Op.in]: likeTopicUserIds
        }
      },
      raw: true
    })
    const result = []
    likeTopicUserIds.forEach(likerId => {
      const obj = {}
      // 观看的用户是否关注了这个点赞者
      obj.alreadyLike = false
      if(concernList.find(item => item.passiveUserId === likerId)) {
        obj.alreadyLike = true
      }
      obj.likerInfo = userInfos.find(item => item.id === likerId)
      result.push(obj)
    })
    return result
  }
}

const a = new HotTopicServices();
// a.searchAllUserOfLikeTopic(2,1)
// a.searchTopicsByPaging({ pageSize: 10, pageNum: 1, topic_id: 7, view_user_id: 1 });
// a.insertOneTopic({ user_id: 1,content: '好好好好222222' })
// a.modifyTopic({ content: '好好好好33333' }, { id: 8 })
// a.deleteTopic(12)

module.exports = new HotTopicServices();
