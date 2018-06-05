<template>
  <div class="vp-input-radio-pay">
    <p class="panel-title border-none">
      <span>付款方式</span>
    </p>
    <div v-if="!pay" v-for="(item, index) of payTypes" :key="index" class="item" :class="{active: (currentVal.payType === item.value.payType && currentVal.payPlatform === item.value.payPlatform)}" @click="currentVal = item.value">
      <i :class="['icon-type', item.icon]"></i>
     
      <span class="item_text">{{item.name}} </span>
      <i class="icon_radio"></i>
    </div>
    <!-- <div v-for="(item, index) in payTypes" :key="index">
      {{item.value.payType}}
    </div> -->
    <div v-if="pay && item.value.payType == pay" v-for="(item, index) of payTypes" :key="index" class="item" :class="{active: (currentVal.payType === item.value.payType && currentVal.payPlatform === item.value.payPlatform)}" @click="currentVal = item.value">
      <i :class="['icon-type', item.icon]"></i>
     
      <span class="item_text">{{item.name}} </span>
      <i class="icon_radio"></i>
    </div>

    <div class="check-attention" v-if="attention" @click="shwoDialog">
      <i class="icon-tips"></i>
      <span class="text">查看支付注意事項</span>
      <i class="icon-arrow-right"></i>
    </div>
    <x-dialog v-model="showText" class="dialog">
      <h3 class="title">支付注意事項</h3>
      <div>
        <span class="vux-close" @click="showText = false"></span>
      </div>
      <div class="dialog_content" style="overflow:auto;-webkit-overflow-scrolling:touch;" v-html="treaties">

      </div>
    </x-dialog>
  </div>
</template>

<script type="text/javascript">
  import {
    isWechat
  } from '@/utils/userAgent'
  import {
    XDialog
  } from 'vux'
  import {
    fail
  } from 'assert';
    export default {
      props: {
        value: [String, Number, Object, Array],
        pay: [String, Number], // 支付方式 默认传  目前我的订单需要用到
        attention: { // 注意事項默认不展示
          type: Boolean,
          default: false
        }
      },
      components: {
        XDialog
      },
      data() {
        return {
          payTypes: [
            {
              icon: 'materCard',
              name: '信用卡(Visa/MasterCard)',
              value: {
                payType: 23,
                payPlatform: this.$client.webview
              }
            },
            {
              icon: 'alipay',
              name: '支付寶（中國內地身份證實名認證賬戶）',
              value: {
                payType: 14,
                payPlatform: this.$client.webview
              }
            },
    
            {
              icon: 'materCard',
              name: '信用卡二維碼支付(Visa/MasterCard)',
              value: {
                payType: 23,
                payPlatform: 5
              }
            },
            {
              icon: 'alipay',
              name: '支付寶二維碼（中國內地身份證實名認證賬戶）',
              value: {
                payType: 14,
                payPlatform: 5
              }
            },
          ],
          currentVal: this.value,
          showText: false,
          treaties: '', //支付條款
        }
      },
      watch: {
        currentVal:{
          // this.$emit('input', val);
          handler: function(val) {
            this.$emit('input', val);
          }
        },
        value: function(val) {
          this.currentVal = val;
        }
      },
      created() {
        if (this.$client.right != 'staging') { // 如果是店铺不展示二维码支付
        let arr = []
          this.payTypes.forEach((item, index) => {
            if (item.value.payPlatform != 5) {
              arr.push(item)
            }
          })
          this.payTypes = arr
        }
        this.currentVal =  {
          payType: 23,
          payPlatform: this.$client.webview
        } //默认支付方式
        this.$emit('input', this.currentVal);
      },
      methods: {
        shwoDialog() {
          if (!this.treaties) {
            this.getTreaties();
          }
          this.showText = true
        },
        async getTreaties() { //获取支付注意事項
          let res = await this.$post("hint/detail", {
            code: 'payment_notice'
          });
          if (!res || res.returnCode != 1000) return
          this.treaties = res.dataInfo.content;
          this.$nextTick(() => {
            let list = this.$refs.html_content2.getElementsByTagName("a");
            for (let i = 0, len = list.length; i < len; i++) {
              list[i].className += " needsclick"; //解决fastClick插件a标签问题
            }
          });
        },
      }
    }

</script>

<style lang="less" scoped>
  @import '~@/assets/less/theme.less';
  .vp-input-radio-pay {
    .dialog {
      .title {
        border-bottom: 1px solid #EAEAEA;
      }
      .dialog_content {
        width: 6.8rem;
        height: 8.41rem;
        padding: 0.2rem 0.35rem 0 0.35rem;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.26rem;
          color: #333333;
          letter-spacing: 0;
          line-height: 0.38rem;
          text-align: left;
        }
      }
      .vux-close {
        position: absolute;
        right: -0;
        top: -0.6rem;
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        width: 24px;
        height: 24px;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 11px;
          width: 24px;
          height: 1px;
          background-color: currentColor;
          transform: rotate(45deg);
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 11px;
          width: 24px;
          height: 1px;
          background-color: currentColor;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      } //  
      // 
    } // .text{
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   background: rgba(0, 0, 0, 0.5);
    //   padding: 0 0.7rem;
    //   .text_content{
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     width: 6.4rem;
    //     height: 8.41rem;
    //     padding: 0 0.35rem;
    //     overflow: auto;
    //     background: #fff;
    //     z-index: 10;
    //     .text_content_title{
    //       position: absolute;
    //       top: 0;
    //       left: 0;
    //       right: 0;
    //       height: 0.88rem;
    //       text-align: center;
    //       line-height: 0.88rem;
    //     }
    //   }
    // }
    // background-color: #fff;
    .title {
      height: 0.72rem;
      line-height: 0.72rem;
      font-size: 0.28rem;
      color: #333;
    }
    .item {
      height: 0.98rem;
      font-size: 0;
      padding: 0 @page-space;
      background: #FBFBFB;

      &:nth-of-type(even) {
        background: #fff;
      }
      .icon-type {
        display: inline-block;
        width: 0.46rem;
        height: 100%;
        vertical-align: top;
        &.materCard {
          background: url('~@/assets/images/pay_creditcard.png') center center no-repeat;
          background-size: 0.46rem;
        }
        &.unionPay {
          background: url('~@/assets/images/comfirm_order_unionpay@2x.png') center center no-repeat;
          background-size: 0.46rem;
        }
        &.alipay {
          background: url('~@/assets/images/comfirm_order_alipay@2x.png') center center no-repeat;
          background-size: 0.46rem;
        }
        &.wechat {
          background: url('~@/assets/images/comfirm_order_wechat@2x.png') center center no-repeat;
          background-size: 0.46rem;
        }
      }

      .item_text {
        display: inline-block;
        height: 0.98rem;
        line-height: 0.98rem;
        margin-left: 0.18rem;
        font-size: 0.26rem;
        color: #666;
      }
      .icon_radio {
        float: right;
        display: inline-block;
        width: 0.3rem;
        height: 100%;
        background: url('~@/assets/images/common_checkbox_normal@2x.png') center center no-repeat;
        background-size: 0.3rem auto;
      }
      &.active .icon_radio {
        background: url('~@/assets/images/common_checkbox_selected@2x.png') center center no-repeat;
        background-size: 0.3rem auto;
      }
    }
    .check-attention {
      display: flex;
      height: 0.72rem;
      align-items: center;
      padding: 0 @page-space;
      background: #fff;
      .icon-tips {
        width: 0.22rem;
        height: 0.22rem;
        background: url('~@/assets/images/all_notice@2x.png') 0 0 no-repeat;
        background-size: 0.22rem;
      }
      .text {
        flex: 1;
        margin-left: 0.04rem;
        vertical-align: middle;
      }
      .icon-arrow-right {
        width: 0.3rem;
        height: 0.3rem;
        background: url('~@/assets/images/arrow_right.png') 0 0 no-repeat;
        background-size: 0.3rem;
      }
    }
  }

</style>
