import PreviewImg from './index.vue'
import { createVNode, render } from 'vue'

let mountNode = null

export default {
	open({ imageList = [], currentShowIndex = 0 }) {
        // 确保只有一个弹窗，有过则干掉
		if (mountNode) {
			document.body.removeChild(mountNode)
			mountNode = null
		}
        // 创建虚拟dom
		const app = createVNode(PreviewImg, {
			imageList,
            currentShowIndex
		})
        // 用一个div装着这个弹窗，方便干掉
		mountNode = document.createElement('div')
        // 渲染虚拟dom到真实节点
		render(app, mountNode)
		document.body.appendChild(mountNode)
        app.component.exposed.handleOpen()
	}
}
