<template>
  <div>
    <vp-layout-page>
      <vp-result-handle :list="resultList" title="帶機上台">
        <div class="btns">
          <div class="btn">
            <vp-button :content="backTips" :radius="true" height="0.8rem" @click="back"></vp-button>
          </div>
          <div class="btn">
            <vp-button :content="goAheadTips" :radius="true" styleClass="hollow" height="0.8rem" @click="goAhead"></vp-button>
          </div>
        </div>
        <div class="printBtn">
          <div class="first">列印合約</div>
          <span class="kong"></span>
          <div class="sec">列印收據</div>
        </div>
        <div class="oneKeyPrint">一鍵列印</div>
      </vp-result-handle>
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import { vpResultHandle } from "@/components";
import { timeFormat, formatDateTime } from "@/utils/timeFormat";
export default {
  components: { vpResultHandle },
  data() {
    return {
      resultList: [
        // { name: "上台號碼", value: 9848465 },
        // { name: "服務計劃", value: "4.5G全速本地服務計劃6GB" },
        // { name: "支付金額", value: "HK$110.0" },
        // { name: "上台時間", value: "2018-3-16 10:00:00" }
      ],
      backTips: "返回工作台",
      goAheadTips: "繼續辦理",
      orderDetail: {},
    };
  },
  created() {
    this.getDetail()
    // this.calPayInfo = this.$session.get("calPayInfo");
    if (this.$client.right == "staging") {
      //店铺
      this.backTips = "返回工作台";
    } else {
      //工作台
      this.backTips = "返回店鋪";
    }

    if (
      this.orderDetail.purchaseType == "1" ||
      this.orderDetail.purchaseType == "2"
    ) {
      //集客上台或者带机上台
      this.goAheadTips = "繼續辦理";
    }

    if (
      this.orderDetail.purchaseType == "3" ||
      this.orderDetail.purchaseType == "4"
    ) {
      //新客上台或者旗舰机上台
      this.goAheadTips = "查看訂單";
    }
  },
  methods: {

    async getDetail() { // 获取详情信息
      let param = {
        isQueryAfterPay: true,
        mainOrderId:this.$route.query.orderId
      }
      let res = await this.$post('order/detail', param)
      if (res.returnCode != '1000') return
      this.orderDetail = res.dataInfo
      console.log(res.dataInfo)
      this.resultList.push({
        name: "上台號碼",
        value: res.dataInfo.businessPhone
      })
      this.resultList.push({
        name: "服務計劃",
        value: res.dataInfo.orderItemList[0].productName
      });
      this.resultList.push({
        name: "支付金額",
        value: this.filterPrice(res.dataInfo.paymentAmount)
      });
      this.resultList.push({
        name: "上台時間",
        value: this.fiterTime(res.dataInfo.postTime)
      });
    },
    fiterTime(val) { // 时间过滤
      if (!val) return null
      var d = new Date(val-0);
      var year = d.getFullYear();
      var month = d.getMonth() + 1
      if (month < 10) month = '0' + month
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      if (day < 10) day = day
      var hour = d.getHours();
      if (hour < 10) hour = '0' + hour
      var minutes = d.getMinutes();
      if (minutes < 10)  minutes = '0' + minutes
      var seconds = d.getSeconds();
      if (seconds <10) seconds = '0' + seconds
      return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds 
    },
    filterPrice(value) {
      //价格过滤器 格式 20.00
      if (!value) return "$0.00";
      return `Hk$${(value / 100).toFixed(2)}`;
    },
    back() {
      if (this.$client.webview == 3) {
         this.$router.push({path: '/store/home'})
      } else {
        this.$jb.js2webview({ type: 2 });
      }
    },
    goAhead() {
      if (
        this.orderDetail.purchaseType == "1" ||
        this.orderDetail.purchaseType == "2"
      ) {
        //集客上台或者带机上台
        this.$router.push ({
          name: "baseInfo",
          query: {
            businessType: "1"
          }
        });
      }

      if (
        this.orderDetail.purchaseType == "3" ||
        this.orderDetail.purchaseType == "4"
      ) {
        //新客上台或者旗舰机上台
        this.$router.push({
          name: "mineOrderList"
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    //退出路由时，统一清除所有缓存
    //清除保存基本资料页面缓存的选中的服务计划
    this.$session.remove("ChoosePlan");
    //清除保存基本资料页面缓存的选中的手机号码
    this.$session.remove("ChooseNum");
    //清除缓存的联络地址
    this.$session.remove("address-contact");
    //清除缓存的上台登记地址
    this.$session.remove("address-business");
    //清除缓存的内地服务计划
    this.$session.remove("ChoosePlanLand");
    //清除缓存的中国号码
    this.$session.remove("ChinaPhone");
    //清除缓存的澳门号码
    this.$session.remove("aomenPhone");
    //清除换粗的内地号码
    this.$session.remove("inlandPhone");
    //清除换存的送货地址
    this.$session.remove("address-deliver");
    //清除缓存的优惠信息
    this.$session.remove("discountInfoList");
    //清除支付信息缓存
    this.$session.remove("calPayInfo");
    window.sessionStorage.clear()
    next(true);
  }
};
</script>
<style lang = 'less' scoped>
.btns {
  width: 100%;
  margin-top: 0.7rem;
  text-align: center;
  .btn {
    display: inline-block;
    width: 3.1rem;
    &:first-child {
      margin-right: 0.2rem;
    }
  }
}
.printBtn {
  height: 0.56rem;
  width: 100%;
  display: flex;
  padding: 0 0.54rem;
  margin-top: 0.84rem;
  font-size: 0.24rem;
  /* background: #FAFAFA; */
  .kong{
    display: block;
    width: 0.3rem;
  }
  div {
    flex: 1;
    border: 1px solid #8cc235;
    text-align: center;
    line-height: 0.56rem;
  }
  div.first {
    background: #8cc235;
    color: #fff;
  }
  div.sec {
    color: #8cc235;
    background: #fff;
  }
}
.oneKeyPrint {
  margin-top: 0.2rem;
  text-align: center;
  line-height: 0.64rem;
  color: #333333;
  text-decoration: underline;
  /* background: #FAFAFA; */
}
</style>
