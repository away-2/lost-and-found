import request from '@/utils/request';

// 查询枚举
export const findGroupEnumByCodes = (params) => {
    return request({
        url: `/enumService/findGroupEnumByCodes?collectionCodes=${params}`,
        method: 'get'
    })
}