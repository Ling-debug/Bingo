// pages/goods/list/index.js
import { reqGoodsList } from '../../../../../api/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    total:0, // 数据总条数
    isFinish: false, // 判断数据是否加载完毕
    
    // 商品列表请求参数
    requestData:{
      // 页码
      page:1,
      // 每页请求10条数据
      limit:10,
      // 定义一级分类 id
      category1Id:'',
      // 定义二级分类 id
      category2Id:''
    }
  },

  // 获取商品列表数据
  async getGoodsList(){
    // 调用接口api函数，并传入参数
    const {data} = await reqGoodsList( this.data.requestData )
    
    this.setData({
      goodsList:[...this.data.goodsList,...data.records],
      total:data.total
    })
  },

	// 监听页面上拉操作
	onReachBottom(){
		// 解构数据
		const { goodsList,total,requestData,isLoading } = this.data
		const { page } = requestData

		// 判断 isLoading 状态
		// 如果状态等于 true ，说明请求正在发送中，则不请求下一页数据（不会执行下面的代码）
		if (isLoading) return

		// 开始让 goodsList 长度 和 total 进行对比
		// 如果数据相等，说明商品列表已经加载完毕，则不需要执行上拉更新
		if(goodsList.length === total) {
			this.setData({
				isFinish:true
			})
			// 阻止代码往下运行
			return
		}

		// 用户上拉之后，页码 + 1
		this.setData({
			requestData:{ ...this.data.requestData,page:page+1 }
		})

		// 重新获取商品列表
		this.getGoodsList()
	},

	// 监听页面下拉刷新操作
	onPullDownRefresh () {
		// 将数据进行重置
		this.setData({
			goodsList:[],
			total:0,
			isFinish:false,
			requestData:{ ...this.data.requestData,page:1 }
		})
		// 使用最新的参数发送请求
		this.getGoodsList()
		// 手动关闭下拉刷新的效果
		wx.stopPullDownRefresh()
	},

  // 接收请求参数
  onLoad( options ){
    // 对参数进行合并。。。Object.assign用来合并对象，后面对象对应的属性会往前进行合并
    Object.assign(this.data.requestData,options)

    // 调用获取商品列表数据的方法
    this.getGoodsList()
  },

  // 返回上一页
  gotoBack() {
    wx.navigateBack({
      delta: 1 // 返回上一级页面
    })
  }
})