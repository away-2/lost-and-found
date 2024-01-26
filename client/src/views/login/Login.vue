<template>
	<div class="loginWrap" @click="showModal">
		<span>登录</span>
	</div>
	<a-modal v-model:open="open" @ok="handleOk" :footer="null" class="modalWrap" centered width="400px">
		<div class="title">登录</div>
		<div class="btnContainer">
			<div v-for="(item, index) in tabList" :key="index" class="btnWrap" :class="{ active: index === isActive }"
				@click="selctedStatus(index)">{{ item }}</div>
		</div>
		<a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
			@finish="onFinish" @finishFailed="onFinishFailed">
			<a-form-item name="username" :rules="[{ message: 'Please input your username!' }]">
				<a-input v-model:value="formState.username" placeholder="请输入学号/邮箱" />
			</a-form-item>
			<a-form-item name="password" :rules="[{ message: 'Please input your password!' }]">
				<a-input-password v-model:value="formState.password" placeholder="请输入密码" />
			</a-form-item>
		</a-form>
		<a-button type="primary" html-type="submit">登录</a-button>
	</a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'
const open = ref(false)
const isActive = ref(0)
const tabList = reactive(['学生', '管理员'])

const showModal = () => {
	open.value = true
}
const handleOk = (e) => {
	console.log(e)
	open.value = false
}
const formState = reactive({
	username: '',
	password: '',
})
const onFinish = (values) => {
	console.log('Success:', values)
}
const onFinishFailed = (errorInfo) => {
	console.log('Failed:', errorInfo)
}

const selctedStatus = (index) => {
	isActive.value = index
}
</script>

<style lang="less" scoped>
.loginWrap span:nth-child(2n-1) {
	cursor: pointer;
	&:hover {
		opacity: 0.5;
	}
}

.modalWrap {
	.title {
		font-size: 18px;
		line-height: 20px;
		width: 100%;
		text-align: center;
		margin: 30px 0;
	}

	.btnContainer {
		display: flex;

		.btnWrap {
			background-color: rgb(242, 243, 249);
			color: rgb(102, 102, 102);
			width: 70px;
			height: 30px;
			text-align: center;
			border: 1px solid rgb(204, 204, 204);
			border-radius: 5px;
			padding: 4px 0;
			margin: 0 10px 20px 0px;
			cursor: pointer;
		}

		.active {
			background-color: rgb(204, 227, 246);
			color: rgb(114, 136, 250);
			width: 70px;
			height: 30px;
			text-align: center;
			border: 1px solid rgb(114, 136, 250);
			border-radius: 5px;
			padding: 4px 0;
			margin: 0 10px 20px 0px;
			cursor: pointer;
		}
	}
}
</style>
<style>
.ant-modal {
	.ant-modal-content {
		height: 400px;
	}
}

.ant-btn {
	width: 100%;
	height: 40px;
}
</style>
