import request from '@/utils/request';

// 文件上传, 每次只能上传一张图片
export const fileUpload = (data) => {
    return request({
        url: '/uploadService/uploadFile',
        method: 'post',
        data
    })
}