<template>
	<view class="journal_list">
		<block>
			<view class="journal_cover">
				<view>
					<image class="journal_cover_img" src="/static/image/tushu.png" mode=""></image>
				</view>
				<view class="journal_cover_title">
					西游记
				</view>
			</view>
		</block>
	</view>
</template>

<script>
</script>

<style scoped>
	.journal_list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 66upx 0 0 22upx;
		padding-bottom: 300upx;
		width: 704upx;
	
		border-radius: 30upx 30upx 0px 0px;
	}
	
	.journal_list .journal_cover {
		margin-bottom: 4upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	
		width: 349upx;
		height: 444upx;
		background: #fff;
	}
	
	.journal_list .journal_cover:nth-child(2n-1) {
		margin-right: 4upx;
	}
	
	.journal_list .journal_cover:nth-child(1) {
		border-radius: 30upx 0upx 0upx 0upx;
	}
	
	.journal_list .journal_cover:nth-child(2) {
		border-radius: 0upx 30upx 0upx 0upx;
	}
	
	.journal_list .journal_cover .journal_cover_img {
		margin-top: 51upx;
		width: 184upx;
		height: 296upx;
	}
	
	.journal_list .journal_cover .journal_cover_title {
		color: #333;
		font-size: 32upx;
	}
	

</style>
