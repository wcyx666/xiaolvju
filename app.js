//app.js
import URL from './utils/common.js'
App({
  onLaunch: function () {
    
    if (!wx.getStorageSync('openid')){
      // 登录
      wx.login({
        success: res => {
          console.log(res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: URL.test + '/login/login',
            method: 'post',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              let data = res.data.body;
              console.log(res);
              let info = JSON.parse(data);
              let openid = info.openid;
              wx.setStorageSync('openid', openid)
              wx.request({
                url: URL.test + '/users',
                method: 'post',
                data: {
                  openid: openid
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res);
                }
              })
            }
          })
          
        }
      })
    } else {
      console.log(1231)
    }
    
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:""
  }
})