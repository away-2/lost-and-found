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
                <div contenteditable="true" spellcheck="false" placeholder="发布沸点~">
                    <div class="imageList">
                        <div v-for="(item, index) in list" :key="index" class="imageBox">
                            <img :src="item">
                            <div class="delete" @click="deleteImg(index)">×</div>
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <input type="file" accept="image/*" multiple id="file" @change="upload">
                </div>
            </div>
            <div class="contentWrap">

            </div>
        </div>
        <div class="rightWrap"></div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const value = ref([]);
const list = reactive([])

const upload = (e) => {
    console.log(e.target.files);
    for (let item of e.target.files) {
        let reader = new FileReader()
        reader.readAsDataURL(item)
        reader.addEventListener('load', function () {
            list.push(this.result)
        })
    }
};

const deleteImg = (index) => {
    // console.log(index);
    list.splice(index, 1);
}



onMounted(() => {

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
            height: 200px;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;


            .upload {
                width: 50px;
                height: 20px;
                border-radius: 5px;
                position: relative;
                margin: 15px;
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
            }

            #file {
                width: 100%;
                height: 100%;
                opacity: 0;
            }

            .imageList {
                display: flex;
                width: 100%;

                .imageBox {
                    width: 50px;
                    height: 50px;
                    background-color: rgba(54, 194, 35, 0.1);
                    margin: 20px;
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
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        font-size: 15px;
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
            height: 200px;
            background: #fff;
            border-radius: 5px;

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