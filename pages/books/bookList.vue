<template>
	<view class="c_content">
		<!-- 头部组件 -->
		<Header ref="b_head" :titles="title"></Header>
		
		<view class="b_search" ref="b_search">
			<view class="b_box">
				<input class="b_input" type="text" v-model="searchText" @confirm="goSearch" placeholder="图书名称或关键字"/>
				<image class="b_searchimg" src="../../static/images/icon_search_small.png"></image>
			</view>
		</view>
		<!-- 书籍列表组件 -->
		<bkList ref="list" 
		v-if="!isSearch"
			@changelist="changeList"
			:bookdata="bookList"
			:typedata="typeList"
			:ImgUrl="ImgUrl"
			@goDetail="goDetails"
			@getMorebook="getMore"
		></bkList>
		<bookSearch v-if="isSearch"
			:bookList="bookList"
			:ImgUrl="ImgUrl"
			:numbers="numbers"
			@goDetails="goDetails"
			></bookSearch>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	import bkList from '@/components/bookList/bkList.vue'
	import {ImgUrl} from '@/common/common.js'
	import { mapState } from 'vuex'
	import bookSearch from '@/components/bookSearch/bookSearch.vue'
	export default {
		data() {
			return {
				bookList:[],
				typeList: [],
				searchContent: "",
				pageNum: 1,
				pageSize: 10,
				ImgUrl: "",
				title: "图书",
				isfirst: true,
				hasmore: true,
				typeid: "",
				searchText: "",
				isSearch: false,
				numbers: 0,
			};
		},
		computed: {
			...mapState([
				"userid"
			]),
			// #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			
			 // #endif 
			// #ifdef H5 
			
			 // #endif 
		},
		watch:{
			bookList(){
				handler:(val)=> {}
				deep:true;
			}
		},
		onLoad(){
			this.ImgUrl = ImgUrl;
			this.getBooklist("",this.typeid,this.pageNum,this.pageSize);
			console.log(1)
			get("/book/book/category/all",{}).then(res=>{
				if(res.status == 200){
					this.typeList = res.data;
				}
			})
			
		},
		onShow(){
			console.log(2)
		},
		onReady(){
			 // #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			 var h = wx.getSystemInfoSync().windowHeight;
			 // #endif 
			// #ifdef H5 
				var h = window.innerHeight - this.$refs.b_head.$el.clientHeight - this.$refs.b_search.$el.clientHeight ;
				this.$refs.list.$refs.b_scroll.$el.style.height = h+"px";
				this.$refs.list.$refs.b_scrolls.$el.style.height = h+"px";
			 // #endif 
			
			console.log(3)
		},
		methods:{
			goDetails(item){
				uni.navigateTo({
					url:"./bookDetails?id="+item.id
				})
			},
			goSearch(){
				if(this.searchText == ""){
					uni.showToast({
						title: "搜索内容不能为空!",
						duration: 1500,
						icon: 'none'
					});
					this.isSearch = false;
					this.pageNum =1;
					this.isfirst = true;
					this.hasmore = true;
					this.getBooklist("",this.typeid,this.pageNum,this.pageSize);
					return;
				}
				this.isSearch = true;
				post("/search/queryListOnSearch",{
					"searchModule" : 2,
					"searchKey" : this.searchText
				}).then(res=>{
					if(res.status == 200){
						this.numbers = res.data.bookList.length;
						this.bookList = res.data.bookList;
					}
					console.log(res)
				})
			},
			getBooklist(content,tid,pagenum,pagesize){
				if(this.hasmore){
					post("/book/book/page",{
						"fuzzy": content,
						"category_id": tid,
						"page_index": pagenum,
						"page_size": pagesize,
						"tp": "",
						"table_id": "",
						"resource_type": 1
					}).then((res)=>{
						if(res.status == 200){
							// console.log(res.data);
							if(res.data.bookNums < this.pageNum*this.pageSize){
								this.hasmore = false;
							}
							if(this.isfirst){
								this.bookList = res.data.pageBooks;
								this.isfirst = false;
								console.log(555)
							}else{
								console.log(777)
								this.bookList = [...this.bookList,...res.data.pageBooks];
							}
							this.pageNum  = this.pageNum +1;
							console.log(this.bookList)
						}
					})
				}else{
					uni.showToast({
						title: "没有更多数据了!",
						duration: 2000,
						icon: 'none'
					});
				}
				
			},
			changeList(data){
				this.typeid = data.id;
				this.pageNum =1;
				this.isfirst = true;
				this.hasmore = true;
				this.getBooklist("",this.typeid,this.pageNum,this.pageSize);
			},
			getMore(){
				this.getBooklist("",this.typeid,this.pageNum,this.pageSize);
			},
		},
		components:{
			Header,
			bkList,
			bookSearch
		}
	}
</script>

<style lang="scss" scoped>
.c_content{
	
}
.b_search{
		width: 100%;
		height: 90upx;
		background-color: #EEEEEE;
		display: flex;
		padding: 17upx 30upx;
		box-sizing: border-box;
		.b_box{
			flex: 1;
			position: relative;
			.b_searchimg{
				width: 22upx;
				height: 24upx;
				position: absolute;
				left: 24upx;
				top: 16upx;
			}
			.b_input{
				width: 100%;
				height: 56upx;
				background-color: #fff;
				border-radius: 28upx;
				padding-left: 68upx;
				box-sizing: border-box;
				font-size: 24upx;
			}
		}
	}

</style>
