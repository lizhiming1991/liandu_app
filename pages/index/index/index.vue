<template>
	<view class="index_content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		
		
		<view class="lg_head">
			<text class="lg_title">首页</text>
			
			<view class="lg_right">
				<navigator url="/pages/searchIndex/searchIndex" class="lg_searchs">
					<image class="lg_search" src="/static/images/icon_search.png"></image>
				</navigator>
				
				<image class="lg_ewm" src="/static/images/icon_erweima.png"></image>
			</view>
		</view>
		<view>
			<swiper class="swiper lg_lunbo"  indicator-dots="true" autoplay="true" interval="3000" duration="300" >
				
			    <swiper-item v-for="(item,index) in picArr" :key="index">
			    	<image class="lg_lb_pic swiper-item"  :src="item.photo?(imgurl+item.photo):imgerror"  ></image>
			    </swiper-item>
			            
			</swiper>
		</view>
		<view class="lg_navbar">
			<view class="lg_navbars">
				<view class="lg_navbar_item">
					<navigator class="lg_navbar_link" url="/pages/books/bookList">
						<text class="lg_tname">书籍专栏</text>
						<image class="lg_tpic" src="/static/images/icon_sjzl.png"></image>
						<text class="lg_line"></text>
					</navigator>
				</view>
				<view class="lg_navbar_item">
					<text class="lg_tname">休闲杂志</text>
					<image class="lg_tpic" src="/static/images/icon_xxzz.png"></image>
					<text class="lg_line"></text>
				</view>
				<view class="lg_navbar_item">
					<text class="lg_tname">音频专栏</text>
					<image class="lg_tpic" src="/static/images/icon_ypzl.png"></image>
					<text class="lg_line"></text>
				</view>
			</view>
			<view class="lg_navbars">
				<view class="lg_navbar_item">
					<text class="lg_tname">视频专栏</text>
					<image class="lg_tpic" src="/static/images/icon_spzl.png"></image>
					<text class="lg_line"></text>
				</view>
				<view class="lg_navbar_item">
					<text class="lg_tname">直播专栏</text>
					<image class="lg_tpic" src="/static/images/icon_zbzl.png"></image>
					<text class="lg_line"></text>
				</view>
				<view class="lg_navbar_item">
					<text class="lg_tname">敬请期待</text>
					<image class="lg_tpic" src="/static/images/icon_jqqd.png"></image>
					<text class="lg_line"></text>
				</view>
			</view>
		</view>
		<view class="lg_hots">
			<text class="lg_hots_title">热门专题</text>
			<view class="lg_scrollbox">
				<scroll-view  scroll-x="true"  class="scroll-view_H lg_lt_scroll">
                    <view class="lg_lt_item">
						<image class="lg_hots_pic" src="/static/image/sta_zhuanti.png"></image>
						<text class="lg_hots_hot">HOT</text>
					</view>
					<view class="scroll-view-item_H lg_lt_item">
						<image class="lg_hots_pic" src="/static/image/sta_zhuanti.png"></image>
						<text class="lg_hots_hot">HOT</text>
					</view>
					<view  class="scroll-view-item_H lg_lt_item">
						<image class="lg_hots_pic" src="/static/image/sta_zhuanti.png"></image>
						<text class="lg_hots_hot">HOT</text>
					</view>
					<view  class="scroll-view-item_H lg_lt_item">
						<image class="lg_hots_pic" src="/static/image/sta_zhuanti.png"></image>
						<text class="lg_hots_hot">HOT</text>
					</view>
					<view  class="scroll-view-item_H lg_lt_item">
						<image class="lg_hots_pic" src="/static/image/sta_zhuanti.png"></image>
						<text class="lg_hots_hot">HOT</text>
					</view>
                </scroll-view>
				
			</view>
		</view>
		
		<view class="lg_Magazine">
			<view class="lg_mag_top">
				<text class="lg_mag_title">杂志精选</text>
				<!-- <text class="lg_mag_more">查看更多</text> -->
			</view>
			<view class="lg_mag_list">
				<view class="lg_mag_part" v-for="(item,index) in magList1" :key="index">
					<view class="lg_mag_img">
						<image class="lg_mag_pic" :src="item.photo?(imgurl+item.photo):imgerror" @error="imgerr"></image>
						<text v-show="item.ispay" class="lg_mag_pay">收费</text>
						<text v-show="!item.ispublic" class="lg_mag_vip">会员</text>
						<text class="lg_mag_dingyue">订阅</text>
					</view>
					<view class="lg_mag_name">{{item.name}}</view>
				</view>
			</view>
			<view class="lg_mag_list" v-if="magList2">
				<view class="lg_mag_part" v-for="(item,index) in magList2" :key="index">
					<view class="lg_mag_img">
						<image class="lg_mag_pic" :src="item.photo?(imgurl+item.photo):imgerror" @error="imgerr"></image>
						<text class="lg_mag_pay">收费</text>
						<text class="lg_mag_vip">会员</text>
						<text class="lg_mag_dingyue">订阅</text>
					</view>
					<view class="lg_mag_name">{{item.name}}</view>
				</view>
			</view>
			<view class="lg_mag_list" v-if="magList3">
				<view class="lg_mag_part" v-for="(item,index) in magList3" :key="index">
					<view class="lg_mag_img">
						<image class="lg_mag_pic" :src="item.photo?(imgurl+item.photo):imgerror" @error="imgerr"></image>
						<text class="lg_mag_pay">收费</text>
						<text class="lg_mag_vip">会员</text>
						<text class="lg_mag_dingyue">订阅</text>
					</view>
					<view class="lg_mag_name">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="line"></view>
		<view class="lg_vbook">
			<view class="lg_bk_title">图书精选</view>
			<view class="lg_bk_cont">
				<view class="lg_bk_list" v-for="(item,index) in bookList" :key="index">
					<view class="lg_bk_img">
						<image class="lg_mag_pic" :src="item.photo?(imgurl+item.photo):imgerror" @error="imgerr"></image>
						<text class="lg_bk_jx">精选</text>
					</view>
					<view class="lg_bk_pro">
						<view class="lg_bk_name">
							<text>{{item.name}}</text>
							<text class="col_red">￥{{item.price}}/年</text>
						</view>
						<view class="lg_bk_username">{{item.authorname}}</view>
						<view class="lg_bk_text">{{item.introduce}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/* import {uniBadge} from '@dcloudio/uni-ui' */
	import {ImgUrl} from '@/common/common.js'
	import Icon from '@/components/uni-icon/uni-icon.vue'
	import {get,post} from '@/common/methods.js'
	export default {
		data() {
			return {
				picArr: [],
				staPic: "/static/image/sta_lunbo.png",
				magList1: [],
				magList2: [],
				magList3: [],
				bookList: [],
				imgurl: "",
				imgerror: "/static/image/sta_zazhi.png",
				b_length: 3,
				m_length: 3,
			}
		},//http://sitadmin.dailyld.com/attached/image/20190220/20190220162433_Vdp5.jpg
		onLoad:function(e){
			post('/book/banner/query',{'type' : 1, 'terminal' : 2}).then(res=>{
				if(res.status == 200){
					this.picArr = res.data.picinfo;
				}
				
			},err=>{
				//异步错误处理
			});	
			get('/book/recommend',{'book_length' : this.b_length, 'maganize_length' : this.m_length}).then(res=>{
				if(res.status == 200){
					this.bookList = res.data.recomment_books;
					var list = res.data.recomment_magazines;
					if(list.length<=3){
						this.magList1 = list;
					}else if(list.length<=6){
						this.magList1 = list.splice(0,3);
						this.magList2 = list.splice(3,6);
					}else{
						this.magList1 = list.splice(0,3);
						this.magList2 = list.splice(3,6);
						this.magList3 = list.splice(6,9);
					}
				}
			})
		   
		},
		
		onShow(){
			
		},
		onReady(){
			this.imgurl = ImgUrl;
		},
		methods: {
			imgerr(){
				return "/static/image/sta_zazhi.png";
			}
			
		},
		components: {
			// uniBadge,
			Icon
			}
	}
</script>

<style lang="scss" scoped>
	@import './../../../common/common.css';
	.element::-webkit-scrollbar {display:none}
	.index_content{
		padding: 0 20upx;
		color: $title-color;
		padding-bottom: 120upx;
		.lg_head{
			height: 86upx;
			margin-top: 60upx;
			.lg_title{
				font-size: $title-size;
				font-weight: 700;
			}
			.lg_right{
				float: right;
				.lg_searchs{
					width: 51upx;
					height: 51upx;
					display: inline-block;
					margin-right: 37upx;
				}
				.lg_search{
					width: 51upx;
					height: 51upx;
					
				}
				.lg_ewm{
					width: 49upx;
					height: 49upx;
				}
			}
			 
			
		}
		.lg_lunbo{
			width: 100%;
			height: 342upx;
			
			.lg_lb_pic{
				width: 100%;
			}
		}
		.lg_navbar{
			width: 100%;
			margin-top: 40upx;
			.lg_navbars{
				display: flex;
				margin-top: 26upx; 
				.lg_navbar_item{
					flex: 1;
					box-shadow: 0 5upx 5upx 1upx rgba(228,229,233,0.5);
					border-radius: 10upx;
					background-color: #E4E5E9;
					margin-left: 27upx;
					height: 124upx;
					box-sizing: border-box;
					padding-left: 14upx;
					position: relative;
					.lg_tname{
						display: inline-block;
						font-size: 30upx;
						width: 60upx;
						margin-top: 10upx;
					}
					.lg_tpic{
						width: 70upx;
						height: 74upx;
						transform: translateY(20upx);
						-webkit-transform: translateY(20upx);
						-moz-transform: translateY(20upx);
						-ms-transform: translateY(20upx);
						margin-left: 44upx;
					}
					.lg_line{
						position: absolute;
						left: 0;
						top: 20upx;
						width: 7upx;
						height: 22upx;
						background-color: #71D3BF;
					}
					.lg_navbar_link{
						width: 100%;
						height: 124upx;
					}
				}
				.lg_navbar_item:nth-child(1){
					margin-left: 0;
				}
			}
		}
		.lg_hots{
			width: 100%;
			height: 452upx;
			background-color: #F5F6FA;
			margin-top: 56upx;
			.lg_hots_title{
				width: 100%;
				height: 452upx;
				line-height: 150upx;
				font-size: $title-size;
				font-weight: 700;
				letter-spacing: 4upx;
			}
			.lg_scrollbox{
				width: 100%;
				height: 245upx;
				// overflow: hidden;
				overflow-y: scroll;
			}
			.lg_lt_scroll{
				height: 245upx;
				width: 1575upx;//计算值
				.lg_lt_item{
					display: inline-block;
					position: relative;
					.lg_hots_pic{
						height: 245upx;
						width: 285upx;
						margin-right: 30upx;
					}
					.lg_hots_hot{
						position: absolute;
						right: 24upx;
						top: 0;
						width: 77upx;
						height: 35upx;
						background-color: #FF546C;
						color: #fff;
						font-size: 24upx;
						line-height: 35upx;
						text-align: center;
					}
				}
				
				
			}
		}
		.lg_Magazine{
			width: 100%;
			// height: 596upx;
			background-color: #fff;
			padding-bottom: 70upx;
			.lg_mag_top{
				margin-top: 44upx;
				
				position: relative;
				.lg_mag_title{
					letter-spacing: 4upx;
					font-weight: 700;
					font-size: $title-size;
				}
				.lg_mag_more{
					position: absolute;
					font-size: 28upx;
					color: #666;
					right: 0;
					top: 0;
					cursor: pointer;
				}
			}
			.lg_mag_list{
				
				margin-top: 54upx;
				display: flex;
				.lg_mag_part{
					flex: 1;
					text-align: center;
					margin-left: 50upx;
					.lg_mag_img{
						width: 203upx;
						height: 325upx;
						position: relative;
						.lg_mag_pic{
							width: 100%;
							height: 325upx;
						}
						.lg_mag_pay{
							position: absolute;
							left: 0;
							top: 0;
							background-color: #FF546C;
							display: inline-block;
							width: 77upx;
							height: 34upx;
							font-size: 24upx;
							line-height: 34upx;
							text-align: center;
							color: #fff;
						}
						.lg_mag_vip{
							position: absolute;
							left: 0;
							top: 0;
							background-color: #FF546C;
							display: inline-block;
							width: 77upx;
							height: 34upx;
							font-size: 24upx;
							line-height: 34upx;
							text-align: center;
							color: #fff;
						}
						.lg_mag_dingyue{
							position: absolute;
							right: 0;
							bottom: 0;
							background-color: #53E6C8;
							display: inline-block;
							width: 82upx;
							height: 38upx;
							font-size: 28upx;
							line-height: 38upx;
							text-align: center;
							color: #fff;
						}
					}
					.lg_mag_name{
						width: 203upx;
						text-align: center;
						font-size: 30upx;
						margin-top: 24upx;
					}
				}
				.lg_mag_part:nth-child(1){
					margin-left: 0;
				}
			}
		}
		.line{
			width: 100%;
			height: 8upx;
			background-color: #F5F6FA;
		}
		.lg_vbook{
			width: 100%;
			.lg_bk_title{
				margin-top: 73upx;
				font-weight: 700;
				letter-spacing: 4upx;
				font-size: $title-size;
			}
			.lg_bk_cont{
				.lg_bk_list{
					margin-top: 64upx;
					display: flex;
					.lg_bk_img{
						width: 203upx;
						height: 327upx;
						position: relative;
						.lg_bk_jx{
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
					.lg_bk_pro{
						flex: 1;
						padding-left: 30upx;
						.lg_bk_name{
							font-size: 36upx;
							font-weight: 700;
							.col_red{
								font-weight: 400;
								display: inline-block;
								width: 131upx;
								height: 32upx;
								font-size: 28upx;
								color: #FF546C;
								margin-left: 20upx;
								background-color: #FBDDDC;
								line-height: 32upx;
								text-align: center;
							}
						}
						.lg_bk_username{
							font-size: 30upx;
							margin: 36upx 0 40upx 0
						}
						.lg_bk_text{
							font-size: 28upx;
							letter-spacing: 4upx;
							line-height: 1.5;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
						}
							
					}
					.lg_mag_pic{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		  
	}
	
	
</style>
