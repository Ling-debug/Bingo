// pages/index/banner/banner.js

Component({
  /**
   * 组件的属性列表，用来定义组件使用者需要传递给组件内部的一些属性
   */
  properties: {
    // 组件使用者在使用当前组件时需要传递bannerList这个属性， bannerList属性指需要渲染的轮播图数据
    bannerList: {
			// 传递的数据类型需要是一个数组
			type: Array,
			// 定义三张默认的轮播图
      value: [
        '../../../assets/banner/banner-1.jpg',
        '../../../assets/banner/banner-2.jpg',
        '../../../assets/banner/banner-3.jpg'
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
		activeIndex:0 // 被激活的轮播图索引，默认是0
	},

  /**
   * 组件的方法列表
   */
  methods: {
		// 获取被激活的轮播图索引
		getSwiperIndex(event){
			// 将current进行解构
			const { current } = event.detail
			// 给 activeIndex 赋值 current
			this.setData({
				activeIndex:current
			})
		}
	}
})
