// 导入封装的 网络请求模块实例
import http from '../utils/http'

// 获取首页轮播图数据
// export const reqSwiperData = () => http.get('/index/findBanner')

export const reqIndexData = () => {
	// 通过并发请求获取首页的数据，提升页面的渲染速度

	// 方法一：通过 Promise.all 进行并发请求
	// return Promise.all([
	// 	http.get('/index/findBanner'),
	// 	http.get('/index/findCategory1'),
	// 	http.get('/index/advertisement'),
	// 	http.get('/index/findListGoods'),
	// 	http.get('/index/findRecommendGoods')
	// ])

	// 方法二：使用封装的 all 方法发送请求
	return http.all(
		http.get('/index/findBanner'),
		http.get('/index/findCategory1'),
		http.get('/index/advertisement'),
		http.get('/index/findListGoods'),
		http.get('/index/findRecommendGoods')
	)
}