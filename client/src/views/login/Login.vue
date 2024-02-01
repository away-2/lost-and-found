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
					<div class="btnContainer">
						<div v-for="(item, index) in tabList" :key="index" class="btnWrap" :class="{ active: index === isActive }" @click="selctedStatus(index)">{{ item }}</div>
					</div>
					<input placeholder="请输入学号/邮箱" class="input-style" type="text" :onblur="getInputVal" :value="formVal.username" />
					<input placeholder="请输入密码" class="input-style" type="text" :onblur="getInputVal" :value="formVal.username" />
					<div class="loginBtn" @click="toLogin">登录</div>
					<div class="forgetWrap" @click="toUpdatePwd">*忘记密码？</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const $router = useRouter()
const isActive = ref(0)
const tabList = reactive(['学生', '管理员'])
const formVal = reactive({
	username: '',
	password: '',
})
const inputVal = ref('')

// 选中学生传入0， 选中管理员传入1
const selctedStatus = (index) => {
	isActive.value = index
}

const backHomePage = () => {
	$router.push('/home')
}

const toLogin = () => {
	if (!inputVal.value) {
		message.warn('学号或密码为空，请确认后登录')
		return
	}
}

const toUpdatePwd = () => {
	$router.push('/updatePwd')
}

const getInputVal = (e) => {
	inputVal.value = e.target.value
	console.log(e.target.value)
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
			height: 520px;
			border-radius: 30px;
			padding: 20px;

			.loginForm {
				width: 450px;
				height: 480px;
				border-radius: 20px;
				background: #fff;
				box-shadow: 0px 22px 35px 0px rgba(5, 27, 105, 0.12);
				display: flex;
				flex-direction: column;
				padding: 50px 80px;
				row-gap: 20px;

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
				}

				.forgetWrap {
					font-size: 12px;
					color: rgb(124, 145, 251);
					cursor: pointer;
				}
			}
		}
	}
}
</style>
