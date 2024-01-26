const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const School = seq.define('laf_school',{
    // id会被自动创建
    school_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '学校名'
    },
    school_info: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '学校其他信息'
    }
})

// School.sync({ force: true })

module.exports = School