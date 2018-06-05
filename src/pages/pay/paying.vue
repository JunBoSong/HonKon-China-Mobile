<template>
<vp-layout-page>
  <vp-layout-pay ref="pay" ></vp-layout-pay>
</vp-layout-page>
</template>
<script>
import {vpLayoutPay} from "@/components";
export default {
  components: {
    vpLayoutPay
  },
  data() {
    return {
    };
  },
  created() {

    // this.$refs.pay.pay(queryData.mainOrderId, paydata)
  },
  mounted() {
    console.log(this.$route.query)
   
    let queryData = this.$route.query // url 传过来的值 payurl：支付成功回调的url origin： 订单来源 paytype：支付方式 支付宝、微信..... orderid 订单id
    console.log(queryData)
    const paydata = {
      paymentType: queryData.payform, //  1话费充值 2 后付费账单 3购买订阅产品 手机 及附件
      mainOrderId: queryData.orderid,
      payType: queryData.paytype,
      payPlatform: 3,
      origin: queryData.origin,
      frontUrl: `${this.hashFilter(queryData.payurl)}`,
      successURL: `${this.hashFilter(queryData.payurl)}`,
      failURL: `${location.origin}${location.pathname}${location.search}${this.hashFilter(queryData.payurl)}?`,
      cancelURL: `${location.origin}${location.pathname}${location.search}${this.hashFilter(queryData.payurl)}?`,
      lang: 'X' //E：English C：Traditional Chinese  X：Simplified Chinese  
    }
    debugger
    // debugger
     console.log(queryData.payurl)
    console.log(`${location.origin}${location.pathname}${location.search}${this.hashFilter(queryData.payurl)}?`)
    console.log(`${location.origin}${location.pathname}${location.search}${this.hashFilter(queryData.payurl)}?`,)
    this.$refs.pay.pay(queryData.orderid, paydata)
  },
  methods: {
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
    }
  },
  filters:{
    roder: function(val){
      switch(val -0) {
        case 14:
          return '支付寶二維碼';
          break;
        case 25: 
          return 'MASTERCARD中国银行支付'
          break;
        case 23:
          return 'VISA中国银行二維碼支付'
          break;
        default:
          break;
      }
    }
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
  height: 128px;
  width: 128px;
}
.go_order{
  position: relative;
  left: 50%;
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
