<template>
	<view class="apply_member">
		<Header></Header>
		<view class="apply_title">
			<view>企业会员申请</view>
		</view>
		<view class="apply_content">
			<view class="member_info">企业名称</view>
			<view>
				<input class="member_input" disabled v-model="enterpriseName" type="text" value="" />
			</view>
		</view>
		<view class="apply_content">
			<view class="member_info">真实姓名</view>
			<view>
				<input class="member_input" v-model="name" type="text" value="" />
			</view>
		</view>
		<view class="apply_content">
			<view class="member_info">工作证件</view>
			<view>
				<input class="member_input" v-model="workNumber" type="text" value="" />
			</view>
		</view>
		<view class="apply_content" >
			<view class="member_info">部门</view>
			<view>
				 <input class="member_input" v-model="dept" type="text" value="" />
			</view>
		</view>
		<view  class="apply_uploading">
			<view class="uploading_text">
				上传证件
			</view>
			<view class="uploading_credentials">
				<view class="credentials_box" v-if="imageList.length < imageLength" @tap="chooseImage">
					<image class="credentials_photo" src="/static/images/shangchuan.png" mode=""></image>
					<view class="credentials_text">选择文件</view>
				</view>
				<view class="body-view" style="margin-top: -30upx;">
					<view class="uploads">
					<!-- 图片上传 -->
					<view class='upload-image-view'>
						<!-- 标题已经省略 -->
						<block v-for="(image,index) in imageList" :key="index">
							<view class='image-view'>
								<image :src="image" :data-src="image" @tap="previewImage" style=""></image>
								<view class='del-btn' :data-index="index" @tap='deleteImage'>
									<view class='baicha'></view>
								</view>
							</view>
						</block>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="apply_button_box">
			<view class="apply_button" @tap="apply">提交申请</view>
		</view>
		<view class="apply_button_box">
			<view class="apply_button_cancel">取消</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {get,post} from '@/common/methods.js';
	import {
		onlineURL
	} from '@/common/common.js';
	import Header from '@/components/header/header.vue';
	export default {
		data() {
			return {
				enterpriseName:'',
				cold: '',
				name: '',
				workNumber: '',
				dept: '',
				imageList: [], //保存图片路径集合
				imageLength: 1, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				imgPath:'',
				sourceType : [
					['camera'], //拍照
					['album'], //相册
					['camera', 'album'] //拍照或相册
				],
				sizeType : [
					['compressed'], //压缩
					['original'], //原图
					['compressed', 'original'] //压缩或原图
				]
			};
		},
		computed: {
			...mapState([
				"userid"
			]),
		},
		onLoad(e) {
			this.enterpriseName = e.enterpriseName;
			this.cold = e.enterpriseLid;
		},
		methods: {
			apply() {
				let requiredInfo = {
					"associatorid": this.userid,
					"coId": this.cold,
					"name": this.name,
					"dept": this.dept,
					"code": this.workNumber,
					"path": this.imgPath
				}
				let namereg = /^[\u4e00-\u9fa5 ]{2,20}$/;
				if ( !namereg.test(this.name) ) {
					uni.showToast({
						title: '真实姓名格式不正确',
						duration: 2000,
						icon: 'none',
					});
				}else if(this.name == ''){
					uni.showToast({
						title: '真实姓名不能为空',
						duration: 2000,
						icon: 'none',
					});
				}else if( this.workNumber == ''){
					uni.showToast({
						title: '工作证件不能为空',
						duration: 2000,
						icon: 'none',
					});
				}else if( this.dept == ''){
					uni.showToast({
						title: '部门不能为空',
						duration: 2000,
						icon: 'none',
					});
				}else if( this.imgPath == '' ){
					uni.showToast({
						title: '请上传证件',
						duration: 2000,
						icon: 'none',
					});
				}else if(this.userid == null){
					uni.showToast({
						title: '请先登录',
						duration: 2000,
						icon: 'none',
					});
				}else{
					post('/enterprise/associator-company/add',requiredInfo).then(res=>{
							uni.reLaunch({
								url: './submitted'
							});
						});	
				}
			},
			//选择图片
			chooseImage: async function() {
					uni.chooseImage({
						sourceType: this.sourceType[this.sourceTypeIndex],
						// #ifdef MP-WEIXIN
						sizeType: this.sizeType[this.sizeTypeIndex],
						// #endif
						count: this.imageLength - this.imageList.length,
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
							uni.uploadFile({
								url: onlineURL + '/enterprise/associator-company/upload',
								filePath: this.imageList[0],
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									// console.log(JSON.parse(uploadFileRes.data).data);
									this.imgPath = JSON.parse(uploadFileRes.data).data;
								}
							});
						}
					})
				},
				//预览图片
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},
				//删除图片
				deleteImage: function(e) {
					var index = e.target.dataset.index;
					var that = this;
					var images = that.imageList;
					images.splice(index, 1);
					that.imageList = images;
					this.imgPath = '';
				}
		},
		components: {
			Header
		}
	}
</script>

<style scoped>
	@import "../../static/css/uploading.css";

	view {
		display: flex;
		flex-direction: row;
	}
	.apply_member {
		flex-direction: column;
		flex: 1;
	}
	.apply_member .apply_content{
		justify-content: center;
		align-items: center;
		margin-bottom: 39upx;
	}
	.apply_member .apply_title{
		justify-content: center;
		align-items: center;
		margin: 77upx 0 97upx 0;
	}
	.apply_member .member_info{
		width: 131upx;
		color: #666;
		font-size: 32upx;
	}
	.apply_member .member_input{
		margin-left: 28upx;
		padding-left: 20upx;
		width: 440upx;
		height: 66upx;
		font-size: 32upx;
		color: #666;
		border-radius:4px;
		background:rgba(247,248,250,1);
	}
	.apply_member .apply_uploading{
		margin-top: 6upx;
	}
	.apply_member .apply_uploading .uploading_credentials .credentials_photo{
		width: 30upx;
		height: 24upx;
	}
	.apply_member .apply_uploading .uploading_text{
		margin-left: 79upx;
		margin-right: 35upx;
		width:122upx;
		height:29upx;
		color: #666;
		font-size:30upx;
	}
	.apply_member .apply_uploading .uploading_credentials{
		
	}
	.apply_member .apply_uploading .credentials_box{
		justify-content: center;
		align-items: center;
		width: 193upx;
		height: 50upx;
		color: #666;
		font-size: 26upx;
		background: #01b18d;
	}
	.apply_member .apply_uploading .credentials_box .credentials_text{
		margin-left: 17upx;
	}
	.apply_member .apply_button_box{
		justify-content: center;
	}
	.apply_member .apply_button{
		margin-top: 130upx;
		justify-content: center;
		align-items: center;
		width: 600upx;
		height: 80upx;
		color: #fff;
		background: #01b18d;
		border-radius:4px;
	}
	.apply_member .apply_button_cancel{
		margin-top: 39upx;
		justify-content: center;
		align-items: center;
		width: 600upx;
		height: 80upx;
		color: #666;
		background:rgba(247,248,250,1);
		border-radius:4px;
	}
</style>
