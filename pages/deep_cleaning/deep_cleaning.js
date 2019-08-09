// pages/deep_cleaning/deep_cleaning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deep:[
      { name: "一居1卫", price: '180', type: '1', area:"70",src:"../image/icon_fw.png" },
      { name: "二居1卫", price: '300', type: '2', area: "110", src: "../image/icon_fw.png" },
      { name: "二居2卫", price: '380', type: '3', area: "140", src: "../image/icon_fw.png" },
      { name: "三居1卫", price: '380', type: '4', area: "140", src: "../image/icon_fw.png" },
      { name: "三居2卫", price: '500', type: '5', area: "200", src: "../image/icon_fw.png" },
      { name: "四居以上", price: '3元/㎡', type: '6', area: "", src: "../image/icon_fw.png" },
    ],
    deep1: [
      { name: "一居室", price: '210', type: '1', area: "70", src: "../image/icon_fw.png" },
      { name: "二居1卫", price: '360', type: '2', area: "120", src: "../image/icon_fw.png" },
      { name: "二居2卫", price: '450', type: '3', area: "150", src: "../image/icon_fw.png" },
      { name: "三居1卫", price: '560', type: '4', area: "180", src: "../image/icon_fw.png" },
      { name: "三居2卫", price: '600', type: '5', area: "200", src: "../image/icon_fw.png" },
      { name: "四居以上", price: '3元/㎡', type: '6', area: "", src: "../image/icon_fw.png" },
    ],
    type:"s", // 类型
    order_value:"",  // 平米数
    order_type:"",
    order_price:"", // 产品价格
    order_name:"",// 产品名称
  },


  bindClickType (e) {
    console.log(e)
    this.setData({
      type: e.currentTarget.dataset.index,
      order_price: e.currentTarget.dataset.item.price,
      order_name: e.currentTarget.dataset.item.name,
      order_value: e.currentTarget.dataset.item.area,
    })
  },

  onChange (e) {
    console.log(e)
    let price;
    if (this.data.order_type == 1) {
      price = e.detail * 3;
    } else if (this.data.order_type == 2) {
      price = e.detail * 4;
    }
    this.setData({
      order_value: e.detail,
      order_price: price
    })
    
  },

  bindClick () {
    let that = this;
    if (that.data.order_value < 40) {
      wx.showToast({
        icon: 'none',
        title: '房屋面积不能小于40',
      })
      return;
    }
    console.log(that.data.type)
    //if (that.data.type === '') {
    //  wx.showToast({
    //    icon: 'none',
    //    title: '请选择房屋类型',
    //  })
    //  return;
    //}
    console.log(that.data.order_value)
    if (that.data.order_value === '' ) {
      wx.showToast({
        icon: 'none',
        title: '请输入房屋面积',
      })
      return;
    }  
    wx.navigateTo({url: '../author_list/author_list?price=' + that.data.order_price + '&name=' + that.data.order_name + '&val=' + that.data.order_value + '&type=' + that.data.order_type,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_type: options.type
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