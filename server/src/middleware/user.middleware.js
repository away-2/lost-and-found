const { checkRequriedFieldInObj } = require('../tools/index')

// note: 该方法检测注册的用户信息是否正确, 主要是检查必填项
const userValidator = async (ctx, next) => {
    const userObject = ctx.request.body
    // 简单检查一下必填项
    // 需要检查必填的字段
    const needCheckFields = ["user_name", "password", "email", "sex", "real_name", "avator", "student_code"]
    let flag = true
    needCheckFields.forEach(checkField => {
        if (userObject[checkField] === undefined || userObject[checkField] === null) {
            flag = false;
        }
    })
    if (!flag) {
        console.error('日志：用户信息有必填项为空')
        // 设置http状态码
        ctx.response.status = 400
        ctx.body = {
            message: '用户信息有必填项为空'
        }
        return
    }
    await next()
}

// 检测登录信息需要的字段是否完整
const loginRequiredInfoValidator = async (ctx, next) => {
    let isRight = checkRequriedFieldInObj(['user_name', 'password', 'identity'], ctx.request.body)
    if (isRight) {
        await next()
    } else {
        console.error('日志：登录有必填项为空')
        ctx.response.status = 400
        ctx.body = {
            message: '登录信息不完整'
        }
    }
}


module.exports = {
    userValidator,
    loginRequiredInfoValidator
}