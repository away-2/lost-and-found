<template>
	<!-- <div class="modal-container"> -->
		<a-modal v-model:open="saveIsOpen" :title="`点赞详情 (${likerList.length})`" :footer="null" @cancel="handleCancel" forceRender>
			<div class="like-list">
				<div class="like-list-item" v-for="(item, index) in likerList" :key="index">
					<img :src="item.likerInfo.avator" alt="" />
					<div class="user-info">
						<div class="user-name">{{ item.likerInfo.nike_name || item.likerInfo.real_name }}</div>
						<div class="user-school">{{ item.likerInfo.school_name }}</div>
					</div>
					<div class="concern-btn" @click="handleConcernSomeone(item.likerInfo.id)" v-show="item.likerInfo.id !== userOfSystemUsing.id" :class="{concerned: isConcern}">关注</div>
				</div>
			</div>
		</a-modal>
	<!-- </div> -->
</template>

<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { findLikeTopicAllUser } from '@/api/hot'
import { concernSomeone, checkAlreadyConcernSomeone } from '@/api/user'
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
const isConcern = ref(false)

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
const handleConcernSomeone = async(id) => {
	console.log(id, "concern");
	let params = { passiveUser: id, concern_way: FD}
	return
	const res = await concernSomeone(params)
	if (res.code == 200) {
		message.success("concern success")
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
			color: #fff;
			background: #1E80FF;
			padding: 5px 32px;
			border-radius: 5px;
			cursor: pointer;

			&:hover {
				opacity: 0.6;
			}
		}
		.concern {
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

