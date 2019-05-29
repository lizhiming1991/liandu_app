<template>
	<view class="contents">
		<view class="c_box">
			<view class="c_father">
				<input type="text" disabled placeholder="发表评论..." class="c_input" @tap="showComment">
			</view>
			<view class="c_icons"><image class="c_pic" src="../../static/images/icon_mdz.png"></image> 328</view>
			<view class="c_icons"><image class="c_pic" src="../../static/images/icon_mfx.png"></image> 328</view>
			<view class="c_icons"><image class="c_pic" src="../../static/images/icon_msc.png"></image> 328</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			showComment(){
				this.$emit("showComment",{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contents{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 300upx;
		height: 95upx;
		background-color: #fff;
		width: 100%;
		line-height: 95upx;
		z-index: 99;
		box-shadow: 0px -10upx 18upx 2upx rgba(136,136,136,0.2);
		-webkit-box-shadow: 0px -10upx 18upx 2upx rgba(136,136,136,0.2);
		-moz-box-shadow: 0px -10upx 18upx 2upx rgba(136,136,136,0.2);
		-ms-box-shadow: 0px -10upx 18upx 2upx rgba(136,136,136,0.2);
		.c_box{
			display: flex;
		}
		.c_father{
			flex: 5;
		}
		.c_input{
			width: 258upx;
			height: 70upx;
			background-color: #F5F6FA;
			margin:  12upx auto;
			border-radius: 35upx;
			box-sizing: border-box;
			padding-left: 30upx;
			font-size: 26upx;
		}
		.c_icons{
			flex: 2;
		}
		.c_pic{
			width: 42upx;
			height: 40upx;
			vertical-align: middle;
			margin: 0 8upx 0 20upx;
			font-size: 26upx;
			color: #666;
		}
	}
</style>
