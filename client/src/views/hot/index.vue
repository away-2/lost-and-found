<template>
	<div class="mainContent">
		<navigation />
		<div class="centerWrap">
			<div class="inputWrap">
				<comment-input shapeType="publish" :maxFileQuantity="2" @handleSubmit="handlePublishHot" :isNeedIncreaseHeight="false" allowInputCharQuantity="1000" />
			</div>
			<a-skeleton :loading="loading" active>
				<router-view></router-view>
				<div class="contentWrap" v-for="(item, index) in hotList" :key="index">
					<div class="hot-header">
						<a-popover>
							<template #content>
								<div class="user-popover-header">
									<img :src="item.publish_user.avator" alt="" />
									<div class="user-info">
										<div class="user-name">{{ item.publish_user.nike_name || item.publish_user.real_name }}</div>
										<div class="user-school">{{ item.publish_user.school_name }}</div>
									</div>
								</div>
								<div class="user-popover-btn" v-show="item.publish_user.id !== userId">
									<div class="concern-btn" :class="{concerned: item.already_concern_publish_user }">{{item.already_concern_publish_user ? '已关注' : '关注'}}</div>
									<div class="message-btn">私信</div>
								</div>
								<div class="user-popover-footer">
									<div class="single-count-item">
										<div class="count-num">1</div>
										<div class="count-text">关注</div>
									</div>
									<div class="single-count-item">
										<div class="count-num">2</div>
										<div class="count-text">粉丝</div>
									</div>
								</div>
							</template>
							<img class="avatar" :src="item.publish_user.avator" />
						</a-popover>
						<div class="userInfo">
							<div class="username">{{ item.publish_user.nike_name || item.publish_user.real_name }}</div>
							<div class="timestamp">{{ formatPast(item.createdAt) }}</div>
						</div>
					</div>
					<div class="hot-content">
						<div class="text">{{ item.content }}</div>
						<template v-if="item.pictures">
							<div class="picture-list">
								<img v-for="(picture, index) in item.pictures" :key="index" class="picture" :class="{ small: item.pictures.length > 1 }" :src="picture" />
							</div>
						</template>
					</div>
					<div class="hot-like" v-show="item.rankLikeUsers.length > 0">
						<div class="isblank"></div>
						<div class="like-list" @click="showModal(item.id)">
							<div class="list">
								<div class="avatar" v-for="(list, index) in item.rankLikeUsers" :key="index">
									<img :src="list.avator" alt="" />
								</div>
							</div>
							<div class="label">{{ item.rankLikeUsers.length > 1 ? '等人赞过' : '赞过' }}</div>
						</div>
					</div>
					<comment-footer :isAlreadyLike="item.already_like" :isLikeNumber="item.like_number" :isShowComment="false" :isCommentNumber="item.remark_number" :topicId="item.id"/>
				</div>
			</a-skeleton>
		</div>
		<div class="rightWrap">
			<div class="sider-content">
				<div class="user-info-card">
					<div class="card-header">
						<img :src="userInfo.avator" alt="" />
						<div class="user-name">{{ userInfo.nike_name || userInfo.real_name }}</div>
					</div>
					<div class="count-item">
						<div class="single-count-item">
							<div class="count-num">1</div>
							<div class="count-text">沸点</div>
						</div>
						<div class="single-count-item">
							<div class="count-num">2</div>
							<div class="count-text">关注</div>
						</div>
						<div class="single-count-item">
							<div class="count-num">2</div>
							<div class="count-text">关注者</div>
						</div>
					</div>
				</div>
				<div class="select-hot-card">
					<div class="card-title">精选沸点</div>
					<a-skeleton :loading="loading" active>
						<div class="select-hot" v-for="(item, index) in selectHotList" :key="index">
							<div class="content">{{ item.content }}</div>
							<div class="count">{{ item.like_number }} 赞 · {{ item.remark_number }} 评论</div>
						</div>
					</a-skeleton>
				</div>
			</div>
		</div>
	</div>
	<!-- 沸点点赞详情Modal -->
	<like-detail-modal v-model:isOpen="open" :topicId="lookLikersTopicId" />
</template>

<script setup>
import { message } from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publishHot, filndAllHotInfo } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { GET_USERINFO } from '@/utils/token'
import navigation from './components/navigation.vue'

const $router = useRouter()

const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const audit_state = ref('')
const selectHotList = ref([])
const loading = ref(false)

let userId = GET_USERINFO().user.id
let userInfo = GET_USERINFO().user

const open = ref(false)
const lookLikersTopicId = ref(null)
const showModal = async (id) => {
	open.value = true
	lookLikersTopicId.value = id
}

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
		const { href } = $router.resolve({
			path: `/hot/${id}`,
		})
		window.open(href, '_blank')
	}
}

// 获取沸点列表
const getAllHotInfo = async () => {
	let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: 'pass' }
	loading.value = true
	const res = await filndAllHotInfo(data)
	if (res.code == 200) {
		loading.value = false
		hotList.value = res.data.hotTopicList.map((item) => {
			if (item.pictures) {
				item.pictures = JSON.parse(item.pictures)
			}
			return item
		})
		selectHotList.value = res.data.hotTopicList.slice(0, 3)
	}
}

onMounted(() => {
	getAllHotInfo()
})
</script>

<style lang="less" scoped>
.mainContent {
	height: 100%;
	width: 100%;
	padding: 10px 100px 10px 300px;
	display: flex;
	column-gap: 20px;
	background: #f1f1f1;
	.centerWrap {
		width: 720px;
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

		.contentWrap {
			width: 100%;
			background: #fff;
			border-radius: 5px;
			margin: 10px 0;

			.hot-header {
				display: flex;
				column-gap: 10px;
				padding: 10px;

				img {
					height: 48px;
					width: 48px;
					border-radius: 50%;
					cursor: pointer;
				}

				.userInfo {
					.username {
						font-weight: 500;
						font-size: 16px;
						padding: 8px 0;
						color: #252933;
					}

					.timestamp {
						font-size: 12px;
						color: #a9a9a9;
					}
				}
			}

			.hot-content {
				padding: 0 0 10px 70px;
				color: #252933;
				font-weight: 300;

				.text {
					padding-right: 40px;
					width: 100%;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.picture-list {
					display: flex;
					flex-wrap: wrap;
					column-gap: 15px;
					margin-top: 15px;

					.picture {
						width: 200px;
						height: 200px;
						border-radius: 4px;
						object-fit: cover;

						&.small {
							width: 100px;
							height: 100px;
						}
					}
				}
			}

			.hot-like {
				position: relative;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 10px 20px;
				z-index: 1;
				.isblank{
					flex: 1 1 auto;
					display: block;
				}
				.like-list {
					cursor: pointer;
					display: flex;
					column-gap: 10px;

					.list {
						display: flex;

						.avatar {
							width: 22px;
							height: 22px;
							border-radius: 50%;
							border: 2px solid #fff;
							margin-right: -6px;

							img {
								width: 19px;
								height: 19px;
								border-radius: 50%;
							}
						}
					}
				}

				.label {
					color: #8a919f;
					font-size: 14px;
					line-height: 24px;

					&:hover {
						opacity: 0.6;
					}
				}
			}
		}
	}

	.rightWrap {
		height: 500px;
		width: 230px;
		border-radius: 5px;

		.sider-content {
			flex: 1;

			.user-info-card {
				height: 172px;
				background: #fff;
				padding: 24px 20px;
				border-radius: 5px;
				margin-bottom: 10px;

				.card-header {
					display: flex;
					column-gap: 10px;
					align-items: center;
					padding: 10px 0;

					img {
						width: 48px;
						height: 48px;
						border-radius: 50%;
					}
				}

				.count-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 5px 0;
					width: 100%;
					border-top: 1px solid #e4e6eb;

					.single-count-item {
						padding: 20px 0;

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
					padding: 10px 10px;

					.content {
						font-weight: 300;
						width: 100%;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.count {
						font-size: 12px;
						color: #8a919f;
						padding-top: 5px;
					}
				}
			}
		}
	}
}

.ant-popover-inner-content {
	.user-popover-header {
		display: flex;
		column-gap: 10px;
		padding: 10px 0;

		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}

		.user-info {
			padding-top: 5px;

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
			border: 1px solid #8a919f;
		}

		.concern-btn:hover {
			opacity: 0.5;
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
			opacity: 0.5;
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
			padding: 0 50px;

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
