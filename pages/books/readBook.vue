<template>
	<view  class="content">
		<!-- <Header :titles="title"></Header> -->
		<view class="eb_nav">
			<text class="eb_bar" @tap="goBack">返回</text>
			<text class="eb_bar" @tap="changesets">设置</text>
			<text class="eb_bar" @tap="changemulu">目录</text>
		</view>
		<scroll-view class="muluList" scroll-y="true" v-if="showmulu">
			<a class="mulus" :href="item.href" :id="item.id" v-for="(item,index) in navigation" :key="index">{{item.label}}</a>
		</scroll-view>
		<view class="setupList" v-if="showsets">
		        <view id="setting_itemList">
					<view class="f_seting">
						<text class="s_title">设置</text>
						<image class="s_closed" src="../../static/images/icon_cha.png" @tap="closeBtn"></image>
					</view>
		            <view class="readTheme">
		                <text class="s_head">阅读主题：</text> 
		                <view data-theme="#F6F4EC" class="defaultBg s_zt" @tap="changeColor('#F6F4EC')">
		                    <text class="f_color">默认</text>
		                    <text :class="showColor == '#F6F4EC'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#DBEED9" class="green s_zt" @tap="changeColor('#DBEED9')">
		                    <text class="f_color">绿色</text>
		                    <text :class="showColor == '#DBEED9'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#F1DEBD" class="yellow s_zt" @tap="changeColor('#F1DEBD')">
		                    <text class="f_color">黄色</text>
		                    <text :class="showColor == '#F1DEBD'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#E8FDFE" class="blue s_zt" @tap="changeColor('#E8FDFE')">
		                    <text class="f_color">亮蓝</text>
		                    <text :class="showColor == '#E8FDFE'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#F6F6F6" class="white s_zt" @tap="changeColor('#F6F6F6')">
		                    <text class="f_color">白色</text>
		                    <text :class="showColor == '#F6F6F6'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#DED6D6" class="gray s_zt" @tap="changeColor('#DED6D6')">
		                    <text class="f_color">灰色</text>
		                    <text :class="showColor == '#DED6D6'? 'f_check f_choose':'f_check'"></text>
		                </view>
		                <view data-theme="#FDD9D9" class="pink s_zt" @tap="changeColor('#FDD9D9')">
		                    <text class="f_color">粉色</text>
		                    <text :class="showColor == '#FDD9D9'? 'f_check f_choose':'f_check'"></text>
		                </view>
		            </view>
		            <view id="fontFamilyBox">
		                <text class="s_head">正文字体：</text> 
		                <text :class="showfont =='Simsun'? 'songti s_font select':'songti s_font'" @tap="changeFont('Simsun')">宋体</text>
		                <text :class="showfont =='Microsoft YaHei'? 'yahei s_font select':'yahei s_font'" @tap="changeFont('Microsoft YaHei')">雅黑</text>
		                <text :class="showfont =='kaiti'? 'kaishu s_font select':'kaishu s_font'" @tap="changeFont('kaiti')">楷书</text>
		            </view>
		            <view class="fontSizes">
						<text class="s_head">字体大小：</text>
		                <text class="s_btn small" @tap="changeFonts(0)">A-</text> 
						<text class="s_btn">{{fontsize}}</text>
		                <text class="s_btn big" @tap="changeFonts(1)">A+</text>
		            </view>
		            
		        </view>
		  </view>
		<view id="books" ref="b_content"></view>
		<view class="eb_pages">
			<text v-if="showleft" class="eb_left" @tap="prevPage">上一页</text>
			<text v-if="showright" class="eb_right" @tap="nextPage">下一页</text>
		</view>
	</view>
	
</template>

<script>
	import 'url-search-params-polyfill';
	import ePub from 'epubjs/dist/epub.min.js'
	import {ImgUrl} from '@/common/common.js'
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	export default{
		data(){
			return {
				title: "",
				book: "",
				rendition:"",
				showleft: false,
				showright: true,
				navigation :"",
				locations: "",
				showmulu: false,
				booktitle: "",
				bookuser: "",
				bookimg: "",
				showColor: "#F6F4EC",
				showsets: false,
				showfont: "Simsun",
				fontsize:  18,
			}
		},
		onLoad(e){
			this.book = new ePub(ImgUrl + e.bookpath);
			this.rendition = this.book.renderTo('books', {
				width: window.innerWidth-20,
				height: window.innerHeight-100,
				method: 'default'
			})
			this.rendition.display()
		},
		onReady(){
			// this.rendition.themes.fontSize("18px");
			// this.rendition.themes.font("宋体");
			this.book.ready.then(() => {
				// 生成目录
				this.navigation = this.book.navigation.toc
				// 生成Locations对象
				return this.book.locations.generate()
			  }).then(result => {
				// 保存locations对象
				this.locations = this.book.locations
				// 标记电子书为解析完毕状态
			});
			this.book.loaded.metadata.then((meta)=> {
				this.booktitle = meta.title;
				this.bookuser = meta.creator;
				if (this.book.archive) {
					this.book.archive.createUrl(this.book.cover).then((url)=> {
						this.bookimg = url;
					})
				} else {
					this.bookimg = this.book.cover;
				}
			});
			
		},
		methods: {
			prevPage() {
				if (this.rendition) {
				  this.rendition.prev()
				}
			},
			nextPage() {
				if (this.rendition) {
					this.showleft = true;
					this.rendition.next()
				}
			},
			changemulu(){
				this.showsets = false;
				this.showmulu = !this.showmulu;
			},
			changesets(){
				this.showmulu = false;
				this.showsets = !this.showsets;
			},
			closeBtn(){
				this.showsets = false;
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			changeColor(num){
				this.showColor = num;
				this.$refs.b_content.$el.style.backgroundColor = num;
			},
			changeFont(name){
				this.showfont = name;
				this.rendition.themes.font(name);
			},
			changeFonts(type){
				if(type == 0){
					this.fontsize = this.fontsize -1;
				}else{
					this.fontsize = this.fontsize +1;
				}
				this.rendition.themes.fontSize(this.fontsize+"px");
			},
			
			
		},
		components:{
			Header
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10upx 20upx 120upx;
		height:  100%;
		background-color: #F6F4EC;
		.eb_nav{
			height: 80upx;
			font-size: 30upx;
			.eb_bar{
				display: inline-block;
				width: 100upx;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				margin: 16upx 30upx 0 0;
				box-shadow: 0 0 10upx #BBB;
			}
		}
		.eb_pages{
			font-size: 32upx;
			margin-top: 4upx;
			.eb_left{
				display: inline-block;
				width: 180upx;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				box-shadow: 0 0 10upx #BBB;
				
			}
			.eb_right{
				display: inline-block;
				width: 180upx;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				box-shadow: 0 0 10upx #BBB;
				float: right;
			}
		}
		#books{
			box-shadow: 0 0 30upx 0 #CCC;
			background-color: #F6F4EC;
			font-family: Simsun;
		}
		.muluList{
			padding: 20upx;
			position: fixed;
			top: 80upx;
			left: 20upx;
			bottom: 20upx;
			z-index: 999;
			right: 20upx;
			background-color: #fff;
			.mulus{
				display: block;
				width: 100%;
				height: 60upx;
				font-size: 30upx;
				text-decoration: none;
				color: #333;
			}
		}
		.setupList{
			padding: 20upx;
			position: fixed;
			top: 80upx;
			left: 20upx;
			right: 20upx;
			bottom: 40upx;
			z-index: 999;
			background-color: #fff;
			.s_title{
				font-size: 36upx;
			}
			.s_closed{
				float: right;
				width: 30upx;
				height: 30upx;
				margin-top: 10upx;
			}
			.readTheme{
				margin-top: 50upx;
				height: 80upx;
				display: flex;
				.s_head{
					font-size: 32upx;
					float: left;
					margin-top: 10upx;
				}
				.s_zt{
					flex: 1;
					display: inline-block;
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
					position: relative;
					box-shadow: 0 4upx 2upx #BBB;
					margin-right: 10upx;
					.f_color{
						display: none;
						text-align: center;
						font-size: 24upx;
						position: absolute;
						top: -40upx;
						left: -8upx;
						width: 81upx;
						height:  40upx;
						background: url("../../static/images/grayTip.png") no-repeat;
						-webkit-background-size: 100%;
						background-size: 100%;
						
					}
					.f_check{
						display: none;
						position: absolute;
						left: 22upx;
						top: 24upx;
						width: 18upx;
						height: 14upx;
						background: url("../../static/images/act.png") no-repeat;
					}
					.f_choose{
						display: inline;
					}
					
				}
				.s_zt:hover .f_color{
					display: inline;
				}
				.defaultBg{
					background-color: #F6F4EC;
				}
				.green{
					background-color: #DBEED9;
				}
				.yellow{
					background-color: #F1DEBD;
				}
				.blue{
					background-color: #E8FDFE;
				}
				.white{
					background-color: #F6F6F6
				}
				.gray{
					background-color: #DED6D6;
				}
				.pink{
					background-color: #FDD9D9;
				}
			}
			#fontFamilyBox{
				margin-top: 30upx;
				.s_head{
					font-size: 32upx;
					float: left;
					margin-top: 10upx;
				}
				.s_font{
					display: inline-block;
					border: 1px solid #D9D9D9;
					width: 106upx;
					height: 56upx;
					line-height: 56upx;
					box-shadow: 0 2upx 2upx #ECECEC;
					border-radius: 10upx;
					font-size: 26upx;
					text-align: center;
					margin-right: 20upx;
				}
				.select{
					color: #CC2931;
				}
				.songti{
					font-family: Simsun;
				}
				.yahei{
					font-family: Microsoft YaHei;
				}
				.kaishu{
					font-family: kaiti;
				}
			}
			.fontSizes{
				height: 60upx;
				margin-top: 30upx;
				font-size: 32upx;
				.s_head{
					float: left;
					margin-top: 4upx;
				}
				.s_btn{
					display: inline-block;
					width: 120upx;
					height: 52upx;
					text-align: center;
					border: 1px solid #D9D9D9;
					box-shadow: 0 1px 0 #ECECEC;
					border-radius: 10upx;
					margin-right: 10upx;
					line-height: 52upx;
				}
			}
		}
	}
</style>
