<template>

  <div>
    <div class="qrcode-pay">
      <vp-cell label="訂單編號" :value="orderid" :isLink="false" />
       <vp-cell label="付款金額" :value="`HK$${$route.query.amount}`" :isLink="false" />
       <vp-cell label="付款方式" :value="paytype | roder" :isLink="false" />
       <vp-cell label="請掃描以下二維碼支付"  :isLink="false" />
    </div>
    <!-- <div id="qrcode" ref='qrcode' class="qrcode">

    </div> -->
    <qrcanvas :options="options" class="qrcode"></qrcanvas>
    <div class="go_order" @click="goOrderList">
      已支付完成，返回訂單列表
    </div>
  </div>

</template>
<script>
  import {vpCell} from '@/components';
  import Qrcanvas from 'qrcanvas-vue';
export default {
  components:{
    vpCell, Qrcanvas
  },
  data() {
    return {
      orderid: null,
      paytype: null,
      options: null,
      payData: null,
      hash: '/mine/order/list',
    };
  },
  created() {

  },
  mounted() {
    let data = this.$session.get('payData')
    this.payData = data
    this.orderid = data.mainOrderId
    this.paytype = data.payType 
    console.log(`${location.origin}${location.pathname}${data.search}#/pay/paying${this.payHash(data.hash)}
    &origin=${data.origin}
    &paytype=${data.payType}
    &orderid=${data.mainOrderId}
    &payform=${data.payPlatform}
    `)
    console.log(data.search)
    // var qrcode = new QRCode(document.getElementById("qrcode"), { // mainOrderId
    //   text: `${location.origin}${location.pathname}${data.search}#/pay/paying${this.payHash(data.hash)}&origin=${data.origin}&paytype=${data.payType}&orderid=${data.mainOrderId}&payform=${data.paymentType}`,
    //   width: 200,
    //   height: 200,
    //   colorDark : "#000000",
    //   colorLight : "#ffffff",
    //   correctLevel : QRCode.CorrectLevel.H
    // });
    let url = `${location.origin}${location.pathname}${data.search}#/pay/paying${this.payHash(data.hash)}&origin=${data.origin}&paytype=${data.payType}&orderid=${data.mainOrderId}&payform=${data.paymentType}`.replace('staging', 'store').replace('webview=2', 'webview=3').replace('webview=1', 'webview=3')// 更改权限
    this.options = Object.assign({}, this.options, {
      data: url,
      cellSize: 2,
      correctLevel: 'H'
    });
    console.log(url)
  },
  methods: {
    goOrderList() {
      this.$router.push({path: this.hash})
    },

    payHash(hash) {
      if (hash == '#/contributionIndex/contributionSuccess') { // 充值
        this.hash = '/mine/business/list?curtabindex=1'
        return '?payurl=1'
      }
      if (hash == '#/contributionIndex/appreciateSuccess') { // 缴费
        this.hash = '/mine/business/list?curtabindex=2'
        return '?payurl=2'
      }
      if (hash == '#/shopping/result') { // 商品支付
        return '?payurl=3'
      }
      if (hash == '#/mine/order/result') { // 订单支付详情
        return '?payurl=4'
      }
      return ''
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
