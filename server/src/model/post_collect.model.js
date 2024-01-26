const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 帖子收藏关系表
const PostCollect = seq.define('ep_post_collect', {
    // id会被自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id",
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "被收藏的帖子id",
    },
})

// PostCollect.sync({ force: true })

module.exports = PostCollect