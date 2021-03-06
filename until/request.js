import store from '../store';
import common from './common';

const ajaxUrl = store.state.ajaxUrl;

const requestApi = (url, method, data, complete) => new Promise((resolve, reject) => {
	uni.request({
		url: ajaxUrl + url,
		method,
		data,
		success: res => {
			common.hideLoading();
			if (res.statusCode == 200) {
				resolve(res.data);
			} else {
				common.showTips('服务器响应失败');
				console.log('请求状态不为200', res);
			}
		},
		fail: error => {
			common.hideLoading();
			const title = (error.errMsg.indexOf('fail') != -1 && error.errMsg.indexOf('timeout') != -1) ? '网络请求超时' : '网络请求失败';
			common.showTips(title);
			reject(error);
		},
		complete: () => {
			complete && complete();
		}
	})
});

export default requestApi;
