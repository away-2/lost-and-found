<template>
	<div class="main-container">
		<div class="left-box">
			<div class="search-box">
				<a-input v-model:value="userName" placeholder="搜索联系人">
					<template #suffix>
						<SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
					</template>
				</a-input>
			</div>
			<div class="scroll-content">
				<div class="user-list">
					<div class="user-info">
						<div class="avatar">
							<img src="@/assets/images/头像.jpg" />
						</div>
						<div class="user-box">
							<div class="user-name">打烊</div>
							<div class="user-message">今天天气不太好</div>
						</div>
					</div>
                    <div class="timestamp">1天前</div>
				</div>
			</div>
		</div>
        <div class="right-box">
            <div class="top-box">
                <div class="user-name">打烊</div>
                <img src="@/assets/images/three_point2.png"/>
            </div>
            <div class="main-box">

            </div>
            <div class="bottom-box">

            </div>
        </div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
const userName = ref('')
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.main-container {
    display: flex;
    .left-box {
        width: 20%;
        border-right: 1px solid #f1f1f1;
        padding: 0 10px;
        margin: 10px 0;
        .search-box {
            border-bottom: 1px solid #f1f1f1;
        }
        .scroll-content {
            margin-top: 10px;
            .user-list {
                display: flex;
                justify-content: space-between;
                width: 100%;
                .user-info {
                    display: flex;
                    flex: 0 0 auto;
                    column-gap: 10px;
                    .avatar {
                        img {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            object-fit: cover;

                        }
                    }
                    .user-box {
                        .user-name {
                            font-size: 14px;
                            // color: @base-gray-color;
                        }
                        .user-message {
                            font-size: 12px;
                            color: @base-gray-color;
                            margin-top: 2px;
                        }
                    }
                }
                .timestamp {
                    font-size: 12px;
                    color: @base-gray-color;

                }
                &:hover {
                    background: #f1f1f1;
                }
            }
        }
        
    } 
    .right-box {
        flex: 1;
        .top-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            border-bottom: 1px solid #f1f1f1;
            .user-name {
                font-size: 18px;
                margin-left: 20px;
            }
            img {
                width: 16px;
                height: 16px;
                margin-right: 20px;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }
        }
        .main-box {
            height: 400px;
            border-bottom: 1px solid #f1f1f1;
        }
        .bottom-box {
            height: 100px;
        }


    }
}

</style>

<style>
.ant-tabs-nav{
    margin: 0 !important;
}
</style>