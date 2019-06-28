<template>
	<view class='template-nav flex'>
		<view @tap='navJump' data-index='1'>
			<image class="icon1" mode='scaleToFill' :src='iconSrc.first'></image>
			<view class='text' :class="{'active': index==1}">展项</view>
		</view>
		<view @tap='navJump' data-index='2'>
			<image class="icon2" :src='iconSrc.second'></image>
			<view class='text' :class="{'active': index==2}">扫描</view>
		</view>
		<view @tap='navJump' data-index='3'>
			<image class="icon3" :src='iconSrc.third'></image>
			<view class='text' :class="{'active': index==3}">地图</view>
		</view>
		<view @tap='navJump' data-index='4'>
			<image class="icon4" :src='iconSrc.fourth'></image>
			<view class='text' :class="{'active': index==4}">3D</view>
		</view>
	</view>
</template>

<script>
	const icon = [
		{
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
		},
		{
			def: '../../static/icon-3d.png',
			sele: '../../static/icon-3d1.png'
		}
	]
	export default {
		data() {
			return {
				iconSrc: {
					first: icon[0].def,
					second: icon[1].def,
					third: icon[2].def,
					fourth: icon[3].def
				},
			};
		},
		methods: {
			navJump(e) {
				const currentIndex = 1 * e.currentTarget.dataset.index;
				if (this.index == currentIndex) return;
				switch (currentIndex) {
					case 1:
						uni.redirectTo({
							url: '../home/home?e_id=' + this.e_id + '&title=' + this.title
						});
						break;
					case 2:
						uni.redirectTo({
							url: '../scan/scan?e_id=' + this.e_id + '&title=' + this.title
						});
						break;
					case 3:
						uni.redirectTo({
							url: '../map/map?e_id=' + this.e_id + '&title=' + this.title
						});
						break;
					case 4:
						uni.navigateTo({
							url: '../3Dview/3Dview?e_id=' + this.e_id + '&title=' + this.title
						})
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
				case 4:
					this.iconSrc.fourth = icon[3].sele;
					break;
			}
		},
		props: ['index', 'e_id', 'title']
	}
</script>

<style scoped>
	.template-nav {
		width: 100%;
		height: 99upx;
		border-top: 1upx solid #ddd;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		font-size: 28upx;
		box-shadow: 0 0 2upx 2upx #ddd;
	}

	.template-nav>view {
		margin-top: 6upx;
	}

	.template-nav image {
		display: block;
		margin: 0 auto;
	}

	.template-nav .icon1 {
		width: 54upx;
		height: 50upx;
		margin-top: 4upx;
	}

	.template-nav .icon2 {
		width: 52upx;
		height: 52upx;
	}

	.template-nav .icon3 {
		width: 50upx;
		height: 52upx;
	}
	
	.template-nav .icon4 {
		width: 56upx;
		height: 54upx;
	}

	.active {
		color: #09f;
	}
</style>
