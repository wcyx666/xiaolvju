// pages/order_page/order_page.js
const app = getApp();
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailDta:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(options.oid);
    wx.showLoading({
      title: '加载中',
    }) 
  },
  getOrderDetail (oid) {
    let that = this;
    let url = Url.test+"/order/detail";
    let data = JSON.stringify({
      order_oid: oid
    })
    Http.postRequest(url, data).
      then(res => {
        that.setData({
          detailDta: res.data[0]
        })
        wx.hideLoading();
        console.log(res)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },
  getDate(date) {  // 获取天数
    let tDate = new Date().getTime();
    let endDate = new Date(date).getTime()+(10 * 60 * 1000);
    let reDate = endDate - tDate;
    let m,s; // 天数
    if (reDate >= 0) {
      m = Math.floor(reDate / 1000 / 60);
      s = reDate % 60;
    } 
    let minutes = m < 10 ? '0' + m : m;
    let seconds = s < 10 ? '0' + s : s;
    console.log(minutes + "分" + seconds + "秒")
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