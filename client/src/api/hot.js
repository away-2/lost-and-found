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

// 根据id删除沸点
export const removeHotById = (id) => {
    return request({
        url: `/topicService/removeTopicById?id=${id}`,
        method: 'delete',
    })
}

// 查询指定沸点的所有点赞用户
export const findLikeTopicAllUser = (id) => {
    return request({
        url: `/topicService/findLikeTopicUserList?topic_id=${id}`,
        method: 'get',
    })
}