<template>
	<div class="mainContent">
		<div class="leftWrap">
			<div class="left-item" :class="{ selected: isSelected }">
				<svg t="1708934022437" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1281" width="19" height="19">
					<path
						d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM671.199059 575.903242 480.263397 575.903242c-17.717453 0-32.166639-14.449185-32.166639-32.166639L448.096758 289.15572c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 222.930287 159.285066 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S688.916513 575.903242 671.199059 575.903242z"
						fill="#8a919f"
						p-id="1282"
					></path>
				</svg>
				<span>最新</span>
			</div>
			<div class="left-item">
				<svg t="1708934661156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1526" width="18" height="18">
					<path
						d="M419.84137 79.938701c-36.150623 95.722776-94.195285 181.771442-169.04235 251.52687C56.807649 531.566907 30.8403 853.867531 329.21023 1012.217443c19.857384 11.710765 45.824733 7.128292 60.081317-11.201602a295.620446 295.620446 0 0 0 66.191282-233.196976c-2.036655-28.513167 10.692438-35.641459 35.641459-16.293239a293.583791 293.583791 0 0 1 117.107652 229.632831c0 31.058986 12.219929 47.352224 41.24226 41.751424 189.918061-36.659787 422.09671-309.571532 172.097332-708.755876-14.765747-20.366548-37.16895-20.366548-36.659787 7.637456 0.509164 34.113968-3.564146 68.7371-11.710765 101.83274-5.600801 22.912367-27.49484 22.912367-32.586477 0a582.992441 582.992441 0 0 0-259.673489-353.868774c-38.187278-25.967349-52.443861-18.329893-61.099644 10.183274z"
						fill="#8a919f"
						p-id="1527"
					></path>
				</svg>
				<span>热门</span>
			</div>
			<div class="left-item">
				<svg t="1708936396459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5014" width="18" height="18">
					<path
						d="M536.832 48.1792L713.728 282.4192l277.43232 95.85152a30.71488 30.71488 0 0 1 15.14496 46.62784l-168.09984 240.6144-5.43232 293.47328a30.70976 30.70976 0 0 1-39.66464 28.81536l-280.79104-85.51424-280.7808 85.51424a30.72 30.72 0 0 1-39.66464-28.81536l-5.43744-293.47328L18.33472 424.89344a30.69952 30.69952 0 0 1-4.02944-27.0848A30.69952 30.69952 0 0 1 33.4848 378.2656L310.912 282.4192 487.808 48.1792a30.73024 30.73024 0 0 1 49.024 0zM405.48864 573.50656L474.5216 660.4288a30.73024 30.73024 0 0 0 44.44672 3.87584l145.7408-129.32608a30.73536 30.73536 0 0 0 2.59072-43.3664 30.74048 30.74048 0 0 0-43.37664-2.5856l-121.46176 107.78624-48.85504-61.52192a30.74048 30.74048 0 0 0-43.16672-4.95104 30.73024 30.73024 0 0 0-4.95104 43.1616z"
						fill="#808080"
						p-id="5015"
					></path>
				</svg>
				<span>关注</span>
			</div>
		</div>
		<div class="centerWrap">
			<div class="inputWrap">
				<comment-input shapeType="publish" :maxFileQuantity="2" @handleSubmit="handlePublishHot" :isNeedIncreaseHeight="false" allowInputCharQuantity="1000" />
			</div>
			<a-skeleton :loading="loading" active>
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
									<div class="concern-btn">关注</div>
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
					<div class="hot-like" v-show="item.rankLikeUsers.length > 0" @click="showModal">
						<div class="list">
							<div class="avatar" v-for="(list, index) in item.rankLikeUsers" :key="index">
								<img :src="list.avator" alt="" />
							</div>
						</div>
						<div class="label">{{ item.rankLikeUsers.length > 1 ? '等人赞过' : '赞过' }}</div>
					</div>
					<a-modal v-model:open="open" :title="`点赞详情 (${item.rankLikeUsers.length})`" @ok="handleOk">
						<span>这是</span>
					</a-modal>
					<comment-footer :isAlreadyLike="item.already_like" :isLikeNumber="item.like_number" :isShowComment="false" :isCommentNumber="item.remark_number"></comment-footer>
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
</template>

<script setup>
import { message } from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publishHot, filndAllHotInfo } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { GET_USERINFO } from '@/utils/token'

const $router = useRouter()

const hotList = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const audit_state = ref('')
const selectHotList = ref([])
const loading = ref(false)
const isSelected = ref(true)

let userId = GET_USERINFO().user.id
let userInfo = GET_USERINFO().user

const open = ref(false)
const showModal = () => {
	open.value = true
}
const handleOk = (e) => {
	console.log(e)
	open.value = false
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
		// 将newTopic数据赋值给window.opener
		// window.opener.newTopicData = newTopic;
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

	.leftWrap {
		height: 200px;
		width: 180px;
		background-color: #fff;
		border-radius: 5px;
		position: fixed;
		left: 100px;
		z-index: 99;
		transition: all 0.3s linear;

		.left-item {
			height: 30px;
			display: flex;
			align-items: center;
			cursor: pointer;
			border-radius: 5px;
			margin: 5px;
			padding-left: 10px;
			column-gap: 5px;

			&:hover {
				background: #f7f8fa;
				.icon {
					path {
						fill: #1e80ff;
					}
				}
				span {
					color: #1e80ff;
				}
			}

			&.selected {
				background: #eaf2ff;

				.icon {
					path {
						fill: #1e80ff;
					}
				}

				span {
					color: #1e80ff;
				}
			}
		}
	}

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
				// height: 50px;
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
				padding: 10px;
				z-index: 1;
				column-gap: 10px;
				cursor: pointer;

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
