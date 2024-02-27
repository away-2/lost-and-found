<template>
	<a-modal v-model:open="saveIsOpen" :title="`点赞详情`" :footer="null" @cancel="handleCancel">
		<div class="like-list">
			<img :src="avatar" alt="" />
			<div class="user-info">
				<div class="user-name">{{ user_name }}</div>
				<div class="user-school">{{ user_school }}</div>
			</div>
			<div class="concern-btn">关注</div>
		</div>
	</a-modal>
</template>

<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { findLikeTopicAllUser } from '@/api/hot'
import { message } from 'ant-design-vue'

const props = defineProps({
	isOpen: {
		require: true,
		default: false,
	},
	topicId: {
		require: true,
	},
})

const emits = defineEmits(['update:isOpen'])

const saveIsOpen = computed(() => {
	return props.isOpen
})
const updateIsOpen = (val) => {
	saveIsOpen.value = val
	emits('update:isOpen')
}

const handleCancel = () => {
	updateIsOpen(false)
}

const likerList = reactive([])

watchEffect(async () => {
	if (props.isOpen) {
		const res = await findLikeTopicAllUser(props.topicId)
		if (res.code == 200) {
			message.success('userList')
            likerList.splice(0,likerList.length,...res.data)
			console.log(likerList)
		}
	}
})
</script>

<style lang="less" scoped></style>
