import { ref, defineComponent, computed, onMounted, onUnmounted } from 'vue'

export const countDecreaseHook = defineComponent({
	setup() {
		// 倒计时的时间
		const countDownTime = ref(60)
		// 倒计时的定时器
		const countDownTimerId = ref(null)
		// 倒计时按钮显示的文本
		const countDownText = ref('获取验证码')
		// 倒计时按钮的禁用状态
		const isCountDownDisabled = ref(false)

		// 倒计时函数
		const getCode = (time) => {
			countDownText.value = `${time}s后重新获取`
			isCountDownDisabled.value = true
			countDownTimerId.value = setInterval(() => {
				time--
				countDownText.value = `${time}s后重新获取`
				if (time <= 0) {
					clearInterval(countDownTimerId.value)
					countDownText.value = '获取验证码'
					isCountDownDisabled.value = false
					countDownTime.value = 60
				}
			}, 1000)
		}

		return {
			getCode,
			countDownTime,
			countDownText,
			isCountDownDisabled,
		}
	},
})

export const scrollLoadMoreHook = defineComponent({
	setup() {
		let loadMoreFunction = null
		let offsetTopIncreaseNum

		// 通用防抖函数，传进一个函数，返回一个带有防抖功能的函数
		function debounce(fn, delay) {
			var time = null
			return () => {
				clearTimeout(time)
				time = setTimeout(() => {
					fn()
				}, delay)
			}
		}

		// 处理window的scroll回调
		const handleWindowScroll = () => {
			const item = document.querySelectorAll('.loadMoreItem')
			const lastItem = item[item.length - 1]
			if (!lastItem) return
			// 如果滚动到最后一项的头顶时，就可以调用加载更多函数
			if (lastItem.offsetTop + offsetTopIncreaseNum < document.documentElement.clientHeight + document.documentElement.scrollTop) {
				loadMoreFunction()
			}
		}

		const registerLoadMore = (fn,_offsetTopIncreaseNum=60) => {
			loadMoreFunction = fn
			offsetTopIncreaseNum = _offsetTopIncreaseNum
			// 监听window的scroll事件
			window.onscroll = debounce(handleWindowScroll, 300)
		}

		onUnmounted(() => {
			// 卸载监听scroll事件
			window.onscroll = null
		})
		return {
			registerLoadMore
		}
	},
})
