import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Deposit from '@/pages/Deposit'
import Withdraw from '@/pages/Withdraw'
import Store from '@/pages/Store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: Deposit,
      meta: { requiresAuth: true }
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: Withdraw,
      meta: { requiresAuth: true }
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    !localStorage.getItem('userName') || !localStorage.getItem('token') ? next({ path: '/login' }) : next()
  }
  else {
    next()
  }
})

export default router