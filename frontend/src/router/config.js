import { LayoutAuth, LayoutDefault, RouteWrapper } from '@/components/layouts'
import LayoutVerify from '@/components/layouts/LayoutVerify'

export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound')
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'Register'
    },
    redirect: '/auth/register',
    hidden: true,
    children: [
      {
        path: 'register',
        name: 'register',
        meta: {
          title: 'Register'
        },
        component: () => import('@/views/auth/Register')
      }
    ]
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'Login'
    },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'Login'
        },
        component: () => import('@/views/auth/Login')
      }
    ]
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'Forgot'
    },
    redirect: '/auth/forgot',
    hidden: true,
    children: [
      {
        path: 'forgot',
        name: 'forgot',
        meta: {
          title: 'Forgot Password'
        },
        component: () => import('@/views/auth/Forgot')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Not Found'
    },
    component: () => import('@/views/error/NotFound')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: 'Server Error'
    },
    component: () => import('@/views/error/Error')
  },
  {
    path: '/reset/verify/:hash',
    component: LayoutAuth,
    hidden: true,
    children: [
      {
        path: '/reset/verify/:hash',
        name: 'reset_password',
        meta: {
          title: 'Reset Password'
        },
        component: () => import('@/views/auth/ResetPassword')
      }
    ]
  }
]

export const protectedRoute = [
  {
    path: '/',
    component: LayoutDefault,
    meta: {
      title: 'home',
      group: 'apps',
      icon: ''
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          group: 'apps',
          icon: 'mdi-view-dashboard',
          requiresAuth: true
        },
        component: () => import('@/views/Dashboard')
      },
      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: 'access_denied',
          hiddenInMenu: true,
          requiresAuth: true
        },
        component: () => import('@/views/error/Deny')
      },
      {
        path: '/user/profile',
        name: 'Profile',
        meta: {
          title: 'user_profile',
          hiddenInMenu: true,
          requiresAuth: true
        },
        component: () => import('@/views/user/Profile')
      }
    ]
  },
  {
    path: '/hi',
    component: LayoutVerify,
    meta: {
      title: 'verify'
    },
    redirect: '/hi/welcome',
    hidden: true,
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        meta: {
          title: 'welcome',
          hiddenInMenu: true,
          requiresAuth: true
        },
        component: () => import('@/views/Welcome')
      },
      {
        path: 'verify/:hash',
        name: 'verify',
        props: true,
        meta: {
          title: 'verify',
          hiddenInMenu: true,
          requiresAuth: true
        },
        component: () => import('@/views/auth/Verify')
      }
    ]
  }
]
