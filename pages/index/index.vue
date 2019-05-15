<template>
	<view class='box'>
		<view class='top'>
			<my-swiper :imgUrls='swiper.imgUrls' @goOtherPage='goHome'></my-swiper>
		</view>
		<view class='first-template' v-if='template.first' v-for='(item,index) in exhibition.firstData' :key='index'>
			<view class='first-title'>
				{{item.hall_name}}
			</view>
			<view class='first-content' @tap='goHome(item.e_id)'>
				<image mode='aspectFill' :src='item.hall_cover'></image>
			</view>
		</view>
		<view class='second-template' v-if='template.second'>
			<view class='second-title'>
				推荐精品博物馆
			</view>
			<view class='second-content'>
				<view class='second-list' v-for='(item,index) in exhibition.secondData' :key='index' @tap='goHome(item.e_id)'>
					<image mode='aspectFill' :src='item.hall_cover'></image>
					<view class='detail-title one-txt-cut'>{{item.hall_name}}</view>
				</view>
			</view>
		</view>

		<view class='third-template' v-if='template.third'>
			<view class='third-list' v-for='(item,index) in exhibition.thirdData' :key='index' @tap='goHome(item.e_id)'>
				<view class='third-left'>
					<image mode='aspectFill' :src='item.hall_cover'></image>
				</view>
				<view class='third-right'>
					<view class='third-title one-txt-cut'>{{item.hall_name}}</view>
					<view class='third-des txt-cut2'>{{item.hall_summary}}</view>
				</view>
			</view>
		</view>
		<view class='tips' v-if='exhibition.firstData.length==0||exhibition.thirdData.length>4'>{{exhibition.firstData.length!=0?loadText:'暂无数据'}}</view>
	</view>
</template>

<script>
	import mySwiper from '../components/swiper'
	export default {
		data() {
			return {
				page: 1,
				sendAjax: true,
				swiper: {
					imgUrls: []
				},
				exhibition: {
					firstData: [], // 模板1
					secondData: [], // 模板2
					thirdData: [] // 模板3
				},
				template: {
					first: true,
					second: true,
					third: true
				},
				tips: false,
				loadText: '努力加载中...'
			}
		},
		onLoad() {
			this.$common.showLoading();
			this.getExhibitionList(this.page);
		},
		methods: {
			getExhibitionList(page) {
				this.$api.getExhibitionList({
					page
				}).then(res => {
					// console.log('展馆列表', res);
					if (res.status == 1000) {
						const data = res.data;
						if (page == 1) {

							// 设置轮播图图片
							data.forEach(el => {
								el.hall_cover = this.$store.state.ajaxUrl + el.hall_cover;
							})
							this.swiper.imgUrls = data.length > 5 ? data.slice(0, 5) : data;

							// 设置模板数据
							// 模板1
							if (data.length >= 1) {
								this.exhibition.firstData = data.slice(0, 1);
							} else {
								this.template.first = false;
								this.template.second = false;
								this.template.third = false;
								return;
							}
							// 模板2、3
							if (data.length > 1 && data.length <= 5) {
								this.exhibition.secondData = data.slice(1);
								this.template.third = false;
							} else if (data.length > 5) {
								this.exhibition.secondData = data.slice(1, 5);
								this.exhibition.thirdData = data.slice(5);
							} else {
								this.template.second = false;
								this.template.third = false;
							}
						} else {
							this.exhibition.thirdData = this.exhibition.thirdData.concat(data);
						}
						const allLength = this.exhibition.firstData.length + this.exhibition.secondData.length + this.exhibition
							.thirdData.length;
						if (res.count <= allLength) {
							this.loadText = '没有更多数据了';
							this.sendAjax = false;
						}
					}
				}).catch(err => {
					console.log('展馆列表获取失败', err);
				})
			},
			goHome(params) {
				const e_id = typeof(params) == 'object' ? params.e_id : params;
				uni.navigateTo({
					url: '../home/home?e_id=' + e_id
				});
			}
		},
		onReachBottom() {
			if (!this.sendAjax) return;
			this.page = ++this.page;
			this.getExhibitionList(this.page);
		},
		components: {
			mySwiper
		}
	}
</script>

<style scoped>
	/* 模板1、模板2、模板3公共部分 */
	.box .first-template,
	.box .second-template,
	.box .third-template {
		margin-top: 20upx;
		padding: 0 35upx;
		background-color: #fff;
	}

	.box .first-template .first-title,
	.box .second-template .second-title {
		position: relative;
		padding: 20upx 0;
		font-size: 30upx;
		margin-left: 20upx;
		box-sizing: border-box;
	}

	.box .first-template .first-content image {
		width: 100%;
		height: 330upx
	}

	.box .first-template .first-title:before,
	.box .second-template .second-title:before {
		content: '';
		position: absolute;
		left: -20upx;
		top: 22upx;
		width: 8upx;
		height: calc(100% - 40upx);
		background-color: #000;
	}

	/* 模板2内容 */

	.box .second-template .second-content .second-list {
		display: inline-block;
		width: 330upx;
		vertical-align: middle;
		padding-bottom: 20upx;
		text-align: center;
	}

	.box .second-template .second-content .second-list:nth-child(2n) {
		margin-left: 22upx;
	}

	.box .second-template .second-content .second-list .detail-title {
		font-size: 30upx;
		padding: 10upx 0;
	}

	.box .second-template .second-content image {
		width: 100%;
		height: 200upx;
	}

	/* 模板3 */

	.box .third-template {
		padding-bottom: 35upx;
	}

	.box .third-template .third-list {
		width: 100%;
		padding: 35upx 0 0;
	}

	.box .third-template .third-list .third-left {
		display: inline-block;
		vertical-align: middle;
	}

	.box .third-template .third-list .third-right {
		display: inline-block;
		vertical-align: top;
		width: 445upx;
		margin-left: 35upx;
	}

	.box .third-template .third-list .third-right .third-title {
		font-size: 32upx;
		font-weight: 600;
		margin-bottom: 12upx;
		word-break: break-all;
	}

	.box .third-template .third-list .third-right .third-des {
		font-size: 28upx;
		color: #666;
		word-break: break-all;
	}

	.box .third-template .third-left image {
		width: 200upx;
		height: 130upx;
	}
</style>
