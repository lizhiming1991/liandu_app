<template>
	<view>
		<view class="b_search" ref="b_search">
			<view class="b_box">
				<input class="b_input" type="text" placeholder="图书名称或关键字"/>
				<image class="b_searchimg" src="../../static/images/icon_search_small.png"></image>
			</view>
			
		</view>
		<view class="tablist">
			<view class="tabs">
				<scroll-view ref="b_scroll" scroll-y="true" class="scroll-Y" >
		            <view class="t_list" v-for="(item,index) in typedata" :key="index">{{item.name}}</view>
		        </scroll-view>
			</view>
			
			<scroll-view ref="b_scrolls" scroll-y="true"  class="booklist" >
			   <view class="part" @tap="goDetail(item.id)" v-for="(item,index) in bookdata" :key="index">
			   	<view class="bk_img">
			   		<image class="bk_pic" :src="ImgUrls+item.photo"></image>
			   		<!-- <text class="bk_jx">精选</text> -->
			   	</view>
			   	<view class="bk_pro">
			   		<view class="bk_name">
			   			<text class="b_btitle">{{item.name}}</text>
			   			<text class="col_red">会员专属</text>
			   		</view>
			   		<view class="bk_username">{{item.authorname}}</view>
			   		<view class="bk_text">这里写简介这里写简介这里写简介这里介这里写简介这里写简介这里写简介介这...</view>
			   	</view>
			   </view>
			</scroll-view>
			
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data (){
			return{
				
				
			}
		},
		onLoad(){
		},
		onShow(){
		},
		onReady(){
			console.log(this.bookdata)
		},
		methods:{
			goDetail(bid){ 
				this.$emit("goDetail",{"id":bid});
			},
		},
		props:[
			"bookdata",
			"typedata",
			"ImgUrls"
		]
			
	}
</script>

<style lang="scss" scoped>
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
				height: 1100upx;
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
			padding: 20upx 0 0 40upx;
			height: 1100upx;
			box-sizing: border-box;
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
					.b_btitle{
						width: 60%;
						display: inline-block;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.col_red{
						font-weight: 400;
						display: inline-block;
						width: 100upx;
						height: 26upx;
						font-size: 20upx;
						color: #FF546C;
						margin-left: 20upx;
						background-color: #FBDDDC;
						line-height: 26upx;
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
