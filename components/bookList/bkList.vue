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
					<view ref="taplist0" class="t_list checks" @tap="changelist('',-1)" key="-1">全部</view>
		            <view ref="taplist" class="t_list" @tap="changelist(item.id,index)" v-for="(item,index) in typedata" :key="index">{{item.name}}</view>
		        </scroll-view>
			</view>
			
			<scroll-view ref="b_scrolls" scroll-y="true"  class="booklist" >
			   <view class="part" @tap="goDetail(item.id)" v-for="(item,index) in bookdata" :key="index">
			   	<view class="bk_img">
			   		<image class="bk_pic" :src="item.photo?(ImgUrl+item.photo):imgerror"></image>
			   		<!-- <text class="bk_jx">精选</text> -->
			   	</view>
			   	<view class="bk_pro">
			   		<view class="bk_name">
			   			<text class="b_btitle">{{item.name}}</text>
			   			<text class="col_red" v-if="item.ispay ==1 || item.ispublic == 0">{{gettext(item.ispay,item.ispublic)}}</text>
			   		</view>
			   		<view class="bk_username">{{item.authorname}}</view>
			   		<view class="bk_text">{{item.introduce}}</view>
			   	</view>
			   </view>
			</scroll-view>
			
		</view>
	</view>
	
</template>

<script>
	// import {uniLoadMore} from '@dcloudio/uni-ui'
	export default {
		data (){
			return{
				imgerror:""
				
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		onReady(){
		},
		methods:{
			goDetail(bid){ 
				this.$emit("goDetail",{"id":bid});
			},
			changelist(id,index){
				if(index == -1){
					this.$refs.taplist0.$el.className = "t_list checks";
					this.$refs.taplist.map((v,i)=>{
						this.$refs.taplist[i].$el.className = "t_list";
					})			
				}else{
					this.$refs.taplist0.$el.className = "t_list";
					this.$refs.taplist.map((v,i)=>{
						if(i == index){
							this.$refs.taplist[i].$el.className = "t_list checks";
						}else{
							this.$refs.taplist[i].$el.className = "t_list";
						}
					})			
				}
				
				this.$emit("changelist",{"id":id});
			},
			gettext(ispay,ispub){
				if(ispub == 0){
					return "企业"
				}else if(ispay == 1){
					return "付费"	
				}
			}
		},
		components:{
			// uniLoadMore
		},
		props:[
			"bookdata",
			"typedata",
			"ImgUrl"
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
				height: 1200upx;
			}
			.checks{
				color: #01B18D;
				border-left: 6upx solid #01B18D;
				box-sizing: border-box;
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
			height: 1200upx;
			box-sizing: border-box;
			.part{
				margin-bottom: 46upx;
			}
			.bk_img{
				width: 143upx;
				height: 231upx;
				position: relative;
				float: left;
				.bk_pic{
					width: 100%;
					height: 100%;
				}
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
				height: 231upx;
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
						height: 30upx;
						font-size: 20upx;
						color: #FF546C;
						margin-left: 20upx;
						background-color: #FBDDDC;
						line-height: 30upx;
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
			
		}
	}
</style>
