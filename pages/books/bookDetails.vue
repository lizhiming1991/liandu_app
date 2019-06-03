<template>
	<view class="content">
		<!-- 头部公用组件 -->
		<Header :titles="title"></Header>
		
		<view class="header">
			<view class="left">
				<image class="userphoto" :src="ImgUrl+(bookinfo.photo?bookinfo.photo:'')"></image>
			</view>
			<view class="right">
				<view class="title"><text class="bk_titles">{{bookinfo.name}}</text> <text class="svip" @tap="gotoqiye">申请会员</text></view>
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
			<text class="readers2" @tap="goRead(bookinfo.id)">阅读此书></text>
		</view>
		<view class="userinfo">
			<view class="b_title">作者简介</view>
			<view class="b_content">
				{{bookinfo.authorIntro?bookinfo.authorIntro:"暂无简介!" }}
			</view>
		</view>
		
		<!-- 评论列表 -->
		<CommentList :itemData="comList" :allNum="allDiss" :ImgUrl="ImgUrl"></CommentList>
		<!-- 评论入口组件 -->
		<Comment @showComment="showComments" ></Comment>
		<!-- 发表评论组件 -->
		<addComment @addComment="addComments" :shows="isshow" @hideComment="hideComment"></addComment>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Comment from '@/components/comment/comment.vue'
	import CommentList from '@/components/commentList/commentList.vue'
	import addComment from '@/components/addComment/addComment.vue'
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
				comList: [],
				bid: 0,
				isshow: false,
			};
		},
		computed:{
			...mapState([
				"userid"
			])
		},
		onLoad(e){
			this.ImgUrl = ImgUrl;
			let bid = e.id;
			this.bid = e.id;
			get("/book/book/"+bid+"?associatorid="+this.userid).then(res=>{
				if(res.status == 200){
					this.bookinfo = res.data.bookinfo;
				}
				console.log(res)
			})
			this.getDisscusslist();
			
		},
		methods:{
			getDisscusslist(){
				get("/book/book/comment/"+this.bid+"?associatorid="+this.userid).then(res=>{
					if(res.status == 200){
						this.allDiss = res.data.totalCommentNums;
						this.comList = res.data.gradeList;
					}
				})
			},
			showComments(){
				if(this.userid == ""){
					uni.showToast({
						title: "登录后可以评论哦!",
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				this.isshow = true;
			},
			hideComment(){
				this.isshow = false;
			},
			gotoqiye(){
				uni.navigateTo({
					url:"/pages/enterpriseDetails/applyMember?enterpriseName="+""+"&enterpriseLid="+""
				})
				
			},
			goRead(id){
				console.log(this.bid)
				get("/book/book/getBookPath/"+this.bid,{}).then(res=>{
					console.log(res)
					if(res.status == 200){
						if(res.data.type == 1){
							uni.navigateTo({
								url: '/pages/books/readBook2?bookpath='+res.data.path+'&total='+res.data.totalCount
							});
						}else{
							uni.navigateTo({
								url:"/pages/books/readBook?bookpath="+res.data.path
							})
						}
					}
				})
				
			},
			addComments(obj){
				post("/book/book/makeComment",{
					associatorid: this.userid,
					bookid: this.bid,
					score: obj.score,
					state: obj.readstate,
					content: obj.textarea,
					tag: obj.tags
				}).then(res=>{
					if(res.status == 200){
						this.getDisscusslist();
					}else{
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
						});
					}
					console.log(res)
				})
			}
			
		},
		components:{
			Header,
			Comment,
			CommentList,
			addComment
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
			padding-left: 24upx;
			.title{
				width: 100%;
				position: relative;
				.bk_titles{
					width: 300upx;
					font-size: 35upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: inline-block;
				}
				.svip{
					position: absolute;
					right: 0;
					top: 0;
					font-size: 28upx;
					display: inline-block;
					width: 160upx;
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
