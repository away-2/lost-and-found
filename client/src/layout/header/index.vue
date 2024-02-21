<template>
	<div class="header">
		<div class="header-logo">
			<img src="@/assets/images/logo.png" alt="Element logo" />
			<div class="title">校园失物招领系统</div>
		</div>
		<a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="toRoute" @select="selectedKeys" />
		<div class="header-right">
			<div class="loginWrap" v-show="!token" @click="toLogin">
				登录
			</div>
			<div class="avatorWrap" v-show="token">
				<a-dropdown>
					<img src="@/assets/images/通知.png" alt="" />
					<template #overlay>
						<a-menu>
							<a-menu-item key="1">评论</a-menu-item>
							<a-menu-item key="2">赞和收藏</a-menu-item>
							<a-menu-item key="3">新增粉丝</a-menu-item>
							<a-menu-item key="4">私信</a-menu-item>
							<a-menu-item key="5">系统通知</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
				<a-dropdown :trigger="['click']" :placement="bottomLeft">
					<a-avatar :src="userInfo?.avator" :size="40" />
					<template #overlay>
						<a-menu>
							<a-menu-item key="1">
								<div class="popoverWrap">
									<div class="userInfo">
										<a-avatar :src="userInfo?.avator" :size="46" />
										<div class="username">{{ userInfo.nick_name || userInfo.real_name }}</div>
									</div>
									<div class="counts-item">
										<div class="single-count-item">
											<div class="count-num">{{ userInfo.concern_number }}</div>
											<div class="count-text">关注</div>
										</div>
										<div class="single-count-item">
											<div class="count-num">{{ userInfo.fans_number }}</div>
											<div class="count-text">粉丝</div>
										</div>
										<div class="single-count-item">
											<div class="count-num">{{ userInfo.get_like_number }}</div>
											<div class="count-text">收藏</div>
										</div>
									</div>
								</div>
							</a-menu-item>
							<a-menu-item key="2">
								<img src="@/assets/images/个人中心.png" alt="">
								<div class="title">我的主页</div>
							</a-menu-item>
							<!-- <a-menu-item key="3">新增粉丝</a-menu-item> -->
							<a-menu-item key="4" @click="updatePwd">
								<img src="@/assets/images/修改密码.png" alt="">
								<div class="title">修改密码</div>
							</a-menu-item>
							<a-menu-item key="5" @click="toLogout">
								<img src="@/assets/images/退出登录.png" alt="">
								<div class="title">退出登录</div>
							</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>

			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { GET_USERINFO,REMOVE_USERINFO } from '@/utils/token';
import { Modal } from 'ant-design-vue';
const current = ref(['/home'])
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


const userInfo = GET_USERINFO().user

let $router = useRouter()
let token = GET_USERINFO().token

const selectedKeys = (item) => {
	// console.log(item)
}
const toRoute = (current) => {
	$router.push(current.key)
}

const toLogin = () => {
	$router.push('/login')
}

// 退出登录
const toLogout = () => {
	Modal.confirm({
		title: '确认退出登录吗?',
		content: null,
		okText: '确认',
		cancelText: '取消',
		onOk(){
			REMOVE_USERINFO()
			$router.push('/login')
		},
		onCancel() {
		}
	}) 
	
}

// 修改密码
const updatePwd = () => {
	$router.push('/updatePwd')
}
onMounted(() => {
	$router.push('/')
})
</script>

<style lang="less" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 50px;
	background: #fff;

	.header-logo {
		height: 60px;
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

		.avatorWrap {
			display: flex;
			align-items: center;

			img {
				width: 20px;
				height: 20px;
				margin-right: 15px;
			}
		
		}

		.isLogin {
			display: none;
		}
	}
}
</style>
<style lang="less">
@import "@/assets/style/custom.less";
.ant-menu-horizontal {
	line-height: @base-tabbar-height;
}

.ant-dropdown {
	width: 150px;
	left: 1300px !important;
	top: @base-tabbar-height !important;
}

.ant-dropdown-menu {
	width: 180px;
	.dropdownMenu{
				background-color: red;
			}

}

.ant-dropdown-menu-item[data-menu-id="1"] {
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
			}
		}

		.counts-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 150px;
			margin: 5px 0;
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
.ant-dropdown-menu-item[data-menu-id="1"].ant-dropdown-menu-item-active{
		background-color: #fff !important;
	}

.ant-dropdown-menu-item[data-menu-id="2"] {
	.ant-dropdown-menu-title-content {
		display: flex;
		column-gap: 15px;
		align-items: center;
		img {
			width: 16px;
			height: 16px;
		}
		.title{
			color: #61666d;
		}
	}

}

.ant-dropdown-menu-item[data-menu-id="4"] {
	.ant-dropdown-menu-title-content {
		display: flex;
		column-gap: 15px;
		align-items: center;
		img {
			width: 16px;
			height: 16px;
		}
		.title{
			color: #61666d;
		}
	}
}

.ant-dropdown-menu-item[data-menu-id="5"] {
	.ant-dropdown-menu-title-content {
		display: flex;
		column-gap: 15px;
		align-items: center;

		img {
			width: 16px;
			height: 16px;
		}
		.title{
			color: #61666d;
		}
	}
}</style>
