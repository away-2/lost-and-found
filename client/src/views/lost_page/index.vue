<template>
	<div class="container-wrapper">
		<!-- 发布帖子组件 -->
		<publish />
		<!-- 返回顶部组件 -->
		<back-top />
		<!-- 顶部搜索框 -->
		<div class="top-box">
			<div class="search-box" :class="{ active: isFocus }">
				<input type="search" placeholder="请输入搜索物品关键字~" class="input" maxlength="64" @focus="inputFocus" @blur="inputBlur" />
				<div class="search-icon-container" :class="{ active: isFocus }">
					<svg t="1710318420564" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1680" width="18" height="18">
						<path
							d="M104.385155 468.298759a364.034819 364.034819 0 1 1 728.069637-9.640482 364.034819 364.034819 0 0 1-728.069637 9.640482z m905.77869 468.459149L832.62542 759.13417A467.008811 467.008811 0 0 0 759.59664 102.472346a467.264753 467.264753 0 0 0-656.661823 73.114094 467.094125 467.094125 0 0 0 657.429649 656.064626l177.45311 177.45311a51.188397 51.188397 0 0 0 74.223177-70.46936l-1.876908-1.876908z"
							fill="#515767"
							p-id="1681"
						></path>
					</svg>
				</div>
			</div>
			<div class="common-box">
				<div class="text">常用关键字</div>
				<div class="keyword" v-for="keywords in keywords">{{ keywords }}</div>
			</div>
		</div>
		<div class="content-box">
            <div class="tab-box">
                <tab :titles="titleTab" :initialIndex="0" />
            </div>

        </div>
	</div>
</template>

<script setup>
import publish from '@/components/publish/index.vue'
import tab from '@/components/tab/index.vue'
import { reactive, ref } from 'vue'

const keywords = reactive(['手机', '课本', '钥匙'])
const isFocus = ref(false)
const titleTab = reactive(['全部', '证件','电子产品', '书籍', '衣服', '箱包', '宠物', '其他'])

const inputFocus = () => {
	isFocus.value = true
}

const inputBlur = () => {
	isFocus.value = false
}
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrapper {
	padding: 20px 150px;
	.top-box {
		background: #fff;
		display: flex;
		column-gap: 20px;
		align-items: center;
        justify-content: space-between;
		height: 70px;
        width: 100%;
        padding: 0 20px;
		.search-box {
			box-sizing: border-box;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 4px;
			position: relative;
			border: 1px solid #c2c8d1;
			width: 360px;
			transition: all 0.3s;

			.input {
				border: none;
				width: calc(100% - 44px);
				padding: 0.6rem 0 0.6rem 1rem;
				box-shadow: none;
				outline: none;
				font-size: 14px;
				color: #252933;
				background-color: transparent;
				transition: all 0.3s;
			}
			.search-icon-container {
				position: relative;
				left: -2px;
				width: 44px;
				height: 30px;
				background: #f2f3f5;
				border-radius: 2px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.active {
			transition: all 0.3s;
			&.search-box {
				width: 500px;
				border: 1px solid @base-blue-color;
			}
			&.search-icon-container {
				background: #eaf2ff;
				cursor: pointer;
                .icon {
                    path {
                        fill: @base-blue-color;
                    }
                }
			}
		}
		.common-box {
			display: flex;
			column-gap: 10px;
			align-items: center;
            .text {
                font-size: 16px;
                color: @base-blue-color;
            }
            .keyword {
                font-size: 14px;
            }
		}
	}
    .content-box {
        margin-top: 10px;
        background: #fff;
        width: 100%;
        height: 1000px;
        .tab-box {
            width: 100%;
        }
    }
}
</style>
