const { DataTypes, STRING } = require('sequelize') 
const seq = require('../db/seq')

// 沸点表
const HotTopic = seq.define('laf_hot_topic',{
    // id会被自动创建
    content: {
        type: DataTypes.STRING,
        comment: '内容, 前端限字数500'
    },
    pictures: {
        type: DataTypes.STRING,
        comment: '图片,[12,13]'
    },
    like_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '点赞数'
    }
})

// HotTopic.sync({ force: true })

module.exports = HotTopic