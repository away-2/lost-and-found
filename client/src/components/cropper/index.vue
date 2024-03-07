<template>
	<div>
		<a-modal title="图片剪裁" v-model:visible="visible" width="1000px">
			<div class="cropper-content">
				<div class="cropper" style="text-align: center">
					<vue-cropper
						ref="cropper"
						:img="option.img"
						:outputSize="option.outputSize"
						:outputType="option.outputType"
						:info="option.info"
						:canScale="option.canScale"
						:autoCrop="option.autoCrop"
						:autoCropWidth="option.autoCropWidth"
						:autoCropHeight="option.autoCropHeight"
						:fixedBox="option.fixedBox"
						:fixed="option.fixed"
						:fixedNumber="option.fixedNumber"
						:canMove="option.canMove"
						:canMoveBox="option.canMoveBox"
						:original="option.original"
						:centerBox="option.centerBox"
						:infoTrue="option.infoTrue"
						:full="option.full"
						:enlarge="option.enlarge"
						:mode="option.mode"
					>
					</vue-cropper>
				</div>
			</div>
			<template #footer>
				<div>
					<a-button @click="visible = false" class="standardBtn breathe">取消</a-button>
					<a-button @click="finish" class="standardBtn breathe">确认</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script setup>
import { reactive, toRefs, ref, computed } from 'vue'
import VueCropper from 'vue-cropper/src/vue-cropper.vue'

const visible = ref(false)
const cropper = ref(null)

const option = reactive({
	img: '', // 裁剪图片的地址 url 地址, base64, blob
	outputSize: 1, // 裁剪生成图片的质量
	outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
	info: true, // 裁剪框的大小信息
	canScale: false, // 图片是否允许滚轮缩放
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 345, // 默认生成截图框宽度
	autoCropHeight: 245, // 默认生成截图框高度
	fixedBox: false, // 固定截图框大小 不允许改变
	fixed: true, // 是否开启截图框宽高固定比例
	fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
	canMove: true, // 上传图片是否可以移动
	canMoveBox: true, // 截图框能否拖动
	original: false, // 上传图片按照原始比例渲染
	centerBox: true, // 截图框是否被限制在图片里面
	infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
	full: true, // 是否输出原图比例的截图
	enlarge: '1', // 图片根据截图框输出比例倍数
	mode: 'contain', // 图片默认渲染方式 contain , cover, 100px, 100% auto
})

let success = (res) => {}

const showModal = (obj) => {
	if (obj.img) {
		option.img = obj.img
	}
	if (obj.success) {
		success = obj.success
	}
	visible.value = true
}

const unimgurl = ref('')

const finish = () => {
	// 获取截图的数据
	cropper.value.getCropBlob((data) => {
		unimgurl.value = data
		confirm()
	})
}

const confirm = () => {
	success({
		img: unimgurl.value,
	})
	visible.value = false
}

const cancel = () => {
	visible.value = false
}
</script>

<style lang="less" scoped>
.real_info_class {
	.el-checkbox__input .el-checkbox__inner {
		border-radius: 0;
	}
}
.file-image {
	width: 320px;
	height: 320px;
	font-size: 14px;
	border: 1px solid #cccccc;
	margin: 15px 0;
}

/* 截图 */
/* .cropper-content {} */
.cropper {
	width: 960px;
	height: 606px;
}
</style>
