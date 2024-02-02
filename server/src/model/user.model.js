const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型 zd_user => zd_users 会自动转换 可以设置不转换
const USer = seq.define('laf_users',{
    //id会被自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // 注意：unique只是加了一个unique索引，唯一还是要自己判断
        unique: true,
        comment: '用户名'
    },
    nick_name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '昵称'
    },
    school_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '学校名'
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '学院'
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '哪一级的, 比如2019,2020'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        comment: '手机号, 唯一'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '邮箱'
    },
    sex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '性别,必填,0 女,1 男'
    },
    real_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '真实姓名,必填'
    },
    avator: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '头像'
    },
    get_like_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '被点赞量'
    },
    fans_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '被关注量,也就是有多少个粉丝'
    },
    concern_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '关注了多少用户'
    },  
    collect_post_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '收藏了多少个帖子'
    },
    profile: {
        type: DataTypes.STRING,
        comment: '个人简介'
    },
    is_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员,0 不是,1 是'
    },
    is_freeze: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '账号是否被冻结,0 未冻结,1 冻结'
    }
})

// 如果表已存在且有数据，不要解开注释, 否则表会重新建立
// USer.sync({ force: true })

module.exports = USer