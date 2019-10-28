<template>
	<view class="box" style='min-height: 92vh'>
		<view class='box-content'>
			<view class='box-top'>
				<image mode='aspectFill' :src='logoSrc'></image>
			</view>
			<view class='box-tips'>{{des}}</view>
			<!-- #ifdef H5 -->
			<view class='box-btn' @tap='showH5Tips'>扫码导览</view>
			<view v-if='showBtn' class='box-btn' @tap='showH5Tips'>AR导览</view>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<view class='box-btn' @tap='goScanImg'>扫码导览</view>
			<view v-if='showBtn' class='box-btn' @tap='showAppHandle'>拍照识别</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<view class='box-btn' @tap='goScanImg'>扫码导览</view>
			<view v-if='showBtn' class='box-btn' @tap='goArScan'>AR导览</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	let isSuccess = false; // 上传图片是否成功
	export default {
		data() {
			return {
				showBtn: false,
				des:''
			}
		},
		methods: {
			goScanImg() {
				uni.scanCode({
					success: res => {
						// console.log('二维码数据：', res)
						this.code = res.result;
						// 判断二维码的合法性及是否在当前展馆下扫描其他展馆中的展项
						// var sence = 'https://renren.broadmesse.net/detail?e_id=8&i_id=274';  // detail
						// var sence = 'https://renren.broadmesse.net/map?e_id=5&z_id=286';		// home
						// var sence = 'https://renren.broadmesse.net/map?e_id=5&z_id=286&isMap=1';		// map
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
							if ('z_id' in oParams) { // 跳转home或map
								if(oParams.isMap){ // map
									this.$parent.changeBarIndex(3);
								}else{ // home
									this.$parent.changeBarIndex(1);
								}
							} else { // 详情
								uni.navigateTo({
									url: '../detail/detail?z_id=' + oParams.i_id + '&title=' + this.title
								});
							}
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

			getDes(){
				this.$api.getDes({e_id:this.e_id}).then(res=>{
					console.log(res)
					if(res.status==1000){
						this.des = res.data.hall_summary;
					}
				})
			},
			
			showH5Tips() { 
				this.$common.showTips('当前环境下暂时无法使用此功能');
			},

			showAppHandle() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'],
					success: res => {
						const filePath = res.tempFilePaths[0]
						console.log(filePath);
						this.uploadPic(filePath);
					}
				});
			},

			uploadPic(file) {
				if (!file) return this.$common.showTIps('请确认照片的完整性')
				const arSrc = this.$store.state.arUploadSrc;
				const that = this;
				this.$common.showLoading('识别中...');
				uni.uploadFile({
					url: arSrc,
					filePath: file,
					name: 'image',
					success: res => {
						if (res.statusCode == 200) {
							const data = JSON.parse(res.data);
							console.log('result.name:', data.result.name)
							if (data.statusCode == 0) {
								// this.$common.showTips('识别成功')
								uni.navigateTo({
									// url: '../detail/detail?z_id=88&title=扫码详情'
									url: '../detail/detail?z_id=' + data.result.name + '&title=扫码详情',
								});
							} else if (data.statusCode == 3) {
								setTimeout(() => {
									this.$common.showTips('识别失败，请拍识别物正面照片');
								}, 1000);
							}
						}
					},
					fail: err => {
						console.log('识别失败:', err);
						setTimeout(() => {
							this.$common.showTips('识别失败，请拍识别物正面照片');
						}, 1000);
					},
					complete: () => {
						this.$common.hideLoading();
					}
				});
			},

			goArScan() {
				// #ifdef  MP-WEIXIN
				uni.navigateTo({
					url: '../scanAR/scanAR'
				})
				// #endif


				// #ifndef  MP-WEIXIN
				this.$common.showTips('当前环境下暂时无法使用此功能');
				// #endif

			},

			isShowARBtn(e_id) {
				this.$api.isShowARBtn({
					e_id
				}).then(res => {
					if (res.status == 1000) {
						this.showBtn = res.data.status == '1'
					}
				}).catch(err => {
					console.log('是否展示ar按钮获取失败', err)
				})
			}

		},
		mounted() {
			this.isShowARBtn(this.e_id)
			this.getDes();
		},
		props: ['logoSrc', 'title', 'e_id'],
	}
</script>

<style scoped>
	.box-content {
		text-align: center;
	}

	.box-content .box-top {
		padding: 100upx;
		box-sizing: border-box;
	}

	.box-content .box-top image {
		display: block;
		margin: 0 auto;
		width: 400upx;
		height: 400upx;
		box-sizing: border-box;
		border: 20rpx solid #fff;
	}

	.box-content .box-tips {
		padding: 2vh;
		padding-top: 0;
		line-height: 80upx;
		font-size: 36rpx;
	}

	.box-content .box-btn {
		display: inline-block;
		padding: 15upx 30upx;
		background-color: #09f;
		border-radius: 20upx;
		margin: 3vh 20upx 0;
		color: #fff;
	}
</style>
