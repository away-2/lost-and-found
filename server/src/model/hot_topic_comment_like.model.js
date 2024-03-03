const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model') 
const HotTopicComment = require('./hot_topic_comment.model') 

// 沸点评论点赞关系表
const HotTopicCommentLike = seq.define("laf_hot_topic_comment_like",{
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     comment: '点赞用户的id'
    // },
    // comment_id: {
    //     type: DataTypes.INTEGER,
    //     comment: '点赞的评论id'
    // }
})

// 取消点赞只需要前端把comment_id给我，用户id一定是登录的这个用户id

User.belongsToMany(HotTopicComment,{
    through: HotTopicCommentLike,
    foreignKey: 'user_id',
    otherKey: 'comment_id',
})
HotTopicComment.belongsToMany(User,{
    through: HotTopicCommentLike,
    foreignKey: 'comment_id',
    otherKey: 'user_id',
})

// HotTopicCommentLike.sync({ force: true })

module.exports = HotTopicCommentLike