import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/styles/common.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import CommonJs from './assets/js/common.js'

require("./mock")

Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.use(CommonJs);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
