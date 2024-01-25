const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 失物招领帖子评论表
const PostComment = seq.define('laf_post_commnet',{
    // id会被自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '评论的用户id'   
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '失物招领帖子id'
    },
    reply_id: {
        type: DataTypes.INTEGER,
        comment: '回复的哪个评论的id, 为空就代表这个评论是最外层的一级评论'
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
    like_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '评论的点赞数'
    }
})

// PostComment.sync({ force: true })

module.exports = PostComment