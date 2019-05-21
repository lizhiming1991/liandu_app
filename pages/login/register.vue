<template>
	<view class="register_content" style="flex-direction: column; flex: 1;">
		<Search></Search>
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
				<view @tap="getCode" :disabled="disabled" class="acquire_verify" :style="countown_style" v-if="timestatus2">
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
					<input class="register_password" style="font-size: 30upx;" password="true" maxlength="20" placeholder="密码长度6-20位" />
				</view>
			</view>
			<view class="show_password">
				<image src="/static/images/yanjing.png" mode=""></image>
			</view>
		</view>
		<view class="register_row" style="justify-content: center;">
			<view style="flex: 1; justify-content: center;">
				<view class="register_box">
					<view class="register_button">注册</view>
				</view>
			</view>
		</view>
		<view class="to_login_row">
			<view style="flex: 1; justify-content: center;">
				<view class="direct_login">
					<text>已有账号,<text class="login_text">直接</text></text>
					<navigator class="login" url="/pages/login/phoneLogin">登录</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Search from '@/components/header/header.vue'
	import acquireString from '@/common/commonFunction.js'
	export default {
		data() {
			return {
				verifyNumber:'',
				phoneNumber: '',
				code: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				timestatus2: true,
				clear: '',
				countown_style: {
					// 	width: '149upx',
					//zIndex: 2,
					// 	background: '#71D3BF',
					// 	border:''
					// 	// border: 1px solid rgba(168, 167, 167, 1);
				},
				//content: '获取验证码', // 按钮里显示的内容
				totalTime: 60 //记录具体倒计时时间 
			}
		},
		onLoad() {
			console.log(acquireString.randomWord(false, 4))
		},
		methods: {
			getCode() {
				this.countdown = 3;
				this.timestatus2 = false;
				this.timestatus = true;
				this.clear = setInterval(this.countDown, 1000);
				this.countown_style.zIndex = -1;
				uni.request({
					
					url: 'http://192.168.0.185:9999/code/phone/register?randomStr='+acquireString.randomWord(false, 4)+'&&phone='+13914612020,
					method: 'GET',
					success: res => {
						console.log(res);
						if (res.data.message == '验证码已发送') {
							// this.$router.push('/page/index/index/index');
							// console.log('登录成功');
							//  uni.navigateTo({
							// 	url: '../index/index/index',
							// }); 
							// uni.reLaunch({
							// 	url: '../index/index/index'
							// });
							uni.showToast({
								title: '发送成功',
								duration: 1000,
								icon: 'success',
							});
							console.log('获取验证码成功');
						} else {
							console.log('获取验证码失败');
						}
					}
				});
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
			}
			// 验证码倒计时 end 
		},
		components: {
			Search
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
