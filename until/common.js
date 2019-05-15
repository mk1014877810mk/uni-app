const showTips = (title, icon = 'none', complete) =>
	uni.showToast({
		title,
		icon,
		duration: 2000,
		complete: () => {
			complete && complete();
		}
	});


const showLoading = () => uni.showLoading();
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
