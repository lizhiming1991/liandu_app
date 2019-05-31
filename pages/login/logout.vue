<template>
	<view>
		<!-- <view @tap="clickText">上传文件</view>
		<input type="text" v-model="dzcc" value="" /> -->
	
			<not-found></not-found>
		
		
	</view>
</template>
<script>
	import notFound from '@/components/notFound/notFoundContetn.vue'
	export default {
		data() {
			return {
				dzcc:'nihao 2020'
			}
		},
		computed: {},
components: {
			notFound
		},
		methods: {
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
