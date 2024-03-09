<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">个人资料</div>
		</div>
		<div class="form-wrapper">
			<div class="left-box">
				<div class="base-info">基本信息</div>
				<div class="form-box">
					<a-spin :spinning="loading">
						<a-form :model="userInfo" v-bind="layout" name="nest-messages" ref="formRef">
							<a-form-item :name="real_name" label="用户名">
								<a-input v-model:value="userInfo.real_name" disabled />
							</a-form-item>
							<a-form-item :name="nick_name" label="昵称">
								<a-input v-model:value="userInfo.nick_name" />
							</a-form-item>
							<a-form-item :name="school" label="学校" :rules="[{ type: 'email' }]">
								<a-input v-model:value="userInfo.school_name" disabled />
							</a-form-item>
							<a-form-item :name="grade" label="年级" :rules="[{ type: 'number', min: 0, max: 99 }]">
								<a-input v-model:value="userInfo.grade" disabled />
							</a-form-item>
							<a-form-item :name="department" label="学院">
								<a-input v-model:value="userInfo.department" disabled />
							</a-form-item>
							<a-form-item :name="profile" label="个人简介">
								<a-textarea v-model:value="userInfo.profile" :rows="5" />
							</a-form-item>
							<a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
								<a-button type="primary" @click="onFinish">保存修改</a-button>
							</a-form-item>
						</a-form>
					</a-spin>
				</div>
			</div>
			<div class="right-box">
				<div class="content-box">
					<div class="avatar-box" @click="handleUploadAvatar">
						<img :src="avatar" alt="" />
						<input ref="avatorUploadRef" type="file" v-show="false" accept=".jpg,.png" @change="handleAvatarUploadChange" />
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
	<cropper ref="cropperRef" />
</template>

<script setup>
import { reactive, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { fileUpload } from '@/api/upload'
import { updateUserInfo } from '@/api/user'
import useUserStore from '@/store/user'
import { message } from 'ant-design-vue'

const cropperRef = ref(null)
const avatorUploadRef = ref(null)
const formRef = ref(null)

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

let userInfo = reactive({
	real_name: '',
	nick_name: '',
	school_name: '',
	grade: '',
	department: '',
	profile: '',
})

const avatar = ref('')

watch(
	() => systemUserInfo.value,
	() => {
		Object.keys(userInfo).forEach((key) => {
			userInfo[key] = systemUserInfo.value[key]
		})
		avatar.value = systemUserInfo.value.avator
	},
	{ immediate: true }
)

const layout = {
	labelCol: {
		span: 3,
	},
	wrapperCol: {
		span: 16,
	},
}

const loading = ref(false)

const onFinish = () => {
	formRef.value
		.validate()
		.then(async () => {
			loading.value = true
			const res = await updateUserInfo(userInfo)
			loading.value = false
			if (res.code == 200) {
				message.success('修改个人信息成功!')
				userStore.updateSystemUserInfo(userInfo)
			}
		})
		.catch((e) => {})
}

onMounted(() => {})

const handleUploadAvatar = () => {
	avatorUploadRef.value.click()
}

// 选择好头像图片回调
const handleAvatarUploadChange = (e) => {
	const files = e.target.files
	const rawFile = files[0]
	const src = URL.createObjectURL(rawFile)
	e.target.value = null
	handleCropImg(src)
}

// 用户选择好图片后，开始进入裁剪阶段
const handleCropImg = (imgSrc) => {
	console.log(cropperRef.value)
	cropperRef.value.showModal({
		img: imgSrc,
		success: (res) => {
			// 裁剪完成 拿到的是一个blob对象
			const reader = new FileReader()
			reader.readAsDataURL(res.img)
			reader.onload = () => {
				avatar.value = reader.result
			}
			// blob转成file对象
			const file = new File([res.img], 'random.jpg', { type: 'application/json', lastModified: Date.now() })
			uploadImg(file)
		},
	})
}

// 裁剪好图片就该修改用户头像了
const uploadImg = async (file) => {
	const formData = new FormData()
	formData.append('file', file)
	const res = await fileUpload(formData)
	if (res.code == 200) {
		const updateAvatarRes = await updateUserInfo({ avator: res.data.file_path })
		if (updateAvatarRes.code == 200) {
			message.success('保存头像成功!')
			userStore.updateSystemUserInfo({ avator: res.data.file_path })
		}
	}
}
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
					position: relative;
					cursor: pointer;
					&:hover {
						&::after {
							opacity: 1;
						}
					}
					&::after {
						content: '编辑头像';
						position: absolute;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.6);
						left: 0;
						top: 0;
						border-radius: 50%;
						color: white;
						font-size: 13px;
						display: flex;
						align-items: center;
						justify-content: center;
						opacity: 0;
						transition: all 0.3s;
					}
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						object-fit: cover;
						cursor: pointer;
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
