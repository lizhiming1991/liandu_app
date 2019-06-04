<template>
	<view class="enterprise">
		<view class="enterprise_title" style="">
			<view class="title_text">企业</view>
			<view class="title_sousuo">
				<navigator url="../../enterpriseDetails/enterpriseSearch"><image class="sousuo_icon" src="/static/images/sousuo.png" mode=""></image></navigator>
				
			</view>
		</view>
		<view class="select_label">
			<view class="label_one">
				<!-- 公用组件:picker start -->
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker class="picker_center" @change="tradeChange" :value="tradeIndex" :range="trade">
								<view class="uni-input">{{trade[tradeIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 公用组件:picker end -->
				<image class="xiala_icon" src="/static/images/xiala.png" mode=""></image>
			</view>
			<view class="label_two">
				<!-- 公用组件:picker start -->
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker class="picker_center" @change="regionChange" :value="regionIndex" :range="region">
								<view class="uni-input">{{region[regionIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 公用组件:picker end -->
				<image class="xiala_icon" src="/static/images/xiala.png" mode=""></image>
			</view>
		</view>
		<block class="enterprise_list_content" v-for="(item , index) in enterpriseList" :key="index">
			<view class="enterprise_list">
				<view class="enterprise_list_center" @tap="nextPage" :data-enterpriseid="item.id" :data-joinedState="item.joinedState">
					<view class="list_img_box">
						<image class="list_img" src="/static/image/qiye_left.png" mode=""></image>
					</view>
					<view class="enterprise_details">
						<view class="" style="flex-direction:column;">
							<view class="enterprise_name">
								{{item.name}}
							</view>
							<view class="enterprise_info">
								{{item.cont}}
							</view>
							<view class="enterprise_content">
								<view class="list_lable_one">
									<image src="/static/images/tag.png" style="width: 22upx; height: 28upx;" mode=""></image><text class="list_lable_text">{{item.trade}}</text>
								</view>
								<view class="list_lable_two">
									<image src="/static/images/zuobiao.png" style="width: 22upx; height: 28upx;" mode=""></image><text class="list_lable_text">{{item.address.split('市').length == 1 ? item.address.split('市')[0] : item.address.split('市')[0] + '市'}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="apply_vip">
					<view class="apply_vip_text" v-if=" item.joinedState == null " @tap="toApplyMember" :data-enterpriseLid = "item.id" :data-enterpriseName="item.name">
						申请会员
					</view>
					<view class="under_review" v-else-if="item.joinedState == 'init'">会员审核中</view>
					<view class="vip_added" v-else-if="item.joinedState == 'pass'">已加入</view>
				</view>
			</view>
		</block>
		<navigator url="../../login/logout">To logout</navigator>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {get,post} from '@/common/methods.js';
	import {
		onlineURL
	} from '@/common/common.js';
	export default {
		data() {
			return {
				isVip: '',
				enterpriseList: [],
				trade: ['行业'],
				region: ['地区'],
				tradeIndex: 0,
				regionIndex: 0,
				targetValue: '',
				tradeValue:''
			};
		},
		computed: {
			...mapState([
				"userid"
			]),
		},
		onLoad() {
			get('/enterprise/company/trade/all').then(res=>{
				console.log(res);
				for (let data of res.data) {
					this.trade.push(data);
				}
			});
			//首次加载行业列表
// 			uni.request({
// 				url: onlineURL + '/enterprise/company/trade/all',
// 				method: 'GET',
// 				success: (res) => {
// 					console.log(res.data.data);
// 					for (let data of res.data.data) {
// 						this.trade.push(data);
// 					}
// 
// 				}
// 			});
			//首次加载地区列表
			get('/enterprise/company/region/all').then(res=>{
				console.log(res);
				for (let data of res.data) {
					console.log(data)
					let area = data.split("市");
					if (area.length == 1) {
						this.region.push(area[0])
					} else if (area.length == 2) {
						this.region.push(area[0] + '市')
					}
				}
			});
			//首次加载列表数据
			get('/enterprise/company/all',{'userId': this.userid }).then(res=>{
				console.log(res)
				this.enterpriseList = res.data
				});
		},
		methods: {
			toApplyMember: function(e) {
				let enterpriseLid = e.currentTarget.dataset.enterpriselid;
				let enterpriseName = e.currentTarget.dataset.enterprisename;
				uni.navigateTo({
					url: '../../enterpriseDetails/applyMember?enterpriseLid=' + enterpriseLid + '&enterpriseName='+enterpriseName,
					success: res => {
					}
				});
			},
			tradeChange: function(e) {
				console.log('1picker发送选择改变，携带值为', e.target.value)
				this.tradeIndex = e.target.value
				this.tradeValue = this.region[e.target.value]
				console.log(this.targetValue)
				if (this.tradeValue != '地区') {
					get('/enterprise/company/all/region',{'region':this.tradeValue,'userId':this.userid}).then(res=>{
							this.enterpriseList = res.data
						});
				// 	uni.request({
				// 		url: onlineURL + '/enterprise/company/all/region?region=' + this.tradeValue + '&&userId=1340',
				// 		method: 'GET',
				// 		success: (res) => {
				// 			this.enterpriseList = res.data.data;
				// 
				// 		}
				// 	});
				} else {
					get('/enterprise/company/all',{ 'userId': this.userid}).then(res=>{
						this.enterpriseList = res.data;
					});
					// uni.request({
					// 	url: onlineURL + '/enterprise/company/all?userId=1340',
					// 	method: 'GET',
					// 	success: (res) => {
					// 		this.enterpriseList = res.data.data;
					// 		console.log(this.enterpriseList);
					// 	}
					// });
				}
			},
			regionChange: function(e) {
				console.log('2picker发送选择改变，携带值为', e.target.value)
				this.regionIndex = e.target.value
				//console.log(this.region[e.target.value])
				this.targetValue = this.region[e.target.value]
				console.log(this.targetValue)
				if (this.targetValue != '地区') {
					get('/enterprise/company/all/region',{'region': this.targetValue,'userId': this.userid}).then(res=>{
						this.enterpriseList = res.data;
						});
					
// 					uni.request({
// 						url: onlineURL + '/enterprise/company/all/region?region=' + this.targetValue + '&&userId=1340',
// 						method: 'GET',
// 						success: (res) => {
// 							this.enterpriseList = res.data.data;
// 						}
// 					});
				} else {
					get('/enterprise/company/all',{ 'userId': this.userid }).then(res=>{
							this.enterpriseList = res.data;
						});
					// uni.request({
					// 	url: onlineURL + '/enterprise/company/all?userId=1340',
					// 	method: 'GET',
					// 	success: (res) => {
					// 		this.enterpriseList = res.data.data;
					// 		console.log(this.enterpriseList);
					// 	}
					// });
				}
			},
			nextPage(e) {
				let enterpriseid = e.currentTarget.dataset.enterpriseid;
				let joinedState = e.currentTarget.dataset.joinedstate;
				if (joinedState === undefined || joinedState == undefined) {
					// console.log('123')
					joinedState = 'notVip';
				}
				//console.log(joinedState)
				uni.navigateTo({
					url: '../../enterpriseDetails/enterpriseInfo?enterpriseid=' + enterpriseid + '&joinedState=' + joinedState,
					success: res => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		flex-direction: row;
	}

	.enterprise {
		flex-direction: column;
		flex: 1;
		margin-top: 40upx;
	}

	.enterprise .enterprise_title {
		justify-content: space-between;
	}

	.enterprise .title_text {
		margin-left: 20upx;
		color: #333;
		font-size: 44upx;
	}

	.enterprise .title_sousuo {
		margin-right: 20upx;
	}

	.enterprise .sousuo_icon {
		width: 51upx;
		height: 51upx;
	}

	.enterprise .select_label {
		margin-top: 65upx;
		margin-bottom: 67upx;
		justify-content: center;
	}
	.enterprise .select_label .label_one ,.enterprise .select_label .label_two{
	
	}
	.enterprise .select_label .label_one,
	.enterprise .select_label .label_two{
		font-size: 30upx;
		display: flex;
		justify-content: center; 
		align-items: center;
		width: 285upx;
		height: 65upx;
		background: rgba(247, 248, 250, 1);
		border-radius: 32upx;
	}

	.select_label .label_two {
		margin-left: 41upx;
	}
	.enterprise .select_label .label_one .xiala_icon,
	.enterprise .select_label .label_two .xiala_icon {
		margin-left: 20upx;
		width: 25upx;
		height: 16upx;
	}

	.enterprise .enterprise_list {
		margin-top: 47upx;
		flex-direction: column;
		flex: 1;
	}

	.enterprise .enterprise_list .list_img_box {
		justify-content: center;
		align-items: center;
		width: 201upx;
		height: 201upx;
		background: rgba(199, 199, 199, 1);
	}

	.enterprise>view:nth-child(3) {
		padding-top: 50upx;
		border-radius: 50upx 0px 0px 0px;
		//border: 1px solid red;
		box-shadow: -7px -8px 17px -7px rgba(108, 109, 110, 0.1);
	}

	.enterprise .enterprise_list .list_img {
		width: 158upx;
		height: 157upx;
	}

	.enterprise .enterprise_list .enterprise_list_center {
		justify-content: center;
	}

	.enterprise .enterprise_list .enterprise_details {
		margin-left: 30upx;
		width: 467upx;
	}

	.enterprise .enterprise_list .enterprise_details .enterprise_name {
		margin-bottom: 24upx;
		color: #333;
		font-size: 36upx;
	}

	.enterprise .enterprise_list .enterprise_details .enterprise_info {
		font-size: 28upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.enterprise .enterprise_list .enterprise_details .enterprise_content {
		// justify-content: flex-start;
		align-items: center;
		color: #666;
		font-size: 26upx;
	}

	.enterprise .enterprise_list .enterprise_details .enterprise_content .list_lable_text {
		margin-left: 13upx;
	}

	.enterprise .enterprise_list .enterprise_details .enterprise_content .list_lable_one,
	.enterprise .enterprise_list .enterprise_details .enterprise_content .list_lable_two {
		flex: 1;
		margin-top: 26upx;
		align-items: center;
	}

	.enterprise .apply_vip {
		justify-content: flex-end;
		padding-bottom: 42upx;
		border-bottom: 2upx solid #eee;
	}

	.enterprise .apply_vip .under_review {
		margin: 49upx 53upx 0 0;
		color: #01B18D;
		font-size: 28upx;
	}

	.enterprise .apply_vip .vip_added {
		justify-content: center;
		align-items: center;
		margin: 37upx 19upx 0 0;
		width: 236upx;
		height: 58upx;
		font-size: 28upx;
		color: #fff;
		border-radius: 4upx;
		background: rgba(1, 177, 141, 1);
	}

	.enterprise .apply_vip .apply_vip_text {
		justify-content: center;
		align-items: center;
		margin-top: 39upx;
		margin-right: 19upx;
		width: 236upx;
		height: 58upx;
		color: #fff;
		font-size: 28upx;
		border-radius: 4px;
		background: #FF546C;
	}
</style>
