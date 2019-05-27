<template>
	    <view>
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
        <view class="content">
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
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
export default {
    components: {uniSegmentedControl},
    data() {
        return {
            items: ['选项卡1','选项卡2','选项卡3'],
            current: 0
        }
    },
		onLoad() {
		uni.showModal({
	    title: '提示',
		confirmText:'免费申请',
		cancelText:'我先看看',
	    content: '为了更好的享受企业服务,请先申请为企业会员',
	    success: function (res) {
	        if (res.confirm) {
	            console.log('用户点击确定');
	        } else if (res.cancel) {
	            console.log('用户点击取消');
	        }
	    }
	});
			},
    methods: {
        onClickItem(index) {
            if (this.current !== index) {
                this.current = index;
            }
        }
    }
}
</script>

<style>
</style>
