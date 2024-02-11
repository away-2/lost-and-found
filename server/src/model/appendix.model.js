const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Appendix = seq.define('laf_appendix',{
    // id会被自动创建
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文件名'
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文件路径'
    },
    file_size: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        comment: '文件大小'
    }
})

// Appendix.sync({ force: true })

module.exports = Appendix
