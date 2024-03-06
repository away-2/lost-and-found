<template>
	<div class="container" v-show="showScrollTop" @click="scrollToTop">
		<svg t="1709718543080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1627" id="mx_n_1709718543081" width="20" height="20">
			<path
				d="M803.049772 492.464061l-265.148869-265.335111c-6.516414-6.548136-15.031345-9.691733-23.512507-9.627265-1.146103-0.098237-2.128477-0.654916-3.27458-0.654916-4.780887 0-9.234315 1.112334-13.32754 2.947122-4.125971 1.571798-8.055466 3.962242-11.396561 7.30129L221.018789 492.258377c-12.80463 12.770861-12.836353 33.497928-0.033769 46.302559 6.384407 6.418176 14.768355 9.627265 23.185049 9.627265 8.382924 0 16.733103-3.209088 23.151279-9.561773l211.04667-210.966852 0 576.851007c0 18.108426 14.670118 32.744775 32.746822 32.744775 18.076704 0 32.746822-14.636349 32.746822-32.744775L543.861662 326.052984l212.755592 212.58163c6.386454 6.418176 14.833847 9.660011 23.216771 9.660011s16.700357-3.175319 23.085788-9.528004C815.786865 526.027481 815.820634 505.266645 803.049772 492.464061z"
				fill="#515767"
				p-id="1628"
			></path>
			<path
				d="M872.204805 152.237263l-720.407564 0c-18.076704 0-32.746822-14.670118-32.746822-32.746822s14.670118-32.744775 32.746822-32.744775l720.407564 0c18.108426 0 32.744775 14.670118 32.744775 32.746822S890.312208 152.237263 872.204805 152.237263z"
				fill="#515767"
				p-id="1629"
			></path>
		</svg>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const showScrollTop = ref(false)

onMounted(() => {
	window.addEventListener('scroll', () => {
		const scrollHeight = document.documentElement.scrollTop
		showScrollTop.value = scrollHeight > 80
	})
})

// 回到顶部
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}
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
	bottom: 70px;
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
