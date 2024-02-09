// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require('@koa/router')
const router = new Router({ prefix: '/topicService' })

// 引入controller层的方法作为回调
const { findTopicListByPaging, publishHotTopic, changeTopicAuditStatus } = require('../controller/topic.controller')
// 引入一些要用到的中间件
const { auth  } = require('../middleware/auth.middleware')

// 分页查询沸点列表
router.post('/findTopicListByPaging',auth,findTopicListByPaging)

// 发布沸点
router.post('/publishHotTopic',auth,publishHotTopic)

// 修改沸点审核状态
router.post('/changeTopicAuditStatus',auth,changeTopicAuditStatus)


module.exports = router