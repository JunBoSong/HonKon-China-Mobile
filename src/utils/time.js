//时间过滤器 格式 2017-04-18
export default function(value) {
    let date = new Date();
    if (value) {
        date = new Date(value);
    }
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
    var h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
    return Y + '-' + M + '-' + D

}
//+' '+h+':'+m+':'+s
//return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
//return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");