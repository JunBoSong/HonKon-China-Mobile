<template>
    <div class="input-radio-rules" @click="curVal = !curVal">
      <i class="icon-state" :class="{'selected': curVal}"></i>
      <span class="tips">選擇確認即代表已同意<span class="rule" @click.stop="showTextHandler">《條款及細則》</span></span>
      <x-dialog v-model="showText" class="dialog">
        <h3 class="title">條款及細則</h3>
        <div>
          <span class="vux-close" @click.stop="showText = false"></span>
        </div>
        <div class="dialog_content" style="overflow:auto;-webkit-overflow-scrolling:touch;" v-html="treaties">
         
        </div>
      </x-dialog>
    </div>
</template>
<script type = 'text/javascript'>
 import { XDialog } from 'vux'
  export default {
    props: {
      value: {
        require: true,
        type: Boolean,
        default: false
      },
    },
    components: {
      XDialog
    },
    data() {
      return {
        curVal: this.value,
        showText: false,
        treaties: ''
      }
    },
    methods: {
      showTextHandler() {
        if (!this.treaties) {
          this.getTreaties()
        }
        this.showText = true
      },
      async getTreaties() { //获取支付條款
        let res = await this.$post("hint/detail", {
          code: 'payment_treaties'
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
    },
    watch: {
      curVal(val) {
        this.$emit('input', val);
      },
      value (val) {
        this.curVal = val;
      }
    }
  }
</script>
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
.dialog{
    .title{
      border-bottom: 1px solid #EAEAEA;
      height: 0.72rem;
      line-height: 0.72rem;
      font-size: 0.28rem;
      color: #333;
    }
    .dialog_content{
      width: 100%;
      height: 8.41rem;
      padding: 0.2rem 0.35rem 0 0.35rem;
      text-align: center;
      p{
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
    &::after{
      content: '';
      position: absolute;
      left: 0;
      top: 11px;
      width: 24px;
      height: 1px;
      background-color: currentColor;
      transform: rotate(45deg);
    }
    &::before{
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
  }
  }
.input-radio-rules{
  margin: 0.2rem @page-space 0.6rem;
  height: 0.6rem;
  display: flex;
  .tips{
    align-self: center;
    margin-top: 0;
    background: none;
    padding-left: 0.1rem;
  }
}
  .icon-state {
     align-self: center;
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        /* margin-top: 0.2rem; */
        vertical-align: top;
        background: url('~@/assets/images/common_checkbox_normal@2x.png') center center no-repeat;
        background-size: 0.3rem auto;
        &.selected {
          background: url('~@/assets/images/common_checkbox_selected@2x.png') center center no-repeat;
          background-size: 0.3rem auto;
        }
      }
</style>