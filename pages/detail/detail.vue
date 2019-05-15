<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(options) {
			this.$common.setNavTitle(options.title);
			this.src = options.e_id ? 'https://renren.broadmesse.net/wechat-kanzhan/index.html?e_id=' + options.e_id :
				'https://renren.broadmesse.net/wechat-kanzhan/index.html?i_id=' + options.z_id;
		},
		methods: {

		}
	}
</script>

<style>

</style>
