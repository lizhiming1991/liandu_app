<template>
	<view class="content">
		<Header :titles="title"></Header>
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

<style>
</style>
