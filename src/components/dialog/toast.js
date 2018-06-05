import Vue from 'vue'
import ToastComponent from './toast.vue'
let instance;
let showing = false;
let Toast = (content, options={})=>{
    /* 如果当前已经在显示的话, 不响应*/
    if (!showing) {
        showing = true;
        let ToastConstructor = Vue.extend(ToastComponent);
        instance = new ToastConstructor({
            el: document.createElement('div'),
            propsData: {...options}
        });
        document.body.appendChild(instance.$el);
        /* 显示 */
        instance.content = content;
        instance.show = true;
        setTimeout(()=>{
            showing = false;
            instance.show = false;  
        }, instance.duration);
    }
}
export default {
    install (Vue, config={}) {
        Vue.prototype.$toast = Toast;
    }
};