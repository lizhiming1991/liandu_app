<template>
	<view class="login_content">
		<Search></Search>
		<view>
			<view style="flex: 1;"></view>
			<to-register></to-register>
		</view>
		<view class="input_group">
			<text class="login_title">密码登录</text>
			<view class="input_row">
				<input class="login_accout" v-model="phoneNumber" style="font-size: 30upx;" maxlength="11"
				 placeholder="请输入手机号码" />
			</view>
			<view class="input_row input_password">
				<input class="login_password" v-model="password" password="true" style="font-size: 30upx;" maxlength="16"
				 placeholder="请输入密码" />
			</view>
			<!-- <view class="input_row input_password">
				<input class="login_password" v-model="password" password="true" style="font-size: 30upx;" maxlength="16" placeholder="请输入密码" />
	        </view> -->
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
	import Search from '@/components/header/header.vue'
	import toRegister from '@/components/toRegister/toRegister.vue'
	export default {
		data() {
			return {
				phoneNumber: '',
				password: '',
				chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
			}
		},
		onLoad() {
			// uni.request({
			// 	url: 'http://192.168.0.185:9999/auth/login?token=13914612020&password=w.22083400',
			// 	method: 'GET',
			// 	// header: {
			// 	//"Authorization" : "Basic YWRtaW46YWRtaW4="
			// 	// 	},
			// 	success: res => {
			// 		//console.log(res);
			// 	}
			// });
			uni.request({
				url: 'http://192.168.0.185:9999/code/image?randomStr=123123',
				method: 'GET',
				success: res => {
					//console.log(res);
				}
			});
		},
		methods: {
			randomWord(randomFlag, min, max) {
				let str = "",
					range = min,
					arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
						'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
						'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
					];
				if (randomFlag) {
					range = Math.round(Math.random() * (max - min)) + min;
				}
				for (let i = 0; i < range; i++) {
					let pos = Math.round(Math.random() * (arr.length - 1));
					str += arr[pos];
				}
				return str;
			},
			passwordLogin() {
				uni.request({
					url: 'http://192.168.0.185:9999/auth/login?token=' + this.phoneNumber + '&&password='+ this.password +'&&randomStr=' + this.randomWord(false, 4),
					method: 'GET',
					success: res => {
						console.log(res);
						if (res.data.message == '登录成功') {
							// this.$router.push('/page/index/index/index');
							// console.log('登录成功');
							//  uni.navigateTo({
							// 	url: '../index/index/index',
							// }); 
							
							uni.reLaunch({
								url: '../index/index/index'
							});
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

<style>
	.login_content {
		width: 750upx;
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
