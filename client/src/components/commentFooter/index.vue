<template>
	<div class="hot-footer">
		<div class="share-action">分享</div>
		<div class="comment-action" @click="handleShowComment()">
			<img v-if="!isShowComment" src="@/assets/images/评论.png" />
			<img v-else src="@/assets/images/评论_active.png" alt="" />
			<span :style="{ color: isShowComment ? '#1e80ff' : '#a9a9a9' }">{{ hotTopic.remark_number > 0 ? hotTopic.remark_number : '评论' }}</span>
		</div>
		<div class="like-action" @click="handleLikeTopic">
			<img v-if="!hotTopic.already_like" src="@/assets/images/点赞.png" alt="" />
			<img v-else src="@/assets/images/点赞_active.png" />
			<span :style="{ color: hotTopic.already_like ? '#1e80ff' : '#a9a9a9' }">{{ hotTopic.like_number > 0 ? hotTopic.like_number : '点赞' }}</span>
		</div>
	</div>
	<comment-list v-show="isShowComment && supportShowComment"></comment-list>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { likeTopicById, cancelLikeTopicById } from '@/api/hot'

const isShowComment = ref(false)

const props = defineProps({
	// 是否支持展示评论
	supportShowComment: {
		require: false,
		default: true,
	},
	hotTopic: {
		require: true,
		default: {},
	},
})

const emits = defineEmits(['operateLikeOk'])

// 展开评论区
const handleShowComment = () => {
	isShowComment.value = !isShowComment.value
}

// 给这条沸点点赞
const handleLikeTopic = async () => {
	let res = null
	if (props.hotTopic.already_like) {
		// 取消点赞
		res = await cancelLikeTopicById(props.hotTopic.id)
		if (res.code == 200) {
			emits('operateLikeOk', false)
		}
	} else {
		// 点赞
		res = await likeTopicById(props.hotTopic.id)
		if (res.code == 200) {
			emits('operateLikeOk', true)
		}
	}
}
</script>

<style lang="less" scoped>
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

		&:hover {
			opacity: 0.6;
		}
	}

	.comment-action {
		width: 33%;
		padding: 10px;
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
		padding: 10px;
		width: 33%;
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
</style>
