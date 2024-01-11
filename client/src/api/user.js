import request from '@/utils/request'

// 注册
export const register = (data) => {
    return request({
        url: '/userService/register',
        method: 'post',
        data
    })
}