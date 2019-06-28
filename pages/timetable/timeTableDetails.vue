<template>
	<view class="course_timetable">
		<Header :titles="title"></Header>
		<view class="details_title">
			课程详情
		</view>
		<view class="course_details">
			<view class="course_title">
				<view class="title_text">
					{{cousreInfo.courseName == null ? '暂无信息' : cousreInfo.courseName}}
				</view>
				<image class="course_icon" src="../../static/images/timeTable_icon.png" mode=""></image>
			</view>
			<view class="course_info"><text class="course_text">课次主题：{{cousreInfo.theme == null ? '暂无信息' : cousreInfo.theme }}</text> <text class="course_text">课时：{{cousreInfo.lessonNumber == null ? '暂无信息' : cousreInfo.lessonNumber}}</text></view>
			<view class="course_info">开始时间：{{cousreInfo.startTime == null ? '暂无信息' : cousreInfo.startTime}}</view>
			<view class="course_info">结束时间：{{cousreInfo.endTime == null ? '暂无信息' : cousreInfo.endTime}}</view>
			<view class="course_info"><text class="course_text">课程地点：{{cousreInfo.location == null ? '暂无信息' : cousreInfo.location}}</text><text class="course_text">班级名称：{{cousreInfo.className == null ? '暂无信息' : cousreInfo.className}}</text></view>
			<view class="course_info" v-if="cousreInfo.totalStudent != null"><text class="course_text">应到学员：{{cousreInfo.totalStudent == null ? '暂无信息' : cousreInfo.totalStudent}}</text><text class="course_text">实到学员：{{cousreInfo.normal == null ? '暂无信息' : cousreInfo.normal}}</text></view>
			
		</view>
		<view class="assign_homework" >
			
			<text v-if="cousreInfo.totalStudent != null">{{ assign_homework }}</text>
			<text v-else-if="cousreInfo.totalStudent == null">{{ my_homework }}</text>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import { get } from '@/common/methods.js'
	export default {
		data () {
			return {
				title: '我的课表',
				assign_homework: '布置作业',
				my_homework: '我的作业',
				cousreInfo: '',
				courseId: ''
			}
		},
		onLoad(e) {
			// console.log(e.id)
			this.courseId = e.id
			this.getCourseInfo()
		},
		components: {
			Header
		},
		methods: {
			getCourseInfo() {
				get('/course/schedule/id/'+ this.courseId+ '?abundant=false').then(res=>{
					if( res.data != null){
						this.cousreInfo = res.data
					}
					
					// console.log(res)
				});
			}
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
