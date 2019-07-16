// pages/login/login.js

import Http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",// 手机号码
    sms:"", // 验证码
    setSms:"", // 储存验证码
  },
  /**
 * 获取手机号码
 */
  hankPhoneClick(e) {
    console.log(e)
    this.setData({
      mobile: e.detail
    })
  },
  /**
 * hankSmsInput
 */
  hankSmsInput(e) {
    console.log(e)
    this.setData({
      sms: e.detail
    })
  },
  /**
   * 获取验证码
   */
  hankSmsClick(e) {
    let that = this;
    let url = 'https://open.ucpaas.com/ol/sms/sendsms';
    let sid = "d18163019d84277b4f41de856ba3b539";
    let token = "3897e91c3d4cc08cdb1f3df45cb12192";
    let appid = "564779a3f25a4e25b6ebe55c393c1d58";
    let mobile = this.data.mobile;
    let templateid = '368543';
    let num = "";
    for (var i = 0; i < 4; i++) {
      num += Math.floor(Math.random() * 10)
    }
    let data = JSON.stringify({
      sid: sid,
      token: token,
      appid: appid,
      mobile: mobile,
      param: num,
      templateid: templateid
    })
    Http.postRequest(url, data).
      then(res => {
        console.log(res)
        if ( res.data.code == '000000' ) {
          that.setData({
            setSms:num
          })
        }

      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },
  /**
   * 登录
   */
  hankLoginClick(e) {
    let that = this;
    let sms = that.data.sms;
    let mobile = that.data.mobile;
    let setSms = that.data.setSms;
    if (!(sms && sms)) {
      wx.showModal({
        title: '提示',
        content: '信息不能为空',
      })
      return;
    }
    if (mobile.length < 11) {
      wx.showModal({
        title: '提示',
        content: '手机号码有误',
      })
      return;
    }
    let regexStr = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!regexStr.test(mobile)) {
      wx.showModal({
        title: '提示',
        content: '手机号码有误',
      })
      return;
    }
    if (setSms != sms) {
      wx.showModal({
        title: '提示',
        content: '验证码不正常',
      })
      return;
    }
    let url = 'http://localhost/api/user.php';
    let data = JSON.stringify({
      phone: mobile,
    })
    Http.postRequest(url, data).
      then(res => {
        console.log(res)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})