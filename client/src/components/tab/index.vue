<template>
	<div class="tab-container">
		<div v-for="(title, index) in titleTab" :key="index" class="tab-item" :class="{ active: currentIndex === index }" @click="changeTab(index)">
			{{ title }}
		</div>
		<div class="tab-underline" :style="{ left: underlineLeft, width: underlineWidth }"></div>
	</div>
</template>

<script setup>
import { defineProps, reactive, ref, onMounted } from 'vue'

const props = defineProps({
	initialIndex: {
		type: Number,
		default: 0,
	},
	titles: {
		type: Array,
		required: true,
	},
})

const titleTab = reactive(props.titles)
const currentIndex = ref(props.initialIndex)
const underlineLeft = ref(0)
const underlineWidth = ref('')

const changeTab = (index) => {
	currentIndex.value = index
	const tabItems = document.querySelectorAll('.tab-item')
	let totalWidth = 0
	for (let i = 0; i < index; i++) {
		totalWidth += tabItems[i].offsetWidth
	}
	underlineLeft.value = totalWidth + 'px'
	underlineWidth.value = tabItems[index].offsetWidth + 'px'
}

onMounted(() => {
	changeTab(props.initialIndex)
})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.tab-container {
	display: flex;
	position: relative;
	.tab-item {
		position: relative;
		padding: 10px 20px;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s;
		&.active {
			color: @base-blue-color;
		}
	}
	.tab-underline {
		position: absolute;
		bottom: 0;
		height: 1px;
		background: @base-blue-color;
		transition: all 0.3s;
	}
}
</style>
