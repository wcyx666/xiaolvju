// pages/map/map.js
const amapFile = require('../../lib/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindInput: function (e) {
    var that = this;
    var keywords = e.detail;
    console.log(e)
    var myAmapFun = new amapFile.AMapWX({ key: '94ed21456e7bd9449dc1bb49f94c8f20' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '大同',
      success: function (data) {
        console.log(data)
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    console.log(e)
    var keywords = e.currentTarget.dataset.keywords;
    wx.setStorageSync('city', keywords);
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var keywords = '大同火车站';
    var myAmapFun = new amapFile.AMapWX({ key: '94ed21456e7bd9449dc1bb49f94c8f20' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '大同',
      success: function (data) {
        console.log(data)
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
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