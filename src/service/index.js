import axios from 'axios';
import Vue from 'vue'
import API from './api'
import config from '../config'
export const httpGet = (url) => {
    const [urlKeys, params] = url.split('?');
    const [key1, key2] = urlKeys.split('/');

    axios({
        url: `${API[key1][key2]}?${params}}`,
        method: 'get'
    })
};

export const httpPost = (url, params, headers) => {
    const [key1, key2] = url.split('/');
    return axios({
        url: API[key1][key2],
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        data: {
            appId: config.APPID,
            ...params
        }
    })
};


export const httpUpload = (url, params) => {
    const [key1, key2] = url.split('/');
    return axios({
        url: API[key1][key2],
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: {
            appId: config.APPID,
            ...params
        }
    })
};


// axios 全局配置
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? location.origin : config.API_HOST;
// axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.timeout = 20000;

Array.prototype.$remove = function (val) { // 移除数组数据的方法
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
let ajaxRequest = [] // 解决页面多个请求loading闪烁问题
let flang = true
axios.interceptors.request.use((config) => {
    if (config.url.search('/umall/business/consumer/maparea/searchStreet') != -1 || config.url.search('/umall/business/consumer/maparea/searchEstate') != -1) return config
    if (config.url.search('/moses/order/adapter/pay') == -1) { // 如果不是支付就loading
        ajaxRequest.push(config.url)
        Vue.$vux.loading.show({
            text: 'Loading'
        })
    } else if (flang == true) {
        flang = false
        Vue.$vux.loading.show({
            text: 'Loading'
        })
    }
    return config
})
axios.interceptors.response.use((response) => {
    ajaxRequest.$remove(response.config.url)
    console.log('response.config.url', response.config.url)
    if (response.config.url.search('/moses/order/adapter/pay') == -1) {
        if (ajaxRequest.length == 0) {
            Vue.$vux.loading.hide()
        }
    }
    if (!response || response.status !== 200) {
        Vue.$vux.loading.hide()
        ajaxRequest = []
        return Vue.$vux.alert.show('网络错误');
    }

    let returnCode = response.data.returnCode * 1;
    switch (returnCode) {
        case 1000:
        case 1002: // 请求成功，但列表数据为空
        case 2009:
            return response.data;
        case 1004:
            Vue.$vux.alert.show('服务器繁忙，请喝杯茶休息一会儿');
            break;
        case 2000:
            Vue.$vux.alert.show('号码归属地信息不存在，请检查后重输');
            break;
        default:

            Vue.$vux.alert.show(response.data.message);
            return response.data;
    }

}, (error) => {
    ajaxRequest = [] // 解决接口错误 response无响应loading关闭不了
    Vue.$vux.loading.hide()
    const isTimeout = error.toString().indexOf('timeout') > -1;
    if (isTimeout) {
        Vue.$vux.alert.show('请求超时');
    }
    return 'timeout'
});
