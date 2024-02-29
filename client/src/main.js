import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.less'
import './assets/style/reset.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import store from './store'
import globalComponents from '@/components'
// 引入路由鉴权文件
import './utils/permisstion'




const app = createApp(App)

app.use(Antd).use(store).use(globalComponents)

app.use(router).mount('#app')
