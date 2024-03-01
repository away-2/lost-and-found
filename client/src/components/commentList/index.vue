<template>
    <div class="comment-container">
        <div class="comment-number">评论 1</div>
        <div class="comment-form">
            <comment-input :inputMinHeight="30" :inputMaxHeight="150" shapeType="comment" />
        </div>
        <div class="comment-list-wrapper">
            <div class="comment-list-header">
                <div class="sort">
                    <div class="item" :class="{ active: isSortActive === 'hot' }" @click="handleSelectedSort('hot')">最热
                    </div>
                    <div class="divider"></div>
                    <div class="item" :class="{ active: isSortActive === 'new' }" @click="handleSelectedSort('new')">最新
                    </div>
                </div>
            </div>
            <div class="comment-list">
                <div class="comment-card">
                    <div class="comment-avatar">
                        <img src="@/assets/images/头像.jpg" alt="">
                    </div>
                    <div class="comment-wrapper">
                        <div class="comment-header">
                            <div class="user-name">星期一</div>
                            <div class="user-school">东华理工大学</div>
                        </div>
                        <div class="comment-content">
                            首先，一线的机会肯定会比小城市的机会多，接触到的人也相对来说比较厉害一点，这样自己的视野也会开阔一点，不过这也要根据自己的能力来看，如果自己本身就啥也不是，那基本上也无缘接触到厉害的人！
                            其次，一线的人情世故不像小城市那么复杂，特别像深圳这样的城市，大家都是从外面来的，所以来了就是深圳人，包容性比较高，这样的话能够减少一些心理压力，而小城市则不然，因为好一点的单位，保安都会和你吹他家那个亲戚是省里的，不然他也谋不了这个职位，往上就更不用说，哈哈！
                            所以小城市的人因为地缘原因，就会产生一定的优越感，所以整体下来说，其实是不那么包容的，不那么开放的，在这样的环境下对自己或多或少有一定的影响，当然，大城市也会有，只是相对于小城市来说会轻很多！
                        </div>
                        <div class="comment-action">
                            <div class="action-time">43分钟前</div>
                            <div class="action-digg">
                                <img src="@/assets/images/点赞.png" alt="">
                                <span>点赞</span>
                            </div>
                            <div class="action-reply">
                                <img src="@/assets/images/评论.png" alt="">
                                <span>评论</span>
                            </div>
                        </div>
                        <div class="comment-reply-wrapper">
                            <div class="reply-list">
                                <div class="reply-card">
                                    <div class="reply-avatar">
                                        <img src="@/assets/images/头像.jpg" alt="">
                                    </div>
                                    <div class="reply-wrapper">
                                        <div class="reply-content">
                                            <div class="content">
                                                <div class="user-info">小明 : </div>
                                                <span>首先，一线的机会肯定会比小城市的机会多，接触到的人也相对来说比较厉害一点，这样自己的视野也会开阔一点，不过这也要根据自己的能力来看，如果自己本身就啥也不是，那基本上也无缘接触到厉害的人！
                                                    其次，一线的人情世故不像小城市那么复杂，特别像深圳这样的城市，大家都是从外面来的，所以来了就是深圳人，包容性比较高，这样的话能够减少一些心理压力，而小城市则不然，因为好一点的单位，保安都会和你吹他家那个亲戚是省里的，不然他也谋不了这个职位，往上就更不用说，哈哈！
                                                    所以小城市的人因为地缘原因，就会产生一定的优越感，所以整体下来说，其实是不那么包容的，不那么开放的，在这样的环境下对自己或多或少有一定的影响，当然，大城市也会有，只是相对于小城市来说会轻很多！
                                                </span>
                                            </div>
                                        </div>
                                        <div class="reply-action">
                                            <div class="action-time">43分钟前</div>
                                            <div class="action-digg">
                                                <img src="@/assets/images/点赞.png" alt="">
                                                <span>点赞</span>
                                            </div>
                                            <div class="action-reply">
                                                <img src="@/assets/images/评论.png" alt="">
                                                <span>评论</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isSortActive = ref('new')

const handleSelectedSort = (type) => {
    isSortActive.value = type
}
</script>

<style lang="less" scoped>
.comment-container {
    border-top: 1px solid #f1f2f5;
    padding: 20px 10px;

    .comment-number {
        margin-bottom: 15px;
        color: #252933;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
    }

    .comment-list-wrapper {
        margin-top: 20px;

        .comment-list-header {
            box-sizing: border-box;

            .sort {
                display: block;

                .item {
                    color: #515767;
                    line-height: 22px;
                    display: inline-block;
                    font-weight: 400;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 3px 10px;
                }

                .divider {
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #e4e6eb;
                    position: relative;
                    top: 2px;
                }

                .active {
                    color: #1e80ff;
                }
            }
        }

        .comment-list {
            margin-top: 4px;
            min-height: 104px;

            .comment-card {
                display: flex;
                min-width: 0;
                box-sizing: border-box;
                font-style: normal;
                position: relative;

                .comment-avatar {
                    width: 32px;
                    margin-right: 12px;
                    position: relative;
                    flex-shrink: 0;
                    flex-grow: 0;

                    img {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                    }
                }

                .comment-wrapper {
                    flex: 1;
                    min-width: 0;

                    .comment-header {
                        display: flex;
                        align-items: center;
                        padding: 1px 0;

                        .user-name {
                            color: #515767;
                            display: inline-block;
                            vertical-align: top;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 24px;

                        }

                        .user-school {
                            font-size: 10px;
                            color: #8a919f;
                            margin-left: 5px;
                        }
                    }

                    .comment-content {
                        margin-top: 4px;
                        font-size: 14px;
                        line-height: 24px;
                        color: #252933;
                        font-weight: 400;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }

                    .comment-action {
                        display: flex;
                        margin-top: 6px;
                        font-size: 12px;
                        line-height: 20px;
                        color: #8a919f;
                        font-weight: 400;

                        .action-time {
                            color: #8a919f;
                            font-size: 12px;
                            line-height: 20px;
                            margin-right: 10px;
                            display: flex;
                            align-items: center;

                        }

                        .action-digg {
                            display: flex;
                            padding: 0 8px;
                            cursor: pointer;
                            align-items: center;
                            transition: all .3s;

                            img {
                                width: 14px;
                                height: 14px;
                                margin-right: 4px;
                            }

                            span {
                                color: #8a919f;
                                font-size: 12px;
                            }
                        }

                        .action-reply {
                            display: flex;
                            padding: 0 8px;
                            cursor: pointer;
                            align-items: center;
                            transition: all .3s;

                            img {
                                width: 14px;
                                height: 14px;
                                margin-right: 4px;
                            }

                            span {
                                color: #8a919f;
                                font-size: 12px;
                            }
                        }
                    }

                    .comment-reply-wrapper {
                        box-sizing: border-box;

                        .reply-list {
                            margin-top: 6px;
                            margin-bottom: -6px;

                            .reply-card {
                                display: flex;
                                min-width: 0;
                                padding: 6px 0;
                                box-sizing: border-box;
                                position: relative;

                                .reply-avatar {
                                    width: 28px;
                                    margin-right: 12px;
                                    position: relative;
                                    flex-shrink: 0;
                                    flex-grow: 0;

                                    img {
                                        width: 28px;
                                        height: 28px;
                                        border-radius: 50%;
                                    }

                                }

                                .reply-wrapper {
                                    flex: 1;
                                    min-width: 0;

                                    .reply-content {

                                        .content {
                                            display: flex;
                                            font-size: 14px;
                                            line-height: 24px;
                                            color: #252933;
                                            font-weight: 400;
                                            line-height: 28px;
                                            display: -webkit-box;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 3;

                                            .user-info {
                                                color: #a9a9a9;
                                                font-size: 14px;
                                                line-height: 24px;
                                                display: inline;
                                                color: #252933;
                                                font-weight: 400;

                                            }

                                            span {
                                                font-weight: 400;
                                                font-size: 14px;
                                                line-height: 24px;
                                                color: #252933;

                                            }
                                        }
                                    }

                                    .reply-action {
                                        display: flex;
                                        margin-top: 6px;
                                        font-size: 12px;
                                        line-height: 20px;
                                        color: #8a919f;
                                        font-weight: 400;

                                        .action-time {
                                            color: #8a919f;
                                            font-size: 12px;
                                            line-height: 20px;
                                            margin-right: 10px;
                                            display: flex;
                                            align-items: center;

                                        }

                                        .action-digg {
                                            display: flex;
                                            padding: 0 8px;
                                            cursor: pointer;
                                            align-items: center;
                                            transition: all .3s;

                                            img {
                                                width: 14px;
                                                height: 14px;
                                                margin-right: 4px;
                                            }

                                            span {
                                                color: #8a919f;
                                                font-size: 12px;
                                            }
                                        }

                                        .action-reply {
                                            display: flex;
                                            padding: 0 8px;
                                            cursor: pointer;
                                            align-items: center;
                                            transition: all .3s;

                                            img {
                                                width: 14px;
                                                height: 14px;
                                                margin-right: 4px;
                                            }

                                            span {
                                                color: #8a919f;
                                                font-size: 12px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>