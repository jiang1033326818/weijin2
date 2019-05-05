// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"入驻申请成功,客服正在审核中,请保持电话通畅,审核结果我们会第一时间推送给您,如有疑问请拨打010-86390610",
     title2: "申请成功,客服正在审核中,请保持电话通畅,审核结果我们会第一时间推送给您,如有疑问请拨打010-86390610"
  },


  tohome:function(){
    wx.switchTab({
      url: '../home/home'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(wx.getStorageSync("qaz")==='0'){
        this.setData({
          title:"申请成功,客服正在审核中,请保持电话通畅,审核结果我们会第一时间推送给您,如有疑问请拨打010-86390610"
        })
      }else{
        this.setData({
          title: "入驻申请成功,客服正在审核中,请保持电话通畅,审核结果我们会第一时间推送给您,如有疑问请拨打010-86390610"
        })
      }
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