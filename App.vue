<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}

	 /* 
	 // #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO 
	
	  // #endif 
	 // #ifdef H5 
	
	  // #endif 
	  */
</script>

<style>
	/*每个页面公共css */
	/* #ifdef MP-WEIXIN || APP-PLUS || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO */
	body{
	  padding-top: 100upx;
	  box-sizing: border-box;
	}
	/* #endif */
	/* #ifdef H5 */
	/* 确认框 */
	/* uni.showModal({
		title: '提示',
		content: '这是一个模态弹窗',
		success: function (res) {
			if (res.confirm) {
				console.log('用户点击确定');
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	}); */
	/* #endif */
  
  /* APP-PLUS || MP-WEIXIN || MP-BAIDU 
  *  MP-ALIPAY || MP-TOUTIAO || H5
  * 
  * */
</style>
