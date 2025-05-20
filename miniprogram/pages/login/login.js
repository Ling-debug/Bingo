import { toast } from '../../utils/extendApi'
import { reqLogin, reqUserInfo } from '../../api/user'
import { setStorage } from '../../utils/storage'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '../../stores/userstore'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },

	methods: {
		async login() {
			try {
				// 1. 获取用户信息（确保请求用户信息）
				const { userInfo } = await wx.getUserProfile({
					desc: '用于展示用户信息'
				})
	
				// 2. 格式化存储用户信息
				const formattedUserInfo = {
					nickname: userInfo.nickName,
					headimgurl: userInfo.avatarUrl
				}
				
				// 3. 存储用户信息
				this.setUserInfo(formattedUserInfo) // 使用store的action
	
				// 4. 生成并存储token
				const localToken = `local_${Date.now()}`
				this.setToken(localToken)
	
				// 5. 跳转前同步状态
				userStore.syncFromStorage()
				
				// 6. 返回我的页面
				setTimeout(() => wx.navigateBack(), 300)
	
			} catch (error) {
				console.error('登录失败:', error)
			}
		}
	}
})