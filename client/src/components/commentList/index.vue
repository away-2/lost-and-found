<template>
	<div class="comment-container">
		<!-- 评论总数量 -->
		<div class="comment-number">评论 {{ hotTopic.remark_number }}</div>
		<!-- 顶级评论输入框 -->
		<div class="comment-form">
			<a-spin :spinning="publishLoading">
				<comment-input
					:inputMinHeight="30"
					:inputMaxHeight="150"
					shapeType="comment"
					@click="
						handleCommentClick({
							reply_id: null,
							reply_user_id: null,
							replyItem: null,
							type: 'top',
						})
					"
					@handleSubmit="handlePublishComment"
					ref="firstLevelCommentInputRef"
				/>
			</a-spin>
		</div>
		<!-- 评论部分 -->
		<div class="comment-list-wrapper" v-if="commentList.length > 0">
			<!-- 评论分类tab栏 -->
			<div class="comment-list-header">
				<div class="sort">
					<div class="item" :class="{ active: isSortActive === 'hot' }" @click="handleSelectedSort('hot')">最热</div>
					<div class="divider"></div>
					<div class="item" :class="{ active: isSortActive === 'new' }" @click="handleSelectedSort('new')">最新</div>
				</div>
			</div>
			<!-- 评论部分 -->
			<div class="comment-list">
				<a-skeleton active :loading="loading">
					<!-- 一级评论 -->
					<div class="comment-card" v-for="(item, index) in commentList" :key="index">
						<div class="comment-avatar">
							<user-info-popover :userInfo="item.commentUserInfo">
								<img :src="item.commentUserInfo.avator" alt="" />
							</user-info-popover>
						</div>
						<div class="comment-wrapper">
							<div class="comment-header">
								<user-info-popover :userInfo="item.commentUserInfo">
									<div class="user-name">
										{{ handleUserName(item.commentUserInfo) }}
									</div>
								</user-info-popover>
								<div class="author-tag" v-if="item.user_id === hotTopic.user_id">作者</div>
								<div class="user-profile">{{ item.commentUserInfo.profile }}</div>
							</div>
							<div class="comment-content multiline-text-ellipsis" v-html="item.content"></div>
							<div class="comment-bottom">
								<div class="comment-action">
									<div class="action-time">{{ formatPast(item.createdAt) }}</div>
									<div class="action-digg" @click="handleClickLikeComment(item)">
										<img src="@/assets/images/点赞.png" v-show="!item.alreadyLikeComment" />
										<img src="@/assets/images/点赞_active.png" v-show="item.alreadyLikeComment" />
										<span :class="{ 'active-blue': item.alreadyLikeComment }">{{ item.like_number > 0 ? item.like_number : '点赞' }} </span>
									</div>
									<div class="action-reply" @click="handleClickReply(item.id)">
										<img src="@/assets/images/评论.png" v-show="!shouldShowCommentInput(item.id)" />
										<img src="@/assets/images/评论_active.png" v-show="shouldShowCommentInput(item.id)" />
										<span
											:class="{
												'active-blue': shouldShowCommentInput(item.id),
											}"
											>{{ shouldShowCommentInput(item.id) ? '取消回复' : `${item.remark_number ? item.remark_number : '评论'}` }}</span
										>
									</div>
								</div>
								<!-- 一级评论底部右侧图标气泡 -->
								<a-popover placement="bottomRight">
									<template #content>
										<div class="delete-box" @click="toDeleteHot('top', item, null)" v-if="item.user_id == systemUserInfo.id">
											<img src="@/assets/images/删除.png" alt="" />
											<div class="text">删除</div>
										</div>
										<div class="operate-box" v-else>
											<div class="item-box">
												<div class="icon-box">
													<svg t="1709804743167" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1620" width="14" height="14">
														<path
															d="M645.376 320a174.933333 174.933333 0 1 1-349.866667 0 174.933333 174.933333 0 0 1 349.866667 0z m-64 206.848a234.666667 234.666667 0 1 0-224.128-1.237333C198.613333 577.408 85.333333 738.048 85.333333 924.117333a32 32 0 0 0 64 0c0-197.248 145.237333-352 318.293334-352 65.066667 0 125.738667 21.546667 176.384 58.965334a32 32 0 0 0 37.973333-51.498667 368.64 368.64 0 0 0-100.565333-52.736z m118.741333 124.586667a32 32 0 1 0-47.274666 43.136l84.736 92.928-84.736 92.885333a32 32 0 1 0 47.274666 43.093333l80.810667-88.490666 80.768 88.533333a32 32 0 0 0 47.274667-43.136l-84.736-92.885333 84.736-92.928a32 32 0 0 0-47.274667-43.093334l-80.768 88.533334-80.810667-88.533334z"
															fill="#232121"
															p-id="1621"
														></path>
													</svg>
												</div>
												<div class="text">
													{{ `屏蔽作者：${handleUserName(item.commentUserInfo)}` }}
												</div>
											</div>
											<div class="item-box">
												<div class="icon-box">
													<svg t="1709803615063" class="icon" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1923" width="12" height="12">
														<path
															d="M566.224 10.032a48 48 0 0 1 20.32 20.32l480.768 920.32a48 48 0 0 1-42.544 70.24H63.232a48 48 0 0 1-42.56-70.24l480.784-920.32a48 48 0 0 1 64.768-20.32zM544 52.576L63.232 972.896h961.536L544 52.576z m16 712.32a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m0-416a44.272 44.272 0 0 1 44.128 47.84l-24.72 305.456a16 16 0 0 1-15.936 14.72h-7.36a16 16 0 0 1-15.952-14.736l-24.352-305.424A44.32 44.32 0 0 1 560 348.912z"
															p-id="1924"
															fill="#232121"
														></path>
													</svg>
												</div>
												<div class="text">举报</div>
											</div>
										</div>
									</template>
									<div class="operate-icon">
										<svg t="1709802541849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1530" width="18" height="18">
											<path
												d="M170.666667 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666666-74.666667-33.28-74.666667-74.666666-74.666667zM512 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667zM853.333333 437.333333c-41.386667 0-74.666667 33.28-74.666666 74.666667s33.28 74.666667 74.666666 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667z"
												fill="#8D9297"
												p-id="1531"
											></path>
										</svg>
									</div>
								</a-popover>
							</div>
							<!-- 一级评论输入框组件 -->
							<div class="comment-input-wrap">
								<comment-input
									v-show="currentShowCommentInputId === item.id"
									:inputMinHeight="0"
									:inputMaxHeight="150"
									:isNeedIncreaseHeight="false"
									:hintText="`回复${handleUserName(item.commentUserInfo)}...`"
									@click="
										handleCommentClick({
											reply_id: item.id,
											reply_user_id: item.commentUserInfo.id,
											replyItem: item,
											type: 'replyTop',
										})
									"
									@handleSubmit="handlePublishComment"
									:ref="(el) => (replyFirstLevelCommentInputRefs[index] = el)"
								/>
							</div>
							<!-- 评论回复部分 -->
							<div class="comment-reply-wrapper">
								<div class="reply-list">
									<div class="reply-card" v-for="(replyItem, index) in item.replyList" :key="index">
										<div class="reply-avatar">
											<user-info-popover :userInfo="replyItem.commentUserInfo">
												<img :src="replyItem.commentUserInfo.avator" />
											</user-info-popover>
										</div>
										<div class="reply-wrapper">
											<div class="reply-content">
												<div class="content">
													<div class="user-info">
														<user-info-popover :userInfo="replyItem.commentUserInfo">
															<div class="user-name">
																{{ handleUserName(replyItem.commentUserInfo) }}
															</div>
														</user-info-popover>

														<div class="author-tag" v-if="replyItem.user_id === hotTopic.user_id">作者</div>
														<div class="reply" v-if="replyItem.level === 'replySecond'">回复</div>
														<user-info-popover :userInfo="replyItem.replyUserInfo">
															<div class="reply-user" v-if="replyItem.level === 'replySecond'">
																{{ handleUserName(replyItem.replyUserInfo) }}
															</div>
														</user-info-popover>

														<div
															class="author-tag"
															v-if="
																replyItem.replyUserInfo.id !== replyItem.commentUserInfo.id &&
																replyItem.replyUserInfo.id !== item.user_id &&
																replyItem.replyUserInfo.id === hotTopic.user_id
															"
														>
															作者
														</div>
														<div class="colon">:</div>
													</div>
													<div class="reply-content multiline-text-ellipsis" v-html="replyItem.content"></div>
												</div>
											</div>
											<div class="reply-bottom">
												<div class="reply-action">
													<div class="action-time">
														{{ formatPast(replyItem.createdAt) }}
													</div>
													<div class="action-digg" @click="handleClickLikeComment(item, replyItem)">
														<img src="@/assets/images/点赞.png" v-show="!replyItem.alreadyLikeComment" />
														<img src="@/assets/images/点赞_active.png" v-show="replyItem.alreadyLikeComment" />
														<span
															:class="{
																'active-blue': replyItem.alreadyLikeComment,
															}"
														>
															{{ replyItem.like_number > 0 ? replyItem.like_number : '点赞' }}
														</span>
													</div>
													<div class="action-reply" @click="handleClickReply(replyItem.id)">
														<img src="@/assets/images/评论.png" v-show="!shouldShowCommentInput(replyItem.id)" />
														<img src="@/assets/images/评论_active.png" v-show="shouldShowCommentInput(replyItem.id)" />
														<span
															:class="{
																'active-blue': shouldShowCommentInput(replyItem.id),
															}"
														>
															{{ shouldShowCommentInput(replyItem.id) ? '取消回复' : '评论' }}
														</span>
													</div>
												</div>
												<!-- 二级评论底部右侧图标气泡 -->
												<a-popover placement="bottomRight">
													<template #content>
														<div class="delete-box" @click="toDeleteHot('reply', item, replyItem)" v-if="replyItem.commentUserInfo.id == systemUserInfo.id">
															<img src="@/assets/images/删除.png" alt="" />
															<div class="text">删除</div>
														</div>
														<div class="operate-box" v-else>
															<div class="item-box">
																<div class="icon-box">
																	<svg
																		t="1709804743167"
																		class="icon"
																		viewBox="0 0 1024 1024"
																		version="1.1"
																		xmlns="http://www.w3.org/2000/svg"
																		p-id="1620"
																		width="14"
																		height="14"
																	>
																		<path
																			d="M645.376 320a174.933333 174.933333 0 1 1-349.866667 0 174.933333 174.933333 0 0 1 349.866667 0z m-64 206.848a234.666667 234.666667 0 1 0-224.128-1.237333C198.613333 577.408 85.333333 738.048 85.333333 924.117333a32 32 0 0 0 64 0c0-197.248 145.237333-352 318.293334-352 65.066667 0 125.738667 21.546667 176.384 58.965334a32 32 0 0 0 37.973333-51.498667 368.64 368.64 0 0 0-100.565333-52.736z m118.741333 124.586667a32 32 0 1 0-47.274666 43.136l84.736 92.928-84.736 92.885333a32 32 0 1 0 47.274666 43.093333l80.810667-88.490666 80.768 88.533333a32 32 0 0 0 47.274667-43.136l-84.736-92.885333 84.736-92.928a32 32 0 0 0-47.274667-43.093334l-80.768 88.533334-80.810667-88.533334z"
																			fill="#232121"
																			p-id="1621"
																		></path>
																	</svg>
																</div>
																<div class="text">
																	{{ `屏蔽作者：${handleUserName(replyItem.commentUserInfo)}` }}
																</div>
															</div>
															<div class="item-box">
																<div class="icon-box">
																	<svg
																		t="1709803615063"
																		class="icon"
																		viewBox="0 0 1088 1024"
																		version="1.1"
																		xmlns="http://www.w3.org/2000/svg"
																		p-id="1923"
																		width="14"
																		height="14"
																	>
																		<path
																			d="M566.224 10.032a48 48 0 0 1 20.32 20.32l480.768 920.32a48 48 0 0 1-42.544 70.24H63.232a48 48 0 0 1-42.56-70.24l480.784-920.32a48 48 0 0 1 64.768-20.32zM544 52.576L63.232 972.896h961.536L544 52.576z m16 712.32a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m0-416a44.272 44.272 0 0 1 44.128 47.84l-24.72 305.456a16 16 0 0 1-15.936 14.72h-7.36a16 16 0 0 1-15.952-14.736l-24.352-305.424A44.32 44.32 0 0 1 560 348.912z"
																			p-id="1924"
																			fill="#232121"
																		></path>
																	</svg>
																</div>
																<div class="text">举报</div>
															</div>
														</div>
													</template>
													<div class="operate-icon">
														<svg t="1709802541849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1530" width="18" height="18">
															<path
																d="M170.666667 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666666-74.666667-33.28-74.666667-74.666666-74.666667zM512 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667zM853.333333 437.333333c-41.386667 0-74.666667 33.28-74.666666 74.666667s33.28 74.666667 74.666666 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667z"
																fill="#8D9297"
																p-id="1531"
															></path>
														</svg>
													</div>
												</a-popover>
											</div>
											<!-- 二级评论输入框组件 -->
											<div class="comment-input-wrap">
												<comment-input
													v-show="shouldShowCommentInput(replyItem.id)"
													:inputMinHeight="0"
													:inputMaxHeight="150"
													:isNeedIncreaseHeight="false"
													:hintText="`回复${handleUserName(replyItem.commentUserInfo)}...`"
													@click="
														handleCommentClick({
															reply_id: item.id,
															reply_user_id: replyItem.commentUserInfo.id,
															replyItem,
															type: 'replySecond',
														})
													"
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
import { findTopicCommentByPaging, publishHotTopicComment, likeTopicComment, cancelLikeTopicComment, removeHotTopicCommentById } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { Modal, message } from 'ant-design-vue'
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
	if (type !== isSortActive.value) {
		isSortActive.value = type
		pageNum.value = 1
		pageSize.value = 3
		commentList.splice(0, commentList.length)
		getAllCommentInfo()
	}
}

const getAllCommentInfo = async () => {
	loading.value = true
	let params = {
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		topic_id: props.hotTopic.id,
		classify: isSortActive.value,
	}
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

// 处理点击了发布评论的组件
const handleCommentClick = (reply) => {
	if (reply) {
		currentCommentType.value = reply.type
		inputBelongReplyItem = reply.replyItem
		Reflect.deleteProperty(reply, 'type')
		Reflect.deleteProperty(reply, 'replyItem')
		Object.assign(replyInfo, reply)
	}
}

// 发布评论
const handlePublishComment = async (data) => {
	const params = {
		...replyInfo,
		content: data.content,
		picture: data.pictures[0] || null,
		user_id: systemUserInfo.value.id,
		hot_topic_id: props.hotTopic.id,
		hotTopic: Object.assign({}, props.hotTopic, {
			pictures: JSON.stringify(props.hotTopic.pictures),
		}),
		level: currentCommentType.value,
	}
	publishLoading.value = true
	const res = await publishHotTopicComment(params)
	publishLoading.value = false
	if (res.code == 200) {
		message.success('评论成功')
		currentShowCommentInputId.value = null
		// 通知外部评论数更改
		emits('commentTotalChange', 'add')
		// 处理清空输入框
		switch (currentCommentType.value) {
			case 'top':
				firstLevelCommentInputRef.value.refreshData()
				break
			case 'replyTop':
				let index = commentList.findIndex((r) => r.id === replyInfo.reply_id)
				replyFirstLevelCommentInputRefs.value[index].refreshData()
				break
			case 'replySecond':
				const belongFirstComment = commentList.find((r) => r.id === replyInfo.reply_id)
				let index2 = belongFirstComment.replyList.findIndex((r) => r.id === inputBelongReplyItem.id)
				replySecondLevelCommentInputRefs.value[index2].refreshData()
				break
		}
		// 处理回显
		const obj = res.data
		obj.commentUserInfo = JSON.parse(JSON.stringify(systemUserInfo.value))
		obj.level = currentCommentType.value
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
			belongComment.remark_number += 1
			belongComment.replyList.unshift(obj)
			commentList.splice(belongCommentIndex, 1, belongComment)
		}
	}
}

// 处理点击一级或二级评论的点赞
const handleClickLikeComment = async (item, replyItem) => {
	const comment_id = replyItem?.id || item.id
	const alreadyLike = replyItem ? replyItem.alreadyLikeComment : item.alreadyLikeComment
	let res
	if (!alreadyLike) {
		res = await likeTopicComment(comment_id)
	} else {
		res = await cancelLikeTopicComment(comment_id)
	}
	if (res.code === 200) {
		message.success(alreadyLike ? '取消点赞成功!' : '点赞成功!')
		// 处理回显
		const topIndex = commentList.findIndex((r) => r.id === item.id)
		if (!replyItem) {
			// 点赞或取消点赞的是一级评论
			commentList[topIndex].alreadyLikeComment = !alreadyLike
			const originLikeNumber = commentList[topIndex].like_number
			commentList[topIndex].like_number = alreadyLike ? originLikeNumber - 1 : originLikeNumber + 1
		} else {
			// 点赞或取消点赞的是二级评论
			const secondIndex = commentList[topIndex].replyList.findIndex((r) => r.id === replyItem.id)
			commentList[topIndex].replyList[secondIndex].alreadyLikeComment = !alreadyLike
			const originLikeNumber = commentList[topIndex].replyList[secondIndex].like_number
			commentList[topIndex].replyList[secondIndex].like_number = alreadyLike ? originLikeNumber - 1 : originLikeNumber + 1
		}
	}
}

// 删除沸点评论
const toDeleteHot = async (type, item, replyItem) => {
	Modal.confirm({
		title: '确认删除该评论吗?',
		okText: '确认',
		cancelText: '取消',
		async onOk() {
			const comment_id = replyItem?.id || item.id
			const res = await removeHotTopicCommentById(comment_id)
			if (res.code == 200) {
				message.success('删除评论成功!')
				let decreaseNum = 1
				const topComment = commentList.find((r) => r.id === item.id)
				const topCommentIndex = commentList.findIndex((r) => r.id === item.id)
				if (type === 'top') {
					// 删除的是顶级评论
					decreaseNum += topComment.replyList.length
					commentList.splice(topCommentIndex, 1)
				} else {
					// 删除的是二级评论
					const replyCommentIndex = topComment.replyList.findIndex((r) => r.id === replyItem.id)
					commentList[topCommentIndex].replyList.splice(replyCommentIndex, 1)
					commentList[topCommentIndex].remark_number -= 1
				}
				emits('commentTotalChange', 'decrease', decreaseNum)
			}
		},
	})
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
						object-fit: cover;
						cursor: pointer;
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
							cursor: pointer;
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
					.comment-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-right: 20px;
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
									object-fit: cover;
								}

								span {
									color: #8a919f;
									font-size: 12px;
								}
							}
						}
						.icon {
							cursor: pointer;
							&:hover {
								path {
									fill: @base-blue-color;
								}
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
										object-fit: cover;
										cursor: pointer;
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
													cursor: pointer;
												}
												.reply {
													font-size: 14px;
													line-height: 24px;
													margin: 0 5px;
												}
												.reply-user {
													color: #a9a9a9;
													font-size: 14px;
													line-height: 24px;
													color: #575757;
													font-weight: 400;
													min-width: max-content;
													cursor: pointer;
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

									.reply-bottom {
										display: flex;
										align-items: center;
										justify-content: space-between;
										padding-right: 20px;
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
													object-fit: cover;
												}

												span {
													color: #8a919f;
													font-size: 12px;
												}
											}
										}
										.icon {
											cursor: pointer;
											&:hover {
												path {
													fill: @base-blue-color;
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
}

.ant-popover-content {
	.delete-box {
		width: 200px;
		column-gap: 7px;
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 3px 5px;
		border-radius: 3px;
		transition: all 0.3s;

		&:hover {
			opacity: 0.7;
			background: rgb(242, 242, 242);
		}

		img {
			width: 16px;
			height: 16px;
		}

		.text {
			font-size: 14px;
			color: #232121;
		}
	}
	.operate-box {
		width: 200px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		transition: all 0.3s;

		.item-box {
			display: flex;
			align-items: center;
			column-gap: 8px;
			.icon-box {
				display: flex;
				align-items: center;
			}
			.text {
				color: #232121;
				font-size: 14px;
			}
			&:hover {
				opacity: 0.7;
			}
		}
	}
}
</style>
