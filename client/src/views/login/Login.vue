<template>
	<div class="container">
		<div class="image-box">
			<img src="@/assets/images/not-found.png" alt="" />
		</div>
		<div class="logo-box">
			<!-- <img src="@/assets/images/logo.png" alt="" /> -->
			<div class="title-left">校园失物招领中心，</div>
			<div class="title-right">让失物不再流浪</div>
		</div>
		<div class="loginWrap">
			<div class="loginBox">
				<div class="loginForm">
					<div class="login-title">您好，请登录</div>
					<div class="tabWrap">
						<div class="tabItem">
							<div v-for="(item, index) in titleTab" :key="index" class="tabList" :class="{ selected: index === isSelected }" @click="tabSelected(index)">{{ item }}</div>
						</div>
						<div class="underline" :class="[isSelected === 0 ? 'lineLeft' : 'lineRight']"></div>
					</div>
					<div class="codeLogin" v-show="isSelected === 0">
						<div class="btnContainer">
							<div v-for="(item, index) in tabList" :key="index" class="btnWrap" :class="{ active: index === isActive }" @click="selctedStatus(index)">{{ item }}</div>
						</div>
						<input placeholder="请输入学号" class="input-style" type="text" v-model="formVal.user_name" />
						<input placeholder="请输入密码" class="input-style" type="password" v-model="formVal.password" />
						<div class="loginBtn" @click="codeLogin">登录</div>
						<div class="forgetWrap" @click="toUpdatePwd">*忘记密码？</div>
					</div>
					<div class="emailLogin" v-show="isSelected === 1">
						<input placeholder="请输入邮箱地址" class="input-style" type="text" v-model="formVal.email" />
						<div class="verifyBox">
							<input placeholder="请输入验证码" class="input" type="text" v-model="formVal.verifyCode" />
							<button @click="sendEmail(countDownTime)" :disabled="isCountDownDisabled">
								{{ countDownText }}
							</button>
						</div>
						<div class="loginBtn" @click="emailLogin">登录</div>
						<div class="remarkText">*注意：只有已绑定邮箱的账号才能进行邮箱登录</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-box">
			<div class="left-box">
				<svg t="1709692947148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1469" width="16" height="16">
					<path
						d="M512 51.2a460.8 460.8 0 1 0 0.0512 921.6512A460.8 460.8 0 0 0 512 51.2z m0 230.4c-30.3616 0-59.9552-2.6624-88.6784-7.68C450.304 165.632 490.8032 108.7488 512 108.7488c21.1968 0 61.696 56.832 88.6784 165.0688-28.672 4.9664-58.368 7.7312-88.6784 7.7312z m144.7424-20.992c-14.0288-57.2928-32.768-105.5232-54.6304-141.312a402.5856 402.5856 0 0 1 173.824 88.576 488.3456 488.3456 0 0 1-119.1936 52.736z m-289.4848 0a491.52 491.52 0 0 1-119.0912-52.736A402.0224 402.0224 0 0 1 421.888 119.3984c-21.9136 35.6864-40.4992 83.968-54.6304 141.2096z m317.0304 222.6176a1109.4016 1109.4016 0 0 0-15.872-166.0416 544.6144 544.6144 0 0 0 148.992-67.6864 401.0496 401.0496 0 0 1 96.3584 233.6768h-229.4784z m-574.0544 0a401.4592 401.4592 0 0 1 96.1536-233.6256 544.0512 544.0512 0 0 0 149.1456 67.4816c-8.9088 51.0464-14.4896 107.008-15.8208 166.144H110.2336z m287.0784 0c1.3312-57.344 6.6048-108.4416 14.336-152.9856a573.9008 573.9008 0 0 0 200.704 0.1024c7.7312 44.544 12.9024 95.6928 14.336 152.8832H397.312z m420.096 291.2768a544.6144 544.6144 0 0 0-148.992-67.6864c8.96-51.0464 14.5408-107.008 15.872-165.9904h229.4784a401.0496 401.0496 0 0 1-96.3584 233.6768zM411.5968 693.76a1055.744 1055.744 0 0 1-14.2848-152.9856h229.2736a1027.4304 1027.4304 0 0 1-14.336 152.8832 572.7744 572.7744 0 0 0-200.6528 0.1024z m-205.1072 80.64a400.7936 400.7936 0 0 1-96.1536-233.6256h229.4784c1.3312 59.1872 6.912 115.0976 15.872 166.144-54.1184 15.4112-104.448 38.144-149.1968 67.4816zM512 915.2c-21.1968 0-61.696-56.832-88.6784-165.0688 28.672-4.9664 58.368-7.7312 88.6784-7.7312 30.3616 0 59.9552 2.7648 88.6784 7.68-26.9824 108.2368-67.4816 165.12-88.6784 165.12z m90.112-10.496c21.9136-35.7888 40.6016-84.0192 54.6304-141.312 42.8544 12.544 82.8928 30.3104 119.1936 52.6336a401.664 401.664 0 0 1-173.824 88.6784z m-180.224 0a402.0224 402.0224 0 0 1-173.7216-88.4736 484.1472 484.1472 0 0 1 119.0912-52.736c14.1312 57.1904 32.768 105.4208 54.6304 141.2096z"
						fill="#404653"
						p-id="1470"
					></path>
				</svg>
				<div class="text">简体中文</div>
			</div>
			<div class="right-box">
				<svg t="1709693003501" class="icon" viewBox="0 0 1200 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1786" id="mx_n_1709693003502" width="16" height="16">
					<path
						d="M921.486533 0.229117v78.718036l200.804636 199.004432-112.212751 112.103649a77.354245 77.354245 0 0 0-53.187862-19.747699 79.863621 79.863621 0 0 0-80.736448 80.736447v415.465394a78.990794 78.990794 0 0 1-78.718036 78.772588H403.627685a79.045346 79.045346 0 0 1-78.772588-78.772588V451.043982a79.809069 79.809069 0 0 0-80.736447-80.736447 83.79134 83.79134 0 0 0-53.133311 19.747699L78.772588 277.951585l198.568019-199.004432h49.096488l1.909308 2.018411A327.309922 327.309922 0 0 0 600.06819 216.799182a322.345721 322.345721 0 0 0 271.885441-135.888169 1.909308 1.909308 0 0 1 2.018411-2.018412h47.241732V0.229117m-592.430958 0h-43.259461a75.935902 75.935902 0 0 0-61.0433 23.566314L23.675418 222.69076a76.099557 76.099557 0 0 0 0 110.248892L139.706785 448.971019a71.299011 71.299011 0 0 0 102.393454 0h1.909308c2.018411 0 2.018411 0 2.018411 1.909308v415.465394a158.199795 158.199795 0 0 0 157.490624 157.490624h393.808387a158.199795 158.199795 0 0 0 157.490624-157.490624V450.934879c0-1.909308 0-1.909308 1.909308-1.909308h2.018411a74.953972 74.953972 0 0 0 51.169451 21.820662 71.517218 71.517218 0 0 0 51.169451-21.820662l116.031367-116.031367a76.372315 76.372315 0 0 0 0-110.248892L978.274804 23.795431a78.772588 78.772588 0 0 0-57.224685-23.566314h-49.096488a79.209001 79.209001 0 0 0-66.934879 37.367883 246.573474 246.573474 0 0 1-206.750767 100.429594A251.810433 251.810433 0 0 1 391.899079 37.597 70.91715 70.91715 0 0 0 328.782816 0.229117z"
						fill="#404653"
						p-id="1787"
					></path>
				</svg>
				<div class="text">外观设置</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message, notification } from 'ant-design-vue'
// import useUserStore from '@/store/user'
import { countDecreaseHook } from '@/hooks/index'
import { getTime } from '@/utils/time.js'
import { getVerifyCodeByEmail, loginByCode, loginByEmail } from '@/api/user'
import { SET_USERINFO } from '@/utils/token'

// 执行 countDown 函数，解构返回的数据和函数进行使用
const { getCode, countDownTime, isCountDownDisabled, countDownText } = countDecreaseHook.setup()

// let userStore = useUserStore()
const router = useRouter()
const isActive = ref(0)
const tabList = reactive(['学生', '管理员'])
const titleTab = reactive(['学号登录', '邮箱登录'])
const isSelected = ref(0)
const formVal = reactive({
	user_name: '',
	password: '',
	identity: 'user',
	email: '',
	verifyCode: '',
})

const verifyVal = ref('')
const isFreeze = ref(0)
const isAdmin = ref(0)

// 选中学生传入0， 选中管理员传入1
const selctedStatus = (index) => {
	isActive.value = index
}

// 选择登录方式学号/邮箱
const tabSelected = (index) => {
	isSelected.value = index
}

const backHomePage = () => {
	router.push('/home')
}

// 学号登录
const codeLogin = async () => {
	try {
		if (!formVal.user_name) {
			message.warn('学号为空，请确认后登录')
			return
		}
		if (!formVal.password) {
			message.warn('密码为空，请确认后登录')
			return
		}
		let res = await loginByCode(formVal)
		if (res.code === 200) {
			SET_USERINFO(res.data)
			isFreeze.value = res.data.userInfo.is_freeze
			isActive.value = res.data.userInfo.is_admin
			if (isFreeze.value === 0) {
				if (isSelected.value === 0 && isAdmin.value === 1) {
					router.push('/admin')
					notification.success({ message: '欢迎回来', description: `Hi,${getTime()}好` })
				} else {
					router.push('/home')
					notification.success({ message: '欢迎回来', description: `Hi,${getTime()}好` })
				}
			} else {
				message.warn('账户已冻结，请联系管理员解除冻结')
			}
		}
	} catch (e) {}
}

// 发送邮箱验证码
const sendEmail = async (countDownTime) => {
	let res = await getVerifyCodeByEmail(formVal.email)
	if (res.code === 200) {
		verifyVal.value = res.data.emailCode
		getCode(countDownTime)
	}
}

// 邮箱登录
const emailLogin = async () => {
	if (!formVal.email || !formVal.verifyCode) {
		message.warn('邮箱或验证码为空，请确认后登录')
		return
	}
	if (verifyVal.value !== formVal.verifyCode) {
		message.warn('验证码错误')
		return
	} else {
		let res = await loginByEmail(formVal)
		if (res.code === 200) {
			SET_USERINFO(res.data)
			isFreeze.value = res.data.userInfo.is_freeze
			if (isFreeze.value === 0) {
				router.push('/home')
				notification.success({ message: '欢迎回来', description: `Hi,${getTime()}好`, duration: '2' })
			} else {
				message.warn('账户已冻结，请联系管理员解除冻结')
			}
		}
	}
}
const toUpdatePwd = () => {
	// router.push('/updatePwd')
}
</script>

<style lang="less" scoped>
.container {
	width: 100vw;
	height: 100vh;
	// background: #f4f9ff;
	background: url('@/assets/images/bg.svg');
	// background: #fff;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	.image-box {
		position: absolute;
		left: 0px;
		top: 182.5px;
		width: 498px;
		height: 390px;
		transform: scale(0.7);
	}
	.logo-box {
		position: fixed;
		top: 32px;
		left: 36px;
		cursor: pointer;
		display: flex;
		align-items: center;
		column-gap: 5px;
		img {
			width: 48px;
			height: 48px;
		}
		.title {
			// font-family: 'MyFont';
			font-size: 20px;
			color: rgba(16, 24, 40, 0.8);
		}
	}

	.loginWrap {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: calc(100vh - 35px);
		z-index: 99;
		margin-right: 10%;
		// opacity: 0.9;

		.loginBox {
			// background: #e8f1fd;
			width: 440px;
			height: 550px;
			border-radius: 30px;
			padding: 10px;

			.loginForm {
				width: 440px;
				height: 510px;
				border-radius: 20px;
				border: 1px solid #eaecf0;
				background: #fff;
				box-shadow: 0 2px 10px 6px rgba(0,42,92,.06);
				display: flex;
				flex-direction: column;
				padding: 50px 75px;
				row-gap: 20px;

				.tabWrap {
					position: relative;
					cursor: pointer;

					.tabItem {
						display: flex;
						height: 25px;
						font-size: 16px;
						width: 100%;

						.tabList {
							width: 80px;
							margin-right: 20px;
							padding-left: 2px;
							align-items: center;
						}

						.selected {
							color: #1e2c4b;
							// border-bottom: 3px solid #1e2c4b;
							font-weight: 600;
						}
					}

					.underline {
						position: absolute;
						width: 70px;
						height: 2px;
						// background: #1e2c4b;
						background: #4284d3;
						transition: all 0.3s;

						&.lineLeft {
							left: 0;
						}

						&.lineRight {
							left: 34%;
						}
					}
				}

				.login-title {
					font-size: 25px;
					width: 100%;
					text-align: right;
					// font-family: 'MyFont';
					color: rgba(16, 24, 40, 0.8);
					margin-bottom: 30px;
				}

				.btnContainer {
					display: flex;
					column-gap: 10px;
					margin-bottom: 20px;

					.btnWrap {
						width: 50%;
						height: 40px;
						color: rgb(117, 117, 117);
						text-align: center;
						border: 1px solid #c8d1e5;
						border-radius: 5px;
						padding: 13px 0;
						cursor: pointer;
						font-size: 13px;
					}

					.active {
						color: rgb(124, 145, 251);
						width: 50%;
						height: 40px;
						text-align: center;
						border: 1px solid rgba(160, 197, 244, 0.25);
						border-radius: 5px;
						padding: 13px 0;
						cursor: pointer;
						font-size: 13px;
					}
				}

				.input-style {
					padding: 10px;
					border: 1px solid #c8d1e5;
					border-radius: 5px;
					font-size: 14px;
					outline: none;
					margin-bottom: 20px;
					width: 100%;
				}

				.input-style:focus {
					border-color: rgba(160, 197, 244, 0.25);
					box-shadow: 0 0 0 0.2rem rgba(232, 241, 253, 0.25);
				}

				.loginBtn {
					width: 100%;
					height: 40px;
					// background: #1e2c4b;
					background: #4284d3;
					color: #fff;
					text-align: center;
					padding-top: 10px;
					border-radius: 5px;
					cursor: pointer;
					margin-bottom: 20px;
				}

				.forgetWrap {
					font-size: 12px;
					color: rgb(124, 145, 251);
					cursor: pointer;
				}

				.emailLogin {
					margin-top: 10px;

					.verifyBox {
						display: flex;
						position: relative;

						.input {
							padding: 10px;
							border: 1px solid #c8d1e5;
							border-radius: 5px;
							font-size: 14px;
							outline: none;
							margin: 5px 0 25px 0;
							width: 100%;
							padding-right: 110px;
						}

						button {
							height: 40px;
							background: transparent;
							position: absolute;
							right: 15px;
							border: none;
							top: 4px;
							font-size: 13px;
						}
					}

					.remarkText {
						font-size: 13px;
						color: rgb(124, 145, 251);
						margin-top: 5px;
					}
				}
			}
		}
	}
	.footer-box {
		display: flex;
		align-items: center;
		column-gap: 30px;
		position: fixed;
		bottom: 10px;
		left: 36px;
		.left-box {
			display: flex;
			column-gap: 5px;
			cursor: pointer;
			.text {
				font-weight: 100;
				font-size: 14px;
			}
		}
		.right-box {
			display: flex;
			column-gap: 5px;
			cursor: pointer;
			.text {
				font-weight: 100;
				font-size: 14px;
			}
		}
	}
}
</style>
