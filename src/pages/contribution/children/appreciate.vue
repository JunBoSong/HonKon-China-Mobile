<template>
    <vp-layout-page>
        <div class="content-inputNumber">
            <h3>請輸入增值電話號碼</h3>
            <div class="inputNumberCon">
                <p>
                    <span>+852</span>
                    <input type="tel" ref="inputNumber" maxlength="11" class="inputNumber" v-model.trim="telPhone" v-keyBoard @keyup="OnlyNum" @blur="checkPhone">
                </p>
            </div>
            <div class="inputNumberbottom" v-if="$client.right == 'staging'">
                <span>賬戶餘額：{{balance | filterPrice}}</span>
                <!-- <span>繳款到期日：2017-09-19</span> -->
            </div>
        </div>
        <h3 class="chooseList-title">請選擇增值金額：</h3>
        <div class="chooseList">
            <div class="chooseThin" :class="{choosed: item.id == comboId, margin : (index+1)%3 != 0}" v-for="(item,index) in chooseList" @click="clickThis(item)" :key="index">
                <p class="chooseThin-item">{{item.payAmt | filterPrice}}</p>
                <!-- <p>儲值額：{{item.rechargeAmt | filterPrice}}</p> -->
            </div>
        </div>
        <h3 class="chooseList-money">您將獲得儲值金額：<span class="money">{{rechargeAmt | filterPrice}}</span></h3>
        <div :class="[type == 2?'queryNum':'']">
            <div class="queryNumThin" v-if="$client.right !== 'staging' && !logined">
              <p>可能你還需要以下服務</p>
              <div class="queryNumBtn vp-1px " @click="showLogin">查詢賬戶餘額</div>
            </div>
            <div class="queryNumThinLogined" v-if="$client.right !== 'staging' && logined">
              <div class="vux-1px-b phone">
                <span>電話號碼</span>
                <span class="fr">{{queryPhone}}　</span>
              </div>
              <div  class="phone">
                <span>賬戶餘額</span>
                <span class="fr">{{queryBalance | filterPrice}}　</span>
              </div>
              <div class="reloadLogined vux-1px-l" @click="reloadLogined">
                <img v-lazy="{src: require('@/assets/images/payment_login@2x.png'), error: 'http://placehold.it/10x10', loading: 'http://placehold.it/10x10'}" >
                 <p>重新登入</p>
              </div>
            </div>
           <div class="somTips" v-html="treaties">
            <!-- <p>每次增值額最少為$50及上限為$1000。</p>
            <p>每張儲值卡之指定網上增值方式增值上限為每月$3000。</p>
            <p>增值金額預計15分鐘到達儲值卡賬戶。</p> -->
          </div>
        </div>
       <!-- <vpInputRadioRules></vpInputRadioRules> -->
        <vp-input-radio-pay v-model="payType"   @input="getPayWay"/>
        <vpInputRadioRules v-model="warnChoose"></vpInputRadioRules>
        <div class="payBtn" slot="footer">
          <vp-button content="立即增值" @click.native="goNext"></vp-button>
        </div>
        <vp-popup-login :isAppreciation='true' :userShow="userShow" @clickPop="clickPop" @getCode="getCode"></vp-popup-login>

        <vp-layout-pay ref="pay" @on-fail="payFailCallback"></vp-layout-pay>
    </vp-layout-page>
</template>

<script>
import { vpInputRadio, vpInputRadioPay, vpButton,vpPopupLogin,vpInputRadioRules, vpLayoutPay } from "@/components";
import { Popup } from 'vux'
export default {
  components: {
    vpInputRadio,
    vpInputRadioPay,
    vpButton,
    vpPopupLogin,
    vpLayoutPay,
    vpInputRadioRules,
    Popup,
  },
  data() {
    return {
      chooseList: [],
      checked: null,
      warnChoose: false,
      telPhone: '', // 电话号码
      queryPhone: null, // 查询电话号码
      queryBalance: null, // 查询余额
      payWay: null, // 支付方式
      payType: {}, // 支付方式
      type: 2, // type 1 工作台  2 店铺
      userShow:false,
      logined:false,
      balance: 0, // 账户余额
      orderId: null, // 订单id
      comboId: null, // 套餐id
      totalAmount: null, // 增值金额
      rechargeAmt: null, // 储值金额
      treaties: null // 提示语
    };
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})})
    this.getCombo()
    this.getTreaties()
  },
  mounted() {
    if (this.$client.right !== 'staging') {
      console.log(this.$client.right !== 'staging')
    }
  },
  methods: {
    clickThis(item) { // 选择增值额
      console.log(item)
      this.comboId = item.id;
      this.totalAmount = item.payAmt
      this.rechargeAmt = item.rechargeAmt
    },
    async getCombo() { // 获取增值金额
      let pageParam = {
        userId: this.$client.userid,
        packageType: "5",
        orgId: this.$client.orgid
      }
      let res = await this.$post('contribution/package', pageParam)
      if (res.returnCode !== '1000') return

      let queryParam = {
        packageId:res.records[0].id,
        // "packageId":"959318125821874176",
        userId:this.$client.userid,
        orgId: this.$client.orgid
      }
      let data = await this.$post('contribution/query',queryParam)
      if (data.returnCode !== '1000' || data.dataInfo.businessList === null) return
      this.chooseList = data.dataInfo.businessList
      if (this.$client.right === 'staging') return // 如果是工作台不分享
      let resDate = res.records[0]  // 分享参数
      let shareData = {
        shareTitle: resDate.shareTitle,
        shareDesc: resDate.shareDesc,
        shareImg: resDate.packageImg,
        shareLink: location.href.replace('staging', 'store').replace(/ios|android/ig, 'h5'), //分享出去都是店铺权限
      }
      this.$jb.js2webview({ type: 1, ...shareData})
    },

    getPayWay(val) { //选择支付方式
      console.log('支付方式', val);
      this.payWay = val;
    },

    async goNext() { // 付款
      //下一步
      if (!this.telPhone)
        return this.$vux.alert.show({ title: "溫馨提示", content: "請輸入電話號碼" });
      if (this.comboId == null)
        return this.$vux.alert.show({ title: "溫馨提示", content: "請選擇套餐" });
      if (this.payWay == null)
        return this.$vux.alert.show({ title: "溫馨提示", content: "請選擇付款方式" });
      if (!this.warnChoose)
        return this.$vux.alert.show({
          title: "溫馨提示",
          content: "請選擇確認即代表已同意《條款及細則》"
        });
        this.payFn()
    },

    payFailCallback() { // 支付完成的回调

    },

    OnlyNum() {
      // 校验数字
      let rev = /^\d+$/; // 只能输入数字
      if (this.telPhone) {
        if (!rev.test(this.telPhone)) {
          this.telPhone = "";
          this.$vux.alert.show({
            title: "溫馨提示",
            content: "衹能輸入數字"
          });
        }
      }
    },

    async getCode(res) { // 获取验证码
      let param = {
        phoneNo: res.iPhoneNo
      }
      this.$post('contribution/sendCode',param)
    },

    async checkPhone() { // 查询账户余额
      if (this.telPhone.length == '') return
      if (!this.$regex.phone.test(this.telPhone))  return this.$vux.alert.show({title: '溫馨提示',content: "請輸入正確手機號"})
      if (this.$client.right !== 'staging') return // 如果不是工作台不执行
      if (this.telPhone === null || this.telPhone === '') return
      let res = await this.$post('contribution/msisdnCurrentInfo', {'msisdn': this.telPhone})
      if (res.returnCode !== '1000') return
      res.dataInfo.forEach(item => {
        this.balance += Number(item.balance)
      });
      // this.balance = res.dataInfo[0].balance
    },

    async clickPop(res){ // 登入
      console.log(res)
      if (!res) return this.userShow = false
      // debugger
      if (res.iPhoneNo === '' || res.passWord === '') return
      this.telPhone = res.iPhoneNo;
      let balanceData = await this.$post('contribution/prepaidBalanceInfoBySMS', {
        msisdn: res.iPhoneNo,
        code: res.smsCode
      })
      console.log(balanceData.returnCode != '1000')
      // debugger
     if (balanceData.returnCode != '1000') return
     this.queryBalance = balanceData.dataInfo[0].balance
     this.queryPhone = res.iPhoneNo
     this.userShow = false;
     this.logined = true;
    },

    showLogin(){ // 打开
      this.userShow = true;
    },

    reloadLogined(){//重新登入
       this.userShow = true;
    },

    payFn() { // 支付方法
      if (!this.$regex.phone.test(this.telPhone))  return this.$vux.alert.show({title: '溫馨提示',content: "請輸入正確手機號"})

      let param = {
        ...this.payType, // 通过p-layout-pay组件 结构出来两个值 payType、payPlatform
        // "payPlatform": this.$client.webview, // 支付平台
        "origin": this.$client.webview, // 订单来源
         paymentType: 1,
        totalAmount: this.totalAmount, // 支付金额
        rechargeAmount: this.rechargeAmt, // 储值金额
        "frontUrl":`#/contributionIndex/appreciateSuccess`, // 回调地址
        "appId":10000188, // appid
        "purchaseType":"6", // 购买商品方式0：纯商品 1:带机上台 2:集客上台 3：买机上台 4:旗舰机上台 5:缴费6:充值 7:现有客户买手机
        "userInfo":{ // 用户信息
          "id": this.$client.userid, // 用户id
          "shopId": this.$client.shopid // 店铺id
        },
        "productInfo":[{ // 商品数组
          "skuId":this.comboId,
          "id": this.comboId,
          "productQty":1 // 购买数量
        }],
        "deliveryInfo":{ // 香港移动专用
          "logisticType":"1" //
        },
        "customerInfo":{ // 买家信息
        	"userId": this.$client.userid,
          "buyerPhone": this.telPhone, // 缴费的电话号码
        }
      }
      this.$refs.pay.createOrder(param)
    },

    async getTreaties() {
      let res = await this.$post("hint/detail", {
          code: 'increment_notice'
      });
      if (res.returnCode != 1000) return
      this.treaties = res.dataInfo.content;
    }
  }
};
</script>


<style lang="less" scoped>
@import '~@/assets/less/theme.less';
@import "~vux/src/styles/1px.less";
.content-inputNumber {
  position: relative;
  width: 100%;
  // background: url("../../../assets/images/work_bg_img1.png") no-repeat center;
  // background: #B2E111;
  background: url('../../../assets/images/zengzhi@2x.png') no-repeat;
  background-size: 100%;
  // background-size: cover;

  color: #fff;
  padding: 0.1rem 0.44rem;
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
    background:#6F8E00;
    opacity: 0.5;
    border-radius: 3px;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
  }
  .inputNumberbottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    span {
      flex: 1; // &:last-child {
      //     text-align: right
      // }
    }
  }
}
.chooseList-title{
  font-size: 0.28rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.28rem;
  background: #fff;
  padding: 0.4rem 0.44rem;
}
.chooseList-money{
  padding: 0.1rem 0.44rem;
  background: #fff;
  font-size: 0.28rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.28rem;
  .money{
    color: #E52C79;
    letter-spacing: 0;
  }
}
.margin{
  margin-right: 3.5%;
}
.chooseList {
  width: 100%;
  overflow: hidden;
  padding: 0 0.44rem;
  font-size: 0.24rem;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .chooseThin {
    margin-bottom: 0.3rem;
    height: 0.8rem;
    width: 31%;
    border: 1px solid #B8B8B8;
    border-radius: 3px;
    .chooseThin-item{
      text-align: center;

      line-height: 0.8rem;
    }
  }
  .choosed {
    border: 1px solid #ef0093;
    border-radius: 3px;
    color: #ef0093;
  }
}

.somTips {
  font-size: 0.22rem;
  color: #888888;
  padding: 0.2rem 0.2rem 0.2rem 0.5rem;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 2%;
    top: 15%;
    width: 12px;
    height: 12px;
    background: url("../../../assets/images/all_notice@2x.png") no-repeat center;
    background-size: cover;
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
.queryNum {
  width: 100%;
  font-size: 0.26rem;
  color: #666;
  background: #fff;
  margin-bottom:10px;
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
    // border: 1px solid #f01095;
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
    .phone{
      height: 0.8rem;
      line-height: 0.8rem;
      // border-bottom:1px solid #eaeaea;
      &.vux-1px-b{
        &:after {
            .setBottomLine(#ededed);
          }
      }
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
    top: 15%;
    right: 0;
    padding: 0 0.1rem;
    font-size: 0.22rem;
    color: #333333;
    text-align: center;
    height: 1.2rem;
    &.vux-1px-l {
      &:before {
        .setLeftLine(#ededed);
      }
    }
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

