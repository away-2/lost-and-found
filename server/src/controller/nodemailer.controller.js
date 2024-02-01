const { createSixNum } = require('../tools/index')
const nodemail = require('./nodemailer')


class NodemailerController {
    async sendVarifyCode(ctx, next) {
        // 前端传过来的邮箱
        const email = ctx.query.email
        const user_name = ctx.query.user_name
        const randomCode = createSixNum()
        const date = new Date()
        const isLive = 'no'
        const mail = {
            // 发件人
            from: '<thy2934386052@163.com>',
            // 主题
            subject: '工程实践管理系统-验证码',
            // 要发送到的邮箱
            to: email,
            // 邮件内容
            text: `<p>您的验证码为 <span style="font-size:'18px'"> ${randomCode} </span>, 小心泄露</p>`
        }
        let res = ''
        // if (!user_name) {
        //     res = await updateUser({ whereObj: { email }, updateObj: { emailCode: randomCode } })
        // } else {
        //     res = await updateUser({ whereObj: { user_name }, updateObj: { emailCode: randomCode } })
        // }
        nodemail(mail)
        ctx.body = {
            code: 200,
            message: '发送验证码成功, 请注意查看邮箱',
            data: {
                emailCode: randomCode
            }
        }
    }
    async verifyCode(ctx, next) {
        // 前端传过来的验证码
        const code = ctx.query.code

    }
}

module.exports = new NodemailerController()