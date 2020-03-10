// 路由守卫
// 引入
import router from '@/router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 调用方法 路由改变之前
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // 守卫
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
// 路由改变之后
router.afterEach(() => {
  // 结束进度条
  progress.done()
})
