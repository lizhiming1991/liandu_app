<template>
	<view class="course_content">
		<Header :titles="title"></Header>
		<view class="cr_search">
			<input class="cr_box" type="text" v-model="searchText" placeholder="课程名称或关键字"  @confirm="goSearch()">
			<image class="cr_icon" src="../../static/images/icon_search_small.png"></image>	
		</view>
		<view class="showlog" v-if="showlog">共<text class="col_red">{{numbers}}</text>条相关信息</view>
		<view class="cr_list">
			<view>
				<courseList :courseList="itemdata" @toDetails="goDetails" :ImgUrl="ImgUrl"></courseList>
				<view v-if="shownone" class="cr_none">
					<image class="cr_noneimg" src="../../static/images/not_found_content.png"></image>
					<view class="cr_text">真遗憾,没有找到相关信息!</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	import courseList from '@/components/courseList/courseList.vue'
	import {searchListItem} from '@/common/config.js'
	import {ImgUrl} from '@/common/common.js'
	export default {
		data() {
			return {
				title: "课程",
				numbers: 0,
				showlog: false,
				itemdata:[],
				searchText: "",
				ImgUrl:"",
				shownone: false,
			}
		},
		watch:{
			itemdata(){
				handler:(val)=> {}
				deep:true;
			}
		},
		onLoad(){
			this.ImgUrl =ImgUrl;
			this.getAll();
		},
		methods:{
			getAll(){
				get("/course/all",{}).then(res=>{
					if(res.status == 200){
						this.shownone = false;
						let Arr = [];
						res.data.map(item=>{
						    const {id,authorphoto,teacherName,coverPath,updateTime,courseName,ispay,ispublic} = item;
						    Arr.push(new searchListItem(id,authorphoto,teacherName,coverPath,updateTime,courseName,ispay,ispublic))
						});
						this.itemdata = Arr;
						if(Arr.length == 0){
							this.shownone = true;
						}
					}
				})
			},
			goDetails(data){
				uni.navigateTo({
					url:"courseDetails?id="+data.lld
				})
			},
			goSearch(){
				if(this.searchText.trim() == ""){
					this.getAll();
					return;
				}
				
				post("/search/queryListOnSearch",{
					"searchModule" : 4,
					"searchKey" : this.searchText
				}).then(res=>{
					if(res.status == 200){
						this.showlog = true;
						let Arr = [];
						res.data.courseList.map(item=>{
						    const {id,authorphoto,tearcher_name,photo,createtime,course_name,ispay,ispublic} = item;
						    Arr.push(new searchListItem(id,authorphoto,tearcher_name,photo,createtime,course_name,ispay,ispublic))
						});
						this.itemdata = Arr;
						this.numbers = Arr.length;
						console.log(Arr)
						if(this.numbers === 0){
							this.shownone = true;
						}else{
							this.shownone = false;
						}
					}
					
				})
			}
		},
		components: {
			Header,
			courseList
		},
	}
</script>

<style lang="scss" scoped>
	.course_content{
		.cr_search{
			height: 90upx;
			padding: 0 30upx;
			background-color: #eee;
			position: relative;
			display: flex;
			align-items: center;
			.cr_box{
				display: block;
				width: 100%;
				height: 55upx;
				background-color: #fff;
				box-sizing: border-box;
				padding-left: 60upx;
				font-size: 24upx;
				border-radius: 8upx;
			}
			.cr_icon{
				position: absolute;
				left: 50upx;
				top: 33upx;
				width: 22upx;
				height: 24upx;
			}
		}
		.showlog{
			padding: 0 30upx;
			margin-top: 30upx;
			font-size: 20upx;
			.col_red{
				color: red;
			}
		}
		.cr_list{
			margin-top: 30upx;
		}
		.cr_none{
			text-align: center;
			margin-top: 80upx;
		}
		.cr_noneimg{
			width: 264upx;
			height: 231upx;
			margin: 0 auto;
		}
		.cr_text{
			margin-top: 40upx;
			font-size: 28upx;
		}
	}
</style>
