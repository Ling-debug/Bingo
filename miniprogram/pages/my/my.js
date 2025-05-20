Component({
  properties: {},
  data: {
    initpanel: [
      { url: '/pages/order/list/list', title: '商品订单', iconfont: 'icon-dingdan' },
      { url: '/pages/order/list/list', title: '礼品卡订单', iconfont: 'icon-lipinka' },
      { url: '/pages/order/list/list', title: '退款/售后', iconfont: 'icon-tuikuan' }
    ],
    token: null,
    userInfo: null
  },

  methods: {
    toLoginPage() {
      wx.navigateTo({ 
        url: '/pages/login/login',
        events: {
          loginSuccess: (res) => {
            this.handleLoginSuccess(res)
          }
        }
      })
    },

    handleLoginSuccess(res) {
      const userInfo = {
        nickName: res.userInfo.nickname || res.userInfo.nickName,
        avatarUrl: res.userInfo.headimgurl || res.userInfo.avatarUrl
      }
      
      this.setData({
        token: res.token,
        userInfo: userInfo
      })
      
      wx.setStorageSync('token', res.token)
      wx.setStorageSync('userInfo', userInfo)
    },

    checkLoginStatus() {
      const token = wx.getStorageSync('token')
      const userInfo = wx.getStorageSync('userInfo')
      
      if (token) {
        this.setData({
          token: token,
          userInfo: userInfo || {
            nickName: '微信用户',
            avatarUrl: '/assets/images/avatar.png'
          }
        })
      }
    },

    refreshUserInfo() {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.setData({
          'userInfo.nickName': userInfo.nickname || userInfo.nickName,
          'userInfo.avatarUrl': userInfo.headimgurl || userInfo.avatarUrl
        })
      }
    },

    toSettingsPage() {
      wx.navigateTo({
        url: '/pages/settings/settings'
      })
    }
  },

  lifetimes: {
    attached() {
      this.checkLoginStatus()
    }
  },

  pageLifetimes: {
    show() {
      this.checkLoginStatus()
      this.refreshUserInfo()
    }
  }
})