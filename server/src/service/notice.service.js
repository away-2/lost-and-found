const CommentNotice = require("../model/comment_notice.model")
const IncreaseFansNotice = require("../model/increase_fans_notice.model")
const User = require('../model/user.model')
const UserConcernRelation = require("../model/user_concern_relation.model");
const LikeConcernNotice = require('../model/like_conern_notice.model')
const { Op } = require('sequelize')

class CommentService {
    // 查询指定用户所有新增粉丝通知
    async searchUserIncreaseFansNotice(user_id) {
        const notices = await IncreaseFansNotice.findAll({
            where: {
                userId: user_id 
            },
            order: [['createdAt','desc']],
            raw: true
        })
        const allFanIds = notices.map(r => r.fanId)
        const allFansInfo = await User.findAll({
            where: {
                id: {
                    [Op.in]: allFanIds
                }
            },
            raw: true
        })
        const concernFanIds = (await UserConcernRelation.findAll({
            where: {
                activeUserId: user_id,
                passiveUserId: {
                    [Op.in]: allFanIds
                }
            },
            raw: true
        })).map(r => r.passiveUserId)
        const result = notices.map(notice => {
            const obj = {}
            Object.assign(obj,notice)
            obj.fanUserInfo = allFansInfo.find(r => r.id === notice.fanId)
            obj.alreadyConcernFan = concernFanIds.includes(notice.fanId)
            return obj
        })
        return result
    }
    // 查询指定用户所有评论通知
    async searchUserCommentNotice(user_id) {
        const notices = await CommentNotice.findAll({
            where: {
                receive_notice_user_id: user_id
            },
            order: [['createdAt','desc']],
            raw: true
        })
        const allCommentUserInfo = await User.findAll({
            where: {
                id: {
                    [Op.in]: notices.map(r => r.comment_user_id)
                }
            },
            raw: true
        })
        const result = notices.map(notice => {
            const obj = {}
            Object.assign(obj,notice)
            const commentUserInfo = allCommentUserInfo.find(r => r.id === notice.comment_user_id)
            obj.commentUserInfo = { real_name: '已注销用户', avator: 'http://localhost:3100/upload/init_avator.jpg' }
            if(commentUserInfo) {
                obj.commentUserInfo = commentUserInfo
            }
            return obj
        })
        return result
    }
    // 查询指定用户所有赞和收藏通知
    async searchUserLikeAndCollectNotice(user_id) {
        const notices = await LikeConcernNotice.findAll({
            where: {
                receive_notice_user_id: user_id
            },
            order: [['createdAt','desc']],
            raw: true
        })
        const allActiveUserInfo = await User.findAll({
            where: {
                id: {
                    [Op.in]: notices.map(r => r.active_user_id)
                }
            },
            raw: true
        })
        const result = notices.map(notice => {
            const obj = {}
            Object.assign(obj,notice)
            const activeUserInfo = allActiveUserInfo.find(r => r.id === notice.active_user_id)
            obj.activeUserInfo = { real_name: '已注销用户', avator: 'http://localhost:3100/upload/init_avator.jpg' }
            if(activeUserInfo) {
                obj.activeUserInfo = activeUserInfo
            }
            return obj
        })
        return result
    }
}

const a = new CommentService()
// a.searchUserIncreaseFansNotice(1)
// a.searchUserCommentNotice(1)

module.exports = new CommentService()