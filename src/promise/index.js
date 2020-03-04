// 路由守卫
// 引入
import router from '@/router'
// 调用方法
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    // 根据有无token判断页面的跳转
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else { // 不去主页放过
    next()
  }
})
