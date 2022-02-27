import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '@/views/Home/Home'
import User from '@/views/User/User'

// 把VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 创建路由实例对象
const router = new VueRouter({
  // 路由规则数组
  routes: [
    // 定义首页路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    // 定义我的路由规则
    { path: '/user', component: User }
  ]
})

// 导出路由
export default router
