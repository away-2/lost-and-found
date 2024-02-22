import request from '@/utils/request';

// 发布沸点
export const publishHot = (data) => {
    return request({
        url: '/topicService/publishHotTopic',
        method: 'post',
        data
    })
}

// 分页查询沸点列表
export const filndAllHotInfo = (data) => {
    return request({
        url: '/topicService/findTopicListByPaging',
        method: 'post',
        data
    })
}

// 文件上传
export const fileUpload = (data) => {
    return request({
        url: '/uploadService/uploadFile',
        method: 'post',
        data
    })
}