import deepcopy from '@/utils/deepCopy';
import { timeFormat, formatDateTime } from '@/utils/timeFormat'
import config from '@/config';
import dsBridge from "@/utils/dsbridge";
import urlParse from '@/plugins/urlParse'
import {
    httpGet,
    httpPost,
    httpUpload
} from '@/service';

function install(Vue, options) {
    Vue.directive('keyBoard', { //解决键盘挡住输入框指令
            inserted: function(el) {
                const oHeight = document.body.clientHeight;
                window.addEventListener('resize', function(params) {
                    if (oHeight > document.body.clientHeight) { //键盘弹出
                        el.scrollIntoView(false);
                    }
                }, false);
            }
        })
        //全局filter
    Vue.filter('filterPrice', function(value) { //价格过滤器 格式 20.00
        if (!value) return 'HK$0.00'
        return `HK$${(value/100).toFixed(2)}`
    });
    Vue.filter('filterTime', function(value) { //时间过滤器
        return timeFormat(value, 'YYYY-MM-DD hh-mm')
    });
    Vue.filter('formatDateTime', function(value) { //时间过滤器
        if (!value) return null
        return formatDateTime(value)
    });
    Vue.prototype.$session = { //sessionStorage封装
        get(key) {
            return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : '';
        },
        set(key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        },
        remove(key) {
            sessionStorage.removeItem(key);
        },
        clear() {
            sessionStorage.clear();
        }
    }
    Vue.prototype.$get = httpGet; //get请求
    Vue.prototype.$post = httpPost; //post请求
    Vue.prototype.$upload = httpUpload; //文件上传
    Vue.prototype.$regex = {
        //中国大陆加港澳台手机正则验证
        phone: /^[1][3-8]\d{9}$|^([5|6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/,
        //邮箱正则
        email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    }; //post请求
    Vue.prototype.$deepcopy = deepcopy; //深拷贝
    //以下是对链接参数和config/index.js里边的client参数处理

    const urlData = urlParse();
    const clientData = process.env.NODE_ENV === 'production' ?
        urlData :
        Object.assign({}, config.CLIENT, urlData);

    for (const key in clientData) { //这里做一个统一转小写的处理，防止客户端大小写没有传对。
        const val = clientData[key];
        clientData[key] = typeof val === 'string' ?
            val.toLowerCase() :
            val;
    }
    window.sessionStorage.setItem('client', JSON.stringify(clientData)) //存储起来，在main.js  router.beforeEach 会判断
    Vue.prototype.$client = clientData;

    //jsBridge 简写 jb 命名有点污，但是好记啊哈哈哈哈哈哈哈哈哈
    Vue.prototype.$jb = {
            webview2js(callback) {
                dsBridge.register('webview2js', callback)
            },
            js2webview(arg, callback = () => {}) {
                dsBridge.call('js2webview', arg, callback)
            },
        }
        /**
         * 调用示例
          this.$jb.webview2js((params) => {     
              params.type == 1 && this.$router.go(-1)
            })
          this.$jb.js2webview({
            type: 1,
            isShare: 2
          }, function (params) {
            this.$vux.toast.text(JSON.stringify(params))
          })
         */

}
export default install;