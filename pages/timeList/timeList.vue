<template>
	<view class="time_lesson">
		<Header :titles="title"></Header>
		<view class="date_table">
			<view class="date_swiper">
				<view class="sw_part">
					<swiper class="swiper" :current="currentpages">
					    <swiper-item v-for="(itemdata,index0) in  dateArr" :key="index0">
					        <view :class="nowdate == item.date?'sw_dates checked':'sw_dates'" @tap="changeDate(item.indexs,item.date,item.currentpage)" v-for="(item,index) in itemdata" :key="index">
					        	<view class="sw_note">{{item.date}}</view>
					        	<view class="sw_week">{{item.week}}</view>
					        </view>
					    </swiper-item>    
					</swiper>
					
				</view>
			</view>
		</view>
		<view class="lesson_list">
			<view class="lessons"  v-show="nowindex<= item.indexs" v-for="(item,index) in dateArr[currentpages]" :key="index">
				<view class="lesson_date">{{nowyear}}年{{nowmonth}}月{{item.date}}日</view>
				<view class="lesson_content">
					<view class="ls_lists" v-if="weekArr[index].length!=0">
						<view class="ls_left">
							<view>{{getTime(weekArr[index].startTime)}}</view>
							<view class="ls_span">至</view>
							<view>{{getTime(weekArr[index].endTime)}}</view>
						</view>
						<view class="ls_center">
							<text class="ls_line"></text>
						</view>
						<view class="ls_right">
							<view class="ls_large">{{weekArr[index].courseName}}</view>
							<view class="ls_span ls_spans">{{weekArr[index].theme}}</view>
							<view>{{weekArr[index].teacherName}}</view>
						</view>
					</view>
					<view class="ls_none" v-if="weekArr[index].length==0">暂无课程</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import {get,post} from '@/common/methods.js'
	export default{
		data(){
			return{
				title: "我的课表",
				nowyear: 2019,
				nowmonth: "06",
				nowdate: "",
				weekArr:[],
				wArr:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				nowindex: 3,
				alldays: 30,
				firstweek:"",
				currentpages: 0,
				nowpages:0,
			}
		},
		watch:{
			nowindex(){
				return this.nowindex
			},
			weekArr(){
				handler:(val)=> {}
				deep:true;
			}
		},
		onLoad(){
			let nowdates = new Date();
			this.nowdate = nowdates.getDate();
			let y = nowdates.getFullYear();
			let m =nowdates.getMonth()+1;
			let new_date = new Date(y,m,0);
			this.alldays = new_date.getDate(); 
			let first_date = new Date(y,m)
			let week = nowdates.getDay();
			this.nowindex = this.getindex(week);
			nowdates.setDate(1);
			this.firstweek = nowdates.getDay();
			this.getWeekdata();
		},
		onReady(){
			
		},
		computed:{
			dateArr(){
				let arr = [];
				let Arr =[];
				let index = 0;
				for(let i = 1;i<=this.alldays;i++){
					if(this.getindex(this.firstweek+i-1) == 1){
						if(i<this.nowdate){
							index = index+1;
						}else{
							index = index;
						}
					}
					let obj ={
						"date": i,
						"week": this.getweek(this.firstweek+i-1),
						"indexs": this.getindex(this.firstweek+i-1),
						"currentpage": index
					};
					if(i ==1){
						Arr.push(obj);
					}
					if(this.getindex(this.firstweek+i-1) == 1){
						if(i != this.alldays){
							arr.push(Arr);
							Arr = [];
						}
						
					}
					if(i>1){
						Arr.push(obj)
					}
					if(i == this.alldays){
						arr.push(Arr);
					}
				};
				this.currentpages = index;
				this.nowpages = index;
				// console.log(arr)
				return arr;
			}
		},
		methods:{
			changeDate(num,date,index){
				// console.log(num,date,index)
				if(index != this.nowpages){
					this.nowpages = index;
					this.getWeekdata();
				}
				this.nowindex = num;
				this.nowdate = date;
			},
			getWeekdata(){
				let data = this.nowyear+"-"+this.nowmonth+"-"+this.dateArr[this.nowpages][0].date;
				get("/course/schedule",{
					teacher_id: 1408,
					start_time: data
				}).then(res=>{
					if(res.status == 200){
						this.weekArr = res.data;
						console.log(res)
					}
					
				})
				console.log(data)
			},
			getweek(num){
				return this.wArr[num%7];
			},
			getindex(num){
				if(num%7 == 0){
					return 7;
				}else{
					return num%7;
				}
				
			},
			getTime(time){
				return time
			}
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
		padding: 30upx 11upx;
		height: 147upx;
		.sw_part{
			.sw_dates{
				text-align: center;
				float: left;
				width: 104upx;
				height: 104upx;
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
