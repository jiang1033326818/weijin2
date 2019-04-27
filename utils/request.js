// 请求方法封装
function reGetAuth(callback) {
  wx.login({
    success: res => {
      // 登录成功向后台发送临时登录凭证code,并记录登录凭证
      if (res.errMsg === 'login:ok') {
        request(urls.sendLoginCode, {
          data: {
            jscode: res.code
          },
          success: function (res) {
            if (res.code === 0) { // 取数成功过
              callback();
            }
          }
        });
      }
    }
  })
}
let isGoing = false;
// const domain = 'https://www.powerchainshop.com';
var domain = 'https://zadai.net';
export default function request(url, options) {
  const app = getApp();
  const header = {};
  const { authorization } = app.globalData;
  if (authorization) {
    header.Authorization = authorization;
  }
  if (!isGoing) {
    isGoing = true;
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  }
  url = domain + url;
  return wx.request({
    url,
    header,
    ...options,
    // 统一成功处理
    success: (response) => {
      if (response.header.Authorization) {
        app.globalData.authorization = response.header.Authorization;
      }
      const res = response.data;
      wx.hideLoading();
      if (response.statusCode === 200) {
        options.success && options.success(res);
      } else {
        if (response.statusCode === 401) {
          // 如果登录的是测试账号，则重新登录
          console.log(app.globalData.phone);
          if(app.globalData.phone === '18888888888') {
            wx.navigateTo({
              url: '../login/login',
              success: function() {
                console.log('success');
              },
              fail: function () {
                console.log('failed');
              }
            });
            return;
          }
          reGetAuth(() => {
            request(url, options);
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: res.error,
          });
          options.fail && options.fail(res);
        }
      }
      isGoing = false;
    },
    // 定义统一的错误处理
    fail: (response) => {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: response.errMsg,
      });
      options.fail && options.fail(res);
      isGoing = false;
    }
  });
}