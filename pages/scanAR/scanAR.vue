<template>
	<view>
		<camera device-position="back" flash="off" @error="error">
			<cover-view v-show='scaning' :class="{'active':scaning}"></cover-view>
		</camera>
		<view class='recognition-container'>
			<view class="btn-area">
				<view v-if="showButton" class='btn' @tap="takePhoto">
					<image mode='scaleToFill' style='width:14vh;height:14vh;margin-top:-4px;' src='../../static/scanImg.png'></image>
				</view>
				<view v-else class='msg-info'>{{msg}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let index = 0;
	let isSuccess = false; // ar是否识别成功的状态
	let firstLoad = true;
	export default {
		data() {
			return {
				ctx: '', // 相机
				showButton: true,
				msg: "请点击识别图片",
				scaning: false, // 是否在扫描中
			}
		},

		onLoad() {
			firstLoad = true;
			isSuccess = false;
		},

		onReady() {
			setTimeout(() => {
				this.initData();
			}, 1000)
		},

		methods: {
			// 初始化相机
			initData() {
				this.ctx = uni.createCameraContext();
			},

			// 打开相机
			error() {
				this.$common.showTips('打开摄像头失败');
			},

			// 相机拍照
			takePhoto() {
				const that = this;
				console.log('taking photo')
				if (isSuccess) return;
				this.ctx.takePhoto({
					quality: 'normal',
					success: res => {
						this.showButton = false;
						this.scaning = true;
						this.msg = '识别中...';
						this.uploadPic(res.tempImagePath);
					},
					fail: err => {
						setTimeout(() => {
							that.takePhoto();
						}, 500);
					}
				});
			},

			uploadPic(file, callback) {
				if (!file) return this.takePhoto();
				const arSrc = this.$store.state.arUploadSrc;
				const that = this;
				uni.uploadFile({
					url: arSrc,
					filePath: file,
					name: 'image',
					success: res => {
						if (res.statusCode == 200) {
							const data = JSON.parse(res.data);
							console.log('result.name:', data.result.name)
							if (data.statusCode == 0) {
								uni.navigateTo({
									url: '../detail/detail?z_id=88&title=扫码详情'
									// url: '../detail/detail?z_id=' + data.result.name + '&title=扫码详情',
								});
								this.scaning = false;
								isSuccess = true;
							}
						}
					},
					fail: err => {
						console.log('upload fail:', err);
					},
					complete() {
						console.log('识别完成:', isSuccess);
						setTimeout(() => {
							if (!isSuccess) {
								console.log('complete');
								that.takePhoto();
							}
						}, 500);
					}
				});
			}
		},

		onShow() {
			index = 0;
			if (!firstLoad) {
				uni.navigateBack();
			}
			this.msg = "请点击识别图片";
			this.showButton = true;
			firstLoad = false;
		},

		onUnload() {
			firstLoad = true;
		}
	}
</script>

<style scoped>
	.recognition-container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.btn-area {
		position: absolute;
		right: 20px;
		left: 20px;
		bottom: 5vh;
		z-index: 1000;
	}

	.btn-area>view {
		text-align: center;
		line-height: 100rpx;
	}

	.btn-area .btn {
		margin: 0 auto;
		width: 12vh;
		height: 12vh;
		border-radius: 50%;
		/* box-shadow: 0 0 8rpx 8rpx #ccc; */
	}

	.btn-area .msg-info {
		margin: 0 auto;
		width: 12vh;
		height: 12vh;
		line-height: 12vh;
		border-radius: 50%;
	}

	camera {
		position: relative;
		display: block;
		margin: 0 auto;
		width: 96vw;
		height: 80vh;
	}

	cover-view {
		position: absolute;
		top: 0%;
		left: 2%;
		width: 96%;
		height: 2px;
		background-color: #09f;
		box-shadow: 0 -2px 3px 1px #09f, 0 2px 3px 1px #09f, -2px 0 3px 1px #09f, 2px 0 3px 1px #09f;
	}

	.active {
		animation: scaning 3s infinite linear;
	}

	@keyframes scaning {
		from {
			top: 0
		}
		to {
			top: 100%
		}
	}
</style>
