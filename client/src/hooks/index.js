import { ref, defineComponent } from 'vue'

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
