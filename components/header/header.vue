<template>
	<view class="header">
		<view class="h_back">
			<!-- #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO-->
			<navigator  open-type="navigateBack" :delta="number" class="h_goback">
				<image   class="h_img" src="../../static/images/icon_back.png"></image>
			</navigator>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<image  @tap="goback()" class="h_img" src="../../static/images/icon_back.png"></image>
			<!-- #endif -->
		</view>
		<view class="h_title" @tap="showname()"></view>
		<!-- <view class="h_title" @tap="showname()">标题</view> -->
		<view class="h_more"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		data(){
			return{
				number: 1
			}
		},
		computed: {
			...mapState([
				"userid"
			])
		},
		methods: {
			goback(){
				this.$router.go(-1);
				// Window.history.back();
			},
			showname(){
				console.log(this.userid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		padding: 0 40upx;
		height: 100upx;
		line-height: 100upx;
		display: flex;
		.h_back{
			flex: 1;
			.h_img{
				width: 20upx;
				height: 37upx;
			}
			.h_goback{
				width: 20upx;
				height: 37upx;
			}
		}
		.h_title{
			flex: 1;
			text-align: center;
		}
		.h_more{
			flex: 1;
		}
	}
</style>
