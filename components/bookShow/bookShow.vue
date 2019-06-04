<template>
	<view class="content_list">
		<block>
			<view class="book_info">
				<view class="book_cover_content">
					<image class="booK_cover_img" src="/static/image/tushu.png"></image>
				</view>
				<view class="book_cover_info">
					<view class="">
						<view class="book_title_content">
							<view class="book_title">西游记</view>
							<!-- <view class="book_price" v-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic!='0' || item.ispublic != 0)">￥{{item.price}}</view>
						<view class="book_price" v-else-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic0 == '0' || item.ispublic == 0) ">企业</view>
							<view class="book_price" v-else-if="(item.ispay != '1' || item.ispay != 1) && (item.ispublic=='0' || item.ispublic == 0)">企业</view> -->
						</view>
					</view>
					<view class="book_author">
						<view class="">
							吴承恩
						</view>
					</view>
					<view class="book_brief_info">
						简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
</script>

<style scoped>
	.content_list {
		display: flex;
		flex-direction: column;
		margin: 32upx 0 0 22upx;
		padding-bottom: 300upx;
		width: 704upx;
		background: #fff;
		border-radius: 30upx 30upx 0px 0px;
	}
	
	.content_list .book_cover_info {
		display: flex;
		flex-direction: column;
		width: 431upx;
	}
	
	.content_list .book_info {
		display: flex;
		margin-top: 49upx;
		height: 299upx;
	}
	
	.content_list .book_title_content {
		display: flex;
		margin-top: 28upx;
		align-items: center;
	}
	
	.content_list .book_title_content .book_title {
		display: flex;
		font-size: 33upx;
		color: #333;
	}
	
	.content_list .book_title_content .book_price {
		display: flex;
		align-items: center;
		margin-left: 18upx;
		padding: 0 33upx;
		height: 29upx;
		font-size: 25upx;
		color: #FF546C;
		border-radius: 4px;
		background: rgba(251, 221, 220, 1);
	}
	
	.content_list .book_cover_content {
		display: flex;
		margin: 0 25upx 0 29upx;
	}
	.content_list .booK_cover_img {
		display: flex;
		width: 184upx;
		height: 299upx;
		border-radius: 4upx;
	}
	
	.content_list .book_author {
		display: flex;
		margin-top: 31upx;
		font-size: 27upx;
		color: #333;
	}
	
	.content_list .book_brief_info {
		display: flex;
		margin-top: 39upx;
		font-size: 25upx;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	
	
</style>
