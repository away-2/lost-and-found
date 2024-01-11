const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../constant/env')

// 验证用户信息
const auth = async (ctx,next) => {
    try {
        const token = ctx.headers['laf-token']
        const user = jwt.verify(token,JWT_SECRET)
        // 把用户信息注入到state中，以便后续处理函数使用
        ctx.state.user = user
    } catch (err) {
        // 这里是几种错误的情况
        // 1. token过期 TokenExpiredError 2. 无效token ....
        switch (err.name) {
            case 'TokenExpiredError':
                console.log("日志: token过期");
                // 抛出http状态码401
                ctx.response.status = 401
                ctx.body = {
                    message: 'token过期'
                }
                return;
            case 'JsonWebTokenError':
                console.log("日志: 无效token");
                // 抛出http状态码401
                ctx.response.status = 401
                ctx.body = {
                    message: '无效token'
                }
                return;
            default:
                console.log("日志: 验证token出错");
                ctx.response.status = 401
                ctx.body = {
                    message: '验证token出错'
                }
        }
        await next()
    }
}

module.exports = {
    auth
}