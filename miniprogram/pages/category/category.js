Page({
  // 初始化数据
  data: {
    activeIndex: 0, // 当前选中的一级分类索引
    categoryList: [
      {
        id: 1,
        name: "小时达",
        children: [
          { id: 101, name: "粮油食品", image: "../../assets/images/cate-1.png" },
          { id: 102, name: "品质衣物", image: "../../assets/images/cate-2.png" },
          { id: 103, name: "多样百货", image: "../../assets/images/cate-3.png" },
          { id: 104, name: "绿色水果", image: "../../assets/images/cate-4.png" },
          { id: 105, name: "精品生鲜", image: "../../assets/images/cate-5.png" }
        ]
      },
      {
        id: 2,
        name: "国家补贴",
        children: [
          { id: 201, name: "精工数码", image: "../../assets/images/cate-6.png" },
          { id: 202, name: "智能电器", image: "../../assets/images/cate-7.png" },
          { id: 203, name: "国药精品", image: "../../assets/images/cate-8.png" },
          { id: 204, name: "环球海淘", image: "../../assets/images/cate-9.png" }
        ]
      },
      {
        id: 3,
        name: "Bingo热销",
        children: [
          { id: 301, name: "二手严选", image: "../../assets/images/cate-10.png" },
          { id: 302, name: "粮油食品", image: "../../assets/images/cate-1.png" },
          { id: 303, name: "品质衣物", image: "../../assets/images/cate-2.png" },
          { id: 304, name: "多样百货", image: "../../assets/images/cate-3.png" }
        ]
      },
      {
        id: 4,
        name: "猜你想搜",
        children: [
          { id: 401, name: "绿色水果", image: "../../assets/images/cate-4.png" },
          { id: 402, name: "精品生鲜", image: "../../assets/images/cate-5.png" },
          { id: 403, name: "精工数码", image: "../../assets/images/cate-6.png" },
          { id: 404, name: "智能电器", image: "../../assets/images/cate-7.png" }
        ]
      }
    ]
  },

  // 切换一级分类
  handleTabClick(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },

  // 可以移除onLoad方法，因为我们不再需要API请求
})