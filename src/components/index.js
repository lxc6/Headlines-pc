// 注册全局组件
// 引入组件
import Headernav from './home/nav-header'
import Sidebar from './home/side-bar'
import Breadcrumb from './common/bread-crumb'
// 导出
export default {
  install (Vue) {
    Vue.component('nav-header', Headernav)
    Vue.component('side-bar', Sidebar)
    Vue.component('bread-crumb', Breadcrumb)// 注册面包屑组件
  }
}
