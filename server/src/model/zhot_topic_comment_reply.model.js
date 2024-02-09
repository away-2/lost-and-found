const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model') 
const HotTopicComment = require('./hot_topic_comment.model')

// 废弃表
// 沸点评论回复表
const HotTopicCommentReply = seq.define('laf_hot_topic_commnet_reply',{
    // id会被自动创建
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '回复的哪个顶级评论的id'
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

User.belongsToMany(HotTopicComment,{
    through: HotTopicCommentReply,
    foreignKey: 'reply_user_id',
    otherKey: 'comment_id',
})

HotTopicComment.belongsToMany(User,{
    through: HotTopicCommentReply,
    foreignKey: 'comment_id',
    otherKey: 'reply_user_id',
})

// HotTopicCommentReply.sync({ force: true })

module.exports = HotTopicCommentReply