import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/reset.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import store from './store'
// 引入路由鉴权文件
import './utils/permisstion'

import CommentInput from '@/components/commentInput/index.vue'
import CommentList from '@/components/commentList/index.vue'
import CommentFooter from '@/components/commentFooter/index.vue'


const app = createApp(App)

app.component('commentInput',CommentInput)
app.component('commentList',CommentList)
app.component('commentFooter',CommentFooter)

app.use(Antd)

app.use(store)

app.use(router).mount('#app')
