<template>
	<view class='template-nav flex'>
		<view @tap='navJump' data-index='1'>
			<image class="icon1" mode='scaleToFill' :src='iconSrc.first'></image>
			<view class='text'>展项</view>
		</view>
		<view @tap='navJump' data-index='2'>
			<image class="icon2" :src='iconSrc.second'></image>
		</view>
		<view @tap='navJump' data-index='3'>
			<image class="icon3" :src='iconSrc.third'></image>
			<view class='text'>地图</view>
		</view>
	</view>
</template>

<script>
	const icon = [{
			def: '../../static/icon-index.png',
			sele: '../../static/icon-index1.png'
		},
		{
			def: '../../static/icon-scan.png',
			sele: '../../static/icon-scan1.png'
		},
		{
			def: '../../static/icon-map.png',
			sele: '../../static/icon-map1.png'
		}
	]
	export default {
		data() {
			return {
				iconSrc: {
					first: icon[0].def,
					second: icon[1].def,
					third: icon[2].def,
				},
			};
		},
		methods: {
			navJump(e) {
				const currentIndex = 1 * e.currentTarget.dataset.index;
				if (this.index == currentIndex) return;
				switch (currentIndex) {
					case 1:
						console.log(1);
						uni.redirectTo({
							url: ''
						});
						break;
					case 2:
						console.log(2);
						uni.redirectTo({
							url: ''
						});
						break;
					case 3:
						console.log(3);
						uni.redirectTo({
							url: ''
						});
						break;
				}
			}
		},
		created() {
			switch (this.index) {
				case 1:
					this.iconSrc.first = icon[0].sele;
					break;
				case 2:
					this.iconSrc.second = icon[1].sele;
					break;
				case 3:
					this.iconSrc.third = icon[2].sele;
					break;
			}
		},
		props: ['index']
	}
</script>

<style scoped>
	.template-nav {
		width: 100%;
		height: 99rpx;
		border-top: 1rpx solid #ddd;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		font-size: 28rpx;
		box-shadow: 0 0 2rpx 2rpx #ddd;
	}

	.template-nav>view {
		margin-top: 6rpx;
	}

	.template-nav image {
		display: block;
		margin: 0 auto;
	}

	.template-nav .icon1 {
		width: 54rpx;
		height: 50rpx;
		margin-top: 4rpx;
	}

	.template-nav .icon2 {
		width: 64rpx;
		height: 64rpx;
	}

	.template-nav .icon3 {
		width: 50rpx;
		height: 50rpx;
	}

	.template-nav>view:nth-child(2) image {
		margin-top: 12rpx;
	}
</style>
