var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    feeList: []
  },

  onPullDownRefresh: function () {
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

})