Component({

	// 组件的属性列表
  properties: {
		// 每一项商品的数据
		goodItem:{
			type:Object,
			value:{}
		}
	},

  data: {
    goodsList: [
      {
        id: 1,
        name: "经典法式可颂面包",
        description: "酥脆千层·黄金蜂窝·匠心烘焙",
        price: "9.9",
        originPrice: "19.9",
        image: "/assets/images/floor.jpg"
      },{
        id: 1,
        name: "经典法式可颂面包",
        description: "酥脆千层·黄金蜂窝·匠心烘焙",
        price: "9.9",
        originPrice: "19.9",
        image: "/assets/images/floor.jpg"
      }
    ].slice(0, 2)
  },

  methods: {}
})