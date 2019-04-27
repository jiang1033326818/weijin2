// pages/expert/expert.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      label: '房产服务',
      value: 'house',
    }, {
      label: '车产服务',
      value: 'car'
    }, {
      label: '信用卡',
      value: 'credit'
    }, {
      label: '极速服务',
      value: 'speet'
    }, {
      label: '工资流水服务',
      value: 'bill0'
    },
      {
        label: '社保服务',
        value: 'shebao'
      }, {
        label: '营业执照服务',
        value: 'business'
      }, {
        label: '公积金服务',
        value: 'accumulation'
      },  {
        label: '自存流水服务',
        value: 'bill'
      }, {
        label: '按揭房服务',
        value: 'housloan'
      }, {
        label: '按揭车服务',
        value: 'turncar'
      },
      {
        label: '保单服务',
        value: 'policy'
      },
    ],

  },

  tolist:function(e){
    // console.log(e.currentTarget.dataset.list)
    wx.setStorageSync("databelong", e.currentTarget.dataset.list)
    wx.navigateTo({
      url: '../achievement/achievement'
    });
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