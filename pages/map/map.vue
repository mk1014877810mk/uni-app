<template>
	<view class="box">
		<!-- list图标 -->
		<view class='another-map' @tap='showOrHideList'>
			<image mode='scaleToFill' src='../../static/list.png'></image>
			<view>其它</view>
		</view>

		<!-- #ifndef H5 -->
		<view class='current-hall'>{{currentTitle}}导览图</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class='current-hall current-hall1'>{{currentTitle}}导览图</view>
		<!-- #endif -->

		<movable-area class='map' :style='{height:map.height+"px"}'>
			<movable-view :x='img.x' :y='img.y' :style='{width:(img.width+40)+"px",height:(img.height+100)+"px",padding:"50px 20px",boxSizing:"border-box"}'
			 animation='false' direction="all" scale='true' :scale-value='map.initScale' scale-min='1' scale-max='2' inertia='true'
			 @scale='bindscale'>
				<div class="content" :style='{width:(img.width)+"px",height:(img.height)+"px",position:"relative"}'>
					<image :src='img.src' @load='imgLoad' @tap='imgTab' style="width:100%;height:100%;"></image>

					<view class='pointer' v-if='showPointer' :data-index='index' v-for='(item,index) in pointer.position' :key='index'
					 :style='{width:pointer.width+"px",height:pointer.height+"px",position:"absolute",zIndex:item.index==currentIndex?3:2,left:item.x+"px",top:item.y+"px",color:"#fff"}'>

						<!-- 展项坐标 -->
						<image src='../../static/position.png' mode='scaleToFill' @tap='showPic(index)' style='width:100%;height:100%;'></image>
						<!-- 展项名称 -->
						<view :style='{fontSize:(12/map.scale)+"px",whiteSpace:"nowrap",position:"absolute",top:(pointer.height*1+(map.scale/2)*10)+"px",left:"50%" ,transform:"translateX(-50%)",background:"rgba(0,0,0,.5)",color:"#fff",paddingLeft:10/map.scale+"px",paddingRight:10/map.scale+"px",borderRadius:10/map.scale+"px"}'>{{item.hall_name}}</view>
						<!-- 展项图片 -->
						<view class='show-pic' v-if='item.showPic' @tap='goListDetail(item.z_id)' :flag='item.top' ref='pic' :style='{"bottom":(pointer.height/map.scale*0.85)+"px",transform:item.top?"translateX(-50%)":"translateX(-50%) rotate(180deg)"}'>
							<image mode='scaleToFill' src='../../static/bgc.png' style='width:100%;height:100%;'></image>
							<view style='width:84%;height:76%;position:absolute;left:50%;top:6%;transform:translateX(-50%);z-index:3;border-radius:50%;overflow:hidden;text-align:center;'>
								<image mode='center' :style='{width:"100%",height:"100%",display:"block",borderRadius:"50%/60%",transform:item.top?"rotate(0deg)":"rotate(180deg)"}'
								 :src='item.hall_cover'></image>
							</view>
						</view>
					</view>

				</div>
			</movable-view>

		</movable-area>

		<block>
			<scroll-y :showList.sync='showList' :e_id='e_id' :logoSrc='logoSrc' :z_id='z_id'></scroll-y>
		</block>

		<my-nav :index='3' :e_id='e_id' :title='title'></my-nav>
	</view>
</template>

<script>
	import myNav from '../components/nav'
	import scrollY from '../components/scrollY'
	const pointerW = 23; // 当前地图点图标宽度
	const pointerH = 23; // 当前地图点图标高度
	const bmsW = 20; // 后台地图点图标宽度
	const bmsH = 20; // 后台地图点图标高度
	const distance = 50; // padding的大小为50px
	export default {
		data() {
			return {
				e_id: 1,
				title: '',
				windowWidth: 0,
				windowHeight: 0,
				scale: 1, //px与rpx之间的转换系数
				logoSrc: '',
				z_id: '',
				showPointer: true, // 是否显示地图上展项坐标点
				showList: false, // 是否展示展厅地图列表
				currentIndex: 0, // 当前所点击图标的索引
				currentTitle: '',
				map: {
					initScale: 1, // 地图初始化放大比例
					scale: 1, // 手指双滑放大的倍数
					height: 0,
				},
				img: {
					width: 0,
					height: 0,
					src: '',
					scale: 1, // 地图加载放大倍数
					x: 0,
					y: 0
				},
				pointer: {
					width: pointerW,
					height: pointerH,
					position: [] // 绑定的坐标集合
				},
				originPointer: {}, // 原始坐标点数据备份 
			}
		},

		onLoad(options) {
			this.e_id = options.e_id;
			this.title = options.title;
			this.$common.setNavTitle(this.title);
			this.z_id = this.$store.state.lastHallZid || 87;
			this.getHallInfo();
			this.getMap(this.z_id);
			uni.getSystemInfo({
				success: res => {
					this.scale = res.windowWidth / 750;
					this.map.height = res.windowHeight - 100 * this.scale;
					this.windowHeight = res.windowHeight - 100 * this.scale;
					this.windowWidth = res.windowWidth;
				}
			});
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

			getMap(z_id) {
				this.$api.getMap({
					z_id
				}).then(res => {
					if (res.status == 1000) {
						if (res.data.hall_map == '' || !res.data.hall_map) {
							setTimeout(() => {
								this.$common.showTips('无对应地图,请选择其它地图');
							}, 300);
							return;
						}
						res.data.items_position.forEach(el => {
							el.showPic = false;
						});
						this.img.src = this.$store.state.ajaxUrl + res.data.hall_map;
						this.pointer.position = res.data.items_position || [];
						this.currentTitle = res.data.hall_name;
					}
				}).catch(err => {
					console.log('地图信息获取失败', err);
				});
			},

			imgLoad(e) {
				const width = e.detail.width,
					height = e.detail.height,
					tempX = this.windowWidth / width,
					tempY = (this.windowHeight - 100) / height;

				this.img.scale = tempX <= tempY ? tempY : tempX;

				this.img.width = width * this.img.scale;
				this.img.height = height * this.img.scale;
				this.img.x = -1 * (this.img.width - this.windowWidth) / 2;
				this.img.y = -1 * (this.img.height - this.map.height) / 2;

				// 位置赋值计算
				let items_position = this.pointer.position;

				items_position.forEach((el, index) => {
					el.x = uni.upx2px(((el.hall_position.split(',')[0] * 1 + bmsW / 2) / this.scale) * this.img.scale - pointerW /
						2.4);
					el.y = uni.upx2px(((el.hall_position.split(',')[1] * 1 + bmsH / 2) / this.scale) * this.img.scale - pointerH /
						1.4);
					el.top = true; // el.y > uni.upx2px(140);
					el.index = index;
					el.hall_cover = this.$store.state.ajaxUrl + el.hall_cover;
				});

				this.showPointer = true;
				this.pointer.position = items_position;

				let originPointer = {};
				for (let key in this.pointer) {
					if (typeof(this.pointer[key]) == 'object' && Array.isArray(this.pointer[key])) {
						let position = [];
						this.pointer[key].forEach((el, index) => {
							if (typeof(el) == 'object') {
								var obj = {};
								for (let k in el) {
									obj[k] = el[k];
								}
							}
							position.push(obj);
						});
						originPointer[key] = position;
					} else {
						originPointer[key] = this.pointer[key];
					}
				}

				this.originPointer = originPointer;

			},

			showPic(index) {
				this.imgTab();
				const position = this.pointer.position;
				const originPosition = this.originPointer.position;

				position.forEach((el, i) => {
					el.showPic = originPosition[i].showPic = index == i ? !position[index].showPic : false;
				});

				this.$nextTick(() => {
					if (this.$refs.pic && this.$refs.pic[0] && this.$refs.pic[0].$attrs && !this.$refs.pic[0].$attrs.flag) {
						const size = this.$refs.pic[0].$el.style.bottom;
						this.$refs.pic[0].$el.style.bottom = 0;
						this.$refs.pic[0].$el.style.top = size;
					} else {
						const pointion = this.pointer.position;
						position[index].top = true;
						this.pointer.position = position;
					}
				});

				this.currentIndex = index;
				this.pointer.position = position;
				this.originPointer.position = originPosition;

			},

			bindscale: function(e) {
				const scale = e.detail.scale;
				let pointer = {};
				for (let key in this.originPointer) {
					if (typeof(this.originPointer[key]) == 'object' && Array.isArray(this.originPointer[key])) {
						let position = [];
						this.originPointer[key].forEach((el, index) => {
							if (typeof(el) == 'object') {
								let obj = {};
								for (let k in el) {
									if (k == 'x') {
										obj[k] = el[k] + (scale - 1) * pointerW / 8;
									} else if (k == 'y') {
										obj[k] = el[k] + (scale - 1) * pointerH / 6;
									} else {
										obj[k] = el[k];
									}
								}
								position.push(obj);
							}
						});
						pointer[key] = position;
					} else {
						pointer[key] = this.originPointer[key];
					}
				}
				pointer.width = pointerW / scale;
				pointer.height = pointerH / scale;

				this.map.scale = scale;
				this.pointer = pointer;

			},

			imgTab() {
				if (this.showList) this.showList = false;
			},

			showOrHideList() {
				this.showList = !this.showList;
			},

			goListDetail(z_id) {
				uni.navigateTo({
					url: '../detail/detail?z_id=' + z_id + '&title=' + this.title,
				});
			}


		},

		components: {
			myNav,
			scrollY
		}
	}
</script>

<style scoped>
	.box .map {
		width: 100%;
		overflow: hidden;
	}

	.box .another-map {
		padding: 10upx;
		position: fixed;
		right: 40upx;
		bottom: 39vh;
		z-index: 1;
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 0 0 6upx 3upx rgba(50, 50, 50, .2);
	}

	.box .another-map image {
		width: 50upx;
		height: 40upx;
	}

	.box .current-hall {
		position: fixed;
		left: 40upx;
		top: 40upx;
		z-index: 3;
		font-size: 26upx;
		color: #333;
	}

	.box .current-hall1 {
		top: 140upx;
	}

	.box .another-map>view {
		font-size: 20upx;
		text-align: center;
	}

	.box .map image {
		display: inline-block;
	}

	.template-nav>view:nth-child(3) {
		color: #09f;
	}

	.show-pic {
		width: 300%;
		height: 300%;
		position: absolute;
		left: 48%;
		transform: translateX(-50%);
	}
</style>
