<template>
    <div class="mainContent">
        <div class="leftWrap">
            <div class="leftItem">
                <img src="" alt="" />
                <span>最新</span>
            </div>
            <div class="leftItem">
                <img src="" alt="" />
                <span>热门</span>
            </div>
            <div class="leftItem">
                <img src="" alt="" />
                <span>关注</span>
            </div>
        </div>
        <div class="centerWrap">
            <div class="inputWrap">
                <comment-input shapeType="publish" :maxFileQuantity="2" @handleSubmit="handlePublishHot" />
            </div>
            <a-skeleton :loading="loading" active>
                <div class="contentWrap" v-for="(item, index) in hotList" :key="index">
                    <div class="hot-header">
                        <a-popover>
                            <template #content>
                                <div class="user-popover-header">
                                    <img :src="item.publish_user.avator" alt="">
                                    <div class="user-info">
                                        <div class="user-name">{{ item.publish_user.nike_name || item.publish_user.real_name
                                        }}
                                        </div>
                                        <div class="user-school">{{ item.publish_user.school_name }}</div>
                                    </div>
                                </div>
                                <div class="user-popover-btn" v-show="isShowBtn">
                                    <div class="concern-btn">关注</div>
                                    <div class="message-btn">私信</div>
                                </div>
                                <div class="user-popover-footer">
                                    <div class="single-count-item">
                                        <div class="count-num">1</div>
                                        <div class="count-text">关注</div>
                                    </div>
                                    <div class="single-count-item">
                                        <div class="count-num">2</div>
                                        <div class="count-text">粉丝</div>
                                    </div>
                                </div>
                            </template>
                            <img class="avatar" :src="item.publish_user.avator" />
                        </a-popover>
                        <div class="userInfo">
                            <div class="username">{{ item.publish_user.nike_name || item.publish_user.real_name }}</div>
                            <div class="timestamp">{{ formatPast(item.createdAt) }}</div>
                        </div>
                    </div>
                    <div class="hot-content">
                        <div class="text">{{ item.content }}</div>
                        <div class="picture"></div>
                    </div>
                    <div class="hot-footer">
                        <div class="share-action">分享</div>
                        <div class="comment-action">
                            <img src="@/assets/images/评论.png" alt="" />
                            <span>评论</span>
                        </div>
                        <div class="like-action">
                            <img src="@/assets/images/点赞.png" alt="" />
                            <span>点赞</span>
                        </div>
                    </div>
                </div>
            </a-skeleton>
        </div>
        <div class="rightWrap">
            <div class="user-info-card">
                <div class="card-header">
                    <img :src="userInfo.avator" alt="">
                    <div class="user-name">{{ userInfo.nike_name || userInfo.real_name }}</div>
                </div>
                <div class="count-item">
                    <div class="single-count-item">
                        <div class="count-num">1</div>
                        <div class="count-text">沸点</div>
                    </div>
                    <div class="single-count-item">
                        <div class="count-num">2</div>
                        <div class="count-text">关注</div>
                    </div>
                    <div class="single-count-item">
                        <div class="count-num">2</div>
                        <div class="count-text">关注者</div>
                    </div>
                </div>
            </div>
            <div class="select-hot-card">
                <div class="card-title">精选沸点</div>
                <a-skeleton :loading="loading" active>
                    <div class="select-hot" v-for="(item, index) in selectHotList" :key="index">
                        <div class="content">{{ item.content }}</div>
                        <div class="count">{{ item.like_number }} 赞 · {{ item.remark_number }} 评论</div>
                    </div>
                </a-skeleton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publishHot, filndAllHotInfo, fileUpload } from '@/api/hot'
import { formatPast } from '@/utils/time'
import { GET_USERINFO } from '@/utils/token'

const list = ref('')
const content = ref('')
const hotList = ref([])
const $router = useRouter()

const pageNum = ref(1)
const pageSize = ref(10)
const audit_state = ref('')
const popoverId = ref('')
const isShowBtn = ref(true)
const selectHotList = ref([])
const loading = ref(false)

let userId = GET_USERINFO().user.id
let userInfo = GET_USERINFO().user

// 发布
const toPublish = async () => {
    let data = { content: content.value, pictures: Object.values(list) }
    console.log(data)
    let id = 1
    const { href } = $router.resolve({
            path: `/hot/${id}`,
        })
        window.open(href, "_blank")
    return
    const res = await publishHot(data)
    if (res.code == 200) {
        console.log(res)
        message.success('发布成功')
       
    }
}

// 发布沸点
const handlePublishHot = (data) => {
    message.success('数据过来了')
    console.log(data);
}

// 获取沸点列表
const getAllHotInfo = async () => {
    let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: 'pass' }
    loading.value = true
    const res = await filndAllHotInfo(data)
    if (res.code == 200) {
        console.log(res.data)
        loading.value = false
        hotList.value = res.data.hotTopicList
        selectHotList.value = res.data.hotTopicList.slice(0, 3)
     
        // popoverId.value = res.data.hotTopicList.filter(item => {
        //     return item.user_id == userId
        // })
        // if (popoverId.value == userId) {
        //     console.log(123);
        //     isShowBtn.value = false
        // } else{
        //     console.log(popoverId.value, userId);
        //     console.log(222);
        //     isShowBtn.value = true
        // }
    }
}

onMounted(() => {
    getAllHotInfo()

})
const activeIcon = reactive({})

</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.mainContent {
    height: calc(100vh - 60px);
    width: 100%;
    padding: 10px 350px 10px 272px;
    display: flex;
    column-gap: 10px;
    background: #f1f1f1;

    .leftWrap {
        height: 200px;
        width: 10%;
        background-color: #fff;
        position: fixed;
        left: 100px;
        padding: 10px;
        border-radius: 5px;
    }

    .centerWrap {
        width: 100%;
        position: relative;

        .inputWrap {
            width: 100%;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            padding: 10px 10px 15px 10px;
        }

        .contentWrap {
            width: 100%;
            background: #fff;
            border-radius: 5px;
            margin: 10px 0;

            .hot-header {
                display: flex;
                column-gap: 10px;
                padding: 10px;

                img {
                    height: 48px;
                    width: 48px;
                    border-radius: 50%;
                }

                .userInfo {
                    .username {
                        font-weight: 500;
                        font-size: 16px;
                        padding: 8px 0;
                        color: #252933;
                    }

                    .timestamp {
                        font-size: 12px;
                        color: #a9a9a9;
                    }
                }


            }

            .hot-content {
                height: 50px;
                padding: 0 0 10px 70px;
                color: #252933;
                font-weight: 300;
            }

            .hot-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #f1f2f5;

                .share-action {
                    width: 33%;
                    padding: 10px;
                    text-align: center;
                    font-size: 13px;
                    color: #a9a9a9;
                }

                .comment-action {
                    width: 33%;
                    padding: 10px;
                    justify-content: center;
                    display: flex;

                    img {
                        width: 14px;
                        height: 14px;
                        margin-right: 5px;
                    }

                    span {
                        font-size: 13px;
                        color: #a9a9a9;
                    }
                }

                .like-action {
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                    width: 33%;

                    img {
                        height: 14px;
                        width: 14px;
                        color: #a9a9a9;
                        margin-right: 5px;
                    }

                    span {
                        font-size: 13px;
                        color: #a9a9a9;
                    }
                }
            }
        }
    }

    .rightWrap {
        height: 500px;
        width: 15%;
        // background: #fff;
        position: fixed;
        right: 100px;
        border-radius: 5px;

        .user-info-card {
            height: 172px;
            background: #fff;
            padding: 24px 20px;
            border-radius: 5px;
            margin-bottom: 10px;

            .card-header {
                display: flex;
                column-gap: 10px;
                align-items: center;
                padding: 10px 0;

                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }

            }

            .count-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 5px 0;
                width: 100%;
                border-top: 1px solid #e4e6eb;

                .single-count-item {
                    padding: 20px 0;

                    .count-num {
                        color: #252933;
                        width: 60px;
                        font-size: 16px;
                        font-weight: 400;
                        text-align: center;
                        padding-bottom: 5px;
                    }

                    .count-text {
                        color: #8A919F;
                        width: 60px;
                        text-align: center;
                        font-size: 13px;
                    }
                }
            }
        }

        .select-hot-card {
            background: #fff;
            height: 250px;
            border-radius: 5px;

            .card-title {
                // font-weight: 600;
                font-size: 16px;
                padding: 20px 10px;
                border-bottom: 1px solid #e4e6eb;
            }

            .select-hot {
                margin-top: 20px;
                padding: 0 10px;

                .content {
                    width: 200px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .count {
                    font-size: 12px;
                    color: #8A919F;
                    padding-top: 5px;

                }
            }
        }

    }
}
</style>

<style lang="less">
.ant-popover-inner-content {
    .user-popover-header {
        display: flex;
        column-gap: 10px;
        padding: 10px 0;

        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }

        .user-info {
            padding-top: 5px;

            .user-name {
                font-weight: 500;
                font-size: 16px;

            }

            .user-school {
                font-size: 12px;
                font-weight: 300;
                color: #a9a9a9;
            }
        }

    }

    .user-popover-btn {
        display: flex;

        padding-bottom: 10px;
        justify-content: space-between;
        .concern-btn {
            width: 110px;
            height: 32px;
            background: #1E80FF;
            color: #fff;
            cursor: pointer;
            border-radius: 3px;
            text-align: center;
            padding: 4px 20px;
        }

        .concern-btn:hover {
            opacity: 0.5;
        }

        .message-btn {
            width: 110px;
            height: 32px;
            background: #1E80FF0D;
            color: #1E80FF;
            cursor: pointer;
            border-radius: 3px;
            text-align: center;
            padding: 4px 20px;
            border: 1px solid rgba(30, 128, 255, 0.3);


        }

        .message-btn:hover {
            opacity: 0.5;
        }
    }

    .user-popover-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        width: 100%;
        border-top: 1px solid #e4e6eb;

        .single-count-item {
            padding: 0 50px;

            .count-num {
                color: #252933;
                width: 30px;
                font-size: 16px;
                font-weight: 600;
                text-align: center;
            }

            .count-text {
                color: #8A919F;
                /* font-size: 12px; */
                width: 30px;
                text-align: center;
            }
        }

    }
}
</style>