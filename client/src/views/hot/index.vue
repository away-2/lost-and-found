<template>
    <div class="mainContent">
        <div class="leftWrap">
            <div class="leftItem">
                <img src="" alt="">
                <span>最新</span>
            </div>
            <div class="leftItem">
                <img src="" alt="">
                <span>热门</span>
            </div>
            <div class="leftItem">
                <img src="" alt="">
                <span>关注</span>
            </div>
        </div>
        <div class="centerWrap">
            <div class="inputWrap">
                <div contenteditable="true" spellcheck="false" placeholder="发布～" class="textarea" id="editor"
                    @input="getVal">
                    <div class="imageList">
                        <div v-for="(item, index) in list" :key="index" class="imageBox">
                            <img :src="item">
                            <img src="@/assets/images/关闭.png" class="delete" @click="deleteImg(index)" />
                        </div>
                    </div>
                </div>
                <div class="buttomWrap">
                    <div class="upload">
                        <input type="file" accept="image/*" multiple id="file" @change="upload">
                    </div>
                    <div class="publishBtn" @click="toPublish">发布</div>
                </div>
            </div>
            <div class="contentWrap" v-for="(item, index) in hotList" :key="index">
                <div class="hot-header">
                    <img class="avatar" :src="item.publish_user.avator" />
                    <div class="userInfo">
                        <div class="username">{{ item.publish_user.nike_name ||  item.publish_user.real_name}}</div>
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
                        <img src="@/assets/images/评论.png" alt="">
                        <span>评论</span>
                    </div>
                    <div class="like-action">
                        <img src="@/assets/images/点赞.png" alt="">
                        <span>点赞</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightWrap"></div>
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { publishHot, filndAllHotInfo } from '@/api/hot';
import { formatPast } from '@/utils/time';

const list = reactive([])
const content = ref("")
const hotList = ref([])

const pageNum = ref(1)
const pageSize = ref(10)
const audit_state = ref("")

// 获取div中输入的值
const getVal = () => {
    content.value = document.getElementById("editor").innerText;
}
// 图片上传
const upload = (e) => {
    console.log(e.target.files);
    let file = []
    if (list.length > 9) {
        message.warning("最多只能上传9张图片")
        return
    }
    if (Object.values(e.target.files).length > 9) {
        message.warning("最多只能上传9张图片")
        file = Object.values(e.target.files).slice(0, 9)
    } else {
        file = e.target.files
    }
    for (let item of file) {
        let reader = new FileReader()
        reader.readAsDataURL(item)
        reader.addEventListener('load', function () {
            list.push(this.result)
        })
    }
};
// 删除图片
const deleteImg = (index) => {
    list.splice(index, 1);
}

// 发布
const toPublish = async () => {
    let data = { content: content.value, pictures: Object.values(list) }
    console.log(data);
    // return
    const res = await publishHot(data)
    if (res.code == 200) {
        console.log(res);
        message.success("发布成功")
    }
}

// 获取沸点列表
const getAllHotInfo = async() => {
    let data = { pageNum: pageNum.value, pageSize: pageSize.value, audit_state: "pass"}
    const res = await filndAllHotInfo(data)
    if(res.code == 200) {
        console.log(res.data);
        hotList.value = res.data.hotTopicList;
    }
}




onMounted(() => {
    getAllHotInfo()
})
const activeIcon = reactive({

})

const $router = useRouter()
// const publish = (id) => {
//     $router.push({ path: '/hotInfo', query: { id: id } })
//     const location = window.location.href
//     window.open(location)
// }

</script>

<style lang="less" scoped>
@import "@/assets/style/custom.less";

.mainContent {
    height: calc(100vh - 60px);
    width: 100%;
    padding: 10px 350px;
    display: flex;
    column-gap: 10px;
    background: #f1f1f1;

    .leftWrap {
        height: 500px;
        width: 15%;
        background-color: #fff;
        position: fixed;
        left: 100px;
        padding: 10px;
        border-radius: 5px;

    }

    .centerWrap {
        // height: 5000px;
        width: 100%;
        position: relative;

        .inputWrap {
            width: 100%;
            // height: 200px;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            padding: 10px 10px 0 10px;

            .textarea {
                width: 100%;
                height: 100px;
                outline: none;
                border: 1px solid transparent;
                border-radius: 5px;
                padding: 10px;
                overflow-y: scroll;
                background: #f2f3f5;
            }

            .textarea:focus {
                border-color: #1e80ff;
                background: #fff;
                box-shadow: 0 0 0 0.2rem rgba(232, 241, 253, 0.25);
            }

            .textarea::-webkit-scrollbar {
                width: 0;
            }

            .textarea:empty::before {
                content: attr(placeholder);
                color: #A9A9A9;
            }

            .textarea:focus::before {
                content: none;
            }

            .buttomWrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                .upload {
                    width: 50px;
                    height: 20px;
                    border-radius: 5px;
                    position: relative;
                    margin-top: 15px;
                    cursor: pointer;

                }

                .publishBtn {
                    // background: #A9A9A9;
                    background: #1e80ff;
                    color: #fff;
                    width: 80px;
                    height: 30px;
                    margin-top: 15px;
                    border-radius: 3px;
                    text-align: center;
                    padding-top: 6px;
                    cursor: pointer;

                    // &.active {
                    //     background: #1e80ff;

                    // }
                }

                .upload:hover {
                    background-color: rgb(250, 250, 250);
                }

                .upload::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    content: '图片';
                    font-size: 14px;
                    text-align: right;
                    line-height: 20px;
                    user-select: none;
                    background: url('@/assets/images/图片.png') no-repeat left center;
                    background-size: 20px 20px;
                    cursor: pointer;
                }

                #file {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }



            }


            .imageList {
                display: flex;
                width: 100%;
                flex-wrap: wrap;

                .imageBox {
                    width: 50px;
                    height: 50px;
                    background-color: rgba(54, 194, 35, 0.1);
                    margin: 20px 20px 20px 0;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .delete {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 18px;
                        height: 18px;
                        text-align: center;
                        background-color: rgba(255, 255, 255, 0.5);
                        user-select: none;
                        cursor: pointer;
                    }

                    .delete:hover {
                        background-color: rgba(31, 31, 31, 0.5);
                        color: white;
                    }

                    .imageBox:hover .delete {
                        opacity: 1;
                    }


                }
            }

        }

        .contentWrap {
            width: 100%;
            // height: 200px;
            background: #fff;
            border-radius: 5px;
            margin: 10px 0;
            .hot-header {
                display: flex;
                column-gap: 10px;
                padding: 10px;
                img{
                    height: 48px;
                    width: 48px;
                    border-radius: 50%;

                }
                .userInfo {
                    .username{
                        font-weight: 400;
                        padding: 8px 0;
                    }
                    .timestamp {
                        font-size: 12px;
                        color: #A9A9A9;
                    }
                }
            }
            .hot-content{
                height: 50px;
                padding: 0 0 10px 70px;
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
                    color: #A9A9A9;              
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
                        color: #A9A9A9;
                    }
                }
                .like-action {
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                    width: 33%;
                    img  {
                        height: 14px;
                        width: 14px;
                        color: #A9A9A9;
                        margin-right: 5px;

                    }
                    span {
                        font-size: 13px;
                        color: #A9A9A9;
                    }
                }
            }

        }
    }

    .rightWrap {
        height: 500px;
        width: 15%;
        background: #fff;
        position: fixed;
        right: 100px;
        border-radius: 5px;
    }

}
</style>