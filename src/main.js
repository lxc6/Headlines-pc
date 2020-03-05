import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from '@/utils/request'// 引入封装的request
import Components from '@/components'// 引入全局组件
import '@/permission'// （路由守卫）导航守卫
import 'element-ui/lib/theme-chalk/index.css'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 统一配置公共请求地址
Vue.prototype.$axios = axios// 在原型链添加$axios属性并赋值
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Components)// 注册全局组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
