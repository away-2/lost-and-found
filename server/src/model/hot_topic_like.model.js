const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model') 
const HotTopic = require('./hot_topic.model') 

// 沸点点赞表
const HotTopicLike = seq.define('laf_hot_topic_like',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
})

User.belongsToMany(HotTopic,{
    through: HotTopicLike,
    foreignKey: 'user_id',
    otherKey: 'hot_topic_id',
})
HotTopic.belongsToMany(User,{
    through: HotTopicLike,
    foreignKey: 'hot_topic_id',
    otherKey: 'user_id',
})

// HotTopicLike.sync({ force: true })

module.exports = HotTopicLike

