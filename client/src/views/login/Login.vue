<template>
	<div class="container">
		<a-tooltip placement="bottomLeft">
			<template #title>返回首页</template>
			<div class="backImg">
				<img src="@/assets/images/backHome.png" alt="" @click="backHomePage" />
			</div>
		</a-tooltip>
		<div class="loginWrap">
			<div class="loginBox">
				<div class="loginForm">
					<div class="login-title">校园失物招领系统</div>
					<div class="tabWrap">
						<div class="tabItem">
							<div v-for="(item, index) in titleTab" :key="index" class="tabList"
								:class="{ selected: index === isSelected }" @click="tabSelected(index)">{{ item }}</div>
						</div>
						<div class="underline" :class="[isSelected === 0 ? 'lineLeft' : 'lineRight']"></div>
					</div>
					<div class="codeLogin" v-show="isSelected === 0">
						<div class="btnContainer">
							<div v-for="(item, index) in tabList" :key="index" class="btnWrap"
								:class="{ active: index === isActive }" @click="selctedStatus(index)">{{ item }}</div>
						</div>
						<input placeholder="请输入学号" class="input-style" type="text" :onblur="getUsernameVal"
							:value="formVal.user_name" />
						<input placeholder="请输入密码" class="input-style" type="password" :onblur="getPasswordVal"
							:value="formVal.password" />
						<div class="loginBtn" @click="codeLogin">登录</div>
						<div class="forgetWrap" @click="toUpdatePwd">*忘记密码？</div>
					</div>
					<div class="emailLogin" v-show="isSelected === 1">
						<input placeholder="请输入邮箱地址" class="input-style" type="text" :value="formVal.email"
							:onblur="getEmailVal" />
						<div class="verifyBox">
							<input placeholder="请输入验证码" class="input" type="text" :value="formVal.verifyCode"
								:onblur="getVerifyVal" />
							<div @click="sendEmail">
								<button @click="getCode(countDownTime)" :disabled="isCountDownDisabled">
									{{ countDownText }}
								</button>
							</div>
						</div>
						<div class="loginBtn" @click="emailLogin">登录</div>
						<div class="remarkText">*注意：只有已绑定邮箱的账号才能进行邮箱登录</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message, notification } from 'ant-design-vue'
import useUserStore from '@/store/user'
import { countDown } from '@/utils/countDown.js'
import { getTime } from '@/utils/time.js'
import { getVerifyCodeByEmail } from '@/api/user'


// 执行 countDown 函数，解构返回的数据和函数进行使用
const { getCode, countDownTime, isCountDownDisabled, countDownText } = countDown()

let userStore = useUserStore()
const $router = useRouter()
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

let verifyVal = ref('')


// 选中学生传入0， 选中管理员传入1
const selctedStatus = (index) => {
	isActive.value = index
	if (index === 1) {
		formVal.identity = 'admin'
	} else {
		formVal.identity = 'user'
	}
}

// 选择登录方式学号/邮箱
const tabSelected = (index) => {
	isSelected.value = index
}

const backHomePage = () => {
	$router.push('/home')
}

// 学号登录
const codeLogin = async () => {
	if (!formVal.user_name) {
		message.warn('学号为空，请确认后登录')
		return
	}
	if (!formVal.password) {
		message.warn('密码为空，请确认后登录')
		return
	}
	try {
		await userStore.userLogin(formVal)
		$router.push('/home')
		notification.success({ message: '欢迎回来', description: `Hi,${getTime()}好` })
	} catch (e) {

	}
}

// 发送邮箱验证码
const sendEmail = async () => {
	return
	let res = await getVerifyCodeByEmail(formVal.email)
	if (res.code === 200) {
		verifyVal.value = res.data.emailCode
	}
}

// 邮箱登录
const emailLogin = async () => {
	if (!formVal.email || !formVal.verifyCode) {
		message.warn("邮箱或验证码为空，请确认后登录")
		return
	}
	if (verifyVal.value !== formVal.verifyCode) {
		message.warn("验证码错误")
		return
	}else {
		await userStore.emailLogin(formVal);
		$router.push('/home')
		notification.success({ message: '欢迎回来', description: `Hi,${getTime()}好` })
	}
}
const toUpdatePwd = () => {
	$router.push('/updatePwd')
}

const getUsernameVal = (e) => {
	formVal.user_name = e.target.value
}

const getPasswordVal = (e) => {
	formVal.password = e.target.value
}

const getEmailVal = (e) => {
	formVal.email = e.target.value
}

const getVerifyVal = (e) => {
	formVal.verifyCode = e.target.value
}
</script>

<style lang="less" scoped>
.container {
	width: 100vw;
	height: 100vh;
	background: #f4f9ff;

	.backImg {
		width: 100%;
		height: 35px;
		background: rgb(255, 255, 255);
		opacity: 0.7;
		display: flex;
		align-items: center;
		padding-left: 5px;

		img {
			height: 30px;
			cursor: pointer;
		}
	}

	.loginWrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 35px);

		.loginBox {
			background: #e8f1fd;
			width: 490px;
			height: 550px;
			border-radius: 30px;
			padding: 20px;

			.loginForm {
				width: 450px;
				height: 510px;
				border-radius: 20px;
				background: #fff;
				box-shadow: 0px 22px 35px 0px rgba(5, 27, 105, 0.12);
				display: flex;
				flex-direction: column;
				padding: 50px 80px;
				row-gap: 20px;

				.tabWrap {
					position: relative;

					.tabItem {
						display: flex;
						height: 25px;
						font-size: 13px;
						width: 100%;

						.tabList {
							width: 55px;
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
						width: 55px;
						height: 2px;
						background: #1e2c4b;
						transition: all .3s;

						&.lineLeft {
							left: 0;
						}

						&.lineRight {
							left: 26%;
						}
					}


				}




				.login-title {
					font-size: 25px;
					width: 100%;
					text-align: center;
					font-family: 'MyFont';
					margin-bottom: 20px;
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
					background: #1e2c4b;
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
}
</style>
