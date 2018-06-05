import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
//国际化
import VueI18n from 'vue-i18n'
import languageEn from '@/config/language-en.json'
import languageZh from '@/config/language-zh.json'
import './assets/less/reset.css'
import './assets/less/base.less'
import './assets/less/reset-vux.less'
//时间选择器，使用方式为DatetimePlugin 时，引入该样式文件解决时间选择器上拉显示的时候样式丢失的问题
import "vux/src/components/datetime/style.less"
import global from '@/plugins/global'
import config from '@/config'
import LoadingPlugin from '@/plugins/loading'
import { DatetimePlugin, AlertPlugin, ToastPlugin, ConfirmPlugin,  TransferDomDirective as TransferDom } from 'vux'
import { vpHeaderPage, vpLayoutPage, vpLayoutScroll, vpButton } from '@/components'


Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    listenEvents: ['scroll']
})
Vue.use(global)
Vue.use(VueI18n)
    //vux的全局指令
Vue.directive('TransferDom', { TransferDom });
//全局component
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueLazyload)
Vue.use(DatetimePlugin)

//常用组件就注册为全局了
Vue.prototype.$event = new Vue() // 空实例用 自定义事件
Vue.component('vpHeaderPage', vpHeaderPage) //头部组件
Vue.component('vpLayoutPage', vpLayoutPage) //页面布局
Vue.component('vpLayoutScroll', vpLayoutScroll) //页面布局
Vue.component('vpButton', vpButton) //按钮


const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages: {
        en: languageEn,
        zh: languageZh
    }, // set locale messages
})

const urlData = JSON.parse(window.sessionStorage.getItem('client'));

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '中移香港'
    dsBridge.call('js2webview', { type: 5, title: document.title }, function() {})
    dsBridge.call('js2webview', { type: 4, btns: [] }, function() {}) //重置掉按鈕
        !sessionStorage.getItem('beginPath') && sessionStorage.setItem('beginPath', JSON.stringify(to.path)); //保存第一頁面的路徑。 JSON.stringify是与項目中的this.$session.set保持一致
    //校验链接上的公共参数
    const clientData = config.CLIENT;
    for (const key in clientData) {
        if (!urlData[key]) {
            window.alert(`未知的${key}`)
            return false
        }
    }
    next()
})
new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App),
})


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}