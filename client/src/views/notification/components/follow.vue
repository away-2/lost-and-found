<template>
	<a-skeleton active :loading="loading">
		<div class="container-wrap">
			<div class="digg-list" v-for="(item, index) in fansList" :key="index">
				<div class="digg-item" @click="toUserCenter(item.fanId)">
					<div class="left-box">
						<div class="avatar">
							<img :src="item.fanUserInfo.avator" alt="" />
						</div>
						<div class="digg-info">
							<div class="user-info">
								<div class="user-name text-ellipsis">{{ item.fanUserInfo.nick_name || item.fanUserInfo.real_name }}</div>
								<div class="user-operate">
									<span>关注了你</span>
								</div>
							</div>
							<div class="main-content">{{ item.fanUserInfo.profile }}</div>
							<div class="timestamp">{{ computedFormatPast(item.createdAt) }}</div>
						</div>
					</div>
					<div class="operate-box">
						<div class="concern-btn" :class="{ concerned: item.alreadyConcernFan }" @click.stop="handleConcernSomeone(item)">{{ item.alreadyConcernFan ? '已关注' : '关注' }}</div>
					</div>
				</div>
			</div>
		</div>
	</a-skeleton>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { findUserIncreaseFansNotice } from '@/api/notification'
import { concernSomeone, cancelConcernSomeone } from '@/api/user'
import { formatPast } from '@/utils/time'
import { useComputed } from '@/utils/common'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const fansList = reactive([])

const loading = ref(false)

// 获取所有新增粉丝通知
const getAllIncreaseFansNotice = async () => {
	loading.value = true
	const res = await findUserIncreaseFansNotice()
	loading.value = false
	if (res.code == 200) {
		fansList.push(...res.data)
	}
}

// 让当前用户关注某个用户/取消关注某个用户
const handleConcernSomeone = async (data) => {
	let params = { passiveUser: data.fanUserInfo.id, concernWay: 'FD' }
	let res = null
	if (data.alreadyConcernFan) {
		// 取消关注用户
		res = await cancelConcernSomeone(data.fanUserInfo.id)
		if (res.code == 200) {
			data.alreadyConcernFan = false
		}
	} else {
		// 关注用户
		res = await concernSomeone(params)
		if (res.code == 200) {
			data.alreadyConcernFan = true
		}
	}
}

onMounted(() => {
	getAllIncreaseFansNotice()
})

// 前往个人主页
const toUserCenter = (id) => {
	const { href } = router.resolve({
		path: `/user/${id}`,
	})
	window.open(href, '_blank')
}

const computedFormatPast = useComputed(formatPast)

</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
@import url('@/style/index.less');

.container-wrap {
	padding: 10px 0;
	.digg-list {
		border-bottom: 1px solid #f1f1f1;
		padding: 15px;
		border-radius: 3px;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background: rgb(247, 248, 250);
		}
		.digg-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left-box {
				display: flex;
				column-gap: 15px;
				.avatar {
					flex: 0 0 auto;
					img {
						width: 42px;
						height: 42px;
						border-radius: 50%;
						object-fit: cover;
					}
				}
				.digg-info {
					flex: 1;
					.user-info {
						display: flex;
						align-items: center;
						.user-name {
							font-size: 16px;
							max-width: 150px;
						}
						.user-operate {
							display: flex;
							span {
								margin: 0 10px;
								font-size: 14px;
								color: #8a919f;
							}
						}
					}
					.main-content {
						font-size: 13px;
						color: #8a919f;
					}
					.timestamp {
						font-size: 13px;
						color: #8a919f;
						margin: 5px 0;
						margin-top: 8px;
					}
				}
			}
			.operate-box {
				height: 20px;
				transform: translateY(-10px);
				.concern-btn {
					.common-concern-btn(@width: 90px,@bg: #f5f8ff,@color: #2d88ff,@borderColor: rgba(30,128,255,0.3));
				}
			}
		}
	}
}
.ant-tabs-top > .ant-tabs-nav {
	margin: 0 !important;
}
</style>
