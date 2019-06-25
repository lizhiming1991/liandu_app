<template>
	<view class="describe_content">
		<view class="h_header">
			<view class="h_back">
				<!-- #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO-->
				<navigator open-type="navigateBack" :delta="number" class="h_goback">
					<image class="h_img" src="../../static/images/icon_back.png"></image>
				</navigator>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<image @tap="goback()" class="h_img" src="../../static/images/icon_back.png"></image>
				<!-- #endif -->
			</view>

			<view class="h_title">描述修改</view>
			<view class="h_more"><text class="save_button">保存</text></view>
		</view>
		<view class="fg_box"></view>
		<view class="describe_bg">
			<view class="please_describe">
					<textarea class="describe_input" name="" id="" value="" style="" placeholder="请输入个人描述"></textarea>
			</view>
		</view>
		<view class="page_bg" :style="{height:pageHeight}">
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				number: 1,
				pageHeight:'',
				clientHeight:'',
			}
		},
		onLoad() {
			this.getHeight()
		},
		onShow() {

		},

		methods: {
			goback() {
				this.$router.go(-1);
			},
			pleaseDescribe() {
				
			},
			getHeight() {
				
				 // console.log(this.clientHeight)
		uni.getSystemInfo({
		success: (res)=> {
		this.clientHeight =res.windowHeight;
		this.pageHeight = res.windowHeight - '258' +'px';
		// this.describeBg.height = res.windowHeight - "58" +'px';
    },
});
console.log(this.clientHeight)
			}
		},
		props: {
			"titles": {
				default: "今日链读"
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.describe_content{
		overflow-x: hidden; 
	.h_header {
		margin-bottom: 16upx;
		width: 100%;
		background-color: #fff;
		padding: 0 50upx;
		height: 100upx;
		line-height: 100upx;
		display: flex;
		box-sizing: border-box;

		.h_back {
			flex: 1;
			.h_img {
				width: 20upx;
				height: 37upx;
			}
			.h_goback {
				width: 50upx;
				height: 37upx;
			}
		}

		.h_title {
			flex: 1;
			font-size: 34upx;
			text-align: center;
		}

		.h_more {
			flex: 1;
			color: #FF546C;
			font-size: 30upx;
			text-align:right;
			
		}
		.save_button{
			display: inline-block;
			width: 80upx;
		}
	}
	.segmentation_block{
		width: 100%;
		height: 16upx;
	}
	.fg_box{
		height: 16upx;
		background: #eee;
	}
	.describe_bg {
		.please_describe{
			width: 100%;
			background: #fff;
			.describe_input{
				padding: 80upx 24upx 0 24upx; 
				width: 100%;
			}
		}
		
		
	}
	.page_bg{
		background: #eee;
	}
	}
</style>
