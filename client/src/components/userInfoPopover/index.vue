<template>
	<a-popover @openChange="handleOpenChange">
		<template #content>
			<div class="wrapper">
				<div class="user-popover-header">
					<img :src="userInfo.avator" alt="" @click="toUserCenter(userInfo.id)" />
					<div class="user-info">
						<div class="user-name">{{ userInfo.nick_name || userInfo.real_name }}</div>
						<div class="user-school">{{ userInfo.school_name }}</div>
					</div>
				</div>
				<div class="user-popover-btn" v-show="userInfo.id !== userOfSystemUsing.id">
					<a-spin :spinning="concernLoading">
						<div class="concern-btn" :class="{ concerned: isConcernUser }" @click="handleConcernSomeone(userInfo)">{{ isConcernUser ? '已关注' : '关注' }}</div>
					</a-spin>
					<div class="message-btn">私信</div>
				</div>
				<div class="user-popover-footer">
					<div class="single-count-item">
						<div class="count-num">{{ userInfo.concern_number }}</div>
						<div class="count-text">关注</div>
					</div>
					<div class="single-count-item">
						<div class="count-num">{{ userInfo.fans_number }}</div>
						<div class="count-text">粉丝</div>
					</div>
				</div>
			</div>
		</template>
		<slot></slot>
	</a-popover>
</template>

<script setup>
import { concernSomeone, cancelConcernSomeone, checkAlreadyConcernSomeone } from '@/api/user'
import { GET_USERINFO } from '@/utils/token'
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
	userInfo: {
		require: true,
		default: {},
	},
})

let userOfSystemUsing = GET_USERINFO().user

const isConcernUser = ref(false)

// 让当前用户关注某个用户/取消关注某个用户
const handleConcernSomeone = async (userInfo) => {
	let params = { passiveUser: userInfo.id, concern_way: 'FD' }
	let res = null
	if (isConcernUser.value) {
		// 取消关注用户
		res = await cancelConcernSomeone(userInfo.id)
		if(res.code == 200) {
			isConcernUser.value = !isConcernUser.value
		}
	} else {
		// 关注用户
		res = await concernSomeone(params)
		if(res.code == 200) {
			isConcernUser.value = !isConcernUser.value
		}
	}
}

const router = useRouter()

// 前往个人主页
const toUserCenter = (id) => {
	router.push({ path: `/user/${id}` })
}

const concernLoading = ref(false)

const handleCheckIsConcernUser = async () => {
	if (userOfSystemUsing.id !== props.userInfo.id) {
		concernLoading.value = true
		const res = await checkAlreadyConcernSomeone(props.userInfo.id)
		concernLoading.value = false
		if (res.code == 200) {
			isConcernUser.value = res.data
		}
	}
}

const handleOpenChange = (visible) => {
	if (visible) {
		handleCheckIsConcernUser()
	}
}
</script>

<style lang="less" scoped>
.ant-popover-inner-content {
	.wrapper {
		min-width: 250px;
	}

	.user-popover-header {
		display: flex;
		column-gap: 10px;
		padding: 10px 0;
		padding-bottom: 13px;

		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
			cursor: pointer;
		}

		.user-info {
			display: flex;
			flex-direction: column;
			row-gap: 5px;

			.user-name {
				font-weight: 500;
				font-size: 16px;
			}

			.user-school {
				font-size: 12px;
				font-weight: 300;
				color: #a9a9a9;
			}
		}
	}

	.user-popover-btn {
		display: flex;
		padding-bottom: 10px;
		justify-content: space-between;
		column-gap: 15px;

		.concern-btn {
			width: 110px;
			height: 32px;
			background: #1e80ff;
			color: #fff;
			cursor: pointer;
			border-radius: 3px;
			text-align: center;
			padding: 4px 20px;
		}

		.concerned {
			background: #f6f6f7;
			color: #8a919f;
			border: 1px solid #e0e0e0;
		}

		.concern-btn:hover {
			opacity: 0.6;
		}

		.message-btn {
			width: 110px;
			height: 32px;
			background: #1e80ff0d;
			color: #1e80ff;
			cursor: pointer;
			border-radius: 3px;
			text-align: center;
			padding: 4px 20px;
			border: 1px solid rgba(30, 128, 255, 0.3);
		}

		.message-btn:hover {
			opacity: 0.6;
		}
	}

	.user-popover-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0;
		width: 100%;
		border-top: 1px solid #e4e6eb;

		.single-count-item {
			padding: 0 35px;

			.count-num {
				color: #252933;
				width: 30px;
				font-size: 16px;
				font-weight: 600;
				text-align: center;
			}

			.count-text {
				color: #8a919f;
				/* font-size: 12px; */
				width: 30px;
				text-align: center;
			}
		}
	}
}
</style>
