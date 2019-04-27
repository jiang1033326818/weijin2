const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 计算剩余天数
const computeLeaveDays = function(strTime) {
  const nowTime = new Date().getTime();
  const lestTime = new Date(strTime).getTime();
  let leaveDays = Math.ceil((lestTime - nowTime) / (3600 * 24 * 1000));
  if (leaveDays < 0) {
    leaveDays = 0;
  }
  return leaveDays;
}

module.exports = {
  computeLeaveDays,
  formatTime: formatTime
}


