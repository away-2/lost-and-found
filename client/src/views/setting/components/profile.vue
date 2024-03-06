<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">个人资料</div>
		</div>
		<div class="form-wrapper">
			<div class="left-box">
				<div class="base-info">基本信息</div>
				<div class="form-box">
					<a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages" @finish="onFinish">
						<a-form-item :name="real_name" label="用户名">
							<a-input v-model:value="systemUserInfo.real_name" disabled />
						</a-form-item>
						<a-form-item :name="nick_name" label="昵称">
							<a-input v-model:value="formState.nick_name" />
						</a-form-item>
						<a-form-item :name="school" label="学校" :rules="[{ type: 'email' }]">
							<a-input v-model:value="systemUserInfo.school_name" disabled />
						</a-form-item>
						<a-form-item :name="grade" label="年级" :rules="[{ type: 'number', min: 0, max: 99 }]">
							<a-input v-model:value="systemUserInfo.grade" disabled />
						</a-form-item>
						<a-form-item :name="department" label="学院">
							<a-input v-model:value="systemUserInfo.department" disabled />
						</a-form-item>
						<a-form-item :name="profile" label="个人简介">
							<a-textarea v-model:value="formState.profile" :rows="5" />
						</a-form-item>
						<a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
							<a-button type="primary" html-type="submit">保存修改</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
			<div class="right-box">
				<div class="content-box">
					<div class="avatar-box">
						<img :src="systemUserInfo.avator" alt="" />
					</div>
					<div class="text">上传头像</div>
					<div class="notes">
						<div class="format">格式：支持JPG、PNG、JPEG</div>
						<div class="size">大小：5M以内</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

let userInfo = ref(systemUserInfo)

const layout = {
	labelCol: {
		span: 3,
	},
	wrapperCol: {
		span: 16,
	},
}
const formState = reactive({
	nick_name: `${userInfo.value.nick_name}`,
	profile: `${userInfo.value.profile}`,
})
const onFinish = (values) => {
	console.log('Success:', values)
}

onMounted(() => {})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrapper {
	background: #fff;
	width: 100%;
	border-radius: 4px;

	.title-wrapper {
		height: 50px;
		padding: 15px 20px;
		border-bottom: 1px solid #f1f1f1;
		.text {
			font-size: 18px;
			line-height: 24px;
		}
	}
	.form-wrapper {
		padding: 20px;
		display: flex;
		.left-box {
			width: 70%;

			.base-info {
				font-size: 14px;
				margin-bottom: 20px;
			}
		}
		.right-box {
			flex: 1;
			.content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				.avatar-box {
					width: 90px;
					height: 90px;
					img {
						width: 90px;
						height: 90px;
						border-radius: 50%;
						object-fit: cover;
						cursor: pointer;
						:hover {
							opacity: 0.7;
						}
					}
				}
				.text {
					margin-top: 15px;
					font-size: 14px;
				}
				.notes {
					.format {
						font-size: 13px;
						margin-top: 15px;
						color: @base-gray-color;
					}
					.size {
						font-size: 13px;
						margin-top: 10px;
						color: @base-gray-color;
					}
				}
			}
		}
	}
}
</style>
