import request from './request'
export default {
	// index
	getExhibitionList: data => request('applets', 'get', data),
	// home
	getHallInfo: data => request('applets/info', 'get', data),
	getSwiper123: data => request('applets/item-banner', 'get', data),
	getSwiper456: data => request('applets/hall-banner', 'get', data),
	getExhibition: data => request('applets/hall', 'get', data),
	getInteractive: data => request('applets/items', 'get', data),
}
