<template>
	<view class="content">
		<Header ref="b_head" :titles="title"></Header>
		<bkList ref="list" :bookdata="bookList" :typedata="typeList" :ImgUrls="ImgUrl" @goDetail="goDetails"></bkList>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	import bkList from '@/components/bookList/bkList.vue'
	import {ImgUrl} from '@/common/common.js'
	import { mapState } from 'vuex'
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
			};
		},
		computed: {
			// #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			
			 // #endif 
			// #ifdef H5 
			...mapState([
				"userid"
			]),
			 // #endif 
			
		
		},
		onShow(){
			// this.$store.dispatch("changeTitle","图书");
			console.log(2)
		},
		onReady(){
			 // #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			 var h = wx.getSystemInfoSync().windowHeight;
			
			 
			 // #endif 
			// #ifdef H5 
			console.log(this.$refs.list.$refs)
				var h = window.innerHeight - this.$refs.b_head.$el.clientHeight - this.$refs.list.$refs.b_search.$el.clientHeight ;
				this.$refs.list.$refs.b_scroll.$el.style.height = h+"px";
				this.$refs.list.$refs.b_scrolls.$el.style.height = h+"px";
			 // #endif 
			
			console.log(3)
		},
		onLoad(){
			this.ImgUrl = ImgUrl;
			this.getBooklist("","",1,10);
			console.log(1)
			get("/book//book/category/all",{}).then(res=>{
				if(res.status == 200){
					this.typeList = res.data;
				}
			})
			
		},
		methods:{
			goDetails(){
				uni.navigateTo({
					url:"./bookDetails"
				})
			},
			getBooklist(content,tid,pagenum,pagesize){
				post("/book/book/page",{
					"fuzzy": content,
					"category_id": tid,
					"page_index": pagenum,
					"page_size": pagesize,
					"tp": "",
					"table_id": "",
					"resource_type": 1
				}).then((res)=>{
					console.log(res)
					if(res.status == 200){
						this.bookList = res.data.pageBooks;
					}
				})
			}
		},
		components:{
			Header,
			bkList
		}
	}
</script>

<style lang="scss" scoped>
.scroll-Y::-webkit-scrollbar {display:none}
.content{
	padding-bottom: 100upx;
}

</style>
