<template>
	<div class="container-wrap">
        <div class="digg-list">
            <div class="digg-item">
                <div class="left-box">
                    <div class="avatar">
                        <img src="@/assets/images/头像.jpg" alt="">
                    </div>
                    <div class="digg-info">
                        <div class="user-info">
                            <div class="user-name text-ellipsis">打烊啥叫发哈啊发发客房号合法卡拉的设计符合甲方</div>   
                        </div>
                        <div class="timestamp">1天前</div>
                    </div>
                </div>
                <div class="image-box">
                    <img src="@/assets/images/bg.jpg" alt="">
                </div>
            </div>
        </div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const type = ref(1)
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';
.container-wrap {
    padding: 10px 20px;
    .digg-list {
        border-bottom: 1px solid #f1f1f1;
        .digg-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;

            .left-box {
                display: flex;
                column-gap: 15px;
                .avatar {
                    flex: 0 0 auto;
                    img {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .digg-info {
                    flex: 1;
                    .user-info {
                        display: flex;
                        align-items: center;
                        .user-name {
                            font-size: 14px;
                            max-width: 150px;
                        }
                       
                    }
               
                    .timestamp {
                        font-size: 12xp;
                        color: #8a919f;
                        margin-top: 10px;
                    }

                }
            }
            .image-box {
                img{
                    width: 80px;
                    height: 80px;
                    border-radius: 2px;
                    object-fit: cover;
                }
            }
        }
    }

}
</style>
