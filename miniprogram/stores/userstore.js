import { observable, action } from 'mobx-miniprogram'
import { getStorage, setStorage } from '../utils/storage'

export const userStore = observable({
  token: getStorage('token') || '',
  userInfo: getStorage('userInfo') || {
    nickname: '',
    headimgurl: '/assets/images/avatar.png'
  },

  setToken: action(function(token) {
    this.token = token
    setStorage('token', token)
  }),

  setUserInfo: action(function(userInfo) {
    this.userInfo = {
      nickname: userInfo.nickName || userInfo.nickname || '微信用户',
      headimgurl: userInfo.avatarUrl || userInfo.headimgurl || '/assets/images/avatar.png'
    }
    setStorage('userInfo', this.userInfo)
  }),

  syncFromStorage: action(function() {
    this.token = getStorage('token') || ''
    const storedUserInfo = getStorage('userInfo') || {}
    this.userInfo = {
      nickname: storedUserInfo.nickname || '',
      headimgurl: storedUserInfo.headimgurl || '/assets/images/avatar.png'
    }
  }),

  clearUser: action(function() {
    this.token = ''
    this.userInfo = { nickname: '', headimgurl: '' }
    setStorage('token', '')
    setStorage('userInfo', null)
  })
})