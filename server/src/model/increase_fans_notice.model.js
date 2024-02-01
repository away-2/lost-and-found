const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 新增粉丝通知表
const IncreaseFansNotice = seq.define('laf_increase_fans_notice',{
    // id会被自动创建
    fan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '粉丝id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被关注的用户id'
    },
    concern_way: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '前端会给关注接口传入这个字段, 关注途径, 枚举'
    }
})

// IncreaseFansNotice.sync({ force: true })

module.exports = IncreaseFansNotice