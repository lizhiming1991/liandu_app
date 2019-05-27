<template>
	<view class="apply_member">
		<Header></Header>
		<view class="apply_title">
			<view>企业会员申请</view>
		</view>
		<view class="apply_content">
			<view class="member_info">企业名称</view>
			<view>
				<input class="member_input" type="text" value="" />
			</view>
		</view>
		<view class="apply_content">
			<view class="member_info">真实姓名</view>
			<view>
				<input class="member_input" type="text" value="" />
			</view>
		</view>
		<view class="apply_content">
			<view class="member_info">工作证件</view>
			<view>
				<input class="member_input" type="text" value="" />
			</view>
		</view>
		<view class="apply_content" >
			<view class="member_info">部门</view>
			<view>
				 <input class="member_input" type="text" value="" />
			</view>
		</view>
		<view  class="apply_uploading">
			<view class="uploading_text">
				上传证件
			</view>
			<view class="uploading_credentials">
				<view class="credentials_box" >
					<image class="credentials_photo" src="/static/images/shangchuan.png" mode=""></image>
					<view class="credentials_text">选择文件</view>
				</view>
			</view>
		</view>
		<view class="apply_button_box">
			<view class="apply_button" @tap="apply">提交申请</view>
		</view>
		<view class="apply_button_box ">
			<view class="apply_button_cancel">取消</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	export default {
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {
			apply() {
				uni.reLaunch({
					url: './submitted'
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
	.apply_member {
		flex-direction: column;
		flex: 1;
	}
	.apply_member .apply_content{
		justify-content: center;
		align-items: center;
		margin-bottom: 39upx;
	}
	.apply_member .apply_title{
		justify-content: center;
		align-items: center;
		margin: 77upx 0 97upx 0;
	}
	.apply_member .member_info{
		width: 131upx;
		color: #666;
		font-size: 32upx;
	}
	.apply_member .member_input{
		margin-left: 28upx;
		width: 440upx;
		height: 66upx;
		font-size: 32upx;
		background:rgba(247,248,250,1);
		border-radius:4px;
	}
	.apply_member .apply_uploading{
		margin-top: 6upx;
	}
	.apply_member .apply_uploading .uploading_credentials .credentials_photo{
		width: 30upx;
		height: 24upx;
	}
	.apply_member .apply_uploading .uploading_text{
		
		margin-left: 79upx;
		margin-right: 35upx;
		width:122upx;
		height:29upx;
		color: #666;
		font-size:30upx;
	}
	.apply_member .apply_uploading .uploading_credentials{
		
	}
	.apply_member .apply_uploading .credentials_box{
		justify-content: center;
		align-items: center;
		width: 193upx;
		height: 50upx;
		color: #666;
		font-size: 26upx;
		background: #01b18d;
	}
	.apply_member .apply_uploading .credentials_box .credentials_text{
		margin-left: 17upx;
	}
	.apply_member .apply_button_box{
		justify-content: center;
	}
	.apply_member .apply_button{
		margin-top: 130upx;
		justify-content: center;
		align-items: center;
		width: 600upx;
		height: 80upx;
		color: #fff;
		background: #01b18d;
		border-radius:4px;
	}
	.apply_member .apply_button_cancel{
		margin-top: 39upx;
		justify-content: center;
		align-items: center;
		width: 600upx;
		height: 80upx;
		color: #666;
		background:rgba(247,248,250,1);
		border-radius:4px;
	}
</style>
