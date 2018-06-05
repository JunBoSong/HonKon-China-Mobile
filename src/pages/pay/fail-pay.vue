<template>
<vp-layout-page>
    <div class="qrcode-pay">
      <vp-cell label="訂單編號" :value="orderid" :isLink="false" />
       <vp-cell label="付款金額" :value="`HK$${paymentAmount/100}`" :isLink="false" />
       <vp-cell label="付款方式" :value="paytype | roder" :isLink="false" />
    </div>
    <div class="go_order" @click="pay">
      再次支付
    </div>
    <vp-layout-pay ref="pay" ></vp-layout-pay>
</vp-layout-page>
</template>
<script>
  import {vpCell ,vpLayoutPay} from '@/components';
  import Qrcanvas from 'qrcanvas-vue';

import { fail } from 'assert';
export default {
  components:{
    vpCell, Qrcanvas, vpLayoutPay
  },
  data() {
    return {
      urlData: null, // url上带的信息
      orderid: null,
      paytype: null,
      options: null,
      paymentAmount: null, // 支付金额
      paymentType: null, // 1 预付费 2后付费  3购买商品
    };
  },
  created() {
    this.urlData = this.$route.query // 获取url信息
    this.getDetial()
    
    console.log(this.$route.query)
  },
  mounted() {
    // let data = this.$session.get('payData')
    // this.orderid = data.mainOrderId
    // this.paytype = data.payType 
    // console.log(`${location.origin}${location.pathname}${data.search}#/pay/paying${this.payHash(data.hash)}
    // &origin=${data.origin}
    // &paytype=${data.payType}
    // &orderid=${data.mainOrderId}
    // &payform=${data.payPlatform}
    // `)
  },
  methods: {
    pay() {
      const url = `${location.origin}${location.pathname}${location.search}`;
      
      let param = {
        paymentType: this.paymentTypeFiter(this.paymentType), // 1 预付费 2后付费  3购买商品
        mainOrderId: this.orderid, // 订单id
        payType: this.paytype, // 支付方式
        frontUrl: `${this.hashFilter(this.urlData.payurl)}?`,
        successURL: `${this.hashFilter(this.urlData.payurl)}?`,
        failURL: `${url}#/pay/failPay?payurl=${this.urlData.payurl}`, // 支付失败的回调地址
        cancelURL: `${url}#/pay/failPay?payurl=${this.urlData.payurl}`,
        lang: 'X' //E：English C：Traditional Chinese  X：Simplified Chinese  
      }
      this.$refs.pay.pay(this.orderid, param)
      // let param = {
      //   paymentType: payParams.paymentType, //  1话费充值 2 后付费账单 3购买订阅产品 手机 及附件
      //   mainOrderId: payParams.mainOrderId,
      //   payType: req.payType,
      //   frontUrl: `${url}${req.frontUrl}?`,
      //   successURL: `${url}${req.frontUrl}?`,
      //   failURL: `${url}#/pay/failPay${this.payHash(req.frontUrl)}`, // 支付失败的回调地址
      //   cancelURL: `${url}#/pay/failPay${this.payHash(req.frontUrl)}`,
      //   lang: 'X' //E：English C：Traditional Chinese  X：Simplified Chinese  
      // }
    },

    async getDetial() { // 获取订单详情
      // let urlData = rulParse('href') // 获取url上的参数  通过out_trade_no查询订单信息
      let res = await this.$post('order/businessOrderInfo', {orderRef: this.urlData.Ref})
      if (res.returnCode != '1000') return false
      this.orderid = res.dataInfo.mainOrderId // 订单id
      this.paymentAmount = res.dataInfo.paymentAmount // 支付金额
      this.paytype = res.dataInfo.payType // 支付方式
      this.paymentType = res.dataInfo.purchaseType
    },

    hashFilter(hash) { // 1：缴费回调地址
      // if ()
      if (hash == 1) {  // 充值
        return '#/contributionIndex/contributionSuccess'
      }
      if (hash == 2) { // 缴费
        return '#/contributionIndex/appreciateSuccess'
      }
      if (hash == 3) { // 商品支付
        return '#/shopping/result'
      }
      if (hash == 4) { // 订单支付详情
        return '#/mine/order/result'
      }
    },

    paymentTypeFiter(num) { // paymentType参数处理根据
      if (num == 0 || num == 7) return 3
      if (num == 6) return 1
      if (num == 1 || num ==3 || num == 5) return 2
      return ''
    }
  },
  filters:{
    roder: function(val){
      switch(val -0) {
        case 14:
          return '支付寶';
          break;
        case 25: 
          return 'MASTERCARD中国银行支付'
          break;
        case 23:
          return 'VISA中国银行支付'
          break;
        default:
          break;
      }
    },
  }
};
</script>
<style lang='less' scoped>
.qrcode-pay{
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  background: #fff;
}
.qrcode{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  // height: 200px;
  // width: 200px;
}
.go_order{
  position: relative;
  left: 50%;
  margin-top: 1rem;
  transform: translateX(-50%);
  height: 0.8rem;
  width: 3.6rem;
  text-align: center;
  line-height: 0.8rem;
  background: #fff;
  color: #E52C79;
  border: 1px solid #E52C79;
}
</style>
