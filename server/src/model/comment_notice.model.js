const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 评论通知表
const CommentNotice = seq.define('laf_comment_notice', {
  // id会被自动创建
  active_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '主动评论的用户id'
  },
  passive_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '被评论的用户id'
  }
})

// CommentNotice.sync({ force: true })

module.exports = CommentNotice