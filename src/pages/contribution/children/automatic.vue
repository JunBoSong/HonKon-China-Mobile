<template>
    <vp-layout-page>
        <section class="automatic">
       <div class="panel-title">
         <img v-lazy="{src: require('@/assets/images/work_card@2x.png'), error: 'http://placehold.it/10x10', loading: 'http://placehold.it/10x10'}">
         <span>信用卡信息</span>
       </div>
       <vpInputRadio v-model="cardInfo.cardType" class="vpInputRadio" :list="handleData" label="信用卡銀行"/>
       <vpInputMessage class="vpInputMessage" labelWidth='1.3rem' v-model.trim="cardInfo.cardNo" label="卡號　　" type='number' lebel-width='2rem' placeholder="請輸入信用卡卡號"/>
       <vpInputMessage class="vpInputMessage" labelWidth='1.3rem' v-model.trim="cardInfo.goodThur" label="有效期　" type='number' placeholder="請輸入有效期（MM/YY）"/>
       <vpInputMessage class="vpInputMessage" labelWidth='1.3rem' v-model.trim="cardInfo.ccv2" label="cvv2" type='number' placeholder="請輸入卡背面簽名區域最後3位數字"/>
       <vpInputMessage class="vpInputMessage" labelWidth='1.3rem' v-model.trim="cardInfo.cardholderName" label="用戶姓名" placeholder="請輸入信用卡用戶姓名（與身份證一致）"/>
     </section>
     <div class="payBtn" @click="dredge">
      <p>確認申請</p>
    </div>
    </vp-layout-page>
</template>
<script>
import {
  vpHeaderSort,
  vpButton,
  vpUpdateImg,
  vpInputRadio,
  vpInputMessage
} from "@/components";

export default {
  components: {
    vpHeaderSort,
    vpButton,
    vpUpdateImg,
    vpInputRadio,
    vpInputMessage
  },
  data() {
    return {
      handleData: [
        {
          name: "VISA",
          value: "VISA"
        },
        {
          name: "MASTER",
          value: "MASTER"
        }
      ],
      value:'中過獎',
      cardInfo: {
        customerId: this.$client.userid,
        cardType: null, // 信用卡类型， MASTER or VISA
        cardNo: '', //信用卡账号
        goodThur: '', // 信用卡有效期，格式：MMYY
        ccv2: '', // 信用卡CVV2信息
        cardholderName: '', // 信用卡持有者姓名
      }
    };
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
  },
  methods: {
    async dredge() {
      if (!this.cardInfo.cardType) return this.$vux.toast.show({text: '請選擇信用卡類型',type:'text'})
      if (this.cardInfo.cardNo === '') return this.$vux.toast.show({text: '請輸入信用卡號',type:'text'})
      if (this.cardInfo.goodThur === '') return this.$vux.toast.show({text: '請輸入有效時間',type:'text'})
      // if (Number.isInteger(this.cardInfo.cardNo -0)&& this.cardInfo.cardNo.length === 16) return this.$vux.toast.show({text: '请输入正确的卡号',type:'text'})
      if (this.cardInfo.cardholderName === '') return this.$vux.toast.show({text: '請輸入卡持有者姓名',type:'text'})
      let param = {
        userId: this.$route.query.buyerid,
        customerId: this.$client.userid,
        ...this.cardInfo
      }
      // let data = { // 测试数据
      //   "customerId":"5993599",
      //   "cardholderName":"yangqiz",
      //   "cardType":"VISA",
      //   "cardNo":"4693803346873533",
      //   "goodThur":"0919"
      // }
      let res = await this.$post('recharge/autopaySubmit', param)
      if (res && res.returnCode != '1000') return

      // sessionStorage.setItem('cardInfo', JSON.stringify(this.cardInfo))
      this.$router.push({path: '/contract/contractCont', query: {registerId: res.dataInfo.registerId, phoneNo: this.$route.query.phone, contractFlagList:[2]}})

    }
  }
};
</script>

<style lang = 'less' scoped>
section {
  margin-top: 0.22rem;
  background: white;
  padding-bottom: 0.3rem;
}
.flow-message {
  width: 100%;
}
.vpInputRadio {
  padding: 0 @page-space;
}
.vpInputMessage {
  padding: 0 @page-space;
}
.payBtn {
  margin: 0.5rem auto;
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
</style>
