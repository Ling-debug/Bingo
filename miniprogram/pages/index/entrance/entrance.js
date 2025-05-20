// pages/index/entrance/entrance.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 分类列表数据。即在使用商品导航组件时，组件使用者需要给组件内部传入需要渲染的分类列表数据才可以
    cateList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
		navList: [
      { id: 1, name: '食品', icon: '../../../assets/images/cate-1.png' },
      { id: 2, name: '衣服', icon: '../../../assets/images/cate-2.png' },
      { id: 3, name: '百货', icon: '../../../assets/images/cate-3.png' },
      { id: 4, name: '水果', icon: '../../../assets/images/cate-4.png' },
      { id: 5, name: '生鲜', icon: '../../../assets/images/cate-5.png' },
      { id: 6, name: '数码', icon: '../../../assets/images/cate-6.png' },
      { id: 7, name: '电器', icon: '../../../assets/images/cate-7.png' },
      { id: 8, name: '医药', icon: '../../../assets/images/cate-8.png' },
      { id: 9, name: '海淘', icon: '../../../assets/images/cate-9.png' },
      { id: 10, name: '二手', icon: '../../../assets/images/cate-10.png' }
    ]
	},

  /**
   * 组件的方法列表
   */
  methods: {}
})
