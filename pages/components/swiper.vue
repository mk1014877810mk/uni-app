<template>
	<div>
		<swiper :indicator-dots='swiper.indicatorDots' :autoplay='swiper.autoplay' :interval='swiper.interval' :circular='swiper.circular'
		 :duration='swiper.duration' loop :indicator-color='swiper.indicatorColor' :indicator-active-color='swiper.indicatorActivColor'>
			<swiper-item v-for='(item,index) in imgUrls' :key='index' :data-e_id='item.e_id' @tap='goOtherPage(item.e_id,item.z_id)'>
				<img :src='item.hall_cover'>
				<text v-if='item.showTitle' class='swiper-title'>{{item.hall_name}}</text>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ajaxUrl: '',
				swiper: {
					indicatorDots: true,
					autoplay: true,
					interval: 3000,
					duration: 700,
					indicatorActivColor: "#fff",
					indicatorColor: "#aaa",
					circular: true,
				}
			};
		},
		methods: {
			goOtherPage(e_id, z_id) {
				this.$emit('goOtherPage', {e_id, z_id});
			}
		},
		props: {
			imgUrls: {
				default: () => [],
				type: Array
			}
		}
	}
</script>

<style>
	swiper-item {
		position: relative;
	}

	swiper img {
		width: 750rpx;
		height: 100%;
	}

	.swiper-title {
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		font-size: 25rpx;
		padding: 6rpx 16rpx;
		color: rgb(8, 6, 26);
	}
</style>
