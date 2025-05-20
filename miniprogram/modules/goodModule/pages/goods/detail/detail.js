// pages/goods/detail/index.js
import { userBehavior } from '@/behaviors/userBehavior'
Page({
  behaviors:[userBehavior],

  data: {
    goodsInfo: {
      id: 1,
      name: '经典法式可颂面包',
      price: 9.9,
      originalPrice: 19.9,
      desc: '酥脆千层·黄金蜂窝·匠心烘焙。限时优惠：第2件半价 | 顺丰冷链直达 | 满49包邮',
      image: '/assets/images/floor-img.jpg'
    },
    show: false,
    count: 1,
    blessing: '',
    buyNow: 0
  },

  handleAddcart() {
    this.setData({
      show: true,
      buyNow: 0
    })
  },

  // 修改立即购买方法
	handeGotoBuy() {
    const { goodsInfo, count } = this.data;
    const cartItem = {
      id: goodsInfo.id.toString(),
      name: goodsInfo.name,
      price: Number(goodsInfo.price),
      image: goodsInfo.image,
      count: Math.max(1, Math.min(99, Number(count) || 1)) // 确保数量在1-99
    };
    
    wx.setStorageSync('buyNowList', [cartItem]);
    wx.navigateTo({
      url: '/pages/order/detail/detail'
    });
  },

  onClose() {
    this.setData({ show: false })
  },

  onChangeGoodsCount(event) {
    this.setData({
      count: event.detail
    })
  },

  // 新增确认按钮点击事件
  onConfirm() {
		const { goodsInfo, count, blessing, buyNow } = this.data;
		const actualCount = Math.min(count, 100);
		
		const cartItem = {
			id: goodsInfo.id.toString(), // 确保id为字符串
			name: goodsInfo.name,
			price: parseFloat(goodsInfo.price), // 确保价格为数字
			image: goodsInfo.image,
			count: actualCount,
			blessing: blessing.trim(),
			checked: true
		};
		
		if (buyNow === 0) {
			const cartList = wx.getStorageSync('cartList') || [];
			const existingItem = cartList.find(item => item.id === goodsInfo.id);
			
			if (existingItem) {
				// 限制总数量不超过100
				existingItem.count = Math.min(existingItem.count + actualCount, 100);
			} else {
				cartList.push(cartItem);
			}
			
			wx.setStorageSync('cartList', cartList);
			wx.showToast({
				title: `已添加${actualCount}件商品到购物车`,
				icon: 'success',
				duration: 1500
			});
			
			// 触发全局事件通知购物车更新
			getApp().eventCenter.trigger('cartUpdate');
		} else {
			wx.setStorageSync('buyNowList', [cartItem]);
			wx.navigateTo({
				url: '/pages/order/detail/detail'
			});
		}
		
		this.setData({ show: false, count: 1, blessing: '' });
	},

  // 新增备注输入变化事件
  onTextAreaChange(e) {
    this.setData({
      blessing: e.detail.value
    });
  }
})