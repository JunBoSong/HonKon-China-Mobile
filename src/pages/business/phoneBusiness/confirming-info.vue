<template>
  <div>
    <vp-layout-page>
      <vpFlowStatus :page='3'></vpFlowStatus>
      <!-- 上台信息 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/work_contract@2x.png')">
          <span>上台詳情</span>
        </div>
        <!-- 个人资料 -->
        <div class="cell">
          <span class="title">電話號碼</span>
          <span class="subTitle">{{allInfo.phoneNo}}</span>
        </div>
        <div class="cell">
          <span class="title">服務計劃</span>
          <span class="subTitle">{{allInfo.businessPlanName}}</span>
        </div>
        <div class="cell">
          <span class="title">合約期</span>
          <span class="subTitle">{{allInfo.contractPeriod}}个月</span>
        </div>
        <div class="cell">
          <span class="title">個人資料</span>
          <span class="subTitle">{{allInfo.customerInfo && allInfo.customerInfo.firstName + allInfo.customerInfo && allInfo.customerInfo.lastName }}{{allInfo.customerInfo && allInfo.customerInfo.gender=='1'?'先生':'小姐'}}</span>
        </div>
        <div class="cell">
          <span class="title"></span>
          <span class="subTitle">{{allInfo.customerInfo && allInfo.customerInfo.certificateCode }}</span>
        </div>
        <div class="cell">
          <span class="title"></span>
          <span class="subTitle">{{allInfo.customerInfo &&  allInfo.customerInfo.birthday |formatDateTime}}</span>
        </div>
        <div class="cell">
          <span class="title"></span>
          <span class="subTitle">{{ allInfo.customerInfo && allInfo.customerInfo.contactNumber }}</span>
        </div>
        <div class="cell">
          <span class="title"></span>
          <span class="subTitle">{{allInfo.customerInfo && allInfo.customerInfo.email }}</span>
        </div>
        <div class="cell">
          <span class="title">上台登記地址</span>
          <span class="subTitle">{{loginAddress }}</span>
        </div>
        <!-- 办理方式 -->
        <div class="cell">
          <span class="title">辦理方式</span>
          <span class="subTitle">{{ transactTypeStr}}</span>
        </div>
        <div class="cell" v-if="allInfo.transactType == '1'">
          <span class="title">ICCID</span>
          <span class="subTitle">{{ allInfo.newIccid}}</span>
        </div>
        <div class="cell" v-if="allInfo.transactType == '2'">
          <span class="title">送貨地址</span>
          <span class="subTitle">{{deliverAddrInfoStr}}</span>
        </div>
        <div class="cell" v-if="allInfo.transactType == '3'">
          <span class="title">取貨區域&地區</span>
          <span class="subTitle">{{ allInfo.takeRegion }}</span>
        </div>
        <div class="cell" v-if="allInfo.transactType == '3'">
          <span class="title">取貨門市</span>
          <span class="subTitle"> {{allInfo.takeOrg}}</span>
        </div>
        <!-- 已选VAS -->
        <div class="cell" v-for="(item,index) in allVasInfo" :key="item">
          <span class="title">{{index==0?'已選VAS':''}}</span>
          <span class="subTitle"> {{item}}</span>
        </div>
        <!-- 已选优惠 -->
        <div class="cell" v-for="(item,index) in allDiscount" :key="item">
          <span class="title">{{index==0?'已選優惠':''}}</span>
          <span class="subTitle"> {{item}}</span>
        </div>

        <div class="cell">
          <span class="title">服務生效日期</span>
          <span class="subTitle">{{allInfo.effectDate | formatDateTime}}</span>
        </div>
        <!-- 中国漫游话音信息 -->
        <div class="cell" v-if="allInfo.roamingVoiceInfo">
          <span class="title">内地號碼</span>
          <span class="subTitle"> {{allInfo.roamingVoiceInfo.cnPhoneNo}}</span>
        </div>

        <div class="cell" v-if="allInfo.roamingVoiceInfo">
          <span class="title">内地服務計劃</span>
          <span class="subTitle"> {{allInfo.roamingVoiceInfo.cnPlanId}}</span>
        </div>
        <!-- 新号码上台资料 -->
        <div class="cell">
          <span class="title">sms語言設定</span>
          <span class="subTitle"> {{allInfo.billLang == '1'?'中文':'英文'}}</span>
        </div>

        <div class="cell">
          <span class="title">開啓IDD服務</span>
          <span class="subTitle"> {{allInfo.openIdd == '1'?'是':'否'}}</span>
        </div>

        <div class="cell">
          <span class="title">缴费方式</span>
          <span class="subTitle"> {{allInfo.debitType == '1'?'信用卡自動轉賬':'其他方式'}}</span>
        </div>

        <div class="cell">
          <span class="title">IDD缴费方式</span>
          <span class="subTitle"> {{allInfo.iddPayType == '1'?'信用卡自動轉賬':'押金'}}</span>
        </div>

        <div class="cell">
          <span class="title">接受服務計劃自動續約</span>
          <span class="subTitle"> {{allInfo.autoPay == '1'?'是':'否'}}</span>
        </div>

        <div class="cell">
          <span class="title">是否接受中國香港移動推廣信息</span>
          <span class="subTitle"> {{allInfo.acceptCMHKPromotion == '1'?'是':'否'}}</span>
        </div>

        <div class="cell">
          <span class="title">接收非中國香港移動推廣信息</span>
          <span class="subTitle"> {{allInfo.acceptOtherPromotion == '1'?'是':'否'}}</span>
        </div>
        <!-- 信用卡信息 -->
        <div v-if="allInfo.creditInfo">
          <div class="cell">
            <span class="title">信用卡銀行類型</span>
            <span class="subTitle"> {{allInfo.creditInfo.creditType == '1'?'VASA':'MASTER'}}</span>
          </div>
          <div class="cell">
            <span class="title">信用卡卡號</span>
            <span class="subTitle"> {{allInfo.creditInfo.creditCode}}</span>
          </div>
          <div class="cell">
            <span class="title">信用卡有效期</span>
            <span class="subTitle"> {{allInfo.creditInfo.creditEffectDate}}</span>
          </div>
          <div class="cell">
            <span class="title">CVV2(信用卡背面簽名區域最後3位數字)</span>
            <span class="subTitle"> {{allInfo.creditInfo.creditCvv}}</span>
          </div>
          <div class="cell">
            <span class="title">信用卡用戶姓名</span>
            <span class="subTitle"> {{allInfo.creditInfo.creditUserName}}</span>
          </div>
        </div>
      </section>

      <!-- 支付明细 -->
      <section v-if="allInfo.paymentDetail">
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_pay@3x.png')">
          <span>支付明細</span>
        </div>
        <!-- <div class="cell">
          <span class="title">手机上台价</span>
          <span class="subTitle">{{calPayInfo.paymentDetail.handsetPrice | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">旗舰机上台预缴费用</span>
          <span class="subTitle">{{calPayInfo.paymentDetail.prepaidFee | filterPrice}}</span>
        </div> -->
        <div class="cell">
          <span class="title">月費</span>
          <span class="subTitle">{{allInfo.paymentDetail.monthFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">行政費</span>
          <span class="subTitle">{{allInfo.paymentDetail.adminFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">增值服務優惠</span>
          <span class="subTitle">{{allInfo.paymentDetail.vasFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">上台按金</span>
          <span class="subTitle">{{allInfo.paymentDetail.openDepositFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">IDD 按金</span>
          <span class="subTitle">{{allInfo.paymentDetail.iddDepositFee | filterPrice}}</span>
        </div>
        <!-- <div class="cell">
          <span class="title">優惠</span>
          <span class="subTitle">{{allInfo.paymentDetail.discountFee | filterPrice}}</span>
        </div> -->
        <div class="cell">
          <span class="title">總計</span>
          <span class="subTitle">{{allInfo.paymentDetail && allInfo.paymentDetail.totalFee | filterPrice}}</span>
        </div>
      </section>
      <!-- 底部按钮 -->
      <div class="page-btns" slot="footer">
        <vp-button content="確認簽約" @click.native="next"></vp-button>
      </div>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import { Cell, Group } from "vux";
import {
  vpHeaderSort,
  vpButton,
  vpUpdateImg,
  vpInputRadio,
  vpFlowStatus
} from "@/components";
export default {
  components: {
    vpHeaderSort,
    vpButton,
    vpUpdateImg,
    vpInputRadio,
    Cell,
    Group,
    vpFlowStatus
  },
  data() {
    return {
      value: "",
      deliverParams: {},
      allInfo: {},
      loginAddress: "", //上台登记地址
      transactTypeStr: "", //办理方式说明
      deliverAddrInfoStr: "",
      allVasInfo: [],
      allDiscount: []
    };
  },
  created() {
    this.deliverParams = this.$route.query;
    this.callPay();
  },
  methods: {
    async callPay() {

      let params = {
        id: this.deliverParams.orderId
      };
      Object.assign(params, {
        userId: this.$client.userid
      });

      const res = await this.$post("business/calPay", params); // 獲取之前存儲的信息
      if (res.returnCode != 1000) return that.$vux.toast.text(res.message);
      console.log(res.dataInfo)
      if (res && res.returnCode == 1000) {
        debugger
        this.allInfo = res.dataInfo;
        console.log(this.allInfo.phoneNo)
        this.handleInfo();
        //缓存 所有信息待支付页面使用
        this.$session.set("order_no", this.$route.query);
        this.$session.set("calPayInfo", res.dataInfo);
      }
    },
    handleInfo() {
      this.loginAddress = this.getAddressString(
        this.allInfo.customerInfo.addressInfo
      );
      if (this.allInfo.transactType == "1") {
        this.transactTypeStr = "现场开台";
      } else if (this.allInfo.transactType == "2") {
        this.transactTypeStr = "送货上门";
        this.deliverAddrInfoStr = this.getAddressString(
          this.allInfo.deliverAddrInfo
        );
      } else {
        this.transactTypeStr = "门市取货";
      }
      //测试数据，记得删
      // this.allInfo.freeVasInfoList = [
      //       {
      //           "vasType": "2",
      //           "vasSubType": "2",
      //           "vasName": "基本語音留言訊箱服務 月費$18",
      //           "vasCode": "123496",
      //           "vasAmount": "1800",
      //           "vasDesc": null
      //       },
      //       {
      //           "vasType": "2",
      //           "vasSubType": "2",
      //           "vasName": "KKboxMobius電子書平台--GO!MAG 月費$38",
      //           "vasCode": "123406",
      //           "vasAmount": "3800",
      //           "vasDesc": null
      //       }
      //   ];

      //   this.allInfo.bindingVasInfoList = [
      //       {
      //           "vasType": "2",
      //           "vasSubType": "1",
      //           "vasName": "UTV 至尊組合 月費$38",
      //           "vasCode": "123457",
      //           "vasAmount": "3800",
      //           "vasDesc": null
      //       },
      //       {
      //           "vasType": "2",
      //           "vasSubType": "1",
      //           "vasName": "KKbox 月費$44",
      //           "vasCode": "123458",
      //           "vasAmount": "4400",
      //           "vasDesc": null
      //       }
      //   ];

      if (this.allInfo.freeVasInfoList) {
        this.allInfo.freeVasInfoList.forEach(element => {
          this.allVasInfo.push(element.vasName);
        });
      }
      if (this.allInfo.bindingVasInfoList) {
        this.allInfo.bindingVasInfoList.forEach(element => {
          this.allVasInfo.push(element.vasName);
        });
      }

      if (this.allInfo.discountInfoList) {
        this.allInfo.discountInfoList.forEach(element => {
          this.allDiscount.push(element.offerDesc);
        });
      }
    },
    /**返回地址字符串 */
    getAddressString(addressInfo) {
      let _this = this;
      let s = "";
      for (const key in addressInfo) {
        if (addressInfo.hasOwnProperty(key)) {
          const element = addressInfo[key];
          if (addressInfo[key]) {
            s += element;
          }
        }
      }
      return s;
    },
    //扣减携号配额
    async reduceMnpQuota() {
      let params = {
        phoneNo: this.allInfo.phoneNo,
        effectDate: this.allInfo.effectDate,
        effectTime: this.allInfo.effectTime
      };
      Object.assign(params, {
        userId: this.$client.userid
      });

      const res = await this.$post("business/reduceMnpQuota", params);
      if (res && res.returnCode == 1000) {
        this.$router.push({
          name: "contractCont",
          query: { registerId: this.deliverParams.orderId, name: "handlePay" }
        });
      }
    },
    next() {
      //当办理方式是携号上台的时候才要调扣减携号配额的接口
      //registerType(1新號碼上台，2携号上台，3预付转后付)
      if (this.allInfo.registerType == "2") {
        this.reduceMnpQuota();
      } else {
        this.$router.push({
          name: "contractCont",
          query: { registerId: this.deliverParams.orderId, name: "handlePay"}
        });
      }
    }
  }
};
</script>

<style lang = 'less' scoped>
section {
  margin-top: 0.22rem;
  background: white;
}
.vpInputRadio {
  padding: 0 @page-space;
}
.button {
  width: 6.6rem;
  margin-left: 0.45rem;
  height: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}

.cell {
  display: flex;
  justify-content: space-between;
  margin: 0 @page-space;
  padding: 0.2rem 0;
  font-size: 0.28rem;
  border-bottom: 1px solid #e9e9e9;
  .title {
    flex: 1;
    color: #666666;
  }
  .subTitle {
    width: 70%;
    text-align: right;
    color: #333333;
    /* white-space:normal; */
    word-break: break-all;
  }
}
</style>
