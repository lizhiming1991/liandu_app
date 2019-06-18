<template>
	<view class="login_content">
		<Header :titles="title"></Header>
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
				<input class="login_password" v-model="password"  @blur="changeBg" password="true" style="font-size: 30upx;" maxlength="16"
				 placeholder="请输入密码" />
			</view>
			<view class="input_row input_password" v-if="number>=3">
				<input class="login_password" v-model="passyzm"  style="font-size: 30upx;" maxlength="16" placeholder="请输入验证码"/>
				<image :src="imagePath" id="passyzm"></image>
	        </view>
		</view>
		<view class="find_password" style="display: flex; justify-content: flex-end;">
			<navigator url="/pages/login/changePasswordVerification">忘记了?找回密码</navigator>
		</view>
		<view class="login_box">
			<button class="login_button" @tap="passwordLogin" :style="change_bg">登录</button>
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
	import md5 from 'js-md5';
	
	export default {
		data() {
			return {
				change_bg:{
					background:''
				},
				title:'',
				phoneNumber: '',
				password: '',
				passyzm: '',
				number: 0,
				randomString:'',
				imagePath:'',
				imageRandomStr: '',
				canlogin: true
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
			this.randomString = acquireString.randomWord(false, 11);
		},
		onReady(){},
		methods: {
			checkphone(){
				get('/user/check?phone='+this.phoneNumber,{ }).then(res=>{
					console.log(res);
					if(res.status == 200){
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
			},
			getImgcode(){
				this.imageRandomStr = acquireString.randomWord(false, 11);
				this.imagePath = onlineURL + "/code/image?randomStr="+this.imageRandomStr;
				console.log("image1:"+this.imageRandomStr);
				// #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO  
					
				// #endif 
				// #ifdef H5 
					
				// #endif 
			},
			async passwordLogin() {
				this.canlogin = true;
				this.number = this.number +1;
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
							title: '请输入验证码!',
							duration: 1500,
							icon: 'none'
						});
						return false;
					}
					console.log("image2:"+this.imageRandomStr)
					await get('/check/code?code='+this.passyzm+'&&randomStr='+this.imageRandomStr,{}).then(res=>{
						console.log(res);
						console.log(res.status);
						if(res.status != 200){
							console.log("xxx");
							uni.showToast({
								title: res.message,
								duration: 1500,
								icon:'none'
							});
							this.canlogin= false;
							this.getImgcode();
							return false;
						}
						else{
							get('/check/login-failed-times?randomStr='+this.randomString, {}).then(res=>{
								console.log(res);
							});
						}
					});
				}
				
				
				if(this.canlogin){
					get('/user/login?account='+this.phoneNumber+'&&password='+md5(this.password)+'&&randomStr='+this.randomString,{}).then(res=>{
					
						console.log(res);
						if (res.status == 200) {
							uni.showToast({
								title: '登录成功!',
								duration: 1500,
								icon: 'success'
							});
							this.$store.dispatch("changeUserid",res.data);
							uni.reLaunch({
								url: '../index/index/index'
							});
							
						} else {
							uni.showToast({
								title: res.message,
								duration: 2000,
								icon: 'none',
							});
							this.getImgcode();
						}
					});
				}
			},
			changeBg() {
				
				console.log("123")
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
