<template>
	<div class="container-wrapper">
		<div class="bottom-image">
			<img src="@/assets/images/bg.gif" alt="" />
		</div>
		<back-top />
		<DynamicScroller :items="data" :min-item-size="54" class="scroller">
			<template v-slot="{ item }">
				<DynamicScrollerItem :item="item" :size-dependencies="[item.message]">
					<div class="text">{{ item.message }}</div>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</div>
</template>

<script setup>
import { reactive } from 'vue'
const data = reactive([])

for(let i = 0; i < 100 ; i++) {
	data.push({ id: i, message: `这是第${i}`})
}
</script>

<style lang="less" scoped>
.container-wrapper {
	padding: 0 50px;
	height: 1000px;
	.bottom-image {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
	.scroller {
		height: 100%;
	}
}
</style>
