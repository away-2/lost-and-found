<template>
	<div class="container-wrapper">
		<div class="title-wrapper">
			<div class="text">屏蔽管理</div>
		</div>
        <div class="content-wrap">
            <img src="@/assets/images/暂无数据.png" alt="">
            <div class="text">你当前未屏蔽任何人哦~</div>
        </div>
	</div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'

const userStore = useUserStore()
const { systemUserInfo } = storeToRefs(userStore)

let userInfo = ref(systemUserInfo)

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
        width: 100%;
        text-align: center;
        padding-top: 150px;
        img {
            width: 180px;
            height: 180px;
        }
        .text {
            font-size: 14px;

        }
    }
}
</style>
