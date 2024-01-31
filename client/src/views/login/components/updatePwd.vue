<template>
	<div class="container">
		<div class="backImg">
			<img src="@/assets/images/backHome.png" alt="" @click="backLogin" />
		</div>
		<a-steps :current="current" :items="items" @change="onChange"></a-steps>
		<div class="steps-content">
			<div class="firstContent" v-if="steps[current].title === 'First'">
				<div class="formWrap">
					<input type="text" placeholder="请输入学号" class="input" />
					<div class="radioBox">
						<div class="left">请选择账号类型：</div>
						<div class="right">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">管理员</a-radio>
								<a-radio value="2">学生</a-radio>
							</a-radio-group>
						</div>
					</div>
					<div class="verifyBox">
						<input type="text" placeholder="请输入验证码" />
						<SIdentify :identifyCode="identifyCode" @getVerifyVal="getVerifyVal" />
					</div>
				</div>
			</div>
			<div class="secondContent" v-if="steps[current].title === 'Second'">
				<div class="formWrap">
					<div class="textWrap">
						<span>点击获取邮箱验证码，验证码将发送至已绑定的邮箱地址:</span>
						<span>{{ form.email }}</span>
					</div>
					<div class="verifyWrap">
						<input type="text" placeholder="请输入邮箱验证码" />
						<button @click="getCode(countDownTime)" :disabled="isCountDownDisabled">
							{{ countDownText }}
						</button>
					</div>
					<div class="sendText" :class="{ isSend: !isCountDownDisabled }">
						<span>验证码发送成功，请注意查收！</span>
					</div>
				</div>
			</div>
			<div class="thirdContent" v-if="steps[current].title === 'Third'">
				<div class="formWrap">
					<div class="textWrap">
						<span
							>请设置<span>{{ form.code }}</span
							>的新密码，支持6位以上密码</span
						>
					</div>
					<input type="text" placeholder="请输入新密码" />
					<input type="text" placeholder="请重复输入新密码" />
				</div>
			</div>
			<div class="lastContent" v-if="steps[current].title === 'Last'">
				<div class="formWrap">
					<img src="@/assets/images/success.png" alt="" />
					<div class="textWrap">
						<span>重置密码成功，请使用新密码登录系统！</span>
						<span>点击登录</span>
					</div>
				</div>
			</div>
		</div>
		<div class="steps-action">
			<a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
			<a-button v-if="current == steps.length - 1" type="primary" @click="message.success('Processing complete!')"> 完成 </a-button>
		</div>
	</div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import SIdentify from '@/components/SIdentify.vue'
import { countDown } from '@/utils/countDown.js'
// 执行 countDown 函数，解构返回的数据和函数进行使用
const { getCode, countDownTime, isCountDownDisabled, countDownText } = countDown()

const $router = useRouter()
const current = ref(0)
const verifyVal = ref('')
const value = ref('1')
const form = reactive({
	email: '1968642178@qq.com',
	code: '2020213498',
})

const props = defineProps({
	currentPage: String,
})

const next = () => {
	current.value++
	// 这是验证第一步
	if (current.value === 1) {
		console.log('这是第一步')
	} else if (current.value === 2) {
		console.log('这是第二步')
	} else {
		console.log('这是最后一步')
	}
}

const steps = [
	{
		title: 'First',
		description: '第一步：请输入要重置密码的账户(学号)',
	},
	{
		title: 'Second',
		description: '第二步：通过已绑定的邮箱进行安全验证',
	},
	{
		title: 'Third',
		description: '第三步：设置新密码',
	},
	{
		title: 'Last',
		description: '设置成功',
	},
]
const items = steps.map((item) => ({
	key: item.title,
	title: item.title,
	description: item.description,
}))

const backLogin = () => {
	console.log(props.currentPage)
}

const onChange = (current) => {
	console.log(current)
}

// 获取随机验证码
const getVerifyVal = (data) => {
	verifyVal.value = data
}
</script>
<style lang="less">
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

	.firstContent {
		display: flex;
		justify-content: center;
		align-items: center;

		.formWrap {
			width: 400px;
			height: 200px;

			.input {
				width: 100%;
				height: 40px;
				background: transparent;
				border: none;
				border-bottom: 1px solid #f1f1f1;
				outline: none;
			}

			.radioBox {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60px;
				border-bottom: 1px solid #f1f1f1;
			}

			.verifyBox {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 50px;
				border-bottom: 1px solid #f1f1f1;
				margin-top: 10px;

				input {
					background: transparent;
					border: none;
					outline: none;
				}
			}
		}
	}

	.secondContent {
		display: flex;
		justify-content: center;
		align-items: center;

		.formWrap {
			width: 400px;
			height: 150px;

			.textWrap {
				font-size: 13px;
				font-weight: 600;
				width: 100%;
				margin-bottom: 50px;

				span {
					display: flex;
				}

				span:nth-child(2) {
					color: red;
				}
			}

			.verifyWrap {
				display: flex;
				align-items: center;
				width: 100%;
				height: 50px;
				border-bottom: 1px solid #f1f1f1;

				input {
					width: 70%;
					background: transparent;
					border: none;
					outline: none;
				}

				button {
					width: 120px;
					height: 30px;
					font-size: 13px;
					background: rgb(114, 135, 250);
					color: #fff;
					border: none;
					border-radius: 5px;
					cursor: pointer;
				}

				button[disabled] {
					background: rgb(195, 204, 255);
				}
			}

			.sendText {
				width: 100%;

				span {
					color: rgb(69, 188, 69);
					font-size: 12px;
					position: relative;
					left: -115px;
				}
			}
		}
	}
	.thirdContent {
		display: flex;
		justify-content: center;
		align-items: center;
		.formWrap {
			width: 400px;
			height: 150px;
			.textWrap {
				width: 100%;
				display: flex;
				span {
					font-size: 13px;
					font-weight: 600;
					span {
						color: red;
					}
				}
			}
			input {
				border: none;
				outline: none;
				width: 100%;
				height: 50px;
				background: transparent;
				border-bottom: 1px solid #f1f1f1;
			}
		}
	}
	.lastContent {
		display: flex;
		justify-content: center;
		align-items: center;
		.formWrap {
            display: flex;
            align-items: center;
			img {
				width: 30px;
				height: 30px;
                margin-right: 5px;
			}
			.textWrap {
				font-size: 13px;
				font-weight: 500;
				span:nth-child(2) {
					color: #7287fa;
					cursor: pointer;
				}
			}
		}
	}
	.isSend {
		display: none;
	}
}
</style>
<style scoped>
.ant-steps {
	margin-top: 50px;
	padding: 0 20px;
}

.steps-content {
	margin-top: 16px;
	border-radius: 6px;
	min-height: 200px;
	text-align: center;
	padding-top: 80px;
}

.steps-action {
	margin-top: 24px;
	display: flex;
	justify-content: center;

	button {
		width: 400px;
		border-radius: 0;
		height: 40px;
		background: rgb(114, 135, 250);
	}
}
</style>
