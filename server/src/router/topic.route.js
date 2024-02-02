// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require('@koa/router')
const router = new Router({ prefix: '/topicService' })

// 引入controller层的方法作为回调
const { findTopicListByPaging } = require('../controller/topic.controller')
// 引入一些要用到的中间件
const { auth  } = require('../middleware/auth.middleware')

// 根据邮箱登录用户
router.post('/findTopicListByPaging',auth,findTopicListByPaging)


module.exports = router