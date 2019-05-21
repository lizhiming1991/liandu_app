<template>
	<view class="content">
		<Header></Header>
		<view class="b_search">
			<view class="b_box">
				<input class="b_input" type="text" placeholder="图书名称或关键字"/>
				<image class="b_searchimg" src="../../static/images/icon_search_small.png"></image>
			</view>
			
		</view>
		<view class="tablist">
			<view class="tabs">
				<scroll-view  scroll-y="true" class="scroll-Y" >
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                    <view class="t_list">1</view>
                </scroll-view>
				
				
			</view>
			<view class="booklist">
				<view class="part" @tap="goDetail()">
					<view class="bk_img">
						<image class="bk_pic" src="../../static/image/sta_tushu.png"></image>
						<!-- <text class="bk_jx">精选</text> -->
					</view>
					<view class="bk_pro">
						<view class="bk_name">
							<text>冰与火之歌</text>
							<text class="col_red">￥9.9</text>
						</view>
						<view class="bk_username">乔治.R.R.马丁</view>
						<view class="bk_text">这里写简介这里写简介这里写简介这里介这里写简介这里写简介这里写简介介这...</view>
					</view>
				</view>
				<view class="part">
					<view class="bk_img">
						<image class="bk_pic" src="../../static/image/sta_tushu.png"></image>
						<!-- <text class="bk_jx">精选</text> -->
					</view>
					<view class="bk_pro">
						<view class="bk_name">
							<text>冰与火之歌</text>
							<text class="col_red">￥9.9</text>
						</view>
						<view class="bk_username">乔治.R.R.马丁</view>
						<view class="bk_text">这里写简介这里写简介这里写简介这里介这里写简介这里写简介这里写简介介这...</view>
					</view>
				</view>
				<view class="part">
					<view class="bk_img">
						<image class="bk_pic" src="../../static/image/sta_tushu.png"></image>
						<!-- <text class="bk_jx">精选</text> -->
					</view>
					<view class="bk_pro">
						<view class="bk_name">
							<text>冰与火之歌</text>
							<text class="col_red">￥9.9</text>
						</view>
						<view class="bk_username">乔治.R.R.马丁</view>
						<view class="bk_text">这里写简介这里写简介这里写简介这里介这里写简介这里写简介这里写简介介这...</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goDetail(){
				uni.navigateTo({
					url:"./bookDetails"
				})
			}
		},
		components:{
			Header
		}
	}
</script>

<style lang="scss" scoped>
.scroll-Y::-webkit-scrollbar {display:none}
.content{
	padding-bottom: 100upx;
}
.b_search{
	width: 100%;
	height: 90upx;
	background-color: #EEEEEE;
	display: flex;
	padding: 17upx 30upx;
	box-sizing: border-box;
	.b_box{
		flex: 1;
		position: relative;
		.b_searchimg{
			width: 22upx;
			height: 24upx;
			position: absolute;
			left: 24upx;
			top: 16upx;
		}
		.b_input{
			width: 100%;
			height: 56upx;
			background-color: #fff;
			border-radius: 28upx;
			padding-left: 68upx;
			box-sizing: border-box;
			font-size: 24upx;
		}
	}
}
.tablist{
	display: flex;
	.tabs{
		width: 176upx;
		background-color: #F7F8FA;
		.scroll-Y{
			height: 900upx;
		}
		.t_list{
			border-top: 1px solid #EEEEEE;
			border-right: 1px solid #EEEEEE;
			width: 100%;
			height: 88upx;
			text-align: center;
			line-height: 88upx;
			font-size: 28upx;
			box-sizing: border-box;
			cursor: pointer;
		}
	}
	.booklist{
		flex: 1;
		padding: 40upx 0 40upx 40upx;
		.part{
			margin-bottom: 46upx;
		}
		.bk_img{
			width: 143upx;
			height: 231upx;
			position: relative;
			float: left;
			.bk_jx{
				position: absolute;
				left: 0;
				top: 0;
				display: inline-block;
				width: 77upx;
				height: 34upx;
				background-color: #FF546C;
				font-size: 24upx;
				text-align: center;
				line-height: 34upx;
				color: #fff;
			}
		}
		.bk_pro{
			padding-left: 173upx;
			.bk_name{
				font-size: 26upx;
				font-weight: 700;
				margin-top: 10upx;
				.col_red{
					font-weight: 400;
					display: inline-block;
					width: 92upx;
					height: 23upx;
					font-size: 20upx;
					color: #FF546C;
					margin-left: 20upx;
					background-color: #FBDDDC;
					line-height: 23upx;
					text-align: center;
				}
			}
			.bk_username{
				font-size: 22upx;
				margin: 24upx 0 28upx 0
			}
			.bk_text{
				font-size: 20upx;
				letter-spacing: 4upx;
				line-height: 1.3;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
				
		}
		.bk_pic{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
