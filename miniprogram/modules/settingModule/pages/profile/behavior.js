// 使用 mobx-miniprogram-bindings 库来将 MobX 状态管理库与小程序进行绑定

import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '../../../../stores/userstore'

export const userBehavior = BehaviorWithStore({
	storeBindings:{
		store:userStore,
		fields:['userInfo']
	}
})