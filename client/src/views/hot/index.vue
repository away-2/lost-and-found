<template>
	<div class="mainContent">
		<navigation />
		<div class="centerWrap">
			<div class="inputWrap">
				<comment-input shapeType="publish" :maxFileQuantity="2" @handleSubmit="handlePublishHot" :isNeedIncreaseHeight="false" allowInputCharQuantity="1000" />
			</div>
			<router-view></router-view>
		</div>
		<div class="rightWrap">
			<div class="sider-content">
				<!-- 个人信息卡片 -->
				<div class="user-info-card">
					<div class="card-header" @click="toUserCenter">
						<img :src="systemUserInfo.avator" alt="" />
						<div class="user-name text-ellipsis">{{ systemUserInfo.nick_name || systemUserInfo.real_name }}</div>
					</div>
					<div class="count-item">
						<div class="single-count-item">
							<div class="count-num">{{ systemUserInfo.publishHotTopicNumber }}</div>
							<div class="count-text">沸点</div>
						</div>
						<div class="single-count-item">
							<div class="count-num">{{ systemUserInfo.concern_number }}</div>
							<div class="count-text">关注</div>
						</div>
						<div class="single-count-item">
							<div class="count-num">{{ systemUserInfo.fans_number }}</div>
							<div class="count-text">粉丝</div>
						</div>
					</div>
				</div>
				<!-- 精选沸点 -->
				<div class="select-hot-card">
					<div class="card-title">精选沸点</div>
					<a-skeleton :loading="loading" active>
						<div class="select-hot">
							<div class="select-hot-item" v-for="(item, index) in hotList" :key="index" @click="toTopicDetail(item.id)">
								<div class="select-hot-left">
									<div class="content" v-html="item.content"></div>
									<div class="count">{{ item.like_number }} 赞 · {{ item.remark_number }} 评论</div>
								</div>
								<div class="select-hot-right" v-show="item.pictures">
									<img :src="item.pictures" alt="" />
								</div>
							</div>
						</div>
					</a-skeleton>
				</div>
				<!-- 沸点 -->
				<div class="hot-footer">
					<div class="center-wrap">
						<img src="@/assets/images/hot_bg.png" alt="" />
						<span>如何玩转沸点</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publishHot, filndAllHotInfo } from '@/api/hot'
import { GET_USERINFO } from '@/utils/token'
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'
import navigation from './components/navigation.vue'

const userStore = useUserStore()
const router = useRouter()

const { systemUserInfo } = storeToRefs(userStore)

const audit_state = ref('')
const selectHotList = ref([])
const loading = ref(false)
const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(3)

let userInfo = GET_USERINFO().user

// 发布沸点
const handlePublishHot = async (data) => {
	console.log(data)
	const params = JSON.parse(JSON.stringify(data))
	params.pictures = JSON.stringify(data.pictures.map((picture) => picture.file_path))
	const res = await publishHot(params)
	if (res.code == 200) {
		message.success('发布成功')
		getAllHotInfo()
		let id = res.data.newTopic.id
		let newTopic = res.data.newTopic
		localStorage.setItem('newTopic', JSON.stringify(newTopic))
		const { href } = router.resolve({
			path: `/hot/${id}`,
		})
		window.open(href, '_blank')
	}
}

// 获取右侧精选沸点
const getAllHotInfo = async () => {
	let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: 'pass', classify: 'hot' }
	loading.value = true
	const res = await filndAllHotInfo(data)
	if (res.code == 200) {
		loading.value = false
		hotList.value = res.data.hotTopicList.map((item) => {
			if (item.pictures) {
				item.pictures = JSON.parse(item.pictures).splice(0, 1)
			}
			return item
		})
	}
}

// 点击精选沸点前往详情页
const toTopicDetail = (id) => {
	router.push(`/hot/${id}`)
}

// 通过右侧卡片进入个人中心
const toUserCenter = () => {
	router.push({ path: `/user/${userInfo.id}` })
}

onMounted(() => {
	getAllHotInfo()
})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.mainContent {
	height: 100%;
	width: 100%;
	padding: 10px 100px 10px 300px;
	display: flex;
	column-gap: 20px;
	background: #f1f1f1;

	.centerWrap {
		width: 70%;
		max-width: 100%;
		flex-shrink: 0;
		position: relative;

		.inputWrap {
			width: 100%;
			background: #fff;
			margin-bottom: 20px;
			border-radius: 5px;
			padding: 10px 10px 15px 10px;
		}
	}

	.rightWrap {
		width: 260px;
		border-radius: 5px;

		.sider-content {
			flex: 1;

			.user-info-card {
				background: #fff;
				padding: 24px 20px;
				border-radius: 5px;
				margin-bottom: 10px;

				.card-header {
					display: flex;
					column-gap: 10px;
					align-items: center;
					margin-bottom: 20px;
					cursor: pointer;

					img {
						width: 48px;
						height: 48px;
						border-radius: 50%;
						transition: all 0.3s;

						&:hover {
							opacity: 0.6;
						}
					}

					.user-name {
						width: 70%;

						&:hover {
							opacity: 0.6;
						}
					}
				}

				.count-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					border-top: 1px solid #e4e6eb;

					.single-count-item {
						margin-top: 20px;

						.count-num {
							color: #252933;
							width: 60px;
							font-size: 16px;
							font-weight: 400;
							text-align: center;
							padding-bottom: 5px;
						}

						.count-text {
							color: #8a919f;
							width: 60px;
							text-align: center;
							font-size: 13px;
						}
					}
				}
			}

			.select-hot-card {
				background: #fff;
				border-radius: 5px;

				.card-title {
					font-size: 16px;
					padding: 20px 10px;
					border-bottom: 1px solid #e4e6eb;
				}

				.select-hot {
					padding: 8px 12px;

					.select-hot-item {
						display: flex;
						justify-content: space-between;
						padding: 12px 8px;
						cursor: pointer;
						.select-hot-left {
							display: 1;

							.content {
								font-weight: 300;
								color: #252933;
								width: 100%;
								line-height: 24px;
								font-size: 14px;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;
								transition: all 0.3s;
							}

							.count {
								font-size: 12px;
								color: #8a919f;
								padding-top: 5px;
							}
						}

						.select-hot-right {
							img {
								margin-left: 16px;
								width: 64px;
								height: 64px;
								border-radius: 4px;
								object-fit: cover;
							}
						}

						&:hover {
							background: #f7f8fa;
							.content {
								color: @base-blue-color;
							}
						}
					}
				}
			}
			.hot-footer {
				height: 72px;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 10px;
				.center-wrap {
					transform: translateX(-15px);
					img {
						width: 80px;
						height: 80px;
					}
					span {
						font-size: 16px;
						transform: translateY(-5px);
					}
				}
			}
		}
	}
}

@media (max-width: 1200px) {
	.mainContent {
		flex-direction: column;
		padding: 10px;
	}

	.leftWrap {
		display: none;
	}

	.rightWrap {
		display: none;
	}

	.centerWrap {
		width: 100% !important;
	}
}
</style>
