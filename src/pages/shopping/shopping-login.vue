<template>
  <div>
    <vp-layout-page style="background:#fff;">
      <div class="wrapper">
        <div class="login-box" v-show="pswLogin">
          <vp-input type="tel" v-model="customer.msisdn" placeholder="請輸入電話號碼"/>
          <vp-input type="password" v-model="customer.pwd" placeholder="請輸入客戶密碼" class="customer-input-style" />
        </div>
        <div class="login-box" v-show="!pswLogin">
          <vp-input type="tel" v-model="customer.msisdn" placeholder="請輸入電話號碼"/>
          <vp-input type="tel"
          v-model="customer.smsCode"
          placeholder="請輸入驗證碼"
          :phoneValidate="customer.msisdn"
          :error="codeError"
          :getCodeBtn="true"
          @getCode="getCode"
          @change-error="codeError = false"
          class="customer-input-style" />
        </div>
        <div class="customer-btn-style">
          <vp-button content="登入" color="theme-secondary" @click="submit"></vp-button>
        </div>
        <p class="switch-login-type" @click="changeLoginType">{{ pswLogin ? '驗證碼登入' : '密碼登入'}}</p>
      </div>
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import { vpInput } from '@/components';
export default {
  components: { vpInput },
  data() {
    return {
      pswLogin: false,
      codeError: false,
      customer: {
        msisdn: '92044748',
        pwd: undefined,
        smsCode: '1234'
      },
      customerInfo: null
    }
  },
  methods: {
    changeLoginType() {
      this.customer.pwd = undefined
      this.customer.smsCode = undefined
      this.pswLogin = !this.pswLogin
    },
    async getCode() {
      const res = await this.$post('verifycode/send', {phoneNo: this.customer.msisdn});
      this.$vux.toast.text(res.message);
      this.codeError = res.returnCode != 1000;
    },
    async submit() {
      if (!this.customer.msisdn) return this.$vux.toast.text('請輸入電話號碼')
      if (this.pswLogin && !this.customer.pwd) return this.$vux.toast.text('請輸入客戶密碼')
      if (!this.pswLogin && !this.customer.smsCode) return this.$vux.toast.text('請輸入驗證碼')
      const res = await this.$post('customer/login', this.customer)
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
      const resData = res.dataInfo.postpaid;
      const data = {
        customerPhone: this.customer.msisdn,
        customerId: resData.customerId, //客户id
        tmcode: resData.tmcode, //现有服务计划 ID
        ratePlan: resData.ratePlan,//现有服务计划 名字
        contractEndDate: resData.contractEndDate //合约截止时间
      }
      this.$session.set('customerInfo', data);
      this.$router.go(-1)
    },
  }
}
</script>
<style lang = 'less' scoped>
@import '../../assets/less/theme.less';
.wrapper{
  padding-top: 60%;
  background: url('~@/assets/images/selected_login_background.png') 0 0 no-repeat;
  background-size: 100% auto;
}
.login-box {
  width: 6.3rem;
  margin: 0 auto;
  padding: 0.78rem 0.36rem 0.72rem;
  background: #FFFFFF;
  box-shadow: 0 0.02rem 0.23rem 0 rgba(90, 119, 4, 0.25);
  border-radius: 0.1rem;
  .customer-input-style {
    margin-top: 0.16rem;
  }
}

.customer-btn-style {
  width: 6.3rem;
  margin: 0.48rem auto 0;
}

.switch-login-type {
  width: 50%;
  margin: 0 auto;
  line-height: 0.54rem;
  text-align: center;
  text-decoration: underline;
  font-size: 0.26rem;
  color: #333333;
}
</style>
