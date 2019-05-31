<template>
	<view class="serch_content" style="flex-direction: column; flex: 1;">
		<view class="search_box">
			<view class="search_input"><image class="search_icon" src="/static/images/search_icon.png" mode=""></image><input class="search_center" type="text"></view>
			<view class="searc_cancel" @tap="cancel">取消</view>
		</view>
		<view class="search_record_content">
			<view class="search_record">
				<view class="record_title">
					<image class="times_icon" src="/static/images/time_icon_2.png" mode=""></image>	历史搜索
				</view>
				<image class="delete_button" src="/static/images/delete_icon.png" mode=""></image>
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
					<image class="times_icon" src="/static/images/hot_icon.png" mode=""></image>	热门搜索
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
	</view>
</template>

<script>
	export default {
	data() {
		return {
			title: '社圈'
		};
	},
	methods:{
		cancel() {
			uni.reLaunch({
				url: '../index/enterprise/enterprise'
			})
		}
	}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: row;
		font-size: 28upx;
	
	}

	page {
		background:rgba(247,248,250,1);
	}
	.serch_content {
	
	}
	.serch_content .search_box {
		justify-content: center;
		align-items: center;
		margin-bottom: 26upx;
	}
	.serch_content .search_box .search_input{
		width: 581upx;
		height: 64upx;
		box-shadow: 0px 4upx 10upx 0px rgba(153,153,153,0.05);
		border-radius: 32upx;
		background: #fff;
	}
	.serch_content .search_box .search_icon{
		margin: 19upx 0 0 23upx;
		align-items: center;
		width: 27upx;
		height: 27upx;
	}
	.serch_content .search_box .search_center{
		width: 100%;
		margin: 8upx 0 0 10upx;
	}
	.serch_content .search_box .searc_cancel{
		margin-left: 26upx;
	}
	.serch_content .search_record_content{
		padding: 50upx 0 115upx 0;
		flex-direction: column;
		background: #FFF;
	}
	.serch_content .search_record_content .times_icon{
		margin:6upx 11upx 0 71upx;
		width: 29upx;
		height: 29upx;
	}
	.serch_content .search_record_content .delete_button{
		margin-right: 43upx;
		width: 28upx;
		height: 37upx;
	}
	.serch_content .search_record_content .record_title{
		flex: 1;
		font-size:28upx;
		color:rgba(102,102,102,1);
	}
	.serch_content .search_record_content .search_text_record{
		justify-content: space-between;
		margin: 51upx 0 0 85upx;
		width: 580upx;
		flex-wrap: wrap;
	}
	.serch_content .search_record_content .search_text{
		align-items: center;
		margin-bottom: 24upx;
 
		padding: 0 26upx;
		height: 52upx;
		border-radius:26px;
		background:rgba(247,248,250,1);
	}
	.serch_content .search_hot{
		padding-bottom:80%;
	}
</style>