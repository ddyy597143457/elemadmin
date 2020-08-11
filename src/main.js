import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import 'normalize.css'
import './assets/styles/common.css'
import axios from 'axios'
require("./mock")

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
