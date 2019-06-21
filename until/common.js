const showTips = (title, icon = 'none', complete) =>
	uni.showToast({
		title,
		icon,
		duration: 2000,
		complete: () => {
			complete && complete();
		}
	});


const showLoading = (title = '加载中...') => uni.showLoading({
	title
});
const hideLoading = () => uni.hideLoading();
const setNavTitle = title => uni.setNavigationBarTitle({
	title
});

export default {
	showTips,
	showLoading,
	hideLoading,
	setNavTitle
}
