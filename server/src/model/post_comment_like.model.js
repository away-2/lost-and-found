const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 失物招领评论点赞关系表
const PostCommentLike = seq.define("laf_post_comment_like",{
    user_id: {
        type: DataTypes.INTEGER,
        comment: '点赞用户的id'
    },
    comment_id: {
        type: DataTypes.INTEGER,
        comment: '点赞的评论id'
    }
})

// PostCommentLike.sync({ force: true })

module.exports = PostCommentLike