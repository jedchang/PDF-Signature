import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Started from '../views/Started.vue'
import Finished from '../views/Finished.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Quickly Sign｜PDF 簽名服務' }
  },
  {
    path: '/started',
    name: 'Started',
    component: Started,
    meta: { title: 'Quickly Sign｜PDF 簽名服務' }
  },
  {
    path: '/finished',
    name: 'Finished',
    component: Finished,
    meta: { title: 'Quickly Sign｜PDF 簽名服務' }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
