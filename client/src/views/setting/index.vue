<template>
    <div class="setting-container">
        <div class="top-wrapper">
            <div class="navigation" @click="backUserCenter">
                <img src="@/assets/images/返回.png" alt="">
                <span>返回个人主页</span>
            </div>
        </div>
        <div class="main-wrapper">
            <div class="sider-bar-wrap">
                <div class="sider-bar-text" v-for="(item, index) in navigationList" :key="index"
                    :class="{ selected: isSelected == item.path }" @click="handleClickSiderbar(item.path)">
                    <span>{{ item.title }}</span>
                </div>
            </div>
            <div class="main-content-wrap">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const navigationList = reactive([{title: '用户信息', path: 'Prefile'}, {title: '账号设置', path: 'Account'}])
const isSelected = ref(route.name)

watch(()=> route.path,()=> {
	isSelected.value = route.name
})
// 返回上一级
const backUserCenter = () => {
    window.history.back()
}

const handleClickSiderbar = (name) => {
    // isSelected.value = name
    router.push({name})
}
</script>

<style lang="less" scoped>
@import "@/assets/style/custom.less";

.setting-container {
    padding: 20px 150px;

    .top-wrapper {
        background: #fff;
        width: 100%;
        height: 50px;

        .navigation {
            display: flex;
            column-gap: 5px;
            align-items: center;
            line-height: 50px;
            margin-left: 20px;
            cursor: pointer;

            img {
                width: 14px;
                height: 14px;
            }

            span {
                font-size: 14px;
                color: @base-blue-color;

            }
        }
    }

    .main-wrapper {
        margin: 20px 0;
        display: flex;
        column-gap: 20px;

        .sider-bar-wrap {
            background: #fff;
            width: 20%;
            height: 500px;
            border-radius: 4px;
            padding: 8px;

            .sider-bar-text {
                height: 40px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                // margin-bottom: 5px;

                span {
                    line-height: 40px;

                }

                &:hover {
                    background: #eaf2ff;
                    color: @base-blue-color;

                }
            }

            .selected {
                background: #eaf2ff;
                color: @base-blue-color;
            }

        }

        .main-content-wrap {
            background: #fff;
            width: 80%;
            height: 100px;
            border-radius: 4px;

        }
    }
}</style>