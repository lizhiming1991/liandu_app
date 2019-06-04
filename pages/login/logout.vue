<template>
	<view>
		<!-- <view @tap="clickText">上传文件</view>
		<input type="text" v-model="dzcc" value="" /> -->
		<view class="">
			logout
		</view>
		<course-list :courseList="courseLists" @toDetails="toDetails"></course-list>
		<!-- <not-found></not-found> -->
	</view>
</template>
<script>
	import notFound from '@/components/notFound/notFoundContetn.vue'
	import courseList from '@/components/courseList/courseList.vue'
	export default {
		data() {
			return {
				dzcc: 'nihao 2020',
				courseLists:[{"id":1,"courseName": '西游记1',"teacherName":"吴承恩1","updateTime":"2013-01-19T12:54:26"},
				{"id":2,"courseName": '西游记2',"teacherName":"吴承恩2","updateTime":"2014-04-09T12:54:26"},
				{"id":3,"courseName": '西游记3',"teacherName":"吴承恩3","updateTime":"2015-02-4T12:54:26"},
				{"id":4,"courseName": '西游记4',"teacherName":"吴承恩4","updateTime":"2017-03-11T12:54:26"}
				]
			}
		},
		computed: {},
		components: {
			notFound,
			courseList
		},
		methods: {
			toDetails(item) {
				console.log(item.lld)
				uni.navigateTo({
					url: '../enterpriseDetails/applyMember?lld='+item.lld
				});
			},
			clickText() {
				// uni.chooseImage({
				// 	success: (chooseImageRes) => {
				// 		const tempFilePaths = chooseImageRes.tempFilePaths;
				// 		uni.uploadFile({
				// 			url: 'http://192.168.0.185:9999/enterprise/associator-company/upload',
				// 			filePath: tempFilePaths[0],
				// 			name: 'file',
				// 			formData: {
				// 				'user': 'test'
				// 			},
				// 			success: (uploadFileRes) => {
				// 				console.log(JSON.parse(uploadFileRes.data).data);
				// 			}
				// 		});
				// 	}
				// });
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://192.168.0.210:9999/enterprise/associator-company/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								console.log(uploadFileRes.data);
							}
						});

						uploadTask.onProgressUpdate((res) => {
							console.log(res)
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

							// 测试条件，取消上传任务。
							if (res.progress > 50) {
								uploadTask.abort();
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
</style>
