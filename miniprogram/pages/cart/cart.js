// pages/cart/cart.js
Component({
  options: {
    styleIsolation: 'shared' // 确保样式隔离
  },
  
  data: {
    cartList: [],
    allChecked: false,
    totalPrice: 0
  },

  lifetimes: {
		attached() {
			this.loadCartData();
			// 确保getApp().eventCenter存在
			if (getApp().eventCenter) {
				getApp().eventCenter.on('cartUpdate', this.loadCartData, this);
			}
		},
		detached() {
			if (getApp().eventCenter) {
				getApp().eventCenter.off('cartUpdate', this.loadCartData, this);
			}
		}
	},	

  methods: {
    loadCartData() {
      try {
        const cartList = wx.getStorageSync('cartList') || [];
        console.log('加载购物车数据:', cartList); // 调试日志
        this.setData({
          cartList,
          allChecked: this.checkAllStatus(cartList)
        });
        this.calculateTotal();
      } catch (e) {
        console.error('加载购物车数据失败:', e);
      }
    },

    checkAllStatus(list) {
			if (list.length === 0) return false;
			return list.every(item => item.checked);
		},

    calculateTotal() {
      const total = this.data.cartList.reduce((sum, item) => {
        return item.checked ? sum + (item.price * item.count) : sum;
      }, 0);
      this.setData({ totalPrice: total.toFixed(2) });
    },

    toggleItemCheck(e) {
      const index = e.currentTarget.dataset.index;
      const cartList = this.data.cartList.map((item, i) => 
        i === index ? { ...item, checked: !item.checked } : item
      );
      this.updateCart(cartList);
    },

    toggleCheckAll() {
      const newChecked = !this.data.allChecked;
      const cartList = this.data.cartList.map(item => ({
        ...item,
        checked: newChecked
      }));
      this.updateCart(cartList);
    },

    updateCart(cartList) {
      try {
        wx.setStorageSync('cartList', cartList);
        this.setData({
          cartList,
          allChecked: this.checkAllStatus(cartList)
        });
        this.calculateTotal();
      } catch (e) {
        console.error('更新购物车失败:', e);
      }
    },

    onChangeCount(event) {
      const { id } = event.currentTarget.dataset;
      const count = event.detail;
      const cartList = this.data.cartList.map(item => 
        item.id === id ? { ...item, count } : item
      );
      this.updateCart(cartList);
    },

    onDeleteGoods(event) {
      const { id } = event.currentTarget.dataset;
      wx.showModal({
        title: '提示',
        content: '确定删除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            const cartList = this.data.cartList.filter(item => item.id !== id);
            this.updateCart(cartList);
            wx.showToast({ title: '删除成功' });
          }
        }
      });
    }
  }
})