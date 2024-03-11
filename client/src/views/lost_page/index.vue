<template>
    <div class="container-wrapper">
        <!-- 发布帖子组件 -->
        <publish />
        <!-- 返回顶部组件 -->
        <back-top />
        <!-- 顶部搜索框 -->
        <div class="top-search-box">
            <input type="text" placeholder="请输入搜索物品关键字~">
            
        </div>
    </div>
</template>

<script setup>
import publish from '@/components/publish/index.vue'

</script>

<style lang="less" scoped>

</style>