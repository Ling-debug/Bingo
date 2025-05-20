// 本地模拟登录
export const reqLogin = () => {
  return Promise.resolve({
    code: 200,
    data: {
      token: `local_${Date.now()}`,
      userInfo: wx.getStorageSync('userInfo')
    }
  })
}

// 本地模拟获取用户信息
export const reqUserInfo = () => {
  return Promise.resolve({
    code: 200,
    data: wx.getStorageSync('userInfo') || {
      nickname: '微信用户',
      headimgurl: '/assets/images/avatar.png'
    }
  })
}

/**
 * @description 本地模拟文件上传
 * @param {*} filePath 要上传的文件资源路径
 * @param {*} name 文件对应的 key
 * @returns Promise
 */
export const reqUploadFile = (filePath) => {
  // 模拟上传延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: filePath, // 直接返回本地路径
        message: '上传成功'
      })
    }, 500)
  })
}