<template>
	<view class="box">
		<view class='box-content'>
			<view class='box-top'>
				<image mode='aspectFill' :src='logoSrc'></image>
			</view>
			<view class='box-tips one-txt-cut'>文化科技，尽在{{title}}</view>
			<!-- #ifndef H5 -->
			<view class='box-btn' @tap='goScanImg'>扫码导览</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class='box-btn' @tap='showH5Tips'>扫码导览</view>
			<!-- #endif -->
		</view>
		<my-nav :index='2' :e_id='e_id' :title='title'></my-nav>
	</view>
</template>

<script>
	import myNav from '../components/nav'
	export default {
		data() {
			return {
				e_id: '',
				title: '',
				logoSrc: ''
			}
		},
		onLoad(options) {
			this.e_id = options.e_id;
			this.title = options.title;
			this.$common.setNavTitle(this.title);
			this.getHallInfo();
		},
		methods: {
			getHallInfo() {
				this.$api.getHallInfo({
					e_id: this.e_id
				}).then(res => {
					if (res.status == 1000) {
						this.$common.setNavTitle(res.data.hall_name);
						this.logoSrc = this.$store.state.ajaxUrl + res.data.hall_logo;
					}
				}).catch(err => {
					console.log('展厅信息获取失败');
				})
			},

			goScanImg() {
				uni.scanCode({
					success: res => {
						// console.log('二维码数据：', res)
						this.code = res.result;
						// 判断二维码的合法性及是否在当前展馆下扫描其他展馆中的展项
						let oParams = {};
						let aParams = [];
						if (res.result && Array.isArray(res.result.split('?'))) {
							aParams = res.result.split('?').slice(-1)[0].split('&');
							aParams.forEach(el => {
								oParams[el.split('=')[0]] = el.split('=')[1];
							});
							if (!oParams.e_id) {
								uni.showModal({
									title: '温馨提示',
									content: '当前二维码不属于此程序!',
									showCancel: false
								});
								return;
							}
							uni.navigateTo({
								url: '../detail/detail?z_id=' + oParams.z_id + '&title=' + this.title
							});
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '当前二维码不属于此程序!',
								showCancel: false
							});
						}
					}
				});
			},
			
			showH5Tips(){
				this.$common.showTips('浏览器环境下无法使用此功能');
			}
		},
		components: {
			myNav
		}
	}
</script>

<style scoped>
	.box-content {
		text-align: center;
	}

	.box-content .box-top {
		padding: 70rpx;
		background-color: #ccc;
	}

	.box-content .box-top image {
		display: block;
		width: 610rpx;
		height: 610rpx;
		box-sizing: border-box;
		border: 20rpx solid #fff;
	}

	.box-content .box-tips {
		padding: 4vh 0;
		font-size: 36rpx;
	}

	.box-content .box-btn {
		display: inline-block;
		padding: 15rpx 30rpx;
		background-color: #09f;
		border-radius: 20rpx;
		margin-top: 2vh;
		color: #fff;
	}
</style>
