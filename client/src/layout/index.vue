<template>
    <div class="layout_container">
        <div class="layout_header">
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

</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.layout_container {
    height: 100%;
    position: relative;
    .layout_header{
        position: fixed;
        width: 100%;
        z-index: 250;
        }
    .layout_main{
        background: #f1f1f1;
        padding-top: @base-tabbar-height;
    }
}
</style>