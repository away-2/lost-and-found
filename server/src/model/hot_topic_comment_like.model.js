const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 沸点评论点赞关系表
const HotTopicCommentLike = seq.define("laf_hot_topic_comment_like",{
    user_id: {
        type: DataTypes.INTEGER,
        comment: '点赞用户的id'
    },
    comment_id: {
        type: DataTypes.INTEGER,
        comment: '点赞的评论id'
    }
})

// HotTopicCommentLike.sync({ force: true })

module.exports = HotTopicCommentLike