import { STORAGE_USER } from '@/contant/name'
// 封装本地存储数据与读取数据方法
// 本地存储数据
export const SET_USERINFO = (userInfo) => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(userInfo))
}

// 本地读取数据  
export const GET_USERINFO = () => {
    return {
        user: JSON.parse(localStorage.getItem(STORAGE_USER))?.userInfo,
        token: JSON.parse(localStorage.getItem(STORAGE_USER))?.token
    }
}

// 本地存储删除数据
export const REMOVE_USERINFO = () => {
    localStorage.removeItem(SET_USERINFO)
}

