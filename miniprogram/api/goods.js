import http from '../utils/http'

/**
 * @description 获取商品列表的数据
 * @param {Object} param { page,limit,category1Id，category2Id } : 传递的参数是一个Object类型参数，对象里面包含四个属性-page,limit,一级分类Id，二级分类Id
 * @returns Promise
 */
export const reqGoodsList = ({ page,limit,...data }) => {
	return http.get(`/goods/list/${page}/${limit}`,data)
}

/**
 * @description 获取商品的详情
 * @param {*} goodsId 商品的id
 * @returns Promise
 */
export const reqGoodsInfo = () => {
	return http.get(`/goods/${goodsId}`)
}