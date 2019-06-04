<template>
	<view class="pl_discuss">
		<view class="d_all">全部评论
			<text class="d_number">({{allNum}}条)</text>
		</view>
		<view class="lists">
			<view class="list" v-for="(item,index) in itemData" :key="index">
				<view class="p_left">
					<image class="u_pic" :src="item.photo?(ImgUrl+item.photo):'../../static/image/sta_userphoto.png'"></image>
				</view>
				<view class="p_right">
					<view class="part1">
						<text class="p_name">{{item.loginname}}</text>
						<view class="p_stars">
							<image class="p_star" :src="'../../static/images/icon_star'+(item.score>=2?'2.png':'.png')"></image>
							<image class="p_star" :src="'../../static/images/icon_star'+(item.score>=4?'2.png':'.png')"></image>
							<image class="p_star" :src="'../../static/images/icon_star'+(item.score>=6?'2.png':'.png')"></image>
							<image class="p_star" :src="'../../static/images/icon_star'+(item.score>=8?'2.png':'.png')"></image>
							<image class="p_star" :src="'../../static/images/icon_star'+(item.score>=10?'2.png':'.png')"></image>
						</view>
					</view>
					<view class="part2">
						<text class="tag0">{{showReadState(item.state)}}</text>
						<text class="tag" v-for="(val,index2) in item.tagList" :key="index2">{{val.tag}}</text>
					</view>
					<view class="part3">
						{{item.content}}
					</view>
					<view class="part4">
						<text>{{item.createtime}}</text>
						<view class="shows">
							<text @tap="showalert(index)">回复({{item.commmentNums}})</text>
							<view class="s_dz">
								<image class="dz_pic" @tap="changepraise(item.isPraise,item.id)" :src="'../../static/images/icon_dz'+(item.isPraise == 0?'.png':'2.png')"></image> 
								{{item.commentLikeNums}}
							</view>
						</view>
					</view>
					<view class="part5" v-if="shownum == index">
						<input class="p_input" v-model="content" type="text" :placeholder="'回复:@'+item.loginname">
						<text class="p_btn" @tap="addaply(item.id)">回复</text>
					</view>
					<view class="part6" v-if="item.commmentNums != 0">
						<view class="replylist" v-for="(val,index3) in item.commentList" :key="index3"><text class="r_name">{{val.loginname}} :</text>{{val.content}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export  default {
		data() {
			return {
				shownum: -1,
				content:""
			}
		},
		methods:{
			showReadState(state){
				if(state == "read"){
					return "看过"
				}
				if(state == "unread"){
					return "想看"
				}
				if(state == "isread"){
					return "在看"
				}
			},
			showalert(index){
				if(index == this.shownum){
					this.shownum = -1;
				}else{
					this.shownum = index;
				}
				
			},
			addaply(pid){
				this.$emit("addreply",{"id":pid,"text":this.content});
				this.shownum = -1;
				this.content = "";
			},
			changepraise(did,pid){
				this.$emit("changepraised",{"id": did,"pid":pid});
			}
		},
		props:[
			"itemData",
			"allNum",
			"ImgUrl",
		]
	}
</script>

<style lang="scss" scoped>
	.pl_discuss{
		padding: 60upx 30upx;
		background-color: #fff;
		border-top: 1px solid #EEEEEE;
		.d_all{
			font-size: 34upx;
			font-weight: 700;
			color: #333;
			.d_number{
				color: #666;
				margin-left: 10upx;
			}
		}
		.lists{
			margin-top: 60upx;
			
			.list{
				margin-bottom: 30upx;
				display: flex;
				.p_left{
					width: 70upx;
					height: 70upx;
					.u_pic{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.p_right{
					padding-bottom: 30upx;
					border-bottom: 2upx solid #ddd;
					flex: 1;
					padding-left: 24upx;
					.part1{
						
						.p_name{
							margin-right: 20upx;
							color: #666;
						}
						.p_stars{
							display: inline-block;
						}
						.p_star{
							margin-right: 4upx;
							width: 29upx;
							height: 26upx;
						}
					}
					.part2{
						font-size: 24upx;
						color: #fff;
						margin-top: 20upx;
						.tag0{
							display: inline-block;
							width: 92upx;
							height: 30upx;
							background-color: #FF546C;
							border-radius: 15upx;
							line-height: 30upx;
							text-align: center;
						}
						.tag{
							display: inline-block;
							width: 92upx;
							height: 30upx;
							background-color: #01B18D;
							border-radius: 15upx;
							line-height: 30upx;
							text-align: center;
							margin-left: 20upx;
						}
					}
					.part3{
						margin-top: 38upx;
						color: #333;
					}
					.part4{
						color: #999;
						font-size: 24upx;
						margin-top: 40upx;
						padding-bottom: 38upx;
						.shows{
							float: right;
							.s_dz{
								display: inline-block;
								margin-left: 20upx;
							}
							.dz_pic{
								width: 28upx;
								height: 27upx;
								margin-right: 4upx;
							}
						}
					}
					.part5{
						padding-bottom: 40upx;
						.p_input{
							width: 100%;
							height: 60upx;
							border: 2upx solid #666;
							border-radius: 8upx;
							padding-left: 20upx;
							box-sizing: border-box;
						}
						.p_btn{
							width: 98upx;
							height: 41upx;
							line-height: 41upx;
							text-align: center;
							display: inline-block;
							background-color: #F5F6FA;
							color: #666;
							font-size: 24upx;
							float: right;
							margin-top: 12upx;
							letter-spacing: 4upx;
							border-radius: 6upx;
						}
					}
					.part6{
						background-color: #F8F8F8;
						margin-top: 30upx;
						padding: 10upx 20upx 30upx;
						color: #666;
						.replylist{
							font-size: 24upx;
							margin-top: 20upx;
							.r_name{
								color: #01B18D;
								margin-right: 10upx;
							}
						}
					}
				}
			}
		}
	}
</style>
