<template>
	<div class="container-wrap">
		<!-- 评论文章 -->
		<!-- 回复文章评论 -->
		<!-- 评论沸点 -->
		<!-- 回复沸点评论 -->
		<div class="digg-list" v-for="(item, index) in commentList" :key="index">
			<div class="digg-item">
				<div class="left-box">
					<div class="avatar">
						<img :src="item.commentUserInfo.avator" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name">{{ item.commentUserInfo.nick_name || item.commentUserInfo.real_name }}</div>
							<div class="user-operate" v-if="item.comment_type == ''">
								<span>评论了你的「帖子」</span>
							</div>
							<div class="user-operate" v-if="item.comment_type == ''">
								<span>回复了你在「帖子的评论」</span>
							</div>
							<div class="user-operate" v-if="item.comment_type == 'FD'">
								<span>评论了你的「沸点」</span>
							</div>
							<div class="user-operate" v-if="item.comment_type == 'FDPL'">
								<span>回复了你在「沸点的评论」</span>
							</div>
						</div>
						<div class="main-content">
							<!-- 这是评论帖子或沸点的评论 -->
							<div class="comment-content multiline-text-ellipsis">{{ item.comment_content }}</div>
							<!-- 这是评论帖子或沸点的标题 -->
							<div class="title-name" v-html="item.source_title"></div>
						</div>
						<div class="bottom-box">
							<div class="timestamp">{{ formatPast(item.createdAt) }}</div>
							<div class="like-action" @click="handleLikeTopic">
								<img src="@/assets/images/点赞.png" alt="" />
								<!-- <img v-else src="@/assets/images/点赞_active.png" /> -->
								<span>{{ '点赞' }}</span>
							</div>
							<div class="comment-action" @click="handleShowCommentInput(index)">
								<img src="@/assets/images/评论.png" v-if="!isShowCommentInput[index]" />
								<img v-else src="@/assets/images/评论_active.png" alt="" />
								<span :style="{ color: isShowCommentInput[index] ? '#1e80ff' : '#a9a9a9' }">{{!isShowCommentInput[index] ? '评论' : '取消评论'}}</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 如果有沸点或文章有图片就拿第一张填充 -->
				<div class="image-box" v-if="item.source_pictures">
					<img :src="item.source_pictures" alt="" />
				</div>

			</div>
			<div class="input-box">
				<comment-input v-show="isShowCommentInput[index]" :inputMinHeight="0" :isNeedIncreaseHeight="false"/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { findUserCommentNotice } from '@/api/notification'
import { formatPast } from '@/utils/time'

const commentList = reactive([])
const isShowCommentInput = ref(Array(commentList.length).fill(false))

// 处理评论通知图片
const handlePictures = (pic) => {
	// 转换 pic 中的字符串为对应的数组或 null
	pic = pic.map((item) => {
		try {
			return JSON.parse(item)
		} catch (error) {
			return null
		}
	})
	// 提取图片地址,只需要第一张图片的地址
	let picUrl = pic.map((r) => {
		if (Array.isArray(r) && r.length > 0) {
			return r.slice(0, 1)
		} else {
			return null
		}
	})
	return picUrl
}

// 获取所有评论通知
const getAllUserCommentNotice = async () => {
	const res = await findUserCommentNotice()
	if (res.code == 200) {
		let pictures = res.data.map((item) => item.source_pictures)
		let picUrl = handlePictures(pictures)
		// 将数据中的图片地址转换成已处理的图片地址
		res.data.forEach((item, index) => {
			item.source_pictures = picUrl[index]
		})
		commentList.push(...res.data)
	}
}

// 展开输入框
const handleShowCommentInput = (index) => {
	isShowCommentInput.value[index] = !isShowCommentInput.value[index]
}

onMounted(() => {
	getAllUserCommentNotice()
})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.container-wrap {
	padding: 10px 20px;

	.digg-list {
		border-bottom: 1px solid #f1f1f1;
		margin-bottom: 15px;

		.digg-item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 15px;
			align-items: center;

			.left-box {
				display: flex;
				column-gap: 15px;

				.avatar {
					flex: 0 0 auto;

					img {
						width: 36px;
						height: 36px;
						border-radius: 50%;
						object-fit: cover;
					}
				}

				.digg-info {
					flex: 1;

					.user-info {
						display: flex;
						align-items: center;

						.user-name {
							font-size: 14px;
						}
						.user-operate {
							margin-left: 8px;
                            span {
                                color: #515767;
                            }
                        }
					}

					.main-content {
						.comment-content {
							font-size: 14px;
							margin: 10px 0;
						}

						.title-name {
							border-left: 2px solid #f1f1f1;
							padding-left: 15px;
							color: #8a919f;
						}
					}
					.bottom-box {
						display: flex;
						align-items: center;
						column-gap: 20px;
						margin-top: 10px;

						.timestamp {
							font-size: 12xp;
							color: #8a919f;
						}
						.comment-action {
							justify-content: center;
							align-items: center;
							display: flex;
							cursor: pointer;

							img {
								width: 14px;
								height: 14px;
								margin-right: 3px;
							}

							span {
								font-size: 13px;
								color: #a9a9a9;
							}

							&:hover {
								opacity: 0.6;
							}
						}

						.like-action {
							display: flex;
							justify-content: center;
							align-items: center;
							cursor: pointer;

							img {
								height: 16px;
								width: 16px;
								color: #a9a9a9;
								margin-right: 3px;
							}

							span {
								font-size: 13px;
								color: #a9a9a9;
							}

							&:hover {
								opacity: 0.6;
							}
						}
					}
				}
			}

			.image-box {
				img {
					width: 80px;
					height: 80px;
					border-radius: 2px;
					object-fit: cover;
				}
			}
		}
		.input-box {
			padding: 0 0 15px 50px;
		}
	}
}
</style>
