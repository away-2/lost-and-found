import { DataTypes } from 'sequelize'
import seq from '../db/seq'

// 赞和收藏通知表，赞是指你在哪个帖子里发布的评论被赞了，收藏是指你发布的哪个帖子被收藏了
const LikeConcernPostNotice = seq.define('laf_like_concern_post_notice',{
    // id会被自动创建
    active_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '主动点赞评论或收藏帖子的用户id'
    },
    passive_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被点赞评论或收藏帖子的用户id'
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被点赞评论所在的帖子id或被收藏帖子id'
    },
    op_type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '操作类型, 点赞还是收藏, like 或 concern, 不是前端传入, 在帖子收藏接口和评论点赞接口里自己调'
    }
})

// LikeConcernPostNotice.sync({ force: true })

module.exports = LikeConcernPostNotice