<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	import myNav from '../components/nav'
	export default {
		data() {
			return {
				title: '',
				e_id: '',
				src: ''
			}
		},
		onLoad(options) {
			this.title = options.title;
			this.e_id = options.e_id;
			this.src = options.url;
			this.$common.setNavTitle(this.title + '3D展示');
		}
	}
</script>

<style>

</style>
