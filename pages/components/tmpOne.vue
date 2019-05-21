<template>
	<view>
		<view class='template1' v-for='(item,i) in swiperItemList' :key='i' @tap='goAnother(item.e_id,item.z_id)'>
			<view class='template1-left'>
				<image mode='aspectFill' :src='item.hall_cover'></image>
			</view>
			<view class='template1-right'>
				<view class='template1-right-title one-txt-cut'>{{item.hall_name}}</view>
				<view class='template1-right-des txt-cut2'>{{item.hall_summary}}</view>
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
		props: ['swiperItemList','swiperText','template'],
	}
</script>

<style scoped>
	.template1 {
		height: 138upx;
		border-bottom: 1upx solid #ddd;
		padding: 20upx 0;
		text-align: left;
	}

	.template1 .template1-left {
		display: inline-block;
		width: 200upx;
		height: 130upx;
		vertical-align: middle;
	}

	.template1 .template1-left image {
		width: 200upx;
		height: 130upx;
	}

	.template1 .template1-right {
		display: inline-block;
		vertical-align: middle;
		width: 510upx;
		padding-right: 20upx;
		box-sizing: border-box;
		margin-left: 20upx;
	}

	.template1 .template1-right .template1-right-title {
		font-size: 32upx;
		margin: 10upx 0;
	}

	.template1 .template1-right .template1-right-des {
		font-size: 28upx;
		color: #666;
		word-break: break-all;
	}
</style>
