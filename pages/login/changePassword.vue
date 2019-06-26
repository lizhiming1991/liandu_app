<template>
	<view class="chang_password_content">
		<Header :titles='title'></Header>
		<view>
			<view style="flex: 1;"></view>
			<to-register></to-register>
		</view>
	    <view class="input_group">
			<text class="chang_password_title">忘记密码</text>
	        <view class="input_row">
				   <input class="chang_password_password" v-model="newPassword" password="true" style="font-size: 30upx;" maxlength="20" placeholder="请输入新密码" />
	        </view>
	        <view class="input_row input_password">
				<input class="chang_password_password" @blur="changeBg" @focus="leaveInput" v-model="newPasswordAgain" password="true" style="font-size: 30upx;" maxlength="20" placeholder="请再次输入新密码" />
	        </view>
	    </view>
	    <view class="chang_password_box">
	        <button :class=" isShowBg == true ? 'chang_password_button' : 'chang_password_button changeButtonBg'" @tap="modification">确定</button>
	    </view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	import toRegister from '@/components/toRegister/toRegister.vue';
	import { onlineURL } from '@/common/common.js';
	import { put } from '@/common/methods.js';
	import {mapState} from 'vuex'
	import md5 from 'js-md5';
	 export default {
	 	data() {
	 		return {
				isShowBg: true,
				title:'',
	 			newPassword:'',
				newPasswordAgain:''
	 		}
	 	},
	 	onLoad(e) {
	 	},
		computed: {
			...mapState([
				"phone"
			])
		},
	 	methods: {
			modification() {
				let regPwd = /^[a-z0-9A-Z]{6,14}$/;
				if(this.newPassword == '' ){
					uni.showToast({
						title: '密码不能为空',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}else if(this.newPasswordAgain == ''){
					uni.showToast({
						title: '密码不能为空',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}else if( this.newPassword != this.newPasswordAgain ){
					uni.showToast({
						title: '密码两次输入不一致',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}else if(!regPwd.test(this.newPassword)){
						uni.showToast({
							title: '请输入6-14位数字或者英文字符',
							duration: 2000,
							icon: 'none',
						});
						return false;
				}else{
					console.log( "phone:"+this.phone );
					put('/user/password/reset', {"phone": this.phone, "newPSD": md5(this.newPassword)}).then(res=>{
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
			},
			leaveInput() {
				if(this.passwordAgain != '') {
					this.isShowBg = false
				}
			},
			changeBg() {
				if(this.newPasswordAgain == ''){
					this.isShowBg = true
				}
			}
	 	},
		components: {
			Header,
			toRegister
		}
	 }
</script>

<style>
.chang_password_content{
	width: 750upx;
}	
.input_group{
	position: relative;
}
.chang_password_content .input_group .chang_password_title{
	display: inline-block;
	margin-top: 238upx;
	margin-left: 65upx;
	font-size: 50upx;
	font-weight: 600;
}
.chang_password_content .input_group .input_row{
	margin-left: 66upx;
	width: 612upx;
	height: 94upx;
	box-sizing: border-box;
}
.chang_password_content .input_group .input_row .chang_password_password{
	height: 94upx;
	border-bottom: 1px solid #ccc;
}
.chang_password_content .input_group .input_row .chang_password_password{
	margin-top: 65upx;
}
.chang_password_content .input_group .input_password{
	margin-top: 31upx;
}
.chang_password_content .chang_password_box .chang_password_button{
	margin-top: 129upx;
	width: 610upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 30upx;
	border-radius:4px;
	background:rgba(238,238,238,1);
	border-style: none;
}
.chang_password_content .chang_password_box .changeButtonBg{
	color: #333;
	background: #01B18D;
}
</style>