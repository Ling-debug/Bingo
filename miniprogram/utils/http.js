// 导入模块、包提供的类
import WxRequest from 'mina-request'
// 导入封装的本地存储操作模块
import { getStorage,clearStorage} from './storage'
// 导入封装的增强API
import { toast,modal } from './extendApi'
import { env } from './env'

// 对 WxRequest类 进行实例化
const instance = new WxRequest({
	// baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
	baseURL:env.baseURL,
	timeout: 15000,
	isLoading:false
})

// 配置请求拦截器（在请求发送之前对请求参数进行新增或者修改）
instance.interceptors.request = (config) => {

	// 在实际开发中，有一些接口需要使用访问令牌 token
	// 访问令牌 token 通常是存储到本地
	// 需要先从本地获取存储的 token
	const token = getStorage('token')

	// 如果本地存在 token ，这时候就需要在请求头中添加 token 字段
	if(token){
		config.header['token'] = token
	}

	// 在请求发送之前做点什么...
	return config
}

// 配置响应拦截器
instance.interceptors.response = async (response) => {

	// 从 response 对象中解构两个数据
	const { isSuccess,data} = response

	// response 服务器响应的数据，只不过数据被 wx.request 进行了一层包装
	// console.log(response)

	// response.config 封装的包里面提供的 config 属性，是请求的参数信息
	// 可以使用请求参数进行代码的调试

	// response.data 服务器真正响应的数据

	// response。isSuccess 判断代码执行了哪一个回调函数
	// isSuccess = true，说明代码执行了 wx.request 方法的 success 回调函数
	// isSuccess = false，说明代码执行了 wx.request 方法的 fail 回调函数

	// 如果 isSuccess = false 就说明网络异常，需要给用户提示网络异常
	if(!isSuccess){
		toast({
			title: '网络异常请重试',
			icon:'error'
		})
		return Promise.reject(response)
	}

	// 如果 isSuccess = true 就说明代码执行到了 success 回调函数
	// 需要开发者对返回的参数进行逻辑判断
	// 需要对后端返回的业务状态码进行判断
	
	switch (data.code) {
		// 业务状态码 === 200：接口调用成功，服务器成功返回了数据
		case 200:
			// 接口调用成功，服务器成功返回了数据，只需要将数据简化以后返回即可
			return data

		// 业务状态码 === 208：没有token或者token失效，需要让用户重新进行登录
		case 208:
			const res = await modal({
				content:'鉴权失败，请重新登录',
				showCancel:false // 不显示取消按钮
			})
			// 用户点击确定按钮
			if(res){
				// 需要重新进行登录：把之前用户存储的信息（过期的token）进行清除
				clearStorage()
				// 跳转到登录页面
				wx.navigateTo({
					url: '/pages/login/login',
				})
			}
			// 抛出异常（将response数据抛出去）
			return Promise.reject(response)

		// 业务状态码既不等于200，又不等于208，说明出现了其他异常，需要给用户统一进行提示 
		default:
			toast({
				title:'程序正在维护中，请联系客服或者稍后重试！'
			})
			// 抛出异常（将response数据抛出去）
			return Promise.reject(response)
	}
}

// 将 WxRequest 实例进行暴露出去，方便在其他文件中进行使用
export default instance