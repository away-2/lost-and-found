const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 评论通知表
const CommentNotice = seq.define('laf_comment_notice', {
  // id会被自动创建
  comment_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '评论用户id'
  },
  receive_notice_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '收到通知的用户id'
  },
  comment_content: {
    type: DataTypes.TEXT,
    comment: '评论的内容'
  },
  source_title: {
    type: DataTypes.TEXT,
    comment: '所在沸点或帖子的内容'
  },
  source_pictures: {
    type: DataTypes.STRING,
    comment: '所在沸点或帖子的图片内容'
  },
  source_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '所在沸点或帖子的id'
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '评论的id'
  },
  reply_id: {
    type: DataTypes.INTEGER,
    comment: '如果为空,说明是直接评论了沸点或帖子, 不为空, 说明是回复了在沸点里的哪个一级评论'
  },
  comment_type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论的类型, 是 沸点的评论 or 沸点 or 帖子...'
  }
})

// CommentNotice.sync({ force: true })

module.exports = CommentNotice