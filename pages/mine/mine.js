// pages/mine/mine.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval1: 3000, //间隔时间
    interval: 3000, //间隔时间
    userInfo: {}, // 用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phone: '',
    phonecode: "",
    display: "none",
    time: '获取验证码', //倒计时 
    currentTime: 61,
  },
  //联系客服
  left1: function(e) {
    wx.setStorageSync("tootherId", "14")
    wx.navigateTo({
      url: '../clues/clues'
    });
  },
  aboutus: function() {
    wx.navigateTo({
      url: '../adviser/adviser'
    })
  },
  //获取验证码
  //获取验证码
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.currentTime;
    wx.request({
      url: urls.mainurl + urls.getcode + that.data.phone,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {},
      success: function(response) {
        console.log(response)
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000
        })
      }
    })

    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },

  getVerificationCode() {
    if (this.data.phone == '' || this.data.phone.length < 11) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.getCode();
      var that = this
      that.setData({
        disabled: true
      })
    }
  },

  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  phonecode: function(e) {
    this.setData({
      phonecode: e.detail.value
    })
  },

  semb: function() {
    let that = this;
    if (that.data.phone === '' || that.data.phone.length < 11) {

    } else {
      if (that.data.phonecode === '') {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.request({
          url: urls.mainurl + urls.bindphone + that.data.phonecode + "/" + that.data.phone,
          method: 'GET',
          header: {
            "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
          },
          data: {

          },
          success: function(response) {
            console.log(response)
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 2000
            })
            wx.setStorageSync("phone", that.data.phone)
            that.setData({
              display: "none"
            })
          },
          fail: function(err) {
            console.log(err)
            wx.showToast({
              title: '验证码错误',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }

  },
  //关闭弹窗
  closeshow: function() {
    this.setData({
      display: "none"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data, "999")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '获取用户信息失败',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  loginout: function() {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  aboutus: function() {
    wx.navigateTo({
      url: '../adviser/adviser'
    });
  },
  toadviser: function() {
    let a = wx.getStorageSync("phone")
    if (a && a.length == 11) {
      this.setData({
        display: "none"
      })
      let b = wx.getStorageSync("expert")
      if (b === "-1" || b === "null") {
        wx.navigateTo({
          url: '../adviser/adviser'
        });
      } else {
        wx.navigateTo({
          url: '../schedule/schedule'
        });
      }

    } else {
      this.setData({
        display: "block"
      })
    }


  },
  toconsu: function() {
    console.log(444)
    wx.navigateTo({
      url: '../mymanage/mymanage'
    });
  },
  tocooperation: function() {
    wx.navigateTo({
      url: '../cooperation/cooperation'
    });
  },

})