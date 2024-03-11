<template>
	<a-skeleton :loading="loading" active>
		<hot-topic-item v-for="(item, index) in hotList" :key="index" :hotTopic="item" />
	</a-skeleton>
	<a-skeleton :loading="loadMoreLoading" active style="height: 80px;"></a-skeleton>
	<div v-show="hotList.length >= total && total > 0" class="no-more-data">已经滑到底了,没有更多沸点啦</div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { filndAllHotInfo } from '@/api/hot'
import { message } from 'ant-design-vue'

const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const loading = ref(false)
const loadMoreLoading = ref(false)

// 获取沸点列表
const getAllHotInfo = async () => {
	let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: 'pass', classify: 'hot' }
	if(pageNum.value === 1) {
		loading.value = true
	} else {
		loadMoreLoading.value = true
	}
	const res = await filndAllHotInfo(data)
	if (res.code == 200) {
		loading.value = false
		loadMoreLoading.value = false
		total.value = res.data.total
		hotList.value.push(
			...res.data.hotTopicList.map((item) => {
				if (item.pictures) {
					item.pictures = JSON.parse(item.pictures)
				}
				return item
			})
		)
	}
}

// 加载更多函数
const loadMoreTopic = () => {
	// 如果正在加载中,不要进行加载
	if (loadMoreLoading.value) return
	if (hotList.value.length < total.value) {
		// 如果当前已经有的条数小于总数,则要进行加载
		pageNum.value += 1
		getAllHotInfo()
		return
	}
}

// 通用防抖函数，传进一个函数，返回一个带有防抖功能的函数
function debounce(fn, delay) {
	var time = null
	return () => {
		clearTimeout(time)
		time = setTimeout(() => {
			fn()
		}, delay)
	}
}

// 处理window的scroll回调
const handleWindowScroll = () => {
	const item = document.querySelectorAll('.hotTopicItem')
	const lastItem = item[item.length - 1]
	if (!lastItem) return
	// 如果滚动到最后一项的头顶时，就可以调用加载更多函数
	if (lastItem.offsetTop + 60 < document.documentElement.clientHeight + document.documentElement.scrollTop) {
		loadMoreTopic()
	}
}

onMounted(() => {
	getAllHotInfo()
	// 监听window的scroll事件
	window.onscroll = debounce(handleWindowScroll, 300)
})

onUnmounted(() => {
	// 卸载监听scroll事件
	window.onscroll = null
})
</script>

<style lang="less" scoped>
.no-more-data {
	text-align: center;
	margin: 20px 0 10px 0;
	font-size: 14px;
	color: rgb(99, 99, 99);
}
</style>
