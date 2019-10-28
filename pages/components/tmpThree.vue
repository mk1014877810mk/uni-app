<template>
	<view>
		<view class='template3' v-for='(item,i) in swiperItemList' :key='i' @tap='goAnother(item.e_id,item.z_id)'>
			<view class='template3-top'>
				<view class='template3-top-title one-txt-cut'>{{item.hall_name}}</view>
				<image mode='aspectFill' :src='item.hall_cover'></image>
			</view>
			<view class='template3-bottom'>
				<view class='template3-bottom-des txt-cut2'>{{item.hall_summary}}</view>
			</view>
		</view>
		<block v-if="showTips">
			<view class='tips' v-if='swiperItemList.length>9||swiperItemList.length==0'>{{swiperText?swiperText:'没有更多了'}}</view>
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
		methods: {
			goAnother(e_id, z_id) {
				this.template < 4 ? this.$emit('goDetail', {
					e_id,
					z_id
				}) : this.$emit('goList', {
					z_id
				});
			}
		},
		mounted() {
			setTimeout(() => {
				this.showTips = true;
			}, 1000);
		},
		props: ['swiperItemList', 'swiperText', 'template']
	}
</script>

<style scoped>
	.template3 {
		width: 100%;
		height: 560upx;
		box-sizing: border-box;
		margin-right: 20upx;
		padding: 0 20upx;
		text-align: center;
		border-radius: 6upx;
		overflow: hidden;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.template3 .template3-top image {
		width: 710upx;
		height: 350upx;
	}

	.template3:nth-last-child(2) {
		margin-bottom: 10upx;
	}

	.template3 .template3-top .template3-top-title {
		position: relative;
		padding-left: 20upx;
		text-align: left;
		font-size: 32upx;
		height: 80upx;
		line-height: 80upx;
	}

	.template3 .template3-top .template3-top-title::before {
		content: '';
		width: 8upx;
		height: 40upx;
		background-color: #000;
		position: absolute;
		top: 20upx;
		left: 0;
	}

	.template3 .template3-bottom {
		padding: 16upx 0;
		box-sizing: border-box;
		text-align: left;
	}

	.template3 .template3-bottom .template3-bottom-des {
		font-size: 30upx;
		color: #666;
	}
</style>
