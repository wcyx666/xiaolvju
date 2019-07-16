// pages/home/home.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      '../image/banner3.png'
    ],
    couFalut: 'true',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hostList:[
      {
        typeIp:"1",
        img:"../image/img2.png",
        title:"日常保洁",
        deilt:"提供家庭室内表面清洁服务",
        motny:80
      },
      {
        typeIp: "2",
        img: "../image/img4.png",
        title: "深度保洁",
        deilt: "提供新房、长久未打扫家庭室内深度清洁服务",
        motny: 150
      }
    ],
    user_id:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      },
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

  },
  bingClickCoupon () {
    this.setData({
      couFalut: true
    })
  },
  bindClickTo (e) {
    let id = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../author_details/author_details?typeIp='+id,
    })
  },
  //点击获取优惠券
  bindClickCou  () {
    console.log(this.data.user_id)
    let that = this;
    let url = Url.test + "/coupon/add";
    let openid = that.data.user_id;
    let data = JSON.stringify({
      user_id: openid
    })
    Http.postRequest(url, data).
      then(res => {
        if (res.data.code == 3) {
          wx.showToast({
            icon:'none',
            title: '您已经领取过优惠券了',
            success: (res => {
              that.setData({
                couFalut: false
              })
            })
          })
        } else if (res.data.code == 1) {
          wx.showToast({
            icon: 'none',
            title: '领取优惠券成功',
            success: (res => {
              that.setData({
                couFalut: false
              })
            })
          })
        } else if (res.data.code == 2) {
          wx.showToast({
            icon: 'none',
            title: '领取优惠券失败',
          })
        }
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },
  bindClickCode () {
    console.log(123213)
    this.setData({
      couFalut:false
    })
  }
})