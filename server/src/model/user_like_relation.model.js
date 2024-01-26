const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const UserLikeRelation = seq.define('laf_user_like_relation',{
    // id会被自动创建
    active_like_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '主动点赞的一方'
    },
    passive_like_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被点赞的一方'
    }
})

// UserLikeRelation.sync({ force: true })

module.exports = UserLikeRelation