<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">通用设置</div>
		</div>
		<div class="page-setting">
			<div class="title">页面设置</div>
			<div class="notes">该设置仅在当前浏览器生效，目前已支持部分核心页面，更多页面适配持续进行中，如有建议可点击页面右下角反馈</div>
			<div class="radio-group">
				<div class="radio-item-wrap">
					<div class="common-skeleton">
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
					</div>
					<div class="radio-item">
						<a-radio :style="radioStyle" :value="1">浅色模式</a-radio>
					</div>
				</div>
				<div class="radio-item-wrap">
					<div class="common-skeleton">
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
						<div class="skeleton-item"></div>
					</div>
					<div class="radio-item">
						<a-radio :style="radioStyle" :value="2">深色模式</a-radio>
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
const value = ref(1)

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
	.page-setting {
		padding: 20px;
		.title {
			font-size: 17px;
		}
		.notes {
			font-size: 14px;
			color: #8a919f;
			margin: 10px 0;
		}
		.radio-group {
			display: flex;
            margin-top: 20px;
		}
	}
}
</style>
