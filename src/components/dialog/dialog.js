import Vue from 'vue'
import DialogTemp from './dialog.vue';

let globalConf = null; 
let instance;

const Alert = (content) => {
  const Constructor = Vue.extend(DialogTemp)
  let optsObj = {};
  let newObj = JSON.parse(JSON.stringify(globalConf))

  if (typeof content === 'string') {
    optsObj.content = content;
  }else {
    optsObj = content;
  }
  for (let key in optsObj) {
    newObj[key] = optsObj[key]
  }
  instance = new Constructor({
    el: document.createElement('div'),
    propsData:  {...newObj}
  })
  document.body.appendChild(instance.$el);
}

export default {
  Version: 1.0,
  install: (Vue, config = {}) => {
    globalConf = config;
    Vue.prototype.$alert = Alert;
  }
}