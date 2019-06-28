<template>
	<view class="box">
		<tmp-one ref='template1' :swiperItemList='list' :swiperText='loadText' :template='template' @goDetail='goDetail'></tmp-one>
	</view>
</template>

<script>
	import tmpOne from '../components/tmpOne'
	export default {
		data() {
			return {
				title: '',
				z_id: '',
				template: 1,
				page: 1,
				list: [],
				sendAjax: true,
				loadText: '努力加载中...'
			}
		},

		onLoad(options) {
			this.z_id = options.z_id;
			this.title = options.title;
			this.$common.showLoading();
			this.$common.setNavTitle(this.title);
			this.getInteractive(this.z_id, '', this.page);
		},

		methods: {
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
						this.list = this.list.concat(res.data);
						if (this.list.length >= res.count) {
							this.sendAjax = false;
							this.loadText = '没有更多了';
						}
					} else if (res.status == 1006) {
						this.sendAjax = false;
						this.loadText = page == 1 ? '暂无数据' : '没有更多了';
					}
				}).catch(err => {
					console.log('展项列表获取失败', err);
				});
			},

			goDetail(params) {
				uni.navigateTo({
					url: '../detail/detail?z_id=' + params.z_id + '&title=' + this.title
				});
			}

		},

		components: {
			tmpOne
		},

		onReachBottom() {
			if (!this.sendAjax) return;
			this.page++;
			const i_id = this.list.slice(-1).z_id;
			this.getInteractive(this.z_id, i_id, this.page);
		}
	}
</script>

<style scoped>
	.box{
		padding-left: 10upx;
		box-sizing: border-box;
	}
</style>
