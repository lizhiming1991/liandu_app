<template>
	<view class="serch_content" style="flex-direction: column; flex: 1;">
		<!-- <view class="" @tap="ceshi">
			搜索按钮--类型:{{searchModule}}
		</view> -->
		<view class="search_box">
			<view class="search_input">
				<image class="search_icon" src="/static/images/search_icon.png" mode=""></image>
				<input class="search_center" v-model="search_text" @confirm="search_input" confirm-type="search" type="text">
			</view>
			<!-- #ifdef H5 -->
			<view class="searc_cancel" @tap="cancel">取消</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO-->
			<navigator open-type="navigateBack" :delta="number" class="h_goback">
				取消
			</navigator>
			<!-- #endif -->
		</view>
		<block v-if="isSearch == ''">
			<view class="search_record_content" v-if="owner_record != ''">
				<view class="search_record">
					<view class="record_title">
						<image class="times_icon" src="/static/images/time_icon_2.png" mode=""></image> 历史搜索
					</view>
					<image class="delete_button" src="/static/images/delete_icon.png" @tap="deleteOwnerSearch" mode=""></image>
				</view>
				<view class="search_text_record">
					<block v-for="(item,index) in owner_record" :key="index">
						<view class="search_text" @tap="toHistory(item.searchKey)">{{item.searchKey}}</view>
					</block>
				</view>
			</view>
			<view class="search_record_content search_hot">
				<view class="search_record">
					<view class="record_title">
						<image class="times_icon" src="/static/images/hot_icon.png" mode=""></image> 热门搜索
					</view>
				</view>
				<view class="search_text_record">
					<block v-for="(item,index) in hot_record" :key="index">
						<view class="search_text" @tap="hotSearchContent(item.searchKey)">{{item.searchKey}}</view>
					</block>
				</view>
			</view>
		</block>
		<block v-if=" searchContent !=''">
			<view class="search_content">
				<view>
					<uni-segmented-control style="width: 310upx; margin-right: 410upx;" :current="current" activeColor="#01B18D"
					 :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
					<view class="content">
						<view class="search_info">
							共有<text class="search_number">{{searchTotal}}</text>条相关信息
						</view>
						<view v-show="current === 0">
							<book-show :bookList="bookLists" v-if="bookShow" @toBookDetails="goBooKDetails" :ImgUrl="ImgUrl"></book-show>
							<not-found :class="{notFoundShow:notFoundIsShow_a}"></not-found>
						</view>
						<view v-show="current === 1">
							<journal-list v-if="journalShow" :magazineList="magazineLists" @toMagazineDetailas="goMagazineDetailas" :ImgUrl="ImgUrl"></journal-list>
							<not-found :class="{notFoundShow:notFoundIsShow_b}"></not-found>
						</view>
						<view v-show="current === 2">
							<courseList :courseList="courseLists" v-if="courseShow" @toDetails="goDetails" :ImgUrl="ImgUrl"></courseList>
							<not-found :class="{notFoundShow:notFoundIsShow_c}"></not-found>
							<!-- <course-list :courseList="courseLists" @toDetails="toDetails"></course-list> -->
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		get,
		post,
		deletes
	} from '@/common/methods.js';
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import bookShow from "@/components/bookShow/bookShow.vue"
	import courseList from "@/components/courseList/courseList.vue"
	import journalList from "@/components/journalList/journalList.vue"
	import notFound from "@/components/notFound/notFoundContetn.vue"
	import {
		mapState
	} from 'vuex'
	import {
		ImgUrl
	} from '@/common/common.js'
	export default {
		data() {
			return {
				enteroriseID: '',
				notFoundIsShow_a: true,
				notFoundIsShow_b: true,
				notFoundIsShow_c: true,
				journalShow: true,
				courseShow: true,
				bookShow: true,
				searchTotal: '',
				searchContent: '',
				search_text: '',
				searchModule: '',
				isSearch: '',
				ImgUrl: '',
				title: '社圈',
				hot_record: [],
				owner_record: [],
				current: 0,
				items: ['图书', '杂志', '课程'],
				courseLists: [],
				bookLists: [],
				magazineLists: []
			};
		},
		computed: {
			...mapState([
				"userid"
			])
		},
		components: {
			uniSegmentedControl,
			bookShow,
			courseList,
			journalList,
			notFound
		},
		onLoad(e) {
			console.log(e)
			this.searchModule = e.type;
			this.enteroriseID = e.enteroriseID;
			if(this.searchModule == 'all'){
				get('/search/querySearchHistory/1', {
					'associatorid': this.userid
				}).then(res => {
					this.hot_record = res.data.hotSearch;
					this.owner_record = res.data.ownerSearch;
				});
			}else{
				get('/search/querySearchHistory/' + this.searchModule, {
					'associatorid': this.userid
				}).then(res => {
					this.hot_record = res.data.hotSearch;
					this.owner_record = res.data.ownerSearch;
				});
			}
			
			this.ImgUrl = ImgUrl;


		},
		methods: {
			deleteOwnerSearch() {
				if(this.searchModule == 'all'){
					this.searchModule = '1'
				}
				deletes('/search/deleteSearchHistory', {
					"searchModule": this.searchModule,
					"operationUser": this.userid
				}).then(res => {
					console.log(res)
					this.owner_record = '';
				});
			},
			shContent(searchM, searchK, searchId) {
				post('/search/queryListOnSearch', {
					"searchModule": searchM,
					"searchKey": searchK,
					"companyId": searchId
				}).then(res => {
					console.log(res)
					this.searchTotal = res.data.magazineListSize + res.data.courseListSize + res.data.bookListSize
					this.isSearch = this.searchContent = 'search';
					if (res.data.bookList != '') {
						this.bookLists = res.data.bookList
						// this.isSearch = this.searchContent = 'search';
						this.notFoundIsShow_a = true
						this.bookShow = true
					} else {
						this.bookShow = false
						this.notFoundIsShow_a = false
					}
					if (res.data.magazineList != '') {
						this.magazineLists = res.data.magazineList
						// this.isSearch = this.searchContent = 'search';
						this.notFoundIsShow_b = true
						this.journalShow = true
					} else {
						this.journalShow = false
						this.notFoundIsShow_b = false
					}
					if (res.data.courseList != '') {
						this.courseLists = res.data.courseList
						this.notFoundIsShow_c = true
						this.courseShow = true
					} else {
						this.courseShow = false
						this.notFoundIsShow_c = false
					}
				});
			},
			search_input() {
				if (this.search_text != '') {
					//添加搜索记录
					if (this.searchModule == 'all') {
						post('/search/addSearchHistory', {
							"searchKey": this.search_text,
							"searchModule": 1,
							"operationUser": this.userid
						}).then(res => {
							console.log(res)
						});
					} else {
						post('/search/addSearchHistory', {
							"searchKey": this.search_text,
							"searchModule": this.searchModule,
							"operationUser": this.userid
						}).then(res => {
							console.log(res)
						});
					}
					//按需调用搜索方法
					if (this.searchModule !== 'all') {
						console.log("00")
						this.shContent(this.searchModule, this.search_text, this.enteroriseID)
					} else {
						console.log("00980")
						this.shContent('1', this.search_text, '0')
					}

				} else {
					uni.showToast({
						title: '搜索内容不能为空!',
						duration: 1500,
						icon: 'none'
					});
				}


			},
			ceshi() {
				if (this.search_text != '') {
					post('/search/addSearchHistory', {
						"searchKey": this.search_text,
						"searchModule": this.searchModule,
						"operationUser": this.userid
					}).then(res => {});
					this.shContent(this.searchModule, this.search_text, 0)
				} else {
					uni.showToast({
						title: '搜索内容不能为空!',
						duration: 1500,
						icon: 'none'
					});
				}
			},
			toHistory(key) {
				if (this.searchModule == 'all') {
					this.shContent('1', key, '0')
				}else{
					this.shContent(this.searchModule, key, this.enteroriseID)
					}
			},
			hotSearchContent(key) {
				if (this.searchModule == 'all') {
					this.shContent('1', key, '0')
				}else{
					this.shContent(this.searchModule, key, this.enteroriseID)
					}
			},
			goDetails(data) {
				uni.navigateTo({
					url: "courseDetails?id=" + data.lld
				})
			},
			goBooKDetails(data) {
				uni.navigateTo({
					url: "bookDetails?id=" + data.lld
				})
			},
			goMagazineDetailas(data) {
				uni.navigateTo({
					url: "magazineDetails?id=" + data.lld
				})
			},
			cancel() {
				this.$router.go(-1);
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if (index == 0) {
					console.log('111')
				} else if (index == 1) {

				} else if (index == 2) {}
			},
		}
	}
</script>

<style scoped>
	page {
		background: rgba(247, 248, 250, 1);
	}

	view {
		font-size: 28upx;
	}

	.notFoundShow {
		display: none;
	}

	.notFoundShow_a {
		display: none;
	}

	.notFoundShow_b {
		display: none;
	}

	.notFoundShow_c {
		display: none;
	}

	.serch_content {
		display: flex;
	}

	.serch_content .search_box {
		display: flex;
		margin-top: 65upx;
		margin-bottom: 26upx;
		justify-content: center;
		align-items: center;
	}

	.serch_content .search_box .search_input {
		display: flex;
		width: 581upx;
		height: 64upx;
		box-shadow: 0px 4upx 10upx 0px rgba(153, 153, 153, 0.05);
		border-radius: 32upx;
		background: #fff;
	}

	.serch_content .search_box .search_icon {
		display: flex;
		margin: 19upx 0 0 23upx;
		align-items: center;
		width: 27upx;
		height: 27upx;
	}

	.serch_content .search_box .search_center {
		display: flex;
		width: 100%;
		margin: 8upx 0 0 10upx;
	}

	.serch_content .search_box .searc_cancel {
		display: flex;
		font-size: 28upx;
		margin-left: 26upx;
	}

	.serch_content .search_record {
		display: flex;
		justify-content: center;
	}

	.serch_content .search_record_content {
		display: flex;
		padding: 50upx 0 115upx 0;
		flex-direction: column;
		background: #FFF;
	}

	.serch_content .search_record_content .times_icon {
		display: flex;
		margin: 6upx 11upx 0 71upx;
		width: 29upx;
		height: 29upx;
	}

	.serch_content .search_record_content .delete_button {
		display: flex;
		margin-right: 43upx;
		width: 28upx;
		height: 37upx;
	}

	.serch_content .search_record_content .record_title {
		display: flex;
		flex: 1;
		font-size: 28upx;
		color: rgba(102, 102, 102, 1);
	}

	.serch_content .search_record_content .search_text_record {
		display: flex;
		justify-content: space-between;
		margin: 51upx 0 0 85upx;
		width: 580upx;
		flex-wrap: wrap;
	}

	.serch_content .search_record_content .search_text {
		display: flex;
		align-items: center;
		margin-bottom: 24upx;
		margin-right: 24upx;
		padding: 0 26upx;
		height: 52upx;
		border-radius: 26px;
		background: rgba(247, 248, 250, 1);
	}

	.serch_content .search_hot {
		display: flex;
		height: 840upx;
	}

	.serch_content .search_content .search_info {
		margin-top: 40upx;
		margin-left: 71upx;
		font-size: 18upx;
	}

	.serch_content .search_content .search_number {
		color: #E9534E;

	}

	.serch_content .search_content .search_result {}

	.serch_content .search_content .search_result .book_result {}
</style>
