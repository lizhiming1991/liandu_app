<template>
	<view class="serch_content" style="flex-direction: column; flex: 1;">
		<view class="search_box">
			<view class="search_input">
				<image class="search_icon" src="/static/images/search_icon.png" mode=""></image><input class="search_center" type="text">
			</view>
			<view class="searc_cancel" @tap="cancel">取消</view>
		</view>
		<view class="search_record_content">
			<view class="search_record">
				<view class="record_title">
					<image class="times_icon" src="/static/images/time_icon_2.png" mode=""></image> 历史搜索
				</view>
				<!-- <image class="delete_button" src="/static/images/delete_icon.png" mode=""></image> -->
			</view>
			<view class="search_text_record">
				<view class="search_text">公益</view>
				<view class="search_text">公公益</view>
				<view class="search_text">公益</view>
				<view class="search_text">公公益</view>
				<view class="search_text">公益益</view>
				<view class="search_text">公益公益公</view>
				<view class="search_text">公益益</view>
			</view>
		</view>
			<view class="search_record_content search_hot">
			<view class="search_record">
				<view class="record_title">
					<image class="times_icon" src="/static/images/hot_icon.png" mode=""></image> 热门搜索
				</view>
			</view>
			<view class="search_text_record">
				<view class="search_text">公益</view>
				<view class="search_text">公益公益</view>
				<view class="search_text">公益</view>
				<view class="search_text">公益公益公益</view>
				<view class="search_text">公益</view>
				<view class="search_text">公益公益公益</view>
				<view class="search_text">公益</view>
			</view>
		</view>
	<!-- 	<view class="not_found" >
			 <view> 
			 	<uni-segmented-control style="width: 310upx; margin-right: 410upx;" :current="current" activeColor="#01B18D" :values="items"
			 	 @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
        <view class="content">
						<view class="">
							共有<text class="">3</text>条相关信息
						</view>
            <view v-show="current === 0">
                选项卡1的内容
            </view>
            <view v-show="current === 1">
                选项卡2的内容
            </view>
            <view v-show="current === 2">
                选项卡3的内容
            </view>
        </view>
    </view>
		</view> -->
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				title: '社圈',
				current: 0,
				items: ['图书', '杂志', '课程'],
			};
		},
		components: {uniSegmentedControl},
		methods: {
			cancel() {
				uni.reLaunch({
					url: '../index/enterprise/enterprise'
				})
			},
			onClickItem(index) {
				//console.log(index)
				if (this.current !== index) {
					this.current = index;
				}
				if (index == 1) {
					console.log('111')
				} else if (index == 2) {
					console.log('222')

				}
			},
		}
	}
</script>

<style>
	

	page {
		background: rgba(247, 248, 250, 1);
	}

	.serch_content {
		display: flex;
	}

	.serch_content .search_box {
		display: flex;
		margin-top: 65upx;
		margin-bottom: 26upx;
		justify-content: center;
		align-items: center;
	}

	.serch_content .search_box .search_input {
		display: flex;
		width: 581upx;
		height: 64upx;
		box-shadow: 0px 4upx 10upx 0px rgba(153, 153, 153, 0.05);
		border-radius: 32upx;
		background: #fff;
	}

	.serch_content .search_box .search_icon {
		display: flex;
		margin: 19upx 0 0 23upx;
		align-items: center;
		width: 27upx;
		height: 27upx;
	}

	.serch_content .search_box .search_center {
		display: flex;
		width: 100%;
		margin: 8upx 0 0 10upx;
	}

	.serch_content .search_box .searc_cancel {
		display: flex;
		font-size: 28upx;
		margin-left: 26upx;
	}

	.serch_content .search_record_content {
		display: flex;
		padding: 50upx 0 115upx 0;
		flex-direction: column;
		background: #FFF;
	}

	.serch_content .search_record_content .times_icon {
		display: flex;
		margin: 6upx 11upx 0 71upx;
		width: 29upx;
		height: 29upx;
	}

	.serch_content .search_record_content .delete_button {
		display: flex;
		margin-right: 43upx;
		width: 28upx;
		height: 37upx;
	}

	.serch_content .search_record_content .record_title {
		display: flex;
		flex: 1;
		font-size: 28upx;
		color: rgba(102, 102, 102, 1);
	}

	.serch_content .search_record_content .search_text_record {
		display: flex;
		justify-content: space-between;
		margin: 51upx 0 0 85upx;
		width: 580upx;
		flex-wrap: wrap;
	}

	.serch_content .search_record_content .search_text {
		display: flex;
		align-items: center;
		margin-bottom: 24upx;
		padding: 0 26upx;
		height: 52upx;
		border-radius: 26px;
		background: rgba(247, 248, 250, 1);
	}

	.serch_content .search_hot {
		display: flex;
		padding-bottom: 80%;
	}
/* not found start */
	.serch_content .not_found {
		
	}
	.serch_content .not_found .search_result{
		
	}
	
	.serch_content .not_found .search_result .book_result{
		
	}
</style>
