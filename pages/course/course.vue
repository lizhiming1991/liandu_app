<template>
	<view class="course_content">
		<Header :titles="title"></Header>
		<view class="cr_search">
			<input class="cr_box" type="text" placeholder="课程名称或关键字">
			<image class="cr_icon" src="../../static/images/icon_search_small.png"></image>	
		</view>
		<view class="showlog" v-if="showlog">共<text class="col_red">{{numbers}}</text>条相关信息</view>
		<view class="cr_list">
			<view>
				<courseList :courseList="itemdata" @toDetails="goDetails"></courseList>
				
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	import courseList from '@/components/courseList/courseList.vue'
	export default {
		data() {
			return {
				title: "课程",
				numbers: 1,
				showlog: false,
				itemdata:[]
			}
			
		},
		onLoad(){
			get("/course/all",{}).then(res=>{
				if(res.status == 200){
					this.itemdata = res.data;
				}
			})
		},
		methods:{
			goDetails(data){
				uni.navigateTo({
					url:"courseDetails?id="+data.lld
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
	}
</style>
