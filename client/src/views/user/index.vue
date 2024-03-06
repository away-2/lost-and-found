<template>
	<div class="user-container">
		<div class="nav-main-wrapper">
			<div class="avatar">
				<img :src="userInfo.avator" alt="" />
			</div>
			<div class="info-box">
				<div class="introduction">
					<div class="left-box">
						<div class="user-name text-ellipsis">{{ userInfo.nick_name || userInfo.real_name }}</div>
						<div class="user-school">{{ userInfo.school_name }}</div>
					</div>
					<div class="setting-btn" @click="toSettingPage" v-if="systemUserInfo.id == userInfo.id">编辑资料</div>
				</div>

				<div class="user-action">
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">{{ userInfo.fans_number }}</div>
							<div class="user-fans">粉丝</div>
						</div>
					</div>
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">{{ userInfo.concern_number }}</div>
							<div class="user-fans">关注</div>
						</div>
					</div>
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">{{ userInfo.publishHotTopicNumber }}</div>
							<div class="user-fans">沸点</div>
						</div>
					</div>
				</div>

				<div class="bottom-box">
					<div class="left-box">
						<div class="department-box">
							<svg t="1709533475987" class="icon" viewBox="0 0 1036 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1377" width="16" height="16">
								<path
									d="M1008 329.6c-153.6-67.2-307.2-131.2-460.8-198.4-16-6.4-32-6.4-48 0-150.4 67.2-304 131.2-454.4 195.2-16 6.4-32 12.8-32 35.2 0 22.4 16 28.8 32 35.2 140.8 60.8 281.6 118.4 422.4 182.4 38.4 19.2 73.6 22.4 112 0 19.2-12.8 41.6-19.2 64-28.8 89.6-38.4 176-76.8 268.8-115.2v323.2c0 19.2 6.4 25.6 25.6 25.6 19.2 0 25.6-3.2 25.6-25.6 0-96 3.2-195.2-3.2-291.2 0-38.4 6.4-64 48-73.6 16-3.2 28.8-12.8 28.8-32s-12.8-25.6-28.8-32z"
									fill="#72777b"
									p-id="1378"
								></path>
								<path
									d="M848 547.2c0-22.4-6.4-22.4-22.4-16-86.4 38.4-172.8 73.6-256 112-32 12.8-57.6 12.8-89.6 0-86.4-38.4-172.8-73.6-259.2-112-16-6.4-19.2-3.2-19.2 12.8v128c-9.6 86.4 35.2 144 108.8 176 147.2 67.2 294.4 64 438.4-6.4C816 806.4 854.4 755.2 848 672c-3.2-41.6 0-83.2 0-124.8z"
									fill="#72777b"
									p-id="1379"
								></path>
							</svg>
							<div class="department-name">{{ userInfo.department }}</div>
						</div>
						<div class="profile-box">
							<svg t="1709274120226" class="icon" viewBox="0 0 1154 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1316" width="16" height="16">
								<path
									d="M1015.808 64.512q62.464 0 99.84 31.744t37.376 96.256l0 568.32q0 27.648-10.24 52.224t-28.16 43.008-41.984 29.184-50.688 10.752l-892.928 0q-26.624 0-50.176-10.24t-40.96-27.136-27.648-39.424-10.24-48.128l0-580.608q0-55.296 33.792-90.624t95.232-35.328l886.784 0zM287.744 253.952q-19.456 0-36.864 7.168t-30.72 19.968-20.992 30.72-7.68 38.4 7.68 37.888 20.992 30.72 30.72 20.992 36.864 7.68q21.504 0 39.424-7.68t30.72-20.992 20.48-30.72 7.68-37.888q0-41.984-27.648-69.12t-70.656-27.136zM448.512 608.256q0-19.456-7.68-37.376t-20.48-30.72-30.72-20.48-37.376-7.68l-128 0q-39.936 0-67.584 28.16t-27.648 68.096l0 4.096 0 92.16 319.488 0 0-92.16 0-4.096zM923.648 709.632q20.48 0 30.208-10.24t9.728-24.576-11.264-25.088-31.744-10.752l-305.152 0q-20.48 0-30.72 10.752t-10.24 25.088 10.24 24.576 29.696 10.24l309.248 0zM924.672 577.536q20.48 0 29.696-10.24t9.216-24.576q0-15.36-8.704-25.6t-29.184-10.24l-313.344 0q-20.48 0-29.696 10.24t-9.216 25.6q0 14.336 8.704 24.576t29.184 10.24l313.344 0zM925.696 447.488q15.36 0 26.624-10.24t11.264-24.576-11.264-23.04-26.624-8.704l-207.872 0q-15.36 0-26.112 8.704t-10.752 23.04 10.752 24.576 26.112 10.24l207.872 0z"
									p-id="1317"
									fill="#72777b"
								></path>
							</svg>
							<div class="profile multiline-text-ellipsis">
								{{ userInfo.profile }}
							</div>
						</div>
					</div>
					<div class="operate-box" v-if="systemUserInfo.id !== userInfo.id">
						<div class="concern-btn">关注</div>
						<div class="message-btn">私信</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="bottom-image">
			<img src="@/assets/images/bg.gif" alt="" />
		</div> -->
		<div class="main-wrapper">
			<a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @select="selectedKeys" />
			<router-view></router-view>
		</div>
	</div>
	<!-- 返回顶部 -->
	<back-top />
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { findUserInfoById } from '@/api/user'
import { storeToRefs } from 'Pinia'
import useUserStore from '@/store/user'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

// const userInfo = GET_USERINFO().user

const keyAdapter = (key) => {
	if (!isNaN(Number(key))) {
		return ''
	}
	return key
}

const current = ref([keyAdapter(route.path.split('/').pop())])

const items = ref([
	{
		key: '',
		label: '最近',
		title: '最近',
	},
	{
		key: 'losts',
		label: '失物帖子',
		title: '失物帖子',
	},
	{
		key: 'founds',
		label: '招领帖子',
		title: '招领帖子',
	},
	{
		key: 'topic',
		label: '沸点',
		title: '沸点',
	},
	{
		key: 'following',
		label: '关注',
		title: '关注',
	},
	{
		key: 'collect',
		label: '收藏',
		title: '收藏',
	},
	{
		key: 'like',
		label: '点赞',
		title: '点赞',
	},
])

const selectedKeys = ({ key }) => {
	if (route.path.split('/').length === 3) {
		router.push(`${route.path}/${key}`)
	} else {
		if (!key) {
			router.push(`${route.path.split('/').splice(0, 3).join('/')}`)
		} else {
			router.push(`${route.path.split('/').splice(0, 3).join('/')}/${key}`)
		}
	}
}

// 前往设置页
const toSettingPage = () => {
	router.push({ path: '/setting' })
}

const userInfo = reactive({})
// 获取用户信息
const getUserInfo = async () => {
	const res = await findUserInfoById(route.params.id)
	if (res.code == 200) {
		Object.assign(userInfo, res.data)
	}
}
watch(
	() => route.path,
	() => {
		getUserInfo()
	}
)

onMounted(() => {
	getUserInfo()
})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.user-container {
	padding: 20px 150px;

	.nav-main-wrapper {
		width: 100%;
		height: 180px;
		background: #fff;
		border-radius: 2px;
		margin: 10px 0;
		padding: 30px;
		display: flex;
		column-gap: 25px;

		.avatar {
			flex: 0 0 auto;

			img {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				object-fit: cover;

				// 头像旋转动画
				&:hover {
					transform: rotate(666turn);
					transition-duration: 59s;
					transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
				}
			}
		}

		.info-box {
			flex: 1 1 auto;

			.introduction {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 36px;

				.left-box {
					display: flex;
					align-items: center;
					column-gap: 10px;

					.user-name {
						max-width: 150px;
						font-size: 18px;
						color: #000;
					}

					.user-school {
						color: #72777b;
						font-size: 12px;
					}
				}

				.setting-btn {
					width: 118px;
					color: #007fff;
					border: 1px solid #007fff;
					text-align: center;
					line-height: 34px;
					border-radius: 4px;
					cursor: pointer;

					&:hover {
						opacity: 0.6;
					}
				}
			}

			.user-action {
				display: flex;
				margin: 5px 0;

				.user-action-item {
					display: flex;
					justify-content: space-between;

					.user-bar {
						width: 2px;
						height: 20px;
						background: #e8e8ed;
						margin-right: 16px;
					}

					.user-info-box {
						display: flex;
						column-gap: 5px;

						.user-fans-num {
							color: #25262f;
						}

						.user-fans {
							color: #555666;
							line-height: 16px;
							margin-right: 15px;
						}
					}
				}
			}

			.bottom-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left-box {
					.profile-box {
						display: flex;
						column-gap: 10px;
						align-items: flex-start;
						margin-top: 5px;

						.profile {
							font-size: 14px;
							color: #72777b;
						}
					}
					.department-box {
						display: flex;
						column-gap: 10px;
						align-items: flex-start;
						margin-top: 5px;

						.department-name {
							font-size: 14px;
							color: #72777b;
						}
					}
				}

				.operate-box {
					display: flex;
					padding-bottom: 10px;
					justify-content: space-between;
					column-gap: 15px;
				}
			}
		}
	}

	.bottom-image {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}

	.main-wrapper {
		width: 100%;
		height: 100px;
		background: #fff;
	}
}
</style>
