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

// 点赞沸点
export const likeTopicById = (id) => {
    return request({
        url:  `/topicService/likeTopic?topic_id=${id}`,
        method: 'post'
    })
}

// 取消点赞此沸点
export const cancelLikeTopicById = (id) => {
    return request({
        url: `/topicService/cancelLikeTopic?topic_id=${id}`,
        method: 'post'
    })
}

// 修改沸点审核状态
export const modifyTopicAuditStatus = (data) => {
    return request({
        url: '/topicService/changeTopicAuditStatus',
        method: 'post',
        data
    })
}

// 查询指定沸点的所有点赞用户
export const findLikeTopicUserList = (id) => {
    return request({
        url: `/topicService/findLikeTopicUserList?topic_id=${id}`,
        method: 'get'
    })
}

// 根据沸点id查询沸点详细信息
export const findTopicInfoById = (id) => {
    return request({
        url: `/topicService/findTopicInfoById?topic_id=${id}`,
        method: 'get'
    })
}

// 分页查询沸点评论
export const findTopicCommentByPaging = (data) => {
    return request({
        url: `/topicService/findTopicCommentByPaging`,
        method: 'post',
        data
    })
}

// 发布沸点评论
export const publishHotTopicComment = (data) => {
    return request({
        url: '/topicService/addHotTopicComment',
        method: 'post',
        data
    })
}