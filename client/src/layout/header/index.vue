<template>
	<div class="header">
		<div class="header-logo">
			<img src="@/assets/images/logo.png" alt="Element logo" />
			<div class="title">校园失物招领系统</div>
		</div>
		<a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @select="selectedKeys" />
		<div class="header-right">
			<div class="loginWrap" v-show="!token" @click="toLogin">登录</div>
			<div class="avatorWrap" v-show="token">
				<a-dropdown>
					<svg t="1709695143893" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1908" width="24" height="22">
						<path
							d="M594.7 143.1c0-43.9-36.8-79.7-82.2-79.7-45.3 0-82.2 35.7-82.2 79.7 0 4.5 0.4 8.9 1.1 13.2-113.5 38.3-206.7 156.1-206.7 295.4v109.6s0 157.9-40 159.3c-23.9 0-42.2 17.8-42.2 39.8 0 22.1 18.4 39.8 41.1 39.8h657.8c22.8 0 41.1-17.8 41.1-39.8 0-22.2-18.4-39.8-41.1-39.8-41.1 0-41.1-158.2-41.1-158.2V451.6c0-139.4-87.1-257.2-206.7-295.5 0.7-4.2 1.1-8.6 1.1-13z m41.1 696.8c-0.1 66.1-54.8 119.5-123.3 119.5-68 0-123.2-53.3-123.3-119.5"
							p-id="1909"
							fill="#8a919f"
						></path>
					</svg>
					<template #overlay>
						<a-menu style="width: 150px; padding: 10px" @click="handleClickMenuItem">
							<a-menu-item key="comment" style="padding: 8px 15px">评论</a-menu-item>
							<a-menu-item key="digg" style="padding: 8px 15px">赞和收藏</a-menu-item>
							<a-menu-item key="follow" style="padding: 8px 15px">新增粉丝</a-menu-item>
							<a-menu-item key="message" style="padding: 8px 15px">私信</a-menu-item>
							<a-menu-item key="system" style="padding: 8px 15px">系统通知</a-menu-item>
							<a-menu-item key="setting" style="padding: 8px 15px">消息设置</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
				<a-dropdown :trigger="['click']" :placement="bottomLeft">
					<a-avatar :src="systemUserInfo.avator" :size="40" />
					<template #overlay>
						<a-menu>
							<a-menu-item key="1">
								<div class="popoverWrap">
									<div class="userInfo">
										<a-avatar :src="systemUserInfo?.avator" :size="46" />
										<div class="username text-ellipsis">{{ systemUserInfo.nick_name || systemUserInfo.real_name }}</div>
									</div>
									<div class="counts-item">
										<div class="single-count-item">
											<div class="count-num">{{ systemUserInfo.concern_number }}</div>
											<div class="count-text">关注</div>
										</div>
										<div class="single-count-item">
											<div class="count-num">{{ systemUserInfo.fans_number }}</div>
											<div class="count-text">粉丝</div>
										</div>
										<div class="single-count-item">
											<div class="count-num">{{ systemUserInfo.collect_post_number }}</div>
											<div class="count-text">收藏</div>
										</div>
									</div>
								</div>
							</a-menu-item>
							<div class="user-func-list">
								<a-menu-item key="2" @click="toUserCenter">
									<img src="@/assets/images/个人中心.png" alt="" />
									<div class="title">我的主页</div>
								</a-menu-item>
								<!-- <a-menu-item key="3">新增粉丝</a-menu-item> -->
								<a-menu-item key="3" @click="updatePwd">
									<img src="@/assets/images/修改密码.png" alt="" />
									<div class="title">修改密码</div>
								</a-menu-item>
								<a-menu-item key="4" @click="toLogout">
									<img src="@/assets/images/退出登录.png" alt="" />
									<div class="title">退出登录</div>
								</a-menu-item>
							</div>
						</a-menu>
					</template>
				</a-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GET_USERINFO, REMOVE_USERINFO } from '@/utils/token'
import { message, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'

const route = useRoute()

const userStore = useUserStore()

const { systemUserInfo } = storeToRefs(userStore)

const convertPathToKey = (path) => {
	let key = path
	if (path.includes('/hot') && !parseInt(path.split('/').pop())) {
		key = '/hot'
	}
	return key
}

const current = ref([convertPathToKey(route.path)])
const items = ref([
	{
		key: '/home',
		label: '首页',
		title: '首页',
	},
	{
		key: '/lost',
		label: '失物大厅',
		title: '失物大厅',
	},
	{
		key: '/found',
		label: '招领大厅',
		title: '招领大厅',
	},
	{
		key: '/publish',
		label: '论坛',
		title: '论坛',
	},
	{
		key: '/hot',
		label: '沸点',
		title: '沸点',
	},
])

watch(()=>route.path,() => {
	current.value = [convertPathToKey(route.path)]
})

// 消息下拉框点击回调
const handleClickMenuItem = ({ item, key, keyPath }) => {
	router.push({ name: 'Notification', params: { method: key } })
}
const userInfo = GET_USERINFO().user

onMounted(() => {
	const userInfo = GET_USERINFO().user
	userStore.getSystemUserInfo(userInfo.id)
})

let router = useRouter()

let token = GET_USERINFO().token

const selectedKeys = ({ key, selectedKeys }) => {
	router.push(key)
}

const toLogin = () => {
	router.push('/login')
}

// 前往个人主页
const toUserCenter = () => {
	router.push({ path: `/user/${userInfo.id}` })
}

// 退出登录
const toLogout = () => {
	Modal.confirm({
		title: '确认退出登录吗?',
		content: null,
		okText: '确认',
		cancelText: '取消',
		onOk() {
			REMOVE_USERINFO()
			router.push('/login')
		},
		onCancel() {},
	})
}

// 修改密码
const updatePwd = () => {
	// router.push('/updatePwd')
}
onMounted(() => {
	// router.push('/')
})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 50px;
	background: #fff;
	box-shadow: 0 2px 8px #f2f3f5;

	.header-logo {
		height: 60px;
		min-width: 200px !important;
		display: flex;
		align-items: center;

		img {
			width: 30px;
			height: 30px;
		}

		.title {
			margin-left: 5px;
			font-size: 18px;
			font-family: 'Myfont';
		}
	}

	.header-right {
		.loginWrap {
			width: 70px;
			height: 30px;
			border: 1px solid #69a0ee;
			background-color: #f4f9ff;
			text-align: center;
			font-size: 13px;
			cursor: pointer;
			padding-top: 6px;
			border-radius: 2px;
		}
		.icon {
			margin-right: 20px;
			&:hover {
				opacity: 0.6;
				path {
					fill: black;
				}
			}
		}

		.avatorWrap {
			display: flex;
			align-items: center;
			cursor: pointer;
		}

		.isLogin {
			display: none;
		}
	}
}
.ant-menu-horizontal {
	line-height: @base-tabbar-height;
}

.ant-dropdown {
	width: 150px;
	left: 1300px !important;
	top: @base-tabbar-height !important;
}

.ant-dropdown-menu {
	width: 220px;
	.dropdownMenu {
		background-color: red;
	}
}

.ant-dropdown-menu-item[data-menu-id='1'] {
	.popoverWrap {
		width: 180px;
		// height: 200px;
		border-bottom: 1px solid #f1f1f1;

		.userInfo {
			display: flex;
			align-items: center;

			.username {
				margin-left: 10px;
				color: #252933;
				width: 70%;
			}
		}

		.counts-item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 8px 0;
			.single-count-item {
				.count-num {
					color: #252933;
					width: 30px;
					font-size: 16px;
					font-weight: 600;
					text-align: center;
				}

				.count-text {
					color: #8a919f;
					font-size: 12px;
					width: 30px;
					text-align: center;
				}
			}
		}
	}
}
.ant-dropdown-menu-item[data-menu-id='1'].ant-dropdown-menu-item-active {
	background-color: #fff !important;
}

.user-func-list {
	::v-deep(.ant-dropdown-menu-item) {
		.ant-dropdown-menu-title-content {
			display: flex;
			column-gap: 15px;
			align-items: center;
			padding: 7px 0;
			img {
				width: 16px;
				height: 16px;
			}
			.title {
				color: #61666d;
			}
		}
	}
}
</style>
