const { createSixNum } = require('../tools/index')
const { searchUsersByCondition } = require('../service/user.service')
const nodemail = require('./nodemailer')


class NodemailerController {
    async sendVarifyCode(ctx, next) {
        // 前端传过来的邮箱
        const email = ctx.query.email
        const users = await searchUsersByCondition({ logicOpt: 'and', whereArr: [{ email }] })
        if(users.length === 0) {
            ctx.body = {
                code: 500,
                message: '登录邮箱不存在, 请检查!'
            }
            return
        }
        const randomCode = createSixNum()
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