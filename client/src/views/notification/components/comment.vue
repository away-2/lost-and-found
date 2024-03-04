<template>
	<div class="container-wrap">
		<!-- 评论文章 -->
		<!-- 回复文章评论 -->
		<!-- 评论沸点 -->
		<!-- 回复沸点评论 -->
		<div class="digg-list">
			<div class="digg-item">
				<div class="left-box">
					<div class="avatar">
						<img src="@/assets/images/头像.jpg" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name">打烊</div>
							<div class="user-operate" v-if="type == 1">
								<span>评论了你的帖子</span>
								<div class="article-name">《帖子名字》</div>
							</div>
							<div class="user-operate" v-if="type == 2">
								<span>评论了你在帖子的评论</span>
							</div>
							<div class="user-operate" v-if="type == 3">
								<span>评论了你的沸点</span>
								<div class="topic-content">"这是沸点内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"</div>
							</div>
							<div class="user-operate" v-if="type == 4">
								<span>评论了你在沸点的评论</span>
							</div>
						</div>
						<div class="main-content" v-if="type == 1 || type == 3">
							<!-- 这是评论帖子或沸点的评论 -->
							<div class="comment-content">这是评论的文字</div>
							<!-- 这是评论帖子或沸点的标题 -->
							<div class="title-name">这是标题</div>
						</div>
						<div class="timestamp">1天前</div>
					</div>
				</div>
				<!-- 如果有沸点或文章有图片就拿第一张填充 -->
				<div class="image-box">
					<img src="@/assets/images/bg.jpg" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const type = ref(1)
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrap {
	padding: 10px 20px;
	.digg-list {
		border-bottom: 1px solid #f1f1f1;
		.digg-item {
			display: flex;
			justify-content: space-between;
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
							display: flex;
							span {
								margin: 0 10px;
								color: #515767;
							}
							.article-name {
								color: @base-blue-color;
							}
							.topic-content {
								font-size: 14px;
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
						}
					}
					.timestamp {
						font-size: 12xp;
						color: #8a919f;
						margin-top: 10px;
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
	}
}
</style>
