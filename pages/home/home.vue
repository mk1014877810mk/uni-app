<template>
	<div class="contain">
		<!-- home主页面 -->
		<div class='box' v-show='navBar.index===1'>
			<div class='top'>
				<my-swiper :imgUrls="swiper.imgUrls" @goOtherPage='goDetail'>
				</my-swiper>
			</div>
			<div class='logo'>
				<div class='logo-left'>
					<img :src='logoSrc'></img>
				</div>
				<text class='title'>{{title}}</text>
			</div>

			<!-- 内容 -->
			<div class='tab' v-if='template<4'>
				<div class='template-big1'>
					<div class='tab-nav flex'>
						<div v-for='(item,index) in tab.tabTitle' :key='index' class='hall' @tap='changeBigTab(index,item.z_id)'>
							<text :class='{"active":tab.currentTab==index}'>{{item.title}}</text>
						</div>
					</div>
					<div :class='{"content-big1":true, "bgc":template!=3}'>
						<swiper :style='{height:tab.height}' :current='tab.currentTab' class='content1-box' @change='bindChange'>
							<swiper-item v-for='(items,index) in tab.contents' :key='index'>
								<block v-if='template==1'>
									<tmp-one ref='template1' :swiperItemList='items' :swiperText='tab.swiperText[index]' :template='template'
									 @goDetail='goDetail'></tmp-one>
								</block>

								<block v-if='template==2'>
									<tmp-two ref='template2' :swiperItemList='items' :swiperText='tab.swiperText[index]' :template='template'
									 @goDetail='goDetail'></tmp-two>
								</block>

								<block v-if='template==3'>
									<tmp-three ref='template3' :swiperItemList='items' :swiperText='tab.swiperText[index]' :template='template'
									 @goDetail='goDetail'></tmp-three>
								</block>

							</swiper-item>
						</swiper>
					</div>
				</div>
			</div>
			<!-- 大于3的模板 -->
			<view style='min-height:100px' v-else :class='{"another-tab":true, "bgc":template!=6, "interspace":template==5}'>

				<block v-if='template==4'>
					<tmp-one ref='template4' :swiperItemList='tab.hallList' :swiperText='tab.swiperText[0]' :template='template'
					 @goList='goList'></tmp-one>
				</block>

				<block v-if='template==5'>
					<tmp-two ref='template5' :swiperItemList='tab.hallList' :swiperText='tab.swiperText[0]' :template='template'
					 @goList='goList'></tmp-two>
				</block>

				<block v-if='template==6'>
					<tmp-three ref='template6' :swiperItemList='tab.hallList' :swiperText='tab.swiperText[0]' :template='template'
					 @goList='goList'></tmp-three>
				</block>
			</view>
		</div>

		<tab-scan v-if='navBar.index===2' :title='title' :logoSrc='logoSrc'></tab-scan>
		<tab-map v-if='navBar.index===3' :e_id='e_id'></tab-map>
		
		<my-nav :index='navBar.index' :e_id='e_id' :title='title'></my-nav>
	</div>
</template>

<script>
	import mySwiper from '../components/swiper'
	import tmpOne from '../components/tmpOne'
	import tmpTwo from '../components/tmpTwo'
	import tmpThree from '../components/tmpThree'
	import myNav from '../components/nav'
	import tabScan from '../components/scan'
	import tabMap from '../components/map'
	export default {
		data() {
			return {
				windowWidth: 1, // 'px'
				windowHeight: 1, // 'px'
				loadingHeight: 60,
				scale: 1,
				template: 1,
				e_id: 1,
				title: '', // 展馆名称
				logoSrc: '',
				swiper: {
					imgUrls: []
				},
				tab: {
					height: '1500px',
					currentTab: 0,
					z_idList: [], // 所有展厅id集合
					tabTitle: [],
					contents: [], // 模板1、2、3列表数据
					swiperText: [], // loadText
					sendAjaxList: [],
					hallList: [], // 模板4、5、6列表数据
				},
				navBar: {
					index: 1
				}
			}
		},

		onLoad(options) {

			// #ifdef MP-WEIXIN
			var sence = decodeURIComponent(options.q);
			// var sence = 'https://renren.broadmesse.net/detail?e_id=8&i_id=274';  // detail
			// var sence = 'https://renren.broadmesse.net/map?e_id=4&z_id=87';		// home
			var exist = sence.indexOf('i_id');
			var existHome = sence.indexOf('z_id');
			var oParams = {};
			var e_id, i_id, z_id;
			console.log('options:', options, 'sence:', sence, 'exist:', exist, 'existHome:', existHome);

			if (exist != -1) { // 扫码进入详情
				var aParams = sence.split('?').slice(-1)[0].split('&');
				aParams.forEach(function(el) {
					oParams[el.split('=')[0]] = el.split('=')[1];
				});
				e_id = oParams.e_id;

				// 跳转
				uni.navigateTo({
					url: '../detail/detail?z_id=' + oParams.i_id,
				});

			} else if (existHome != -1) { // 扫码进入home页

				var aParams = sence.split('?').slice(-1)[0].split('&');
				aParams.forEach(function(el) {
					oParams[el.split('=')[0]] = el.split('=')[1];
				});
				e_id = oParams.e_id;

			} else { // 点击进入
				e_id = options.e_id;
			}
			this.e_id = e_id || 8
			this.$common.showLoading();
			uni.getSystemInfo({
				success: res => {
					this.windowWidth = res.windowWidth;
					this.windowHeight = res.windowHeight;
					this.scale = res.windowWidth / 750;
				}
			});
			// #endif


			// #ifndef MP-WEIXIN
			this.e_id = options.e_id || 8;
			this.$common.showLoading();
			uni.getSystemInfo({
				success: res => {
					this.windowWidth = res.windowWidth;
					this.windowHeight = res.windowHeight;
					this.scale = res.windowWidth / 750;
				}
			});

			// #endif

		},

		onReady() {
			this.getHallInfo(() => {
				this.getSwiper();
				this.getExhibition(z_idList => {
					if (this.template < 4) {
						z_idList.forEach((el, index) => {
							this.$set(this.tab.contents, index, []);
							// 请求每个展厅第一页数据
							this.getInteractive(z_idList[index], '', 1, data => {
								if (data.status == 1000) {
									this.$set(this.tab.contents, index, data.data || []);
									this.$set(this.tab.sendAjaxList, index, true);
									this.$set(this.tab.swiperText, index, '努力加载中...');
								} else if (data.status == 1006) {
									this.$set(this.tab.swiperText, index, '没有更多了');
									this.$set(this.tab.sendAjaxList, index, false);
								}

								// 设置高度
								if (index != 0) return;
								const obj = {
									length: this.tab.contents[index].length
								};
								this.setHeight(obj);

							});
						});
					}

				});
			});
		},

		methods: {
			getHallInfo(callback) {
				this.$api.getHallInfo({
					e_id: this.e_id
				}).then(res => {
					// console.log('展馆信息', res);
					if (res.status == 1000) {
						this.template = 1 * res.data.template || 1;
						this.title = res.data.hall_name;
						this.logoSrc = this.$store.state.ajaxUrl + res.data.hall_logo;
						this.$common.setNavTitle(this.title);
						callback && callback();
					}
				}).catch(err => {
					console.log('展馆信息获取失败', err);
				});
			},

			getSwiper() {
				if (this.template < 4) { // 模板123
					this.$api.getSwiper123({
						e_id: this.e_id
					}).then(res => {
						// console.log('123模板swiper', res);
						if (res.status == 1000) {
							res.data.forEach(el => {
								el.hall_cover = this.$store.state.ajaxUrl + el.hall_cover,
									el.showTitle = true;
							});
							this.swiper.imgUrls = res.data;
						}
					}).catch(err => {
						console.log('123模板swiper获取失败', err);
					})
				} else {
					this.$api.getSwiper456({
						e_id: this.e_id
					}).then(res => {
						// console.log('456模板swiper', res);
						if (res.status == 1000) {
							res.data.forEach(el => {
								el.hall_cover = this.$store.state.ajaxUrl + el.hall_cover,
									el.showTitle = true;
							});
							this.swiper.imgUrls = res.data;
						}
					}).catch(err => {
						console.log('456模板swiper获取失败', err);
					});
				}
			},

			getExhibition(callback) {
				this.$api.getExhibition({
					e_id: this.e_id
				}).then(res => {
					// console.log('展厅列表', res);
					if (res.status == 1000) {
						const exList = [];
						const z_idList = [];
						// 判断展厅与模板是否匹配
						if (res.data.length > 4 && this.template < 4) { // 展厅数量大于四，模板小于四
							this.template = Number(this.template) + 3;
						} else if (res.data.length <= 4 && this.template >= 4) { // 展厅数量小于四，模板大于四
							this.template = Number(this.template) - 3
						}
						res.data.forEach(el => {
							const obj = {};
							obj.img = this.$store.state.ajaxUrl + el.hall_cover;
							obj.des = el.hall_summary;
							obj.z_id = el.z_id;
							obj.title = el.hall_name;
							obj.hall_cover = obj.img;
							obj.hall_name = obj.title;
							obj.hall_summary = obj.des;
							z_idList.push(el.z_id);
							exList.push(obj);
						});
						if (this.template < 4) { // 模板1、2、3
							this.tab.tabTitle = exList;
							this.tab.z_idList = z_idList;
							callback && callback(z_idList); // 获取所有展项
						} else { // 模板4、5、6
							this.tab.hallList = exList;
						}

						this.$store.commit('setLastHallZid', res.data[0].z_id);

					}
				}).catch(err => {
					console.log('展厅列表获取失败', err);
				});
			},

			getInteractive(z_id, i_id, page, callback) {
				this.$api.getInteractive({
					z_id,
					i_id,
					page
				}).then(res => {
					// console.log('展项列表', res);
					if (res.status == 1000) {
						res.data.forEach((el, index) => {
							el.hall_cover = this.$store.state.ajaxUrl + el.hall_cover;
							el.page = page;
							el.count = res.count;
						});
						callback && callback(res);
					} else if (res.status == 1006) {
						callback && callback(res);
					}
				}).catch(err => {
					console.log('展项列表获取失败', err);
				});
			},

			changeBigTab(index, z_id) {
				this.tab.currentTab = index;
				this.$store.commit('setLastHallZid', z_id);
			},

			bindChange(e) {
				let index = this.tab.currentTab = e.detail.current;
				this.$store.commit('setLastHallZid', this.tab.tabTitle[index].z_id);

				const obj = {
					length: this.tab.contents[index].length
				};
				this.setHeight(obj);
			},

			goList(params) {
				uni.navigateTo({
					url: '../list/list?z_id=' + params.z_id + '&title=' + this.title
				});
			},

			goDetail(params) {
				if (params.e_id) { // 展馆
					uni.navigateTo({
						url: '../detail/detail?e_id=' + params.e_id + '&title=' + this.title
					});
				} else { // 展厅或展项
					uni.navigateTo({
						url: '../detail/detail?z_id=' + params.z_id + '&title=' + this.title
					});
				}
			},

			setHeight(obj) {
				this.$nextTick(() => {

					let initDetailH = 0;
					const minHeight = this.windowHeight / this.scale - 652;
					const query = uni.createSelectorQuery();
					switch (this.template) {
						case 1:
							initDetailH = 177;
							query.select('.template1').boundingClientRect();
							query.exec((res) => {
								// 获取detail高度
								const detailH = res && res[0] && res[0].height ? res[0].height / this.scale : initDetailH;
								console.log('setHeight1:', res, 'detailH:', detailH);
								const lastHeight = Math.max(minHeight, obj.length < 10 ? detailH * obj.length + this.loadingHeight - 50 :
									detailH * obj.length + this.loadingHeight);
								this.tab.height = uni.upx2px(lastHeight) + 'px';
							});
							break;
						case 2:
							initDetailH = 419;
							query.select('.template2').boundingClientRect();
							query.exec((res) => {
								// 获取detail高度
								const detailH = res && res[0] && res[0].height ? res[0].height / this.scale + 20 : initDetailH;
								console.log('setHeight2:', res, 'detailH:', detailH);
								const lastHeight = Math.max(minHeight, obj.length < 10 ? detailH * Math.ceil(obj.length / 2) + this.loadingHeight -
									30 : detailH * Math.ceil(obj.length / 2) + this.loadingHeight - 10);
								this.tab.height = uni.upx2px(lastHeight) + 'px';
							});
							break;
						case 3:
							initDetailH = 577;
							query.select('.template3').boundingClientRect();
							query.exec((res) => {
								// 获取detail高度
								const detailH = res && res[0] && res[0].height ? res[0].height / this.scale + 20 : initDetailH;
								console.log('setHeight3:', res, 'detailH:', detailH);
								const lastHeight = Math.max(minHeight, obj.length < 10 ? detailH * obj.length + this.loadingHeight -
									50 : detailH * obj.length + this.loadingHeight - 20);
								this.tab.height = uni.upx2px(lastHeight) + 'px';
							});
							break;
					}

				});

			},

			changeBarIndex(index){
				this.navBar.index = index;
			}
		},

		onShow: function() {
			// #ifdef MP-WEIXIN
			this.$common.setNavTitle(this.title);
			// #endif
		},

		components: {
			mySwiper,
			myNav,
			tmpOne,
			tmpTwo,
			tmpThree,
			tabScan,
			tabMap
		},

		onReachBottom() {
			const currentTab = this.tab.currentTab;
			if (this.template > 3 || !this.tab.sendAjaxList[currentTab]) return;
			const z_id = this.tab.z_idList[currentTab];
			const lastIid = this.tab.contents[currentTab].slice(-1)[0].z_id;
			const page = 1 + Number(this.tab.contents[currentTab].slice(-1)[0].page);

			this.getInteractive(z_id, lastIid, page, data => {
				if (data.status == 1000) {
					let content = this.tab.contents[currentTab];
					const count = data.count;
					content = content.concat(data.data);
					this.$set(this.tab.contents, currentTab, content);

					if (content.length >= count) {
						this.$set(this.tab.sendAjaxList, currentTab, false);
						this.$set(this.tab.swiperText, currentTab, '没有更多了');
					}

					const obj = {
						length: this.tab.contents[currentTab].length
					};
					this.setHeight(obj);

				} else if (data.status == 1006) { // 查询数据为空
					this.$set(this.tab.sendAjaxList, currentTab, false);
					this.$set(this.tab.swiperText, currentTab, '没有更多了');
				}
			});

		},
	}
</script>

<style scoped>
	.box .logo {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #fff;
	}

	.box .logo .logo-left {
		float: left;
		width: 100rpx;
		height: 100rpx;
		margin-left: 20rpx;
	}

	.box .logo .logo-left img {
		width: 80rpx;
		height: 80rpx;
		margin: 10rpx 10rpx 10rpx 0;
	}

	.box .logo text.title {
		display: inline-block;
		vertical-align: middle;
		font-size: 34rpx;
		margin-left: 10rpx;
		font-weight: 600;
	}

	/* tab */

	.box .tab .tab-nav {
		background-color: #fff;
	}

	.box .tab .tab-nav .hall {
		/* min-width: 25%; */
		text-align: center;
	}

	.box .tab .tab-nav text {
		display: block;
		padding: 20rpx;
		font-size: 30rpx;
		color: #666;
		border-bottom: 6rpx solid transparent;
	}

	.box .tab .tab-nav text.active {
		border-bottom: 6rpx solid #09f;
	}

	.box .tab .content-big1,
	.box .another-tab {
		margin-top: 20rpx;
		margin-bottom: 100rpx;
	}

	.bgc {
		background-color: #fff;
		padding-left: 20rpx;
	}

	.interspace {
		padding-bottom: 20rpx;
	}

	.template-nav>div:nth-child(1) {
		color: #09f;
	}
</style>
