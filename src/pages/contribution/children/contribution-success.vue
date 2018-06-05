<template>
    <vp-layout-page>
        <vp-result-handle :title="title" :list="[{ name: '繳費號碼',value: payInfo.buyerPhone},{ name: '繳費金額',value: `HK$${((payInfo.paymentAmount || 0)/100).toFixed(2)}`},{ name: '付款時間',value: fiterTime(payInfo.postTime)}]">
           <div class="wrap">
             <p class="tips"> 為了方便您使用，建議開通信用卡自動繳費</p>
              <div class="success-bottom">
                    <div class="success-back btn" @click="goOn(1)">開通信用卡自動繳費</div>
                    <div class="success-goOn btn" v-if="($client.webview == '1' || $client.webview == '2') && $client.right == 'staging'" @click="print(2)">列印收據</div>
              </div>
              <div class="success-go" @click="goBack(3)">不辦理，{{this.back()}}</div>
           </div>

        </vp-result-handle>
    </vp-layout-page>
</template>

<script>
import { vpResultHandle } from "@/components";
import rulParse from '@/utils/urlParse'
export default {
  components: {
    vpResultHandle
  },
  data() {
    return {
      title: "缴费",
      list: [
        {
          name: "繳費號碼",
          value: "95184156"
        },
        {
          name: "繳費金額",
          value: "HK$110.0"
        },
        {
          name: "增值金額",
          value: "HK$110.0"
        },
        {
          name: "付款時間",
          value: "2017-07-27 19:30:00"
        }
      ],
      payInfo: {} // 订单信息
    };
  },
  created() {
    // alert(1)
    this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({ type: 2})})
    this.getOrderInfo()
  },
  methods: {
    goOn() { // 开通银行卡自动续费
      this.$router.push({ path: "automatic", query: {phone: this.payInfo.buyerPhone, buyerid: this.payInfo.buyerId}});
    },
    goBack() {
      if (this.$client.webview == 1 || this.$client.webview == 2) {
        // this.$jb.webview2js((params) => {type == 1 && this.$jb.js2webview({type: 2})})
        this.$jb.js2webview({ type: 2}) // 关闭webview
      } else {
        this.$router.push({path: '/store/home'})
      }
    },
    async getOrderInfo() {
      let urlData = rulParse('href') // 获取url上的参数  通过out_trade_no查询订单信息
      let res = await this.$post('order/businessOrderInfo', {orderRef: urlData.out_trade_no})
      if (res.returnCode !== '1000') return 
      this.payInfo = res.dataInfo
    },
    print() { // 打印收据
      this.$vux.confirm.show({
        title: '提示',
        content: '打印可能需要一段時間請確認是否列印',
        confirmText: '繼續列印',
        onConfirm() {
          this.$jb.js2webview({type: 3,printType: 2})
        }
      })
    },
    fiterTime(val) { // 时间过滤
      if (!val) return null
      var d = new Date(val-0);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      if (month < 10) month = '0' + month
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      if (day < 10) day =  day
      var hour = d.getHours();
      if (hour < 10) hour = '0' + hour
      var minutes = d.getMinutes();
      if (minutes < 10)  minutes = '0' + minutes
      var seconds = d.getSeconds();
      if (seconds <10) seconds = '0' + seconds
      return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds 
    },
    back() {
      if (this.$client.right === 'staging') {
        if(this.$client.webview == 3) {
          return '返回商店'
        }
        return '返回工作臺'
      } else {
        return '返回商店'
      }
    }
  }
};
</script>

<style lang="less" scoped>
 @import '~@/assets/less/theme.less';
 .wrap{
  // background: @theme-bg;
  // width: 90%;
  padding: 0rem 5% 0 5%;
  margin: 0 auto ;
 }
.success-bottom {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  .btn{
    flex: 1;
  }
  div {
    border: 1px solid #e22777;
    border-radius: 2px;
    width: 3.1rem;
    padding: 0.2rem 0;
    margin: 0.1rem;
    font-size: 0.28rem;
  }
  .success-back {
    background: #ed008d;
    color: #fff;
  }
  .success-goOn {
    color: #e22777;
  }
}
.tips {
  font-size: 0.22rem;
  color: #999999;
  margin: 0.2rem 0 0.3rem 0;
  img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
  }
}
.success-go{
  position: relative;
  left: 50%;
  margin-top:  0.2rem;
  transform: translateX(-50%);
  margin-bottom: 0.3rem;
  display: inline-block;
  font-size: 0.24rem;
  color: #666;
  text-align: center;
  border-bottom: 1px solid #666;
}
</style>
