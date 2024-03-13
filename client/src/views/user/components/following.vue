<template>
	<div class="container-wrapper">
		<div class="top-wrapper">
			<div class="title">关注</div>
			<div class="type">
				<div class="concern-user" :class="{ active: concernType == 'concern' }" @click="handleConcernType('concern')">关注的用户</div>
				<div class="divider"></div>
				<div class="fans-user" :class="{ active: concernType == 'fans' }" @click="handleConcernType('fans')">粉丝</div>
			</div>
		</div>
		<!-- 空状态 -->
		<empty-status title="暂无关注哦~" :isShow="!concernList" />
		<!-- 关注用户列表 -->
		<div class="digg-list" v-for="(item, index) in concernList" :key="index" v-if="concernType == 'concern'">
			<div class="digg-item" @click="toUserCenter(item.concernUserInfo.id)">
				<div class="left-box">
					<div class="avatar">
						<img :src="item.concernUserInfo.avator" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name text-ellipsis">{{ item.concernUserInfo.nick_name || item.concernUserInfo.real_name }}</div>
							<div class="user-school">{{ item.concernUserInfo.school_name }}</div>
						</div>
						<div class="main-content">{{ item.concernUserInfo.profile }}</div>
					</div>
				</div>
				<div class="operate-box">
					<div class="concern-btn" :class="{ concerned: item.alreadyConcern }" @click.stop="handleConcernSomeone(item)">{{ item.alreadyConcern ? '已关注' : '关注' }}</div>
				</div>
			</div>
		</div>
		<!-- 粉丝用户列表 -->
		<div class="digg-list" v-for="(item, index2) in fansList" :key="index2" v-else>
			<div class="digg-item" @click="toUserCenter(item.fanUserInfo.id)">
				<div class="left-box">
					<div class="avatar">
						<img :src="item.fanUserInfo.avator" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name text-ellipsis">{{ item.fanUserInfo.nick_name || item.fanUserInfo.real_name }}</div>
							<div class="user-school">{{ item.fanUserInfo.school_name }}</div>
						</div>
						<div class="main-content">{{ item.fanUserInfo.profile }}</div>
					</div>
				</div>
				<div class="operate-box">
					<div class="concern-btn" :class="{ concerned: item.alreadyConcern }" @click.stop="handleConcernSomeone(item)">{{ item.alreadyConcern ? '已关注' : '关注' }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { findUserIncreaseFansNotice } from '@/api/notification'
import { concernSomeone, cancelConcernSomeone, findSomeoneAllConcernUser, findSomeoneAllFans } from '@/api/user'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 粉丝列表
const fansList = reactive([])
// 关注列表
const concernList = reactive([])
// 关注页面tab栏选项卡
const concernType = ref('concern')
// 当前个人页面用户id
const userId = ref(null)

// 获取当前用户所有关注用户
const getAllConcernUser = async (id) => {
	const res = await findSomeoneAllConcernUser(id)
	if (res.code == 200) {
		concernList.push(...res.data)
	}
}

// 获取当前用户所有粉丝
const getAllFansUser = async () => {
	const res = await findSomeoneAllFans(userId.value)
	if (res.code == 200) {
		console.log(res.data, 'userId.value')
		fansList.push(...res.data)
	}
}

// 让当前用户关注某个用户/取消关注某个用户
const handleConcernSomeone = async (data) => {
	let params, id
	if (concernType.value == 'concern') {
		params = { passiveUser: data.concernUserInfo.id, concernWay: 'FD' }
		id = data.concernUserInfo.id
	} else {
		params = { passiveUser: data.fanUserInfo.id, concernWay: 'FD' }
		id = data.fanUserInfo.id
	}
	let res = null
	if (data.alreadyConcern) {
		// 取消关注用户
		res = await cancelConcernSomeone(id)
		if (res.code == 200) {
			data.alreadyConcern = false
		}
	} else {
		// 关注用户
		res = await concernSomeone(params)
		if (res.code == 200) {
			data.alreadyConcern = true
		}
	}
}

// 选中关注方式
const handleConcernType = (type) => {
	concernType.value = type
	if (type == 'concern') {
		// concernList.splice(0,concernList.length)
		getAllConcernUser()
	} else {
		fansList.splice(0, fansList.length)
		getAllFansUser()
	}
}

onMounted(() => {
	userId.value = route.params.id.split('/')[0]
	getAllConcernUser(parseInt(userId.value))
})

// 前往个人主页
const toUserCenter = (id) => {
	const { href } = router.resolve({
		path: `/user/${id}`,
	})
	window.open(href, '_blank')
}

</script>

<style lang="less" scoped>
@import url('@/style/index.less');

.container-wrapper {
	background: #fff;
	.top-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		padding: 0 20px;
		border-bottom: 1px solid #f1f1f1;
		.title {
			font-size: 18px;
			color: #000;
		}
		.type {
			display: flex;
			align-items: center;
			.concern-user {
				color: #72777b;
				font-size: 15px;
				cursor: pointer;
			}
			.divider {
				width: 1px;
				height: 16px;
				background: #e4e1e1;
				margin: 0 10px;
			}
			.fans-user {
				color: #72777b;
				font-size: 15px;
				cursor: pointer;
			}
			.active {
				color: #000;
			}
		}
	}

	.digg-list {
		border-bottom: 1px solid #f1f1f1;
		padding: 20px 20px;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background: rgb(248, 248, 248);
		}
		.digg-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left-box {
				display: flex;
				align-items: center;
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
						column-gap: 5px;
						.user-name {
							font-size: 14px;
							max-width: 150px;
						}
						.user-school {
							font-size: 12px;
							color: #848b99;
						}
					}
					.main-content {
						font-size: 12px;
						color: #b1b7c2;
						margin-top: 10px;
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
</style>
