// pages/author_list/author_list.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    date: "", // 页面展示时间
    columns: ['微信支付', '线下支付'],
    user_name: "",// 用户姓名
    user_mobile: "",// 用户手机号码
    user_city: "",// 用户地址
    user_num: "", // 用户楼号
    make_date: "",// 预约时间
    make_time: "",// 预约时间
    play_way: "0",// 支付方式 默认为0
    order_per: "1200",// 房间平米数
    order_name: "",// 产品类型
    order_price: 8000,// 商品原价格
    order_endPrice: "", //商品最终价格
    comm_type: "",// 产品类型
    coupon_id: "", // 优惠券ID
    coupon_price: 0,// 优惠券价格
    coupon_types: "",// 优惠券类型
  },

  bindPickerChange(e) {
    console.log(e)
    this.setData({
      play_way: e.detail.value
    })

  },
  onChangeName(e) {
    this.setData({
      user_name: e.detail
    })
  },
  onChangeMobile(e) {
    this.setData({
      user_mobile: e.detail
    })
  },
  onChangeCity(e) {
    this.setData({
      user_city: e.detail
    })
  },
  onChangeNum(e) {
    this.setData({
      user_num: e.detail
    })
  },

  bindCityClick() {
    wx.navigateTo({
      url: '../map/map',
    })
  },

  onChangeMake() {
    wx.navigateTo({
      url: '../make_time/make_time',
    })
  },

  coupon(user_id) {
    let that = this;
    let url = Url.test + "/coupon/ready";
    let openid = user_id;
    let data = {
      user_id: user_id
    }
    Http.postRequest(url, data).
      then(res => {
        if (res.data[0].types == 1) {
          that.setData({
            coupon_id: res.data[0].coupon_id,
            coupon_price: res.data[0].price,
            coupon_types: res.data[0].types,
          })
        }
        console.log(res)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },

  onSubmit() {
    let user_name = this.data.user_name,// 用户姓名
      user_mobile = this.data.user_mobile,// 用户手机号码
      user_city = this.data.user_city,// 用户地址
      user_num = this.data.user_num, // 用户楼号
      make_date = this.data.make_date,// 预约时间
      make_time = this.data.make_time,// 预约时间
      play_way = this.data.play_way,// 支付方式 默认为0
      order_price = this.data.order_price;// 商品原价格
    let regexStr = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!(user_name)) {
      wx.showToast({
        title: '姓名不能为空',
      })
      return;
    }
    if (user_mobile.length < 11) {
      wx.showToast({
        title: '手机号长度有误',
      })
      return;
    }
    if (!regexStr.test(user_mobile)) {
      wx.showToast({
        title: '手机号有误',
      })
      return;
    }
    if (!(user_city)) {
      wx.showToast({
        title: '小区地址不能为空',
      })
      return;
    }
    if (!(user_num)) {
      wx.showToast({
        title: '楼号门牌不能为空',
      })
      return;
    }
    if (!(make_date, make_time)) {
      wx.showToast({
        title: '预约时间不能为空',
      })
      return;
    }
    let url = Url.test + "/order/add";
    let data = {
      openid: this.data.openid, // 用户ID
      user_name: this.data.user_name,// 用户姓名
      user_mobile: this.data.user_mobile,// 用户手机号码
      user_city: this.data.user_city,// 用户地址
      user_num: this.data.user_num, // 用户楼号
      make_date: this.data.make_date,// 预约时间
      make_time: this.data.make_time,// 预约时间
      play_way: this.data.play_way,// 支付方式 默认为0
      order_name: this.data.order_name,// 商品名称
      comm_type: this.data.comm_type,// 商品原价格
      order_price: this.data.order_endPrice,// 商品原价格
      coupon_id: this.data.coupon_id// 优惠券ID
    }
    console.log(data)
    Http.postRequest(url, data).
      then(res => {
        console.log(res);
        if (res.data.type === '1') {
          wx.navigateTo({
            url: '../pay_suc/pay_suc?oid=' + res.data.orderId + '&name=' + res.data.name + '&price=' + res.data.price,
          })
        } else {
          wx.navigateTo({
            url: '../order_pay/order_pay?oid=' + res.data.orderId + '&name=' + res.data.name + '&price=' + res.data.price,
          })
        }
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
    let comm_type;
    let price;

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          openid: res.data
        })
        that.coupon(res.data);
      },
    })
    console.log(options.type)
    if (options.type === '2938') {
      comm_type = '油烟机';
      price = options.price; // 价格
    } else if (options.type === '2939') {
      comm_type = '油烟机+灶台';
      price = options.price; // 价格
    }
    that.setData({
      order_name: options.name,
      order_price: options.price,
      comm_type: comm_type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let end = (this.data.order_price - this.data.coupon_price) * 100;
    console.log(end)
    this.setData({
      order_endPrice: end
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'make',
      success: function (res) {
        let date = res.data.date + ' ' + res.data.time;
        that.setData({
          make_date: res.data.date,// 预约时间
          make_time: res.data.time,// 预约时间
          date: date
        })
      },
    })
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