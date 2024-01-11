
// note: 该方法检测注册的用户信息是否正确, 主要是检查必填项
const userValidator = async (ctx, next) => {
    const { user_name } = ctx.request.body

    // 检查是否没有
    if (!user_name) {
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

module.exports = {
    userValidator
}