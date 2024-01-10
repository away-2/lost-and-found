import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截
axios.interceptors.response.use(res => {
  if (res.status !== 200) {
    ElMessage.error({
        type: 'error',
        message: '服务器异常'
    })
  } else {
    if (res.data.code !== '8000') {
        ElMessage.success({
            type: 'success',
            message: res.data.msg
        })
      // return Promise.reject(res)
      return res.data
    }
    return res.data
  }
})

export default axios;