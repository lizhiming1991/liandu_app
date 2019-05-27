<template>
	<view class="content">
		<Header :titles="title"></Header>
		<view class="header">
			<view class="left">
				<image src="../../static/image/sta_tushu.png"></image>
			</view>
			<view class="right">
				<view class="title"></view>
				<view class="username"></view>
				<view class="introduce"></view>
			</view>
		</view>
		<view class="stars">
			<text class="score">10</text>
			<text class="readers">8340</text>
		</view>
		<view class="star2">
			<text class="score2">333点评过></text>
			<text class="readers2">阅读此书></text>
		</view>
		<view class="userinfo">
			<view class="b_title">作者简介</view>
			<view class="b_content">
				这里写作者简介简介简介简介简介这里写作者简介简介简介简介简介。
			</view>
		</view>
		<view class="discuss">
			<view class="names">全部评论
				<text class="d_number">(333条)</text>
			</view>
			<view class="lists">
				<view class="list">
					<view class="p_left">
						<image src="../../static/image/sta_userphoto.png"></image>
					</view>
					<view class="p_right">
						<view class="part1">
							<text class="p_name"></text>
							<text class="p_stars"></text>
						</view>
						<view class="part2">
							<text class="tag0">想看</text>
							<text class="tag">读书</text>
							<text class="tag">励志</text>
						</view>
						<view class="part3">
							哈哈哈哈哈哈哈哈哈哈哈哈哈哈
						</view>
						<view class="part4">
							<text>2019/1/1 12:54</text>
							<view class="shows">
								<text>回复(2)</text>
								<text>
									<image src="../../static/images/iocn_dz.png"></image>28
								</text>
							</view>
						</view>
						<view class="part5">
							<input type="text" placeholder="回复:@昵称">
							<text>回复</text>
						</view>
						<view class="part6">
							<view><text>张三 :</text>你的歌也太好听了吧</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	export default {
		data() {
			return {
				title: "图书"
			};
		},
		methods:{
			
		},
		components:{
			Header
		}
	}
</script>

<style lang="scss" scoped>
</style>
