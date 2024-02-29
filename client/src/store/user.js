// 用户相关仓库
import { defineStore } from "pinia";
import { findNumberInfoAboutUser } from '@/api/user'
// 引入操作本地存储相关方法
import { SET_USERINFO,REMOVE_USERINFO,GET_USERINFO } from "@/utils/token";

let useUserStore = defineStore('User', {
    state: () =>{
        return {
           userNumberInfo: {
            
           }
        }
    },
    actions: {
        async getuserNumberInfo(user_id) {
            const res = await findNumberInfoAboutUser(user_id)
            if(res.code == 200) {
                this.userNumberInfo = res.data
            }
        }
    },
    getters: () =>{

    }
})

export default useUserStore
