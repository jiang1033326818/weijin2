// pages/cooperation/cooperation.js
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    workname:'',
    workphone:'',
    workaddress:'',
    workremarks:'',
    getwork:'',
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
//咨询按钮找到聊天界面
  bindtap1:function(e){
    wx.setStorageSync("tootherId","14")
    wx.navigateTo({
      url: '../clues/clues'
    });
  },
 
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 300
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //xingming 
  workbtn1:function(e){
   
this.setData({
   workname: e.detail.value
})
  },
  workbtn2: function (e) {
  
    this.setData({
      workphone: e.detail.value
    })
  },
  workbtn4: function (e) {
this.setData({
  workremarks:e.detail.value
})
  },
//点击合伙人申请按钮
  workbtn: function (e) {
    // console.log(e)
    if (this.data.workname ==='' && this.data.workphone === '' && this.data.workaddress === '' && this.data.workremarks === ''){
    
       wx.showToast({
         title: '请将内容填写完整', //标题
         icon: 'none', 
         duration: 1000, 
         mask:true, 
       })
     }else{
      if (!(/^1[34578]\d{9}$/.test(this.data.workphone))) {

        wx.showToast({

          title: '手机号码有误',

          duration: 1000,

          icon: 'none'
        })
      } else {
        wx: wx.navigateTo({
          url: '../success/success',

        })

      }
       
     }
   
     
    let that = this;
    wx.request({
      url: urls.mainurl + urls.worktogether, 
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      }, 
      data: {
        "pageNum": 0,
        "pageSize": 50,
        "remark": that.data.workremarks,
        "name":that.data.workname,
        "mobile": that.data.workphone,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "area": that.data.region[2],
        // "creationTime": null

      },
      success: function (e) {
        // console.log(e, "添加成功")
        that.setData({
          getwork: e.data.data
        })
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.workbtn1(e);
// this.workbtn();
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
