const Router = require('@koa/router')

const userRouter = require('./user.route')

const router = new Router({
    prefix: '/api'
})

router.use(userRouter.routes())

module.exports = router