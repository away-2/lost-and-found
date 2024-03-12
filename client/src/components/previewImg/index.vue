<template>
	<div class="prewImg-wrap" :class="{ show: show }">
		<div class="mask" :class="{ show: show }"></div>
		<div class="action">
			<div class="action-item" @click="operateImg('zoomOut')">
				<ZoomOutOutlined />
			</div>
			<div class="action-item" @click="operateImg('zoomIn')">
				<ZoomInOutlined />
			</div>
			<div class="action-item" @click="operateImg('rotate')">
				<ReloadOutlined />
			</div>
			<div class="action-item" @click="handleClose">
				<CloseOutlined />
			</div>
		</div>
		<div class="img-wrap">
			<img :src="imageList[currentShowIndex]" class="pic" :style="imgStyle" />
		</div>
		<div class="switch-box">
			<div class="switch-item" :class="{ disable: currentShowIndex === 0 }" @click="handleSwitchImage('previous')">
				<LeftOutlined />
			</div>
			<div class="switch-item" :class="{ disable: currentShowIndex === imageList.length - 1 }" @click="handleSwitchImage('next')">
				<RightOutlined />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { CloseOutlined, LeftOutlined, RightOutlined, ReloadOutlined, ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons-vue'

const props = defineProps({
	imageList: {
		require: false,
		default: [],
	},
	currentShowIndex: {
		require: false,
		default: 0,
	},
})

const show = ref(false)

const imageList = reactive(props.imageList)
const currentShowIndex = ref(props.currentShowIndex)

const imgTransform = reactive({
	scale: 0,
	rotate: 0,
})

const handleClose = () => {
	document.body.style.overflowY = 'scroll'
	show.value = false
}

const handleOpen = () => {
	document.body.style.overflowY = 'hidden'
	setTimeout(() => {
		show.value = true
		imgTransform.scale = 1
	}, 100)
}

const handleSwitchImage = (opt) => {
	switch (opt) {
		case 'previous':
			if (currentShowIndex.value === 0) return
			currentShowIndex.value = currentShowIndex.value - 1
			break

		case 'next':
			if (currentShowIndex.value === imageList.length - 1) return
			currentShowIndex.value = currentShowIndex.value + 1
			break
	}
}

const imgStyle = computed(() => {
	return {
		transform: `scale(${imgTransform.scale}) rotate(${imgTransform.rotate}deg)`
	}
})

const operateImg = (type) => {
	switch (type) {
		case 'zoomIn':
			// 放大
			imgTransform.scale += 0.3
			break

		case 'zoomOut':
			// 缩小
			imgTransform.scale -= 0.3
			break
		case 'rotate':
			// 旋转
			imgTransform.rotate += 90
			break
	}
}

defineExpose({
	handleClose,
	handleOpen,
})
</script>

<style lang="less" scoped>
.prewImg-wrap {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	transform: scale(0);
	overflow: hidden;
	z-index: 9999;
	transition: all 0.2s;
	&.show {
		transform: scale(1);
	}
	.switch-box {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 15px;
		height: 40px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 999;
		.switch-item {
			width: 40px;
			height: 40px;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(255, 255, 255, 0.7);
			font-size: 20px;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				background: rgba(0, 0, 0, 0.5);
			}
			&.disable {
				cursor: not-allowed;
				background: rgba(0, 0, 0, 0.1);
				color: rgba(255, 255, 255, 0.4);
			}
		}
	}
}
.action {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	right: 0;
	top: 0;
	color: #fff;
	z-index: 30;
	display: flex;
	justify-content: flex-end;
	column-gap: 15px;
	.action-item {
		padding: 20px 15px;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background: rgba(0, 0, 0, 0.5);
		}
	}
}
.mask {
	background: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 20;
	width: 100%;
	height: 100%;
	transform: scale(0);
	transition: all 0.2s;
	&.show {
		transform: scale(1);
	}
}
.img-wrap {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: flex;
	justify-content: center;
	align-items: center;
}
.pic {
	// 默认不给宽高，保持用户上传的图片原始大小，但最大只能是父盒子的宽高
	max-height: 100%;
	max-width: 100%;
	border-radius: 5px;
	cursor: grab;
	transition: all 0.2s;
}
</style>
