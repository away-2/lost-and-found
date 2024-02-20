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
        <div class="centerWrap"></div>
        <div class="rightWrap"></div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

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
.mainContent{
    height: calc(100vh - 60px);
    width: 100%;
    padding: 10px 100px;
    display: flex;
    column-gap: 10px;
    .leftWrap {
        height: 500px;
        width: 15%;
        background-color: red;
    }
    .centerWrap {
        height: 500px;
        width: 70%;
        background: blue;
    }
    .rightWrap {
        height: 500px;
        width: 15%;
        background: green;
    }
    
}</style>