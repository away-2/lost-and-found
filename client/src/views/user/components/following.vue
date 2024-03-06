<template>
   <div class="container-wrapper">
        <div class="top-wrapper">
            <div class="title">关注</div>
            <div class="type">
                <div class="concern-user" :class="{active: concernType == 'concern'}" @click="handleConcernType('concern')">关注的用户</div>
                <div class="divider"></div>
                <div class="fans-user" :class="{active: concernType == 'fans'}" @click="handleConcernType('fans')">关注者</div>
            </div>
        </div>
        <div class="digg-list" v-for="(item, index) in fansList" :key="index">
			<div class="digg-item" >
				<div class="left-box">
					<div class="avatar">
						<img :src="item.fanUserInfo.avator" alt="" />
					</div>
					<div class="digg-info">
						<div class="user-info">
							<div class="user-name text-ellipsis">{{ item.fanUserInfo.nick_name || item.fanUserInfo.real_name }}</div>
						</div>
						<div class="main-content">{{ item.fanUserInfo.profile }}</div>
					</div>
				</div>
				<div class="operate-box">
					<div class="concern-btn" :class="{concerned: item.alreadyConcernFan}" @click="handleConcernSomeone(item)">{{item.alreadyConcernFan ? '已关注' : '关注'}}</div>
				</div>
			</div>
		</div>
   </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { findUserIncreaseFansNotice } from '@/api/notification'
import { concernSomeone, cancelConcernSomeone } from '@/api/user';
import { formatPast } from '@/utils/time';
import { message } from 'ant-design-vue'

const fansList = reactive([])
const concernType = ref('concern')

// 获取所有新增粉丝通知
const getAllIncreaseFansNotice = async() => {
	const res = await findUserIncreaseFansNotice() 
	if(res.code == 200){
		fansList.push(...res.data)
	}
}


// 让当前用户关注某个用户/取消关注某个用户
const handleConcernSomeone = async (data) => {
	let params = { passiveUser: data.fanUserInfo.id, concernWay: 'FD' }
	let res = null
	if (data.alreadyConcernFan) {
		// 取消关注用户
		res = await cancelConcernSomeone(data.fanUserInfo.id)
		if (res.code == 200) {
			data.alreadyConcernFan = false
		}
	} else {
		// 关注用户
		res = await concernSomeone(params)
		if (res.code == 200) {
			data.alreadyConcernFan = true
		}
	}
}

// 选中关注方式
const handleConcernType = (type) => {
    concernType.value = type
}
onMounted(() => {
	getAllIncreaseFansNotice()
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
            font-size: 16px;
            font-weight: 600;
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

    .digg-list {
		border-bottom: 1px solid #f1f1f1;
        padding: 15px 20px;
		.digg-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left-box {
				display: flex;
				column-gap: 15px;
				.avatar {
					flex: 0 0 auto;
					img {
						width: 42px;
						height: 42px;
						border-radius: 50%;
						object-fit: cover;
					}
				}
				.digg-info {
					flex: 1;
					.user-info {
						display: flex;
						align-items: center;
						.user-name {
							font-size: 15px;
							max-width: 150px;
						}
					}
					.main-content {
						font-size: 13px;
						color: #8a919f;
                        margin-top: 10px;
					}
				}
			}
			.operate-box {
				height: 20px;
				transform: translateY(-10px);
			}
		}
	}
}
</style>