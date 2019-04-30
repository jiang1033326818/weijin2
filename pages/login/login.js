//login.js
//获取应用实例
var WXBizDataCrypt = require('../../utils/cryptojs/RdWXBizDataCrypt.js');
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const MAXTIMECOUNT = 60;
const app = getApp();
Page({
  data: {
    response0: {
      data: {
        data: {
          id: '',
          sessionid: '',
          mobile: '',
          expert: '',
          cid: '',
        }
      }
    },
    phone: '17777777777', // 手机号
    phoneCheckMsg: '', // 手机号输入错误提示
    pwd: 'Aa123456', // 密码
    pwdCheckMsg: '', // 密码输入错误提示
    userInfo: {}, // 用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    codeSendBtnDisabled: false, // 发送验证码按钮控制
    urlParams: null,
    timeCount: 0, // 倒计时计数
    name: "快速登录",
    aaaa: false,
    aunionId:'',
    pc:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 输入校验
  inputChange: function(val, inputType, reg) {
    let msg = '';
    let backVal = true;
    if (!reg.test(val)) {
      if (inputType === 'phone') {
        msg = '手机号码';
      } else if (inputType === 'pwd') {
        msg = '密码';
      }
      msg += (val ? '格式不正确' : '不能为空');
      backVal = false;
    }
    const obj = {};
    obj[('' + inputType)] = val;
    obj[(inputType + 'CheckMsg')] = msg;
    this.setData({ ...obj
    });
    return backVal;
  },
  // 手机号码输入结束
  phoneChangeOver: function(e) {
    this.inputChange(e.detail.value, 'phone', regs.PHONE);
  },
  // 短信验证码输入结束
  pwdChangeOver: function(e) {
    this.inputChange(e.detail.value, 'pwd', regs.NOTNONE);
  },
  // 点击发送验证码
  sendCode: function(e) {
    const {
      phone,
      phoneCheckMsg
    } = this.data;
    // 校验手机号
    if (phone && !phoneCheckMsg) {
      // 置灰按钮
      this.setData({
        codeSendBtnDisabled: true
      });
      request(urls.sendCodeUrl, {
        data: {

        },
        success: () => {
          // 设置定时器
          this.setData({
            timeCount: MAXTIMECOUNT
          });
          const timer = setInterval(() => {
            if (this.data.timeCount) { // 倒计时
              this.setData({
                timeCount: --this.data.timeCount
              });
            } else {
              this.setData({
                codeSendBtnDisabled: false
              });
              clearInterval(timer); // 清除定时器
            }
          }, 1000)
        },
        fail: () => {
          this.setData({
            codeSendBtnDisabled: false
          });
        }
      })
    } else {
      this.inputChange(phone, 'phone', regs.PHONE);
    }
  },


  onLoad: function(params) {
    let that = this;
    that.setData({
      urlParams: params
    });
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      that.setData({
        //userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          jscode: app.globalData.jscode
        })

      }
      console.log(app.globalData)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // const _ = this;
    // 登录
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          console.log(333, res)
          wx.request({
            url: urls.mainurl + urls.getUnionid + res.code,
            method: 'GET',
            data: {

            },
            success: function (response2) {

              console.log(4444, response2)
            
              var pc = new WXBizDataCrypt("wx0f95ffcd25a151de", JSON.parse(response2.data.data).session_key)
              
              that.setData({
               
                pc:pc
              })
            },
            fail: function (response) {
              console.log(response, '失败了');
            }

          })
        
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 有权限信息，说明已经登录
    // if (app.globalData.authorization) {
    //   if (params && params.noAuthority) {
    //     wx.navigateBack({
    //       delta: 1,
    //     });
    //   } else {
    //     wx.switchTab({
    //       url: '../home/home'
    //     });
    //   }
    // }

  },
  // 登录
  login: function() {
    let that =this
    wx.getUserInfo({
      success: function (res) {
        var data = that.data.pc.decryptData(res.encryptedData, res.iv)
        // data.unionId就是咱们要的东西了
        app.globalData.unionid = data.unionId
        console.log('解密后 unionid: ', app.globalData.unionid)
        console.log(666, res.userInfo.nickName)
        wx.request({
          url: urls.mainurl + urls.loginUrl,
          method: 'POST',
          header: {
            "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid"),
            "Content-type":"application/json; charset=utf-8"
          },
          data: JSON.stringify({
            area: "string",
            avatarUrl: res.userInfo.avatarUrl,
            business: "string",
            city: res.userInfo.city,
            company: "string",
            companyImage: "string",
            country: res.userInfo.country,
            employment: "string",
            gender: res.userInfo.gender.toString(),
            hashCode: "string",
            image: res.userInfo.avatarUrl,
            language: "string",
            nikeName: res.userInfo.nickName,
            name: "string",
            openid: "string",
            personImage: "string",
            province: "string",
            unionid: app.globalData.unionid,
          }),
          success: function (response) {
            that.setData({
              response0: response
            })
            console.log(response,777)
            wx.setStorageSync("uid", response.data.data.id)
            wx.setStorageSync("sessionid", response.data.data.sessionid)
            wx.setStorageSync("phone", response.data.data.mobile)
            wx.setStorageSync("expert", response.data.data.expert)
            wx.setStorageSync("cid", response.data.data.cid)
            //获取用户头像
             wx.setStorageSync("userimage", response.data.data.image)
            console.log(response, 74)
            wx.switchTab({
              url: '../home/home'
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  
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
  }
})