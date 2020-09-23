import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/home'
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})

export default router
