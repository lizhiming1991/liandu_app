<template>
	<view class="course_timetable">
		<Header :titles="title"></Header>
		<view class="details_title">
			课程详情
		</view>
		<view class="course_details">
			<view class="course_title">
				<view class="title_text">
					考研英语2020考研直通车
				</view>
				<image class="course_icon" src="../../static/images/timeTable_icon.png" mode=""></image>
			</view>
			<view class="course_info"><text>课次主题：必会语法 1</text> <text>课时：2</text></view>
			<view class="course_info">开始时间：2019.6.18 12：00</view>
			<view class="course_info">结束时间：2019.6.18 13：00</view>
			<view class="course_info"><text class="course_text">课程地点：第一校区</text><text class="course_text">班级名称：英语1班</text></view>
			<view class="course_info"><text class="course_text">应到学员：25</text><text class="course_text">实到学员：24</text></view>
			
		</view>
		<view class="assign_homework" >
			{{assign_homework}}
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default {
		data () {
			return {
				title: '我的课表',
				assign_homework: '布置作业'
			}
		},
		components: {
			Header
		},
		methods: {
			
		}
		
	}
</script>

<style lang="less" scoped>
	.course_timetable{
		.details_title{
			margin: 30upx auto;
			width: 703upx;
			font-size: 36upx;
		}
		.course_details{
			padding: 10upx 0 40upx 0;
			margin: 0 auto;
			width: 703upx;
			background: #F7F8FA;
			.course_title{
				position: relative;
				margin: 36upx 0 31upx 34upx;
				font-size: 36upx;
				color: #333;
				.course_icon{
					position: absolute;
					top: -40upx;
					right: 0;
					width: 119upx;
					height: 119upx;
				}
			}
			.course_info{
				margin-left: 34upx; 
				font-size: 30upx;
				line-height: 60upx;
				.course_text{
					display: inline-block;
					width: 50%;
				}
			}
			
		}
		.assign_homework{
			margin: 0 auto;
			width: 702upx;
			height: 91upx;
			color: #fff;
			line-height: 91upx;
			text-align: center;
			background: #01B18D;
		}
	}
</style>
