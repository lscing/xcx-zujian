//app.js
App({
  data: {
    server: "https://mini1.wozaixiaoyuan.com",
    version:'0.2.3'
  },
  onLaunch: function () {
    wx.setStorageSync('onLaunch',true);
  },
  onShow: function (options){
    if (!wx.getStorageSync('onLaunch')){
      var session = wx.getStorageSync('session');
      if (session && session != '') {
        //检测登录
        this.checkLogin(session);
      }
    }
  },
  globalData: {
    userInfo: null
  },
  checkLogin(session) {
    var that = this;
    //发起网络请求
    wx.request({
      url: 'https://login.wozaixiaoyuan.com/checkSession.json',
      method: 'GET',
      data: {
        session: session
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.code != 0) {
            //登录超时，页面跳转登录
            wx.redirectTo({
              url: '/pages/core/index/index'
            })
          }
        } else {
          wx.showModal({
            title: '😞抱歉',
            content: '服务器出错(' + res.statusCode + ')',
            showCancel: false
          })
        }
      },
      fail: function () {
        //utils.alert("😞抱歉", '登录失败!');
      },
      complete: function () {
        //utils.hideLoading()
      }
    })
  }
})