<template>
	<div class="comment-container">
		<div class="comment-number">评论 {{ hotTopic.remark_number }}</div>
		<div class="comment-form">
			<a-spin :spinning="publishLoading">
				<comment-input
					:inputMinHeight="30"
					:inputMaxHeight="150"
					shapeType="comment"
					@click="handleCommentClick({ reply_id: null, reply_user_id: null, replyItem: null, type: 'top' })"
					@handleSubmit="handlePublishComment"
					ref="firstLevelCommentInputRef"
				/>
			</a-spin>
		</div>
		<div class="comment-list-wrapper" v-if="commentList.length > 0">
			<div class="comment-list-header">
				<div class="sort">
					<div class="item" :class="{ active: isSortActive === 'hot' }" @click="handleSelectedSort('hot')">最热</div>
					<div class="divider"></div>
					<div class="item" :class="{ active: isSortActive === 'new' }" @click="handleSelectedSort('new')">最新</div>
				</div>
			</div>
			<div class="comment-list">
				<a-skeleton active :loading="loading">
					<div class="comment-card" v-for="(item, index) in commentList" :key="index">
						<div class="comment-avatar">
							<img :src="item.commentUserInfo.avator" alt="" />
						</div>
						<div class="comment-wrapper">
							<div class="comment-header">
								<div class="user-name">{{ handleUserName(item.commentUserInfo) }}</div>
								<div class="author-tag" v-if="item.user_id === hotTopic.user_id">作者</div>
								<div class="user-profile">{{ item.commentUserInfo.profile }}</div>
							</div>
							<div class="comment-content multiline-text-ellipsis" v-html="item.content"></div>
							<div class="comment-action">
								<div class="action-time">{{ formatPast(item.createdAt) }}</div>
								<div class="action-digg">
									<img src="@/assets/images/点赞.png" v-show="item.like_number == 0" />
									<img src="@/assets/images/点赞_active.png" v-show="item.like_number > 0" />
									<span :class="{ 'active-blue': item.like_number > 0 }">{{ item.alreadyLikeComment ? item.like_number : '点赞' }} </span>
								</div>
								<div class="action-reply" @click="handleClickReply(item.id)">
									<img src="@/assets/images/评论.png" v-show="!shouldShowCommentInput(item.id)" />
									<img src="@/assets/images/评论_active.png" v-show="shouldShowCommentInput(item.id)" />
									<span :class="{ 'active-blue': shouldShowCommentInput(item.id) }">{{ shouldShowCommentInput(item.id) ? '取消回复' : '评论' }}</span>
								</div>
							</div>
							<!-- 一级评论组件 -->
							<div class="comment-input-wrap">
								<comment-input
									v-show="currentShowCommentInputId === item.id"
									:inputMinHeight="0"
									:inputMaxHeight="150"
									:isNeedIncreaseHeight="false"
									:hintText="`回复${handleUserName(item.commentUserInfo)}...`"
									@click="handleCommentClick({ reply_id: item.id, reply_user_id: item.commentUserInfo.id, replyItem: item, type: 'replyTop' })"
									@handleSubmit="handlePublishComment"
									:ref="(el) => (replyFirstLevelCommentInputRefs[index] = el)"
								/>
							</div>
							<div class="comment-reply-wrapper">
								<div class="reply-list">
									<div class="reply-card" v-for="(replyItem, index) in item.replyList" :key="index">
										<div class="reply-avatar">
											<img :src="replyItem.commentUserInfo.avator" />
										</div>
										<div class="reply-wrapper">
											<div class="reply-content">
												<div class="content">
													<div class="user-info">
														<div class="user-name">{{ handleUserName(replyItem.commentUserInfo) }}</div>
														<div class="author-tag" v-if="replyItem.user_id === hotTopic.user_id">作者</div>
														<div class="colon">:</div>
													</div>
													<div class="reply-content multiline-text-ellipsis" v-html="replyItem.content"></div>
												</div>
											</div>
											<div class="reply-action">
												<div class="action-time">{{ formatPast(replyItem.createdAt) }}</div>
												<div class="action-digg">
													<img src="@/assets/images/点赞.png" v-show="replyItem.like_number == 0" />
													<img src="@/assets/images/点赞_active.png" v-show="replyItem.like_number > 0" />
													<span :class="{ 'active-blue': replyItem.like_number > 0 }">
														{{ replyItem.alreadyLikeComment ? replyItem.like_number : '点赞' }}
													</span>
												</div>
												<div class="action-reply" @click="handleClickReply(replyItem.id)">
													<img src="@/assets/images/评论.png" v-show="!shouldShowCommentInput(replyItem.id)" />
													<img src="@/assets/images/评论_active.png" v-show="shouldShowCommentInput(replyItem.id)" />
													<span :class="{ 'active-blue': shouldShowCommentInput(replyItem.id) }">
														{{ shouldShowCommentInput(replyItem.id) ? '取消回复' : '评论' }}
													</span>
												</div>
											</div>
											<!-- 二级评论组件 -->
											<div class="comment-input-wrap">
												<comment-input
													v-show="shouldShowCommentInput(replyItem.id)"
													:inputMinHeight="0"
													:inputMaxHeight="150"
													:isNeedIncreaseHeight="false"
													:hintText="`回复${handleUserName(replyItem.commentUserInfo)}...`"
													@click="handleCommentClick({ reply_id: item.id, reply_user_id: replyItem.commentUserInfo.id, replyItem, type: 'replySecond' })"
													@handleSubmit="handlePublishComment"
													:ref="(el) => (replySecondLevelCommentInputRefs[index] = el)"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</a-skeleton>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { findTopicCommentByPaging, publishHotTopicComment } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'

const props = defineProps({
	isShowComment: {
		default: false,
	},
	hotTopic: {
		// default
		require: true,
	},
})

const emits = defineEmits(['commentTotalChange'])

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

const pageNum = ref(1)
const pageSize = ref(3)
const commentList = reactive([])
const isSortActive = ref('new')
const loading = ref(false)

const handleSelectedSort = (type) => {
	isSortActive.value = type
}

const getAllCommentInfo = async () => {
	loading.value = true
	let params = { pageNum: pageNum.value, pageSize: pageSize.value, topic_id: props.hotTopic.id }
	const res = await findTopicCommentByPaging(params)
	loading.value = false
	if (res.code == 200) {
		commentList.push(...res.data.topicCommentList)
	}
}

const handleUserName = (user) => {
	return user.nick_name || user.real_name
}

watch(
	() => props.isShowComment,
	async () => {
		if (props.isShowComment) {
			getAllCommentInfo()
		} else {
			commentList.splice(0, commentList.length)
		}
	}
)

// 当前展示的回复评论组件的id,根据id判断哪个显示
const currentShowCommentInputId = ref(null)

// 处理点击回复按钮
const handleClickReply = (id) => {
	if (Object.is(currentShowCommentInputId.value, null)) {
		// 说明没有任何一个回复评论组件在展示
		currentShowCommentInputId.value = id
	} else if (currentShowCommentInputId.value === id) {
		// 说明是要取消回复组件的显示
		currentShowCommentInputId.value = null
	} else {
		// 更换回复组件的显示
		currentShowCommentInputId.value = id
	}
}

const shouldShowCommentInput = (id) => {
	return currentShowCommentInputId.value === id
}

const firstLevelCommentInputRef = ref(null)
const replyFirstLevelCommentInputRefs = ref([])
const replySecondLevelCommentInputRefs = ref([])

const publishLoading = ref(false)

const currentCommentType = ref('')

let inputBelongReplyItem = null

let replyInfo = {
	reply_id: null,
	reply_user_id: null,
}

const handleCommentClick = (reply) => {
	if (reply) {
		currentCommentType.value = reply.type
		inputBelongReplyItem = reply.replyItem
		Reflect.deleteProperty(reply, 'type')
		Reflect.deleteProperty(reply, 'replyItem')
		Object.assign(replyInfo, reply)
	}
}

const handlePublishComment = async (data) => {
	const params = {
		...replyInfo,
		content: data.content,
		picture: data.pictures[0] || null,
		user_id: systemUserInfo.value.id,
		hot_topic_id: props.hotTopic.id,
		hotTopic: Object.assign({}, props.hotTopic, { pictures: JSON.stringify(props.hotTopic.pictures) }),
	}
	publishLoading.value = true
	const res = await publishHotTopicComment(params)
	publishLoading.value = false
	if (res.code == 200) {
		message.success('评论成功')
		// 通知外部评论数更改
		emits('commentTotalChange','add')
		// 处理清空输入框
		switch (currentCommentType.value) {
			case 'top':
				firstLevelCommentInputRef.value.refreshData()
				break
			case 'replyTop':
				let index = commentList.findIndex(r => r.id === replyInfo.reply_id)
				replyFirstLevelCommentInputRefs.value[index].refreshData()
				break
			case 'replySecond':
				const belongFirstComment = commentList.find(r => r.id === replyInfo.reply_id)
				let index2 = belongFirstComment.replyList.findIndex(r => r.id === inputBelongReplyItem.id)
				replySecondLevelCommentInputRefs.value[index2].refreshData()
				break
		}
		// 处理回显
		const obj = res.data
		obj.commentUserInfo = JSON.parse(JSON.stringify(systemUserInfo.value))
		obj.alreadyLikeComment = false
		if (Object.is(replyInfo.reply_id, null)) {
			// 说明是在发布一级评论
			obj.replyList = []
			commentList.unshift(obj)
		} else {
			// 说明是在发布二级评论
			obj.replyUserInfo = inputBelongReplyItem.commentUserInfo
			const belongComment = JSON.parse(JSON.stringify(commentList.find((r) => r.id === replyInfo.reply_id)))
			const belongCommentIndex = commentList.findIndex((r) => r.id === replyInfo.reply_id)
			belongComment.replyList.unshift(obj)
			commentList.splice(belongCommentIndex, 1, belongComment)
		}
	}
}
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.comment-container {
	border-top: 1px solid #f1f2f5;
	padding: 20px 10px;

	.comment-number {
		margin-bottom: 15px;
		color: #252933;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
	}

	.comment-list-wrapper {
		margin-top: 20px;

		.comment-list-header {
			box-sizing: border-box;

			.sort {
				display: block;
				margin-bottom: 15px;

				.item {
					color: #515767;
					line-height: 22px;
					display: inline-block;
					font-weight: 400;
					font-size: 14px;
					cursor: pointer;
					padding: 3px 10px;
				}

				.divider {
					display: inline-block;
					width: 2px;
					height: 14px;
					background: #e4e6eb;
					position: relative;
					top: 2px;
				}

				.active {
					color: #1e80ff;
				}
			}
		}

		.comment-list {
			min-height: 104px;
			padding-left: 6px;

			.comment-card {
				display: flex;
				min-width: 0;
				box-sizing: border-box;
				font-style: normal;
				position: relative;
				margin-bottom: 15px;

				.comment-avatar {
					width: 32px;
					margin-right: 12px;
					position: relative;
					flex-shrink: 0;
					flex-grow: 0;

					img {
						width: 32px;
						height: 32px;
						border-radius: 50%;
					}
				}

				.comment-wrapper {
					flex: 1;
					min-width: 0;

					.comment-header {
						display: flex;
						align-items: center;
						padding: 1px 0;

						.author-tag {
							background: #eaf2ff;
							color: @base-blue-color;
							margin-left: 2px;
							font-size: 10px;
							line-height: 16px;
							text-align: center;
							border-radius: 1px;
							height: 16px;
							width: 30px;
							top: -1px;
						}

						.user-name {
							color: #515767;
							display: inline-block;
							vertical-align: top;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 14px;
							font-weight: 400;
							line-height: 24px;
						}

						.user-profile {
							font-size: 10px;
							color: #8a919f;
							margin-left: 5px;
						}
					}

					.comment-content {
						margin-top: 4px;
						font-size: 14px;
						line-height: 24px;
						color: #252933;
						font-weight: 400;
						padding-right: 20px;
					}

					.comment-action {
						display: flex;
						margin-top: 6px;
						font-size: 12px;
						line-height: 20px;
						color: #8a919f;
						font-weight: 400;

						.action-time {
							color: #8a919f;
							font-size: 12px;
							line-height: 20px;
							margin-right: 10px;
							display: flex;
							align-items: center;
						}

						.action-digg {
							display: flex;
							padding: 0 8px;
							cursor: pointer;
							align-items: center;
							transition: all 0.3s;

							img {
								width: 14px;
								height: 14px;
								margin-right: 4px;
							}

							span {
								color: #8a919f;
								font-size: 12px;
							}
						}

						.action-reply {
							display: flex;
							padding: 0 8px;
							cursor: pointer;
							align-items: center;
							transition: all 0.3s;

							img {
								width: 14px;
								height: 14px;
								margin-right: 4px;
							}

							span {
								color: #8a919f;
								font-size: 12px;
							}
						}
					}

					.comment-input-wrap {
						margin: 15px 0;
					}

					.comment-reply-wrapper {
						box-sizing: border-box;

						.reply-list {
							margin-top: 6px;
							margin-bottom: -6px;

							.reply-card {
								display: flex;
								min-width: 0;
								padding: 6px 0;
								box-sizing: border-box;
								position: relative;

								.reply-avatar {
									width: 28px;
									margin-right: 12px;
									position: relative;
									flex-shrink: 0;
									flex-grow: 0;

									img {
										width: 28px;
										height: 28px;
										border-radius: 50%;
									}
								}

								.reply-wrapper {
									flex: 1;
									min-width: 0;

									.reply-content {
										.content {
											display: flex;
											font-size: 14px;
											line-height: 24px;
											color: #252933;
											font-weight: 400;
											line-height: 28px;

											.user-info {
												display: flex;

												.user-name {
													color: #a9a9a9;
													font-size: 14px;
													line-height: 24px;
													color: #575757;
													font-weight: 400;
													min-width: max-content;
												}

												.author-tag {
													background: #eaf2ff;
													color: @base-blue-color;
													margin-left: 2px;
													font-size: 10px;
													line-height: 16px;
													text-align: center;
													border-radius: 1px;
													height: 16px;
													width: 30px;
													transform: translateY(4px);
													margin-left: 3px;
												}

												.colon {
													margin: 0 5px 0 3px;
													transform: translateY(-4px);
												}
											}

											.reply-content {
												font-weight: 400;
												font-size: 14px;
												line-height: 24px;
												color: #252933;
												padding-right: 20px;
											}
										}
									}

									.reply-action {
										display: flex;
										margin-top: 6px;
										font-size: 12px;
										line-height: 20px;
										color: #8a919f;
										font-weight: 400;

										.action-time {
											color: #8a919f;
											font-size: 12px;
											line-height: 20px;
											margin-right: 10px;
											display: flex;
											align-items: center;
										}

										.action-digg {
											display: flex;
											padding: 0 8px;
											cursor: pointer;
											align-items: center;
											transition: all 0.3s;

											img {
												width: 14px;
												height: 14px;
												margin-right: 4px;
											}

											span {
												color: #8a919f;
												font-size: 12px;
											}
										}

										.action-reply {
											display: flex;
											padding: 0 8px;
											cursor: pointer;
											align-items: center;
											transition: all 0.3s;

											img {
												width: 14px;
												height: 14px;
												margin-right: 4px;
											}

											span {
												color: #8a919f;
												font-size: 12px;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
