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
				<input class="chang_password_password"  v-model="newPasswordAgain" password="true" style="font-size: 30upx;" maxlength="20" placeholder="请再次输入新密码" />
	        </view>
	    </view>
	    <view class="chang_password_box">
	        <button class="chang_password_button" @tap="modification">确定</button>
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
				title:'',
	 			newPassword:'',
				newPasswordAgain:''
	 		}
	 	},
	 	onLoad(e) {
			//console.log(e.nextid)
	 	},
		computed: {
			...mapState([
				"phone"
			])
		},
	 	methods: {
			modification() {
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
				}else if(this.newPassword != this.newPasswordAgain ){
					uni.showToast({
						title: '密码两次输入不一致',
						duration: 2000,
						icon: 'none',
					});
					return false;
				}else{
					console.log("phone:"+this.phone);
					put('/user/password/reset', {"phone": this.phone, "newPSD": md5(this.newPassword)}).then(res=>{
						let icon_type='none';
						if(res.status==200){
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
	 	},
		components: {
			Search,
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
</style>