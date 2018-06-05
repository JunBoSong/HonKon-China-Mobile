<template>
   <div>
      <vp-result-handle :list="resultList" :title="resultType" :img="require('@/assets/images/buy_success_img.png')">
        <div class="btns">
          <div class="btn" @click="$router.replace({name: 'shoppingList'})">
            <vp-button content="返回商店" :radius="true" height="0.8rem"></vp-button>
          </div>
          <div class="btn" @click="$router.replace({name: 'mineOrderList'})">
            <vp-button content="查看訂單" :radius="true" styleClass="hollow" height="0.8rem"></vp-button>
          </div>
        </div>
        <div class="print-btn" @click="print">列印收據</div>
      </vp-result-handle>
   </div>
</template>
<script type = 'text/javascript'>
import {vpResultHandle} from '@/components';
import {timeFormat} from '@/utils/timeFormat';
// Buyer Username : alipaytest20091@gmail.com
// Login Password : 111111
// Payment password : 111111
  export default {
    components: {vpResultHandle},
    data() {
      return {
        orderData: {},
      }
    },
    computed: {
      query() {
        return this.$route.query;
      },
      resultType() {
        const typeArr = ['普通商品','帶機上台','集客上台','買機上台','旗艦機上台','繳費','充值','現有客戶買手機','O2O商品','卡券商品']
        return typeArr[this.orderData.purchaseType*1 || 0]
      },
      resultList() {
        const orderData = this.orderData;
        const arr = orderData.orderItemList || [];
        // const arr = [{"productName":"苹果手机6s-a", "property":"透明 5.5寸 32GB"}, {"productName":"fdsfdsfds-a", "property":"透明 5.5寸 32GB"}];
        let returnArr = [];
        for (const item of arr) {
          if (!returnArr.length) {
            returnArr[0] = {
              name: this.resultType,
              value: item.productName,
            }
          }else {
            const lastVal = returnArr[returnArr.length-1].value;
            returnArr[returnArr.length-1].value = `${lastVal}<br/>${item.productName}`
          }
        }
        returnArr.push({
          name: '購買日期',
          value: orderData.postTime && this.fiterTimer(orderData.postTime)
        })
        return returnArr;
        // const orderData = this.orderData;
        // const returnArr = [{
        //   name: this.resultType,
        //   value: orderData.productName
        // },{
        //   name: '購買日期',
        //   value: orderData.postTime && timeFormat(orderData.postTime, 'YYYY-MM-D hh:mm:ss')
        // }]
        // return returnArr;
      },

    },
    created() {
      this.queryOrderDetail();
    },
    methods: {
      async queryOrderDetail() {
        const res = await this.$post('order/detail', {
          orderRef: this.query.out_trade_no,
          isQueryAfterPay: true,

        })
        if (res.returnCode != 1000) return this.$vux.toast.text(res.message)
        this.orderData = res.dataInfo;
      },
      print() {
        this.$vux.confirm.show({
          title: '提示',
          content: '打印可能需要一段時間請確認是否列印（待聯調）',
          confirmText: '繼續列印',
          onConfirm() {
            this.$jb.js2webview({type: 3,printType: 2})
          }
        })
      },
      fiterTimer(val) { // 时间过滤
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
  .print-btn {
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    text-decoration: underline;
    color: #666;
    font-size: 0.24rem;
  }
</style>
