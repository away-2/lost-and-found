const Router = require('@koa/router')

const userRouter = require('./user.route')
const topicRouter = require('./topic.route')
const uploadRouter = require('./upload.route')
const noticeRouter = require('./notice.route')
const enumRouter = require('./enum.route')

const router = new Router({
    prefix: '/api'
})

router.use(userRouter.routes()).use(topicRouter.routes()).use(uploadRouter.routes()).use(noticeRouter.routes()).use(enumRouter.routes())

module.exports = router