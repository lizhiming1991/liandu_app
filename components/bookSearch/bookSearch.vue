<template>
	<view class="list_content">
		<view class="showlog">共<text class="col_red">{{numbers}}</text>条相关信息</view>
		<view class="bk_list" v-if="numbers != 0">
			<view class="list_item" v-for="(item,index) in bookList" :key="index" @tap="goDetails(item.id)">
				<view class="list_pic">
					<image class="lt_img" :src="item.photo?(ImgUrl+item.photo):imgerror"></image>
				</view>
				<view class="lt_content">
					<view class="l_title">
						<text class="lt_title" v-html="item.name"></text>
						<text class="lt_price">￥{{item.price}}</text>
					</view>
					<view class="lt_text" v-html="item.introduce"></view>
					<view class="lt_pro">
						<image class="lt_img2" src="../../static/images/user_static.png"></image>
						<text class="lt_name" v-html="item.authorname"></text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="numbers == 0" class="cr_none">
			<image class="cr_noneimg" src="../../static/images/not_found_content.png"></image>
			<view class="cr_text">真遗憾,没有找到相关信息!</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"bookList",
			"ImgUrl",
			"numbers"
		],
		data() {
			return {
				imgerror:"../../static/image/kecheng.png",	
				
			}
		},
		onLoad() {
		},
		methods: {
			goDetails(bid) {
				this.$emit('goDetails',{'id':bid})
			}
		},
	}
</script>

<style scoped lang="scss">
	.list_content{
		padding: 0 70upx;
	}
	.showlog{
		margin-top: 30upx;
		font-size: 20upx;
		.col_red{
			color: red;
		}
	}
	.bk_list{
		margin-top: 30upx;
	}
	.list_item{
		display: flex;
		padding: 30upx 0;
		border-bottom:  1px solid #eee;
		.list_pic{
			width: 131upx;
			height: 209upx;
			.lt_img{
				width: 100%;
				height: 100%;
			}
		}
		.lt_content{
			flex: 1;
			margin-left: 30upx;
			.l_title{
				.lt_title{
					font-size: 26upx;
					font-weight: 700;
					color: #333;
				}
				.lt_price{
					margin-left: 20upx; 
					display: inline-block;
					width: 90upx;
					height: 26upx;
					border-radius: 13upx;
					background-color: #FBDDDC;
					color: #E9534E;
					font-size: 16upx;
					text-align: center;
					line-height: 26upx;
				}
			}
			.lt_text{
				margin-top: 20upx;
				font-size: 22upx;
				line-height: 1.5;
				color: #666;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.lt_pro{
				margin-top: 24upx;
				.lt_img2{
					width: 20upx;
					height: 23upx;
				}
				.lt_name{
					font-size: 20upx;
					color: #333;
					margin-left: 20upx;
				}
			}
		}
	}
	.cr_none{
		text-align: center;
		margin-top: 80upx;
	}
	.cr_noneimg{
		width: 264upx;
		height: 231upx;
		margin: 0 auto;
	}
	.cr_text{
		margin-top: 40upx;
		font-size: 28upx;
	}		
</style>
