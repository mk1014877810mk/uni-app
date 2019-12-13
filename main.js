import Vue from 'vue'
import App from './App'

import Common from './until/common'
import Api from './until/api'
import SendApi from './until/sendApi'
import Store from './store'

Vue.prototype.$store = Store
Vue.prototype.$common = Common
Vue.prototype.$api = Api
Vue.prototype.$sendApi = SendApi

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
