const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const EnumInformation = seq.define('laf_enum_information', {
    // id会被自动创建
    collection_code: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '枚举集合编码'
    },
    collection_label: {
        type: DataTypes.STRING,
        comment: '集合名称'
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '枚举名称'
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '枚举编码'
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '枚举顺序'
    },
    collection_id: {
        type: DataTypes.INTEGER,
        comment: '集合id'
    }
})

// EnumInformation.sync({ force: true })

module.exports = EnumInformation