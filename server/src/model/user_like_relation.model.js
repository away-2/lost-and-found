const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')

const UserLikeRelation = seq.define('laf_user_like_relation',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // active_like_user: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '主动点赞的一方',
        
    // },
    // passive_like_user: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '被点赞的一方'
    // }
})

User.belongsToMany(User,{
    through: UserLikeRelation,
    foreignKey: 'activeUserId',
    as: 'activeLike'
})

User.belongsToMany(User,{
    through: UserLikeRelation,
    foreignKey: 'passiveUserId',
    as: 'passiveLike'
})

// UserLikeRelation.sync({ force: true })

module.exports = UserLikeRelation