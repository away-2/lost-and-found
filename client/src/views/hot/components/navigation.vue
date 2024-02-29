<template>
	<div class="leftWrap">
		<div class="left-item" :class="{ selected: isSelected === 'new' }" @click="handleClickSort('new')">
			<svg t="1708934022437" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1281" width="16" height="16">
				<path
					d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM671.199059 575.903242 480.263397 575.903242c-17.717453 0-32.166639-14.449185-32.166639-32.166639L448.096758 289.15572c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 222.930287 159.285066 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S688.916513 575.903242 671.199059 575.903242z"
					fill="#8a919f"
					p-id="1282"
				></path>
			</svg>
			<span>最新</span>
		</div>
		<div class="left-item" :class="{ selected: isSelected === 'hot' }" @click="handleClickSort('hot')">
			<svg t="1708934661156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1526" width="16" height="16">
				<path
					d="M419.84137 79.938701c-36.150623 95.722776-94.195285 181.771442-169.04235 251.52687C56.807649 531.566907 30.8403 853.867531 329.21023 1012.217443c19.857384 11.710765 45.824733 7.128292 60.081317-11.201602a295.620446 295.620446 0 0 0 66.191282-233.196976c-2.036655-28.513167 10.692438-35.641459 35.641459-16.293239a293.583791 293.583791 0 0 1 117.107652 229.632831c0 31.058986 12.219929 47.352224 41.24226 41.751424 189.918061-36.659787 422.09671-309.571532 172.097332-708.755876-14.765747-20.366548-37.16895-20.366548-36.659787 7.637456 0.509164 34.113968-3.564146 68.7371-11.710765 101.83274-5.600801 22.912367-27.49484 22.912367-32.586477 0a582.992441 582.992441 0 0 0-259.673489-353.868774c-38.187278-25.967349-52.443861-18.329893-61.099644 10.183274z"
					fill="#8a919f"
					p-id="1527"
				></path>
			</svg>
			<span>热门</span>
		</div>
		<div class="left-item" :class="{ selected: isSelected === 'concern' }" @click="handleClickSort('concern')">
			<svg t="1708936396459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5014" width="16" height="16">
				<path
					d="M536.832 48.1792L713.728 282.4192l277.43232 95.85152a30.71488 30.71488 0 0 1 15.14496 46.62784l-168.09984 240.6144-5.43232 293.47328a30.70976 30.70976 0 0 1-39.66464 28.81536l-280.79104-85.51424-280.7808 85.51424a30.72 30.72 0 0 1-39.66464-28.81536l-5.43744-293.47328L18.33472 424.89344a30.69952 30.69952 0 0 1-4.02944-27.0848A30.69952 30.69952 0 0 1 33.4848 378.2656L310.912 282.4192 487.808 48.1792a30.73024 30.73024 0 0 1 49.024 0zM405.48864 573.50656L474.5216 660.4288a30.73024 30.73024 0 0 0 44.44672 3.87584l145.7408-129.32608a30.73536 30.73536 0 0 0 2.59072-43.3664 30.74048 30.74048 0 0 0-43.37664-2.5856l-121.46176 107.78624-48.85504-61.52192a30.74048 30.74048 0 0 0-43.16672-4.95104 30.73024 30.73024 0 0 0-4.95104 43.1616z"
					fill="#808080"
					p-id="5015"
				></path>
			</svg>
			<span>关注</span>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const isSelected = ref('new')
// 此时浏览器视窗高度-头部导航栏高度-padding高度
const navigationHeight = ref(`${window.innerHeight - 90}px`)

const handleClickSort = (type) => {
	isSelected.value = type
}
</script>

<style lang="less" scoped>
.leftWrap {
	width: 180px;
	height: v-bind(navigationHeight);
	background-color: #fff;
	border-radius: 4px;
	position: fixed;
	left: 100px;
	// top: 70px;
	transition: all 0.3s linear;
	padding: 8px;

	.left-item {
		display: flex;
		align-items: center;
		cursor: pointer;
		border-radius: 4px;
		padding: 10px 0 10px 10px;
		column-gap: 15px;
		margin-bottom: 3px;

		&:hover {
			background: #f7f8fa;

			.icon {
				path {
					fill: #1e80ff;
				}
			}

			span {
				color: #1e80ff;
			}
		}

		&.selected {
			background: #eaf2ff;

			.icon {
				path {
					fill: #1e80ff;
				}
			}

			span {
				color: #1e80ff;
			}
		}
	}
}
</style>
