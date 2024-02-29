<template>
	<!-- <div class="modal-container"> -->
	<a-modal v-model:open="saveIsOpen" :title="`点赞详情 (${likerList.length})`" :footer="null" @cancel="handleCancel" forceRender>
		<div class="like-list">
			<div class="like-list-item" v-for="(item, index) in likerList" :key="index">
				<img :src="item.likerInfo.avator" alt="" />
				<div class="user-info">
					<div class="user-name">{{ item.likerInfo.nick_name || item.likerInfo.real_name }}</div>
					<div class="user-school">{{ item.likerInfo.school_name }}</div>
				</div>
				<div class="concern-btn" @click="handleConcernSomeone(item)" v-show="item.likerInfo.id !== userOfSystemUsing.id" :class="{ concerned: item.alreadyConcern }">
					{{ item.alreadyConcern ? '已关注' : '关注' }}
				</div>
			</div>
		</div>
	</a-modal>
	<!-- </div> -->
</template>

<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { findLikeTopicAllUser } from '@/api/hot'
import { concernSomeone, cancelConcernSomeone } from '@/api/user'
import { message } from 'ant-design-vue'
import { GET_USERINFO } from '@/utils/token'

const props = defineProps({
	isOpen: {
		require: true,
		default: false,
	},
	topicId: {
		require: true,
	},
})

const userOfSystemUsing = reactive(GET_USERINFO().user)
const emits = defineEmits(['update:isOpen'])

const saveIsOpen = computed(() => {
	return props.isOpen
})
const updateIsOpen = (val) => {
	saveIsOpen.value = val
	emits('update:isOpen')
}

const handleCancel = (id) => {
	updateIsOpen(false)
}

const likerList = reactive([])

watchEffect(async () => {
	if (props.isOpen) {
		// 查询点赞过此沸点的所有用户
		const res = await findLikeTopicAllUser(props.topicId)
		if (res.code == 200) {
			likerList.splice(0, likerList.length, ...res.data)
			// console.log(likerList);
		}
	}
})

// 去关注某个用户
const handleConcernSomeone = async (item) => {
	if (item.alreadyConcern) {
		// 取消关注
		const res = await cancelConcernSomeone(item.likerInfo.id)
		if (res.code == 200) {
			const index = likerList.findIndex((r) => r.likerInfo.id === item.likerInfo.id)
			likerList.splice(index, 1, Object.assign(likerList[index], { alreadyConcern: false }))
		}
	} else {
		// 关注
		const res = await concernSomeone({ passiveUser: item.likerInfo.id, concernWay: 'FD' })
		if (res.code == 200) {
			const index = likerList.findIndex((r) => r.likerInfo.id === item.likerInfo.id)
			likerList.splice(index, 1, Object.assign(likerList[index], { alreadyConcern: true }))
		}
	}
}
</script>

<style lang="less" scoped>
.like-list {
	width: 100%;

	.like-list-item {
		padding: 10px 0;
		display: flex;
		align-items: center;
		column-gap: 10px;
		cursor: pointer;
		padding: 10px 20px;

		img {
			width: 45px;
			height: 45px;
			border-radius: 50%;
		}

		.user-info {
			flex: 1 1 auto;

			.user-name {
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
			line-height: 36px;
			text-align: center;
			color: #fff;
			background: #1e80ff;
			border-radius: 5px;
			cursor: pointer;

			&:hover {
				opacity: 0.6;
			}
		}
		.concerned {
			background: #f6f6f7;
			color: #8a919f;
			border: 1px solid #e0e0e0;
		}

		&:hover {
			background: #f7f8fa;
			border-radius: 3px;
		}
	}
}
// :deep(.modal-container .ant-modal-content) {
// 	padding: 20px 0 !important;
// 	background: red;
// 	.ant-modal-title {
// 		padding: 10px 20px !important;
// 	}

// 	.ant-modal-body {
// 		border-top: 1px solid #e4e6eb !important;
// 	}
// }
.ant-modal-content {
	padding: 20px 0 !important;

	.ant-modal-title {
		padding: 10px 20px !important;
	}

	.ant-modal-body {
		border-top: 1px solid #e4e6eb !important;
		// padding-bottom: 30px !important;
	}
}
</style>
