// 封装本地存储API

// 同步·存储
/**
 * @description 同步存储 key 数据
 * @param {*} key 本地缓存中指定的 key
 * @param {*} data 需要缓存的数据
 */ 
export const setStorage = (key, data) => {
  try {
    wx.setStorageSync(key, data)
  } catch(error) {
    console.error(`存储指定 ${key} 数据时发生了异常`, error)
  }
}

/** 
 * @description 从本地 读取 指定key的数据
 * @param {*} key 本地缓存中指定的 key
 */ 
export const getStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    if(value) {
      return value
    }
  } catch(error) {
    console.error(`读取指定 ${key} 数据时发生了异常`, error)
  }
}

/**
 * @description 从本地 移除 指定key的数据
 * @param {*} key 本地缓存中指定的 key
 */ 
export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch(error) {
    console.error(`移除指定 ${key} 数据时发生了异常`, error)
  }
}

/**
 * @description 从本地 移除、清空 全部缓存数据
 */ 
export const clearStorage = () => {
  try {
    wx.clearStorageSync()
  } catch(error) {
    console.error(`清除、清空数据时发生了异常`, error)
  }
}

// 异步·存储
/**
 * @description 异步 将数据 存储 到本地
 * @param {*} key 本地缓存中指定的 key
 * @param {*} data 需要缓存的数据
 */ 
export const asyncSetStorage = (key, data) => {
  return new Promise((resolve) => {
    wx.setStorage({
      key,
      data,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/** 
 * @description 异步 从本地 获取 指定key的数据
 * @param {*} key 本地缓存中指定的 key
 */ 
export const asyncGetStorage = (key) => {
  return new Promise((resolve) => {
    wx.getStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/** 
 * @description 异步 从本地 移除 指定key的数据
 * @param {*} key 本地缓存中指定的 key
 */ 
export const asyncRemoveStorage = (key) => {
  return new Promise((resolve) => {
    wx.removeStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/** 
 * @description 异步 从本地 清除、移除 全部缓存的数据
 */ 
export const asyncClearStorage = () => {
  return new Promise((resolve) => {
    wx.clearStorage({
      complete(res) {
        resolve(res)
      }
    })
  })
}