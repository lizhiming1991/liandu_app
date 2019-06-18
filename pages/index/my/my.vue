<template>
	<view class="contents" v-if="showall">
		<view class="m_top">
			<view class="m_head">
				<image class="m_photo" src="../../../static/image/userphoto.jpeg"></image>
				<view class="m_pro">
					<view class="username">测试账号</view>
					<view class="infomation">介绍:一生只求潇潇洒洒这是我的个性签名</view>
				</view>
				<text class="setinfo" @tap="toSetUp">设置</text>
			</view>
			<view class="m_info">
				<view class="m_icon">
					<view class="m_score">200</view>
					<text class="m_sname">积分</text>
				</view>
				<view class="m_icon">
					<view class="m_score">200</view>
					<text class="m_sname">关注</text>
				</view>
				<view class="m_icon">
					<view class="m_score">200</view>
					<text class="m_sname">粉丝</text>
				</view>
			</view>
		</view>
		<view class="m_collection">
			<view class="m_title">我的收藏</view>
			<view class="m_colls">
				<view class="m_list">
					<view class="m_yuan"><image class="books" src="../../../static/images/icon_books.png"></image></view>
					<text class="item_name">书籍</text>
				</view>
				<view class="m_list">
					<view class="m_yuan"><image class="books" src="../../../static/images/icon_videos.png"></image></view>
					<text class="item_name">视频</text>
				</view>
				<view class="m_list">
					<view class="m_yuan"><image class="books" src="../../../static/images/icon_audios.png"></image></view>
					<text class="item_name">音频</text>
				</view>
				<view class="m_list">
					<view class="m_yuan"><image class="books" src="../../../static/images/icon_magas.png"></image></view>
					<text class="item_name">杂志</text>
				</view>
			</view>
			
		</view>
		<view class="m_type">
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons1" src="../../../static/images/my_icon1.png"></image>
				</view>
				<text class="m_names">我的资产</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons2" src="../../../static/images/my_icon2.png"></image>
				</view>
				<text class="m_names">我的订单</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons3" src="../../../static/images/my_icon3.png"></image>
				</view>
				<text class="m_names">我的书架</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons4" src="../../../static/images/my_icon4.png"></image>
				</view>
				<text class="m_names">我的课程</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons5" src="../../../static/images/my_icon5.png"></image>
				</view>
				<text class="m_names">我的活动</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
		</view>
		<view class="m_type">
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons6" src="../../../static/images/my_icon6.png"></image>
				</view>
				<text class="m_names">我的订阅</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons7" src="../../../static/images/my_icon7.png"></image>
				</view>
				<text class="m_names">我的直播</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
			<view class="m_lists">
				<view class="m_box">
					<image class="m_icons8" src="../../../static/images/my_icon8.png"></image>
				</view>
				<text class="m_names">我加入的企业</text>
				<image class="m_right" src="../../../static/images/arr_right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				showall: false
			};
		},
		computed: {
			...mapState([
				"userid"
			])
		},
		onLoad(){
			
			
		},
		onShow(){
			
		},
		methods: {
			toSetUp() {
				uni.navigateTo({
					url:'/pages/account/setUp',
				});
			}
		},
		onReady(){
			if(this.userid == "" || this.userid == undefined || this.userid == "undefined"){
				console.log(33)
				uni.redirectTo({
					url: '/pages/login/phoneLogin',
				});
			}else{
				this.showall = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
.contents{
	background-color: #eee;
}
.m_top{
	padding: 50upx 30upx;
	// height: 448upx;
	background-color: #fff;
	color: #333;
	box-sizing: border-box;
	.m_head{
		display: flex;
		position: relative;
		.m_photo{
			width: 162upx;
			height: 162upx;
			border-radius: 50%;
		}
		.m_pro{
			flex: 1;
			margin-left: 40upx;
			.username{
				font-size: 44upx;
				font-weight: 500;
			}
			.infomation{
				font-size: 28upx;
				color: #333;
				margin-top: 30upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				
			}
		}
		.setinfo{
			position: absolute;
			right: 0;
			top: -40upx;
			font-size: 30upx;
		}
	}
	.m_info{
		margin-top: 78upx;
		display: flex;
		.m_icon{
			flex: 1;
			text-align: center;
			.m_score{
				font-size: 34upx;
			}
			.m_sname{
				font-size: 24upx;
			}
		}
	}
}
.m_collection{
	padding: 50upx 30upx;
	background-color: #fff;
	margin-top: 18upx;
	.m_title{
		font-size: 34upx;
		margin: 10upx 0 50upx;
		letter-spacing: 2upx;
	}
	.m_colls{
		display: flex;
		.m_list{
			flex: 1;
			text-align: center;
			.m_yuan{
				margin-left: 20%;
				width:  100upx;
				height: 100upx;
				border-radius: 50%;
				background:radial-gradient(circle,rgba(33,217,179,1) 0%,rgba(1,177,141,1) 100%);
				display: flex;
				align-items: center;
				justify-content: center;
				.books{
					width: 37upx;
					height: 45upx;
				}
			}
			.item_name{
				font-size: 28upx;
			}
		}
	}
	
	
}
.m_type{
	background-color: #fff;
	padding: 2upx 30upx 60upx;
	margin-top: 18upx;
	.m_lists{
		display: flex;
		margin-top: 80upx; 
		.m_box{
			width: 80upx;
			display: flex;
			justify-content: center;
		}
		.m_icons1{
			width: 45upx;
			height: 35upx;
		}
		.m_icons2{
			width: 32upx;
			height: 39upx;
		}
		.m_icons3{
			width: 40upx;
			height: 35upx;
		}
		.m_icons4{
			width: 39upx;
			height: 38upx;
		}
		.m_icons5{
			width: 38upx;
			height: 41upx;
		}
		.m_icons6{
			width: 35upx;
			height: 48upx;
		}
		.m_icons7{
			width: 49upx;
			height: 43upx;
		}
		.m_icons8{
			width: 46upx;
			height: 43upx;
		}
		.m_names{
			flex: 1;
			font-size: 34upx;
			color: #333;
			margin-left: 30upx;
		}
		.m_right{
			width: 21upx;
			height: 36upx;
		}
	}
}
</style>
