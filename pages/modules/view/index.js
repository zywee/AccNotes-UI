var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    feeList: []
  },

  removeLastItem: function (feeList) {
    //for(var i = 0; i < dataList.length; i++) {
    feeList.pop(feeList[feeList.length - 1]);
    wx.setStorageSync('feeList', feeList);
    //console.log(dataList[dataList.length-1].memo);
    //}
  },

  onLoad: function () {
    this.setData({
      feeList: (wx.getStorageSync('feeList') || []).map(function (feeItem) {
        //feeItem.feeDate = ;
        //console.log(util.getHM(feeItem.feeTime));
        return feeItem;
      })
    })
  },

  onPullDownRefresh: function() {
    console.log("下拉刷新....");
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.onLoad();

    var feeList = this.data.feeList;
    this.removeLastItem(feeList);

    console.log(feeList.length);
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

})
