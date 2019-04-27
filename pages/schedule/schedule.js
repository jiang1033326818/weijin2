// pages/expert/expert.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeList:''
  },


  //跳转到聊天
  toclues:function(e){
    console.log(e)
    wx.setStorageSync("tootherId", e.currentTarget.id)
    wx.setStorageSync("userimg2", e.currentTarget.dataset.img)

    wx.navigateTo({
      url: '../clues/clues'
    });
    console.log(e)
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取联系人
    wx.request({
      url: urls.mainurl + urls.localExpert,
      method: 'GET',
      data: {
        cid: wx.getStorageSync("cid")
      },

      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      success: function (response) {
        console.log(1111, response.data.data)
        that.setData({
          typeList: response.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
//获取关于我们顾问列表

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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