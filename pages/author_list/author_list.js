// pages/author_list/author_list.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    date:"", // 页面展示时间
    columns: ['微信支付'],
    user_name:"",// 用户姓名
    user_mobile: "",// 用户手机号码
    user_city:"",// 用户地址
    user_num:"", // 用户楼号
    make_date: "",// 预约时间
    make_time:"",// 预约时间
    play_way:"0",// 支付方式 默认为0
    order_per:"1200",// 房间平米数
    order_name:"",// 产品类型
    order_sum_price: '',// 商品原价格
    order_price:'',// 商品原价格
    order_endPrice:"", //商品最终价格
    comm_type: "日常保洁",// 产品类型
    coupon_data: "", // 优惠券列表
    coupon_id:"", // 优惠券ID
    coupon_price:0,// 优惠券价格
    coupon_types:"",// 优惠券类型
    coupon_judge:"1", //判断用户是否使用优惠券
  },

  bindPickerChange(e) {
    console.log(e)
    this.setData({
      play_way: e.detail.value
    })
    
  },
  onChangeName (e) {
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
    wx.navigateTo({
      url: '../map/map',
    })
  },
  onChangeNum(e) {
    this.setData({
      user_num: e.detail
    })
  },

  bindCityClick () {
    wx.navigateTo({
      url: '../map/map',
    })
  },

  onChangeMake () {
    wx.navigateTo({
      url: '../make_time/make_time',
    })
  },
  // 默认使用
  coupon(user_id, type, cases) {
    let that = this;
    let url = Url.test + "/coupon/type";
    let openid = user_id;
    let data = JSON.stringify({
      user_id: user_id,
      coupon_types: type,
      coupon_cases: cases
    })
    Http.postRequest(url, data).
      then(res => {   
        let row = res.data.data;
        if ( row.length > 0 ) {
          that.setData({
              coupon_data: row, // 优惠券列表
              coupon_id: row[0].coupon_id, // 优惠券ID
              coupon_price: row[0].coupon_price,// 优惠券价格
              coupon_types: row[0].coupon_types,// 优惠券类型
              order_endPrice: (that.data.order_price - row[0].coupon_price)*100 // 订单价钱
          })
        } else {
          that.setData({
            coupon_id: '', // 优惠券ID
            coupon_price: '',// 优惠券价格
            coupon_types: '',// 优惠券类型
            order_endPrice: (that.data.order_price - 0) * 100 // 订单价钱
          })
        }
        
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },
  // 根据id使用
  getIdCoupon (id) {
    let that = this;
    let url = Url.test + "/coupon/id";
    let data = JSON.stringify({
      coupon_id: id,
    })
    Http.postRequest(url, data).
      then(res => {
        let row = res.data.data;
        if (row.length > 0) {
          console.log("使用优惠券")
          that.setData({
            coupon_id: row[0].coupon_id, // 优惠券ID
            coupon_price: row[0].coupon_price,// 优惠券价格
            coupon_types: row[0].coupon_types,// 优惠券类型
            order_endPrice: (that.data.order_price - row[0].coupon_price) * 100, // 订单价钱
            coupon_judge: '1',
          })
        } else {
          console.log("不使用优惠券")
          console.log(that.data.order_price)
          that.setData({
            coupon_id: '', // 优惠券ID
            coupon_price: '',// 优惠券价格
            coupon_types: '',// 优惠券类型
            coupon_judge:'2',// 判断是否使用优惠券
            order_endPrice: (that.data.order_price - 0) * 100 // 订单价钱
          })
        }
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },

  onSubmit () {
    let user_name = this.data.user_name,// 用户姓名
        user_mobile = this.data.user_mobile,// 用户手机号码
        user_city = this.data.user_city,// 用户地址
        user_num = this.data.user_num, // 用户楼号
        make_date = this.data.make_date,// 预约时间
        make_time = this.data.make_time,// 预约时间
        play_way = this.data.play_way,// 支付方式 默认为0
        order_per = this.data.order_per,// 房间平米数
        order_price = this.data.order_endPrice,// 商品原价格
        comm_type = this.data.comm_type;// 产品类型
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
    let url = Url.test+"/order/add";
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
      order_per: this.data.order_per,// 房间平米数
      order_price: this.data.order_endPrice,// 商品原价格
      comm_type: this.data.comm_type,// 产品类型
      coupon_id: this.data.coupon_id// 优惠券ID
    }
    console.log(data)
    Http.postRequest(url, data).
      then(res => {
        console.log(res);
        if ( res.data.type === '1' ){
          wx.navigateTo({
            url: '../pay_suc/pay_suc?oid=' + res.data.orderId + '&name=' + res.data.name + '&price=' + res.data.price,
          })
        }else {
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

  bindClickCoupon () {
    wx.navigateTo({
      url: '../coupon_use/coupon_use',
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
          openid:res.data
        })
        that.coupon(res.data, options.type, 1);
      },
    })
    if (options.type === '1') {
      comm_type = '日常保洁';
      price = options.price; // 价格
    } else if (options.type === '2') {
      price = options.price;
      comm_type = '深度保洁';
    } else if (options.type === '2939') {
      price = options.price;
      comm_type = '油烟机+灶台';
    } else if (options.type === '2938') {
      price = options.price;
      comm_type = '油烟机';
    }
    that.setData({
      order_name: options.name,
      comm_type: comm_type,
      order_price: price,
      order_per: options.val
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
    let that = this;
    let coupon_id = wx.getStorageSync('coupon_id');
    let user_city = wx.getStorageSync('city');
    console.log(user_city)
    wx.getStorage({
      key: 'make',
      success: function(res) {
        let date = res.data.date + ' ' + res.data.time;
        that.setData({
          make_date: res.data.date,// 预约时间
          make_time: res.data.time,// 预约时间
          date: date
        })
      },
    })
    if (wx.getStorageSync('coupon_id')) {
      that.getIdCoupon(coupon_id);
    }
    that.setData({
      user_city: user_city // 小区地址
    })
    wx.removeStorageSync('coupon_id');
    wx.removeStorageSync('city');
    wx.removeStorage({
      key: 'make',
      success: function(res) {
        console.log("删除成功")
      },
    })
    
    
    //wx.removeStorageSync('no_coupon');
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