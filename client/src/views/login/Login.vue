<template>
    <div>
        这是登录
    </div>
    <el-button type="primary" @click="clickBtn">Primary</el-button>

</template>

<script setup>
import { register } from '@/api/user'

const clickBtn = async() => {
  const res = await register()
  console.log(res);
}
</script>

<style lang="less" scoped>

</style>