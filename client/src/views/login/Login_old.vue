<template>
	<div class="container">
		<input type="color" />
		<div class="loginWrap">
			<!-- <div class="loginLeft">
				<div class="loginLeft_img">
					<img src="@/assets/images/login.png" />
				</div>
				<div>Welcome</div>
				<div>校园失物招领系统</div>
			</div> -->
			<div class="loginRight">
				<div class="loginBox" v-if="currentPage === 1">
					<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="学号登录" name="first"
							><el-form ref="ruleFormRef" label-width="120px" class="demo-ruleForm">
								<el-form-item label="学号">
									<el-input type="text" placeholder="请输入学号" />
								</el-form-item>
								<el-form-item label="密码">
									<el-input type="password" placeholder="请输入密码" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary">Submit</el-button>
									<el-button>Reset</el-button>
								</el-form-item>
							</el-form></el-tab-pane
						>
						<el-tab-pane label="邮箱登录" name="second">
							<el-form ref="ruleFormRef" label-width="120px" class="demo-ruleForm">
								<el-form-item label="邮箱">
									<el-input type="text" placeholder="请输入邮箱地址" />
								</el-form-item>
								<el-form-item label="验证码">
									<el-input type="password" placeholder="请输入验证码" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary">Submit</el-button>
									<el-button>Reset</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</div>
				<div class="registerBox" v-if="currentPage === 2">
					<div class="title">注册</div>
				</div>
				<div class="getPassword" v-if="currentPage === 3">
					<div class="title">找回密码</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const currentPage = ref(1)
const activeName = ref('first')
const handleClick = (tab, event) => {
	console.log(tab, event)
}
</script>

<style lang="less" scoped>
.container {
	background: url('@/assets/images/bg14.jpg') no-repeat center;
	background-size: 100% 100%;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.loginWrap {
		width: 600px;
		height: 400px;
		padding: 25px;
		// box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
		// box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.062);
		border-radius: 5px;
		background: rgb(248, 253, 255);
		// background: #fff;
		opacity: 0.9;
		// box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(251, 241, 233), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
		box-shadow: 0px 2px 6px 0px rgba(195, 197, 204, 0.5);
		// transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		display: flex;

		.loginLeft {
			width: 50%;
			border-right: 1px solid #bdacac;

			.loginLeft_img {
				width: 100%;
				height: 50%;

				img {
					width: 70%;
					height: 70%;
				}
			}

			div {
				font-size: 20px;
				font-weight: 200px;
				color: rgb(48, 74, 193);
				width: 100%;
				text-align: center;
				margin: 10px;
			}
		}

		.loginRight {
			flex: 1;

			.loginBox {
				width: 100%;
				height: 100%;
				padding: 20px;
				.title {
					color: rgb(48, 74, 193);
					font-size: 20px;
					font-weight: 200px;
					text-align: center;
					width: 100%;
					margin-bottom: 20px;
				}

				.demo-ruleForm {
					width: 100%;
				}
			}
		}
	}
}
</style>
