<template>
	<view class="time_lesson">
		<Header :titles="title"></Header>
		<view class="date_table">
			<view class="date_swiper">
				<view class="sw_part">
					<view class="sw_dates">
						<view class="sw_note">24</view>
						<view class="sw_week">周一</view>
					</view>
					<view class="sw_dates">
						<view class="sw_note">25</view>
						<view class="sw_week">周二</view>
					</view>
					<view class="sw_dates">
						<view class="sw_note">26</view>
						<view class="sw_week">周三</view>
					</view>
					<view class="sw_dates">
						<view class="sw_note">27</view>
						<view class="sw_week">周四</view>
					</view>
					<view class="sw_dates checked">
						<view class="sw_note">28</view>
						<view class="sw_week">周五</view>
					</view>
					<view class="sw_dates">
						<view class="sw_note">29</view>
						<view class="sw_week">周六</view>
					</view>
					<view class="sw_dates">
						<view class="sw_note">30</view>
						<view class="sw_week">周七</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lesson_list">
			<view class="lessons">
				<view class="lesson_date">2019年6月28日</view>
				<view class="lesson_content">
					<view class="ls_lists">
						<view class="ls_left">
							<view>12:00</view>
							<view class="ls_span">至</view>
							<view>13:00</view>
						</view>
						<view class="ls_center">
							<text class="ls_line"></text>
						</view>
						<view class="ls_right">
							<view class="ls_large">课程名称11111</view>
							<view class="ls_span ls_spans">课次主题1111</view>
							<view>讲师：讲师1</view>
						</view>
					</view>
					<view class="ls_lists">
						<view class="ls_left">
							<view>14:00</view>
							<view class="ls_span">至</view>
							<view>15:00</view>
						</view>
						<view class="ls_center">
							<text class="ls_line"></text>
						</view>
						<view class="ls_right">
							<view class="ls_large">课程名称2</view>
							<view class="ls_span ls_spans">课次主题2</view>
							<view>讲师：讲师2</view>
						</view>
					</view>
				</view>
			</view>
			<view class="lessons">
				<view class="lesson_date">2019年6月29日</view>
				<view class="lesson_content">
					<view class="ls_none">暂无课程</view>
				</view>
			</view>
			<view class="lessons">
				<view class="lesson_date">2019年6月30日</view>
				<view class="lesson_content">
					<view class="ls_lists">
						<view class="ls_left">
							<view>13:00</view>
							<view class="ls_span">至</view>
							<view>16:00</view>
						</view>
						<view class="ls_center">
							<text class="ls_line"></text>
						</view>
						<view class="ls_right">
							<view class="ls_large">课程名称3</view>
							<view class="ls_span ls_spans">课次主题3</view>
							<view>讲师：讲师3</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default{
		data(){
			return{
				title: "我的课表",
				nowdate: "",
				nowweek: "周一",
				dateArr:[],
				weekArr:[],
			}
		},
		onLoad(){
			let nowdates = new Date();
			this.nowdate = nowdates.getDate();
			this.nowweek = nowdates.get;
			console.log(this.nowdate)
		},
		components:{
			Header
		}
	}
</script>

<style lang="scss" scoped>
.time_lesson{
	
}
.date_table{
	border-top: 1px solid #A0A0A0;
	.date_swiper{
		padding: 30upx 0;
		height: 147upx;
		.sw_part{
			.sw_dates{
				text-align: center;
				float: left;
				width: 106upx;
				height: 106upx;
				border-radius: 50%;
				.sw_note{
					font-size: 44upx;
				}
				.sw_week{
					font-size: 24upx;
					color: #7A7A7A;
				}
				
			}
			.checked{
				color: #fff;
				background-color: #01B18D;
				.sw_week{
					color: #fff;
				}
			}
		}
	}
}
.lesson_list{
	color: #333;
	.lessons{
		background-color: #F7F8FA;
		.lesson_date{
			width: 100%;
			height: 70upx;
			line-height: 70upx;
			font-size: 28upx;
			color: #7A7A7A;
			padding: 0 40upx;
		}
		.lesson_content{
			.ls_lists{
				background-color: #fff;
				padding:  20upx;
				margin-top: 10upx;
				display: flex;
				.ls_left{
					flex: 1;
					text-align: center;
					font-size: 42upx;
				}
				.ls_center{
					margin-left: 20upx;
					width: 2upx;
					height: 100upx;
					margin-top: 28upx;
					background-color: #626262;
				}
				.ls_right{
					flex: 3;
					margin-left: 60upx;
					font-size: 28upx; 
					.ls_large{
						font-size: 36upx;
					}
				}
				.ls_span{
					margin: 10upx 0;
					font-size: 28upx;
					color: #7A7A7A;
				}
				.ls_spans{
					margin: 16upx 0;
				}
			}
			.ls_none{
				background-color: #fff;
				font-size: 30upx;
				text-align: center;
				padding: 40upx 0;
			}
		}
	}
}
</style>
