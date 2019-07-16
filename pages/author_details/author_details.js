// pages/author_details/author_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneFalut:true,
    type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.typeIp
    })
    if (options.typeIp === '1'){
      wx.setNavigationBarTitle({
        title: '日常保洁'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '深度保洁'
      })
    }  
  },

  bindToClick () {
    wx.navigateTo({
      url:"/pages/author_list/author_list?type="+this.data.type
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