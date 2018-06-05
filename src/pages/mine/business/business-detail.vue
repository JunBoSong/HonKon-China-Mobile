<template>
  <div>
    <vp-layout-page>
      <div class="business-detail-content">
        <!-- 上台信息 -->
        <div class="info-item" >
          <p class="panel-title">
            <img src="~@/assets/images/work_contract@2x.png" alt="">
            <span>上台信息</span>
          </p>
          <div class="cell-wrapper">
            <vp-cell label="電話號碼" :value="orderStageInfo.phoneNo" :isLink="false" />
            <vp-cell label="ICCID" :value="orderStageInfo.iccId" :isLink="false" />
            <vp-cell label="服務計劃" :value="orderStageInfo.businessPlanName" :isLink="false" />
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
                  {{addressInfo && addressInfo.area}}
                  {{addressInfo && addressInfo.district}}
                  {{addressInfo && addressInfo.streetno}}
                  {{addressInfo && addressInfo.streetName}}
                  {{addressInfo && addressInfo.estateInput}}
                  {{addressInfo && addressInfo.buildingInput}}
                  {{addressInfo && addressInfo.blockBox   }} 
                  {{addressInfo && addressInfo.blockInput}}    
                  {{addressInfo && addressInfo.floorBox}}     
                  {{addressInfo && addressInfo.floorInput}}    
                  {{addressInfo && addressInfo.flatBox}}
                  {{addressInfo && addressInfo.flatInput}}
                </span>
            </div>
            <vp-cell label="辦理方式" :value="orderStageInfo.transactType | deliveryInfo" :isLink="false" />
            <div class="cell-box border-b">
              <span class="label">已選VAS</span>
              <span class="value">{{orderStageInfo.freeVasInfoList && orderStageInfo.freeVasInfoList&&orderStageInfo.freeVasInfoList.vasName}}</span>
            </div>
            <vp-cell label="已選優惠" :value="orderStageInfo.discountInfoList && `${orderStageInfo.discountInfoList.offerDesc}${orderStageInfo.discountInfoList.vasAmount}`" :isLink="false" />
            <vp-cell label="服务生效日期" :value="orderStageInfo.effectDate" :isLink="false" />
            <vp-cell label="SMS語言設定" :value="orderStageInfo.billLang ==1 ? '中文' : '英文'" :isLink="false" />
            <!-- <vp-cell label="內地號碼" value="13723751323" :isLink="false" />
            <vp-cell label="服務計劃" value="18元套餐" :isLink="false" /> -->
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
              <vp-cell label="增值服務優惠" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.vasFee | filterPrice" :isLink="false" />
              <vp-cell label="月費" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.monthFee | filterPrice" :isLink="false" />
              <!-- <vp-cell label="行政費" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.adminFee | filterPrice" :isLink="false" /> -->
              <vp-cell label="上台按金" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.openDepositFee | filterPrice" :isLink="false" />
              <vp-cell label="IDD按金" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.iddDepositFee | filterPrice" :isLink="false" />
              <vp-cell label="优惠" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.discountFee | filterPrice" :isLink="false" />
              <vp-cell label="總計" :value="orderStageInfo.paymentDetail && orderStageInfo.paymentDetail.totalFee | filterPrice" :isLink="false" />
              <!-- 还不确定 调那个接口-->
              <!-- <vp-cell label="商品小計" :value="JSON.stringify(orderDetail) !== '{}'?`HK$　${((orderDetail.subOrderList[0].productAmount-0)/100).toFixed(2)}`:null" :isLink="false" />
              <vp-cell label="郵費" :value="JSON.stringify(orderDetail) !== '{}'?`HK$　${((orderDetail.subOrderList[0].freight-0)/100).toFixed(2)}`:null" :isLink="false" />
              <vp-cell label="總計" :value="JSON.stringify(orderDetail) !== '{}'?`HK$　${((orderDetail.subOrderList[0].paymentAmount-0)/100).toFixed(2)}`:null" :isLink="false" :borderB="false" /> -->
          </div>
        </div>
        <div class="info-item" v-if="$route.query.type != 1">
          <div class="tab-wrapper">
            <p class="tab-item" @click="print(1)">列印合約</p>
            <p class="tab-item" @click="print(2)">列印收據</p>
          </div>
          <div class="btn-print" @click="print(3)">一鍵列印</div>
        </div>
      </div>
    </vp-layout-page>
  </div>
</template>
<script type='text/javascript'>
  import {
    vpCell
  } from '@/components';
  export default {
    components: {
      vpCell
    },
    data() {
      return {
        orderStageInfo: {}, // 详情信息
        addressInfo: {} // 地址信息
      }
    },
    
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
      this.getDetail()
      let that = this
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
    methods: {
      print(num) {
        let printData = {
          printType: num
        }
        this.$vux.confirm.show({
          title: '提示',
          content: '打印可能需要一段時間請確認是否列印',
          confirmText: '繼續列印',
          onConfirm: () => {
            this.$jb.js2webview({type: 3,printType: num})            
          }
        })
      },
      async getDetail() {
        let res = await this.$post('order/queryOrderInfo', {
          id: this.$route.query.id
        })
        this.orderStageInfo = res.dataInfo
        this.addressInfo =res.dataInfo.customerInfo && res.dataInfo.customerInfo.addressInfo // 把地址信息单独提出了
      }
    }
  }

</script>
<style lang='less' scoped>
.business-detail-content {
  padding-bottom: 0.6rem;
}
  .cell-box {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    font-size: 0.28rem;
    color: #333;
    background: #fff;
    .label {
      width: auto;
    }
    .value {
      flex: 1 1 0;
      max-width: 5.6rem;
      line-height: 0.4rem;
      text-align: right;
      color: #888;
    }
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

</style>
