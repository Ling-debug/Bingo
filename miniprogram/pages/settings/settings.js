// pages/settings/settings.js
Page({
  data: {
    userInfo: null
  },

  onShow() {
    this.loadUserInfo()
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({ userInfo })
  },

  // 跳转到个人资料页
  toProfilePage() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  }
})