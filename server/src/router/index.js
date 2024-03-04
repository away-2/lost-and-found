const Router = require('@koa/router')

const userRouter = require('./user.route')
const topicRouter = require('./topic.route')
const uploadRouter = require('./upload.route')
const noticeRouter = require('./notice.route')

const router = new Router({
    prefix: '/api'
})

router.use(userRouter.routes()).use(topicRouter.routes()).use(uploadRouter.routes()).use(noticeRouter.routes())

module.exports = router