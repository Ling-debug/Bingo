// 导入封装的网络请求模块实例
import http from '../utils/http'

// 用来获取商品分类的数据
// 返回 Promise
export const reqCategoryData = () => {
	return http.get('/index/findCategoryTree')
}