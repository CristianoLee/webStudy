// 文章相关的 API 接口，都封装到这个模块
import request from '@/utils/request'

// 向外按需导出一个 API 函数
export const getArticleListAPI = function (_page, _limit) {
  // 发起 GET 请求，获取文章列表数据
  return request.get('/articles', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}
