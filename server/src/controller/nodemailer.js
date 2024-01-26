const nodemailer = require('nodemailer')

// 创建一个SMTP服务器
const config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: 'thy2934386052@163.com',
        pass: 'TKSQPFRVUKDMBCNG'
    }
}

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config)

// 发送邮件
module.exports = (mail)=> {
    transporter.sendMail(mail,(error,info)=> {
        if(error) {
            return console.log(error)
        }
        console.log('mail sent',info.response)
    })
}