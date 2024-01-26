const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const School = require('./school.model')

const StudentCode = seq.define('laf_student_code',{
    // id会被自动创建
    code: {
        // 规定: 2019xxxxx
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '学号'
    },
    real_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '学生真实姓名'
    },
    sex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '性别,必填,0 女,1 男'
    },
    grade: {
        type: DataTypes.STRING,
        comment: '这个学号对应的年级'
    },
    school_id: {
        type: DataTypes.INTEGER,
        comment: '学校外键'
    }
})

StudentCode.belongsTo(School,{ as: 'school', foreignKey: 'school_id', targetKey: 'id' })

// StudentCode.sync({ force: true })

module.exports = StudentCode
