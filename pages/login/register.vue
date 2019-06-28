<template>
	<view class="register_content" style="flex-direction: column; flex: 1;">
		<Header></Header>
		<view class="phone_row">
			<view style="flex: 1;">
				<input class="register_accout" v-model="phoneNumber" type="number" style="padding-left:80upx; font-size: 30upx;"
				 maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view>
				<image class="phone_icon" width="" src="/static/images/shouji.png" mode=""></image>
			</view>
		</view>
		<view class="verify_row">
			<view style="flex: 1;">
				<view style="display: flex; flex: 1;"><input class="phone_verify" v-model="verifyNumber" style="font-size: 30upx; flex-direction: row; flex: 1;"
					 maxlength="6" placeholder="验证码" />
				</view>
			</view>
			<view class="send_verify_content">
				<view @tap="getCode" :disabled="disabled" class="acquire_verify" v-if="timestatus2">
					{{countdown}}
				</view>
				<view class="send_verify" style="font-size: 24upx;" v-if="timestatus">
					<text>发送验证码({{countdown}}</text><text>)</text>
				</view>
			</view>
		</view>
		<view class="password_row">
			<view style="flex: 1;">
				<view class="input_row input_password">
					<input class="register_password" @focus="leaveInput" @blur="changeBg" v-model="password" :type="passwordType" maxlength="20" placeholder="密码长度6-20位" />
				</view>
			</view>
			<view class="show_password" v-if="eye" @tap="pwd_ishow">
				<image src="/static/images/yanjing.png"  mode=""></image>
			</view>
			<view class="show_password" v-else @tap="pwd_ishow">
				<image src="/static/images/yanjing_2.png" mode=""></image>
			</view>
		</view>
		<view :class="isChangeBg == true ? 'register_row' : 'register_row changeButtonBg' " style="justify-content: center;">
			<view style="flex: 1; justify-content: center;" @tap="registerID">
				<view class="register_box">
					<view class="register_button">注册</view>
				</view>
			</view>
		</view>
		<view class="to_login_row">
			<view style="flex: 1; justify-content: center;">
				<view class="direct_login">
					<text>已有账号,<text class="login_text">直接</text></text>
					<text class="login" @tap="login">登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	import acquireString from '@/common/commonFunction.js';
	import md5 from 'js-md5';
	import {
		get,
		post
	} from '@/common/methods.js';
	export default {
		data() {
			return {
				isChangeBg: true,
				eye: true,
				passwordType: 'password',
				message: '',
				randomString: '',
				registerPhoneId: '',
				verifyNumber: '',
				phoneNumber: '',
				password: '',
				code: '',
				reqStatus: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				timestatus2: true,
				clear: '',
				verifyStatus: '',
				phoneStatus: '',
				registerStatus: '',
				countown_style: {
					zIndex: ''
				}
			}
		},
		onLoad() {
			this.randomString = acquireString.randomWord(false, 4);
			console.log(this.randomString);
		},
		methods: {
			pwd_ishow() {
				console.log('123')
				console.log(this.eye)
				if(this.eye == true){
					this.eye = false
					 this.passwordType = 'number'
				}else{
					this.eye = true
					this.passwordType = 'password'
				}
			},
			login() {
				uni.reLaunch({
					url: './phoneLogin'
				});
			},
			leaveInput() {
				if( this.phoneNumber != '' && this.verifyNumber != '' ){
					this.isChangeBg = false
				}
			},
			changeBg() {
				if(this.password ==''){
					this.isChangeBg = true
				}
			},
			async getCode() {
				let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				if (regPhone.test(this.phoneNumber)) {
					//1：验证手机号是否已被注册
					await get('/user/check?phone=' + this.phoneNumber, {}).then(res => {
						console.log(res);
						if (res.status != 200) {
							//未被注册
							this.countdown = 60;
							this.timestatus_two = false;
							this.timestatus = true;
							this.clear = setInterval(this.countDown, 1000);
							get('/code/phone/regist?randomStr=' + this.randomString + '&&phone=' + this.phoneNumber, {}).then(res => {
								uni.showToast({
									title: '验证码已发送',
									duration: 1500,
									icon: 'success'
								})
							});
							return true;
						} else {
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
					this.timestatus2 = true;
					this.countdown = '重新获取';
					this.countown_style.zIndex = 2;
				} else {
					--this.countdown;
				}
			},
			// 验证码倒计时 end 
			// 注册
			async registerID() {
				if (this.phoneNumber == null || this.phoneNumber == '') {
					uni.showToast({
						title: '请输入手机号码',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				if (this.verifyNumber == null || this.verifyNumber == '') {
					uni.showToast({
						title: '请输入验证码',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				if (this.password == null || this.password == '') {
					uni.showToast({
						title: '请输入密码',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}
				await get('/check/code?code=' + this.verifyNumber + '&&randomStr=' + this.randomString, {}).then(res => {
					if (res.status == 200) {
						let regPwd = /^[a-z0-9A-Z]{6,14}$/;
						if (regPwd.test(this.password)) {
							post('/user/regist', {
								"phone": this.phoneNumber,
								"password": md5(this.password)
							}).then(res => {
								if (res.status == 200) {
									uni.showToast({
										title: res.message,
										duration: 2000,
										icon: 'success',
									});
									get('/user/account/' + this.phoneNumber).then(res => {
										console.log(res);
										this.$store.dispatch("changeUserid", res.data.id);
									});
									setTimeout(() => {
										uni.reLaunch({
											url: '../index/index/index'
										});
									}, 1000);
								} else {
									uni.showToast({
										title: res.message,
										duration: 2000,
										icon: 'none',
									});
								}
							});
						} else {
							uni.showToast({
								title: '请输入正确的密码格式',
								duration: 2000,
								icon: 'none',
							});
						}
					} else {
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
			Header
		}
	}
</script>

<style scoped>
	view {
		display: flex;
		flex-direction: row;
	}
	
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.register_content .phone_row {
		position: relative;
		width: 612upx;
		margin: 134upx 0 0 66upx;
		padding-bottom: 14upx;
		border-bottom: 1px solid #eee;
	}

	.register_content .phone_icon {
		position: absolute;
		top: 0upx;
		left: 0;
		width: 35upx;
		height: 49upx;
	}

	.register_content .register_title {
		display: inline-block;
		margin-top: 238upx;
		margin-left: 65upx;
		font-size: 50upx;
		font-weight: 600;
	}

	.register_content .verify_row {
		width: 612upx;
		margin: 64upx 0 0 66upx;
		padding-bottom: 14upx;
		border-bottom: 1px solid #eee;
	}

	.register_content .verify_row .send_verify_content {
		color: #ccc;
	}

	.register_content .verify_row .send_verify {
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		width: 198upx;
		height: 57upx;

		font-size: 24upx;
		border: 2upx solid rgba(168, 167, 167, 1);
	}

	.register_content .verify_row .acquire_verify {
		justify-content: center;
		align-items: center;
		width: 149upx;
		height: 57upx;
		color: #333;
		font-size: 24upx;
		background: #01b18d;
	}

	.register_content .password_row {
		width: 612upx;
		margin: 64upx 0 0 66upx;
		padding-bottom: 14upx;
		border-bottom: 1px solid #eee;
	}

	.register_content .password_row .show_password {
		padding-top: 24upx;
	}

	.register_content .password_row .show_password image {
		width: 38upx;
		height: 14upx;
	}

	.register_content .password_row .register_password {
		font-size: 30upx;
		border: none;
		outline: none;
	}

	.register_content .register_row {
		margin-left: 66upx;
		margin-top: 129upx;
		width: 610upx;
		height: 80upx;
		color: #888;
		line-height: 80upx;
		font-size: 30upx;
		border-radius: 4px;
		background: rgba(238, 238, 238, 1);
		border-style: none;
	}
	.register_content .changeButtonBg{
		color: #333;
		background: #01b18d;
	}
	.register_content .to_login_row {
		display: flex;
		justify-content: center;
		margin-top: 37upx;
		color: #888;
		font-size: 22upx;
	}

	.register_content .direct_login .login_text {
		margin-left: 10upx;
	}

	.register_content .direct_login .login {
		margin-left: 10upx;
		color: #000;
	}
</style>
