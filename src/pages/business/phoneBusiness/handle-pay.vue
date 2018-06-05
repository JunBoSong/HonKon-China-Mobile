<template>
  <div>
    <vp-layout-page>
      <vpFlowStatus :page='5'></vpFlowStatus>
      <!-- 上台信息 -->
      <section class="section-top">
        <div class="panel-title">
          <img :src="require('@/assets/images/work_contract@2x.png')">
          <span>上台信息</span>
        </div>
        <div class="cell">
          <span class="title">電話號碼</span>
          <span class="subTitle">{{calPayInfo.phoneNo }}</span>
        </div>
        <div class="cell">
          <span class="title">服務計劃</span>
          <span class="subTitle">{{calPayInfo.businessPlanName }}</span>
        </div>
        <!-- 已选VAS -->
        <div class="cell" v-for="(item,index) in allVasInfo" :key="index">
          <span class="title">{{index==0?'已選VAS':''}}</span>
          <span class="subTitle"> {{item}}</span>
        </div>
      </section>
      <!-- 支付明细 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_pay@3x.png')">
          <span>支付明細</span>
        </div>
        <div class="cell">
          <span class="title">手機上台價</span>
          <span class="subTitle">{{calPayInfo.paymentDetail && calPayInfo.paymentDetail.handsetPrice | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">旗艦機上台預繳費用</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.prepaidFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">月費</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.monthFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">行政費</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.adminFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">增值服務優惠</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.vasFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">上台按金</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.openDepositFee | filterPrice}}</span>
        </div>
        <div class="cell">
          <span class="title">IDD 按金</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.iddDepositFee | filterPrice}}</span>
        </div>
        <!-- <div class="cell">
          <span class="title">優惠</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.discountFee | filterPrice}}</span>
        </div> -->
        <div class="cell">
          <span class="title">總計</span>
          <span class="subTitle">{{ calPayInfo.paymentDetail && calPayInfo.paymentDetail.totalFee | filterPrice}}</span>
        </div>
      </section>
      <section>
        <vp-input-radio-pay v-model="payType" />
      </section>
      <vp-layout-pay ref="pay"></vp-layout-pay>

      <!-- 底部按钮 -->
      <div class="page-btns" slot="footer">
        <vp-button content="確認付款" @click.native="next"></vp-button>
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
  vpInputRadioPay,
  vpFlowStatus,
  vpLayoutPay
} from "@/components";
export default {
  components: {
    vpHeaderSort,
    vpButton,
    vpUpdateImg,
    vpInputRadio,
    Cell,
    Group,
    vpInputRadioPay,
    vpFlowStatus,
    vpLayoutPay
  },
  data() {
    return {
      value: "",
      payType: {},
      calPayInfo: {},
      createOrderInfo: {}, //订单信息
      productQty: 0,
      allVasInfo: [],
    };
  },
  created() {
    this.getSession();
  },
  methods: {
    next() {
      if (!this.calPayInfo.paymentDetail.monthFee) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "支付金額不能爲空"
        });
        return;
      }
      // console.error('写死两个参数， skuId，id')
      let param = {
        ...this.payType, // 通过p-layout-pay组件 结构出来两个值 payType、payPlatform
        // payType: this.payWay.payType || this.payWay, // 支付方式 this.payWay是对象就是二维码支付
        // payPlatform: this.payWay.payPlatform || this.$client.webview, // 支付平台  this.payWay是对象就是二维码支付
        origin: this.$client.webview, // 订单来源
        paymentType: 2,
        businessPhone: this.calPayInfo.phoneNo,
        frontUrl: `#/business/handleBase/resultBusiness`, // 回调地址
        boId: this.calPayInfo.id, //业务订单id
        purchaseType: this.calPayInfo.businessType, // 购买商品方式0：纯商品 1:带机上台 2:集客上台 3：买机上台 4:旗舰机上台 5:缴费6:充值 7:现有客户买手机
        userInfo: {
          // 用户信息
          id: this.$client.userid, // 用户id
          shopId: this.$client.shopid // 店铺id
        },
        productInfo: [
          {
            // 商品数组
            skuId:this.createOrderInfo.skuId || this.createOrderInfo.contractId,
            id: this.createOrderInfo.id || this.createOrderInfo.businessPlanId,
            productQty: this.productQty == 0 ? 1 : this.productQty, // 购买数量
            deliveryCode: this.createOrderInfo.productList && this.createOrderInfo.productList.expressVal.code || "" //快递编码
          }
        ],
        deliveryInfo: {
          // 配送信息
          logisticType: this.calPayInfo.transactType, //办理方式transactType，1现场办理 2网站送货 3门市取货
          deliveryCode: this.createOrderInfo.productList && this.createOrderInfo.productList.expressVal.code || "", //快递编码
          deliveryCode: this.createOrderInfo.productList && this.createOrderInfo.productList.expressVal.freightName || "", //快递名称
          remark:
            this.calPayInfo.transactType == "2"
              ? this.calPayInfo.deliverRemark
              : "", //备注
          takeDepartName:
            this.calPayInfo.transactType == "3" ? this.calPayInfo.takeOrg : "", //取货门市名称
          takeDistrict:
            this.calPayInfo.transactType == "3"
              ? this.calPayInfo.takeRegion
              : "" //取货门市区域
        },
        customerInfo: {
          // 买家信息
          userId: this.$client.userid,
          buyerName:
            this.calPayInfo.customerInfo.firstName +
            this.calPayInfo.customerInfo.lastName,
          buyerPhone: this.calPayInfo.customerInfo.contactNumber,
          buyerEmail: this.calPayInfo.customerInfo.email,
          buyerLastName: this.calPayInfo.customerInfo.lastName,
          buyerFirstName: this.calPayInfo.customerInfo.firstName
        }
      };

      if (this.calPayInfo.transactType == "2") {
        //办理方式transactType，1现场办理 2网站送货 3门市取货
        let shippingAddress = {
          //收货地址
          province: "香港",
          city: this.calPayInfo.deliverAddrInfo.area,
          district: this.calPayInfo.deliverAddrInfo.district,
          detailAddress: Object.values(this.calPayInfo.deliverAddrInfo)
            .toString()
            .replace(/,/g, "")
        };
        param.shippingAddress = shippingAddress;
      }
      this.$refs.pay.createOrder(param, true);
    },
    async getSession() {
      // this.calPayInfo = this.$session.get("calPayInfo");
      let orderId = this.$session.get("order_no");

      let param = {
        id: orderId.orderId,
        userId: this.$client.userid
      }
      const res = await this.$post("business/calPay", param); // 獲取之前存儲的信息
      if (!res || res.returnCode != 1000) return
      this.calPayInfo = res.dataInfo
      if (this.$session.get("createOrderInfo")) { // 新客上台和旗舰机上台 有createOrderInfo
        this.createOrderInfo = this.$session.get("createOrderInfo");
      } else { // 服务计划信息
        this.createOrderInfo = this.$session.get('ChoosePlan')
      }
      if (this.createOrderInfo.productList) {
        this.createOrderInfo.productList.forEach(element => {
          this.productQty += element.num;
        });
      }

      if (this.calPayInfo.freeVasInfoList) {
        this.calPayInfo.freeVasInfoList.forEach(element => {
          this.allVasInfo.push(element.vasName);
        });
      }
      if (this.calPayInfo.bindingVasInfoList) {
        this.calPayInfo.bindingVasInfoList.forEach(element => {
          this.allVasInfo.push(element.vasName);
        });
      }
    },
    getPayWay(val) {
      this.payWay = val;
    }
  }
};
</script>

<style lang = 'less' scoped>
section {
  margin-bottom: 0.22rem;
  background: white;
}

.section-top {
  margin-top: 0.22rem;
  background: white;
}
.vpInputRadio {
  padding: 0 @page-space;
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
