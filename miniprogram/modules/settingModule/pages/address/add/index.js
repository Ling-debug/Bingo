Page({
  data: {
    formData: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      address: '',
      isDefault: false
    },
    regionValue: [],
    regionText: '',
		addressId: null,
		addressList: [],
    locationLoading: false
  },

  onLoad(options) {
    if (options.id) {
      this.loadAddress(options.id);
    }
  },

  loadAddress(id) {
    const addresses = wx.getStorageSync('addressList') || [];
    const address = addresses.find(item => item.id === id);
    if (address) {
      this.setData({
        addressId: id,
        formData: address,
        regionValue: [address.province, address.city, address.district],
        regionText: `${address.province} ${address.city} ${address.district}`
      });
    }
  },

	selectAddress(e) {
		const selectedAddress = e.currentTarget.dataset.item;
	  // 使用 wx.navigateBack 返回到订单页，并传递参数
	  wx.navigateBack({
	    delta: 1, // 返回上一级页面（订单页）
	    success: () => {
	      // 将选中地址存入全局或本地存储（推荐使用全局变量或页面栈通信）
	      wx.setStorageSync('selectedAddress', selectedAddress);
	    }
	  });
	},

  onRegionChange(e) {
    const [province, city, district] = e.detail.value;
    this.setData({
      regionValue: e.detail.value,
      regionText: `${province} ${city} ${district}`,
      'formData.province': province,
      'formData.city': city,
      'formData.district': district
    });
  },

  handleLocation() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.getUserLocation();
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => this.getUserLocation(),
            fail: () => this.showAuthTip()
          });
        }
      }
    });
  },

  getUserLocation() {
    this.setData({ locationLoading: true });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: (locRes) => {
            this.processLocation(locRes);
          },
          complete: () => {
            this.setData({ locationLoading: false });
          }
        });
      },
      fail: () => {
        this.setData({ locationLoading: false });
        wx.showToast({ title: '获取位置失败', icon: 'none' });
      }
    });
  },

  processLocation(locationRes) {
    const address = locationRes.address || '';
    const parts = address.match(/(.+?[省市县区])/g) || [];
    const detail = locationRes.name || '';
    
    const province = parts[0] || '';
    const city = parts[1] || '';
    const district = parts[2] || '';
    
    this.setData({
      regionValue: [province, city, district],
      regionText: [province, city, district].filter(Boolean).join(' '),
      'formData.province': province,
      'formData.city': city,
      'formData.district': district,
      'formData.address': detail
    });
  },

  showAuthTip() {
    wx.showModal({
      title: '需要位置权限',
      content: '请在设置中允许位置权限以使用定位功能',
      confirmText: '去设置',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting();
        }
      }
    });
  },

  saveAddress(e) {
    const formData = {
      ...e.detail.value,
      province: this.data.formData.province,
      city: this.data.formData.city,
      district: this.data.formData.district
    };

    // 表单验证
    if (!this.validateForm(formData)) return;

    // 保存数据
    this.saveToStorage(formData);
  },

  validateForm(data) {
    if (!data.name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return false;
    }
    
    if (!/^1[3-9]\d{9}$/.test(data.phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return false;
    }
    
    if (!data.province || !data.city || !data.district) {
      wx.showToast({ title: '请选择完整的省市区', icon: 'none' });
      return false;
    }
    
    if (!data.address.trim()) {
      wx.showToast({ title: '请输入详细地址', icon: 'none' });
      return false;
    }
    
    return true;
  },

  saveToStorage(formData) {
    const addressList = wx.getStorageSync('addressList') || [];
    const address = {
      id: this.data.addressId || Date.now().toString(),
      ...formData,
      isDefault: !!formData.isDefault
    };

    // 更新默认地址
    if (address.isDefault) {
      addressList.forEach(item => {
        item.isDefault = false;
      });
    }

    // 更新或新增
    const index = this.data.addressId 
      ? addressList.findIndex(item => item.id === this.data.addressId)
      : -1;
    
    if (index >= 0) {
      addressList[index] = address;
    } else {
      addressList.unshift(address);
    }

    wx.setStorageSync('addressList', addressList);
    wx.setStorageSync('selectedAddress', address);

    // 获取页面栈
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 上一页
    
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          // 直接调用上一页的方法更新地址
          if (prevPage && prevPage.handleSelectAddress) {
            prevPage.handleSelectAddress(address);
          }
          wx.navigateBack();
        }, 1500);
      }
    });
  },
	
	// 处理从地址列表选择地址的情况
  selectAddress(e) {
    const selectedAddress = e.currentTarget.dataset.item;
    wx.setStorageSync('selectedAddress', selectedAddress);
    
    // 获取页面栈
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 上一页
    
    // 直接调用上一页的方法更新地址
    if (prevPage && prevPage.handleSelectAddress) {
      prevPage.handleSelectAddress(selectedAddress);
    }
    
    wx.navigateBack();
  }
});