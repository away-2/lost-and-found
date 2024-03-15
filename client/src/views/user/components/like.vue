<template>
	<empty-status title="暂无点赞哦~" :isShow="total === 0" />
	<a-skeleton :loading="loading" active>
		<hot-topic-item v-for="(item, index) in hotTopicList" :key="index" :hotTopic="item" />
	</a-skeleton>
	<a-skeleton :loading="loadMoreLoading" active style="height: 80px"></a-skeleton>
	<div v-show="hotTopicList.length >= total && total > 0" class="no-more-data">已经滑到底了,没有更多沸点啦</div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { findUserIncreaseFansNotice } from '@/api/notification'
import { findUserLikeTopicByPaging } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { scrollLoadMoreHook } from '@/hooks/index'

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

const { registerLoadMore } = scrollLoadMoreHook.setup()

const route = useRoute()

const total = ref(0)
const queryParams = reactive({
	pageNum: 1,
	pageSize: 5,
	user_id: parseInt(route.params.id),
	view_user_id: systemUserInfo.value.id,
})

const loading = ref(false)
const loadMoreLoading = ref(false)

const hotTopicList = reactive([])

const searchLikeTopic = async () => {
	if (queryParams.pageNum === 1) {
		loading.value = true
	} else {
		loadMoreLoading.value = true
	}
	const res = await findUserLikeTopicByPaging(queryParams)
	loading.value = false
	loadMoreLoading.value = false
	if (res.code == 200) {
		total.value = res.data.total
		hotTopicList.push(
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
	if (loadMoreLoading.value) return
	if (hotTopicList.length < total.value) {
		queryParams.pageNum += 1
		searchLikeTopic()
	}
}

watch(systemUserInfo, () => {
	if (systemUserInfo.value.id) {
		searchLikeTopic()
		registerLoadMore(loadMoreTopic, 260)
	}
}, { immediate: true })
</script>

<style lang="less" scoped>
.no-more-data {
	text-align: center;
	margin: 20px 0 10px 0;
	font-size: 14px;
	color: rgb(99, 99, 99);
}
</style>
