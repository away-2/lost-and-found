// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require('@koa/router')
const router = new Router({ prefix: '/topicService' })

// 引入controller层的方法作为回调
const { findTopicListByPaging, publishHotTopic, changeTopicAuditStatus, removeTopicById, handleCancelLikeTopic, handleLikeTopic, findLikeTopicUserList, findTopicInfoById, findTopicCommentByPaging } = require('../controller/topic.controller')
// 引入一些要用到的中间件
const { auth } = require('../middleware/auth.middleware')

// 分页查询沸点列表
router.post('/findTopicListByPaging', auth, findTopicListByPaging)

// 发布沸点
router.post('/publishHotTopic', auth, publishHotTopic)

// 修改沸点审核状态
router.post('/changeTopicAuditStatus', auth, changeTopicAuditStatus)

// 删除沸点
router.delete('/removeTopicById', auth, removeTopicById)

// 点赞沸点
router.post('/likeTopic', auth, handleLikeTopic)

// 取消点赞沸点
router.post('/cancelLikeTopic', auth, handleCancelLikeTopic)

// 查询指定沸点所有点赞者信息
router.get('/findLikeTopicUserList', auth, findLikeTopicUserList)

// 根据沸点id查询沸点详细信息
router.get('/findTopicInfoById', auth, findTopicInfoById)

// 分页查询沸点的评论信息
router.post('/findTopicCommentByPaging',auth,findTopicCommentByPaging)

module.exports = router