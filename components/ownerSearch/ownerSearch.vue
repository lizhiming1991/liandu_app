<template>
	<view class="serch_content" style="flex-direction: column; flex: 1;" v-if="owner_record != ''">
		<view class="search_record_content">
			<view class="search_record">
				<view class="record_title">
					<image class="times_icon" src="/static/images/time_icon_2.png"></image> 历史搜索
				</view>
				<image class="delete_button" @tap="deleteOwnerSearch" src="/static/images/delete_icon.png" mode=""></image>
			</view>
			<view class="search_text_record">
				<block v-for="(item, index) in owner_record" :key="index">
					<view class="search_text">{{item.searchKey}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			deleteOwnerSearch() {
				console.log('123')
				this.$emit('deleteOwnerRecord')
			}
		},
		props:[
			"owner_record"
		],
	}
</script>

<style scoped>
	page {
		background: rgba(247, 248, 250, 1);
	}
	
	view {
		font-size: 28upx;
	}
	
	.serch_content {
		display: flex;
	}
		
	.serch_content .search_record {
		display: flex;
		justify-content: center;
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
</style>
