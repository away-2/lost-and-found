<template>
	<div class="mainContainer">
		<div class="leftWrap">
			<div class="hot-card">
				<div class="hot-title-header">
					<div class="hot-title-left">
						<img :src="userInfo.avator" alt="" />
						<div class="user-info">
							<div class="user-name">{{ userInfo.nike_name || userInfo.real_name }}</div>
							<div class="timestamp">{{ formatPast(publishHotInfo.createdAt) }}</div>
						</div>
					</div>
					<div class="hot-title-right">
						<a-popover placement="bottomRight">
							<template #content>
								<div class="delete-box" @click="toDeleteHot">
									<img src="@/assets/images/删除.png" alt="" />
									<div class="text">删除</div>
								</div>
							</template>
							<img src="@/assets/images/three_point2.png" alt="" />
						</a-popover>
					</div>
				</div>
				<div class="hot-content">{{ publishHotInfo.content }}</div>
				<comment-footer :isLikeNumber="publishHotInfo.like_number" :isAlreadyLike="false"
                        :isShowComment="false" :isCommentNumber="publishHotInfo.remark_number"></comment-footer>
			</div>
			<div class="comment-wrap">
				<div class="comment-container">
					<div class="title">评论 0</div>
					<comment-input @handleSubmit="handleSendComment" />
				</div>
				<div class="comment-empty" v-show="isEmpty">
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
</template>

<script setup>
import { GET_USERINFO } from '@/utils/token'
import { formatPast } from '@/utils/time'
import { message, Modal } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeHotById } from '@/api/hot'


const $router = useRouter()

const isEmpty = ref(true)

let userInfo = GET_USERINFO().user
let publishHotInfo = JSON.parse(localStorage.getItem('newTopic'))


// 发送评论
const handleSendComment = (data) => {
	message.success('数据过来了')
	console.log(data)
}

// 删除此沸点
const toDeleteHot = () => {
	Modal.confirm({
		title: '确认删除此沸点吗？',
		content: null,
		okText: '确认',
		cancelText: '取消',
		async onOk() {
			const res = await removeHotById(publishHotInfo.id)
			if (res.code == 200) {
				message.success('删除成功')
				localStorage.removeItem('newTopic');
				$router.push('/home')
			}
		},
		onCancel() { },
	})
}
onMounted(() => {
	// console.log(publishHotInfo);
})

// 在窗口关闭前监听 beforeunload 事件
window.addEventListener('beforeunload', function(event) {
    // 移除 localStorage 中的数据
    localStorage.removeItem('newTopic');
});
</script>

<style lang="less" scoped>
.mainContainer {
	padding: 10px 100px 0 200px;
	display: flex;
	column-gap: 20px;

	.leftWrap {
		// background: #fff;
		width: 70%;

		.hot-card {
			width: 100%;
			background: #fff;
			border-radius: 5px;
			margin: 10px 0;

			.hot-title-header {
				display: flex;
				justify-content: space-between;

				.hot-title-left {
					display: flex;
					column-gap: 10px;
					padding: 10px;

					img {
						height: 48px;
						width: 48px;
						border-radius: 50%;
					}

					.user-info {
						.user-name {
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

				.hot-title-right {
					padding: 20px;
					cursor: pointer;

					img {
						width: 20px;
						height: 20px;

						&:hover {
							opacity: 0.6;
						}
					}
				}
			}

			.hot-content {
				height: 50px;
				padding: 0 0 10px 70px;
				color: #252933;
				font-weight: 300;
			}
		}

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
