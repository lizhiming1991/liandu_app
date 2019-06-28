<template>
	<scroll-view class="cr_details">
		<view class="cr_video">
			<!-- #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO-->
			
			
			<video id="myVideo" :poster="ImgUrl+itemInfo.coverPath" :src="ImgUrl+nowvideo.videoPath"  controls>
				<navigator  open-type="navigateBack" :delta="number" class="cr_backbox">
					<cover-image class="cr_back2" src="../../static/images/arrow-left.png" @click="gobacks"></cover-image>
				</navigator>
			</video>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			
			<video id="myVideo" :poster="ImgUrl+itemInfo.coverPath" :src="ImgUrl+nowvideo.videoPath"  controls>
				<cover-image class="cr_back" @click="goback" src="../../static/images/arrow-left.png">
				</cover-image>
			</video>
			<!-- #endif -->
		</view>
		<view class="cr_pro">
			<text>{{itemInfo.courseName}}</text>
			<text class="cr_score">{{itemInfo.score==null?'暂无评分!':itemInfo.score+'分'}}</text>
			<view class="cr_read">{{itemInfo.hasLearned}}人已学</view>
		</view>
		<view class="taps">
			<text :class="shownum==0?'tapbtn choose':'tapbtn'" @tap="changeType(0)">简介</text>
			<text :class="shownum==1?'tapbtn choose':'tapbtn'" @tap="changeType(1)">目录</text>
		</view>
		<!-- 简介 -->
		<view class="introduce" v-if="shownum == 0">
			<view class="int_box">
				<view class="t_pro">
					<view class="t_kname">课程简介</view>
					<view class="t_conent">{{itemInfo.description}}</view>
				</view>
				<view class="teacher">
					<view class="t_kname">讲师</view>
					<view class="t_img">
						<image class="t_image" :src="ImgUrl+itemInfo.teacherPhoto"></image>
					</view>
					<view class="t_text">{{itemInfo.teacherDescription}}</view>
				</view>
			</view>
			<!-- 评论列表 -->
			<CommentList :itemData="comList"  :allNum="allDiss" :ImgUrl="ImgUrl" @addreply="addreply" @changepraised="changepraise"></CommentList>
		</view>
		<!-- 目录 -->
		<view class="mulu" v-if="shownum == 1">
			<view class="mululist" v-for="(item,index) in itemList" :key="index" @tap="checkless(item,index)">
				<image mode="widthFix" class="m_pic" :src="'../../static/images/cr_video_'+(nowplay == index?'play.png':'static.png')"></image>
				<text class="m_text">第一讲：{{item.lessonName}}</text>
				<image class="m_arrow" src="../../static/images/arr_right.png"></image>
			</view>
		</view>
		<!-- 发表评论组件 -->
		<addComment @addComment="addComments" :shows="isshow" @hideComment="hideComment"></addComment>
		<!-- 点赞评论组件 -->
		<Comment @showComment="showComments" :scid="scid" :dzid="dzid" :datas="sharedata" @changeDZ="changeDZ" @changeSC="changeSC"></Comment>
	</scroll-view>
</template>

<script>
	import Comment from '@/components/comment/comment.vue'
	import {mapState} from 'vuex'
	import {get,post,deletes} from '@/common/methods.js'
	import addComment from '@/components/addComment/addComment.vue'
	import {ImgUrl} from '@/common/common.js'
	import CommentList from '@/components/commentList/commentList.vue'
	import {DisscussItem} from '@/common/config.js'
	export default {
		data(){
			return {
				number: 1,
				isshow: false,
				scid: 0,
				dzid: 0,
				sharedata:{
					"dz": 0,
					"fx": 0,
					"sc": 0
				},
				shownum: 0,
				ImgUrl: "",
				allDiss: 0,
				comList: [],
				kid: 0,
				itemInfo: "",
				itemList: [],
				nowvideo: "",
				nowplay: 0
			}
		},
		computed:{
			...mapState([
				"userid"
			])
		},
		onLoad(e){
			this.ImgUrl = ImgUrl;
			this.kid = e.id;
			get("/course/abundant",{
				userId: this.userid,
				courseId: this.kid
			}).then(res=>{
				if(res.status == 200){
					this.itemInfo = res.data;
				}
			})
			get("/course/lesson/list",{
				courseId: this.kid
			}).then(res=>{
				if(res.status == 200){
					this.itemList = res.data;
					this.nowvideo = res.data[0];
				}
			})
			this.getDisscusslist();
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			gobacks(){
				uni.navigateBack({
					delta: 1
				});
			},
			changeType(num){
				this.shownum = num;
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
			checkless(item,index){
				this.nowvideo = item;
				this.nowplay = index;
			},
			hideComment(){
				this.isshow = false;
			},
			getDisscusslist(){
				get("/social/grade/all",{
					associatorId: this.userid,
					sourceName:"course",
					sourceId: this.kid
				}).then(res=>{
					if(res.status == 200){
						
						let Arr = [];
						res.data.map(item=>{
						    const {associatorId,id,userPhoto,userName,score,state,content,createTime,commentNums,isPraise,praises,comments,tagList} = item;
						    Arr.push(new DisscussItem(associatorId,id,userPhoto,userName,score,state,content,createTime,commentNums,isPraise,praises,comments,tagList))
						});
						this.comList = Arr;
					}
					// console.log(res)
				})
			},
			addComments(obj){
				/* post("/book/book/makeComment",{
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
				}) */
			},
			addreply(){
				
			},
			changepraise(){
				
			},
			changeDZ(){
				console.log(this.dzid)
				
			},
			changeSC(){
				console.log(this.scid)
				
			}
		},
		components: {
			Comment,
			addComment,
			CommentList
		}
	}
	
</script>

<style lang="scss" scoped>
	.cr_details {
		padding-bottom: 80upx;
		.cr_video {
			position: relative;
			.cr_backbox{
				display: inline-block;
				position: absolute;
				left: 30upx;
				top: 40upx;
				z-index: 1999999;
				width: 48upx;
				height: 48upx;
				.cr_back2{
					width: 48upx;
					height: 48upx;
				}
			}
			.cr_back{
				position: absolute;
				left: 30upx;
				top: 20upx;
				z-index: 8;
				width: 48upx;
				height: 48upx;
			}
			#myVideo {
				width: 100%;
				height: 470upx;
			}
		}
		.cr_pro{
			padding: 0 30upx;
			font-size: 34upx;
			color: #080808;
			margin-top: 20upx;
			.cr_score{
				color: #FFC900;
				margin-left: 20upx;
				font-size: 28upx;
			}
			.cr_read{
				text-align: right;
				font-size: 24upx;
				color: #888888;
			}
		}
		.taps{
			margin-top: 20upx;
			border-top: 10upx solid #F7F8FA;
			padding: 20upx 30upx 6upx;
			.tapbtn{
				font-size: 30upx;
				color: #666;
				margin-right: 40upx;
			}
			.choose{
				font-size: 40upx;
				color: #333;
				border-bottom: 6upx solid #71D2BF;
			}
		}
	}
	.mulu{
		padding: 0 30upx;
		margin-top: 10upx;
		.mululist{
			display: flex;
			height: 110upx;
			align-items: center;
			margin-bottom: 10upx;
			.m_pic{
				width: 44upx;
			}
			.m_text{
				flex: 1;
				font-size: 30upx;
				color: #333;
				margin: 0 30upx;
			}
			.m_arrow{
				width: 21upx;
				height: 36upx;
				
			}
		}
	}
	.introduce{
		margin-top: 50upx;
		.int_box{
			padding: 0 30upx;
			.t_pro{
				margin-top: 10upx;
				.t_kname{
					font-size: 34upx;
					font-weight: 700;
					color: #333;
				}
				.t_conent{
					margin-top: 30upx;
					font-size: 28upx;
					color: #666;
					line-height: 1.5;
				}
			}
			.teacher{
				border-top: 2upx solid #EEEEEE; 
				padding: 50upx 0;
				margin-top: 40upx;
				.t_kname{
					font-size: 34upx;
					font-weight: 700;
					color: #333;
				}
				.t_img{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					.t_image{
						width: 150upx;
						height: 150upx;
						border-radius: 50%;
					}
				}
				.t_text{
					margin-top: 30upx;
					font-size: 28upx;
					color: #666;
					line-height: 1.5;
				}
			}
		}
	}
</style>
