const HotTopic = require('../model/hot_topic.model')
const User = require('../model/user.model')
const HotTopicLike = require('../model/hot_topic_like.model')
const UserConcernRelation = require('../model/user_concern_relation.model')
const { Op, where, literal } = require('sequelize')

class HotTopicServices {
    // 根据条件查询沸点列表
    async searchTopicsByPaging({ pageNum, pageSize, audit_state, view_user_id }) {
        const offset = (pageNum - 1) * pageSize
        const whereArr = []
        if (audit_state) {
            whereArr.push({ audit_state })
        }
        const res = await HotTopic.findAndCountAll({
            where: {
                [Op.and]: whereArr
            },
            limit: pageSize,
            offset,
            include: [{
                model: User,
                as: 'user'
            }],
            order: [
                ["createdAt", "desc"]
            ],
            raw: true
        })
        const hotTopicList = res.rows
        const total = res.count
        const publish_user_ids = hotTopicList.map(item => item['user.id'])
        const hotTopicIds = hotTopicList.map(item => item.id)
        // 在沸点喜欢表中查: 点赞的用户是观看的用户并且沸点是这些列表中的
        const view_user_like_topics = await HotTopicLike.findAll({
            where: {
                [Op.and]: [
                    {
                        hot_topic_id: {
                            [Op.in]: hotTopicIds
                        }
                    },
                    {
                        user_id: view_user_id
                    }
                ]
            },
            raw: true
        })
        // 在用户关注表中查: 主动关注的用户是观看者, 被关注的用户是发布者
        const view_user_concern_users = await UserConcernRelation.findAll({
            where: {
                [Op.and]: [
                    {
                        passiveUserId: {
                            [Op.in]: publish_user_ids
                        }
                    },
                    {
                        activeUserId: view_user_id
                    }
                ]
            },
            raw: true
        })
        hotTopicList.forEach(hotTopic => {
            // 处理观看的用户对这个沸点点赞过没有
            hotTopic.already_like = false
            if (view_user_like_topics.find(item => item.hot_topic_id === hotTopic.id)) {
                hotTopic.already_like = true
            }
            // 构建publish_user
            let userObj = {}
            Object.keys(hotTopic).forEach(key => {
                if (key.includes('user.')) {
                    if (key.split('.')[1] !== 'password') {
                        userObj[key.split('.')[1]] = hotTopic[key]
                    }
                    Reflect.deleteProperty(hotTopic, key)
                }
            })
            // 处理观看的用户对这个沸点的发布者关注了没有
            hotTopic.publish_user = userObj
            hotTopic.already_concern_publish_user = false
            if (view_user_concern_users.find(item => item.passiveUserId === hotTopic.publish_user.id)) {
                hotTopic.already_concern_publish_user = true
            }
        })
        return {
            hotTopicList,
            total
        }
    }
    // 添加一条沸点
    async insertOneTopic(topic) {
        const topicAfterInsert = await HotTopic.create(topic)
        return topicAfterInsert
    }
    // 修改沸点
    async modifyTopic(topic, whereObj) {
        await HotTopic.update(topic, { where: whereObj })
    }
    // 删除沸点
    async deleteTopic(id) {
        // 其他有关系的表的记录会自动删除
        await HotTopic.destroy({ where: { id } })
    }
    // 点赞沸点
    async likeTopic(user_id,topic_id) {
        // 查出这个用户对这个沸点是否已点赞
        const res = await HotTopicLike.findAll({
            where: {
                user_id,
                hot_topic_id: topic_id
            },
            raw: true
        })
        // 如果该用户已经点赞了该沸点，则不管
        if(res.length >= 1) {
            return
        }
        // first step: 点赞关系表中存入记录
        await HotTopicLike.create({
            user_id,
            hot_topic_id: topic_id
        })
        // second step: 给点赞数+1
        await HotTopic.update(
            {
                like_number: literal("like_number + 1")
            },
            {
                where: {
                    id: topic_id
                }
            }
        )
    }
    // 取消点赞沸点
     async cancelLikeTopic(user_id,topic_id) {
        // 查出这个用户对这个沸点是否已点赞
        const res = await HotTopicLike.findAll({
            where: {
                user_id,
                hot_topic_id: topic_id
            },
            raw: true
        })
        // 如果该用户本来就没点赞该沸点，则不管
        if(res.length === 0) {
            return
        }
        // first step: 点赞关系表中删除记录
        await HotTopicLike.destroy({
            where: {
                user_id,
                hot_topic_id: topic_id
            }
        })
        // second step: 给点赞数-1
        await HotTopic.update(
            {
                like_number: literal("like_number - 1")
            },
            {
                where: {
                    id: topic_id
                }
            }
        )
    }
    
}

const a = new HotTopicServices()
// a.searchTopicsByPaging({ pageSize: 10, pageNum: 1, view_user_id: 4 })
// a.insertOneTopic({ user_id: 1,content: '好好好好222222' })
// a.modifyTopic({ content: '好好好好33333' }, { id: 8 })
// a.deleteTopic(12)

module.exports = new HotTopicServices()