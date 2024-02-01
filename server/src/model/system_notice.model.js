const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 系统通知表
const SystemNotice = seq.define('laf_system_notice',{
    // id会被自动创建
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '消息内容'
    },
})

// SystemNotice.sync({ force: true })

module.exports = SystemNotice