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
import { scrollLoadMoreHook } from '@/hooks'

const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const loading = ref(false)
const loadMoreLoading = ref(false)

const { registerLoadMore } = scrollLoadMoreHook.setup()

// 获取沸点列表
const getAllHotInfo = async () => {
	let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: 'pass' }
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
	if(loadMoreLoading.value) return
	if (hotList.value.length < total.value) {
		// 如果当前已经有的条数小于总数,则要进行加载
		pageNum.value += 1
		getAllHotInfo()
		return
	}
}

onMounted(() => {
	getAllHotInfo()
	registerLoadMore(loadMoreTopic)
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
