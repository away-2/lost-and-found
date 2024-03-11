<template>
	<div class="empty-container" v-show="isShow">
		<div class="empty-content">
			<img src="@/assets/images/暂无数据.png" alt="" />
			<div class="text">{{ title }}</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: '暂无数据',
	},
	isShow: {
		default: false,
	},
})
</script>

<style lang="less" scoped>
.empty-container {
	width: 100%;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	.empty-content {
		img {
			width: 180px;
			height: 180px;
		}

		.text {
            width: 100%;
            text-align: center;
			color: #8a919f;
            font-size: 14px;
		}
	}
}
</style>
