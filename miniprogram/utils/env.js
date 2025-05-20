// 这个文件用来：配置当前小程序项目的环境变量

// 获取当前小程序的账号信息
const { miniProgram } = wx.getAccountInfoSync()

// 获取小程序的版本
const { envVersion } = miniProgram

let env = {
	baseURL:'https://gmall-prod.atguigu.cn/mall-api'
}

// 根据不同的版本，对应不同的接口地址
switch (envVersion) {
	// 开发版 // 使用时请换成真实接口
	case 'develop':
		env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
		break;

	// 体验版 // 使用时请换成真实接口
	case 'trial':
		env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
		break;

	// 正式版 // 使用时请换成真实接口
	case 'release':
		env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
		break;

	default:
		env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
		break;
}

export { env }