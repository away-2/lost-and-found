const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型 zd_user => zd_users 会自动转换 可以设置不转换
const USer = seq.define('laf_users',{
    //id会被自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
})

// 如果表已存在且有数据，不要解开注释, 否则表会重新建立
// User.sync({ force: true })

module.exports = USer