<template>
	<view class="submit" style="flex-direction: column; flex: 1;">
		<Header></Header>
		<view class="success_img">
			<view><image class="success_icon" src="/static/images/chenggong.png" mode=""></image></view>
		</view>
		<view class="success_text">
			<view>会员申请已提交,请耐心等待企业审核</view>
		</view>
		<view class="success_button_content">
			<view class="success_button" @tap="close">关闭</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	export default {
		data() {
			return {
	
			};
		},
		onLoad() {
	
		},
		methods: {
			close() {
				uni.reLaunch({
					url: '../index/enterprise/enterprise'
				});
			}
		},
		components: {
			Header
		}
	}
</script>

<style scoped>
	view {
		font-size: 16px;
		display: flex;
		flex-direction: row;
	}
	.submit .success_img, .submit .success_text,.submit .success_button_content{
		justify-content: center;
	}
	.submit .success_img{
		margin-top: 129upx;
	}
	.submit .success_text{
		margin-top: 40upx;
	}
	.success_button_content{
		margin-top: 109upx;
	}
	.submit .success_icon{
		width: 56upx;
		height: 56upx;
	}
	.submit .success_button{
		justify-content: center;
		align-items: center;
		width: 600upx;
		height: 80upx;
		color: #fff;
		font-size:28upx;
		background: #01b18d;
	}
</style>