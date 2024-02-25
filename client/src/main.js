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


const app = createApp(App)

app.component('commentInput',CommentInput)

app.use(Antd)

app.use(store)

app.use(router).mount('#app')
