<template>
	<view class="login_content">
		<Search></Search>
		<view>
			<view style="flex: 1;"></view>
			<to-register></to-register>
		</view>
		<view class="welcome_speech_one">
			<view style="">你好,</view>
		</view>
		<view class="welcome_speech_two">
			<view class="">欢迎来到今日链读</view>
		</view>
		<view class="phone_row">
			<view class="input_row">
				<input class="login_accout" type="number" style="font-size: 30upx;" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
			</view>
		</view>
		<view class="verify_row">
			<view class="input_row verify_box" style="flex: 1;">
				<input class="phone_verify" v-model="verifyNumber" style="font-size: 30upx;" maxlength="6" placeholder="验证码" />
				<!-- <view class="acquire_verify" @click="acquire_phone_verify" :style="countown_style">{{content}}</view> -->
			</view>
			<view class="send_verify_content">
				<view @tap="getCode" :disabled="disabled" class="acquire_verify" :style="countown_style" v-if="timestatus_two">
					{{countdown}}
				</view>
				<view class="send_verify" style="" v-if="timestatus">
					<text>发送验证码({{countdown}}</text><text>)</text>
				</view>
			</view>
		</view>
		<view>
			<view class="login_box">
				<view class="login_button" @tap="login">登录</view>
			</view>
		</view>
		<view class="password_login_box">
			<view class="to_password_login" style="">
				<navigator class="password_login" url="/pages/login/login">密码登录</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import Search from '@/components/header/header.vue';
	import toRegister from '@/components/toRegister/toRegister.vue';
	import acquireString from '@/common/commonFunction.js'
	import { onlineURL } from '@/common/common.js';
	export default {
		data() {
			return {
				verifyStatus:'',
				phoneStatus:'',
				loginStatus:'',
				randomString:'',
				verifyNumber:'',
				phoneNumber:'',
				code: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				timestatus_two: true,
				clear: '',
				countown_style: {
				},
			}
		},
		onLoad() {
			this.randomString = acquireString.randomWord(false, 4)
		},
		methods: {
			// 获取验证码
			getCode() {
				let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				if(regPhone.test(this.phoneNumber)){
				this.countdown = 60;
				this.timestatus_two = false;
				this.timestatus = true;
				this.clear = setInterval(this.countDown, 1000);
				uni.request({
					url: onlineURL+'/code/phone/register?randomStr=' + this.randomString + '&&phone='+this.phoneNumber,
					method: 'GET',
					success: res => {
						console.log(res);
						
					}
				});
					}else{
					
					uni.showToast({
						title: '请输入正确的手机号码',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
			},
			countDown() {
				if (!this.countdown) {
					this.disabled = false;
					this.timestatus = false;
					this.countdown = '获取验证码';

					clearInterval(this.clear);
					this.timestatus_two = true;
					this.countdown = '重新获取';
					this.countown_style.zIndex = 2;
				} else {

					--this.countdown;
				}
			},
			login() {
				uni.request({
					url: onlineURL+'/auth/login?token=' + this.phoneNumber + '&&randomStr=' + this.randomString,
					method: 'GET',
					success: res => {
						this.phoneStatus = res.data.status.split('-')[1];
						//console.log(res);
					}
				});
				uni.request({
					url: onlineURL+'/check/code?code=' + this.verifyNumber + '&&randomStr=' + this.randomString,
					method: 'GET',
					success: res => {
						this.verifyStatus = res.data.status.split('-')[1];
						console.log(res);
					}
				});
				setTimeout(()=>{
				//	console.log(this)
					if(this.phoneStatus == 'ERROR'){
						uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: 'none',
						});
						return false;
					}else if( this.phoneStatus == 'FAILED' ){
						uni.showToast({
						title: '账号不存在',
						duration: 2000,
						icon: 'none',
						});
						return false;
					}else if(this.verifyStatus == 'ERROR'){
						uni.showToast({
						title: '验证码错误',
						duration: 2000,
						icon: 'none',
						});
						return false;
					}else if(this.verifyStatus == 'FAILED'){
						uni.showToast({
						title: '验证码错误',
						duration: 2000,
						icon: 'none',
						});
						return false;
					}else if(this.verifyStatus == 'SUCCESS'){
						uni.showToast({
						title: '登录成功',
						duration: 2000,
						icon: 'success',
						});
						setTimeout(()=>{
							uni.reLaunch({
								url: '../index/index/index'
							});
						},1000);
						// uni.request({
						// 	url: onlineURL+'/auth/login?token=' + this.phoneNumber+'&&password=' + '&&randomStr=' + this.randomString,
						// 	method: 'GET',
						// 	success: res => {
						// 		console.log(res);
						// 		// if (res.data.message == '登录成功') {
						// 		// 	uni.reLaunch({
						// 		// 		url: '../index/index/index'
						// 		// 	});
						// 		// 	console.log('登录成功');
						// 		// } else {
						// 		// 	uni.showToast({
						// 		// 		title: '密码错误',
						// 		// 		duration: 2000,
						// 		// 		icon: 'none',
						// 		// 	});
						// 		// 	console.log('登录失败');
						// 		// }
						// 	}
						// });
					}
				},1000);
				// if(this.phoneStatus == 'ERROR'){
				// 	console.log('111')
				// }else{
				// 	console.log('222')
				// }
				// uni.request({
				// 	url: onlineURL+'/auth/login?token=' + this.phoneNumber + '&&randomStr=' + this.randomString,
				// 	method: 'GET',
				// 	success: res => {
				// 		console.log(res);
				// 		// if (res.data.message == '登录成功') {
				// 		// 	uni.reLaunch({
				// 		// 		url: '../index/index/index'
				// 		// 	});
				// 		// 	console.log('登录成功');
				// 		// } else {
				// 		// 	uni.showToast({
				// 		// 		title: '密码错误',
				// 		// 		duration: 2000,
				// 		// 		icon: 'none',
				// 		// 	});
				// 		// 	console.log('登录失败');
				// 		// }
				// 	}
				// });
			}
		},
		components: {
			Search,
			toRegister
		}
	}
</script>

<style scoped>
	view {
		display: flex;
		flex-direction: row;
	}

	.login_content {
		flex-direction: column;
		flex: 1;
	}
	.login_content .welcome_speech_one{
		margin-top: 154upx;
	}
	.login_content .welcome_speech_one,.login_content .welcome_speech_two{
		margin-left: 64upx;
		font-size: 50upx;
		color: #333;
	}
	.login_content .phone_row{
	
	}
	.login_content .phone_row .login_accout{
		margin-top: 141upx;
		margin-left: 66upx;
		padding-bottom: 20upx;
		width: 612upx;
		border-bottom: 2upx solid #EEE;
	}
	.login_content .verify_row{
		margin-left: 66upx;
		width: 612upx;
		border-bottom: 2upx solid #EEE;
	}
	.login_content .verify_row .verify_box{
		padding-bottom: 20upx;
	}
	.login_content .verify_row .send_verify_content{
		font-size: 24upx;
	}
	.login_content .verify_row .send_verify_content .acquire_verify{
		margin-top: 30upx;
		width:149upx;
		height:57upx;
		align-items: center;
		justify-content: center;
		background:rgba(113,211,191,1);
		border-radius:4upx;
	}
	.login_content .verify_row .send_verify_content .send_verify{
		margin-top: 30upx;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width:198upx;
		height:57upx;
		color: #888;
		font-size: 24upx;
		background:rgba(255,255,255,1);
		border:2upx solid rgba(168,167,167,1);
		border-radius:4upx;
	}
	.login_content .verify_row .phone_verify{
		margin-top: 36upx;
	}
	
	.login_content .login_box .login_button{
		margin-top: 47upx;
		margin-left: 66upx;
		width:611upx;
		height:80upx;
		justify-content: center;
		align-items: center;
		color: #888;
		background:rgba(238,238,238,1);
		border-radius:4upx;
	}
	.login_content .password_login_box{
		margin-top: 91upx;
		justify-content: center;
		color: #333;
		font-size: 24upx;
	}
</style>
