<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">消息设置</div>
		</div>
		<div class="content-wrap">
			<div class="title">私信设置</div>
			<div class="radio-box">
				<div class="tips">允许谁给我发私信</div>
				<a-radio-group v-model:value="value">
					<a-radio :value="1">所有人</a-radio>
					<a-radio :value="2">我关注的人</a-radio>
					<a-radio :value="3">互相关注的人</a-radio>
					<a-radio :value="4">关闭（不允许任何人给我发私信）</a-radio>
				</a-radio-group>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

const userInfo = ref(systemUserInfo)
const value = ref(1)


onMounted(() => {})
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrapper {
	background: #fff;
	width: 100%;
	border-radius: 4px;

	.title-wrapper {
		height: 50px;
		padding: 15px 20px;
		border-bottom: 1px solid #f1f1f1;
		.text {
			font-size: 18px;
			line-height: 24px;
		}
	}
    .content-wrap {
        padding: 20px;
        .title {
            font-size: 17px;
            margin-bottom: 20px;
        }
        .radio-box {
            display: flex;
            column-gap: 50px;
            align-items: center;
            .tips {
                font-size: 15px;
            }
        }
    }
}
</style>
