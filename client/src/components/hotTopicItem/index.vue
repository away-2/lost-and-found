<template>
	<div class="contentWrap">
		<div class="hot-container">
			<div class="hot-header">
				<div class="userInfo-wrap">
					<user-info-popover :userInfo="_hotTopic.publish_user">
						<img class="avatar" :src="_hotTopic.publish_user.avator" @click="toUserCenter(_hotTopic.publish_user.id)" />
					</user-info-popover>
					<div class="userInfo">
						<user-info-popover :userInfo="_hotTopic.publish_user">
							<div class="username" @click="toUserCenter(_hotTopic.publish_user.id)">{{ _hotTopic.publish_user.nick_name || _hotTopic.publish_user.real_name }}</div>
						</user-info-popover>
						<div class="meta-box">
							<div class="profile text-ellipsis">{{ _hotTopic.publish_user.profile }}</div>
							<div class="dot">·</div>
							<div class="timestamp" @click="handleToTopicInfo(_hotTopic.id)">{{ formatPast(hotTopic.createdAt) }}</div>
						</div>
					</div>
				</div>

				<div class="hot-title-right" v-if="userOfSystemUsing.id === hotTopic.publish_user.id && isNeedDelete">
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
			<div class="hot-content">
				<div class="text" v-html="hotTopic.content"></div>
				<template v-if="hotTopic.pictures">
					<div class="picture-list">
						<img v-for="(picture, index) in hotTopic.pictures" :key="index" class="picture" :class="{ small: hotTopic.pictures.length > 1 }" :src="picture" />
					</div>
				</template>
			</div>

			<div class="hot-like" v-show="_hotTopic.like_number > 0">
				<div class="isblank"></div>
				<div class="like-list" @click="showModal(hotTopic.id)">
					<div class="list">
						<div class="avatar" v-for="(list, index) in _hotTopic.rankLikeUsers" :key="index">
							<img :src="list.avator" alt="" />
						</div>
					</div>
					<div class="label">{{ _hotTopic.like_number > 1 ? '等人赞过' : '赞过' }}</div>
				</div>
			</div>
		</div>
		<comment-footer :supportShowComment="supportShowComment" :hotTopic="_hotTopic" @operateLikeOk="handleOperateLikeOk" />
	</div>
	<!-- 沸点点赞详情Modal -->
	<like-detail-modal v-model:isOpen="open" :topicId="lookLikersTopicId" />
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { formatPast } from '@/utils/time'
import { removeHotById } from '@/api/hot'
import { GET_USERINFO } from '@/utils/token'
import { message, Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const props = defineProps({
	hotTopic: {
		require: true,
	},
	supportShowComment: {
		require: false,
		default: true,
	},
	isNeedDelete: {
		require: false,
		default: false,
	},
})

const _hotTopic = reactive({})
watch(
	() => props.hotTopic,
	() => {
		Object.assign(_hotTopic, props.hotTopic)
	},
	{ immediate: true }
)

const open = ref(false)
const lookLikersTopicId = ref(null)
const showModal = async (id) => {
	open.value = true
	lookLikersTopicId.value = id
}

const userOfSystemUsing = reactive(GET_USERINFO().user)

const router = useRouter()

// 点击发布日期进入沸点详情页
const handleToTopicInfo = (id) => {
	const { href } = router.resolve({
		path: `/hot/${id}`
	}) 
	window.open(href, '_blank')
}

// 点赞和取消点赞沸点回调
const handleOperateLikeOk = (isLike) => {
	if (isLike) {
		// 说明是在点赞
		_hotTopic.already_like = true
		_hotTopic.like_number += 1
		if (_hotTopic.rankLikeUsers.length >= 3) {
			_hotTopic.rankLikeUsers.splice(2, 1)
		}
		_hotTopic.rankLikeUsers.unshift(userOfSystemUsing)
	} else {
		// 说明是在取消点赞
		_hotTopic.already_like = false
		_hotTopic.like_number -= 1
		const index = _hotTopic.rankLikeUsers.findIndex((item) => item.id === userOfSystemUsing.id)
		_hotTopic.rankLikeUsers.splice(index, 1)
	}
}

// 前往个人主页
const toUserCenter = (id) => {
	const { href } = router.resolve({
		path: `/user/${id}`
	}) 
	window.open(href, '_blank')
}

// 删除此沸点
const toDeleteHot = () => {
	Modal.confirm({
		title: '确认删除此沸点吗？',
		content: null,
		okText: '确认',
		cancelText: '取消',
		async onOk() {
			const res = await removeHotById(_hotTopic.id)
			if (res.code == 200) {
				message.success('删除成功')
				localStorage.removeItem('newTopic')
				router.push('/home')
			}
		},
		onCancel() { },
	})
}
</script>

<style lang="less" scoped>
.contentWrap {
	width: 100%;
	background: #fff;
	border-radius: 5px;
	margin: 10px 0;

	.hot-container {
		margin-bottom: 10px;

		.hot-header {
			display: flex;
			padding: 10px;
			justify-content: space-between;

			.userInfo-wrap {
				display: flex;
				align-items: center;
				column-gap: 10px;

				img {
					height: 48px;
					width: 48px;
					border-radius: 50%;
					object-fit: cover;
					cursor: pointer;
				}

				.userInfo {
					transform: translateY(2px);

					.username {
						font-size: 14px;
						padding: 5px 0;
						color: #252933;
						cursor: pointer;
					}

					.meta-box {
						display: flex;
						line-height: 24px;
						align-items: center;

						.profile {
							font-size: 12px;
							color: #a9a9a9;
							max-width: 288px;
						}

						.dot {
							font-size: 12px;
							color: #a9a9a9;
							margin: 0 5px;
						}

						.timestamp {
							font-size: 12px;
							color: #a9a9a9;
							transition: all 0.3s;
							cursor: pointer;

							&:hover {
								color: rgb(62, 126, 247);
							}
						}
					}
				}
			}

			.hot-title-right {
				padding: 20px;
				cursor: pointer;

				img {
					width: 13px;
					height: 20px;

					&:hover {
						opacity: 0.6;
					}
				}
			}
		}

		.hot-content {
			padding: 0 0 10px 70px;
			color: #252933;

			.text {
				padding-right: 40px;
				font-size: 14px;
				line-height: 23px;
				width: 100%;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.picture-list {
				display: flex;
				flex-wrap: wrap;
				column-gap: 15px;
				margin-top: 15px;

				.picture {
					width: 200px;
					height: 200px;
					border-radius: 4px;
					object-fit: cover;

					&.small {
						width: 100px;
						height: 100px;
					}
				}
			}
		}

		.hot-like {
			position: relative;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 10px 20px;
			z-index: 1;

			.isblank {
				flex: 1 1 auto;
				display: block;
			}

			.like-list {
				cursor: pointer;
				display: flex;
				column-gap: 10px;

				.list {
					display: flex;

					.avatar {
						width: 22px;
						height: 22px;
						border-radius: 50%;
						border: 2px solid #fff;
						margin-right: -6px;

						img {
							width: 19px;
							height: 19px;
							border-radius: 50%;
							object-fit: cover;
						}
					}
				}
			}

			.label {
				color: #8a919f;
				font-size: 14px;
				line-height: 24px;

				&:hover {
					opacity: 0.6;
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
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			opacity: 0.6;
		}

		img {
			width: 20px;
			height: 20px;
		}

		.text {
			color: #a9a9a9;
		}
	}
}

@media (max-width: 1200px) {
	.mainContent {
		flex-direction: column;
		padding: 10px;
	}

	.leftWrap {
		display: none;
	}

	.rightWrap {
		display: none;
	}

	.centerWrap {
		width: 100% !important;
	}
}
</style>
