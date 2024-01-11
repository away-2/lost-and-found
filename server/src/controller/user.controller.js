// controller负责处理宏观上的逻辑, 细致的操作数据库交给service处理
const { createUser } = require('../service/user.service')

class UserController {
    // 注册
    async register(ctx,next) {
        try {
            // ..... 
            
            ctx.body = {
                code: 200,
                message: '用户注册成功',
                result: {
                    id: 1,
                    user_name: '静态测试'
                }
            }  
        } catch (error) {
            
        }
        
    }
    // 登录
    async login(ctx,next) {
        // 到这里来，说明已经可以登录了, 前面有中间件验证
        const { user } = ctx.request.body
        /*
            next要做的事: 
                根据登录的用户找到完整的用户信息
                将用户信息(除了密码)放入jwt的载荷中
                注册成功token后，把token和用户信息都返回给前端
        */
    }
}

module.exports = new UserController()