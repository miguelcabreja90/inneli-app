import Vue from 'vue'
import Router from 'vue-router'
import { publicRoute, protectedRoute } from './config'
import NProgress from 'nprogress'
import localStorage from '@/config/localStorage'
import 'nprogress/nprogress.css'
const routes = publicRoute.concat(protectedRoute)

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routes
})
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start()
  //auth route is authenticated
  if (localStorage.getToken() && to.fullPath !== '/auth/login') {
    return next()
  } else if (to.fullPath === '/auth/login') {
    next()
  } else {
    return next('/auth/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
