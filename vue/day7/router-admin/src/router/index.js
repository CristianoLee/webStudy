import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr'
// 导入需要的组件

import Login from '@/components/MyLogin'
import Home from '@/components/MyHome'
import User from '@/components/menus/MyUsers'
import Power from '@/components/menus/MyRights'
import Goods from '@/components/menus/MyGoods'
import Orders from '@/components/menus/MyOrders'
import Setting from '@/components/menus/MySettings'
import UserDetail from '@/components/user/MyUserDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    // 路由的登录规则
    { path: '/login', component: Login },
    // 后台主页的路由规则
    {
      path: '/home',
      component: Home,
      redirect: '/home/user',
      children: [
        { path: 'user', component: User },
        { path: 'power', component: Power },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'setting', component: Setting },
        // 用户详情页面的路由规则
        { path: 'userInfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
})

// 全局前置守卫（必须有 token 才能访问后台主页）
router.beforeEach(function(to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
