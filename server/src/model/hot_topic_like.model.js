const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 沸点点赞表
const HotTopicLike = seq.define('laf_hot_topic_like',{
    user_id: {
        type: DataTypes.INTEGER,
        comment: '主动点赞的用户id'
    },
    hot_topic_id: {
        type: DataTypes.INTEGER,
        comment: '被点赞的沸点id'
    }
})

// HotTopicLike.sync({ force: true })

module.exports = HotTopicLike

