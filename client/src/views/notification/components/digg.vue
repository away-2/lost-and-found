<template>
	<div class="container-wrap">
		<!-- 点赞帖子 -->
		<!-- 点赞帖子评论 -->
		<!-- 点赞沸点 -->
		<!-- 点赞沸点评论 -->
		<a-skeleton active :loading="loading">
			<div class="digg-list">
				<div class="digg-item" v-for="notice in noticeList" :key="notice.id">
					<div class="center">
						<div class="left-box">
							<div class="avatar" @click="toUserCenter(notice.active_user_id)">
								<img :src="notice.activeUserInfo.avator" />
							</div>
							<div class="digg-info">
								<span class="user-info">
									<span class="user-name" @click="toUserCenter(notice.active_user_id)">{{ notice.activeUserInfo.nick_name || notice.activeUserInfo.real_name }}</span>
									<span class="user-operate">
										<span>{{ computedGetOperateName(notice.type) }}</span>
										<span class="topic-content" @click="handleToTopicInfo(notice.source_id)" v-if="!notice.type.includes('PL')" v-html="notice.source_title"></span>
									</span>
								</span>
								<div class="main-content" v-if="notice.type.includes('PL')">
									<!-- 这是点赞帖子或沸点的评论 -->
									<div class="comment-content" v-html="notice.comment_content"></div>
									<!-- 这是点赞帖子或沸点的标题 -->
									<div class="title-name" @click="handleToTopicInfo(notice.source_id)" v-html="notice.source_title"></div>
								</div>
								<div class="timestamp">{{ computedFormatPast(notice.createdAt) }}</div>
							</div>
						</div>
						<!-- 如果有沸点或文章有图片就拿第一张填充 -->
						<div class="image-box" v-if="notice.source_pictures && notice.source_pictures.length > 0">
							<img :src="notice.source_pictures[0]" alt="" />
						</div>
					</div>
				</div>
			</div>
		</a-skeleton>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { findUserLikeAndCollectNotice, clearUnreadNotice } from '@/api/notification'
import { findGroupEnumByCodes } from '@/api/enum'
import { useComputed } from '@/utils/common'
import { formatPast } from '@/utils/time'
import useUserStore from '@/store/user'

const router = useRouter()
const noticeList = reactive([])

const userStore = useUserStore()

const loading = ref(false)

const searchAllNotice = async () => {
	loading.value = true
	const res = await findUserLikeAndCollectNotice()
	loading.value = false
	if (res.code == 200) {
		res.data.forEach((ele) => {
			ele.source_pictures = JSON.parse(ele.source_pictures)
		})
		noticeList.splice(0, noticeList.length, ...res.data)
		clearUnreadLikeAndConcernNotice()
	}
}

const clearUnreadLikeAndConcernNotice = async () => {
	const res = await clearUnreadNotice('likeAndConcern')
	if(res.code == 200) {
		userStore.updateSystemUserInfo({ unreadLikeAndConcernNoticeNum: 0 })
	}
}

onMounted(() => {
	searchAllNotice()
	handleSearchEnumList()
})

const data = reactive({
	enumData: {},
})

const handleSearchEnumList = async () => {
	const res = await findGroupEnumByCodes('ZHSCLX')
	data.enumData = res.data
}

const matchEnum = (val, type) => {
	if (data.enumData[type]) {
		const findItem = data.enumData[type].find((item) => {
			return item.value == val
		})
		if (findItem) {
			return findItem.label
		} else {
			return ''
		}
	}
}

const getOperateName = (val) => {
	return matchEnum(val, 'ZHSCLX')
}

const computedGetOperateName = useComputed(getOperateName)

const computedFormatPast = useComputed(formatPast)

// 点击头像或用户名前往个人主页
const toUserCenter = (id) => {
	const { href } = router.resolve({
		path: `/user/${id}`,
	})
	window.open(href, '_blank')
}

// 前往沸点详情
const handleToTopicInfo = (id) => {
	const { href } = router.resolve({
		path: `/hot/${id}`,
	})
	window.open(href, '_blank')
}
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrap {
	padding: 10px 0;
	.digg-list {
		.digg-item {
			padding: 12px;
			transition: all 0.3s;
			&:hover {
				background: rgb(247, 248, 250);
				.topic-content {
					color: rgb(62, 126, 247);
				}
			}
		}
		.center {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #f1f1f1;
			padding-bottom: 10px;
			.left-box {
				display: flex;
				column-gap: 15px;
				flex: 1;
				.avatar {
					flex: 0 0 auto;
					img {
						width: 38px;
						height: 38px;
						border-radius: 50%;
						object-fit: cover;
						cursor: pointer;
					}
				}
				.digg-info {
					width: 100%;
					.user-info {
						line-height: 27px;
						.user-name {
							font-size: 16px;
							cursor: pointer;
						}
						.user-operate {
							span {
								margin: 0 10px;
							}
							span:nth-child(1) {
								color: rgb(94, 94, 94);
							}
							.article-name {
								color: @base-blue-color;
							}
							.topic-content {
								display: contents;
								cursor: pointer;
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
							cursor: pointer;
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
