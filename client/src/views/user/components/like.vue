<template>
    <div class="container-wrapper">
         <div class="top-wrapper">
             <div class="title">赞</div>
             <div class="type">
                 <div class="concern-user" :class="{active: concernType == 'article'}" @click="handleConcernType('article')">帖子</div>
                 <div class="divider"></div>
                 <div class="fans-user" :class="{active: concernType == 'topic'}" @click="handleConcernType('topic')">沸点</div>
             </div>
         </div>
  <empty-status title="暂无点赞哦~" :isShow="true"/>
      
    </div>
 </template>
 
 <script setup>
 import { ref, onMounted, reactive } from 'vue'
 import { findUserIncreaseFansNotice } from '@/api/notification'
 import { concernSomeone, cancelConcernSomeone } from '@/api/user';
 import { formatPast } from '@/utils/time';
 import { message } from 'ant-design-vue'
 

 const concernType = ref('article')

 // 选中关注方式
 const handleConcernType = (type) => {
     concernType.value = type
 }
 onMounted(() => {
   
 })
 
 </script>
 
 <style lang="less" scoped>
 .container-wrapper {
     background: #fff;
     .top-wrapper{
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 50px;
         padding: 0 20px;
         border-bottom: 1px solid #f1f1f1;
         .title {
             font-size: 18px;
             color: #000;
         }
         .type {
             display: flex;
             align-items: center;
             .concern-user {
                 color: #72777b;
                 font-size: 15px;
                 cursor: pointer;
             }
             .divider {
                 width: 1px;
                 height: 16px;
                 background: #e4e1e1;
                 margin: 0 10px;
             }
             .fans-user {
                 color: #72777b;
                 font-size: 15px;
                 cursor: pointer;
 
             }
             .active {
                 color: #000;
             }
         }
     }
 
 }
 </style>