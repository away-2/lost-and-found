<template>
	<div class="container" @click="">
		<svg t="1709864459261" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1650" width="22" height="22">
			<path d="M797.5 760.3L458.3 655.9l339.2-391.4-443.6 391.4L93 551.5l835-443.6-130.5 652.4zM458.3 916.9V734.2l104.4 52.2-104.4 130.5z m0 0" p-id="1651" fill="#515767"></path>
		</svg>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 图标距离底部的距离
const iconBottom = ref('70px')

onMounted(() => {
	window.addEventListener('scroll', () => {
		const scrollHeight = document.documentElement.scrollTop
        if (scrollHeight > 80) {
            iconBottom.value = '130px'
        } else {
            iconBottom.value = '70px'
        }
	})
})


</script>

<style lang="less" scoped>
.container {
	background: #fff;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	box-shadow: 0 2px 8px rgba(50, 50, 50, 0.04);
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: v-bind(iconBottom);
	right: 30px;
	cursor: pointer;
	&:hover {
		.icon {
			path {
				fill: #1e80ff;
			}
		}
	}
}
</style>
