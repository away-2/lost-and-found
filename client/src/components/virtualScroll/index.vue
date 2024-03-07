<template>
    <div class="virtual-scroll" ref="scrollContainer" @scroll="handleScroll">
      <div :style="{ height: totalHeight + 'px' }"></div>
      <div v-for="(item, index) in visibleItems" :key="index" :style="{ transform: 'translateY(' + item.top + 'px)', height: item.height + 'px' }">
        {{ item.content }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, defineProps } from 'vue';
  
  const props = defineProps({
    items: Array,
    itemHeight: Number,
    visibleHeight: Number
  });
  
  const scrollContainer = ref(null);
  const state = reactive({
    scrollTop: 0,
    totalHeight: 0,
    visibleItems: []
  });
  
  onMounted(() => {
    state.totalHeight = props.items.length * props.itemHeight;
    calculateVisibleItems();
  });
  
  const calculateVisibleItems = () => {
    const startIndex = Math.floor(state.scrollTop / props.itemHeight);
    const endIndex = Math.min(startIndex + Math.ceil(props.visibleHeight / props.itemHeight) + 1, props.items.length);
    state.visibleItems = props.items.slice(startIndex, endIndex).map((content, index) => ({
      content,
      top: (startIndex + index) * props.itemHeight,
      height: props.itemHeight
    }));
  };
  
  const handleScroll = () => {
    state.scrollTop = scrollContainer.value.scrollTop;
    calculateVisibleItems();
  };
  </script>
  
  <style>
  .virtual-scroll {
    overflow-y: auto;
    position: relative;
  }
  
  .virtual-scroll > div {
    position: absolute;
    width: 100%;
  }
  </style>
  