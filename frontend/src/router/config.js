import { AuthLayout, DefaultLayout } from "../components/layouts"

import { getToken } from "@/config/localStorage"

const guest = (to, from, next) => {
  if (!getToken()) {
    return next()
  } else {
    return next("/")
  }
}
const auth = (to, from, next) => {
  if (getToken()) {
    return next()
  } else {
    return next("/login")
  }
}

export const publicRoute = [
  /*{ path: "*", component: () => import(/!* webpackChunkName: "errors-404" *!/ "../views/error/NotFound.vue") },*/
  {
    path: "*",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        beforeEnter: guest,
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "../views/auth/Login")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "../views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "../views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/admin",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/admin/dashboard",
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        beforeEnter: auth,
        meta: { title: "Home", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
      },
      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "../views/error/Deny.vue")
      }
    ]
  }
]
