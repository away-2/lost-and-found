<template>
	<div class="mainContainer">
		<div class="leftWrap">
			<div class="hot-card">
				<div class="hot-title-header">
					<div class="hot-title-left">
						<img :src="userInfo.avator" alt="" />
						<div class="user-info">
							<div class="user-name">{{ userInfo.nike_name || userInfo.real_name }}</div>
							<div class="timestamp">{{ formatPast(userInfo.createdAt) }}</div>
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
				<div class="hot-content">这是上个页面发布的内容</div>
				<div class="hot-footer">
					<div class="share-action">分享</div>
					<div class="comment-action">
						<img src="@/assets/images/评论.png" alt="" />
						<span>评论</span>
					</div>
					<div class="like-action">
						<img src="@/assets/images/点赞.png" alt="" />
						<span>点赞</span>
					</div>
				</div>
			</div>
			<div class="comment-wrap">
				<div class="comment-container">
					<div class="title">评论 0</div>
					<!-- <div class="comment-form">
                        <div class="avatar-box">
                            <img :src="userInfo.avator" alt="">
                        </div>
                        <div class="input-box">
                            <div contenteditable="true" placeholder="抢首评，友善交流" id="editor" class="textarea"
                                :class="{ 'focus': isFocus }" @focus="focus" @blur="blur"></div>
                        </div>
                    </div> -->
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
import { ref } from 'vue'

let userInfo = GET_USERINFO().user

const isEmpty = ref(true)

// 发送评论
const handleSendComment = (data) => {
	message.success('数据过来了')
	console.log(data)
}

const toDeleteHot = () => {
	Modal.confirm({
		title: '确认删除此沸点吗？',
		content: null,
		okText: '确认',
		cancelText: '取消',
		onOk() {
			console.log(123)
		},
		onCancel() {},
	})
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

					img {
						width: 20px;
						height: 20px;
					}
				}
			}

			.hot-content {
				height: 50px;
				padding: 0 0 10px 70px;
				color: #252933;
				font-weight: 300;
			}

			.hot-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1px solid #f1f2f5;

				.share-action {
					width: 33%;
					padding: 10px;
					text-align: center;
					font-size: 13px;
					color: #a9a9a9;
					cursor: pointer;
				}

				.comment-action {
					width: 33%;
					padding: 10px;
					justify-content: center;
					display: flex;
					cursor: pointer;

					img {
						width: 14px;
						height: 14px;
						margin-right: 5px;
					}

					span {
						font-size: 13px;
						color: #a9a9a9;
					}
				}

				.like-action {
					display: flex;
					justify-content: center;
					padding: 10px;
					width: 33%;
					cursor: pointer;

					img {
						height: 14px;
						width: 14px;
						color: #a9a9a9;
						margin-right: 5px;
					}

					span {
						font-size: 13px;
						color: #a9a9a9;
					}
				}
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
