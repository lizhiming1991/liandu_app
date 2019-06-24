<template>
	<view class="list_content">
		<block v-for="(item,index) in courseList" :key="index">
			<view class="bottom_border">
				<view class="course_content" style="flex-direction: column;">
					<view @tap="to_details(item.id)">
						<view class="course_cover">
							<image class="course_cover_img"  :src="item.photo?(ImgUrl+item.photo):imgerror" mode="widthFix"></image>
							<view class="member_icon">会员</view>
						</view>
						<view class="course_title" v-html="item.title"></view>
					</view>
					
					<view class="course_info">
						<view class="course_teacher">
							<image src="/static/images/laoshi.png" class="course_teacher_icon" mode=""></image>
							<text class="course_teacher_name">{{item.authorname}}</text>
						</view>
						<view class="course_times">
							<image src="/static/images/time_icon_1.png" mode="" class="course_times_icon"></image>
							<text class="course_time_date">{{item.createtime.split(' ')[0]}}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:[
			"courseList",
			"ImgUrl"
		],
		data() {
			return {
				imgerror:"../../static/image/kecheng.png",	
			}
		},
		onLoad() {
		},
		methods: {
			to_details(cid) {
				this.$emit('toDetails',{'lld':cid})
			}
		},
	}
</script>

<style scoped>
	
	.course_content {
		padding: 0 50upx;
		padding-bottom: 45upx;
	}
	.course_cover{
		width: 100%;
		position: relative;
		margin-top: 31upx;
		height: 355upx;
		overflow: hidden;
	}
	.course_cover .course_cover_img {
		width: 100%;
	}
	
	.bottom_border {
		border-bottom: 1px solid #eee;
	}
	
	.course_content .course_title {
		color: #333;
		font-size: 30upx;
		margin-top: 20upx;
	}
	
	.course_teacher,
	.course_times {
		display: flex;
		align-items: center;
	}
	
	.course_teacher_icon {
		margin: 0 23upx 0 0;
		width: 30upx;
		height: 30upx;
	}
	
	.course_times_icon {
		margin-right: 22upx;
		width: 36upx;
		height: 36upx;
	}
	
	.course_info {
		margin-top: 39upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.course_time_date {
		color: #888;
		font-size: 26upx;
	}
	
	.course_teacher_name {
		color: #888;
		font-size: 26upx;
	}
	.member_icon{
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
	
		width:95upx;
		height:44upx;
		font-size:27upx;
		color: #fff;
		background: #FF546C;
	}
</style>
