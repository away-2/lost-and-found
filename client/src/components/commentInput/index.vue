<template>
	<div class="comment-form" :class="{ column: shapeType === 'publish' }">
		<div class="avatar-box" v-if="shapeType === 'comment'">
			<img :src="userInfo.avator" alt="" />
		</div>
		<div class="input-box" :class="{ focused: isFocusedOfInput }">
			<!-- 输入框 -->
			<div contenteditable="true" :placeholder="hintText" ref="inputRef" class="textarea" @focus="handleFocus" @blur="handleBlur" @keydown="handleInputKeyDown"></div>
			<!-- 预览图片列表 -->
			<div class="picture-list">
				<div class="picture-item" v-for="(picture, index) in pictureList" :key="picture.id">
					<img :src="picture.local_file_path" />
					<div class="close-icon-box" @click="handleDeleteImg(index)">
						<svg t="1708829204815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10638" width="8" height="8">
							<path
								d="M512 414.917L156.188 59.024a68.647 68.647 0 1 0-97.084 97.083L414.836 512 58.944 867.812a68.647 68.647 0 1 0 97.083 97.084L512 609.164l355.812 355.892a68.647 68.647 0 1 0 97.084-97.083L609.164 512l355.892-355.812a68.647 68.647 0 1 0-97.083-97.084L512 414.836z"
								p-id="10639"
							></path>
						</svg>
					</div>
				</div>
				<div class="select-box" v-show="pictureList.length > 0 && pictureList.length < maxFileQuantity && maxFileQuantity > 1" @click="handleClickUpload"></div>
			</div>
			<!-- 底部操作栏 -->
			<operate-box
				v-if="shapeType === 'comment'"
				:="Object.assign({}, $props, { allowInputCharQuantity, alreadyInputCharQuantity })"
				@handleClickUpload="handleClickUpload"
				@handleSubmit="handleSubmit"
			/>
		</div>
		<!-- 底部操作栏 -->
		<operate-box
			v-if="shapeType === 'publish'"
			:="Object.assign({}, $props, { allowInputCharQuantity, alreadyInputCharQuantity })"
			@handleClickUpload="handleClickUpload"
			@handleSubmit="handleSubmit"
		/>
		<input type="file" hidden ref="uploadRef" @change="handleFileChange" />
	</div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { GET_USERINFO } from '@/utils/token'
import { formatPast } from '@/utils/time'
import { message, Modal } from 'ant-design-vue'
import { fileUpload } from '@/api/hot'
import OperateBox from './components/operateBox/index.vue'

const props = defineProps({
	shapeType: {
		require: false,
		default: 'comment',
	},
	// 输入框最小高度
	inputMinHeight: {
		require: false,
		default: 100,
	},
	// 输入框最大高度
	inputMaxHeight: {
		require: false,
		default: 'none',
	},
	// 是否需要获取焦点后增加高度过渡效果
	isNeedIncreaseHeight: {
		require: false,
		default: true,
	},
	// 输入框提示语句
	hintText: {
		require: false,
		default: '抢首评，友善交流',
	},
	// 最大可上传文件数
	maxFileQuantity: {
		require: false,
		default: 1,
	},
})

const emits = defineEmits(['handleSubmit'])

const pictureSize = ref(props.shapeType === 'comment' ? '65px' : '80px')

// 输入框ref
const inputRef = ref(null)
// 上传文件选择框ref
const uploadRef = ref(null)

let userInfo = GET_USERINFO().user

// 输入框最小高度,初始值由传入的props决定
const saveInputMinHeight = ref(props.inputMinHeight + 'px')

// 输入框最大高度,初始值由传入的props决定
const saveMaxInputHeight = ref(props.inputMaxHeight === 'none' ? 'none' : props.inputMaxHeight + 'px')

// 输入框是否处于聚焦状态
const isFocusedOfInput = ref(false)

// 输入框获得焦点回调
const handleFocus = () => {
	isFocusedOfInput.value = true
	if (props.isNeedIncreaseHeight) {
		saveInputMinHeight.value = props.inputMinHeight + 40 + 'px'
	}
}

// 输入框失去焦点回调
const handleBlur = () => {
	isFocusedOfInput.value = false
	// 如果做了自动增高效果，要考虑是否缩回去
	if(props.isNeedIncreaseHeight) {
		if(inputRef.value.scrollHeight <= props.inputMinHeight + 40) {
			saveInputMinHeight.value = props.inputMinHeight + 'px'
		}
	}
	console.log(inputRef.value.scrollHeight);
}

// 允许输入的最大字符数
const allowInputCharQuantity = ref(50)

// 已经输入的最大字符数
const alreadyInputCharQuantity = ref(0)

// 输入框keydown事件回调
const handleInputKeyDown = (e) => {
	limitTextLength(e)
}

function limitTextLength(e) {
	let textLength = inputRef.value.innerText.length
	alreadyInputCharQuantity.value = textLength

	let allowKey = [8, 13, 37, 38, 39, 40] // 上下左右 回车 删除

	if (textLength >= allowInputCharQuantity.value && allowKey.indexOf(e.keyCode) === -1) {
		e.preventDefault()
	}
}

// 上传的图片数据
const pictureList = reactive([
	// { id: 1, file_path: 'http://localhost:3100/upload/17076486627.jpeg' },
	// { id: 2, file_path: 'http://localhost:3100/upload/17076486627.jpeg' },
])

// 点击上传
const handleClickUpload = () => {
	let mark = true
	if (props.maxFileQuantity > 1 && pictureList.length >= props.maxFileQuantity) {
		message.warning(`最多可上传${props.maxFileQuantity}张图片`)
		mark = false
	}
	if (mark) {
		uploadRef.value.click()
	}
}

// 上传选择了图片回调
const handleFileChange = async (e) => {
	const formData = new FormData()
	formData.append('file', e.target.files[0])
	const res = await fileUpload(formData)
	if (res.code == 200) {
		message.success('上传成功!')
		const blob = new Blob([e.target.files[0]])
		const fileReader = new FileReader()
		fileReader.readAsDataURL(blob)
		fileReader.onload = () => {
			res.data.local_file_path = fileReader.result
			if (props.maxFileQuantity === 1) {
				pictureList.splice(0, 1, res.data)
			} else if (props.maxFileQuantity > 1) {
				pictureList.push(res.data)
			}
		}
	}
}

const handleDeleteImg = (index) => {
	pictureList.splice(index, 1)
}

const handleSubmit = () => {
	if (alreadyInputCharQuantity.value === 0) return
	// 组织数据,传给父组件
	const inputElement = inputRef.value
	console.log(inputElement);
	const data = {content: inputElement, pictures: pictureList}
	emits('handleSubmit',data)
}
</script>

<style lang="less" scoped>
.comment-form {
	display: flex;
	&.column {
		flex-direction: column;
	}

	.avatar-box {
		padding-right: 10px;

		img {
			width: 40px;
			height: 40px;
		}
	}

	.input-box {
		flex: 1;
		border-radius: 5px;
		border: 1px solid transparent;
		background: #f2f3f5;
		padding: 10px;
		padding-bottom: 15px;
		position: relative;
		transition: all 0.3s;

		&:hover {
			background: #e9e9ea;
		}

		&.focused {
			border-color: #1e80ff;
			background: #fff;
			box-shadow: 0 0 0 0.2rem rgba(232, 241, 253, 0.25);
		}

		// 输入框
		.textarea {
			width: 100%;
			min-height: v-bind(saveInputMinHeight);
			max-height: v-bind(saveMaxInputHeight);
			outline: none;
			border: 1px solid transparent;
			border-radius: 5px;
			overflow-y: scroll;
			transition: all 0.3s;

			&:empty::before {
				content: attr(placeholder);
				color: #8a919f;
				font-size: 13px;
			}

			&::-webkit-scrollbar {
				width: 8px;
				/*高宽分别对应横竖滚动条的尺寸*/
				height: 10px;
			}

			&::-webkit-scrollbar-thumb {
				background: #b4bbc5;
				border-radius: 3px;
			}

			&::-webkit-scrollbar-thumb:hover {
				background: rgb(145, 145, 145);
				transition: 0.5s;
			}
		}

		// 预览图片列表
		.picture-list {
			display: flex;
			column-gap: 15px;
			margin-top: 10px;
			.picture-item {
				position: relative;
				img {
					width: v-bind(pictureSize);
					height: v-bind(pictureSize);
					border-radius: 3px;
					object-fit: cover;
				}
				.close-icon-box {
					position: absolute;
					right: 2px;
					top: 2px;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: rgb(255, 255, 255);
					opacity: 0.7;
					cursor: pointer;
					transition: all 0.3s;
					&:hover {
						opacity: 0.9;
						.icon {
							path {
								fill: rgb(6, 6, 6);
							}
						}
					}
					.icon {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						color: rgb(233, 103, 11);
						path {
							fill: rgb(56, 56, 56);
							transition: all 0.3s;
						}
					}
				}
			}
			.select-box {
				width: v-bind(pictureSize);
				height: v-bind(pictureSize);
				background: #f7f8fa;
				border: 1px dashed #e4e6eb;
				cursor: pointer;
				position: relative;
				transition: all 0.3s;
				&:hover {
					opacity: 0.4;
				}
				&::before {
					content: '';
					width: 40%;
					height: 1px;
					display: block;
					position: absolute;
					background: #c5c5c5;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				&::after {
					content: '';
					width: 40%;
					height: 1px;
					display: block;
					position: absolute;
					background: #c5c5c5;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%) rotate(90deg);
				}
			}
		}
	}
}
</style>
