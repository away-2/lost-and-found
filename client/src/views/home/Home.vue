<template>
	<div class="container-wrapper">
		<div class="bottom-image">
			<img src="@/assets/images/bg.gif" alt="" />
		</div>
		<back-top />
		<publish />
		<!-- <DynamicScroller :items="data" :min-item-size="54" class="scroller">
			<template v-slot="{ item }">
				<DynamicScrollerItem :item="item" :size-dependencies="[item.message]">
					<div class="text">{{ item.message }}</div>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller> -->
		<div class="test" v-for="item in data">
			{{ item.message }}
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue'
import publish from '@/components/publish/index.vue'
const data = reactive([])

for(let i = 0; i < 100 ; i++) {
	data.push({ id: i, message: `这是第${i}`})
}

</script>

<style lang="less" scoped>
.container-wrapper {
	padding: 0 50px;
	// height: 1000px;
	.bottom-image {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
	.scroller {
		height: 100%;
	}
	.test {
		background: #fff;
		margin: 10px 0;
		width: 100px;
		height: 50px;
	}
}
</style>
