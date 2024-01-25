const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 沸点评论表
const HotTopicComment = seq.define('laf_hot_topic_commnet',{
    // id会被自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '评论的用户id'   
    },
    hot_topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '沸点id'
    },
    reply_id: {
        type: DataTypes.INTEGER,
        comment: '回复的哪个沸点的id, 为空就代表这个评论是最外层的一级评论'
    },
    reply_user_id: {
        type: DataTypes.INTEGER,
        comment: '回复的是评论里的哪个用户'
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '评论内容'
    },
    picture: {
        type: DataTypes.STRING,
        comment: '最多一张图片,存放图片地址'
    },
    like_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '评论的点赞数'
    }
})

// HotTopicComment.sync({ force: true })

module.exports = HotTopicComment