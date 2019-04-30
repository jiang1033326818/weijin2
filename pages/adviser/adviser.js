// pages/adviser/adviser.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    getarea:[],//获取地区名称
    address: "4353",
    customItem: '全部',
    display:"block",
    display2:"block",
    region:"1",
    array: ['房产服务',
      '车产服务',
      '信用卡',
      '极速服务',
      '工资流水服务',
      '社保服务',
      '营业执照服务',
      '公积金服务',
      '自存流水服务',
      '按揭房服务',
      '按揭车服务',
      '保单服务'
    ],
    index2:0,
    index: 0,
    date: '2019-01-01',
    checked: true,
    danwei: "",
    image0:'',
    image1:'',
    xingming:''
  },

  toxieyi:function(){
    wx.navigateTo({
      url: '../xieyi/xieyi'
    });
  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index2:parseInt(e.detail.value)
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  danwei: function(e) {
    this.setData({
      danwei: e.detail.value
    })
  },

  xingming: function (e) {
    this.setData({
      xingming: e.detail.value
    })
  },


  chooseImage: function() {
    var that = this;


    wx.chooseImage({
      // count: this.data.count[this.data.countIndex],
      success: function(res) {
        console.log(res, 'aaaaaaaaaaaaaaaaaaaa')
        //缓存下 
    
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000,
          success: function(ress) {
            console.log('成功加载动画');
            that.setData({
display:"none"
            })
          }
         
        
        })

        wx.uploadFile({
          url: urls.mainurl + urls.uploadimg, // 仅为示例，非真实的接口地址
          header: {
            "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
          },
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            //user: 'test'
          },
          success(response) {
            console.log(response,"bbbbbb")
            that.setData({
              image0: '/uploads/' + JSON.parse(response.data).data,
            })
          }
        })


        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 


      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src

    wx.previewImage({

      current: current,
      urls: this.data.imageList
    })
  },


  chooseImage2: function() {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')

    wx.chooseImage({
      // count: this.data.count[this.data.countIndex],
      success: function(res) {
        console.log(res,'ssssssssssssssssssssssssss')
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000,
          success: function(ress) {
            console.log('成功加载动画');
            that.setData({
              display2:"none"
            })
          }
        })

        wx.uploadFile({
          url: urls.mainurl + urls.uploadimg, // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            //user: 'test'
          },
          success(response) {
            console.log(response,"cccc")

            that.setData({
              image1: '/uploads/' + JSON.parse(response.data).data,
            })
          }
        })

        that.setData({
          imageList2: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
        wx.uploadFile({
          url: getApp().data.servsers + '/weixin/wx_upload.do',
          filePath: filep,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            var dizhi = sss.dizhi;
            //输出图片地址 
            console.log(dizhi);
            that.setData({
              "dizhi": dizhi
            })

            //do something  
          },
          fail: function(err) {
            console.log(err)
          }
        });
      }
    })
  },
  previewImage2: function(e) {
    var current2 = e.target.dataset.src

    wx.previewImage({

      current2: current2,
      urls: this.data.imageList2
    })
  },


  checked: function(e) {
    console.log(e)
    if (this.data.checked === true) {
      this.setData({
        checked: false
      })
    } else {
      this.setData({
        checked: true
      })
    }
  },

  
   
  
  subme: function(e) {
    let that = this;
    if (that.data.checked == false) {
      wx.showToast({
        title: '请同意《微金网入驻协议》',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log(that.data)
      if (that.data.danwei === '' || that.data.image0 === '' || that.data.image1 === '' || that.data.xingming === '') {
        wx.showToast({
          title: '请将内容填写完整', //标题
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      } else {
        wx.request({
          url: urls.mainurl + urls.useradd, 
          method: 'POST',
          header: {
            "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
          },
          data: {
            "city": that.data.getarea[that.data.index2].id,
            "type": that.data.array[that.data.index],
            "company": that.data.danwei,
            "workImage": that.data.image0,
            // "joinTime": that.data.date,
            "personImage": that.data.image1,
            "enable": false,
            expert: 0,
            "realName": that.data.xingming,
            "hobby": that.data.array[that.data.index]
          },
          success: function (response) {
            console.log(response,"laa")
            if(response.data.code===0){
              wx.setStorageSync("expert",1)
             
            
              wx.navigateTo({
                url: '../success/success'
              });

            }
            
      }
    })
      }}},
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前时间
    // let date = new Date();
    // let year = date.getFullYear;
    // let month = date.getMonth + 1;
    // let day = date.getDate;
    // let a = date + '-' + month + "-" + day;
    // console.log(year,"7878")

    wx.getUserInfo({
      success(res) {
        this.setData({
          getUserInfo: res
        })
      }
    })
   
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
      //获取地区接口
    let that = this;
    wx.request({
      url: urls.mainurl + urls.contryarea,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {

      },
      success: function (e) {

        that.setData({
          getarea: e.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
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

  }
})
