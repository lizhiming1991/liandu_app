<template>
	<view class="login_content">
		<view class="back_button" @tap="to_homepage">
			<image class="h_img" src="../../static/images/icon_back.png"></image>
		</view>
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
				<input class="login_accout" type="number" style="font-size: 30upx;" v-model="phoneNumber" maxlength="11"
				 placeholder="请输入手机号码" />
			</view>
		</view>
		<view class="verify_row">
			<view class="input_row verify_box" style="flex: 1;">
				<input class="phone_verify" v-model="verifyNumber" style="font-size: 30upx;" maxlength="6" @blur="leaveInput" @focus="addButtonColor" placeholder="验证码" />
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
				<view :class = " isShowColor == true ? 'login_button'  : 'ButtonBgColor login_button' " @tap="login">登录</view>
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
	import {
		get
	} from '@/common/methods.js';
	import toRegister from '@/components/toRegister/toRegister.vue';
	import acquireString from '@/common/commonFunction.js'
	import {
		onlineURL
	} from '@/common/common.js';
	export default {
		data() {
			return {
				isShowColor: true,
				verifyStatus: '',
				phoneStatus: '',
				loginStatus: '',
				randomString: '',
				verifyNumber: '',
				phoneNumber: '',
				code: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				timestatus_two: true,
				clear: '',
				countown_style: {},
			}
		},
		onLoad() {
			this.randomString = acquireString.randomWord(false, 4)
		},
		methods: {
			to_homepage() {
				uni.reLaunch({
					url: '../index/index/index'
				});
			},
			addButtonColor() {
				if(this.phoneNumber != ''){
					console.log(11)
					this.isShowColor = false
				}	
			},
			leaveInput(){
				if(this.verifyNumber =='' )
				this.isShowColor = true
			},
			// 获取验证码
			async getCode() {
				let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				if (regPhone.test(this.phoneNumber)) {
					await get('/user/check?phone='+this.phoneNumber,{ }).then(res=>{
						console.log(res);
						if(res.status == 200){
							this.countdown = 60;
							this.timestatus_two = false;
							this.timestatus = true;
							this.clear = setInterval(this.countDown, 1000);
							get ('/code/phone/login?randomStr=' + this.randomString + '&&phone=' + this.phoneNumber, {}).then(res=>{
							});
							return true;
						}
						else{
							uni.showToast({
								title: res.message,
								duration: 1500,
								icon: 'none'
							});
						}
						
					});
				} else {

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
				get('/check/code?code='+this.verifyNumber+'&&randomStr='+this.randomString, {}).then(res=>{
					console.log(res)
					if(res.status==200){
						uni.showToast({
							title: '登录成功',
							duration: 2000,
							icon: 'success',
						});
						get('/user/account/' + this.phoneNumber).then(res => {
							this.$store.dispatch("changeUserid", res.data.id);
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index/index'
							});
						}, 800);
					}
					else{
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none',
						});
					}
				});
			}
		},
		components: {
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
	
	.login_content .back_button{
		width: 60upx;
		height: 80upx;
		padding: 30upx 0 0 30upx;
	}
	.login_content .h_img{
		width: 20upx;
		height: 37upx;
	}
	.login_content .welcome_speech_one {
		margin-top: 154upx;
	}

	.login_content .welcome_speech_one,
	.login_content .welcome_speech_two {
		margin-left: 64upx;
		font-size: 50upx;
		color: #333;
	}

	.login_content .phone_row {}

	.login_content .phone_row .login_accout {
		margin-top: 141upx;
		margin-left: 66upx;
		padding-bottom: 20upx;
		width: 612upx;
		border-bottom: 2upx solid #EEE;
	}

	.login_content .verify_row {
		margin-left: 66upx;
		width: 612upx;
		border-bottom: 2upx solid #EEE;
	}

	.login_content .verify_row .verify_box {
		padding-bottom: 20upx;
	}

	.login_content .verify_row .send_verify_content {
		font-size: 24upx;
	}

	.login_content .verify_row .send_verify_content .acquire_verify {
		margin-top: 30upx;
		width: 149upx;
		height: 57upx;
		align-items: center;
		justify-content: center;
		background: #01b18d;
		border-radius: 4upx;
	}

	.login_content .verify_row .send_verify_content .send_verify {
		margin-top: 30upx;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 198upx;
		height: 57upx;
		color: #888;
		font-size: 24upx;
		background: rgba(255, 255, 255, 1);
		border: 2upx solid rgba(168, 167, 167, 1);
		border-radius: 4upx;
	}

	.login_content .verify_row .phone_verify {
		margin-top: 36upx;
	}

	.login_content .login_box .login_button {
		margin-top: 47upx;
		margin-left: 66upx;
		width: 611upx;
		height: 80upx;
		justify-content: center;
		align-items: center;
		color: #888;
		background: rgba(238, 238, 238, 1);
		border-radius: 4upx;
	}
	.login_content .login_box .ButtonBgColor{
		color: #333333;
		background: #01b18d;
	}
	.login_content .password_login_box {
		margin-top: 91upx;
		justify-content: center;
		color: #333;
		font-size: 24upx;
	}
</style>
