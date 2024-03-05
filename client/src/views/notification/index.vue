<template>
    <div class="container-wrapper">
        <div class="content-wrapper">
            <div class="top-box">
                <div class="title-text">消息中心</div>
                <div class="setting-box">
                    <svg t="1709537218407" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1559" width="18" height="18">
                        <path
                            d="M242.176 534.528a57.856 57.856 0 0 1 0-115.2 57.856 57.856 0 0 1 0 115.2z m241.664 0a57.856 57.856 0 1 1 55.808-57.344 56.32 56.32 0 0 1-55.808 57.344z"
                            fill="#72777b" p-id="1560"></path>
                        <path
                            d="M483.84 956.928a8.192 8.192 0 0 1-6.656-3.072S343.552 829.952 311.808 796.16H123.904A126.976 126.976 0 0 1 5.12 665.6V256a118.272 118.272 0 0 1 115.712-120.32h512a26.112 26.112 0 0 1 0 51.2h-512A67.072 67.072 0 0 0 55.296 256v409.6a76.8 76.8 0 0 0 68.608 76.288H307.2a77.824 77.824 0 0 1 42.496 21.504L483.84 887.296l133.632-123.904a65.536 65.536 0 0 1 39.424-21.504H842.24a76.8 76.8 0 0 0 70.656-76.288V444.416a25.088 25.088 0 1 1 51.2 0V665.6a126.976 126.976 0 0 1-118.784 128H655.36c-66.56 62.976-164.352 159.232-164.352 159.232a10.24 10.24 0 0 1-7.168 4.096z"
                            fill="#72777b" p-id="1561"></path>
                        <path
                            d="M726.016 534.528a57.856 57.856 0 1 1 55.296-57.344 56.32 56.32 0 0 1-55.296 57.344z m275.968-288.256A59.392 59.392 0 0 1 1024 165.888l-30.208-51.2a58.88 58.88 0 0 1-29.696 8.192 59.392 59.392 0 0 1-58.88-59.392H844.8a60.928 60.928 0 0 1-7.68 29.696 59.904 59.904 0 0 1-80.896 21.504l-30.208 51.2a57.856 57.856 0 0 1 21.504 21.504 58.88 58.88 0 0 1-21.504 80.384l30.208 51.2a58.88 58.88 0 0 1 29.696-8.192 59.392 59.392 0 0 1 58.88 59.904h60.416a60.416 60.416 0 0 1 7.68-29.184A59.392 59.392 0 0 1 993.28 320l30.72-51.2a62.976 62.976 0 0 1-22.016-21.504zM875.008 279.04a62.464 62.464 0 1 1 62.464-62.464 62.464 62.464 0 0 1-62.464 62.464z"
                            fill="#72777b" p-id="1562"></path>
                    </svg>
                    <div class="setting-text">消息设置</div>
                </div>
            </div>
            <div class="tab-box">
                <a-tabs v-model:activeKey="currentKey" @change="handleChangeTabContent">
                    <a-tab-pane v-for="(item, index) in tabList" :key="item.key" :tab="item.tab">
                        <Comment v-if="item.key == 'comment'" />
                        <Digg v-if="item.key == 'digg'" />
                        <Follow v-if="item.key == 'follow'" />
                        <Message v-if="item.key == 'message'" />
                        <Setting v-if="item.key == 'setting'" />
                        <System v-if="item.key == 'system'" />
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Comment from './components/comment.vue'
import Digg from './components/digg.vue'
import Follow from './components/follow.vue'
import Message from './components/message.vue'
import Setting from './components/setting.vue'
import System from './components/system.vue'

const router = useRouter()
const route = useRoute()

const currentKey = ref('comment')

// tab栏选项卡
const tabList = reactive([
    {
        key: 'comment',
        tab: '评论',
    },
    {
        key: 'digg',
        tab: '赞与收藏',
    },
    {
        key: 'follow',
        tab: '新增粉丝',
    },
    {
        key: 'message',
        tab: '私信',
    },
    {
        key: 'system',
        tab: '系统通知',
    },
    {
        key: 'setting',
        tab: '消息设置',
    },
])

// 切换tab栏显示内容
const handleChangeTabContent = (activeKey) => {
    console.log(activeKey,"tab content")
    currentKey.value = activeKey
    router.push({ name: 'Notification', params: { method: activeKey } })
}

onMounted(() => {
    currentKey.value = route.params.method
})
</script>

<style lang="less" scoped>
.container-wrapper {
    padding: 20px 150px;

    .content-wrapper {
        background: #fff;
        border-radius: 2px;
        padding: 20px;
        padding-bottom: 0;

        .top-box {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;

            .title-text {
                font-size: 18px;
                font-weight: 500;
                color: #222226;
                line-height: 26px;
            }

            .setting-box {
                display: flex;
                align-items: center;
                column-gap: 2px;
                cursor: pointer;

                .setting-text {
                    font-size: 14px;
                }
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
}

.ant-tabs-tab-btn {
    cursor: pointer;
}
</style>
