<template>
  <!-- <div v-html="payFormHtml" style="position: relative;left: 1000px;z-index: -1;"></div> -->
  <div>
    <form :action="payFormUrl" ref="payForm" method="post">
      <input type="hidden" :name="key" :value="value" v-for="(value, key) in payFormData" :key="key" />
    </form>
  </div>
</template>
<script type='text/javascript'>
  export default {
    data() {
      return {
        createOrderData: {}, // 提交订单的入参
        payFormHtml: '',
        payFormData: null,
        payFormUrl: '',
        paying: false, //是否正在支付
        isQrcode: false, // 是否是二维码支付 true：是 false：否
        successURL: null, // 回调地址展示 1.增值 2. 缴费 
        timer: null,
      }
    },
    methods: {
      async pay(payParams, param) { //支付 param订单支付不需要创建订单直接支付 payParams可以随便穿一个参数 
        const that = this;
        const req = that.$deepcopy(param || that.createOrderData);
        const url = `${location.origin}${location.pathname}${location.search}`;
        if (req.payPlatform == 5) {
          this.isQrcode = true
        }
        clearTimeout(that.timer);
        let data = {
          paymentType: param && param.paymentType || payParams.paymentType, //  1话费充值 2 后付费账单 3购买订阅产品 手机 及附件
          mainOrderId: param && param.mainOrderId || payParams.mainOrderId, // param 订单列表直接支付 
          payType: req.payType,
          payPlatform: req.payPlatform,
          origin: req.origin,
          frontUrl: `${url}${req.frontUrl}?` ,
          successURL: `${url}${req.frontUrl}?`,
          failURL: `${url}#/pay/failPay?`, // 支付失败的回调地址
          cancelURL: `${url}#/pay/failPay?`,
          lang: 'X' //E：English C：Traditional Chinese  X：Simplified Chinese  
        }
        // debugger
        const res = await that.$post('order/pay', data)
        if (res.returnCode == 1000) {
          const payData = res.dataInfo;
          if (!payData) {
            that.$vux.toast.text("失败");
            return that.paying = false;
          }
          // debugger
          that.payFormData = payData.paymentRequest;
          that.payFormUrl = payData.paymentUrl;
          // that.payFormUrl = "https://172.16.5.218:1443/submit_transaction";
          that.$nextTick(() => {
            if(!that.isQrcode) { // 不是二维码支付
              that.$refs.payForm.submit();
            } else { // 是二维码支付 不提交表单
              let qrcodeData = {
                ...data,
                search: `${location.search}`,
                hash: req.frontUrl
              }
              this.$vux.loading.hide()
              this.$session.set('payData', qrcodeData) // 二维码支付把支付信息存在session中
              this.$router.push({path:`/pay/qrcodePay?amount=${res.dataInfo.paymentRequest.Amount}`})
            }
          })
          // switch (req.payType) {
          //   case 14: //支付宝
          //   case 97: //银联
          //     that.payFormHtml = payHtml;
          //     that.$nextTick(() => {
          //       const f = document.forms["alipaysubmit"] || document.getElementById("myForm");
          //       f.submit();
          //     });
          //     break;
          //   case 105: //和包
          //   case 16: //微信
          //     window.location.href = payHtml;
          //     break;
          //   default:
          //     break;
          // }
        } else if (res.returnCode * 1 === 2009) { //如果返回2009就轮询
          that.timer = setTimeout(() => {
            that.pay(payParams, param ? param : null)
            clearTimeout(that.timer);
          }, 900);
          return false
        } else {
          that.$emit('on-fail', res)
          that.$vux.loading.hide()
          that.paying = false;
          // that.$vux.toast.text(res.message);
        }
      },
      async createOrder(createOrderData) { // 创建订单 isQrcode 二维码支付传参  true
        if (this.paying) return //前面还没走完呢
        this.$vux.loading.show({text: 'Loading'})
        this.paying = true;
        this.createOrderData = createOrderData;
        const req = this.$deepcopy(createOrderData);
        //createOrderData.payType 的值是 input-radio-pay组件的值。根据这个值设置提交 payType、payPlatform
        const res = await this.$post('order/create', req)
        if (res.returnCode != 1000 || !res.dataInfo) {
          this.$vux.loading.hide()
          this.$vux.toast.text(res.message)
          this.$emit('on-fail', res)
          this.paying = false;
          return false;
        };
        if (createOrderData.payPlatform == 5) { // 如果是5 就是扫码支付
          this.isQrcode = true
        }
        const payParams = {
          mainOrderId: res.dataInfo,
          paymentType: createOrderData.paymentType // 这个是支付的时候要用，在调createOrder的入参里边加这个。 1话费充值 2 后付费账单 3购买订阅产品 手机 及附件
        }
        this.pay(payParams)
      },
      search(orderid) { // 筛选 search
        if(location.search == '') { // ?orderid = orderid
          return `?orderid=${orderid}`
        }
        return `&orderid=${orderid}`
      },
      payHash(hash) { // 回调地址处理
      if (hash == '#/contributionIndex/contributionSuccess') { // 充值
        return '?payurl=1'
      }
      if (hash == '#/contributionIndex/appreciateSuccess') { // 缴费
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
  }

</script>
