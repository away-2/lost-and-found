// 用户相关仓库
import { defineStore } from "pinia";
import { findUserInfoById } from '@/api/user'
// 引入操作本地存储相关方法
import { SET_USERINFO,REMOVE_USERINFO,GET_USERINFO } from "@/utils/token";

let useUserStore = defineStore('User', {
    state: () =>{
        return {
           systemUserInfo: {
            
           }
        }
    },
    actions: {
        async getSystemUserInfo(user_id) {
            const res = await findUserInfoById(user_id)
            if(res.code == 200) {
                this.systemUserInfo = res.data
                SET_USERINFO(res.data)
            }
        },
        async updateSystemUserInfo(userInfo) {
            Object.assign(this.systemUserInfo,userInfo)
        }
    },
    getters: () =>{

    }
})

export default useUserStore
