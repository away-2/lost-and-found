const { DataTypes, STRING } = require('sequelize') 
const seq = require('../db/seq')
const User = require('../model/user.model')

// 沸点表
const HotTopic = seq.define('laf_hot_topic',{
    // id会被自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '沸点所属用户id'
    },
    content: {
        type: DataTypes.TEXT,
        comment: '内容, 前端限字数500'
    },
    pictures: {
        type: DataTypes.STRING,
        comment: '图片,[地址1,地址2]'
    },
    like_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '点赞数'
    },
    remark_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '评论数'
    },
    audit_state: {
        type: DataTypes.STRING,
        defaultValue: 'auditing',
        comment: '状态: auditing、pass、fail'
    }
})

HotTopic.belongsTo(User,{ as: 'user', foreignKey: 'user_id', targetKey: 'id' })

// HotTopic.sync({ force: true })

module.exports = HotTopic