<template>
	<view class="change_password" :style="{height: pageHeight}">
		<Header :titles="title"></Header>
		<view class="input_content">
			<view class="input_box border_style">
				<input type="text" value="" v-model="oldPassword" password="true" @blur="verifyOldPassword" placeholder="旧密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
			<view class="input_box border_style">
				<input type="text" value="" v-model="newPassword" password="true" placeholder="新密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
			<view class="input_box">
				<input type="text" value="" v-model="newPasswordAgain" password="true" placeholder="请再次输入新密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
		</view>
		<view class="sure_change" @tap="confirmChange">确定</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import acquireString from '@/common/commonFunction.js'
	import { mapState } from 'vuex'
	import {get,put} from '@/common/methods.js'
	import md5 from 'js-md5';
	export default { 
		data() {
			return {
				title: '修改密码',
				pageHeight: '',
				oldPassword: '',
				newPassword: '',
				newPasswordAgain: '',
				randomString: '',
				passwordIsTure: ''
			}
		},
		components: {
			Header
		},
		computed: {
			...mapState([
				'phoneNumber',
				'userid'
			])
		},
		onLoad() {
			this.getHeight()
			this.randomString = acquireString.randomWord(false, 11)
		},
		methods: {
			verifyOldPassword() {
				get('/user/login?account='+ this.phoneNumber +'&&password='+md5(this.oldPassword)+'&&randomStr='+this.randomString,{}).then(res=>{
					console.log(res)
					this.passwordIsTure = res.status
					// if (this.passwordIsTure == 200) {
					// 	uni.showToast({
					// 		title: '登录成功!',
					// 		duration: 1500,
					// 		icon: 'none'
					// 	});	
					// }
				});
				console.log(this.userid)
				console.log(this.phoneNumber)
			},
			confirmChange(){
				let regPwd = /^[a-z0-9A-Z]{6,14}$/;
				if(this.oldPassword !=='' && this.newPassword !== '' && this.newPasswordAgain !== ''){
					if( !regPwd.test(this.newPassword) && !regPwd.test(this.newPasswordAgain) ){
						// uni.showToast({
						// 	title: '密码必须是6-14位英文字母、数字 (不能含有空格和特殊字符)',
						// 	duration: 1500,
						// 	icon: 'none'
						// });	
						
						uni.showModal({
							// title: '提示',
							// confirmText: '免费申请',
							// cancelText: '我先看看',
							showCancel:false,
							content: '密码必须是6-14位英文字母、数字 (不能含有空格和特殊字符)',
							success:res=> {
								if (res.confirm) {
								} else if (res.cancel) {
								}
							},
						});
					}else if(this.newPassword !== this.newPasswordAgain){
							uni.showModal({
								showCancel:false,
								content: '两次密码输入不一致，请重新输入。',
								success:res=> {
									if (res.confirm) {
									} else if (res.cancel) {
									}
								},
							});
					}else if( this.passwordIsTure !== 200 ){
						uni.showModal({
							showCancel:false,
							content: '账号或密码错误，请重新填写。',
							success:res=> {
								if (res.confirm) {
								} else if (res.cancel) {
								}
							},
						});
					}else{
						console.log("密码修改成功")
						put('/user/password/reset', {"phone": this.phoneNumber, "newPSD": md5(this.newPassword)}).then(res=>{
							console.log(res)
							let icon_type='none';
							if( res.status==200 ){
								icon_type = 'success';
								setTimeout(()=>{
									uni.reLaunch({
										url: '../index/index/index'
									});
								},1000);
							}
							uni.showToast({
								title: res.message,
								duration: 2000,
								icon: icon_type,
							});
						});
					}
				}
				
				// else if(this.newPassword !== this.newPasswordAgain ){
				// 	uni.showToast({
				// 		title: '两次密码输出不一致!',
				// 		duration: 1500,
				// 		icon: 'none'
				// 	});	
				// }
			},
			getHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.clientHeight = res.windowHeight;
						this.pageHeight = res.windowHeight + 'px';
					},
				});
			}
		}
	}
	
	
</script>

<style lang="less" scoped>
	.change_password{
		background: #eee;
		.input_content{
			margin-top: 16upx; 
			width: 100%;
			background: #fff;
			.input_box{
				display: flex;
				align-items: center;
				margin: 0 auto;
				width: 94%;
				height: 100upx;
				color: red;
				input{
					width: 100%;
					color: #666;
				}
			}
			.border_style{ 
				border-bottom: 1upx solid #eee; 
			}
		}
		.sure_change{
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			margin-top: 121upx;
			width: 690upx;
			height: 80upx;
			color: #fff;
			background: #01B18D;
		}
	}
</style>
