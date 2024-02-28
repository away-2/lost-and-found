<template>
	<a-modal v-model:open="saveIsOpen" :title="`点赞详情`" :footer="null" @cancel="handleCancel">
		<div class="like-list" v-for="(item, index) in likerList" :key="index">
			<img :src="item.likerInfo.avator" alt="" />
			<div class="user-info">
				<div class="user-name">{{ item.likerInfo.nike_name || item.likerInfo.real_name }}</div>
				<div class="user-school">{{ item.likerInfo.school_name }}</div>
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
            likerList.splice(0,likerList.length,...res.data)
			console.log(likerList);
		}
	}
})
</script>

<style lang="less" scoped>
.like-list {
	padding: 10px 0;
	display: flex;
	align-items: center;
	column-gap: 10px;
	cursor: pointer;
	img{
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}
	.user-info {
		flex: 1 1 auto;
		.user-name{
			font-weight: 400;
			font-size: 16px;
			color: #282f38;
			line-height: 22px;

		}
		.user-school {
			font-weight: 500;
			font-size: 12px;
			color: #8a919f;
		}
	}
	.concern-btn {
		width: 92px;
		height: 36px;
		color: #fff;
		background: #1E80FF;
		padding: 5px 32px;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			opacity: 0.6;
		}
	}
	&:hover {
		background: #f7f8fa;
		border-radius: 3px;
	}
}
</style>
