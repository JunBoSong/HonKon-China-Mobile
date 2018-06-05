<template>
<div style="height: 100%">
  <vp-layout-page>
    <div class="content">
      <div class="content-inputNumber">
      <h3>請輸入繳費電話號碼:</h3>
      <div class="inputNumberCon">
        <p>
          <span class="lable">+852</span>
          <input type="tel" ref="inputNumber" maxlength="11" class="inputNumber" v-model="telPhone" v-keyBoard @keyup="OnlyNum(1)" @blur="checkPhone">
        </p>
      </div>
      <div class="inputNumberbottom" v-if="$client.right === 'staging'">
        <span>應繳金額：{{accountbalance | filterPrice}}</span>
        <span>繳款到期日：{{billDate}}</span>
      </div>
    </div>
    <!-- <i class="content-border"></i> -->
    <div class="content-inputMoney">
      <h3>請輸入繳費金额:</h3>
      <div class="inputMoneyCon">
        <p>
          <span class="lable">HK$</span>
          <input type="number" ref="money"  class="inputNumber" v-model="money" >
        </p>
      </div>
    </div>
    </div>
     <div :class="[$client.right !== 'staging'?'queryNum':'']">
            <div class="queryNumThin" v-if="$client.right !== 'staging' && !logined">
              <p>可能你還需要以下服務</p>
              <div class="queryNumBtn vp-1px" @click="showLogin">查詢應繳金額</div>
            </div>
            <div class="queryNumThinLogined" v-if="$client.right !== 'staging' && logined">
              <p>
                <span>電話號碼</span>
                <span class="fr">{{telPhone}}　</span>
              </p>
              <p>
                <span>應繳金額</span>
                <span class="fr">{{ accountbalance | filterPrice}}　</span>
              </p>
              <p>
                <span>繳款到期日</span>
                <span class="fr">{{billDate}}　</span>
              </p>
              <div class="reloadLogined" @click="reloadLogined">
                <img v-lazy="{src: require('@/assets/images/payment_login@2x.png'), error: 'http://placehold.it/10x10', loading: 'http://placehold.it/10x10'}" >
                 <p>重新登錄</p>
              </div>
            </div>
    </div>

    <vp-input-radio-pay :attention='true' v-model="payType" @input="getPayWay"/>
    <vpInputRadioRules v-model="warnChoose"></vpInputRadioRules>
    <div class="payBtn" slot="footer">
          <vp-button content="立即繳費" @click.native="goNext"></vp-button>
    </div>


    <vp-layout-pay ref="pay" @on-fail="payFailCallback"></vp-layout-pay>
  </vp-layout-page>
  <vp-popup-login :isAppreciation='true' :userShow="userShow" @clickPop="clickPop"></vp-popup-login>
  </div>
</template>

<script type='text/javascript'>
import {
  vpInputRadio,
  vpInputRadioPay,
  vpButton,
  vpPopupLogin,
  vpInputRadioRules,
  vpLayoutPay
} from "@/components";
import { setTimeout, setInterval } from 'timers';
export default {
  components: {
    vpInputRadio,
    vpInputRadioPay,
    vpButton,
    vpPopupLogin,
    vpInputRadioRules,
    vpLayoutPay
  },
  data() {
    return {
      checked: null,
      UNpayFormHtml: '',
      showUn: false,
      warnChoose: false,
      payType: {},
      telPhone: '', // 手机号
      money: 0, // 充值金额
      payWay: null, // 支付方式 如果是数组就二维码支付
      type: this.$client.right, //staging: 工作台  2 店铺 ???
      userShow:false,
      logined:false, // 是否展示查询结果
      customerId: null, // 客户id  ？？？
      accountbalance: null, // 应缴金额
      billDate: null, // 缴费日期
      orderId: null, // 订单id
      isLogin: false, // 存储登入状态
    };
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})})
    if (this.$client.right !== 'staging') {
      this.shareFn()
    }

  },
  mounted() {

  },
  methods: {
    chooseThis(index) {
      // 选择付款方式
      this.checked = index;
    },
    payFailCallback() { // 支付回调

    },

    async goNext() { // 支付
      // 支付前校验
      let vm = this;
      if (!this.$regex.phone.test(this.telPhone))  return this.$vux.alert.show({title: '溫馨提示',content: "請輸入正確手機號"})

      if (!this.money) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "請輸入充值金額"
        });
        return;
      }
      if (!this.payWay) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "請選擇付款方式"
        });
        return;
      }
      if (!this.warnChoose) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "請選擇確認即代表已同意《條款及細則》"
        });
        return;
      }
      // if (this.$client.right != 'staging') {
      //   let res = await this.$post('contribution/customerLogin',{ // 缴费前获取一下用户的customerId
      //     msisdn: this.telPhone
      //   })
      //   if (res.returnCode != 1000) return
      //   this.customerId = res.dataInfo.postpaid.customerId
      // }
      let param = {
        ...this.payType, // 通过p-layout-pay组件 结构出来两个值 payType、payPlatform
        // "payType": this.payWay.payType || this.payWay, // 支付方式 this.payWay是对象就是二维码支付
        // "payPlatform": this.payWay.payPlatform || this.$client.webview, // 支付平台  this.payWay是对象就是二维码支付
        "origin": this.$client.webview, // 订单来源
        paymentType: 2,
        "frontUrl":`#/contributionIndex/contributionSuccess`, // 回调地址
        "purchaseType":"5", // 购买商品方式0：纯商品 1:带机上台 2:集客上台 3：买机上台 4:旗舰机上台 5:缴费6:充值 7:现有客户买手机
        "totalAmount": (this.money-0)*100, // 支付金额
        "userInfo":{ // 用户信息
          "id": this.$client.userid, // 用户id
          "shopId": this.$client.shopid // 店铺id
        },
        "productInfo":[{ // 商品数组
          "skuId":"958964247737335810",
          "id":"958964244801069058",
          "productQty":1 // 购买数量
        }],
        "deliveryInfo":{ // 香港移动专用
          "logisticType":"1" //
        },
        "customerInfo":{ // 买家信息
        	"userId": this.customerId,
          "buyerPhone": this.telPhone, // 缴费的电话号码
        }
      }
      this.$refs.pay.createOrder(param)
    },

    OnlyNum(som) {
      // 校验数字
      let rev = /^\d+$/; // 只能输入数字
      if (som) {
        if (this.telPhone) {
          if (!rev.test(this.telPhone)) {
            this.telPhone = "";
            this.$vux.alert.show({
              title: "溫馨提示",
              content: "衹能輸入數字"
            });
          }
        }
      } else {
        if (this.money) {
          if (!rev.test(this.money)) {
            this.money = "";
            this.$vux.alert.show({
              title: "溫馨提示",
              content: "衹能輸入數字"
            });
          }
        }
      }
    },
    async checkPhone() { // 失去焦点时查询话费
      if(this.telPhone === '') return
      if (!this.$regex.phone.test(this.telPhone))  return this.$vux.alert.show({title: '溫馨提示',content: "請輸入正確手機號"})
      // if (this.telPhone.length !== 8) return this.$vux.alert.show({title: '溫馨提示',content: "请输入正确手机号"})
      if (this.$client.right !== 'staging') return // 如果不是工作台不执行
      let res = await this.$post('contribution/recharge',{'msisdn': this.telPhone})
      if (res.returnCode !== '1000') return
      this.accountbalance = res.dataInfo.accountbalance
      this.billDate = res.dataInfo.billDate
      this.customerId = res.dataInfo.customerId
    },

    getPayWay(val) {
      console.log(val);
      this.payWay = val;
    },

    async clickPop(res){ // 登入关闭 查询
      if (!res) return this.userShow = false
      if (res.iPhoneNo === '' || res.passWord === '') return
      this.telPhone = res.iPhoneNo
      this.userShow = false
       // 查询成功展示用户信息
      let balanceData = await this.$post('contribution/recharge',{msisdn: this.telPhone})
      if (balanceData.returnCode != '1000') return

      this.logined = true;
      this.accountbalance = balanceData.dataInfo.accountbalance
      this.billDate = balanceData.dataInfo.billDate

    },

    showLogin(){ // 打开
      this.userShow = true;
    },

    reloadLogined(){//重新登入
       this.userShow = true;
    },
    async shareFn() { // 分享方法
      let pageParam = {
        "userId": this.$client.userid,
        "packageType": 24,
        "orgId": this.$client.orgid
      }
      let res = await this.$post('contribution/package', pageParam) // 分享之前需要调用接口获取分享的参数
      if (res.returnCode !== '1000') return

      let resDate = res.records[0]
      let shareData = {

        shareTitle: resDate.shareTitle,
        shareDesc: resDate.shareDesc,
        shareImg: resDate.packageImg,
        shareLink: location.href.replace('staging', 'store').replace(/ios|android/ig, 'h5'), //分享出去都是店铺权限
      }
      this.$jb.js2webview({ type: 1, ...shareData})
    }
  }
};
</script>

<style lang = 'less' scoped>
.lable{
  display: inline-block;
  width: 1.2rem;
}
.iframe{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.content {
  background: url('../../../assets/images/jiaofei@2x.png');
  background-size: 100%;
}

.content-inputNumber {
  position: relative;
  width: 100%;
  color: #fff;
  padding: 0.1rem 0.4rem;
  h3 {
    font-size: 0.28rem;
    padding-bottom: 0.1rem;
  }
  .inputNumberCon {
    padding: 0.3rem;
    text-align: center;
    span {
      font-size: 0.44rem;
      margin-right: 0.1rem;
    }
  }
  .inputNumber {
    width: 2.5rem;
    height: 0.6rem;
    border: none;
    background:#81A500;
    border-radius: 3px;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
  }
  .inputNumberbottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    margin-top: 0.2rem;
    span {
      flex: 1;
      &:last-child {
        text-align: right;
      }
    }
  }
}

.content-inputMoney {
  position: relative;
  width: 100%;
  color: #fff;
  padding: 0.1rem 0.4rem;
  h3 {
    margin-top: 0.2rem;
    font-size: 0.28rem;
    padding-bottom: 0.1rem;
  }
  .inputMoneyCon {
    padding: 0.3rem;
    text-align: center;
    span {
      font-size: 0.44rem;
      margin-right: 0.1rem;
    }
  }
  .inputNumber {
    width: 2.5rem;
    height: 0.6rem;
    border: none;
    background: #81A500;
    border-radius: 3px;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
  }
}

.content-payWay {
  margin-top: 0.23rem;
  background: #fff;
  padding-left: 0.3rem;
  h3 {
    font-size: 0.28rem;
    color: #333;
    padding: 0.15rem 0;
    border-bottom: 1px solid #e9e9e9;
  }
  li {
    padding: 0.2rem 0;
    position: relative;
    font-size: 0.26rem;
    color: #666666;
    img {
      padding: 0.2rem;
      vertical-align: middle;
      border: 1px solid red;
    }
    &:nth-of-type(2n) {
      background: #fbfbfb;
    }
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 100px;
      border: 1px solid #d8d8d8;
      position: absolute;
      top: 50%;
      right: 5%;
      margin-top: -0.15rem;
      background: #fff;
    }
    .choose {
      border: 1px solid red;

    }
  }
  .checkAttention {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #333;
    background: #fff;
    position: relative;
    img {
      padding: 0.1rem;
      vertical-align: middle;
      border: 1px solid red;
    }
    &:after {
      content: "";
      width: 0.1rem;
      height: 0.22rem;
      border: 1px solid red;
      position: absolute;
      top: 50%;
      right: 6%;
      margin-top: -0.05rem;
    }
  }
}

.somWarn {
  font-size: 0.26rem;
  color: #666666;
  position: relative;
  padding: 0.23rem;
  .warnChoose {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 100px;
    border: 1px solid #d8d8d8;
    background: #fff;
    vertical-align: middle;
  }
  .choose {
    border: none;
    background: url('~@/assets/images/common_checkbox_selected@2x.png') center center no-repeat;
    background-size: cover;
  }
}

.payBtn {
  width: 100%;
  p {
    width: 80%;
    margin: 0 auto;
    padding: 0.2rem 0;
    text-align: center;
    font-size: 0.28rem;
    color: #ffffff;
    background: #ed008d;
    border-radius: 2px;
  }
}
.content-border {
  display: block;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.23);
}
.queryNum {
  width: 100%;
  font-size: 0.26rem;
  color: #666;
  background: #fff;
  margin:10px auto;
  .queryNumThin {
    text-align: center;
    padding: 0.2rem;
    p{
      margin: 0.2rem 0;
    }
  }
  .queryNumBtn {
    width: 50%;
    margin: 0 auto;
    padding:0.2rem 0;
    border-radius: 100px;
    font-size: 0.28rem;
    color: #E52C79;
    &.vp-1px{
      position: relative;
      &::before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 2px;
        border: 1px solid #E52C79;
        color: #E52C79;
        height: 200%;
        border-radius: 100px;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
    }
  }
  .queryNumThinLogined{
    font-size: 0.26rem;
    color: #333333;
    padding-left: 0.4rem;
    padding-right: 1.2rem;
    position: relative;
    >p{
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom:1px solid #eaeaea;
      overflow: hidden;
      &:last-of-type{
        border:none;
      }
    .fr{
      float: right;
    }
    }
  .reloadLogined{
    position: absolute;
    top: 25%;
    right: 0;
    padding: 0 0.1rem;
    font-size: 0.26rem;
    color: #333333;
    text-align: center;
    border-left: 1px solid #eaeaea;
    height: 1.5rem;
    img{
      vertical-align: middle;
      width: 50%;
      margin-top: 0.2rem;
    }
    p{
      margin-top: 0.1rem;
    }
  }
  }
}
</style>
