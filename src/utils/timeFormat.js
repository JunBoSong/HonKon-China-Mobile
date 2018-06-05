const timeFormat = function(time, fmt) { //YYYY-MM-DD
    let date = new Date(time*1);
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
    }
    let o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let key in o) {
        if (new RegExp(`(${key})`).test(fmt)) {
            let str = o[key] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

//时间戳转换成时间格式yyyy-MM-dd
const formatDateTime = function(timeStamop) {
    var date = new Date(parseInt(timeStamop));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d + ' ';
};

export {
    timeFormat,
    formatDateTime
}