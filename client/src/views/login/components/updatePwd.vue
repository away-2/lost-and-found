<template>
    <div class="container">
        <div class="backImg">
            <img src="@/assets/images/backHome.png" alt="" @click="backLogin" />
        </div>
        <a-steps :current="current" :items="items"></a-steps>
        <div class="steps-content">
            {{ steps[current].content }}
        </div>
        <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="message.success('Processing complete!')">
                Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const $router = useRouter()
const current = ref(0);
const next = () => {
    current.value++;
};
const prev = () => {
    current.value--;
};
const steps = [
    {
        title: 'First',
        content: 'First-content',
        description: 'First-description'
    },
    {
        title: 'Second',
        content: 'Second-content',
        description: 'Second-description'
    },
    {
        title: 'Last',
        content: 'Last-content',
        description: 'Last-description'
    },
];
const items = steps.map(item => ({
    key: item.title,
    title: item.title,
    description: item.description
}));

const backLogin = () => {
   
}
</script>
<style lang="less">
.container {
    width: 100vw;
    height: 100vh;
    background: #F4F9FF;

    .backImg {
        width: 100%;
        height: 35px;
        background: rgb(255, 255, 255);
        opacity: 0.7;
        display: flex;
        align-items: center;
        padding-left: 5px;

        img {
            height: 30px;
            cursor: pointer;
        }
    }
}
</style>
<style scoped>
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

.steps-action {
    margin-top: 24px;
}

[data-theme='dark'] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
}
</style>