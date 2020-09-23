import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/bootstrap.min.css'
import './assets/css/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
