function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getYMD(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function getMD(date) {
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [month, day].map(formatNumber).join('-')
}

function getD(date) {
  var day = date.getDate()

  return [day].map(formatNumber)
}

function getHM(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

function getW(date) {
  var d = date.getDay();
  var arr = ['日', '一', '二', '三', '四', '五', '六'];

  return '星期' + arr[d];
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isNumber(val) {
  return (/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val))
}

module.exports = {
  formatTime: formatTime,
  getYMD: getYMD,
  getMD: getMD,
  getD: getD,
  getHM: getHM,
  getW: getW,
  formatNumber: formatNumber,
  isNumber: isNumber
}
