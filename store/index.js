import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		arUploadSrc:'https://renren.broadmesse.net/tour/web/arscanning',
		ajaxUrl: 'https://renren.broadmesse.net/tour/web/',
		sendUrl: 'https://dl.broadmesse.net/message/',
		// sendUrl: 'http://10.0.15.185/message/',
		lastHallZid:'',
		openid:'',
		avatar:''
	},
	mutations: {
		setLastHallZid(state,z_id){
			state.lastHallZid = z_id;
		},
		setOpenId(state,openid){
			state.openid = openid;
		},
		setAvatar(state,avatar){
			state.openid = avatar;
		}
	}
})

export default store
