const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const UserConcernRelation = seq.define('laf_user_concern_relation',{
    // id会被自动创建
    active_concern_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '主动关注的一方'
    },
    passive_concern_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被关注的一方'
    }
})

// UserConcernRelation.sync({ force: true })

module.exports = UserConcernRelation