<template>
	    <view class="content">
			            <button @click="getCode" :disabled="disabled" class="get-vcode">
				                {{countdown}} <text v-show="timestatus">秒重获</text>
				          </button>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				clear: '',
			}
		},
		onLoad() {},
		methods: {
			// 获取input内容
			getCode() {
				this.countdown = 3;
				this.timestatus = true;
				this.clear = setInterval(this.countDown, 1000);
			},
			countDown() {
				if (!this.countdown) {
					this.disabled = false;
					this.timestatus = false;
					this.countdown = '获取验证码';
					clearInterval(this.clear);
					this.countdown = '再次获取验证码';
				} else {
					-- this.countdown;
				}
			}

		},
	}
</script>

<style>
</style>
