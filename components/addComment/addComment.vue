<template>
	<view class="a_contents" v-if="shows">
		<view class="a_header">
			<view class="a_back">
				<image  @tap="gobacks" class="a_img" src="../../static/images/icon_back.png"></image>
			</view>
			<view class="a_title">评论</view>
			<view class="a_more"></view>
		</view>
		
		<view class="p_textarea">
                <textarea v-model="textarea" class="texts" placeholder="这一刻，我的想法是……"/>
        </view>
		<view class="show_look">
			<text class="s_look s_choose" ref="read_state0" @tap="changestate('unread',0)">想看</text>
			<text class="s_look" ref="read_state1" @tap="changestate('is',1)">在看</text>
			<text class="s_look" ref="read_state2" @tap="changestate('read',2)">看过</text>
		</view>
		<view class="p_tags">
			<view class="tags">标签 : <text class="t_zhushi">（多个标签用空格分格）</text></view>
			<input type="text" placeholder="输入我的标签" class="p_input" v-model="tags">
		</view>
		<view class="setscore">
			<text>评分 :</text>
			<image class="s_star" :src="'../../static/images/icon_star'+(score>=2?'2.png':'.png')" @tap="clickstar(2)"></image>
			<image class="s_star" :src="'../../static/images/icon_star'+(score>=4?'2.png':'.png')" @tap="clickstar(4)"></image>
			<image class="s_star" :src="'../../static/images/icon_star'+(score>=6?'2.png':'.png')" @tap="clickstar(6)"></image>
			<image class="s_star" :src="'../../static/images/icon_star'+(score>=8?'2.png':'.png')" @tap="clickstar(8)"></image>
			<image class="s_star" :src="'../../static/images/icon_star'+(score>=10?'2.png':'.png')" @tap="clickstar(10)"></image>
			<text class="s_score">{{score}}分</text>
		</view>
		<view>
			<text class="sure_btn" @tap="addpl">发布</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea:"",
				score: 0,
				tags:"",
				readstate: "unread"
				
			};
		},
		methods:{
			changestate(state,index){
				this.readstate = state;
				let list = this.$refs;
				for(let i = 0;i<3;i++){
					var name = "read_state"+i;
					if(i == index){
						list[name].$el.className = "s_look s_choose"
					}else{
						list[name].$el.className = "s_look"
					}
				}
			},
			clickstar(data){
				this.score = data;
			},
			gobacks(){
				this.$emit("hideComment",{})
			},
			addpl(){
				if(this.textarea == ""){
					uni.showToast({
						title: "评论内容不能为空!",
						duration: 1500,
						icon: 'none'
					});
					return;
				}
				if(this.score == 0){
					uni.showToast({
						title: "评分不能为0!",
						duration: 1500,
						icon: 'none'
					});
					return;
				}
				this.$emit("addComment",{
					textarea: this.textarea,
					score: this.score,
					tags: this.tags,
					readstate: this.readstate
				});
				this.gobacks();
			},
		},
		components:{
		},
		props:{
			"shows":{
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
.a_contents{
	padding: 0 30upx;
	color: #333;
	position: fixed;
	top: 0;
	left: 0;
	bottom:0;
	right:0;
	background-color: #fff;
	z-index: 199;
}
.a_header{
		background-color: #fff;
		padding: 0 40upx;
		height: 100upx;
		line-height: 100upx;
		display: flex;
		.a_back{
			flex: 1;
			.a_img{
				width: 20upx;
				height: 37upx;
			}
			.a_goback{
				width: 20upx;
				height: 37upx;
			}
		}
		.a_title{
			flex: 1;
			text-align: center;
		}
		.a_more{
			flex: 1;
		}
	}
.p_textarea{
	margin-top: 30upx;
	height: 500upx;
	padding-left: 20upx;
	.texts{
		width: 100%;
		height: 400upx;
	}
}
.show_look{
	margin-top: 30upx;
	.s_look{
		display: inline-block;
		width: 123upx;
		height: 47upx;
		border: 2upx solid #FF546C;
		border-radius: 10upx;
		font-size: 28upx;
		line-height: 47upx;
		text-align: center;
		margin-left: 20upx;
	}
	.s_choose{
		background-color: #FF546C;
		color: #fff;
	}
}
.p_tags{
	padding-left: 20upx; 
	margin-top: 40upx;
	font-size: 30upx;
	.t_zhushi{
		font-size: 26upx;
		color: #666666;
		margin-left: 10upx;
	}
	.p_input{
		width: 100%;
		border: 2upx solid #001F3E;
		border-radius: 4upx;
		margin-top: 20upx;
		box-sizing: border-box;
		padding-left: 20upx;
		color: #666;
		height: 58upx;
	}
}
.setscore{
	padding-left: 20upx; 
	margin-top: 40upx;
	font-size: 30upx;
	.s_star{
		width: 45upx;
		height: 42upx;
		vertical-align: middle;
		margin-left: 20upx;
	}
	.s_score{
		margin-left: 30upx;
	}
}
.sure_btn{
	margin-top: 40upx;
	font-size: 30upx;
	display: inline-block;
	width: 126upx;
	height: 56upx;
	text-align: center;
	line-height: 56upx;
	float: right;
	background-color: #01B18D;
	border-radius: 6upx;
	color: #fff;
	letter-spacing: 4upx;
}
</style>
