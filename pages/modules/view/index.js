var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    feeList: []
  },

  onLoad: function () {
    this.setData({
      feeList: (wx.getStorageSync('feeList') || []).map(function (feeItem) {
        //feeItem.feeDate = ;
        console.log(substring(feeItem.feeDate, 2));
        return feeItem;
      })
    })
  },

  onPullDownRefresh: function() {
    console.log("下拉刷新....");
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.onLoad();
    console.log(this.data.feeList.length);
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
})
