<template>
    <div class="layout_container">
        <div class="layout_header" :class="{ 'hidden': showScrollTop }">
            <Header />
        </div>
        <div class="layout_main">
            <Main />
        </div>
    </div>
</template>

<script setup>
import Header from './header/index.vue'
import Main from './main/index.vue'
import { ref, onMounted } from 'vue'

const showScrollTop = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollTop
        showScrollTop.value = scrollHeight > 200
    })
})

</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.layout_container {
    height: 100%;
    position: relative;
    .layout_header{
        position: fixed;
        width: 100%;
        transform: translateY(0);
        z-index: 250;
        transition: all 0.5s;
        &.hidden {
            transform: translateY(-70px);
        }
    }
    .layout_main{
        background: #f1f1f1;
        padding-top: @base-tabbar-height;
    }
}
</style>