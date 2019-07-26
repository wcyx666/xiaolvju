// pages/order/order.js
const app = getApp();
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.openid,
    data:""
  },
  // 切换按钮
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    }) 
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.getOrderList(res.data);
        that.setData({
          openid: res.data
        })
      },
    })
  },

  getOrderList(openid) {
    let that = this;
    let url = Url.test+"/order/ready";
    let data = JSON.stringify({
      userId: openid
    })
    Http.postRequest(url, data).
      then(res => {
        that.setData({
          data: res.data
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
  // 跳转详情页面
  bindTapTo (e) {
    let oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: "../order_page/order_page?oid=" + oid
    })
  },

  // 切换按钮
  orderBtn (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.setData({
      indexs: index
    })
  },
  // 取消订单
  bindTapCan (e) {
    console.log(e);
    let that = this;
    let oid = e.currentTarget.dataset.oid;
    wx.showModal({
      title: '提示',
      content: '是否确认取消订单',
      success(res) {
        if (res.confirm) {
          let url = Url.test + "/order/cancel";
          let data = JSON.stringify({
            order_oid: oid
          })
          Http.postRequest(url, data).
            then(res => {
              if (res.data.code == 1) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    that.getOrderList(that.data.openid);
                  }
                })
                wx.hideLoading();
              }
            }).catch((erorr) => {
              wx.showToast({
                title: '取消失败',
                icon: 'success',
                duration: 2000
              })
            })
            .finally(function (res) {
              console.log(res)
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 支付
  bindTapPay (e){
    let oid = e.currentTarget.dataset.oid;
    let name = e.currentTarget.dataset.name;
    let price = e.currentTarget.dataset.price;
    wx.navigateTo({
      url: '../order_pay/order_pay?oid=' + oid + '&name=' + name + '&price=' + price
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
    this.getOrderList(this.data.openid);
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