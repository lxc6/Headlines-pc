// 注册全局组件
// 引入组件
import Headernav from './home/nav-header'
import Sidebar from './home/side-bar'
import Breadcrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'// 富文本
import CoverImage from './publish/cover-image'// 图片封面
import SelectImage from './publish/select-image'// 封面弹窗选择

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导出
export default {
  install (Vue) {
    Vue.component('nav-header', Headernav)
    Vue.component('side-bar', Sidebar)
    Vue.component('bread-crumb', Breadcrumb)// 注册面包屑组件
    Vue.component('cover-image', CoverImage)// 注册图片封面
    Vue.component('select-image', SelectImage)// 注册图片封面
    // 注册富文本
    Vue.use(VueQuillEditor)
  }
}
