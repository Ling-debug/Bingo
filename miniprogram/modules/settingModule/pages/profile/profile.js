// pages/profile/profile.js
import { userBehavior } from './behavior'
import { getStorage, setStorage } from '../../../../utils/storage'
import { reqUploadFile } from '../../../../api/user'

Page({
  behaviors: [userBehavior],

  data: {
    isShowPopup: false,
    tempNickname: ''
  },

  // 新增：每次页面显示时加载最新数据
  onShow() {
    this.loadUserInfo()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = getStorage('userInfo') || {
      nickname: '微信用户',
      headimgurl: '/assets/images/avatar.png'
    }
    this.setData({ userInfo })
  },

  async chooseAvatar(event) {
    const { avatarUrl } = event.detail
    
    const res = await reqUploadFile(avatarUrl)
    
    this.setData({
      'userInfo.headimgurl': res.data
    })
    
    setStorage('userInfo', this.data.userInfo)
  },

  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      tempNickname: this.data.userInfo.nickname || 'i錦鯉'
    })
  },

  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  },

  onNicknameInput(e) {
    this.setData({
      tempNickname: e.detail.value
    })
  },

  confirmNickname() {
    this.setData({
      isShowPopup: false,
      'userInfo.nickname': this.data.tempNickname
    })
    setStorage('userInfo', this.data.userInfo)
  },

  saveChanges() {
    // 统一数据格式
    const newUserInfo = {
      nickname: this.data.userInfo.nickname,
      headimgurl: this.data.userInfo.headimgurl
    }
    
    // 保存到本地存储
    setStorage('userInfo', newUserInfo)
    
    // 获取页面栈并更新上级页面
    const pages = getCurrentPages()
    for (let i = pages.length - 2; i >= 0; i--) {
      const page = pages[i]
      if (page.route === 'pages/settings/settings') {
        page.setData && page.setData({ userInfo: newUserInfo })
      } else if (page.route === 'pages/my/my') {
        page.setData && page.setData({
          'userInfo.nickName': newUserInfo.nickname,
          'userInfo.avatarUrl': newUserInfo.headimgurl
        })
        break
      }
    }

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})