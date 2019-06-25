<template>
	<view class="change_password" :style="{height: pageHeight}">
		<Header :titles="title"></Header>
		<view class="input_content">
			<view class="input_box border_style">
				<input type="text" value="" placeholder="旧密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
			<view class="input_box border_style">
				<input type="text" value="" placeholder="新密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
			<view class="input_box">
				<input type="text" value="" placeholder="请再次输入新密码:" placeholder-style="color: #666; font-size: 34upx;"/>
			</view>
		</view>
		<view class="sure_change">确定</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default {
		data() {
			return {
				title: '修改密码',
				pageHeight: '',
			}
		},
		components: {
			Header
		},
		computed: {
			
		},
		onLoad() {
			this.getHeight()
		},
		methods: {
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
