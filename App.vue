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
	}
	/* #endif */
	/* #ifdef H5 */
	body{
	  /* padding-top: 20upx; */
	}
	/* #endif */
  
  /* APP-PLUS || MP-WEIXIN || MP-BAIDU 
  *  MP-ALIPAY || MP-TOUTIAO || H5
  * 
  * */
</style>
