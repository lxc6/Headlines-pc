import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/login'
import Second from '@/views/Home/second-home.vue'

Vue.use(VueRouter)
// 一级路由
const routes = [
  // 所有没有组件的路由404
  {
    path: '*',
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // home下的二级路由
    children: [
      {
        path: '',
        name: 'Second',
        component: Second
      },
      {
        // path: '/home/comment',
        path: 'comment',
        component: () => import('@/views/comment')// 按需加载
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'articles',
        component: () => import('@/views/articles')
      },
      {
        path: 'publish/:articleId?', // 参数+ ? ---参数可有可无都能显示
        component: () => import('@/views/publish')
      }, {
        path: 'account',
        component: () => import('@/views/account')

      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
