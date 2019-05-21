<template>
	<view class="t0_register" style="flex-direction: column; flex: 1;">
			<view>
				<view style="flex: 1;"></view>
				<view class="to_register"><navigator class="register_url" url="/pages/login/register">前往注册</navigator>></view>
			</view>
	</view>
</template>

<script>
</script>

<style scoped>
	view {
		display: flex;
		flex-direction: row;
	}
	.to_register{
		margin-right: 87upx;
		color: #000;
		font-size: 22upx;
	}
	.to_register .register_url{
		border-bottom: 2upx solid #000;
	}
</style>
