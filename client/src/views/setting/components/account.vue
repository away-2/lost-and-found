<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">账号设置</div>
		</div>
		<div class="account-list">
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">手机</div>
					<div class="device-status">未绑定</div>
				</div>
				<div class="device-bind">绑定</div>
			</div>
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">邮箱</div>
					<div class="device-status">{{ systemUserInfo.email || '未绑定' }}</div>
				</div>
				<div class="device-bind">{{ systemUserInfo.email ? '换绑' : '绑定' }}</div>
			</div>
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">微信</div>
					<div class="device-status">未绑定</div>
				</div>
				<div class="device-bind">绑定</div>
			</div>
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">QQ</div>
					<div class="device-status" style="margin-left: 7px;">未绑定</div>
				</div>
				<div class="device-bind">绑定</div>
			</div>
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">密码</div>
					<div class="device-status"></div>
				</div>
				<div class="device-bind">重置</div>
			</div>
			<div class="account-list-item">
				<div class="device-info">
					<div class="device-name">账号注销</div>
					<div class="device-status"></div>
				</div>
				<div class="device-bind">注销</div>
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

onMounted(() => {})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrapper {
	background: #fff;
	width: 100%;
	height: 600px;
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
	.account-list {
		padding: 0 20px 20px 20px;
		.account-list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60px;
			border-bottom: 1px solid #f1f1f1;

			.device-info {
				display: flex;
				align-items: center;
				column-gap: 40px;
				.device-name {
					font-size: 14px;
					color: #515767;
				}
				.device-status {
					font-size: 14px;
					color: #8a919f;
				}
			}
			.device-bind {
				color: @base-blue-color;
				font-size: 14px;
				cursor: pointer;
				&:hover {
					opacity: 0.7;
				}
			}
		}
	}
}
</style>
