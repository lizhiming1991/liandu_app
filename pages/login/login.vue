<template>
	<view class="login_content">
		<Header></Header>
		<view>
			<view style="flex: 1;"></view>
			<to-register></to-register>
		</view>
		<view class="input_group">
			<text class="login_title">密码登录</text>
			<view class="input_row">
				<input class="login_accout" v-model="phoneNumber" style="font-size: 30upx;" maxlength="11"
				 placeholder="请输入手机号码" @blur="checkphone()" />
			</view>
			<view class="input_row input_password">
				<input class="login_password" v-model="password" password="true" style="font-size: 30upx;" maxlength="16"
				 placeholder="请输入密码" />
			</view>
			<view class="input_row input_password" v-if="number>=3">
				<input class="login_password" v-model="passyzm"  style="font-size: 30upx;" maxlength="16" placeholder="请输入验证码" />
				<image :src="imagePath" id="passyzm"></image>
	        </view>
		</view>
		<view class="find_password" style="display: flex; justify-content: flex-end;">
			<navigator url="/pages/login/changePasswordVerification">忘记了?找回密码</navigator>
		</view>
		<view class="login_box">
			<button class="login_button" @tap="passwordLogin">登录</button>
		</view>
		<!-- <view class="action-row">
	        <navigator url="">注册账号</navigator>
	        <text>|</text>
	        <navigator url="">忘记密码</navigator>
	    </view> -->
	</view>

</template>

<script>
	import Header from '@/components/header/header.vue'
	import toRegister from '@/components/toRegister/toRegister.vue'
	import {mapState} from 'vuex'
	import acquireString from '@/common/commonFunction.js'
	import {get} from '@/common/methods.js'
	import { onlineURL } from '@/common/common.js';
	
	export default {
		data() {
			return {
				phoneNumber: '',
				password: '',
				passyzm: '',
				number: 0,
				yzmstr:'',
				imagePath:''
			}
		},
		computed: {
			...mapState([
				"userid"
			]),
			numbers:function(){
				return this.number
			}
		},
		onLoad() {
			this.getImgcode();
			this.yzmstr = acquireString.randomWord(false, 4)
		},
		onReady(){
			
		},
		methods: {
			checkphone(){//18136085708 123456
				uni.request({
					url: onlineURL + '/auth/login?token=' + this.phoneNumber+'randomStr='+this.yzmstr,
					method:'GET',
					success: (res)=>{
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						});
						
					}
				})
			},
			getImgcode(){
				var yzm = this.yzmstr;
				this.imagePath = onlineURL + "/code/image?randomStr="+yzm;
				// #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO  
					
				// #endif 
				// #ifdef H5 
					
				// #endif 
			},
			passwordLogin() {
				this.number = this.number +1;
				this.getImgcode();
				if(this.phoneNumber == "" || this.phoneNumber == null){
					uni.showToast({
						title: '用户名不能为空!',
						duration: 1500,
						icon: 'none'
					});
					return false;
				}
				if(this.password == "" || this.password == null){
					uni.showToast({
						title: '密码不能为空!',
						duration: 1500,
						icon: 'none'
					});
					return false;
				}
				if(this.number>=3){
					// console.log(this.passyzm)
					if(this.passyzm == "" || this.passyzm == null ){
						uni.showToast({
							title: '验证码不正确!',
							duration: 1500,
							icon: 'none'
						});
						return false;
					}
				}else{
					this.passyzm = this.yzmstr;
				}
				uni.request({
					url: onlineURL + '/auth/login?token=' + this.phoneNumber + '&&password='+ this.password+'&&randomStr=' + this.passyzm,
					method: 'GET',
					success: res => {
						//console.log(res);
						if (res.data.message == '登录成功') {
							uni.showToast({
								title: '登录成功!',
								duration: 1500,
								icon: 'none'
							});
							this.$store.dispatch("changeUserid",res.data.data.id);
							console.log(res.data)
							uni.reLaunch({
								url: '../index/index/index'
							});
							
						} else {
							uni.showToast({
								title: '密码错误',
								duration: 2000,
								icon: 'none',
							});
						}
					}
				});
			}
		},
		components: {
			Header,
			toRegister
		}
	}
</script>

<style>
	.login_content {
		width: 750upx;
	}
	
	#passyzm{
		position: fixed;
		right: 100upx;
		bottom: 340upx;
		width: 200upx;
		height: 100upx;
		z-index: 100;
	}
	.login_content .input_group {
		position: relative;
	}

	.login_content .input_group .login_title {
		display: inline-block;
		margin-top: 238upx;
		margin-left: 65upx;
		font-size: 50upx;
		font-weight: 600;
	}

	.login_content .input_group .input_row {
		margin-left: 66upx;
		width: 612upx;
		height: 94upx;
		box-sizing: border-box;
	}

	.login_content .input_group .input_row .login_accout,
	.login_content .input_group .input_row .login_password {
		height: 94upx;
		border-bottom: 1px solid #ccc;
	}

	.login_content .input_group .input_row .login_accout {
		margin-top: 125upx;
	}

	.login_content .input_group .input_row .login_password {
		margin-top: 65upx;
	}

	.login_content .input_group .input_password {
		margin-top: 31upx;
	}

	.login_content .find_password {
		display: flex;
		justify-content: flex-end;
		margin: 21upx 72upx 0 0;
		color: #333;
		font-size: 20upx;
	}

	.login_content .login_box .login_button {
		margin-top: 129upx;
		width: 610upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		border-radius: 4px;
		background: rgba(238, 238, 238, 1);
		border-style: none;
	}
</style>
