<template>
	<view class="friend_ship" :style="{ height: pageHeight }">
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '敬请期待!',
				pageHeight: '200'
			};
		},
		onLoad() {
			this.getHeight()
		},
		methods: {
			getHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.pageHeight = res.windowHeight + 'px';
					},
				});
			}
		}
	}
</script>

<style lang="scss">
.friend_ship {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	font-size: 60upx;
}
</style>
