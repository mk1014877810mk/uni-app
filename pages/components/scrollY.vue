<template>
	<!-- list列表 -->
	<view :class='{"list":true,"show":showList}'>
		<view class='list-top'>
			<view class='hall-img'>
				<image mode='aspectFill' :src='logoSrc'></image>
			</view>
			<text>选择地图</text>
			<image class="close" mode='aspectFill' src='../../static/close.png' @tap='imgTab'></image>
		</view>
		<scroll-view scroll-y style='height:50vh;'>
			<view :class='{"list-detail":true,"active":z_id==item.z_id}' v-for='(item,index) in hallList' :key='index' @tap='checkHall(item.z_id,!!item.hall_map)'>
				<view class='detail-left'>
					<image mode='aspectFill' :src='item.hall_map' style='width:150upx;height:90upx;'></image>
				</view>
				<view class='detail-right txt-cut2'>
					{{item.hall_name}}
				</view>
			</view>
			<view class='no-data' v-if='hallList.length==0'>暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hallList: []
			}
		},
		
		mounted() {
			this.$api.getExhibition({
				e_id: this.e_id
			}).then(res => {
				if (res.status == 1000) {
					res.data.forEach(el => {
						el.hall_map = el.hall_map ? this.$store.state.ajaxUrl + el.hall_map : el.hall_map;
					});
					this.hallList = res.data;
				} else if (res.status == 1006) {
					this.hallList = [];
				}
			});
		},
		
		methods: {
			imgTab() {
				const tabFn = this.$parent.imgTab ? this.$parent.imgTab : this.$parent.$parent.imgTab;
				tabFn();
			},
			
			checkHall(z_id, hasMap) {
				if (this.z_id == z_id) return;
				if (!hasMap) return this.$common.showTips('当前展馆暂无地图');
				this.imgTab();
				this.$parent.z_id ? this.$parent.z_id = z_id : this.$parent.$parent.z_id = z_id;
				this.$parent.showPointer ? this.$parent.showPointer = false : this.$parent.$parent.showPointer = false;
				this.$parent.map ? this.$parent.map.initScale = 1 : this.$parent.$parent.map.initScale = 1;
				this.$parent.img ? this.$parent.img.src = '' : this.$parent.$parent.img.src = '';
				this.$parent.pointer ? this.$parent.pointer.position = [] : this.$parent.$parent.pointer.position = [];
				'showList' in this.$parent ? this.$parent.showList = false : this.$parent.$parent.showList = false;
				this.$common.showTips('地图切换中...');
				const getMap = this.$parent.getMap ? this.$parent.getMap : this.$parent.$parent.getMap;
				getMap(z_id);
			}
		},
		props: ['showList', 'logoSrc', 'e_id', 'z_id']
	}
</script>

<style scoped>
	.list {
		position: fixed;
		bottom: -60vh;
		left: 50upx;
		z-index: 1;
		width: 650upx;
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 0 0 4upx 4upx #ddd;
		transition: bottom 0.3s linear;
	}

	.list .list-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		border-bottom: 1upx solid #ddd;
		font-size: 30upx;
		padding: 20upx;
		box-sizing: border-box;
		margin-bottom: 10upx;
	}

	.list .list-top .hall-img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 140upx;
		height: 140upx;
		padding: 10upx;
		border-radius: 50%;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 0 4upx 6upx #ddd;
	}

	.list .list-top .close {
		width: 40upx;
		height: 40upx;
	}

	.list .list-top .hall-img image {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
	}

	.list scroll-view {
		padding: 0 20upx;
	}

	.list .list-detail {
		display: flex;
		justify-content: left;
		width: calc(100% - 40upx);
		height: 130upx;
		padding: 20upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #ddd;
	}

	.list .list-detail .detail-right {
		display: flex;
		margin-left: 20upx;
		align-items: center;
		align-content: center;
		font-size: 32upx;
	}

	.list .no-data {
		text-align: center;
		font-size: 30upx;
		line-height: 100upx;
		color: #999;
	}

	.show {
		bottom: 150upx !important;
	}

	.active {
		background-color: #efefef;
	}
</style>
