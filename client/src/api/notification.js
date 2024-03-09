import request from '@/utils/request';

// 查询所有新增粉丝通知
export const findUserIncreaseFansNotice = () => {
    return request({
        url: '/noticeService/findUserIncreaseFansNotice',
        method: 'get'
    })
}

// 查询所有评论通知
export const findUserCommentNotice = () => {
    return request({
        url: '/noticeService/findUserCommentNotice',
        method: 'get'
    })
}

// 查询所有赞和收藏通知
export const findUserLikeAndCollectNotice = () => {
    return request({
        url: '/noticeService/findUserLikeAndCollectNotice',
        method: 'get'
    })
}