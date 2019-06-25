<template>
	<view class="container">
		<Header :titles="title"></Header>
		<view class="lunbobox">
			<ynGallery 
			:images="ImgArr" 
			:galleryheight="260" 
			 bkstart="#ddd"                     
			 bkend="#ddd"                            
			:imgviewwidth="250" 
			:imgviewheight="200"
			:showdec="true"
			@clickimg="onclickimg"  
			></ynGallery>
		</view>
	</view>	
</template>
<script>
	import {ImgUrl} from '@/common/common.js'
	import ynGallery from '@/components/YnComponents/ynGallery/ynGallery.vue'
	import Header from '@/components/header/header.vue'
	export default{
		data(){
			return {
				imgpath: "",
				totals: 0,
				ImgUrl: "",
				title: ""
			}
		},
		computed:{
			ImgArr(){
				let arr =[];
				for(let i =1;i<=this.totals;i++){
					if(i%2 == 1){
						var obj ={};
						obj.url = this.ImgUrl+this.imgpath+"/"+i+".jpg";
					}else{
						obj.url2 = this.ImgUrl+this.imgpath+"/"+i+".jpg";
						arr.push(obj);
					}
						
				}
				return arr;
			}
		},
		onLoad(e){
			this.ImgUrl = ImgUrl;
			this.totals = e.total-0;
			this.imgpath = e.bookpath;
			console.log(e)
			
		},
		onShow(){
			
		},
		methods:{
			onclickimg(item){
				// console.log(item)
			}
			
		},
		components:{
			ynGallery,
			Header
		}
	
		
	}
</script>

<style lang="scss" scoped>
.clearfloat:after{
	display:block;
	clear:both;
	content:"";
	visibility:hidden;
	height:0
}
.clearfloat{
	zoom:1
}

.container{
	height: 100%;
	background-color: #eee;
	padding-bottom: 400upx;
	position: relative;
	.lunbobox{
		margin-top: 50%;
		transform: translateY(-20%);
		-webkit-transform: translateY(-20%);
		-moz-transform: translateY(-20%);
		-ms-transform: translateY(-20%);
	}
}




</style>
