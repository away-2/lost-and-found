<template>
    <div>
        这是登录
    </div>
    <el-button type="primary" @click="clickBtn">Primary</el-button>

</template>

<script setup>
import axios from '@/api';
const clickBtn = async() => {
  const res = await axios.get('/user/userInfo');
  console.log(res);
}
</script>

<style lang="less" scoped>

</style>