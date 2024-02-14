const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')

// 新增粉丝通知表
const IncreaseFansNotice = seq.define('laf_increase_fans_notice',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // fan_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '粉丝id'
    // },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '被关注的用户id'
    // },
    concern_way: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '前端会给关注接口传入这个字段, 关注途径, 枚举'
    }
})

User.belongsToMany(User,{
    through: IncreaseFansNotice,
    foreignKey: 'fanId',
    as: 'fan'
})

User.belongsToMany(User,{
    through: IncreaseFansNotice,
    foreignKey: 'userId',
    as: 'getConcern'
})

// IncreaseFansNotice.sync({ force: true })

module.exports = IncreaseFansNotice