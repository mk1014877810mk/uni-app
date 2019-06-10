import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		arUploadSrc:'https://dl.broadmesse.net/librarySide/frontend/web/easyar',
		ajaxUrl: 'https://renren.broadmesse.net/tour/web/',
		lastHallZid:''
	},
	mutations: {
		setLastHallZid(state,z_id){
			state.lastHallZid = z_id;
		}
	},
	actions: {
		// lazy loading openid
	}
})

export default store
