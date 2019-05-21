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
				<input class="login_accout" type="number" style="font-size: 30upx;" v-model="phone_numbers" maxlength="10" placeholder="请输入手机号码" />
			</view>
		</view>
		<view class="verify_row">
			<view class="input_row verify_box" style="flex: 1;">
				<input class="phone_verify" style="font-size: 30upx;" maxlength="6" placeholder="验证码" />
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
	export default {
		data() {
			return {
				phone_numbers:'',
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
				//content: '获取验证码', // 按钮里显示的内容
				totalTime: 60 //记录具体倒计时时间 
			}
		},
		onLoad() {

		},
		methods: {
			
			// 获取input内容
			getCode() {
				this.countdown = 5;
				this.timestatus_two = false;
				this.timestatus = true;
				this.clear = setInterval(this.countDown, 1000);
				this.countown_style.zIndex = -1;
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
					url: 'http://192.168.0.185:9999/auth/login?token=' + this.phoneNumber + '&&password='+ this.password +'&&randomStr=' + this.randomWord(false, 4),
					method: 'GET',
					success: res => {
						console.log(res);
						if (res.data.message == '登录成功') {
							uni.reLaunch({
								url: '../index/index/index'
							});
							console.log('登录成功');
						} else {
							uni.showToast({
								title: '密码错误',
								duration: 2000,
								icon: 'none',
							});
							console.log('登录失败');
						}
					}
				});
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
