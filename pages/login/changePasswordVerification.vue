<template>
	<view class="register_content">
		<Header></Header>
		<view>
			<view style="flex: 1;"></view>
			<to-register></to-register>
		</view>
		<view class="input_group">
			<text class="register_title">忘记密码</text>
			<view class="input_row phone_number">
				<input class="register_accout" type="number" v-model="phoneNumber" style="padding-left:80upx; font-size: 30upx;"
				 maxlength="11" placeholder="请输入手机号码" />
				<view>
					<image class="phone_icon" src="/static/images/shouji.png" mode=""></image>
				</view>
			</view>
			<view class="input_row verify_box" style="display: flex;">
				<view class="" style="display: flex flex;1">
					<input class="phone_verify" style="font-size: 30upx;" v-model="verifyNumber" maxlength="6" placeholder="请输入验证码" />
				</view>
				<view class="send_verify_content" style="display: flex;">
					<view @tap="getCode" :disabled="disabled" class="acquire_verify" style="display: flex;" v-if="timestatus_two">
						{{countdown}}
					</view>
					<view class="send_verify" style="font-size: 24upx; display: flex;" v-if="timestatus">
						<text>发送验证码({{countdown}}</text><text>)</text>
					</view>
				</view>
			</view>
		</view>
		<view class="register_box">
			<view class="register_button" @tap="next">下一步</view>
		</view>
		<view class="direct_login">
			<text>已有账号,<text class="login_text">直接</text></text>
			<navigator class="login" url="/pages/login/login">登录</navigator>
		</view>
	</view>

</template>

<script>
	import Header from '@/components/header/header.vue';
	import toRegister from '@/components/toRegister/toRegister.vue';
	import acquireString from '@/common/commonFunction.js';
	import {
		onlineURL
	} from '@/common/common.js';
	export default {
		data() {
			return {
				verifyStatus:'',
				phoneStatus:'',
				verifyNumber: '',
				phoneNumber: '',
				code: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				timestatus_two: true,
				clear: '',
				countown_style: {
					// 	width: '149upx',
					//zIndex: 2,
					// 	background: '#71D3BF',
					// 	border:''
					// 	// border: 1px solid rgba(168, 167, 167, 1);
				},
				requiredPhone: {
					"phone": '',
					"randomStr": ""
				},
				requiredCode:{
					"code": '',
					"randomStr": ""
				},
				sendNextPage: ''
			}
		},
		onLoad() {
			this.requiredPhone.randomStr = this.requiredCode.randomStr = acquireString.randomWord(false, 4)
			
			setTimeout(()=>{
				console.log(this.requiredPhone.randomStr)
			},100)
		},
		methods: {
			// 获取input内容
			getCode() {
				let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				if (regPhone.test(this.phoneNumber)) {
					this.countdown = 60;
					this.timestatus_two = false;
					this.timestatus = true;
					this.clear = setInterval(this.countDown, 1000);
					uni.request({
						url: onlineURL + '/code/phone/register?randomStr=' + this.requiredPhone.randomStr + '&&phone=' + this.phoneNumber,
						method: 'GET',
						success: res => {
							//console.log(res);

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
			next(e) {
				// this.sendNextPage =  this.phoneNumber + '&' + this.requiredPhone.randomStr;
				
			this.requiredPhone.phone = this.phoneNumber;
			this.requiredCode.code = this.verifyNumber; 
			
				uni.request({
					url: onlineURL + '/auth/password/reset',
					method: 'PUT',
					data: this.requiredPhone,
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						//console.log(res)
						this.phoneStatus = res.data.status.split('-')[1];
						
					}
				});
				uni.request({
					url: onlineURL + '/auth/password/reset',
					method: 'PUT',
					data: this.requiredCode,
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						console.log(res)
						this.verifyStatus = res.data.status.split('-')[1];
						console.log(this.verifyStatus)
					}
				});
				setTimeout(()=>{
					// var nextid=  e.currentTarget.dataset.nextid;
					if(this.phoneStatus == 'FAILED'){
						uni.showToast({
							title: '账号不存在',
							duration: 2000,
							icon: 'none',
						});
					}else if(this.phoneStatus == 'ERROR'){
						console.log(this.phoneStatus)
						uni.showToast({
							title: '请输入账号',
							duration: 2000,
							icon: 'none',
						});
					}else if(this.verifyStatus == 'FAILED'){
						uni.showToast({
							title: '验证码错误',
							duration: 2000,
							icon: 'none',
						});
					}else if(this.verifyStatus == 'ERROR'){
						uni.showToast({
							title: '请输入验证码',
							duration: 2000,
							icon: 'none',
						});
					}else{
						
						this.$store.dispatch('modifyPhoneNumber',this.phoneNumber)
						this.$store.dispatch('modifyRandomNumber',this.requiredPhone.randomStr)
						console.log("下一步")
						// this.sendNextPage.phone = this.phoneNumber;
						// this.sendNextPage.verifyNumber = this.requiredPhone.randomStr;
						uni.navigateTo({
							url: './changePassword' ,
							
						});
					}
				},1000);
				
				// uni.request({
				// 	url: onlineURL+'/auth/login?token=' + this.phoneNumber + '&&randomStr=' + this.randomString,
				// 	method: 'GET',
				// 	success: res => {
				// 		this.phoneStatus = res.data.status.split('-')[1];
				// 		//console.log(res);
				// 	}
				// });
				// uni.request({
				// 	url: onlineURL+'/code/check/code?code=' + this.verifyNumber + '&&randomStr=' + this.randomString,
				// 	method: 'GET',
				// 	success: res => {
				// 		this.verifyStatus = res.data.status.split('-')[1];
				// 		console.log(res);
				// 	}
				// });
			}
		},
		components: {
			Header,
			toRegister
		}
	}
</script>

<style scoped>
	.register_content {
		width: 750upx;
	}

	.input_group {
		position: relative;
	}

	.register_content .input_group .register_title {
		display: inline-block;
		margin-top: 238upx;
		margin-left: 65upx;
		font-size: 50upx;
		font-weight: 600;
	}

	.register_content .input_group .phone_number {
		position: relative;
	}

	.register_content .input_group .input_row {
		margin-left: 66upx;
		width: 612upx;
		height: 94upx;
		box-sizing: border-box;
	}

	.register_content .input_group .input_row .phone_icon {
		position: absolute;
		top: 20upx;
		left: 0;
		width: 35upx;
		height: 49upx;
	}

	.register_content .input_group .input_row .register_accout {
		height: 94upx;
		border-bottom: 1px solid #ccc;
	}

	.register_content .input_group .input_row .register_accout {
		margin-top: 125upx;
	}

	.register_content .input_group .verify_box {
		margin-top: 34upx;
		padding-top: 20upx;
		margin-left: 66upx;
		width: 612upx;
		border-bottom: 2upx solid #EEE;
	}

	.register_content .input_group .verify_box .acquire_verify {
		margin-left: 140upx;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
		width: 149upx;
		height: 57upx;
		background: rgba(113, 211, 191, 1);
		border-radius: 4upx;
	}

	.register_content .input_group .verify_box .send_verify {
		margin-left: 110upx;
		justify-content: center;
		align-items: center;
		width: 198upx;
		height: 57upx;
		box-sizing: border-box;
		color: #888;
		border: 2upx solid rgba(168, 167, 167, 1);
		border-radius: 4upx;
	}

	.register_content .input_group .input_row .phone_verify {}

	.register_content .register_box {
		display: flex;
		justify-content: center;
	}

	.register_content .register_box .register_button {
		margin-top: 129upx;
		width: 611upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		text-align: center;
		border-radius: 4px;
		background: rgba(238, 238, 238, 1);
		border-style: none;
	}

	.register_content .direct_login {
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
