// pages/make_time/make_time.js
import Http from '../../utils/http.js';
import Url from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar: [],
    width: 0,
    currenDate:"",
    currenTime: "",
    currentIndex:0,
    currentTimeIndex: '',
    timeArr: [
      { "make_time": "08:00", 'make_num': "0" },
      { "make_time": "08:30", 'make_num': "0" },
      { "make_time": "09:00", 'make_num': "0" },
      { "make_time": "09:30", 'make_num': "0" },
      { "make_time": "10:00", 'make_num': "0" },
      { "make_time": "10:30", 'make_num': "0" },
      { "make_time": "11:00", 'make_num': "0" },
      { "make_time": "13:00", 'make_num': "0" },
      { "make_time": "13:30", 'make_num': "0" },
      { "make_time": "14:00", 'make_num': "0" },
      { "make_time": "14:30", 'make_num': "0" },
      { "make_time": "15:00", 'make_num': "0" },
      { "make_time": "15:30", 'make_num': "0" },
      { "make_time": "16:00", 'make_num': "0" },
      { "make_time": "16:30", 'make_num': "0" },
      { "make_time": "17:00", 'make_num': "0" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    that.makeData(7); // 获取预约时期
    that.getMakeTime(that.data.currenDate);
  },
  makeData(day) {
    let now = new Date();
    let nowTime = now.getTime();
    let oneDayTime = 24 * 60 * 60 * 1000;
    let arr = [];
    for (let i = 1; i < day; i++) {
      let ShowTime = nowTime + i * oneDayTime;
      //初始化日期时间
      let myDate = new Date(ShowTime);
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let days = myDate.getDate();
      if (month <= 9) month = "0" + month;
      if (days <= 9) days = "0" + days; 
      let date = year + "-" + month + "-" + days;
      
      let str = "星期" + "日一二三四五六".charAt(myDate.getDay());
      console.log(date)
      let obj = {
        'week': str,
        'date': date
      }
      arr.push(obj);
    }
    this.setData({
      calendar: arr,
      currenDate: arr[0].date,
      width: 186 * parseInt(arr.length)
    })
  },
  getMakeTime(val) {
    console.log(val)
    let that = this;
    let url = Url.test + "/time/ready";
    let data = JSON.stringify({
      date: val,
    })
    let timeArr = [
      { "make_time": "08:00-10:00", 'make_num':"0" },
      { "make_time": "10:00-12:00", 'make_num': "0" },
      { "make_time": "13:00-15:00", 'make_num': "0" },
      { "make_time": "15:00-17:00", 'make_num': "0" }
    ]
    Http.postRequest(url, data).
      then(res => {
        console.log(res)
        console.log(111);
        let times = JSON.parse(res.data.data);
        if (times.length > 0) {
          for (let i = 0; i < times.length; i++) {
            for (let k = i; k < timeArr.length; k++) {
              if (times[i].make_time == timeArr[k].make_time) {
                timeArr[k] = times[i]
              }
            }
          }
          that.setData({
            timeArr: timeArr
          })
        }   
        console.log(timeArr)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
  },
  selectTime: function (e) {
    //为下半部分的点击事件
    console.log(e)

    this.setData({
      currentTimeIndex: e.currentTarget.dataset.index,
      currenTime: e.currentTarget.dataset.time,
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
  select: function (e) {
    let that = this;
    let url = Url.test + "/time/ready";
    let data = JSON.stringify({
      date: e.currentTarget.dataset.date,
    })
    let timeArr = [
      { "make_time": "08:00-10:00", 'make_num': "0" },
      { "make_time": "10:00-12:00", 'make_num': "0" },
      { "make_time": "13:00-15:00", 'make_num': "0" },
      { "make_time": "15:00-17:00", 'make_num': "0" }
    ]
    Http.postRequest(url, data).
      then(res => {
        console.log(res.data.data)
        console.log();
        let times = JSON.parse(res.data.data);
        for (let i = 0; i < times.length; i++){
          for (let k = i; k < timeArr.length; k++) {
            if (times[i].make_time == timeArr[k].make_time ) {
              timeArr[k] = times[i]
            }
          }
        }
        that.setData({
          timeArr: timeArr
        })
        console.log(timeArr)
      }).catch((erorr) => {
        console.log(erorr)
      })
      .finally(function (res) {
        console.log(res)
      })
    
    //为上半部分的点击事件
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      currenDate: e.currentTarget.dataset.date,
    })
  },
  bindClickTo () {
    if (this.data.currenTime == ''){
      wx.showToast({
        title: '请选择时间',
      })
      return;
    }
    let obj = {
      date: this.data.currenDate,
      time:this.data.currenTime
    }
    wx.setStorage({
      key: 'make',
      data: obj,
      success: function () {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})