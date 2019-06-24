<template>
	<view class="journal_list">
		<block v-for="(item, index) in magazineList" :key="index">
			<view class="journal_cover" @tap="to_details(item.id)">
				<view class="img_box">
					<image class="journal_cover_img" :src="item.photo?(ImgUrl+item.photo):imgerror" mode=""></image>
					<view class="book_price" v-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic!='0' || item.ispublic != 0)">￥{{item.price}}</view>
					<view class="book_price" v-else-if="(item.ispay == '1' || item.ispay == 1) && (item.ispublic0 == '0' || item.ispublic == 0) ">企业</view>
					<view class="book_price" v-else-if="(item.ispay != '1' || item.ispay != 1) && (item.ispublic=='0' || item.ispublic == 0)">企业</view>
				</view>
				
				
				
				<view class="journal_cover_title" v-html="item.name">
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgerror:"../../static/images/book_static.jpg",
			}
		},
		props: [
			"magazineList",
			"ImgUrl"
		],
		methods: {
			to_details(cid) {
				this.$emit("toMagazineDetailas",{"lld": cid})
			}
		}
	}
</script>

<style scoped>
	.book_price {
		position: absolute;
		top: 0;
		left: 0;
	/* 	margin-left: 18upx; */
		padding: 0 33upx;
		height: 29upx;
		font-size: 25upx;
		color: #FF546C;
		border-radius: 4px;
		background: rgba(251, 221, 220, 1);
	}
	
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
		padding-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 349upx;
		background: #fff;
	}
	.journal_list .journal_cover .img_box{
		position: relative;
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
		width: 184upx;
		height: 296upx;
	}
	
	.journal_list .journal_cover .journal_cover_title {
		color: #333;
		font-size: 32upx;
	}
	

</style>
