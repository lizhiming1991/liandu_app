<template>
	<view class="setup_content">
		<Header :titles="titles"></Header>
		<view class="content_bg_one"></view>
		<view class="setup_option">
			<view class="setup_title">
				头像
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_img" src="/static/image/userphoto.jpeg" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option">
			<view class="setup_title">
				用户名
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option" @tap="toChangePhoneNumber">
			<view class="setup_title">
				手机号
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option" @tap="toChangeDescribe">
			<view class="setup_title">
				描述
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option" @tap="toChangePwd">
			<view class="setup_title" >
				修改密码
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option">
			<view class="setup_title">
				实名认证
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<view class="identification_info">
					已认证
				</view>
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<Ledgement></Ledgement>
		<view class="setup_option">
			<view class="setup_title">
				关于
			</view>
			<view class="flex_layout"></view>
			<view class="setup__photo">
				<image class="setup_icon" src="/static/images/arrow_r.png" mode=""></image>
			</view>
		</view>
		<view class="content_bg_two"></view>
		<view class="log_out_content">
			<view class="log_out" @tap="logOut">
				退出登录
			</view>
		</view>
		<view class="content_bg_two" :style="{height: bottom_height}"></view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	import Ledgement from '@/components/ledgement/ledgement.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				titles: '账号管理',
				bottom_height:''
			};
		},
		components: {
			Header,
			Ledgement
		},
		computed: {
			...mapState([
				"userid"
			])
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.clientHeight = res.windowHeight;
					this.bottom_height = res.windowHeight- 565 + 'px';
				},
			});

		},
		onShow() {

		},
		methods: {
			toChangePwd(){
				uni.navigateTo({
					url: './changePwd'
				})
			},
			toChangePhoneNumber() {
				uni.navigateTo({
					url: './changePhoneNumber'
				});
			},
			toChangeDescribe() {
				uni.navigateTo({
					url: './changeDescribe'
				});
			},
			logOut() {
				uni.showModal({
					title: '提示',
					confirmText: '退出登录',
					cancelText: '取消',
					content: '退出登录之后,企业内容将无法观看',
					success: (res)=> {
					if (res.confirm) {
						 this.$store.dispatch("changeUserid","");
						setTimeout(() => {
					uni.navigateTo({
						url: '../login/phoneLogin'
					})
						}, 800);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
					}
				});
			}
		}
	}
	
	
	
</script>

<style scoped>
	view {
		display: flex;
		flex-direction: row;
		font-size: 34upx;
		color: #666666;
	}

	.setup_content {
		flex-direction: column;
		flex: 1;
	}

	.setup_content .content_bg_one {
		width: 100%;
		height: 16upx;
		background: #EEEEEE;
	}

	.setup_content .content_bg_two {
		width: 100%;
		height: 118upx;
		background: #EEEEEE;
	}

	.setup_content .content_bg_three {
		width: 100%;
		height: 16upx;
		background: #EEEEEE;
	}

	.setup_content .flex_layout {
		flex: 1;
	}

	.setup_content .setup__photo .setup_img {
		width: 64upx;
		height: 64upx;
		border-radius: 50%;
	}

	.setup_content .setup_option {
		align-items: center;
		height: 128upx;
	}

	.setup_content .setup_option .setup_title {
		margin-left: 32upx;
	}

	.setup_content .setup_option .setup__photo {
		margin-right: 29upx;
	}

	.setup_content .setup__photo .setup_icon {
		width: 21upx;
		height: 36upx;
	}

	.setup_content .setup_option .identification_info {
		margin-right: 37upx;
		color: #FF546C;
		font-size: 30upx;
	}

	.setup_content .log_out_content{
		justify-content: center;
		align-items: center;
		height: 88upx;
		
	}
	.setup_content .log_out{
		color: #01B18D;
	}
</style>
