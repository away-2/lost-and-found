const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')

const UserConcernRelation = seq.define('laf_user_concern_relation',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // active_concern_user: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '主动关注的一方'
    // },
    // passive_concern_user: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '被关注的一方'
    // }
})

User.belongsToMany(User,{
    through: UserConcernRelation,
    foreignKey: 'activeUserId',
    as: 'activeConcern'
})

User.belongsToMany(User,{
    through: UserConcernRelation,
    foreignKey: 'passiveUserId',
    as: 'passiveConcern'
})

// UserConcernRelation.sync({ force: true })

module.exports = UserConcernRelation