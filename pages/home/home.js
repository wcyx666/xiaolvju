// pages/home/home.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      { path: '../image/289.jpg', type: 1 },
      { path: '../image/300.jpg', type: 2 },
    ],
    couFalut: 'true',
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 5000,
    duration: 1000,
    hostList:[
      {
        typeIp:"1",
        img:"../image/img2.png",
        title:"日常保洁",
        deilt:"提供家庭室内表面清洁服务",
        motny:3
      },
      {
        typeIp: "2",
        img: "../image/img4.png",
        title: "深度保洁",
        deilt: "提供新房、长久未打扫家庭室内深度清洁服务",
        motny: 4
      },
      {
        typeIp: "3",
        img: "../image/img3.png",
        title: "油烟机",
        deilt: "提供厨房油烟机清洁服务",
        motny: 100
      }
    ],
    user_id:"",
    userTotal:"", //用户数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getTotal();
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      },
    })
  },
  getTotal () {
    let that = this;
    let url = Url.test + "/users/ready";
    Http.postRequest(url).
      then(res => {
        console.log(res)
        that.setData({
          userTotal:res.data.total
        })
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
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
    if ( id == 1 ) {
      wx.navigateTo({
        url: '../product_details1/product_details1'
      })
    } else if ( id == 2 ) {
      wx.navigateTo({
        url: '../product_details2/product_details2'
      })
    } else if (id == 3) {
      wx.navigateTo({
        url: '../product_details3/product_details3'
      })
    }
    
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
  },
  bindClickRouter(data) {
    let type = data.currentTarget.dataset.type;
    if (type == 1) {
      wx.navigateTo({
        url: '../product_details1/product_details1',
      })
    } else if (type == 2) {
      wx.navigateTo({
        url: '../product_details2/product_details2',
      })
    }
    
  }
})