const HotTopic = require("../model/hot_topic.model");
const User = require("../model/user.model");
const HotTopicLike = require("../model/hot_topic_like.model");
const UserConcernRelation = require("../model/user_concern_relation.model");
const HotTopicComment = require("../model/hot_topic_comment.model");
const HotTopicCommentLike = require("../model/hot_topic_comment_like.model");
const CommentNotice = require("../model/comment_notice.model");
const LikeConcernNotice = require("../model/like_conern_notice.model");
const { Op, where, literal, Sequelize } = require("sequelize");
const seq = require("../db/seq");

async function handlePureInHotTopicList(hotTopicList,view_user_id) {
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
      replacements: {
        hot_topic_id: hotTopicIds.length > 0 ? hotTopicIds : [-1],
      },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  // 收集id
  let likeHotTopicUserIds = likeHotTopicUsers.map((item) => item.user_id);
  // 去重id
  likeHotTopicUserIds = likeHotTopicUserIds.filter(
    (item, index) => likeHotTopicUserIds.indexOf(item, 0) === index
  );
  const likeHotTopicUserInfo = await User.findAll({
    where: {
      id: {
        [Op.in]: likeHotTopicUserIds,
      },
    },
    raw: true,
  });
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
    const likeUsers = [];
    likeHotTopicUsers
      .filter((item) => item.hot_topic_id === hotTopic.id)
      .forEach((likeItem) => {
        likeUsers.push(
          likeHotTopicUserInfo.find((r) => r.id === likeItem.user_id)
        );
      });
    hotTopic.rankLikeUsers = likeUsers;
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
}

class HotTopicServices {
  // 根据条件查询沸点列表
  async searchTopicsByPaging({
    pageNum,
    pageSize,
    audit_state,
    belong_user,
    topic_id,
    classify,
    view_user_id,
  }) {
    // where、order、分页条件整合
    const offset = (pageNum - 1) * pageSize;
    const whereArr = [];
    if (audit_state) {
      whereArr.push({ audit_state });
    }
    // 默认按照沸点发布时间降序排序
    let order = [["createdAt", "desc"]];
    // 热门沸点
    if (classify === "hot") {
      order = [
        ["remark_number", "desc"],
        ["like_number", "desc"],
      ];
    }
    // 关注沸点
    if (classify === "concern") {
      // 先把view_user_id关注的用户ids统计出来
      let concernUserIds = (
        await UserConcernRelation.findAll({
          where: {
            activeUserId: view_user_id,
          },
          raw: true,
        })
      ).map((item) => item.passiveUserId);
      whereArr.push({ user_id: { [Op.in]: concernUserIds } });
    }
    // 属于哪个用户的沸点
    if (belong_user) {
      whereArr.push({ user_id: belong_user });
    }
    // 只查询哪个沸点
    if (topic_id) {
      whereArr.push({ id: topic_id });
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
    let hotTopicList = res.rows;
    const total = res.count;
    await handlePureInHotTopicList(hotTopicList,view_user_id)
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
    // 最后: 发起赞和收藏通知
    const num = await LikeConcernNotice.count({
      where: {
        active_user_id: user_id,
        source_id: topic_id,
        type: "DZFD",
      },
    });
    // 如果已经有该用户点赞该沸点的通知了，则不发通知
    if (num > 0) {
      return;
    }
    const hotTopic = await HotTopic.findOne({
      where: {
        id: topic_id,
      },
      raw: true,
    });
    // 如果用户点赞的是自己的沸点，则不发通知
    if (user_id === hotTopic.user_id) {
      return;
    }
    const comment = {
      active_user_id: user_id,
      receive_notice_user_id: hotTopic.user_id,
      source_id: hotTopic.id,
      source_title: hotTopic.content,
      source_pictures: hotTopic.pictures,
      type: "DZFD",
    };
    await LikeConcernNotice.create(comment);
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
  async searchAllUserOfLikeTopic(topic_id, view_user_id) {
    const likeTopicUserIds = (
      await HotTopicLike.findAll({
        where: {
          hot_topic_id: topic_id,
        },
        raw: true,
      })
    ).map((item) => item.user_id);
    const concernList = await UserConcernRelation.findAll({
      where: {
        activeUserId: view_user_id,
        passiveUserId: {
          [Op.in]: likeTopicUserIds,
        },
      },
      raw: true,
    });
    // 点赞者的信息
    const userInfos = await User.findAll({
      where: {
        id: {
          [Op.in]: likeTopicUserIds,
        },
      },
      raw: true,
    });
    const result = [];
    likeTopicUserIds.forEach((likerId) => {
      const obj = {};
      // 观看的用户是否关注了这个点赞者
      obj.alreadyConcern = false;
      if (concernList.find((item) => item.passiveUserId === likerId)) {
        obj.alreadyConcern = true;
      }
      obj.likerInfo = userInfos.find((item) => item.id === likerId);
      result.push(obj);
    });
    return result;
  }
  // 分页查询沸点的评论信息
  async searchCommentByPaging({
    pageNum,
    pageSize,
    offset: _offset,
    topic_id,
    classify,
    view_user_id,
  }) {
    const offset = _offset || (pageNum - 1) * pageSize;
    const whereArr = [];
    whereArr.push({ hot_topic_id: topic_id }, { reply_id: null });
    let order = [["createdAt", "desc"]];
    if (classify === "hot") {
      order = [
        ["remark_number", "desc"],
        ["like_number", "desc"],
      ];
    }
    const allFirstLevelComment = await HotTopicComment.findAndCountAll({
      where: {
        [Op.and]: whereArr,
      },
      limit: pageSize,
      offset,
      order,
      raw: true,
    });
    const allSecondLevelComment = await HotTopicComment.findAll({
      where: {
        reply_id: {
          [Op.in]: allFirstLevelComment.rows.map((item) => item.id),
        },
      },
      raw: true,
    });
    // 组织所有评论id，一级和二级的
    const allCommentIds = [
      ...allFirstLevelComment.rows.map((item) => item.id),
      ...allSecondLevelComment.map((item) => item.id),
    ];
    // 查询观看的用户对评论的点赞情况
    const likeCommentIds = (
      await HotTopicCommentLike.findAll({
        where: {
          user_id: view_user_id,
          comment_id: {
            [Op.in]: allCommentIds,
          },
        },
        raw: true,
      })
    ).map((item) => item.comment_id);
    // 组织所有用户id，一级和二级的
    const allUserIds = [
      ...allFirstLevelComment.rows.map((item) => item.user_id),
      ...allSecondLevelComment.map((item) => item.user_id),
    ];
    const allUserInfo = await User.findAll({
      where: {
        id: {
          [Op.in]: allUserIds,
        },
      },
      raw: true,
    });
    const concernUserIds = (
      await UserConcernRelation.findAll({
        where: {
          activeUserId: view_user_id,
          passiveUserId: {
            [Op.in]: allUserInfo.map((item) => item.id),
          },
        },
        raw: true,
      })
    ).map((item) => item.passiveUserId);
    const result = allFirstLevelComment.rows.map((item) => {
      const obj = {};
      Object.assign(obj, item);
      // 处理是否点赞了这个评论
      obj.alreadyLikeComment = likeCommentIds.includes(obj.id);
      obj.commentUserInfo = JSON.parse(
        JSON.stringify(allUserInfo.find((r) => r.id === item.user_id))
      );
      obj.commentUserInfo.alreadyConcern = concernUserIds.includes(
        item.user_id
      );
      // 处理这个一级评论下所有的二级评论
      const replyList = allSecondLevelComment
        .filter((r) => r.reply_id === item.id)
        .map((subItem) => {
          const secondCommentObj = {};
          Object.assign(secondCommentObj, subItem);
          // 处理是否点赞了这个评论
          secondCommentObj.alreadyLikeComment = likeCommentIds.includes(
            secondCommentObj.id
          );
          secondCommentObj.commentUserInfo = JSON.parse(
            JSON.stringify(allUserInfo.find((r) => r.id === subItem.user_id))
          );
          secondCommentObj.commentUserInfo.alreadyConcern =
            concernUserIds.includes(subItem.user_id);
          // 回复的哪个人的相关信息
          secondCommentObj.replyUserInfo = JSON.parse(
            JSON.stringify(
              allUserInfo.find((r) => r.id === subItem.reply_user_id)
            )
          );
          secondCommentObj.replyUserInfo.alreadyConcern =
            concernUserIds.includes(subItem.reply_user_id);
          return secondCommentObj;
        });
      obj.replyList = replyList;
      return obj;
    });
    return {
      topicCommentList: result,
      total: allFirstLevelComment.count,
    };
  }
  // 点赞沸点评论
  async likeTopicComment(user_id, comment_id) {
    // 查出这个用户对这个评论是否已点赞
    const res = await HotTopicCommentLike.count({
      where: {
        user_id,
        comment_id,
      },
    });
    // 如果该用户已经点赞该评论了，则不管
    if (res > 0) {
      return;
    }
    // 第一步: 点赞沸点评论关系表中存入记录
    await HotTopicCommentLike.create({
      user_id,
      comment_id,
    });
    // 第二步: 给所属评论点赞数+1
    await HotTopicComment.update(
      {
        like_number: literal("like_number + 1"),
      },
      {
        where: {
          id: comment_id,
        },
      }
    );
    // 发起赞和收藏通知
    const num = await LikeConcernNotice.count({
      where: {
        active_user_id: user_id,
        comment_id,
        type: "DZFDPL",
      },
    });
    // 如果已经有该用户点赞该沸点的该评论的通知了，则不发通知
    if (num > 0) {
      return;
    }
    const hotTopicComment = await HotTopicComment.findOne({
      where: {
        id: comment_id,
      },
      raw: true,
    });
    // 如果用户点赞的是自己的评论，则不发通知
    if (user_id === hotTopicComment.user_id) {
      return;
    }
    const hotTopic = await HotTopic.findOne({
      where: {
        id: hotTopicComment.hot_topic_id,
      },
      raw: true,
    });
    const comment = {
      active_user_id: user_id,
      receive_notice_user_id: hotTopicComment.user_id,
      source_id: hotTopic.id,
      source_title: hotTopic.content,
      source_pictures: hotTopic.pictures,
      comment_id,
      comment_content: hotTopicComment.content,
      type: "DZFDPL",
    };
    await LikeConcernNotice.create(comment);
  }
  // 取消点赞沸点评论
  async cancelLikeTopicComment(user_id, comment_id) {
    // 查出这个用户对这个沸点是否已点赞
    const res = await HotTopicCommentLike.count({
      where: {
        user_id,
        comment_id,
      },
    });
    // 如果该用户本来就没点赞这个沸点，则不管
    if (res === 0) {
      return;
    }
    // 第一步: 沸点评论点赞关系表中删除记录
    await HotTopicCommentLike.destroy({
      where: {
        user_id,
        comment_id,
      },
    });
    // 第二步: 给点赞数-1
    await HotTopicComment.update(
      {
        like_number: literal("like_number - 1"),
      },
      {
        where: {
          id: comment_id,
        },
      }
    );
  }
  // 根据沸点id检查沸点是否存在
  async checkExistHotTopicById(id) {
    let res = await HotTopic.findOne({
      where: {
        id,
      },
      raw: true,
    });
    if (res === null) {
      return false;
    } else {
      return true;
    }
  }
  // 根据沸点评论id检查沸点评论是否存在
  async checkExistHotTopicCommentById(id) {
    let res = await HotTopicComment.findOne({
      where: {
        id,
      },
      raw: true,
    });
    if (res === null) {
      return false;
    } else {
      return true;
    }
  }
  // 添加一条沸点评论
  async addCommentInHotTopic(comment) {
    // 整理评论通知字段
    const commentNoticeObj = {
      comment_user_id: comment.user_id,
      receive_notice_user_id: comment.reply_id
        ? comment.reply_user_id
        : comment.hotTopic.user_id,
      comment_content: comment.content,
      source_pictures: comment.hotTopic.pictures,
      source_title: comment.hotTopic.content,
      source_id: comment.hotTopic.id,
      comment_id: null,
      reply_id: comment.reply_id || null,
      comment_type: comment.reply_id ? "FDPL" : "FD",
    };
    // 删除不要的字段
    const reallyComment = JSON.parse(JSON.stringify(comment));
    Reflect.deleteProperty(reallyComment, "hotTopic");
    // 沸点评论表插入记录
    const newHotTopicComment = await HotTopicComment.create(reallyComment);
    commentNoticeObj.comment_id = newHotTopicComment.id;
    // 给评论的沸点评论数+1
    await HotTopic.update(
      {
        remark_number: literal("remark_number + 1"),
      },
      {
        where: {
          id: comment.hot_topic_id,
        },
      }
    );
    // 如果是回复的评论，那就给所在的一级评论的评论数+1
    if (comment.reply_id) {
      await HotTopicComment.update(
        {
          remark_number: literal("remark_number + 1"),
        },
        {
          where: {
            id: comment.reply_id,
          },
        }
      );
    }
    // 评论通知表插入记录
    if (
      commentNoticeObj.comment_user_id !==
      commentNoticeObj.receive_notice_user_id
    ) {
      // 如果发布的用户不是回复的自己，就发通知
      await CommentNotice.create(commentNoticeObj);
    }
    return newHotTopicComment;
  }
  // 删除一条沸点评论
  async deleteCommentInHotTopic(comment_id) {
    const res = await HotTopicComment.findOne({
      where: {
        id: comment_id,
      },
      raw: true,
    });
    // 如果这条评论本来就不存在,则不管
    if (!res) {
      return;
    }
    let decreaseLikeNum = 1;
    // 如果是一级评论,则要删除它下面所有的二级评论
    if (!res.reply_id) {
      const replyNum = await HotTopicComment.count({
        where: {
          reply_id: res.id,
        },
      });
      decreaseLikeNum += replyNum;
      await HotTopicComment.destroy({ where: { reply_id: res.id } });
    }
    // 删除本评论
    await HotTopicComment.destroy({ where: { id: comment_id } });
    // 所在沸点评论数减少
    await HotTopic.update(
      {
        remark_number: literal(`remark_number - ${decreaseLikeNum}`),
      },
      {
        where: {
          id: res.hot_topic_id,
        },
      }
    );
    // 如果删除的是二级评论,还得把对应的一级评论的评论数-1
    if (res.reply_id) {
      await HotTopicComment.update(
        {
          remark_number: literal("remark_number - 1"),
        },
        {
          where: {
            id: res.reply_id,
          },
        }
      );
    }
  }
  // 分页查询指定用户点赞的沸点
  async searchUserLikeTopicByPaging({ user_id,view_user_id, pageNum, pageSize }) {
    const offset = (pageNum - 1) * pageSize
    const res = await HotTopicLike.findAndCountAll({
      where: {
        user_id
      },
      limit: pageSize,
      offset,
      order: [['createdAt','desc']],
      raw: true
    })
    let hotTopicList = await HotTopic.findAll({
      where: {
        id: {
          [Op.in]: res.rows.map(r=> r.hot_topic_id)
        }
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
      raw: true
    })
    hotTopicList = res.rows.map(r=> {
      return hotTopicList.find(e=> e.id === r.hot_topic_id)
    })
    await handlePureInHotTopicList(hotTopicList,view_user_id)
    return {
      hotTopicList,
      total: res.count
    }
  }
}

const a = new HotTopicServices();
// a.searchUserLikeTopicByPaging({ user_id: 1, view_user_id: 1, pageNum: 1, pageSize: 5 })
// a.deleteCommentInHotTopic(4)
// a.addCommentInHotTopic({ hotTopic: { id: 20 } }).then(res => console.log(res))
// a.searchCommentByPaging({ pageNum: 1, pageSize: 3, topic_id: 8, view_user_id: 1 })
// a.searchAllUserOfLikeTopic(2,1)
// a.searchTopicsByPaging({ pageSize: 10, pageNum: 1, topic_id: 7, view_user_id: 1 });
// a.insertOneTopic({ user_id: 1,content: '好好好好222222' })
// a.modifyTopic({ content: '好好好好33333' }, { id: 8 })
// a.deleteTopic(12)

module.exports = new HotTopicServices();
