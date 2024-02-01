import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/reset.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import store from './store'



const app = createApp(App)

app.use(Antd)

app.use(store)

app.use(router).mount('#app')
