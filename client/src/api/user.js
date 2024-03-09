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

// 查询当前用户是否关注了某个用户
export const checkAlreadyConcernSomeone = (passiveUser) => {
    return request({
        url: `/userService/checkAlreadyConcernSomeone?passiveUser=${passiveUser}`,
        method: 'get'
    })
}

// 查询当前用户是否点赞了某个用户
export const checkAlreadyLikeSomeone = (passiveUser) => {
    return request({
        url: `/userService/checkAlreadyLikeSomeone?passiveUser=${passiveUser}`,
        method: 'get'
    })
}

// 让当前用户关注某个用户
export const concernSomeone = (params) => {
    return request({
        url: `/userService/concernSomeone?passiveUser=${params.passiveUser}&concern_way=${params.concernWay}`,
        method: 'get'
    })
}

// 让当前用户取消关注某个用户
export const cancelConcernSomeone = (passiveUser) => {
    return request({
        url: `/userService/cancelConcernSomeone?passiveUser=${passiveUser}`,
        method: 'get'
    })
}

// 查询指定用户的一些数量信息
export const findNumberInfoAboutUser = (user_id) => {
    return request({
        url: `/userService/findNumberInfoAboutUser?user_id=${user_id}`
    })
}

// 根据id查询用户信息
export const findUserInfoById = (id) => {
    return request({
        url: `/userService/findUserInfoById?id=${id}`
    })
}

// 查询某个用户所有关注的用户
export const findSomeoneAllConcernUser = (user_id) => {
    return request({
        url: `/userService/findSomeoneAllConcernUser?user_id=${user_id}`
    })
}

// 查询某个用户所有粉丝
export const findSomeoneAllFans = (user_id) => {
    return request({
        url: `/userService/findSomeoneAllFans?user_id=${user_id}`
    })
}

// 修改个人信息
export const updateUserInfo = (data) => {
    return request({
        url: `/userService/updateUserInfo`,
        method: 'post',
        data
    })
}