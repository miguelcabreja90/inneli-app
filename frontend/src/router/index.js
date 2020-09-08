import Vue from "vue"
import VueRouter from "vue-router"
import { protectedRoute, publicRoute } from "./config"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const routes = publicRoute.concat(protectedRoute)

Vue.use(VueRouter)
const router = new VueRouter({
  mode: "hash",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: routes
})
// router gard's
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  NProgress.start()
  //auth route is authenticated
  next()
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
