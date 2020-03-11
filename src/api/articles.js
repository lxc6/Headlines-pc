import request from '@/utils/request'
// 封装接口get
export function getArticles (params) {
  return request({
    url: '/articles',
    params// 根据传不传参来实现筛选显示
  })
}
// 封装接口del
export function delArticles (id) {
  return request({
    method: 'delete',
    url: `/articles/${id}`
  })
}
// 封装接口channels
export function getChannels () {
  return request({
    url: '/channels'
  })
}
