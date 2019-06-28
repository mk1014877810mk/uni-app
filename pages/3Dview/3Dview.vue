<template>
	<view>
		<web-view src="https://vr.broadmesse.net/tour/9c320ff3e59cbce9"></web-view>
	</view>
</template>

<script>
	import myNav from '../components/nav'
	export default {
		data() {
			return {
				title:'',
				e_id:''
			}
		},
		onLoad(options){
			this.title = options.title;
			this.e_id = options.e_id;
			this.$common.setNavTitle(this.title+'3D展示');
		}
	}
</script>

<style>

</style>
