const Router = require('@koa/router')

const userRouter = require('./user.route')
const topicRouter = require('./topic.route')

const router = new Router({
    prefix: '/api'
})

router.use(userRouter.routes()).use(topicRouter.routes())

module.exports = router