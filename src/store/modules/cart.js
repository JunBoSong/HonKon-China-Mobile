import {
  CART_ADD,
  CART_DEL,
  CART_UPDATE
} from '../mutation-types'
const SESSION_CART_STATE = localStorage.getItem('cart') 
const SESSION_CART_STATE_OBJ =  SESSION_CART_STATE && JSON.parse(SESSION_CART_STATE) || {}
const state = {
  products: SESSION_CART_STATE_OBJ.products || []
}

// getters
const getters = {
  counter: state => state.products.reduce((pre, cur) => pre += cur.num, 0), //购物车数量
}

// mutations
const mutations = {
  /**
   * 添加商品  入参 {productId, skuId, coverImage, name, skus, sellPrice, num, stock, onShelfStatus}
   * 
   *    完整逻辑：（此項目只有一个商家）
   *      商家id相等: 商品id相等 && skuId相等 ==> 在当前項商品項数量相加
   *                 商品id不等 || skuId不等 ==>  在当前商家添加一項商品
   * 
   *      商家id不等:新增一个商家记录
   * 
   */
  [CART_ADD](state, product) {
    let newPro = JSON.parse(JSON.stringify(state.products));
    const repeatIndex = newPro.findIndex(item => item.skuId === product.skuId) //看看是不是已經添加過的商品
    if (repeatIndex > -1) {
      newPro[repeatIndex].num += product.num;
    } else {
      newPro.push(product)
    }
    state.products = newPro;
  },
  /**
   * 删除商品 入参 [{productId, skuId}]
   */
  [CART_DEL](state, ids) {
    let newPro = JSON.parse(JSON.stringify(state.products));
    for (const item of ids) {
      newPro = newPro.filter(stateItem => stateItem.skuId !== item.skuId)
    }
    state.products = newPro;
  },
  /**
   * 更新商品数量 入参 [{skuId }]
   */
  [CART_UPDATE](state, products) { //入参是商品列表 
    let newPro = JSON.parse(JSON.stringify(state.products));
    for (const item of products) {
      newPro = newPro.map(stateItem => {
        if (stateItem.skuId === item.skuId) {
          stateItem = item;
        }
        return stateItem;
      })
    }
    state.products = newPro;
  },
}

// actions
const actions = {

}



export default {
  state,
  getters,
  actions,
  mutations
}
