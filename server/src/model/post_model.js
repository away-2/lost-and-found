const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 失物招领信息表
const Post = seq.define('laf_post',{
    // id会被自动创建
    classify: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '类型: 0 失物 1 招领'
    },
    thing_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '物品名称'
    },
    thing_describe: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '物品描述'
    },
    thing_pictures: {
        type: DataTypes.STRING,
        comment: '物品图片, [12,13]'
    },
    lost_or_pick_place: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '丢失/拾取地点'
    },
    lost_or_pick_time: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '丢失/拾取时间'
    },
    remark: {
        type: DataTypes.STRING,
        comment: '备注'
    },
    /*
        发布一个帖子的时候，如果用户选择不立即发布(暂存为草稿),那么前端审核状态给我为`未开始审核`，调用新增接口
        如果是选择一个草稿帖子,选择发布，前端传递帖子状态为：正常,且审核状态为：审核中，调用更新接口
        管理员如果选择`审核不通过`，那么前端需传递帖子状态为`草稿`，调用更新接口
        用户在浏览自己`审核不通过`帖子中，要么选择放弃发布此帖子，那就调用delete帖子接口; 要么选择`知道了`，然后调用更新接口，传递审核状态为`未开始审核`
        综上所述：tab栏，支持查询：草稿、审核中、审核不通过、进行中、结束帖子 
        cg代表草稿,where status = "草稿" and audit_state = "未开始审核"
    */
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '帖子状态, 具体取值见枚举表，现主要是几种可能取值 草稿、正常、结束'
    },
    // 审核不通过，
    audit_state: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '审核状态, 具体见枚举表, 现在主要是：未开始审核、审核中、审核通过、审核不通过'
    },
    audit_fail_reason: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '审核不通过理由'
    },
    comment_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '评论数'
    }
})

// Post.sync({ force: true })

module.exports = Post
