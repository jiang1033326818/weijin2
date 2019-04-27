import urls from '../../common/urls.js';
const tabs = [{
  name: "图文咨询"
  },
  {
   
     name: "电话咨询"
  },
];

Page({
  data: {
    height:2000,
    height1:2000,
    onOff: true,
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: "0", //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    getimgphone: [],
    gitimgchat: [],
    getjudge: [],
    nowid:'',
    bincontent:'',
    adviceid:'',
    advicestatus:'很满意',
    items: [
      { name: '很满意', value: '很满意', checked: 'true'},
      { name: '满意', value: '满意', },
      { name: '不满意', value: '不满意' },
    ],
    ta:'',
  },

  //图文电话咨询接口
  imgphone: function (e) {
    //  var zxid = e.currentTarget.dataset.asktype
    let that = this;
    wx.request({
     
      url: urls.mainurl + urls.advisorylist,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        "pageNum": 0,
        "pageSize": 50,
        type:e==="0"?"1":"0"
        
      },
      success: function(e) {
        console.log(e, "成功没成功")
        let a = []
        let b = []
        for (let i in e.data.data.dataList) {
          if (e.data.data.dataList[i].type === 1) {
            a.push(e.data.data.dataList[i])
          } else {
            b.push(e.data.data.dataList[i])
          }
        }
        that.setData({
          getimgphone: b,
          gitimgchat: a,
           height: e.data.data.dataList.length*300+100,
        })


        console.log(that.data)
      },
      fail: function(err) {
        console.log(err)

      }
    })
  },

  toclues: function(e) {
    wx.setStorageSync("tootherId", e.currentTarget.dataset.pnum)
    wx.setStorageSync("name", e.currentTarget.name)
    wx.setStorageSync("userimg2",e.currentTarget.dataset.img)
    getApp().phoneit(e.currentTarget.dataset.pnum)

    wx.navigateTo({
      url: '../clues/clues'
    });
  },
  // 导航点击滑动
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })

  },
  bindChange: function(e) {
    console.log(this.data.scrollTop)
    var current = e.detail.current;
    if (e.currentTarget.dataset.index === 1) {
      this.setData({
        height: this.data.typeList.length * 300 + 100
      })
    } else {
      this.setData({
        height1: this.data.typeList2.length * 300 + 100
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      scrollTop: 0,
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
  },
  // 导航点击事件
  navTabClick: function(e) {
    console.log(e.currentTarget.id)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.imgphone(e.currentTarget.id)
  },
//满意程度选择
  radioChange(e) {
    console.log(e, e.detail.value)
     this.setData({
      advicestatus: e.detail.value 
    })
  
  },
  
  //获取评论内容
  bind1: function(e) {
    console.log(e, 14)
    this.setData({
      bincontent:e.detail.value
    })
    
  },
  bind2: function (e) {
    console.log(e, 14)
    this.setData({
      bincontent: e.detail.value
    })

  },

  //评论+//评价接口
  btnclick: function(e) {
    console.log(e,6868)
    this.setData({
      onOff: false,
      nowid:e.currentTarget.dataset.getcontent,
    })
  },


  //确认
  modalConfirm: function() {
    let that=this;
    console.log("queren")
    console.log(that .data,"哈哈哈")
    that.setData({
      onOff: true,
    })
    console.log(that.data)
    wx.request({
      url: urls.mainurl + urls.judgecontent,
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        content: that.data.bincontent,
        bid: that.data.nowid,
        chatType:that.data.activeIndex==="0"?"在线咨询":"电话咨询",
        status: that.data.advicestatus,
        commentType:1

      },
      success: function(e) {
        console.log(e, 343)
        that.setData({
          getjudge: e.data
        })
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
        })
      },
      fail: function(err) {
        console.log(err)

      }
    })
  },
  modalCancel: function() {
    this.setData({
      onOff: true,
    })

  },
  modalConfirm: function() {
    let that=this;
    console.log("queren")
    console.log(that .data,"哈哈哈")
    that.setData({
      onOff: true,
    })
 
    console.log(that.data)
    wx.request({
      url: urls.mainurl + urls.judgecontent,
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        content: that.data.bincontent,
        bid: that.data.nowid,
        chatType:that.data.activeIndex==="0"?"在线咨询":"电话咨询",
        status: that.data.advicestatus,
        commentType:1

      },
      success: function(e) {
        console.log(e, 343)
        that.setData({
          getjudge: e.data
        })
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
        })
      },
      fail: function(err) {
        console.log(err)

      }
    })
  },
  modalCancel: function() {
    this.setData({
      onOff: true,
    })

  },

  //电话确认2
  modalConfirm2: function () {
    let that = this;
    console.log("queren")
    console.log(that.data, "哈哈哈")
    that.setData({
      onOff: true,
    })
    console.log(that.data)
    wx.request({
      url: urls.mainurl + urls.judgecontent,
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        content: that.data.bincontent,
        bid: that.data.nowid,
        chatType: that.data.activeIndex === "0" ? "在线咨询" : "电话咨询",
        status: that.data.advicestatus,
        commentType: 1

      },
      success: function (e) {
        console.log(e, 343)
        that.setData({
          getjudge: e.data
        })
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
        })
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },
  modalCancel2: function () {
    this.setData({
      onOff: true,
    })

  },
  modalConfirm2: function () {
    let that = this;
    console.log("queren")
    console.log(that.data, "哈哈哈")
    that.setData({
      onOff: true,
    })

    console.log(that.data)
    wx.request({
      url: urls.mainurl + urls.judgecontent,
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        content: that.data.bincontent,
        bid: that.data.nowid,
        chatType: that.data.activeIndex === "0" ? "在线咨询" : "电话咨询",
        status: that.data.advicestatus,
        commentType: 1

      },
      success: function (e) {
        console.log(e, 343)
        that.setData({
          getjudge: e.data
        })
        wx.showToast({
          title: '评论成功', //标题
          icon: 'success', //图标，支持"success"、"loading"
          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
        })
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },
  modalCancel2: function () {
    this.setData({
      onOff: true,
    })

  },


//textarea提示自取消
  textaaa:function(e){
console.log(e,"啊手机的速度加快")
  },
  // 加载初始数据
  onLoad: function(e) {
    // this.myadvice(0)
    this.imgphone(this.data.activeIndex);
  },
  onShow: function () {
    this.onLoad()
  },
 onReady: function () {
  
  },
});
