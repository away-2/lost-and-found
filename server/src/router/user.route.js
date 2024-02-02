// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require('@koa/router')
const router = new Router({ prefix: '/userService' })

// 引入controller层的方法作为回调
const { register,login, loginByEmail } = require('../controller/user.controller')
const { sendVarifyCode } = require('../controller/nodemailer.controller')
// 引入一些要用到的中间件
const { userValidator,loginRequiredInfoValidator  } = require('../middleware/user.middleware')

/**
 * @swagger
 * /userService/register:
 *   post: 
 *     description: 用户注册 
 *     summary: "用户注册♪（＾∀＾●）" 
 *     tags: [用户模块] 
 *     requestBody: {
 *           
 *     }
 *     responses: 
 *       200:
 *         description: 获取数据列表 
 * */
// 注册用户
router.post('/register',userValidator,register)

// 普通登录用户
router.post('/login',loginRequiredInfoValidator,login)


// 发送邮箱验证码
router.get('/sendVarifyCode',sendVarifyCode)

// 根据邮箱登录用户
router.post('/loginByEmail',loginByEmail)


module.exports = router