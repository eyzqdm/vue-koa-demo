import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/bootstrap.min.css'
import './assets/css/index.css'
import axios from 'axios'
import Antd, { Icon, Button, Modal, Upload, Result, notification, Progress, Card, Tabs, Form, Input, Layout, Menu, Spin } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
axios.defaults.baseURL = 'http://127.0.0.1'

Vue.config.productionTip = false
Vue.prototype.$error = notification.error
axios.interceptors.request.use((config) => {
  // 拦截成功.
  console.log('拦截成功')
  // 加token
  config.headers.authorization = sessionStorage.getItem('token')
  return config
}, (err) => {
  // 拦截失败
  return Promise.reject(err)
})
Vue.use(Antd)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Upload)
Vue.use(Result)
Vue.use(Progress)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Spin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
