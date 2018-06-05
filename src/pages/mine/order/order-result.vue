<template>
   <div>
       <vp-layout-page>
            <vp-result-handle :list="[{name: '手機', value: orderDetail.customerInfo && orderDetail.customerInfo.buyerPhone}, {name: '下單時間', value: fiterTimer(orderDetail.postTime - 0)}]" :title="fiterTitle(orderDetail.purchaseType)">
              <div class="btns">

                  <vp-button content="返回商店" class="btn" :radius="true" height="0.8rem" @click="goBack"></vp-button>

                  <vp-button content="查看訂單" class="btn" :radius="true" styleClass="hollow" @click="$router.replace('/mine/order/list')"  height="0.8rem"></vp-button>

              </div>
              <div class="success-go" v-if="$client.webview == '1' || $client.webview == '2'" @click="print()">列印收據</div>
            </vp-result-handle>
       </vp-layout-page>
   </div>
</template>
<script type = 'text/javascript'>
import {vpResultHandle} from '@/components';
import urlParse from '@/utils/urlParse'
import timer from '@/utils/time'
  export default {
    components: {vpResultHandle},
    data() {
      return {
        orderDetail: {}
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
      this.getDetail()
    },
    methods: {
      async getDetail() { // 获取详情信息
        let urlData = urlParse('href')
        console.log(urlData)
        let param = {
          isQueryAfterPay: true,
          mainOrderId:urlData.orderId
        }
        let res = await this.$post('order/detail', param)
        if (res.returnCode != '1000') return
        this.orderDetail = res.dataInfo
      },

      goBack() {
        if (this.$client.webview == 1 || this.$client.webview == 2) {
          this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})})
        } else {
          this.$router.replace({path: '/store/home'})
        }
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
      fiterTitle(num) {
        const typeArr = ['普通商品','帶機上台','集客上台','買機上台','旗艦機上台','繳費','充值','現有客戶買手機','O2O商品','卡券商品']
        return typeArr[num || 0]
      },
      fiterTimer(val) { // 时间过滤
        if (!val) return null
        var d = new Date(val-0);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
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
      }
    }
  }
</script>
<style lang = 'less' scoped>
  .btns {
    width: 100%;
    margin-top: 0.7rem;
    text-align: center;
    .btn {
      display: inline-block;
      width: 3.1rem;
      &:first-child{
        margin-right: 0.2rem;
      }
    }
  }
.success-go{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.3rem;
  display: inline-block;
  font-size: 0.24rem;
  color: #666;
  text-align: center;
  border-bottom: 1px solid #666;
}
</style>