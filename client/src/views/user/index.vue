<template>
	<div class="user-container">
		<div class="nav-main-wrapper">
			<div class="avatar">
				<img src="@/assets/images/头像.jpg" alt="" />
			</div>
			<div class="info-box">
				<div class="introduction">
					<div class="user-name">打烊</div>
					<div class="setting-btn" @click="toSettingPage">编辑资料</div>
				</div>

				<div class="user-action">
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">1</div>
							<div class="user-fans">粉丝</div>
						</div>
					</div>
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">1</div>
							<div class="user-fans">关注</div>
						</div>
					</div>
					<div class="user-action-item">
						<div class="user-bar"></div>
						<div class="user-info-box">
							<div class="user-fans-num">1</div>
							<div class="user-fans">沸点</div>
						</div>
					</div>
				</div>
				<div class="prefile-box">
					<svg t="1709274120226" class="icon" viewBox="0 0 1154 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1316" width="21" height="18">
						<path
							d="M1015.808 64.512q62.464 0 99.84 31.744t37.376 96.256l0 568.32q0 27.648-10.24 52.224t-28.16 43.008-41.984 29.184-50.688 10.752l-892.928 0q-26.624 0-50.176-10.24t-40.96-27.136-27.648-39.424-10.24-48.128l0-580.608q0-55.296 33.792-90.624t95.232-35.328l886.784 0zM287.744 253.952q-19.456 0-36.864 7.168t-30.72 19.968-20.992 30.72-7.68 38.4 7.68 37.888 20.992 30.72 30.72 20.992 36.864 7.68q21.504 0 39.424-7.68t30.72-20.992 20.48-30.72 7.68-37.888q0-41.984-27.648-69.12t-70.656-27.136zM448.512 608.256q0-19.456-7.68-37.376t-20.48-30.72-30.72-20.48-37.376-7.68l-128 0q-39.936 0-67.584 28.16t-27.648 68.096l0 4.096 0 92.16 319.488 0 0-92.16 0-4.096zM923.648 709.632q20.48 0 30.208-10.24t9.728-24.576-11.264-25.088-31.744-10.752l-305.152 0q-20.48 0-30.72 10.752t-10.24 25.088 10.24 24.576 29.696 10.24l309.248 0zM924.672 577.536q20.48 0 29.696-10.24t9.216-24.576q0-15.36-8.704-25.6t-29.184-10.24l-313.344 0q-20.48 0-29.696 10.24t-9.216 25.6q0 14.336 8.704 24.576t29.184 10.24l313.344 0zM925.696 447.488q15.36 0 26.624-10.24t11.264-24.576-11.264-23.04-26.624-8.704l-207.872 0q-15.36 0-26.112 8.704t-10.752 23.04 10.752 24.576 26.112 10.24l207.872 0z"
							p-id="1317"
							fill="#72777b"
						></path>
					</svg>
					<div class="prefile multiline-text-ellipsis">
						这是一段朴实无华的个人简介啦啦啦前期开发还算顺利，在规定的时间内，完成了开发、测试、上线。但是，老板并没有如前面说的，很快运营，很快就盈利，运营的开展非常缓慢。中间还经历了各种折腾的事情。
						老板运营遇到困难，就到处找一些专家（基本跟我们这事情没半毛钱关系的专家），不断的提一些业务和ui上的意见，不断的修改； 期间新来的产品还要全部推翻原有设计，重新开发；
						还有个兼职的领导非要说要招聘原生开发和Java开发重新进行开发，问为什么，也说不出什么所以然，也是道听途说。
						反正就是不断提出要修改产品、设计、和代码。中间经过不断的讨论，摆出自己的意见，好在最终技术方案没修改，前期的工作成果还在。后边加了一些新的需求：系统升级1.1、ui升级2.0、开发小程序版本、开发新的配套系统(小程序版本)以及开发相关的后台、添加即时通信服务、以及各种小的功能开发与升级；
						中间老板要加快进度了就让招人，然后又无缘无故的要开人，就让人很无奈。最大的运营问题，始终没什么进展，明显的问题并不在产品这块，但是在这里不断的折腾这群开发，也真是难受。
						明明你已经很努力的协调各种事情、站在公司的角度考虑、努力写代码，却仍然无济于事。
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-image">
			<img src="@/assets/images/bg.gif" alt="" />
		</div>
		<div class="main-wrapper">
			<a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @select="selectedKeys" />
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { GET_USERINFO } from '@/utils/token'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userInfo = GET_USERINFO().user

const keyAdapter = (key) => {
	if(!isNaN(Number(key))) {
        return ''
    }
	return key
}

const current = ref([keyAdapter(route.path.split('/').pop())])

const items = ref([
	{
		key: '',
		label: '最近',
		title: '最近',
	},
	{
		key: 'losts',
		label: '失物帖子',
		title: '失物帖子',
	},
	{
		key: 'founds',
		label: '招领帖子',
		title: '招领帖子',
	},
	{
		key: 'topic',
		label: '沸点',
		title: '沸点',
	},
	{
		key: 'following',
		label: '关注',
		title: '关注',
	},
	{
		key: 'collect',
		label: '收藏',
		title: '收藏',
	},
	{
		key: 'like',
		label: '点赞',
		title: '点赞',
	},
])

const selectedKeys = ({ key }) => {
	if (route.path.split('/').length === 3) {
		router.push(`${route.path}/${key}`)
	} else {
		if (!key) {
			router.push(`${route.path.split('/').splice(0, 3).join('/')}`)
		} else {
			router.push(`${route.path.split('/').splice(0, 3).join('/')}/${key}`)
		}
	}
}

// 前往设置页
const toSettingPage = () => {
	router.push({ path: '/setting' })
}

</script>

<style lang="less" scoped>
.user-container {
	padding: 10px 100px;

	.nav-main-wrapper {
		width: 100%;
		height: 180px;
		background: #fff;
		border-radius: 2px;
		margin: 10px 0;
		padding: 30px;
		display: flex;
		column-gap: 25px;

		.avatar {
			flex: 0 0 auto;

			img {
				width: 90px;
				height: 90px;
				border-radius: 50%;

				// 头像旋转动画
				&:hover {
					transform: rotate(666turn);
					transition-duration: 59s;
					transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
				}
			}
		}

		.info-box {
			flex: 1 1 auto;

			.introduction {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-name {
					font-size: 20px;
					font-weight: 600;
					line-height: 1.2;
					color: #000;
					margin-bottom: 8px;
				}

				.setting-btn {
					width: 118px;
					height: 34px;
					color: #007fff;
					border: 1px solid #007fff;
					text-align: center;
					line-height: 30px;
					border-radius: 4px;
					cursor: pointer;
					&:hover {
						opacity: 0.6;
					}
				}
			}

			.user-action {
				display: flex;
				margin: 10px 0;

				.user-action-item {
					display: flex;
					justify-content: space-between;

					.user-bar {
						width: 2px;
						height: 20px;
						background: #e8e8ed;
						margin-right: 16px;
					}

					.user-info-box {
						display: flex;
						column-gap: 5px;

						.user-fans-num {
							color: #555666;
							font-size: 16px;
							font-weight: 700;
						}

						.user-fans {
							color: #555666;
							font-size: 16px;
							line-height: 16px;
							margin-right: 15px;
						}
					}
				}
			}

			.prefile-box {
				display: flex;
				column-gap: 15px;
				align-items: flex-start;
				margin: 15px 0;

				.prefile {
					font-size: 14px;
					color: #72777b;
					width: 800px;
				}
			}
		}
	}

	.bottom-image {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}

	.main-wrapper {
		width: 100%;
		height: 100px;
		background: #fff;
	}
}
</style>
