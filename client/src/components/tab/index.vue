<template>
	<div class="tab-container">
		<div v-for="(title, index) in titleTab" :key="index" class="tab-item" :class="{ active: currentIndex === index }" @click="changeTab(index)">
			<span>{{ title }}</span>
			<div class="tab-underline" :class="{ active: currentIndex === index }"></div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'

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

const changeTab = (index) => {
	currentIndex.value = index
}
</script>

<style lang="less" scoped>
.tab-container {
	display: flex;
	position: relative;
	.tab-item {
		position: relative;
		padding: 10px 20px;
		cursor: pointer;
		transition: all 0.3s;
		.tab-underline {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 2px;
			background-color: blue;
			transition: all 0.3s;
            &.active {
                width: 100%;
            }
		}
	}
}

// .tab-item.active .tab-underline {
// 	width: 100%;
// }
</style>
