import request from '@/utils/request'

// 学号登录
export const loginByCode = (data) => {
    return request({
        url: '/userService/login',
        method: 'post',
        data
    })
}

// 邮箱登录
export const loginByEmail = (data) => {
    return request({
        url: '/userService/loginByEmail',
        method: 'post',
        data
    })
}

// 邮箱登录时后端返回的验证码
export const getVerifyCodeByEmail = (data) => {
    return request({
        url: `/userService/sendVarifyCode?email=${data}`,
        method: 'get'
    })
}