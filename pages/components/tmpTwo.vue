<template>
	<view>
		<view class='template2' v-for='(item,i) in swiperItemList' :key='i'  @tap='goAnother(item.e_id,item.z_id)'>
			<view class='template2-top'>
				<image mode='aspectFill' :src='item.hall_cover'></image>
			</view>
			<view class='template2-bottom'>
				<view class='template2-bottom-title one-txt-cut'>{{item.hall_name}}</view>
				<view class='template2-bottom-des txt-cut2'>{{item.hall_summary}}</view>
			</view>
		</view>
		<block v-if='showTips'>
			<view class='tips' v-if='swiperItemList.length>9||swiperItemList.length==0'>{{swiperText}}</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips: false
			}
		},
		methods:{
			goAnother(e_id, z_id){
				this.template < 4 ? this.$emit('goDetail',{e_id, z_id}) : this.$emit('goList',{z_id});
			}
		},
		mounted() {
			setTimeout(()=>{
				this.showTips = true;
			},1000);
		},
		props: ['swiperItemList','swiperText','template']
	}
</script>

<style scoped>
	.template2 {
		display: inline-block;
		vertical-align: middle;
		width: 336upx;
		height: 400upx;
		box-shadow: 0 0 4upx 4upx #ddd;
		box-sizing: border-box;
		margin-right: 20upx;
		margin-top: 20upx;
		margin-left: 8upx;
		text-align: left;
		border-radius: 6upx;
		overflow: hidden;
	}

	.template2 .template2-top image {
		width: 345upx;
		height: 230upx;
		display: block;
	}

	.template2 .template2-bottom {
		padding: 20upx;
		box-sizing: border-box;
	}

	.template2 .template2-bottom .template2-bottom-title {
		font-size: 32upx;
		padding: 10upx 0;
	}

	.template2 .template2-bottom .template2-bottom-des {
		font-size: 28upx;
		color: #666;
	}

	.tips {
		line-height: 20upx;
	}
</style>
