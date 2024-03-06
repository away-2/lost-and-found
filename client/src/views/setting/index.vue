<template>
	<div class="setting-container">
		<div class="top-wrapper">
			<div class="navigation" @click="backUserCenter(systemUserInfo.id)">
				<img src="@/assets/images/返回.png" alt="" />
				<span>返回个人主页</span>
			</div>
		</div>
		<div class="main-wrapper">
			<div class="sider-bar-wrap">
				<div class="sider-bar-text" v-for="(item, index) in navigationList" :key="index" :class="{ selected: isSelected == item.path }" @click="handleClickSidebar(item.path)">
					<span>{{ item.title }}</span>
				</div>
			</div>
			<div class="main-content-wrap">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'Pinia'
import useUserStore from '@/store/user'

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()

const navigationList = reactive([
	{ title: '用户信息', path: 'Profile' },
	{ title: '账号设置', path: 'Account' },
	{ title: '通用设置', path: 'Common' },
	{ title: '消息设置', path: 'Messages' },
	{ title: '屏蔽管理', path: 'Block' },
])
const isSelected = ref(route.name)

watch(
	() => route.path,
	() => {
		isSelected.value = route.name
	}
)
// 返回上一级
const backUserCenter = (id) => {
	router.push({ path: `/user/${id}` })
}

const handleClickSidebar = (name) => {
	router.push({ name })
}
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.setting-container {
	padding: 20px 150px;
	position: sticky;
	top: 20px;

	.top-wrapper {
		background: #fff;
		width: 100%;
		height: 50px;

		.navigation {
			display: flex;
			column-gap: 5px;
			align-items: center;
			line-height: 50px;
			margin-left: 20px;
			cursor: pointer;

			img {
				width: 14px;
				height: 14px;
			}

			span {
				font-size: 14px;
				color: @base-blue-color;
			}
		}
	}

	.main-wrapper {
		margin: 20px 0;
		display: flex;
		column-gap: 20px;

		.sider-bar-wrap {
			background: #fff;
			width: 20%;
			height: 600px;
			border-radius: 4px;
			padding: 8px;

			.sider-bar-text {
				height: 40px;
				border-radius: 4px;
				cursor: pointer;
				text-align: center;
				// margin-bottom: 5px;

				span {
					line-height: 40px;
				}

				&:hover {
					background: #eaf2ff;
					color: @base-blue-color;
				}
			}

			.selected {
				background: #eaf2ff;
				color: @base-blue-color;
			}
		}

		.main-content-wrap {
			background: #fff;
			width: 80%;
			height: 600px;
			border-radius: 4px;
		}
	}
}
</style>
