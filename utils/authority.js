const app = getApp();
const authorityCheck = function () {
  if (!app.globalData.userInfo) {
    wx.navigateTo({
      url: '../login/login?noAuthority=1',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
}

export default authorityCheck;