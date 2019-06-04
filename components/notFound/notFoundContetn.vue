<template>
	<view class="not_found" style="flex: 1;">
		<view style="flex-direction: column; flex: 1; ">
			<view style="margin-left: 230upx;">
				<view class="page_content">
					<image class="not_icon" src="../../static/images/not_found_content.png" mode=""></image>
				</view>
			</view>
			<view>
				<view class="prompt_info" style="margin-left: 180upx;">
				真遗憾!<text class="prompt_text">没有找到相关信息</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	view{
		display: flex;
		flex-direction: row;
	}
	.not_found .page_content{
		margin-top: 190upx;
		width: 100%;

	}
	.not_found .not_icon{
		width: 264upx;
		height: 231upx;
	}
	.not_found .prompt_info{
		margin-top: 55upx;
		width: 100%;
		font-size: 30upx;
		color: #666;
	
	}
	.not_found .prompt_text{
		margin-left: 24upx;
	}
</style>
