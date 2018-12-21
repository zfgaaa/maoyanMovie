import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import commonUI from './common'

Vue.use(commonUI)

var vm = new Vue();
Vue.prototype.$center = vm;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
