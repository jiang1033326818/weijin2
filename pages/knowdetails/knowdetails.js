// pages/knowdetails/knowdetails.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
// import request from '../../wxParse/wxParse.js';
// var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'jxcat',
    serverUrl: app.globalData.ajaxUrl,
    baseUrl: app.globalData.baseUrl,
    title: "文章详情",
    article_title: "",
    article_content: "",
    knoweldgelist:'',
    getknowtype: [],
    getknowid: [],
    id:''
    
  },
//通过wxParse设置样式
  onLoad: function () {
    var that = this;
   
    that.knoweldgeid();

  },

  //获取知识库的内容



  //知识库id
  knoweldgeid: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.knowid+wx.getStorageSync("knowid0"),
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        // "pageNum": 0,
        // "pageSize": 50,
      },
      success: function (res) {
        console.log(res,33)
        that.setData({
          knoweldgelist: res.data.data.content
        })
        WxParse.wxParse('article', 'html', res.data.data.content, that, "1rpx"); 
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  // onLoad: function (options) {


     

  //     })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getStorageSync("knowid0"))
    // this.knoweldgeid();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.knoweldgeid();
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
