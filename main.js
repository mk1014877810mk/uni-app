import Vue from 'vue'
import App from './App'

import common from './until/common'
import api from './until/api'
import store from './store'

Vue.prototype.$store = store
Vue.prototype.$common = common
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
