<template>
  <div>
    <vp-layout-page>
      <vp-header-page title='購物車' slot='header'>
        <p class="editor child-vertical-middle" slot="right-options" @click="editorHandler">
          <span>{{ isEditor ? '完成' : '編輯'}}</span>
        </p>
      </vp-header-page>
      <div class="list-wrapper">
        <vp-li-goods-cart
        class="customer-cart-li"
        v-for="(item, index) in productList"
        :key="index"
        :priceLabel="item.priceLabel"
        :editor="isEditor"
        :coverImage="item.coverImage"
        :name="item.name"
        :skus="item.skus"
        :price="item.sellPrice | filterPrice"
        :num="item.num"
        :maxNum="item.isContract === 1 ? contractNumLimit : freeContractNumLimit "
        :selected="item.selected"
        :timeout="item.timeout"
        @update:num="val => item.num = val"
        @click.native="itemClickHandler(index)"/>
      </div>
      <div class="footer-btn" slot="footer">
        <div class="select-all" @click="selectAll">
          <i class="state" :class="{'selected': allSelected}" ></i>
          <span>全選</span>
        </div>
        <div class="total" >
          <span class="label" v-show="!isEditor">合計：</span>
          <span class="price" v-show="!isEditor">{{sumPrice | filterPrice}}</span>
        </div>
        <vp-button class="customer-btn" @click="submit" :content="isEditor ? '刪除' : '結算'"/>
      </div>
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import { vpLiGoodsCart, vpInputNumber } from '@/components'
export default {
  components: { vpLiGoodsCart },
  data() {
    return {
      isEditor: false,//是否为编辑模式
      productList: [],
      createOrderInfo: {}
    }
  },
  computed: {
    contractProd() {//签约价商品
      return this.productList.find(item => item.isContract === 1) || {};
    },
    freeContractProd() {//免签约价商品
      return this.productList.find(item => item.isContract === 2) || {};
    },
    //签约价购买不能超过手机配额，总数量不能超过库存。
    contractNumLimit() {//签约购买数量限制
      const first = this.productList[0] || {}
      const stock = first.stock;
      const limit = first.contractPriceLimit;
      const freeContNum = this.freeContractProd.num || 0;
      return Math.min(limit, (stock - freeContNum));
    },
    freeContractNumLimit() {//免签约购买数量限制(库存-已选中的签约购买数量)
      const first = this.productList[0] || {}
      const stock = first.stock;
      const contractNum = this.contractProd.num || 0;
      return stock - contractNum;
    },
    sumPrice() {//总价
      const list = this.productList;
      const contractSum = list[0] && (list[0].selected ? list[0].contractPrice * list[0].num : 0) || 0;
      const freeContractSum = list[1] && (list[1].selected ? list[1].freeContractPrice * list[1].num : 0) || 0;
      return contractSum + freeContractSum
    },
    allSelected() {
      return this.productList.filter(item => !item.timeout).every(item => item.selected);
    }
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    this.setProList();
  },
  methods: {
    setProList() {//将商品详情页的数据格式化成此页面需要的格式
      const createOrderInfo = this.$session.get('createOrderInfo');
      const prod = createOrderInfo.productList[0];
      const {contractPriceLimit, num} = prod;
      let [numContract, numNoContract] = [0, 0];
      if (contractPriceLimit > 0) {
        if (contractPriceLimit <= num) {//签约价配额 <= 选取的数量 => 签约价数量为配额数,免签约价数为剩余
          numContract = contractPriceLimit;
          numNoContract = num - numContract;
        }else {//签约价配额 > 选取的数量 => 签约价数量为选取的数量,免签约价数量为0
          numContract = num;
          numNoContract = 0;
        }
      }else {
        numContract = 0;
        numNoContract = num;
      }

      this.createOrderInfo = createOrderInfo;

      //整理一下数据
      this.productList = [{...prod, isContract: 1, num: numContract, priceLabel: '客戶優惠價', sellPrice: prod.contractPrice, selected: false},
                          {...prod, isContract: 2, num: numNoContract, priceLabel: '凈機特惠價', sellPrice: prod.freeContractPrice, selected: false}];
    },
    submit() {
      if(this.isEditor) {//删除
        let newList = this.$deepcopy(this.productList);
        this.productList = newList.filter(item => !item.selected)
      }else {//下单
        const createOrderInfo = this.$deepcopy(this.createOrderInfo)
        createOrderInfo.productList = this.productList.filter(item => item.selected);
        this.$session.set('createOrderInfo', createOrderInfo)
        if (createOrderInfo.productList.some(item => item.isContract == 1)) {//选了合约机
          this.submitContract();
        }else {
          if (createOrderInfo.productList.length == 0) return
          console.log(createOrderInfo.productList)
          this.$router.push({name: 'shoppingCheck'})
        }
      }
    },
    async submitContract() {
      const customerInfo = this.$session.get('customerInfo');
      const res = await this.$post('business/init', { //初始化订单,获取到业务id
        businessType: 8, //文档上没有,王睿让添加为 8
        cmhkCustomerId: customerInfo.customerId,
        contactNumber: customerInfo.customerPhone,
        email: customerInfo.emailAddress,
        userId: this.$client.userid
      })
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
      this.$router.push({name: 'contractCont', query: {
        registerId: res.dataInfo.orderId, //业务id
        name: 'shoppingCheck'   // 提交合约后的回调参数
      }})
    },
    selectAll() {
      let newList = this.$deepcopy(this.productList);
      if (this.allSelected) {
        newList.filter(item => !item.timeout).map(item => item.selected = false);
      }else {
        newList.filter(item => !item.timeout && item.num != 0).map(item => item.selected = true);
      }

      this.productList = newList;
    },
    itemClickHandler(index) {
      const curItem = this.productList[index];
      if (curItem.num == 0) return console.log('不能选择')
      if (curItem.timeout) return console.log('此商品已過期')
      this.productList.splice(index, 1 ,{
        ...curItem,
        selected: !curItem.selected
      })
    },
    editorHandler() {
      this.isEditor = !this.isEditor
    }
  }
}
</script>
<style lang = 'less' scoped>
.editor {
  height: 100%;
}
.list-wrapper{
  padding-bottom: 0.24rem;
  .customer-cart-li{
    margin-top: 0.24rem;
  }
}
.clear{
  position: absolute;
  bottom: 1.15rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.08rem 0.34rem;
  text-align: center;
  background: #EEECEC;
  box-shadow: 0 0.02rem 0.06rem 0 rgba(0,0,0,0.11);
  border-radius: 1rem;
  .icon-clear {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    vertical-align: middle;
    margin-right: 0.08rem;
    border-radius: 0.16rem;
    background: url('~@/assets/images/goods_delete@2x.png') center center no-repeat #AFABAB;;
    background-size: 0.24rem;
  }
  span {
    font-size: 0.24rem;
    color: #666666;
  }
}
.footer-btn{
  position: relative;
  display: flex;
  height: 0.9rem;
  background: #fff;
  .select-all{
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
    span{
      height: 0.9rem;
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
    .price{
      color: @theme-yellow;
    }
  }
  .customer-btn{
    /* position: absolute;
    right: 0;
    top: 0; */
    width: 2.64rem;
  }
}
</style>
