// 封装请求工具，配置拦截器
import axios from 'axios'
import router from '@/router'
import JSONbig from 'json-bigint'
// 操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 统一配置公共请求地址
// 大数字处理
axios.defaults.transformResponse = [function (data) {
  return data ? JSONbig.parse(data) : {}
}]
// 请求拦截器
axios.interceptors.request.use(function (config) {
// 成功 在header中统一注入token
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`// 统一注入token 格式
  return config
}, function (error) {
// 失败
  return Promise.reject(error)// Promise解决异步
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 响应数据处理
  return response.data ? response.data : {}
}, function (error) {
  // 失败 状态码判断
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除token
    router.push('/login')// 导入router => this.$router
  }
  return Promise.reject(error)// Promise解决异步
})
export default axios
