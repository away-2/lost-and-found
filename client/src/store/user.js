// 用户相关仓库
import { defineStore } from "pinia";
// 引入接口
import { loginByCode, loginByEmail } from "@/api/user";
// 引入操作本地存储相关方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

let useUserStore = defineStore('User', {
    state: () =>{
        return {
            token: GET_TOKEN(),
        }
    },
    // 异步|逻辑的地方
    actions: {
        // 用户学号登录的方法
        async codeLogin(data) {
            let res = await loginByCode(data)
            if (res.code === 200) {
                this.token = res.data.token;
                SET_TOKEN(res.data.token);
            }
        },
        // 用户邮箱登录的方法
        async emailLogin(data) {
            let res = await loginByEmail(data)
            if (res.code === 200) {
                this.token = res.data.token;
                SET_TOKEN(res.data.token);
            }
        },
        
    },
    getters: () =>{

    }
})

export default useUserStore
