// pages/coupon_use/coupon_use.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        that.getCou(res.data,1 , options.type )
      },
    })
    wx.showLoading({
      title: '加载中',
    })
  },

  getCou(user_id, type, cases) {
    let that = this;
    let url = Url.test + "/coupon/type";
    let openid = that.data.user_id;
    let data = JSON.stringify({
      user_id: user_id,
      coupon_types:type,
      coupon_cases: cases
    })
    Http.postRequest(url, data).
      then(res => {
        that.setData({
          couData: res.data.data
        })
        wx.hideLoading();
        console.log(res.data.data)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },

  bindClickOn () {
    wx.setStorageSync('coupon_id', '1');
    wx.navigateBack({
      delta: 1
    })
  },

  bindClickUse (e) {
    console.log(e);
    let type = e.currentTarget.dataset.item.coupon_types;
    let id = e.currentTarget.dataset.item.coupon_id;
    let price = e.currentTarget.dataset.item.coupon_price;
    wx.setStorageSync('coupon_id', id);
    wx.navigateBack({
      delta: 1
    })
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