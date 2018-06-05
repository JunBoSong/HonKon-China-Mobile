<template>
  <div class="order-detail">
    <vp-layout-page>
      <div class="order-detail-content">
        <div class="order-wrapper">
          <vp-li-goods-cart v-if="orderDetail"  
          :selector="false" 
          :data="item" v-for="(item, index) in JSON.stringify(orderDetail) !== '{}' ? orderDetail.subOrderList[0].orderItemList : null"
          :coverImage = 'item.coverImage'
          :name = 'item.productName'
          :skus = 'item.property'
          
          :price = 'item.salePrice | filterPrice'
          :num = 'item.buyQty-0'
          :key="index" 
          />
        </div>
        <!-- 赠品先目前阶段还没有 -->
        <!-- <div class="order-tips" v-if="false">$50超市禮券（上台）+免費送貨豁免每月$18行政費</div> -->
        <div class="info-item" v-if="orderDetail.orderStatus == 2">
          <p class="panel-title">
            <img src="~@/assets/images/work_contract@2x.png" alt="">
            <span>發貨信息</span>
          </p>
          
            <vp-input-message v-if="orderDetail.purchaseType != 0 && orderDetail.purchaseType"  v-model.trim="iccid" label="ICCID" labelWidth="2rem"  />
            <vp-input-message v-model.trim="emeis[index]" label="手機IMEI號碼2" labelWidth="2rem" v-for="(item, index) in emeis" :key="index" :borderB="false" />
          
        </div>
        <div class="info-item" v-if="$route.query.type == 3">
          <p class="panel-title">
            <img src="~@/assets/images/work_contract@2x.png" alt="">
            <span>發貨信息</span>
          </p>
          <div class="iccid-wrap">
            <vp-cell v-if="orderDetail && orderDetail.logisticsInfo && orderDetail.logisticsInfo.iccId" label="ICCID" :value="orderDetail && orderDetail.logisticsInfo && orderDetail.logisticsInfo.iccId" :isLink="false" />
            <vp-cell label="手機IMEI號碼2" :value='item'  v-for="(item, index) in showEmeis(orderDetail && orderDetail.logisticsInfo && orderDetail.logisticsInfo.imei)" :key="index" :isLink="false" />
            <!-- <vp-cell label="姓氏" :value="orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerLastName" :isLink="false" /> -->
          </div>

        </div>
        <div class="info-item">
          <p class="panel-title">
            <img src="~@/assets/images/work_personal@2x.png" alt="">
            <span>個人資料</span>
          </p>
          <div class="cell-wrapper">
            <vp-cell label="姓氏" :value="orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerLastName" :isLink="false" />
            <vp-cell label="名字" :value="orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerFirstName" :isLink="false" />
            <vp-cell label="聯絡电话" :value="orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerPhone" :isLink="false" />
            <!-- <vp-cell label="電郵住址" :value="orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerEmail" :isLink="false" :borderB="false" /> -->
            <div class="email-cell"><span class="label">電郵住址</span><span>{{orderDetail && orderDetail.customerInfo && orderDetail.customerInfo.buyerEmail}}</span></div>
          </div>
        </div>
        <div class="info-item">
          <p class="panel-title">
            <img src="~@/assets/images/logistics@2x.png" alt="">
            <span>物流方式</span>
          </p>
          <div class="cell-wrapper">
            <vp-cell label="物流方式" :value="orderDetail.deliveryInfo && orderDetail.deliveryInfo.logisticType | deliveryInfo" :isLink="false" />
            <!-- 门店取货 -->
            <div  v-if="orderDetail.deliveryInfo && orderDetail.deliveryInfo.logisticType == 3">
              <vp-cell label="區域&地區" :value="orderDetail && orderDetail.deliveryInfo && orderDetail.deliveryInfo.takeDepartName" :isLink="false" />
              <div class="cell-box">
                <span class="label">門 市</span>
                <span class="value">{{orderDetail && orderDetail.deliveryInfo && orderDetail.deliveryInfo.takeDistrict}}</span>
              </div>
            </div>
            <!-- 网站送货 -->
            <div v-if="orderDetail.deliveryInfo && orderDetail.deliveryInfo.logisticType == 2">
            <div class="cell-box border-b">
              <span class="label">送貨地址</span>
              <!-- 用户地址 -->
              <span class="value">
                  {{deliveryAddressInfo &&deliveryAddressInfo.receiverProvince}}
                  {{deliveryAddressInfo && deliveryAddressInfo.receiverCity}}
                  {{deliveryAddressInfo && deliveryAddressInfo.receiverArea}}
                  {{deliveryAddressInfo && deliveryAddressInfo.receiverAddress}}
                </span>
            </div>
              <vp-cell label="送貨備註" :value="orderDetail && orderDetail.deliveryInfo && orderDetail.deliveryInfo.takeDepartName" :isLink="false" />
              <vp-cell label="配送方式" :value="orderDetail && orderDetail.logisticsInfo && orderDetail.deliveryInfo.logisticsCompanyName" :isLink="false" />
              <vp-cell label="物流單號" :value="orderDetail && orderDetail.logisticsInfo && orderDetail.deliveryInfo.logisticsCode" :isLink="false" />

            </div>
          </div>
        </div>
        <!-- 上台信息先不展示 -->
        <div class="info-item" v-if="orderDetail.purchaseType == 2 || orderDetail.purchaseType == 3 || orderDetail.purchaseType == 4">
          <p class="panel-title">
            <img src="~@/assets/images/work_contract@2x.png" alt="">
            <span>上台信息</span>
          </p>
          <div class="cell-wrapper">
            <vp-cell label="電話號碼" :value="orderStageInfo.phoneNo" :isLink="false" />
            <vp-cell label="ICCID" :value="orderStageInfo.iccId" :isLink="false" />
            <vp-cell label="服務計劃" :value="orderStage.businessPlanName" :isLink="false" />
            <div class="cell-box border-b">
              <span class="label">個人信息</span>
              <span class="value">
                {{orderStageInfo.customerInfo && orderStageInfo.customerInfo.companyName}}
                <br/> {{orderStageInfo.customerInfo && orderStageInfo.customerInfo.certificateCode}}
                <br/> {{orderStageInfo.customerInfo && orderStageInfo.customerInfo.contactNumber}}
                <!-- 邮箱地址 -->
                <br/> {{orderStageInfo.customerInfo && orderStageInfo.customerInfo.email}}
              </span>
            </div>
            <div class="cell-box border-b">
              <span class="label">上台登記住址</span>
              <!-- 用户地址 -->
              <span class="value">
                  {{addressInfo.area}}
                  {{addressInfo.district}}
                  {{addressInfo.streetno}}
                  {{addressInfo.streetName}}
                  {{addressInfo.estateInput}}
                  {{addressInfo.buildingInput}}
                  {{addressInfo.blockBox   }} 
                  {{addressInfo.blockInput}}    
                  {{addressInfo.floorBox}}     
                  {{addressInfo.floorInput}}    
                  {{addressInfo.flatBox}}
                  {{addressInfo.flatInput}}
                </span>
            </div>
            <vp-cell label="辦理方式" :value="orderStageInfo.transactType | deliveryInfo" :isLink="false" />
            <div class="cell-box border-b">
              <span class="label">已選VAS</span>
              <span class="value">{{orderStageInfo.freeVasInfoList && orderStageInfo.freeVasInfoList&&vasName}}</span>
            </div>
            <vp-cell label="已選優惠" :value="orderStageInfo.discountInfoList && `${orderStageInfo.discountInfoList.offerDesc}${orderStageInfo.discountInfoList.vasAmount}`" :isLink="false" />
            <vp-cell label="服务生效日期" :value="orderStageInfo.effectDate" :isLink="false" />
            <vp-cell label="SMS語言設定" :value="orderStageInfo.billLang ==1 ? '中午' : '英文'" :isLink="false" />
            <!-- <vp-cell label="內地號碼" value="13723751323" :isLink="false" /> -->
            <!-- <vp-cell label="服務計劃" value="18元套餐" :isLink="false" /> -->
            <vp-cell label="繳費方式" :value="orderStageInfo.debitType == 1? '信用卡自動轉賬' : '其他方式'" :isLink="false" />
            <vp-cell label="開啟IDD服務" :value="orderStageInfo.openIdd ==1 ? '是' : '否'" :isLink="false" />
            <vp-cell label="IDD繳費方式" :value="orderStageInfo.iddPayType == 1 ? '信用卡自動轉賬' : '押金' " :isLink="false" />
            <vp-cell label="自動續約" :value="orderStageInfo.autoPay == 1 ? '是' : '否'" :isLink="false" />
            <div class="cell-box">
              <span class="label">推廣信息</span>
              <span class="value">
               
                {{orderStageInfo.acceptCMHKPromotion == 1 ? ' 接受中國移動香港推廣信息' : ''}}
                <br/>{{orderStageInfo.acceptOtherPromotion == 1 ? '接受非中國移動香港推廣信息' : ''}}
              </span>
            </div>
          </div>
        </div>
        <!-- 支付信息 -->
        <div class="info-item">
          <p class="panel-title">
            <img src="~@/assets/images/work_pay@2x.png" alt="">
            <span>支付明细</span>
          </p>
          <div class="cell-wrapper">
            <div>
              <vp-cell label="增值服務優惠" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.vasFee | filterPrice" :isLink="false" />
              <vp-cell label="月費" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.monthFee | filterPrice" :isLink="false" />
              <vp-cell label="行政費" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.adminFee | filterPrice" :isLink="false" />
              <vp-cell label="上台按金" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.openDepositFee | filterPrice" :isLink="false" />
              <vp-cell label="IDD按金" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.iddDepositFee | filterPrice" :isLink="false" />
              <vp-cell label="優惠" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.discountFee | filterPrice" :isLink="false" />
              <vp-cell label="商品小計" :value="JSON.stringify(orderDetail) !== '{}'?`HK$${((orderDetail.subOrderList[0].productAmount-0)/100).toFixed(2)}`:null" :isLink="false" />
              <vp-cell label="郵費" :value="JSON.stringify(orderDetail) !== '{}'?`HK$${((orderDetail.subOrderList[0].freight-0)/100).toFixed(2)}`:null" :isLink="false" />
              <vp-cell label="總計" :value="JSON.stringify(orderDetail) !== '{}'?`HK$${((orderDetail.subOrderList[0].paymentAmount-0)/100).toFixed(2)}`:null" :isLink="false" :borderB="false" />
            </div>
          </div>
        </div>
        <div class="info-item" v-if="type == 2 || type == 3">
          <div class="tab-wrapper">
            <p class="tab-item" @click="print(1)">列印合約</p>
            <p class="tab-item" @click="print(2)">列印收據</p>
          </div>
          <div class="btn-print" @click="print(3)">一鍵列印</div>
        </div>
      </div>
      <vp-button v-if="type == 2 && orderDetail.deliveryInfo && orderDetail.deliveryInfo.logisticType != 2" content="發貨" @click="deliver" slot="footer" />
      <vp-button v-if="type == 1" content="確認付款" @click="payment" slot="footer" />

      <vp-layout-pay ref="pay" @on-fail="payFailCallback"></vp-layout-pay>
    </vp-layout-page>
      <popup v-model="showPay">
        <group>
        <vp-input-radio-pay :pay='pay' v-model="payType"/>
        <vp-button content="確認付款" @click.native="doPay"></vp-button>
        </group>
      </popup>
  </div>
</template>
<script type='text/javascript'>
  import {
    vpLiGoodsCart,
    vpInputMessage,
    vpCell,
    vpLayoutPay,
    vpInputRadioPay,
  } from '@/components';
import { ENETUNREACH } from 'constants';
import { Popup, Group, Confirm, Alert } from "vux";
import printFn from '@/mixin/print'
  export default {
    components: {
      vpLiGoodsCart,
      vpInputMessage,
      vpCell,
      vpLayoutPay,
      Group,
      Popup,
      vpInputRadioPay,
      Confirm,
      Alert
    },
    mixins:[printFn],
    data() {
      return {
        sendInfo: {
          iccid: '',
          emeis: ''
        },
        iccid: '', // 用户填写的iccid
        emeis: [], // 用户填写的emei集合
        pay: null, // 控制支付组件展示
        orderId: null, // 订单id
        mainOrderId: null, // 主订单id
        type: null, // 1代付款 2.发货 3.已发货
        orderDetail: {}, // 订单详情数据
        showPay: false, // 控制付款
        payType: null, // 支付方式
        alertShow: false, //
        orderStageInfo: {}, // 上台信息 
        addressInfo: {}, // 地址信息
        buyQty: 0, // 商品数量
        deliveryAddressInfo: {}, // 送货地址单独列出来
      }
    },
    filters: {
      deliveryInfo(val) {
        let num = val - 0
        switch(num){
          case 1://微信
            return "现场办理"
          break;
          case 2://微信
            return '网站送货'
          break;
          case 3://微信
            return '门店取货'
          break;
          default:
          break;
        }
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
      this.orderId = this.$route.query.id // 获取orderid
      this.mainOrderId = this.$route.query.mainOrderId // 获取主订单id
      if (this.$route.query.type) { // 判断订单类型 1代付款 2.发货 3.已发货
        this.type = this.$route.query.type
      }
      this.getDetail()
    },
    methods: {
      async getDetail() { // 获取详情数据
        let param = {
          orderId: this.orderId,
          mainOrderId: this.mainOrderId
        }
        let res = await this.$post('order/detail', param)
        if (res.returnCode !== '1000') return
        this.orderDetail = res.dataInfo
        this.deliveryAddressInfo = res.dataInfo.deliveryAddressInfo
        this.pay = res.dataInfo.payType // 支付方式
        this.buyQty = res.dataInfo.subOrderList[0].orderItemList[0].buyQty - 0 // 商品数量
        this.setImei(this.buyQty)
        let arr = ['2', '3', '4'] // 上台类型 2:集客上台,3:买机上台 4:旗舰机上台 只有上台业务需要展示上台信息
        if (arr.indexOf(this.orderDetail.purchaseType) === -1) return
        if (!this.orderDetail.boId) return // 业务id
        this.orderStage(this.orderDetail.boId)
      },
      payment() { // 支付
        this.showPay = true
      },
      async deliver() { // 发货
        let param = {
          mainOrderId: this.mainOrderId,
          orderId: this.orderId,
          iccId: this.iccid,
          imeis: this.emeis
        }
        let flang = true
        if (this.orderDetail.purchaseType == 0) { // 普通商品不用输入iccid
        
          this.emeis.map((item, index) => { // 如果有emei为空 不执行下面语句
            if(item === '') {
              return flang =false
            }
          })
        } else {
          if (this.iccid == null || this.iccid == '')  return this.$vux.toast.text('请输输入iccid')
        }
        if (!flang) return this.$vux.toast.text('请输输入IMEI')

        let res = await this.$post('order/delivery', param)
        if (res.returnCode !== '1000') return
        this.alertShow = true
        let _this = this
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "發貨成功",
          onHide () {

           _this.$router.replace({path: '/mine/order/list', query: {curtabindex: 3}})
          }
        });
      },
      showEmeis(data) {
        if(!data || data == '') return []
        return JSON.parse(data)
      },
      async orderStage(id) { // 获取上台信息
        let param = {
          id: id
        }
        let res = await this.$post('order/queryOrderInfo', param)
        if (res.returnCode != '1000') return
        this.orderStageInfo = res.dataInfo
        this.addressInfo = res.dataInfo.deliveryAddressInfo // 把地址信息单独提出了
      },
      doPay() { // 支付
        let param = {
          ...this.payType,
          mainOrderId: this.mainOrderId,
          origin: 3,
          frontUrl: `#/mine/order/result`,
          successURL: "`#/mine/order/result",
          cancelURL: "`#/mine/order/result",
          failURL: "`#/mine/order/result",
          lang: "X",
          paymentType: "1"
        };
        this.$refs.pay.pay(this.mainOrderId, param)
      },
      payFailCallback() { // 支付回调

      },
      onHide() {
        this.$router.go(-1)
      },
      print(num) { // 打印合约
        let printData = {}
        if (num == 1) {
          printData.registerId = this.orderStageInfo.boId
        } else if (num == 2) {
          
        } else if (num == 3) {

        }
        this.$vux.confirm.show({
          title: '提示',
          content: '打印可能需要一段時間請確認是否列印',
          confirmText: '繼續列印',
          onConfirm: () => {
            this.$jb.js2webview({type: 3, printType: num})
            this.printFn(printData, num)
          }
        })
      },
      setImei(num) { // 设置emei
        if(num <= 0 && !num) return
        let arr = []
        for(let i =0; i< num; i++ ) {
          arr[i] = ''
        }
        this.emeis = arr
      }
    },
  }
</script>
<style lang='less' scoped>
.order-detail-content {
  padding-bottom: 0.6rem;
}
  .cell-box {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    font-size: 0.28rem;
    color: #666666;
    background: #fff;
    .label {
      width: auto;
    }
    .value {
      flex: 1 1 0;
      max-width: 5.6rem;
      line-height: 0.4rem;
      text-align: right;
      color: #666666;
    }
  }

  .order-tips {
    // height: 0.72rem;
    margin-top: 0.22rem;
    padding: 0.25rem 0.24rem 0.25rem 0.5rem;
    font-size: 0.24rem;
    color: #666666;
    background: url('~@/assets/images/work_gift@2x.png') 0.24rem center no-repeat #fff;
    background-size: 0.26rem;
  }

  .info-item {
    margin-top: 0.22rem;
    background: #fff;
    .cell-wrapper {
      padding: 0 0.24rem;
    }
    .tab-wrapper {
      display: flex;
      padding: 0.18rem 0.24rem 0;
      .tab-item {
        flex: 1;
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        font-size: 0.24rem;
        &:first-child {
          background: @theme;
          color: #fff;
        }
        &:last-child {
          border: 0.01rem solid @theme-secondary;
          color: @theme-secondary;
        }
      }
    }
    .btn-print {
      line-height: 0.66rem;
      text-align: center;
      color: #333;
      text-decoration: underline;
    }
  }
.iccid-wrap{
  padding: 0 0.3rem;
}
.email-cell{
  display: flex;
  justify-content: space-between;
  color: #888888;
  font-size: 0.24rem;
  line-height: 0.8rem;
  .label{
    font-size: 0.28rem;
    color: #666666;
  }
}
</style>
