var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    feeItem: {
      amount: '',
      feeType: '',
      address: '点击选择地点',
      memo: '',
      feeTime: '',
      feeDate: '',
      feeDay: ''
    },
    feeTypeOptions: ['食', '行', '衣', '住'],
    feeTypeIndex: 0,
    openId: '',
    userInfo: {},
    creating: false,
    modalText: '',
    modalHidden: true
  },

  // 设置支出金额
  bindFeeInput: function (e) {
    this.setData({
      'feeItem.amount': e.detail.value
    });
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      feeTypeIndex: e.detail.value,
      'feeItem.feeType': this.data.feeTypeOptions[e.detail.value]
    });
  },

  // 设置任务地点
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'feeItem.address': res.address,
          'feeItem.latitude': res.latitude,
          'feeItem.longitude': res.longitude
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },

  // 设置费用说明
  bindMemoInput: function (e) {
    this.setData({
      'feeItem.memo': e.detail.value
    });
  },

  onShow: function () {
  // 恢复新建按钮状态
    this.setData({
      'creating': false
    });
  },

  onHide: function () {
  },

  // 初始化设置
  onLoad: function () {
    var that = this;
    var now = new Date();
    var openId = wx.getStorageSync('openId');

    // 初始日期时间
    that.setData({
      openId: openId,
      'feeItem.feeTime': util.getHM(now),
      'feeItem.feeDate': util.getYMD(now),
      'feeItem.feeDay': util.getD(now),
      'feeItem.feeType': this.data.feeTypeOptions[this.data.feeTypeIndex]
    });

    // 初始化昵称
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  },

  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      'feeItem.uuid': '',
      'feeItem.amount': '',
      'feeItem.feeType': this.data.feeTypeOptions[this.data.feeTypeIndex],
      'feeItem.address': '点击选择地点',
      'feeItem.latitude': '',
      'feeItem.longitude': '',
      'feeItem.memo': '',
      'feeItem.feeTime': '',
      'feeItem.feeDate': '',
      'feeItem.feeDay': '',
      feeTypeIndex: 0,
      openId: '',
      userInfo: {},
      creating: false,
      modalText: '',
      modalHidden: true
    });

    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  // 隐藏提示弹层
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },

  // 记录费用支出
  addFeeItem: function () {
    var feeItem = this.data.feeItem;
    if (feeItem.address == '点击选择地点') {
      feeItem.address = '';
    }
    var now = new Date();
    feeItem.feeTime = util.getHM(now);
    feeItem.feeDate = util.getYMD(now);
    feeItem.feeDay = util.getD(now);

    //调用API从本地缓存中获取数据
    var feeList = wx.getStorageSync('feeList') || [];
    feeList.unshift(feeItem);
    wx.setStorageSync('feeList', feeList);
  },

  // 提交
  bindSubmit: function (e) {
    var that = this;
    var feeItem = this.data.feeItem;
    var creating = this.data.creating;

    if (feeItem.amount == '' || feeItem.amount <= 0) {
      this.setData({
        modalText: '请完整填写费用信息',
        modalHidden: false
      });
    } else if (!util.isNumber(feeItem.amount)) {
        this.setData({
          modalText: '请填写正确的费用金额',
          modalHidden: false
        });
    } else {
      if (!creating) {
          // this.setData({
          //   'creating': true
          // });
          that.addFeeItem();

          this.setData({
            modalText: '已登记',
            modalHidden: false
          });
        }
    }
  },

})
