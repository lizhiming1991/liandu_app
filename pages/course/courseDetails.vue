<template>
	<view class="cr_details">
		<Header class="cr_head"></Header>
		<view class="cr_video">
			<video id="myVideo" src="../../static/image/video.mp4"  controls></video>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default {
		data(){
			return {
				
			}
		},
		components: {
			Header
		}
	}
	
</script>

<style lang="scss" scoped>
	.cr_details {
		.cr_head{
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
			background-color: rgba(0,0,0,.9);
		}
		.cr_video {
			#myVideo {
				width: 100%;
				height: 470upx;
			}
		}
	}
	
</style>
