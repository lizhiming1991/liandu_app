<template>
	<view>
		<view class="tablist">
			<view class="tabs">
				<scroll-view ref="b_scroll" scroll-y="true" class="scroll-Y" >
					<view  :class="tapindex == -1?'t_list checks':'t_list'" @tap="changelist('',-1)" key="-1">全部</view>
		            <view  :class="tapindex == index?'t_list checks':'t_list'" @tap="changelist(item.id,index)" v-for="(item,index) in typedata" :key="index">{{item.name}}</view>
		        </scroll-view>
			</view>
			
			<scroll-view ref="b_scrolls" scroll-y="true"  class="booklist" @scrolltolower="getMore">
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
				<!-- <uniLoadMore :status="messages" ></uniLoadMore> -->
			</scroll-view>
			
		</view>
	</view>
	
</template>

<script>
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		data (){
			return{
				imgerror:"",
				tapindex: -1,
				
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
				this.tapindex = index;
				this.$emit("changelist",{"id":id});
			},
			gettext(ispay,ispub){
				if(ispub == 0){
					return "企业"
				}else if(ispay == 1){
					return "付费"	
				}
			},
			getMore(){
				this.$emit("getMorebook",{});
			}
		},
		components:{
			// uniLoadMore
		},
		props:[
			"bookdata",
			"typedata",
			"ImgUrl",
			// "messages"
		]
			
	}
</script>

<style lang="scss" scoped>
	
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
				border-left: 10upx solid #01B18D;
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
