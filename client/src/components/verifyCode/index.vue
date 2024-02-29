<template>
    <div class="s-canvas">
        <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" @click="refreshIdentifyCode"></canvas>
    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';

const identifyCode = ref(''); // 图形验证码
const identifyCodes = "1234567890"; // 生成验证码的字符集
const isVerifyNum = ref(''); // 存储输入值

// 生成指定范围的随机整数
const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
// 生成随机颜色
const randomColor = (min, max) => {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return `rgb(${r},${g},${b})`;
};

// 绘制图形验证码
const drawPic = () => {
    const canvas = document.getElementById('s-canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = randomColor(255, 255); // 随机背景色
    ctx.fillRect(0, 0, contentWidth.value, contentHeight.value); // 填充背景色
    for (let i = 0; i < identifyCode.value.length; i++) {
        drawText(ctx, identifyCode.value[i], i); // 绘制文字
    }
    drawDot(ctx); // 绘制干扰点
};

// 绘制文字
const drawText = (ctx, txt, i) => {
    ctx.fillStyle = randomColor(0, 160); // 随机文字颜色
    ctx.font = `${randomNum(25, 30)}px SimHei`; // 随机字体大小
    const x = (i + 1) * (contentWidth.value / (identifyCode.value.length + 1)); // 计算横坐标
    const y = randomNum(30, contentHeight.value - 5); // 随机纵坐标
    const deg = randomNum(-45, 45); // 随机旋转角度
    ctx.translate(x, y); // 修改坐标原点
    ctx.rotate(deg * Math.PI / 180); // 旋转文字
    ctx.fillText(txt, 0, 0); // 绘制文字
    ctx.rotate(-deg * Math.PI / 180); // 恢复旋转角度
    ctx.translate(-x, -y); // 恢复坐标原点
};

// 绘制干扰点
const drawDot = (ctx) => {
    for (let i = 0; i < 80; i++) {
        ctx.fillStyle = randomColor(0, 255); // 随机干扰点颜色
        ctx.beginPath();
        ctx.arc(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value), 1, 0, 2 * Math.PI);
        ctx.fill();
    }
};

// 刷新验证码
const refreshIdentifyCode = () => {
    identifyCode.value = ''; // 清空验证码
    makeIdentifyCode(4); // 生成新验证码
};

// 生成指定长度的随机验证码
const makeIdentifyCode = (l) => {
    let code = '';
    for (let i = 0; i < l; i++) {
        code += identifyCodes[randomNum(0, identifyCodes.length)];
    }
    identifyCode.value = code; // 更新验证码
    isVerifyNum.value = code; // 更新存储输入值
};

const contentWidth = ref(112); // 画布宽度
const contentHeight = ref(31); // 画布高度

// 当组件挂载时执行初始化逻辑
onMounted(() => {
    const canvas = document.getElementById('s-canvas');
    const ctx = canvas.getContext('2d');
    drawPic(); // 绘制图形验证码
});

// 监听 identifyCode 的变化，当其变化时重新绘制图形验证码
watch(identifyCode, () => {
    const canvas = document.getElementById('s-canvas');
    const ctx = canvas.getContext('2d');
    drawPic(); // 绘制图形验证码
});

</script>
    
<style scoped>
.s-canvas {
    height: 38px;
}

.s-canvas canvas {
    margin-top: 1px;
    margin-left: 8px;
}
</style>
   