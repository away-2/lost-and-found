<template>
	<div class="mainContainer" v-if="hotTopicIsExist && !loading">
		<div class="leftWrap">
			<hot-topic-item :hotTopic="hotTopic" :isNeedDelete="true" :supportShowComment="false" v-if="hotTopic.id" />
			<div class="comment-wrap">
				<!-- <div class="comment-container">
					<div class="title">评论 0</div>
					<comment-input @handleSubmit="handleSendComment" />
				</div> -->
				<comment-list style="margin: 0 15px;" :isShowComment="isShowComment" :hotTopic="hotTopic" :isRegularlyLoad="true" :pageSize="5" />
				<div class="comment-empty" v-show="hotTopic.remark_number <= 0">
					<img src="@/assets/images/暂无数据.png" alt="" />
					<div class="text">暂无评论数据</div>
				</div>
			</div>
		</div>
		<div class="rightWrap">
			<div class="title">相关推荐</div>
			<div class="hot-list">
				<div class="hot-list-item">
					<div class="content">threejs 对于加载的模型 想对其中的某部分模型打光 例如图片中的地图 只想对四周的平面打光。不想影响地图的光亮程度 求求大佬[流泪]</div>
					<div class="count">0 赞 · 0 评论</div>
				</div>
				<div class="hot-list-item">
					<div class="content">threejs 对于加载的模型 想对其中的某部分模型打光 例如图片中的地图 只想对四周的平面打光。不想影响地图的光亮程度 求求大佬[流泪]</div>
					<div class="count">0 赞 · 0 评论</div>
				</div>
				<div class="hot-list-item">
					<div class="content">threejs 对于加载的模型 想对其中的某部分模型打光 例如图片中的地图 只想对四周的平面打光。不想影响地图的光亮程度 求求大佬[流泪]</div>
					<div class="count">0 赞 · 0 评论</div>
				</div>
			</div>
		</div>
	</div>
	<div class="empty-container" v-if="!hotTopicIsExist && !loading">
		<img :src="require('@/assets/images/noExist.png')" alt="">
		<div class="back-btn" @click="backToHome">回到首页</div>
	</div>
	<a-skeleton active :loading="loading" style="height: 300px;width: 70%;margin: 0 auto;"></a-skeleton>
</template>

<script setup>
import { GET_USERINFO } from '@/utils/token'
import { formatPast } from '@/utils/time'
import { message, Modal } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findTopicInfoById } from '@/api/hot'

let userInfo = GET_USERINFO().user

const route = useRoute()
const router = useRouter()

const hotTopicId = ref(route.params.id)

const hotTopicIsExist = ref(true)

const loading = ref(false)

onMounted(() => {
	searchHotTopicInfo()
})

const isShowComment = ref(false)

const hotTopic = reactive({})

const searchHotTopicInfo = async () => {
	loading.value = true
	const res = await findTopicInfoById(hotTopicId.value)
	loading.value = false
	if (res.code == 200) {
		if (res.data.pictures) {
			res.data.pictures = JSON.parse(res.data.pictures)
		}
		Object.assign(hotTopic, res.data)
		isShowComment.value = true
	} else {
		hotTopicIsExist.value = false
	}
}

// 发送评论
const handleSendComment = (data) => {
	message.success('数据过来了')
	console.log(data)
}

const backToHome = () => {
	router.push('/home')
}

</script>

<style lang="less" scoped>
.mainContainer {
	padding: 10px 100px 0 200px;
	display: flex;
	column-gap: 20px;

	.leftWrap {
		// background: #fff;
		width: 70%;
		margin-bottom: 20px;

		.comment-wrap {
			background: #fff;
			border-radius: 5px;

			.comment-container {
				padding: 20px 10px;

				.title {
					padding-bottom: 20px;
				}
			}

			.comment-empty {
				width: 100%;
				text-align: center;
				padding-bottom: 50px;

				img {
					width: 180px;
					height: 180px;
				}

				.text {
					color: #8a919f;
				}
			}
		}
	}

	.rightWrap {
		background: #fff;
		width: 20%;
		height: 280px;
		border-radius: 5px;
		// padding: 10px;
		margin-top: 10px;

		.title {
			font-weight: 600;
			font-size: 16px;
			padding: 15px 10px;
			border-bottom: 1px solid #e4e6eb;
		}

		.hot-list {
			width: 100%;

			.hot-list-item {
				margin-top: 20px;
				padding: 0 10px;

				.content {
					width: 200px;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: 300;
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

.empty-container {
	width: 100%;
	height: calc(100vh - 60px);
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 40px;
	img {
		width: 180px;
		height: 180px;
	}
	.back-btn {
		width: 120px;
		height: 45px;
		line-height: 45px;
		border-radius: 3px;
		text-align: center;
		background-color: rgba(89, 161, 255, 0.1);
		color: #2571fe;
		border: 1px solid #bcd4ff;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background-color: rgba(89, 161, 255, 0.3);
		}
	}
}

.ant-popover-content {
	.delete-box {
		width: 100px;
		column-gap: 10px;
		display: flex;
		align-items: center;

		img {
			width: 20px;
			height: 20px;
		}

		.text {
			color: #a9a9a9;
		}
	}
}
</style>
