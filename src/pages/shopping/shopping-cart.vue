<template>
  <div>
    <vp-layout-page v-if="!loaded || productList.length">
      <!-- <vp-header-page title='购物车' slot='header'>
        <p class="editor child-vertical-middle" slot="right-options" @click="isEditor = !isEditor">
          <span>{{ isEditor ? '完成' : '编辑'}}</span>
        </p>
      </vp-header-page> -->
      <swipeout class="list-wrapper">
        <swipeout-item transition-mode="follow" v-for="(item, index) in productList" :key="index">
          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="delate(index)">刪除</swipeout-button>
          </div>
          <vp-li-goods-cart slot="content" class="customer-cart-li"
            :productId="item.productId"
            :skuId="item.skuId"
            :priceLabel="item.priceLabel"
            :editor="true"
            :coverImage="item.coverImage"
            :name="item.name"
            :skus="item.skus"
            :price="item.sellPrice | filterPrice"
            :num="item.num*1"
            :maxNum="item.stock*1"
            :minNum="item.stock*1 > 1 ? 1 : 0"
            :selected="item.selected"
            :timeout="item.onShelfStatus != 2 || item.stock*1 < 1"
            @updateNum="num => updateNum(num, index)"
            @click.native="itemClickHandler(index)" />
        </swipeout-item>
      </swipeout>
      <div class="clear" v-show="isEditor && hasTimeoutProd" @click="clearTimeout">
        <i class="icon-clear"></i>
        <span>清空失效商品</span>
      </div>
      <div class="footer-btn" slot="footer">
        <div class="select-all" @click="selectAll">
          <i class="state" :class="{'selected': allSelected}"></i>
          <span>全選</span>
        </div>
        <div class="total">
          <span class="label" v-show="!isEditor">合計：</span>
          <span class="price" v-show="!isEditor">{{sumPrice | filterPrice}}</span>
        </div>
        <vp-button class="customer-btn" @click="doBuy" content="結算" />
      </div>
    </vp-layout-page>
    <div v-else class="cart-none">
      <img src="~@/assets/images/shopping_cart_none.png" class="cart-none-img" alt="">
    </div>
  </div>
</template>
<script type='text/javascript'>
  // { name: '三星 GalaxyA5 (SM-A5100) 魔幻金 魔魔幻金魔幻金全网魔幻金魔幻金全网幻金魔幻金全网', coverImage: 'http://placehold.it/144x144', sku: '颜色:星空灰;内存:64G:版本信息:全网通;', price1: 13939, price2: 2299, number: 1 },{ name: '三星 GalaxyA5 (SM-A5100) 魔幻金 魔魔幻金魔幻金全网魔幻金魔幻金全网幻金魔幻金全网', coverImage: 'http://placehold.it/144x144', sku: '颜色:星空灰;内存:64G:版本信息:全网通;', price1: 1399, price2: 2299, number: 1, timeout: true }
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  } from 'vux'
  import {
    vpLiGoodsCart,
    vpInputNumber
  } from '@/components'
  export default {
    components: {
      vpLiGoodsCart,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data() {
      return {
        isEditor: false, //是否为编辑模式
        productsOnline: [],
        loaded: false,
        submitProdList: [] //要提交的商品，其实就是selectedGoods，但是会添加【礼品】和【运费模板】
      }
    },
    computed: {
      ...mapState({
        'productsLocal': state => state.cart.products
      }),
      productList: {
        get() {
          return this.$client.webview == 3 ? this.productsLocal : this.productsOnline;
        },
        set(v) {
          if (this.$client.webview == 3) {
            this.CART_UPDATE(v) //本地购物车模式要调用mutations
          }else {
            this.productsOnline = v;
          }
        }
      },
      allSelected() { //是否全部选中
        const arr = this.productList.filter(item => item.onShelfStatus == 2 && item.stock * 1 > 0)

        return arr.length && arr.every(item => item.selected) || false; //知識點，如果是空數組調用every就一定會返回true。
      },
      sumPrice() { //总价|
        return this.productList.filter(item => item.selected).reduce((pre, cur) => pre + (cur.sellPrice * 1) * (cur.num *
          1), 0)
      },
      hasTimeoutProd() { // 是否有失效商品
        //onShelfStatus == 2 上架状态。 stock > 0 有库存
        return this.productList.some(item => item.onShelfStatus != 2 || item.stock * 1 < 1)
      },
      selectedGoods() { // 选中的商品
        return this.productList.filter(item => item.selected)
      }
    },
    created() {
      this.$jb.webview2js((params) => {
        params.type == 1 && this.$router.go(-1)
        // if (params.type == 2) {
        //   this.isEditor = params.btn.value !== 1
        // }
      })
      // this.$jb.js2webview({
      //   type: 4,
      //   btns: [{
      //     name: '編輯',
      //     value: 1
      //   }, {
      //     name: '完成',
      //     value: 2
      //   }]
      // }, (params) => {
      //   this.isEditor = params.btn.value !== 1
      // })

      this.getCartInfo();
    },
    methods: {
      ...mapMutations(['CART_DEL', 'CART_UPDATE']),
      async getGifts() { //获取礼品
        let list = this.$deepcopy(this.selectedGoods);
        let prodIds = [];
        for (const item of list) {
          prodIds.push(item.productId)
        }
        const res = await this.$post('product/gift', {
          gift: "GOODTYPE_ZENGPIN",
          ids: prodIds
        });
        if (!res || !res.records) return;
        res.records.map(item1 => {
          list.map(item2 => {
            if (item1.productId === item2.productId) { //一个商品会有多个礼品
              item2.gifts = item2.gifts || [];
              item2.gifts.push(item1)
            }
          })
        })
        this.submitProdList = list;
      },
      async getFreight() { //获取运费模板(和商品详情下单一样)
        let list = this.$deepcopy(this.selectedGoods);
        let freightIds = [];
        for (const item of list) {
          freightIds.push(item.freightId)
        }
        const res = await this.$post('freight/detail', {
          ids: freightIds
        });
        if (res.returnCode != 1000 || !res.dataInfo || !res.dataInfo.length) return
        //将查询到的运费模板赋值给对应的商品express字段，商品详情下单也有这个字段
        res.dataInfo.map(item1 => {
          list.map(item2 => {
            if (item1.id === item2.freightId) {
              item2.express = item1.freightPriceList.map(item3 => { //格式化为组件需要的格式
                return {
                  name: item3.freightName,
                  value: JSON.stringify(item3)
                }
              })
            }
          })
        })
        this.submitProdList = list;
      },
      async doBuy() { //结算
        if (!this.selectedGoods.length) return this.$vux.toast.text('您還未選擇商品')
        let productList = []
        let list = this.$deepcopy(this.selectedGoods);
        let [prodIds, freightIds] = [
          [],
          []
        ];

        for (const item of list) {
          prodIds.push(item.productId)
          if(item.freightId != -1) freightIds.push(item.freightId)
        }
        //查询礼品并赋值到对应商品上
        const resGift = await this.$post('product/gift', {
          gift: "GOODTYPE_ZENGPIN",
          ids: prodIds
        });
        resGift.records && resGift.records.map(item1 => {
          list.map(item2 => {
            if (item1.productId === item2.productId) { //一个商品会有多个礼品
              item2.gifts = item2.gifts || [];
              item2.gifts.push(item1)
            }
          })
        })
        //将查询到的运费模板赋值给对应的商品express字段，商品详情下单也有这个字段
        if (freightIds.length) {
          const resFreight = await this.$post('freight/detail', {
            ids: freightIds
          });
          resFreight.dataInfo && resFreight.dataInfo.map(item1 => {
            list.map(item2 => {
              if (item1.id === item2.freightId) {
                item2.express = item1.freightPriceList.map(item3 => { //格式化为组件需要的格式
                  return {
                    name: item3.freightName,
                    value: JSON.stringify(item3)
                  }
                })
              }
            })
          })
        }


        for (let item of list) {
          productList.push({ //整理信息,后面的页面会用到
            name: item.name,
            coverImage: item.coverImage,
            skus: item.skus,
            num: item.num * 1,
            productId: item.productId,
            skuId: item.skuId,
            sellPrice: item.sellPrice,
            stock: item.stock * 1,
            express: item.freightId == '-1' ? null : item.express,
            expressVal: item.freightId == '-1' ? null : JSON.parse(item.express[0].value), //给一个默认快递
            gifts: item.gifts,
          })
        }

        this.$session.set('createOrderInfo', {
          // selcetedBuyType: this.$deepcopy(this.selcetedBuyType),
          productList: productList
        })
        this.$router.push({
          name: 'shoppingCheck'
        })
      },
      async clearTimeout() { //清除失效商品
        let newList = this.$deepcopy(this.productList);
        //onShelfStatus == 2 上架状态。 stock > 0 有库存
        const ids = newList.filter(item => item.onShelfStatus != 2 || item.stock * 1 < 1).map(item => {
          return {
            skuId: item.skuId,
            productId: item.productId
          }
        });
        const res = await this.$post('cart/delete', {
          ownerId: this.$client.userid,
          ids: ids
        });
        if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
        this.getCartInfo();
      },
      selectAll() { //全选
        let newList = this.$deepcopy(this.productList);
        if (this.allSelected) {
          newList.filter(item => item.onShelfStatus == 2 && item.stock * 1 > 0).map(item => item.selected = false);
        } else {
          newList.filter(item => item.onShelfStatus == 2 && item.stock * 1 > 0).map(item => item.selected = true);
        }
        this.productList = newList;
      },
      itemClickHandler(index) {
        const curItem = this.productList[index];
        if (curItem.timeout) return console.log('此商品已過期')
        const newItem = {
          ...curItem,
          selected: !curItem.selected
        }
        if (this.$client.webview == 3) {
          this.CART_UPDATE([newItem])
        }else {
          this.productsOnline.splice(index, 1, newItem)
        }
      },
      async updateNum(isPlus, index) {// isPlus: 是否为增加。 后台购物车奇葩搬的接口，只能传增加或减少不能更新当前商品的数量
        const productListCopy = this.$deepcopy(this.productList);
        const curItem = productListCopy[index];
        const num = isPlus ? 1 : -1
        curItem.num = curItem.num*1 + num
        if (this.$client.webview == 3) {
          this.CART_UPDATE([{
            ...curItem,
            num: curItem.num
          }])
        }else {
          this.$vux.loading.show('加載中')
          const params = {
            ownerId: this.$client.userid,
            productId: curItem.productId,
            skuId: curItem.skuId,
            num: num
          };
          const res = await this.$post('cart/editNum', params);
          this.$vux.loading.hide()
          if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
          this.productList = productListCopy;
        }
      },
      editorHandler() {// 老版
        this.isEditor = !this.isEditor
      },
      async getCartInfo() { //获取购物车
        if (this.$client.webview == 3) return //如果是本地购物车会自动响应数据
        const res = await this.$post('cart/page', {
          ownerId: this.$client.userid
        });
        let productList = [];
        if (res.returnCode == 1000 && res.dataInfo && res.dataInfo[0]) {
          productList = res.dataInfo[0].products;
        };
        this.productsOnline = productList;
        this.loaded = true;
      },
      async delate(index) { //新版--只能一個個的刪
        const curItem = this.productList[index];
        if (this.$client.webview == 3) {
          this.CART_DEL([curItem])
        } else {
          const res = await this.$post('cart/delete', {
            ownerId: this.$client.userid,
            ids: [{
              skuId: curItem.skuId,
              productId: curItem.productId
            }]
          });
          if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
          this.getCartInfo();
        }
      },
      async delateProduct() { //老版
        //选中的商品，通过逗号隔开上传
        let ids = [];
        for (const item of this.selectedGoods) {
          ids.push({
            skuId: item.skuId,
            productId: item.productId
          })
        }
        if (this.$client.webview == 3) {
          this.CART_DEL(ids)
        } else {
          const res = await this.$post('cart/delete', {
            ownerId: this.$client.userid,
            ids: ids
          });
          if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
          this.getCartInfo();
        }
      }
    },
  }

</script>
<style lang='less' scoped>
  .cart-none {
    .cart-none-img {
      display: block;
      width: 4rem;
      margin: 1rem auto;
    }
  }

  .editor {
    height: 100%;
  }

  .list-wrapper {
    padding-bottom: 0.24rem;
    .customer-cart-li {
      margin-top: 0.24rem;
    }
  }

  .clear {
    position: absolute;
    bottom: 1.15rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.08rem 0.34rem;
    text-align: center;
    background: #EEECEC;
    box-shadow: 0 0.02rem 0.06rem 0 rgba(0, 0, 0, 0.11);
    border-radius: 1rem;
    .icon-clear {
      display: inline-block;
      width: 0.32rem;
      height: 0.32rem;
      vertical-align: middle;
      margin-right: 0.08rem;
      border-radius: 0.16rem;
      background: url('~@/assets/images/goods_delete@2x.png') center center no-repeat #AFABAB;
      ;
      background-size: 0.24rem;
    }
    span {
      font-size: 0.24rem;
      color: #666666;
    }
  }

  .footer-btn {
    display: flex;
    position: relative;
    height: 0.9rem;
    background: #fff;
    .select-all {

      height: 100%;
      padding-left: @page-space;
      .state {
        display: inline-block;
        width: 0.33rem;
        height: 100%;
        vertical-align: middle;
        background: url('~@/assets/images/common_checkbox_normal@2x.png') center center no-repeat;
        background-size: 0.3rem auto;
        &.selected {
          background: url('~@/assets/images/common_checkbox_selected@2x.png') center center no-repeat;
          background-size: 0.3rem auto;
        }
      }
      span {
        height: 0.9rem;
        ;
        line-height: 0.9rem;
        vertical-align: middle;
        font-size: 0.28rem;
        color: #333333;
      }
    }
    .total {
      flex: 1;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.28rem;
      color: #666666;
      .price {
        color: @theme-yellow;
      }
    }
    .customer-btn {
      width: 2.64rem;
    }
  }

</style>
