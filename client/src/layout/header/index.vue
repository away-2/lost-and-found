<template>
	<div class="header">
		<div class="header-logo">
			<img src="@/assets/images/logo.png" alt="Element logo" />
			<div class="title">校园失物招领系统</div>
		</div>
		<a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="toRoute" @select="selectedKeys" />
		<div class="header-right">
			<div class="loginWrap" :class="{ isLogin: isLogin }">
				<Login />
			</div>
			<div class="avatorWrap">
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
				<a-dropdown :trigger="['click']">
					<a-avatar src="@/assets/images/logo.png" />
					<template #overlay>
						<a-menu>
							<a-menu-item key="1">
					<a-avatar src="@/assets/images/logo.png" />
								
							</a-menu-item>
							<a-menu-item key="2">赞和收藏</a-menu-item>
							<a-menu-item key="3">新增粉丝</a-menu-item>
							<a-menu-item key="4">私信</a-menu-item>
							<a-menu-item key="5">系统通知</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Login from '@/views/login/Login.vue'
import { useRouter } from 'vue-router'

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
const isLogin = ref(true)
let $router = useRouter()

const selectedKeys = (item) => {
	console.log(item)
}
const toRoute = (current) => {
	$router.push(current.key)
}

onMounted(() => {
	// console.log($router.options.routes);
})
</script>

<style lang="less" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 50px;

	.header-logo {
		height: 60px;
		display: flex;
		align-items: center;

		// width: 25px;
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
			width: 100px;
		}
		.avatorWrap {
			display: flex;
			// justify-content: center;
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
<style>
.ant-menu-horizontal {
	line-height: 60px;
}
.ant-dropdown {
	width: 150px;
}
</style>
