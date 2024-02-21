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
.layout_container {
    height: 100%;
    .layout_header{
        width: 100%;
        // height: 46px;
        // background: #fff;
        }
    .layout_main{
        background: #f1f1f1;
        height: calc(100vh - 60px);
    }
}
</style>