<template>
	<view class="journal_content" style="flex-direction: column; flex: 1;">
		<view class="search_lable">
			<view>
				<image class="searc_icon" src="/static/images/sousuo.png" mode=""></image>
			</view>
			<view style="flex: 1;"></view>
			<view class="clear_page">
				<image @tap="toEnterprise" class="clear_icon" src="/static/images/icon_cha.png" mode=""></image>
			</view>
		</view>
		<view class="title_content">
			<view class="title_text">首都艺术家协会1</view>
			<view style="flex: 1;"></view>
			<view class="to_apply">申请会员</view>
		</view>
		<view class="enterprise_info">
			<view class="info_content">
				简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
			</view>
		</view>
		<view class="enterprise_lable">
			<view style="flex: 1;"></view>
			<view class="label_left">
				<image class="detailas_lable" src="/static/images/tag.png" mode=""></image><text class="detailas_text">艺术培训</text>
			</view>
			<view class="label_right">
				<image class="site_lable" src="/static/images/zuobiao.png" mode=""></image><text class="detailas_text">北京</text>
			</view>
		</view>
		<uni-segmented-control style="justify-content: center;" :current="current" activeColor="#01B18D" :values="items"
		 @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
		<view class="list_content">
			
			<view v-show="current === 0">
				<view style="margin: 200upx 200upx; font-size: 28upx;">
					暂无内容,开发中..
				</view>
			</view>
			<!-- 图书列表 start -->
			<view v-show="current === 1">
				<!-- Picker 公共组件 start -->
				<view class="picker_style" >
					<view class="content_search">
						
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="bookSearchChange" :value="bookIndex" :range="bookArray">
										<view class="uni-input">{{bookArray[bookIndex]}}</view>
									</picker>
								</view>
							</view>
						</view>
						<image class="xiala_icon" src="/static/images/xiala_2.png" mode=""></image>
					</view>
				</view>
				<!-- Picker 公共组件 end -->
				
				<view class="content_list">
					<block v-for="(item,index) in bookList" :key="index">
						<view class="book_info">
							<view class="book_cover_content">
								<image class="booK_cover_img" src="/static/image/tushu.png" mode=""></image>
							</view>
							<view class="book_cover_info">
								<view class="">
									<view class="book_title_content">
										<view class="book_title">{{item.name}}</view>
										<view class="book_price" v-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic!='0' || item.ispublic != 0)">￥{{item.price}}</view>
									<view class="book_price" v-else-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic0 == '0' || item.ispublic == 0) ">企业</view>
										<view class="book_price" v-else-if="(item.ispay != '1' || item.ispay != 1) && (item.ispublic=='0' || item.ispublic == 0)">企业</view>
									</view>
								</view>
								<view class="book_author">
									<view class="">
										{{item.authorname}}
									</view>
								</view>
								<view class="book_brief_info">
									{{item.introduce}}
								</view>
							</view>
							
						</view>
					</block>
				</view>
			</view>
			<!-- 图书列表 end -->
			<!-- 杂志列表 start -->
			<view v-show="current === 2">
				<!-- Picker 公共组件 start -->
				<view class="picker_style" >
					<view class="content_search">
						
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="journaSearchChange" :value="journaIndex" :range="journaArray">
										<view class="uni-input">{{journaArray[journaIndex]}}</view>
									</picker>
								</view>
							</view>
						</view>
						<image class="xiala_icon" src="/static/images/xiala_2.png" mode=""></image>
					</view>
				</view>
				<!-- Picker 公共组件 end -->
				<view class="journal_list">
					<block v-for="(item, index) in journalList" :key="index">
						<view class="journal_cover">
							<view>
								<image class="journal_cover_img" src="/static/image/tushu.png" mode=""></image>
							</view>
							<view class="journal_cover_title">
								{{item.name}}
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 杂志列表 end-->
			<!-- 课程列表 start -->
			<view v-show="current === 3">
				<!-- Picker 公共组件 start -->
				<view class="picker_style" >
					<view class="content_search">
						
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="courseSearchChange" :value="courseIndex" :range="courseArray">
										<view class="uni-input">{{courseArray[courseIndex]}}</view>
									</picker>
								</view>
							</view>
						</view>
						<image class="xiala_icon" src="/static/images/xiala_2.png" mode=""></image>
					</view>
				</view>
				<!-- Picker 公共组件 end -->
				<view class="content_list">
					<view class="bottom_border">
						<view class="course_content" style="flex-direction: column;">
							<view class="course_cover">
								<image class="course_cover_img" src="/static/image/kecheng.png" mode=""></image>
							</view>
							<view class="course_title">
								课程名称课程名称课程名称
							</view>
							<view class="course_info">
								<view class="course_teacher">
									<image src="/static/images/laoshi.png" class="course_teacher_icon" mode=""></image>
									<text class="course_teacher_name">李老师</text>
								</view>
								<view class="course_times">
									<image src="/static/images/time_icon_1.png" mode="" class="course_times_icon"></image>
									<text class="course_time_date">2019/1/1-2019/2/2</text>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom_border">
						<view class="course_content" style="flex-direction: column;">
							<view class="course_cover">
								<image class="course_cover_img" src="/static/image/kecheng.png" mode=""></image>
							</view>
							<view class="course_title">
								课程名称课程名称课程名称
							</view>
							<view class="course_info">
								<view class="course_teacher">
									<image src="/static/images/pic_my.png" class="course_teacher_icon" mode=""></image>
									<text class="course_teacher_name">李老师</text>
								</view>
								<view class="course_times">
									<image src="/static/images/pic_my.png" mode="" class="course_times_icon"></image>
									<text class="course_time_date">2019/1/1-2019/2/2</text>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom_border">
						<view class="course_content" style="flex-direction: column;">
							<view class="course_cover">
								<image class="course_cover_img" src="/static/image/kecheng.png" mode=""></image>
							</view>
							<view class="course_title">
								课程名称课程名称课程名称
							</view>
							<view class="course_info">
								<view class="course_teacher">
									<image src="/static/images/pic_my.png" class="course_teacher_icon" mode=""></image>
									<text class="course_teacher_name">李老师</text>
								</view>
								<view class="course_times">
									<image src="/static/images/pic_my.png" mode="" class="course_times_icon"></image>
									<text class="course_time_date">2019/1/1-2019/2/2</text>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom_border">
						<view class="course_content" style="flex-direction: column;">
							<view class="course_cover">
								<image class="course_cover_img" src="/static/image/kecheng.png" mode=""></image>
							</view>
							<view class="course_title">
								课程名称课程名称课程名称
							</view>
							<view class="course_info">
								<view class="course_teacher">
									<image src="/static/images/pic_my.png" class="course_teacher_icon" mode=""></image>
									<text class="course_teacher_name">李老师</text>
								</view>
								<view class="course_times">
									<image src="/static/images/pic_my.png" mode="" class="course_times_icon"></image>
									<text class="course_time_date">2019/1/1-2019/2/2</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 课程列表 end -->
		</view>
	</view>
</template>

<script>
	import {get,post} from '@/common/methods.js';
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				bookArray: ['上传时间','阅读量'],
				journaArray: ['上架时间','阅读量'],
				courseArray: ['上架时间','阅读量'],
				bookIndex: 0,
				journaIndex: 0,
				courseIndex: 0,
				bookList: [],
				journalList: [],
				items: ['主页', '图书', '杂志', '课程'],
				current: 0,
				requiredBooks: {
					"page_index": 1,
					"page_size": 10,
					"table_id": "13",
					"sort": "createtime"
				},
				requiredJournal: {
					"page_index": 1,
					"page_size": 10,
					"table_id": "13",
					"resource_type": 2,
					"sort": "createtime"
				}
			}
		},
		onLoad(e) {
			let isVip = e.joinedState;
			if (isVip == 'init') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					confirmText: '关闭',
					content: '您已申请企业会员，请等待审核。',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击关闭');
						}
					}
				});
			} else if (isVip == 'notVip') {
				uni.showModal({
					title: '提示',
					confirmText: '免费申请',
					cancelText: '我先看看',
					content: '为了更好的享受企业服务，请先申请为企业会员',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: './applyMember'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			} else if (isVip == 'pass') {
				console.log('hello vip')
			}

		},
		methods: {
			bookSearchChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.bookIndex = e.target.value
				if(e.target.value =='1' || e.target.value == 1){
					this.requiredBooks.sort = 'hit'
				}else if(e.target.value =='0' || e.target.value == 0){
					this.requiredBooks.sort = 'createtime'
				}
				post('/book/book/page',this.requiredBooks).then(res=>{
					console.log(res);
					
				},err=>{
					//异步错误处理
				});	
				
			},
			journaSearchChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.journaIndex = e.target.value
				if(e.target.value =='1' || e.target.value == 1){
					this.requiredJournal.sort = 'hit'
				}else if(e.target.value =='0' || e.target.value == 0){
					this.requiredJournal.sort = 'createtime'
				}
				post('/book/book/page',this.requiredJournal).then(res=>{
					console.log(res);
					
				},err=>{
					//异步错误处理
				});	
			},
			courseSearchChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.courseIndex = e.target.value
			},
			onClickItem(index) {
				//console.log(index)
				if (this.current !== index) {
					this.current = index;
				}
				if (index == 1) {
					console.log('111')
					uni.request({
						url: 'http://192.168.0.210:9999/book/book/page',
						method: 'POST',
						data: this.requiredBooks,
						header: {
							'content-type': 'application/json'
						},
						success: res => {
							console.log(res)
							this.bookList = res.data.data.pageBooks;
						},

					});
				}else if(index == 2){
						console.log('222')
						uni.request({
							url: 'http://192.168.0.210:9999/book/book/page',
							method: 'POST',
							data: this.requiredJournal,
							header: {
								'content-type': 'application/json'
							},
							success: res => {
								console.log(res.data.data.pageBooks);
								this.journalList = res.data.data.pageBooks;
								
							},
						
						});
				}
			},
			toEnterprise() {
				uni.reLaunch({
					url: '../index/enterprise/enterprise'
				});
			}
		}
	}
</script>

<style scoped>
	/* 公共组件 picker start */
	.journal_content .list_content .picker_style{
		display: flex; 
		justify-content: flex-end;
	}
	.journal_content .list_content .picker_style .content_search{
		display: flex; 
		justify-content: center; 
		align-items: center; 
		margin: 6upx 24upx 0 0;
		width: 166upx; 
		height: 40upx; 
		color: #fff; 
		font-size: 24upx;
		background: #01B18D; 
	}
	.journal_content .list_content .picker_style .content_search .xiala_icon{
		margin-left: 20upx;
		width:26upx; 
		height:14upx;
	}
	/* 公共组件 picker end */
	
	view {
		flex-direction: row;
	}

	page {
		display: flex;
		background-image: url('http://192.168.0.210/attached/image/20190530/20190530103654_ccuh.png');
		background-repeat: no-repeat;
		background-position-y: -250upx;
	}

	.journal_content .search_lable {
		display: flex;
		margin-top: 50upx;
		margin-bottom: 60upx;
	}

	.journal_content .search_lable .clear_page {
		display: flex;
		margin-right: 27upx;
	}

	.journal_content .search_lable .searc_icon {
		display: flex;
		margin-left: 23upx;
		width: 50upx;
		height: 50upx;
	}

	.journal_content .search_lable .clear_icon {
		display: flex;
		width: 40upx;
		height: 40upx;
	}

	.journal_content .title_content {
		display: flex;
		margin-bottom: 70upx;
	}

	.journal_content .title_content .title_text {
		display: flex;
		margin-left: 24upx;
		color: #333;
		font-size: 44upx;
	}

	.journal_content .title_content .to_apply {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20upx;
		width: 160upx;
		height: 72upx;
		color: #FFF;
		font-size: 28upx;
		border-radius: 4px;
		background: rgba(255, 84, 108, 1);
	}

	.journal_content .enterprise_info {
		display: flex;
		margin-bottom: 62upx;
		justify-content: center;
	}

	.journal_content .enterprise_info .info_content {
		display: flex;
		width: 698upx;
		color: #666;
		font-size: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.journal_content .enterprise_lable {
		display: flex;
		margin-bottom: 73upx;
		justify-content: center;
		align-items: center;
		color: #666;
		font-size: 26upx;
	}

	.journal_content .enterprise_lable .detailas_lable {
		display: flex;
		margin-top: 4upx;
		align-items: center;
		width: 22upx;
		height: 28upx;
	}

	.journal_content .enterprise_lable .site_lable {
		display: flex;
		margin-top: 4upx;
		align-items: center;
		width: 21upx;
		height: 27upx;
	}

	.journal_content .enterprise_lable .detailas_text {
		display: flex;
		margin-left: 13upx;
	}

	.journal_content .enterprise_lable .label_left {
		display: flex;
		margin-right: 48upx;
	}

	.journal_content .enterprise_lable .label_right {
		display: flex;
		margin-right: 26upx;
	}

	.list_subsection {
		display: flex;
		margin-left: -100upx;
	}

	/* 图书列表 start*/
	.journal_content .list_content .content_list {
		display: flex;
		flex-direction: column;
		margin: 32upx 0 0 22upx;
		padding-bottom: 300upx;
		width: 704upx;
		background: #fff;
		border-radius: 30upx 30upx 0px 0px;
	}

	.journal_content .list_content .content_list .book_cover_info {
		display: flex;
		flex-direction: column;
		width: 431upx;
	}

	.journal_content .list_content .content_list .book_info {
		display: flex;
		margin-top: 49upx;
		height: 299upx;
	}

	.journal_content .list_content .content_list .book_title_content {
		display: flex;
		margin-top: 28upx;
		align-items: center;
	}

	.journal_content .list_content .content_list .book_title_content .book_title {
		display: flex;
		font-size: 33upx;
		color: #333;
	}

	.journal_content .list_content .content_list .book_title_content .book_price {
		display: flex;
		align-items: center;
		margin-left: 18upx;
		padding: 0 33upx;
		height: 29upx;
		font-size: 25upx;
		color: #FF546C;
		border-radius: 4px;
		background: rgba(251, 221, 220, 1);
	}

	.journal_content .list_content .content_list .book_cover_content {
		display: flex;
		margin: 0 25upx 0 29upx;
	}
	.journal_content .list_content .content_list .book_cover_content .book_free{
		width: ;
	}
	.journal_content .list_content .content_list .booK_cover_img {
		display: flex;
		width: 184upx;
		height: 299upx;
		border-radius: 4upx;
	}

	.journal_content .list_content .content_list .book_author {
		display: flex;
		margin-top: 31upx;
		font-size: 27upx;
		color: #333;
	}

	.journal_content .list_content .content_list .book_brief_info {
		display: flex;
		margin-top: 39upx;
		font-size: 25upx;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	/* 图书列表 end*/
	/* 杂志 start */
	.journal_content .list_content .journal_list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 66upx 0 0 22upx;
		padding-bottom: 300upx;
		width: 704upx;

		border-radius: 30upx 30upx 0px 0px;
	}

	.journal_content .list_content .journal_list .journal_cover {
		margin-bottom: 4upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 349upx;
		height: 444upx;
		background: #fff;
	}

	.journal_content .list_content .journal_list .journal_cover:nth-child(2n-1) {
		margin-right: 4upx;
	}

	.journal_content .list_content .journal_list .journal_cover:nth-child(1) {
		border-radius: 30upx 0upx 0upx 0upx;
	}

	.journal_content .list_content .journal_list .journal_cover:nth-child(2) {
		border-radius: 0upx 30upx 0upx 0upx;
	}

	.journal_content .list_content .journal_list .journal_cover .journal_cover_img {
		margin-top: 51upx;
		width: 184upx;
		height: 296upx;
	}

	.journal_content .list_content .journal_list .journal_cover .journal_cover_title {
		color: #333;
		font-size: 32upx;
	}

	/* 杂志 end */
	/* 课程列表 start*/
	.journal_content .list_content .content_list .course_cover {
		margin-top: 33upx;
	}

	.journal_content .list_content .course_content {
		margin-left: 31upx;
		padding-bottom: 45upx;
		width: 643upx;

	}

	.journal_content .list_content .content_list .course_cover_img {
		width: 643upx;
		height: 374upx;
	}

	.journal_content .list_content .content_list .bottom_border {
		border-bottom: 1px solid #eee;
	}

	.journal_content .list_content .course_content .course_title {
		color: #333;
		font-size: 30upx;
	}

	.journal_content .list_content .content_list .course_teacher,
	.journal_content .list_content .content_list .course_times {
		display: flex;
		align-items: center;
	}

	.journal_content .list_content .content_list .course_teacher_icon {
		margin: 0 23upx 0 0upx;
		width: 30upx;
		height: 30upx;
	}

	.journal_content .list_content .content_list .course_times_icon {
		margin-right: 22upx;
		width: 36upx;
		height: 36upx;
	}

	.journal_content .list_content .content_list .course_info {
		margin-top: 39upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.journal_content .list_content .content_list .course_time_date {
		color: #888;
		font-size: 26upx;
	}

	.journal_content .list_content .content_list .course_teacher_name {
		color: #888;
		font-size: 26upx;
	}


	/* 课程列表 end*/
</style>
