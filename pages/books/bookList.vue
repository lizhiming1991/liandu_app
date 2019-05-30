<template>
	<view class="content">
		<Header ref="b_head" :titles="title"></Header>
		<bkList ref="list" @changelist="changeList" :bookdata="bookList" :typedata="typeList" :ImgUrl="ImgUrl" @goDetail="goDetails"></bkList>
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
			...mapState([
				"userid"
			]),
			// #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			
			 // #endif 
			// #ifdef H5 
			
			 // #endif 
			
		
		},
		onShow(){
			console.log(2)
		},
		onReady(){
			 // #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
			 var h = wx.getSystemInfoSync().windowHeight;
			
			 
			 // #endif 
			// #ifdef H5 
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
			get("/book/book/category/all",{}).then(res=>{
				if(res.status == 200){
					this.typeList = res.data;
				}
			})
			
		},
		methods:{
			goDetails(item){
				uni.navigateTo({
					url:"./bookDetails?id="+item.id
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
					console.log(res.data)
					if(res.status == 200){
						this.bookList = res.data.pageBooks;
					}
				})
			},
			changeList(data){
				this.getBooklist("",data.id,1,10);
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
