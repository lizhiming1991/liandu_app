<template>
	<view class="h_header">
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

		<view class="h_title" @tap="showname()">{{titles}}</view>
		<view class="h_more"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				number:1
			}
		},
		onLoad(){
			console.log(111)
		},
		onShow(){
			console.log(222)
		},
		onReady(){
			console.log(333)
		},
		onHide(){
			console.log(444)
		},
		onUnload(){
			console.log(555)
		},
		onPullDownRefresh(){
			console.log(666)
		},
		onReachBottom(){
			console.log(777)
		},
		onTabItemTap(){
			console.log(888)
		},
		onShareAppMessage(){
			console.log(999)
		},
		onPageScroll(){
			console.log(10)
		},
		onNavigationBarButtonTap(){
			console.log(11)
		},
		onBackPress(){
			console.log(12)
		},
		onNavigationBarSearchInputChanged(){
			console.log(13)
		},
		onNavigationBarSearchInputConfirmed(){
			console.log(14)
		},
		onNavigationBarSearchInputClicked(){
			console.log(15)
		},
		methods: {
			goback(){
				this.$router.go(-1);
			},
			showname(){
				alert(this.titles)
			}
		},
		props:{
			"titles":{
				default: "今日链读"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.h_header{
		background-color: #fff;
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
