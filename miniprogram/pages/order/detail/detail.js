// pages/order/detail/detail.js
Page({
  data: {
    selectedAddress: null,
    buyName: '',
    buyPhone: '',
    deliveryDate: '',
    deliveryPlaceholder: '请选择送达时间',
    remarks: '',
    show: false,
    goodsList: [],
    totalPrice: '0.00',
    
    // 时间选择相关数据
    timeSlots: [
      '09:00-13:00',
      '13:00-17:00',
      '17:00-21:00'
    ],
    recentDates: [],
    selectedDate: '',
    selectedTimeSlot: ''
  },

  onLoad() {
    this.setRecentDates();
    this.initGoodsList();
    this.loadAddressList();
  },

  // 初始化商品数据
  initGoodsList() {
    let buyNowList = wx.getStorageSync('buyNowList') || [];
    
    // 强化数据初始化，确保所有字段有效
    buyNowList = buyNowList.map(item => ({
      id: item.id?.toString() || Date.now().toString(),
      name: item.name || '未知商品',
      price: Number(item.price) || 0,
      displayPrice: (Number(item.price) || 0).toFixed(2), // 格式化显示价格
      image: item.image || '/assets/images/default-product.png',
      count: Math.max(1, Math.min(99, Number(item.count) || 1)), // 确保数量在1-99
      checked: true
    }));

    this.setData({
      goodsList: buyNowList
    }, this.calculateTotalPrice);
  },

  // 设置最近3天日期
  setRecentDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(this.formatDate(date));
    }
    
    this.setData({ recentDates: dates });
  },

  // 格式化日期显示 (5月16日)
  formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  },

  // 加载地址列表
  loadAddressList() {
    const addressList = wx.getStorageSync('addressList') || [];
    const selectedAddress = wx.getStorageSync('selectedAddress') || 
                          addressList.find(item => item.isDefault) || 
                          addressList[0] || 
                          null;
    
    this.setData({
      selectedAddress,
      buyName: selectedAddress?.name || '',
      buyPhone: selectedAddress?.phone || ''
    });
  },

  // 跳转地址列表
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index',
      events: {
        refreshAddress: () => {
          this.loadAddressList();
        }
      },
      success: (res) => {
        this.eventChannel = res.eventChannel;
      }
    });
  },

  // 显示时间选择弹窗
  onShowDateTimerPopUp() {
    this.setData({ 
      show: true,
      selectedDate: this.data.selectedDate || this.formatDate(new Date()),
      selectedTimeSlot: this.data.selectedTimeSlot || this.data.timeSlots[0]
    });
  },

  // 选择日期
  selectDate(e) {
    this.setData({
      selectedDate: e.currentTarget.dataset.date
    });
  },

  // 选择时间段
  selectTimeSlot(e) {
    this.setData({
      selectedTimeSlot: e.currentTarget.dataset.slot
    });
  },

  // 确认时间选择
  onConfirmTimerPicker() {
    const { selectedDate, selectedTimeSlot } = this.data;
    
    if (!selectedDate || !selectedTimeSlot) {
      wx.showToast({ title: '请选择完整的时间', icon: 'none' });
      return;
    }
    
    this.setData({
      show: false,
      deliveryDate: `${selectedDate} ${selectedTimeSlot}`,
      deliveryPlaceholder: ''
    });
  },

  // 取消时间选择
  onCancelTimePicker() {
    this.setData({ 
      show: false,
      deliveryPlaceholder: this.data.deliveryDate ? '' : '请选择送达时间'
    });
  },

  // 处理数量变化
  handleCountChange(e) {
    const { index } = e.currentTarget.dataset;
    const value = Math.max(1, Math.min(99, Number(e.detail.value) || 1));
    
    this.setData({
      [`goodsList[${index}].count`]: value
    }, () => {
      this.calculateTotalPrice();
      wx.setStorageSync('buyNowList', this.data.goodsList);
    });
  },

  // 计算总价
  calculateTotalPrice() {
    const total = this.data.goodsList.reduce((sum, item) => {
      return sum + (item.price * item.count);
    }, 0);
    
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },

  // 提交订单
  submitOrder() {
    const { selectedAddress, buyName, buyPhone, deliveryDate, goodsList } = this.data;
    
    if (!selectedAddress) {
      return wx.showToast({ title: '请添加收货地址', icon: 'none' });
    }
    if (!buyName || !buyPhone) {
      return wx.showToast({ title: '请完善收货人信息', icon: 'none' });
    }
    if (!deliveryDate) {
      return wx.showToast({ title: '请选择送达时间', icon: 'none' });
    }
    if (goodsList.length === 0) {
      return wx.showToast({ title: '商品不能为空', icon: 'none' });
    }
    
    wx.showToast({ 
      title: '订单提交成功', 
      icon: 'success',
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
});