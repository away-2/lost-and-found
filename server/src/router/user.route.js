// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require('@koa/router')
const router = new Router({ prefix: '/userService' })

// 引入controller层的方法作为回调
const { register } = require('../controller/user.controller')
// 引入一些要用到的中间件
const { userValidator } = require('../middleware/user.middleware')

// 注册用户
router.post('/register',userValidator,register)

module.exports = router