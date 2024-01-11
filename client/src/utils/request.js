import axios from 'axios'
import { ElNotification } from 'element-plus/es'
import { STORAGE_USER, HEADERS_TOKEN } from '@/contant'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3100/api/',
	timeout: 40000,
})

// 异常拦截处理器：这是响应失败的处理函数，即http请求失败
const errorHandler = (error) => {
	const response = error.response
    if(!response) {
        ElNotification({ title: '请求失败', message: `网络错误`, type: 'error' })
        return
    }
	if (response && response.status !== 200 && response.status !== 401) {
		// 服务器挂掉的情况，如果服务器返回了错误信息则显示错误信息，否则显示`服务器发生错误`
		ElNotification({ title: `返回状态码: ${response.status}`, message: response.data.message || '服务器发生错误', type: 'error' })
	}
	return Promise.reject(error).catch((e) => {
		if (response.status === 401) {
			// 清空本地登录信息并跳转登录界面
			localStorage.removeItem(STORAGE_USER)
			ElNotification({ title: '系统提示', message: `Token已过期, 请重新登录`, type: 'error' })
			setTimeout(() => {
				window.location.replace(window.location.origin)
			}, 500)
		}
	})
}

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
	// 请求时携带token
	if (localStorage.getItem(STORAGE_USER)) {
		config.headers[HEADERS_TOKEN] = JSON.parse(localStorage.getItem(STORAGE_USER)).token
	}
	return config
}, errorHandler)

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
    console.log(response);
	if (response.data.code && String(response.data.code) !== '200') {
		// 说明后端手动声明这次是一次错误的请求
		if (checkTokenError(response)) return
		// 到这里来说明，不是token过期的错误，正常提示错误消息
		ElNotification({ title: '错误提示', message: response.data.msg || response.data.message || '发生错误', type: 'error' })
	}
    return response.data
},errorHandler)

// 检查是不是token过期的错误，这是检查后端是手动在data里写的4o1，而不是http状态码401，但是应该不会出现这种情况，现在后端检查出是token错误，会直接抛出http401错误
const checkTokenError = (response) => {
	if (response.data.status === 401) {
		// 清空本地Token并跳转登陆页面
		localStorage.removeItem(STORAGE_USER)
		ElNotification({ title: '系统提示', message: `Token已过期, 请重新登录`, type: 'error' })
		setTimeout(() => {
			window.location.href = '#/login'
		}, 500)
		return true
	}
}

export default axiosInstance