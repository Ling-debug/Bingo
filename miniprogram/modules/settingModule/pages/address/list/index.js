Page({
  data: {
    addressList: []
  },

  onShow() {
    this.loadAddressList();
    
    // 检查是否有新选择的地址需要更新
    const selectedAddress = wx.getStorageSync('selectedAddress');
    if (selectedAddress) {
      // 获取页面栈
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 上一页(订单页)
      
      // 直接调用订单页的方法更新地址
      if (prevPage && prevPage.handleSelectAddress) {
        prevPage.handleSelectAddress(selectedAddress);
      }
    }
  },

  loadAddressList() {
    const addressList = wx.getStorageSync('addressList') || [];
    this.setData({ addressList });
  },

  toAdd() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/add/index',
      events: {
        // 定义接收新增地址事件的回调
        refreshAddress: () => {
          this.loadAddressList();
        }
      }
    });
  },

  toEdit(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`,
      events: {
        // 定义接收编辑地址事件的回调
        refreshAddress: () => {
          this.loadAddressList();
        }
      }
    });
  },

  // 删除
  handleDelete(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          const addressList = wx.getStorageSync('addressList') || [];
          const newList = addressList.filter(item => item.id !== id);
          wx.setStorageSync('addressList', newList);
          this.setData({ addressList: newList });
          
          // 获取页面栈
          const pages = getCurrentPages();
          // 查找订单页面
          const orderPage = pages.find(page => page.route === 'pages/order/detail/index');
          if (orderPage) {
            orderPage.loadAddressList();
          }
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
});