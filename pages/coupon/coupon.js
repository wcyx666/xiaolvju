// pages/coupon/coupon.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couData:""
  },

  readyCou(user_id) {
    let that = this;
    let url = Url.test + "/coupon/ready";
    let openid = that.data.user_id;
    let data = JSON.stringify({
      user_id: user_id
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
        that.readyCou(res.data)
      },
    })
    wx.showLoading({
      title: '加载中',
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
    wx.showNavigationBarLoading();  //在标题栏中显示加载
    this.readyCou(this.data.user_id);
    setTimeout(function () {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1000);
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