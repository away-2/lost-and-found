<template>
	<div class="operate-box">
		<div class="left">
			<!-- 表情 -->
			<svg t="1708832384503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13965" width="22" height="22">
				<path
					d="M512.1 63.9C265 63.9 64 265 64 512c0 247.1 201 448.1 448.1 448.1 247.1 0 448.1-201 448.1-448.1 0-247-201.1-448.1-448.1-448.1z m0 800.5c-194.3 0-352.4-158.1-352.4-352.4 0-194.3 158.1-352.4 352.4-352.4 194.3 0 352.4 158.1 352.4 352.4 0 194.3-158.1 352.4-352.4 352.4zM404.9 471.9c36.7 0 66.4-29.7 66.4-66.4s-29.7-66.4-66.4-66.4-66.4 29.7-66.4 66.4c0.1 36.7 29.8 66.4 66.4 66.4z m214.3 0c36.7 0 66.4-29.7 66.4-66.4s-29.7-66.4-66.4-66.4-66.4 29.7-66.4 66.4c0.1 36.7 29.8 66.4 66.4 66.4z m80.5 78.4c-25.4-7.9-52 6.4-59.8 31.6-17.4 56.4-68.9 94.3-128 94.3-58.7 0-110-37.6-127.7-93.5-7.9-25.2-35-39.2-60-31.1-25.2 8-39.1 34.9-31.2 60.1 30.4 95.9 118.4 160.2 218.9 160.2 101.4 0 189.6-65 219.4-161.8 7.8-25.2-6.4-52-31.6-59.8z"
					fill="#707070"
					p-id="13966"
				></path>
			</svg>
			<!-- 上传图片 -->
			<svg
				t="1708830813642"
				@click="triggleCustomEvent('handleClickUpload')"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="11743"
				width="21"
				height="21"
			>
				<path
					d="M335.36 440.32c38.4 0 71.68-30.72 71.68-71.68 0-38.4-30.72-71.68-71.68-71.68-38.4 0-71.68 30.72-71.68 71.68 2.56 40.96 33.28 71.68 71.68 71.68z m0 0M652.8 396.8L445.44 691.2 337.92 540.16 158.72 793.6h704L652.8 396.8z m0 0"
					fill="#707070"
					p-id="11744"
				></path>
				<path
					d="M934.4 107.52H89.6c-20.48 0-35.84 15.36-35.84 35.84V883.2c0 20.48 15.36 35.84 35.84 35.84h844.8c20.48 0 35.84-15.36 35.84-35.84V143.36c0-20.48-15.36-35.84-35.84-35.84z m-35.84 739.84H125.44V176.64h775.68v670.72h-2.56z m0 0"
					fill="#707070"
					p-id="11745"
				></path>
			</svg>
		</div>
		<div class="right">
			<div class="input-char-info">{{ alreadyInputCharQuantity }} / {{ allowInputCharQuantity }}</div>
			<a-tooltip placement="bottom" title="标点符号、链接等不计算在字符里">
				<svg t="1708832950196" v-if="shapeType === 'comment'" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15177" width="19" height="19">
					<path d="M514.688 707.2m-48.96 0a48.96 48.96 0 1 0 97.92 0 48.96 48.96 0 1 0-97.92 0Z" p-id="15178" fill="#8a8a8a"></path>
					<path
						d="M398.08 309.952c-32.32 35.136-67.328 138.24 7.936 140.032 41.984 1.024 41.6-25.088 43.712-31.296s6.336-35.648 19.008-47.936 18.88-18.368 38.592-18.368c19.328 0 34.624 5.12 46.144 15.168 11.584 10.112 17.28 22.336 17.28 36.672a54.848 54.848 0 0 1-7.04 28.416c-4.736 7.936-18.304 22.464-40.896 43.584-23.424 22.016-40.64 45.568-51.008 70.528-22.656 54.656 61.056 71.36 77.888 47.104 16.512-23.872 6.912-28.48 46.528-67.968 19.776-18.688 32.192-32.192 37.376-40.32 8.96-13.44 15.296-26.688 19.392-39.616a139.072 139.072 0 0 0-13.056-110.464c-38.912-68.48-160.96-113.472-241.856-25.536z"
						p-id="15179"
						fill="#8a8a8a"
					></path>
					<path
						d="M508.544 66.88A448 448 0 0 0 60.992 514.432a448 448 0 0 0 447.552 447.552 448 448 0 0 0 447.552-447.552 448 448 0 0 0-447.552-447.552z m0 831.104a384 384 0 0 1-383.552-383.552 384 384 0 0 1 383.552-383.552 384 384 0 0 1 383.552 383.552 384 384 0 0 1-383.552 383.552z"
						p-id="15180"
						fill="#8a8a8a"
					></path>
				</svg>
			</a-tooltip>
			<div class="submit-btn" @click="triggleCustomEvent('handleSubmit')" :class="[{ disabled: alreadyInputCharQuantity === 0 }, { large: shapeType === 'publish' }]">
				{{ shapeType === 'publish' ? '发布' : '发送' }}
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	shapeType: {
		require: true,
	},
	allowInputCharQuantity: {
		require: true,
	},
	alreadyInputCharQuantity: {
		require: true,
	},
})

const emits = defineEmits(['handleClickUpload','handleSubmit'])

const triggleCustomEvent = (eventName) => {
	emits(eventName)
}
</script>

<style lang="less" scoped>
.operate-box {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.left {
		display: flex;
		column-gap: 20px;
		.icon {
			cursor: pointer;
			&:hover {
				path {
					fill: #1e80ff;
				}
			}
		}
	}
	.right {
		display: flex;
		column-gap: 8px;
		align-items: center;
		.input-char-info {
			font-size: 12px;
			color: rgb(105, 105, 105);
		}
		.icon {
			cursor: pointer;
		}
		.submit-btn {
			width: 60px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			background-color: #57a0ff;
			color: white;
			border-radius: 3px;
			font-size: 12px;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				opacity: 0.5;
			}
			&.disabled {
				cursor: not-allowed;
				background-color: #9cc7ff;
			}
			&.large {
				width: 92px;
				height: 36px;
				line-height: 36px;
				font-size: 14px;
			}
		}
	}
}
</style>
