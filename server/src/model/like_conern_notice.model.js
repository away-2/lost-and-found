const { DataTypes } = require('sequelize')
const seq = require('../db/seq') 

// 赞和收藏通知表
const LikeConcernNotice = seq.define('laf_like_concern_notice',{
    // id会被自动创建
    active_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '主动点赞评论或收藏帖子的用户id'
    },
    receive_notice_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '收到通知的用户id'
    },
    source_id: {
        type: DataTypes.INTEGER,
        comment: '沸点的id'
    },
    source_title: {
        type: DataTypes.TEXT,
        comment: '所在沸点或帖子的内容'
    },
    source_pictures: {
        type: DataTypes.STRING,
        comment: '所在沸点或帖子的图片'
    },
    comment_id: {
        type: DataTypes.INTEGER,
        comment: '评论id'
    },
    comment_content: {
        type: DataTypes.TEXT,
        comment: '评论内容'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '赞和收藏的类型'
    },
    read_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
        comment: '阅读状态,0代表未读,1代表已读'
    }
})

const a =[
    // 收藏你的帖子
    {
        active_user: {
            name: 'xxx'
        },
        source_id: 2,
        picture: null,
        title: "类型: 失物, 物品: xxxx, 地点: xxxxxx, 时间: xxx",
        comment: null,
        op_str: 'concern,post'
    },
    // 赞了你的评论，并且这个评论是属于帖子里的
    {
        active_user: {
            name: 'xxx'
        },
        source_id: 10,
        picture: null,
        title: "类型: 失物, 物品: xxxx, 地点: xxxxxx, 时间: xxx",
        comment: "赞的你的评论的内容",
        op_str: 'like,post,comment'
    },
    // 赞了你的沸点
    {
        active_user: {
            name: 'xxx'
        },
        source_id: 29,
        picture: "xxxx",
        title: "沸点的content",
        comment: null,
        op_str: 'like,topic'
    },
    // 赞了你的评论，并且这个评论是属于沸点里的
    {
        active_user: {
            name: 'xxx'
        },
        source_id: 89,
        picture: "xxx",
        title: "xxx",
        comment: "赞的你的评论的内容",
        op_str: 'like,topic,comment'
    }
]

// LikeConcernNotice.sync({ force: true })

module.exports = LikeConcernNotice