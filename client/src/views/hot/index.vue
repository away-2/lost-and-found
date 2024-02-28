<template>
	<div class="mainContent">
		<navigation />
		<div class="centerWrap">
			<div class="inputWrap">
				<comment-input shapeType="publish" :maxFileQuantity="2" @handleSubmit="handlePublishHot" :isNeedIncreaseHeight="false" allowInputCharQuantity="1000" />
			</div>
			<a-skeleton :loading="loading" active>
				<hot-topic-item v-for="(item, index) in hotList" :key="index" :hotTopic="item" />
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
	}

	.rightWrap {
		width: 230px;
		border-radius: 5px;

		.sider-content {
			flex: 1;

			.user-info-card {
				background: #fff;
				padding: 20px 20px;
				border-radius: 5px;
				margin-bottom: 10px;

				.card-header {
					display: flex;
					column-gap: 10px;
					align-items: center;
					margin-bottom: 20px;

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
