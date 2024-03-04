<template>
	<div class="container-wrap">
		<div class="digg-list">
			<div class="digg-item">
				<div class="left-box">
					<div class="avatar">
						<img src="@/assets/images/头像.jpg" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name">打烊</div>
							<div class="user-operate">
								<span>关注了你</span>
							</div>
						</div>
						<div class="main-content">cv工程师</div>
						<div class="timestamp">1天前</div>
					</div>
				</div>
				<div class="operate-box">
					<div class="concern-btn">关注</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
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
						}
					}
					.main-content {
						font-size: 12xp;
						color: #8a919f;
						margin-top: 5px;
					}
					.timestamp {
						font-size: 12xp;
						color: #8a919f;
						margin-top: 5px;
					}
				}
			}
			.operate-box {
				height: 20px;
			}
		}
	}
}
</style>
