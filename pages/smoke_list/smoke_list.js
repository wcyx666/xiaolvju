// pages/deep_cleaning/deep_cleaning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"s",
    deep: [
      { name: "油烟机", price: '100', type: '2938', src: "../image/icon_youyanji.png" },
      { name: "油烟机+灶台", price: '120', type: '2939', src: "../image/icon_youyanji_s.png" }
    ],
    order_price: "", // 产品价格
    order_name: "",// 产品名称
  },


  bindClickType(e) {
    console.log(e)
    this.setData({
      type: e.currentTarget.dataset.index,
      order_name: e.currentTarget.dataset.item.name,
      order_type: e.currentTarget.dataset.item.type,
      order_price: e.currentTarget.dataset.item.price,
    })
  },

  bindClick() {
    let that = this;
    console.log(that.data.type)
    if (that.data.order_name === '') {
      wx.showToast({
        icon: 'none',
        title: '请选择油烟机类型',
      })
      return;
    }

    wx.navigateTo({
      url: '../author_list/author_list?price=' + that.data.order_price + '&name=' + that.data.order_name + '&type=' + that.data.order_type,
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