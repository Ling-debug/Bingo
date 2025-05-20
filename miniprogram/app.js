// import {toast} from './utils/extendApi'
// import './utils/extendApi'
// import {setStorage,getStorage,removeStorage,clearStorage} from './utils/storage'
import {asyncSetStorage,asyncGetStorage,asyncRemoveStorage,asyncClearStorage} from './utils/storage'
App({
	onLaunch() {
    // 初始化事件中心
    this.eventCenter = new (require('./utils/event'))();
    wx.eventCenter = this.eventCenter;
	},
	
	// async和await:获取用户操作
  async onShow() {
		// 显示提示框，并且自动关闭
    // 不调用函数：
    // wx.showToast({
    // 	title: '消息提示框', // 提示的内容
    // 	icon: 'success',   // 提示的图标，success(成功)、error(失败)、loading(加载)、none(不显示图标)
    // 	duration: 2000,	 // 提示的延迟时间
    // 	mask: true		 // 是否显示透明蒙层，防止触摸穿透
    // })
    // 不传入参数，直接显示：数据加载中...
    // wx.toast()
    // 传入参数，会覆盖默认的参数
		// wx.toast({title:'数据加载完毕',icon:'success'})
		
		// 弹出提示框，有确定和取消按钮
    // wx.showModal({
    //   title: '提示', // 提示的标题
    //   content: '您确定执行该操作吗？', // 提示的内容
    //   confirmColor: '#f3514f',
    //   // 接口调用结束的回调函数（调用成功、失败都会执行）
    //   complete({ confirm, cancel }) {
    //     confirm && console.log('点击了确定')
    //     cancel && console.log('点击了取消')
    //   }
		// })
		
		// 不传入参数   async和await:获取用户操作
		// const res = await wx.modal()
		// 传入参数，覆盖默认的参数
		// const res = await wx.modal({
		// 	title: '新的提示',
		// 	showCancel: false
		// })
		// console.log(res)


		// 同步存储数据
		// wx.setStorageSync('name', 'tom')
		// 同步读取数据
		// const name = wx.getStorageSync('name')
		// console.log(name)

		// 异步存储数据
		// asyncSetStorage('name','Jerry').then((res) => {
		// 	console.log(res)
		// })
		// 异步读取数据
		// asyncGetStorage('name').then((res) => {
		// 	console.log(res)
		// })
		// 异步移除指定数据
		// asyncRemoveStorage('name').then((res) => {
		// 	console.log(res)
		// })
		// 异步移除所有数据
		// asyncClearStorage().then((res) => {
		// 	console.log(res)
		// })

		// 获取当前小程序的账号信息
		// const accountInfo = wx.getAccountInfoSync()

		// 通过小程序的账号信息，就能获取小程序版本
		// console.log(accountInfo.miniProgram.envVersion)
  }
})
