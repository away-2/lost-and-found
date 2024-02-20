// 路由鉴权
import router from '@/router'
import {
    GET_USERINFO
} from './token'

router.beforeEach(async (to, from, next) => {
    const token = GET_USERINFO().token
    const userInfo = GET_USERINFO().userInfo
    console.log(to.path);
    // next()
    // 用户登录判断
    if (token) {
        // 登录成功，指向首页,无法再访问登录页
        if (to.path == '/login') {
            next({
                path: '/'
            });
        } else {
            // if (userInfo) {
            //     next();
            // } else {
            //     next({ path: '/login' });
            // }
            next()
        }
    } else {
        // 只能访问登录页
        if (to.path == '/login') {
            next()
        } else {
            next({
                path: '/login'
            });
        }
    }
})