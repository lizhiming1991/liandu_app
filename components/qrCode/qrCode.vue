<template>
	<view class="qr_pay" v-show="isshow">
		<view class="goBack">
			<image  @tap="goFinish2" class="h_img" src="../../static/images/icon_back.png"></image>
		</view>
		<view class="qr_type">
			<image class="qr_logo" src="../../static/images/WePayLogo.png"></image>
			<text class="qr_monkey">应付金额：¥{{values}}</text>
		</view>
		
		<view class="er_code">
			<tkiQrcode class="er_codes" ref="qqcode"
			:val="price"
			@result="qrUrl"
			:size="520"
			></tkiQrcode>
		</view>
		
		<view class="qr_tip">
			<image class="qr_timg" src="../../static/images/show.png"></image>
		</view>
		<view class="qr_finish">
			<text class="qr_wancheng" @tap="goFinish">去微信支付</text>
		</view>
	</view>
</template>
<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				values: "weixin://wxpay/bizpayurl?pr=T5zUe3a",
				codeUrl: "",
				strinfo: "",
			}
		},
		watch:{
			values(){
				return this.values
			},
		},
		computed:{
			...mapState([
				"userid"
			])
		},
		methods:{
			createcode(){
				this.values = this.price;
				this.$refs.qqcode._makeCode();
				console.log(JSON.parse('{"errMsg":"requestPayment:fail:[payment微信:-1]General errors"}'))
			},
			qrUrl(data){
				this.codeUrl = data;
			},
			goFinish2(){
				this.$refs.qqcode._clearCode();
				this.$emit("closedCode");
			},
			goFinish(){
				uni.request({
					url: 'https://app.dailyld.com/rufcAPI/wxpay/unifiedorder?id=60&type=1&userid=adfaadf', //仅为示例，并非真实接口地址。
					data: {
						
					},
					method: "post",
					success: (res) => {
						console.log(res)
						this.strinfo = res.data;
						uni.getProvider({
							service: 'payment',
							success: (res)=> {
								console.log(res)
								if (~res.provider.indexOf('wxpay')) {
									uni.requestPayment({
										"provider": 'wxpay',
										"timeStamp": "",
										"nonceStr": "",
										"package": "",
										"signType":"MD5",
										"orderInfo":JSON.stringify(this.strinfo),
										
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
										}
									});
								}
							}
						})
					}
				});
				
				/* this.$refs.qqcode._clearCode();
				this.$emit("closedCode"); */
				
				
			},
			
			
		},
		props:{
			isshow:{
				default: false
			},
			price:{
				Type: Number,
				default: 0
			},
			bid:{
				default: 0
			}
		},
		components:{
			tkiQrcode
		},
	
		
	}
</script>

<style lang="scss" scoped>
.qr_pay{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	z-index: 999;
	padding: 0 50upx;
	
	.qr_type{
		margin-top: 40upx;
		overflow: hidden;
		.qr_logo{
			width: 360upx;
			height: 97upx;
		}
		.qr_monkey{
			float: right;
			font-size: 28upx;
			margin-top: 30upx;
		}
	}
	/* #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO */
	.goBack{
		height: 40upx;
		margin-top: 80upx;
		.h_img{
			width: 20upx;
			height: 37upx;
		}
	}
	.er_code{
		margin: 60upx auto 0;
		width: 520upx;
		height: 520upx;
		.er_codes{
			width: 100%;
			height: 100%;
		}
		
	}
	.qr_tip{
		margin: 60upx auto 0;
		width: 520upx;
		height: 172upx;
		.qr_timg{
			width: 100%;
			height: 100%;
		}
	}
	/* #endif */
	/* #ifdef H5 */
	.goBack{
		height: 40upx;
		margin-top: 20upx;
		.h_img{
			width: 20upx;
			height: 37upx;
		}
	}
	.er_code{
		margin: 0 auto ;
		width: 520upx;
		height: 520upx;
		.er_codes{
			margin-top: -480upx;
			width: 100%;
			height: 100%;
		}
		
	}
	.qr_tip{
		margin: 600upx auto 0;
		width: 520upx;
		height: 172upx;
		.qr_timg{
			width: 100%;
			height: 100%;
		}
	}
	/* #endif */
	
	.qr_finish{
		width: 520upx;
		margin: 40upx auto 0;
		height: 100upx;
		text-align: right;
		.qr_wancheng{
			display: inline-block;
			width: 200upx;
			height: 60upx;
			background-color: #3BB4F2;
			border-radius: 8upx;
			color: #fff;
			font-size: 30upx;
			text-align: center;
			line-height: 60upx;
		}
	}
}
</style>
