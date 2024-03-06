<template>
	<a-skeleton :loading="loading" active>
		<hot-topic-item v-for="(item, index) in hotList" :key="index" :hotTopic="item" />
	</a-skeleton>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { filndAllHotInfo } from '@/api/hot'
import { useRoute } from 'vue-router'

const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const loading = ref(false)

const route = useRoute()


// 获取沸点列表
const getAllHotInfo = async (id) => {
	let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: '', belong_user: id }
	loading.value = true
	const res = await filndAllHotInfo(data)
	if (res.code == 200) {
		loading.value = false
		 hotList.value = res.data.hotTopicList.map((item) => {
			if (item.pictures) {
				item.pictures = JSON.parse(item.pictures)
			}
			return item
		})
	}
}

onMounted(() => {
	const userId = route.params.id.split('/')[0]
	getAllHotInfo(parseInt(userId))
})
</script>

<style lang="less" scoped></style>
