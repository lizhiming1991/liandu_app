<template>
	<view class="content">
		<!-- 顶部公用组件 -->
		<Header :titles="title"></Header>
		
		<view class="header">
			<view class="left">
				<image class="userphoto" :src="ImgUrl+(bookinfo.photo?bookinfo.photo:'')"></image>
			</view>
			<view class="right">
				<view class="title">{{bookinfo.name}} <text class="svip">申请会员</text></view>
				<view class="username">{{bookinfo.authorname}}</view>
				<view class="introduce">{{bookinfo.introduce}}</view>
			</view>
		</view>
		<view class="stars">
			<view class="score">{{bookinfo.score}}
				<image class="i_star" :src="'../../static/images/icon_star'+(bookinfo.score>=2?'2.png':'.png')"></image>
				<image class="i_star" :src="'../../static/images/icon_star'+(bookinfo.score>=4?'2.png':'.png')"></image>
				<image class="i_star" :src="'../../static/images/icon_star'+(bookinfo.score>=6?'2.png':'.png')"></image>
				<image class="i_star" :src="'../../static/images/icon_star'+(bookinfo.score>=8?'2.png':'.png')"></image>
				<image class="i_star" :src="'../../static/images/icon_star'+(bookinfo.score>=10?'2.png':'.png')"></image>
			</view>
			<text class="readers">{{bookinfo.hit}}</text>
		</view>
		<view class="stars2">
			<text class="score2">{{allDiss}}人点评过></text>
			<text class="readers2" @tap="goRead">阅读此书></text>
		</view>
		<view class="userinfo">
			<view class="b_title">作者简介</view>
			<view class="b_content">
				{{bookinfo.authorIntro?bookinfo.authorIntro:"暂无简介!" }}
			</view>
		</view>
		
		<!-- 评论列表 -->
		<CommentList :itemData="comList" :allNum="allDiss" :ImgUrl="ImgUrl"></CommentList>
		<!-- 发表评论 -->
		<Comment @showComment="showComments"></Comment>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Comment from '@/components/comment/comment.vue'
	import CommentList from '@/components/commentList/commentList.vue'
	import {mapState} from 'vuex'
	import {get,post} from '@/common/methods.js'
	import {ImgUrl} from '@/common/common.js'
	export default {
		data() {
			return {
				title: "",
				bookinfo: "",
				ImgUrl: "",
				allDiss: 0,
				comList: []
			};
		},
		computed:{
			...mapState([
				"userid"
			])
		},
		onLoad(e){
			this.ImgUrl = ImgUrl;
			console.log(e)
			let bid = e.id;
			get("/book/book/"+bid+"?associatorid="+this.userid).then(res=>{
				if(res.status == 200){
					this.bookinfo = res.data.bookinfo;
				}
				// console.log(res)
			})
			get("/book/book/comment/"+bid+"?associatorid="+this.userid).then(res=>{
				if(res.status == 200){
					this.allDiss = res.data.totalCommentNums;
					this.comList = res.data.gradeList;
					console.log(res)
				}
			})
			
		},
		methods:{
			showComments(){
				uni.navigateTo({
					url:"pages/addComment/addComment"
				})
			},
			goRead(){
				uni.navigateTo({
					url:"/pages/books/readBook"
				})
				
			}
		},
		components:{
			Header,
			Comment,
			CommentList
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F8F8F8;
		font-size: 28upx;
		padding-bottom: 95upx;
	}
	.header{
		padding: 30upx 30upx 0; 
		display: flex;
		.left{
			width: 184upx;
			height: 299upx;
			.userphoto{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex: 1;
			padding-left: 30upx;
			.title{
				font-size: 38upx;
				.svip{
					float: right;
					font-size: 28upx;
					display: inline-block;
					width: 200upx;
					height: 58upx;
					background-color: #FF546C;
					text-align: center;
					line-height: 58upx;
					color: #fff;
				}
			}
			.username{
				margin: 30upx 0;
			}
			.introduce{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				line-height: 1.5;
			}
		}
	}
	.stars{
		padding: 0 30upx;
		margin-top: 50upx;
		.score{
			display: inline-block;
			font-size: 44upx;
			color: #FFC900;
			.i_star{
				margin-left: 8upx;
				width: 29upx;
				height: 26upx;
			}
			.i_star:nth-child(1){
				margin-left: 16upx;
			}
		}
		.readers{
			float: right;
			font-size: 44upx;
			font-weight: 700
		}
	}
	.stars2{
		padding: 0 30upx;
		margin-top: 8upx;
		font-size: 22upx;
		.score2{
			
		}
		.readers2{
			float: right;
		}
	}
	.userinfo{
		margin-top: 40upx;
		background-color: #fff;
		padding: 50upx 30upx;
		.b_title{
			font-size: 34upx;
			font-weight: 700;
		}
		.b_content{
			font-size: 28upx;
			color: #666;
			padding-left: 24upx;
			margin-top: 40upx;
		}
	}
	
</style>
