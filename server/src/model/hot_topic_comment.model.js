const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model') 
const HotTopic = require('./hot_topic.model')

// 沸点评论表，这里全是顶级评论表
const HotTopicComment = seq.define('laf_hot_topic_commnet',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '评论的用户id'   
    // },
    // hot_topic_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '沸点id'
    // },
    reply_id: {
        type: DataTypes.INTEGER,
        comment: '回复的哪个评论的id, 为空就代表这个评论是最外层的一级评论'
    },
    // reply_user_id: {
    //     type: DataTypes.INTEGER,
    //     comment: '回复的是评论里的哪个用户'
    // },
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

User.belongsToMany(HotTopic,{
    through: HotTopicComment,
    foreignKey: 'user_id',
    otherKey: 'hot_topic_id'
})
HotTopic.belongsToMany(User,{
    through: HotTopicComment,
    foreignKey: 'hot_topic_id',
    otherKey: 'user_id'
})
User.belongsToMany(HotTopic,{
    through: HotTopicComment,
    foreignKey: 'reply_user_id',
    otherKey: 'hot_topic_id'
})

// HotTopicComment.sync({ force: true })

module.exports = HotTopicComment