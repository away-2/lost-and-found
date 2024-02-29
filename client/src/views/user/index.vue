<template>
    <div class="user-container">
        <div class="nav-main-wrapper">
            
            <div class="avatar">
                <img src="@/assets/images/bg.jpg" alt="">
            </div>
            <div class="user-info">
                <div class="user-name">打烊</div>
                <div class="user-action">
                    <div class="user-acyion-item">
                        <div class="user-bar"></div>
                        <div class="user-fans-num">1</div>
                        <div class="user-fans">粉丝</div>
                    </div>
                    <div class="user-acyion-item">
                        <div class="user-bar"></div>
                        <div class="user-fans-num">2</div>
                        <div class="user-fans">关注</div>
                    </div>
                    <div class="user-acyion-item">
                        <div class="user-bar"></div>
                        <div class="user-fans-num">3</div>
                        <div class="user-fans">沸点</div>
                    </div>
                </div>
                <div class="school-name">东华理工大学</div>
                <div class="setting-btn">设置</div>
            </div>
        </div>
        <div class="main-wrapper">
            <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="changeRouter" @select="selectedKeys" />

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GET_USERINFO } from '@/utils/token';
import { useRouter } from 'vue-router';

const userInfo = GET_USERINFO().user

// 此时浏览器视窗高度-头部导航栏高度-padding高度
// const navigationHeight = ref(`${window.innerHeight - 70}px`)

const items = ref([
	{
		key: '/home',
		label: '最近',
		title: '最近',
	},
	{
		key: '/lost',
		label: '失物帖子',
		title: '失物帖子',
	},
	{
		key: '/found',
		label: '招领帖子',
		title: '招领帖子',
	},
	{
		key: '/publish',
		label: '沸点',
		title: '沸点',
	},
	{
		key: '/hot',
		label: '关注',
		title: '关注',
	},
    {
		key: '/collect',
		label: '收藏',
		title: '收藏',
	},
    {
		key: '/like',
		label: '点赞',
		title: '点赞',
	},
])

let $router = useRouter()


const selectedKeys = ({ selectedKeys }) => {
	
}

// 菜单栏路由跳转
const changeRouter = (current) => {
	// $router.push(current.key)
}
onMounted(() => {

})
</script>

<style lang="less" scoped>
.user-container {
    padding: 10px 100px;
    // width: 100%;

    .nav-main-wrapper {
        width: 100%;
        height: 200px;
        background: #fff;
        border-radius: 4px;
        margin: 10px 0;
        .avatar {
            img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
            }
        }


    }

    .main-wrapper {
        width: 100%;
        height: 100px;
        background: #fff;

    }
}
</style>