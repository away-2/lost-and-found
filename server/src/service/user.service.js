// service层要操作数据库, 这里面的方法会经常被 controoler调用以完成某些功能, 因此这里肯定要引model层来操作表
const { Op, literal } = require('sequelize')
const User = require('../model/user.model')
const UserConcernRelation = require('../model/user_concern_relation.model')
const UserLikeRelation = require('../model/user_like_relation.model')
const IncreaseFansNotice = require('../model/increase_fans_notice.model')
const LikeConcernNotice = require('../model/like_conern_notice.model')
const CommentNotice = require('../model/comment_notice.model')
const HotTopic = require('../model/hot_topic.model')
const StudentCode = require('../model/student_code.model')
const School = require('../model/school.model')
const { handleDotInFieldDueToJoinQuery } = require('../tools/index')

class UserService {
    // 根据条件查找用户
    async searchUsersByCondition({ logicOpt, whereArr }) {
        const res = await User.findAll({
            where: {
                [Op[logicOpt]]: whereArr
            },
            raw: true
        })
        return res
    }
    // 根据用户id查询用户信息
    async searchUserInfoById(user_id) {
        const res = await User.findOne({
            where: {
                id: user_id
            },
            raw: true
        })
        if(res === null) {
            return null
        }
        // 查询发布了多少个沸点
        const publishHotTopicNumber = await HotTopic.count({
            where: {
                user_id
            }
        })
        res.publishHotTopicNumber = publishHotTopicNumber
        // 查询各类未读通知数量
        // 评论通知未读数
        const unreadCommentNoticeNum = await CommentNotice.count({
            where: {
                receive_notice_user_id: user_id,
                read_status: '0'
            }
        })
        res.unreadCommentNoticeNum = unreadCommentNoticeNum
        // 新增粉丝通知未读数
        const unreadIncreaseFansNoticeNum = await IncreaseFansNotice.count({
            where: {
                userId: user_id,
                read_status: '0'
            }
        })
        res.unreadIncreaseFansNoticeNum = unreadIncreaseFansNoticeNum
        // 赞与收藏通知未读数
        const unreadLikeAndConcernNoticeNum = await LikeConcernNotice.count({
            where: {
                receive_notice_user_id: user_id,
                read_status: '0'
            }
        })
        res.unreadLikeAndConcernNoticeNum = unreadLikeAndConcernNoticeNum
        return res
    }
    // 查询传入的activeUser是否已经关注了passiveUser
    async judgeSomeoneAlreadyConcernOther(activeUser, passiveUser) {
        const res = await UserConcernRelation.count({
            where: {
                activeUserId: activeUser,
                passiveUserId: passiveUser
            }
        })
        return res === 0 ? false : true
    }
    // 查询传入的activeUser是否已经点赞了passiveUser
    async judgeSomeoneAlreadyLikeOther(activeUser, passiveUser) {
        const res = await UserLikeRelation.count({
            where: {
                activeUserId: activeUser,
                passiveUserId: passiveUser
            }
        })
        return res === 0 ? false : true
    }
    // 让某个用户关注另一个用户
    async letSomeoneConcernOther(activeUser, passiveUser, concern_way) {
        // 在关注表中存下这条关系
        await UserConcernRelation.create({
            activeUserId: activeUser,
            passiveUserId: passiveUser
        })
        // 给被关注的用户的粉丝量+1
        await User.update(
            {
                fans_number: literal("fans_number + 1")
            },
            {
                where: {
                    id: passiveUser
                }
            }
        )
        // 给主动关注的用户的关注用户数+1
        await User.update(
            {
                concern_number: literal("concern_number + 1")
            },
            {
                where: {
                    id: activeUser
                }
            }
        )
        // 判断如果新增粉丝通知表中如果有activeUser关注了passiveUser的记录则不发通知了
        const res = await IncreaseFansNotice.count({
            where: {
                fanId: activeUser,
                userId: passiveUser
            }
        })
        if (res > 0) {
            return
        }
        // 第一次新增该粉丝，发起通知
        await IncreaseFansNotice.create({
            concern_way,
            fanId: activeUser,
            userId: passiveUser
        })
    }
    // 让某个用户取消关注另一个用户
    async letSomeoneCancelConcernOther(activeUser, passiveUser) {
        // 关注表中删除这个关系
        await UserConcernRelation.destroy({
            where: {
                activeUserId: activeUser,
                passiveUserId: passiveUser
            }
        })
        // 给被关注的用户的粉丝量-1
        await User.update(
            {
                fans_number: literal("fans_number - 1")
            },
            {
                where: {
                    id: passiveUser
                }
            }
        )
        // 给主动关注的用户的关注用户数-1
        await User.update(
            {
                concern_number: literal("concern_number - 1")
            },
            {
                where: {
                    id: activeUser
                }
            }
        )
    }
    // 查询指定用户的一些数量上的信息
    async searchNumberInfoAboutUser(user_id) {
        // 查询关注了多少用户
        const concernNumber = await UserConcernRelation.count({
            where: {
                activeUserId: user_id
            }
        })
        // 查询有多少粉丝
        const fansNumber = await UserConcernRelation.count({
            where: {
                passiveUserId: user_id
            }
        })
        // 查询发布了多少个沸点
        const publishHotTopicNumber = await HotTopic.count({
            where: {
                user_id
            }
        })
        // 查询收藏了多少个帖子(暂时不做)
        const collectPostNumber = 0

        return {
            concernNumber,
            fansNumber,
            publishHotTopicNumber,
            collectPostNumber
        }

    }
    // 根据学号查询该学号以及学校的信息
    async findStudentInfoByStudentCode(code) {
        const res = handleDotInFieldDueToJoinQuery(await StudentCode.findOne({
            include: [{
                model: School,
                as: 'school',
                attributes: ['school_name']
            }],
            where: {
                code
            },
            raw: true
        }))
        return res;
    }
    // 更新用户信息
    async modifyUserInfo({ whereObj, updateObj }) {
        await User.update(updateObj,{ where: whereObj })
    }
    // 查询某个用户的所有关注的用户
    async searchAllConcernUser(user_id,view_user_id) {
        const concernUserList = await UserConcernRelation.findAll({
            where: {
                activeUserId: user_id
            },
            order: [['createdAt','desc']],
            raw: true
        })
        const concernUserInfoList = await User.findAll({
            where: {
                id: {
                    [Op.in]: concernUserList.map(r => r.passiveUserId)
                }
            },
            raw: true
        })
        let viewUserConcernUserIds = concernUserList.map(r => r.passiveUserId)
        if(user_id !== view_user_id) {
            viewUserConcernUserIds = (await UserConcernRelation.findAll({
                where: {
                    activeUserId: view_user_id,
                    passiveUserId: {
                        [Op.in]: concernUserList.map(r => r.passiveUserId)
                    }
                },
                raw: true
            })).map(r => r.passiveUserId)
        } 
        return concernUserList.map(item => {
            const concernUserInfo = concernUserInfoList.find(r => r.id === item.passiveUserId)
            return {
                ...item,
                concernUserInfo,
                alreadyConcern: viewUserConcernUserIds.includes(item.passiveUserId)
            }
        })   
    }
    // 查询某个用户的所有的粉丝
    async searchAllFans(user_id,view_user_id) {
        const fansList = await UserConcernRelation.findAll({
            where: {
                passiveUserId: user_id
            },
            order: [['createdAt','desc']],
            raw: true
        })
        const fansInfoList = await User.findAll({
            where: {
                id: {
                    [Op.in]: fansList.map(r => r.activeUserId)
                }
            },
            raw: true
        })
        const viewUserConcernUserIds = (await UserConcernRelation.findAll({
            where: {
                activeUserId: view_user_id,
                passiveUserId: {
                    [Op.in]: fansList.map(r => r.activeUserId)
                }
            },
            raw: true
        })).map(r => r.passiveUserId)
        return fansList.map(item => {
            const fanUserInfo = fansInfoList.find(r => r.id === item.activeUserId)
            return {
                ...item,
                fanUserInfo,
                alreadyConcern: viewUserConcernUserIds.includes(item.activeUserId)
            }
        })
    }
}

const userService = new UserService()
// userService.searchUserInfoById(1)

module.exports = new UserService()

