<template>
  <div class="vp-input">
    <div class="input-wrapper" :class="{'border':needBorder}">
      <input :type="type" :maxlength="maxlength" :placeholder="placeholder" :value="currentValue" @input="handleInput" ref="input" />
    </div>
    <button type="button" v-if="getCodeBtn" class="btn" @click="getCodeHandler">
        {{btnText && `${btnText}s` || '获取验证码'}}
    </button>
  </div>
</template>

<script type="text/javascript">
  /**
   * vp-input
   * @module components/input
   * @desc 输入框
   * @param {String} type - 输入框类型，默认为text
   * @param {String} placeholder - 输入框提示
   * @param {String} v-model - v-model
   * @param {Boolean} getCodeBtn - 是否需要发送验证码按钮
   * @param {Function} getCode - 获取验证码函数
   * @param {String} phoneValidate - 需要验证的手机号码（只有获取验证码的时候用到）
   * @param {Boolean} error - 为true，则会重置获取验证码按钮
   * @param {Function} @change-error - 要讲error改为false
   *
   * @example
   * <vp-input v-model="value" :getCodeBtn="true" @getCode="getCode" :error="isError" @change-error="isError = false"></vp-input>
   *
   */
 
  export default {
    props: {
      phoneValidate: '',
      maxlength: String,
      needBorder: {
        type: Boolean,
        default: true
      },
      getCodeBtn: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      error: {
        type: Boolean,
        default: false
      },
      value: String
    },
    data() {
      return {
        currentValue: this.value,
        btnText: 0,
        btnTimer: null
      }
    },
    methods: {
      handleInput(evt) {
        this.currentValue = evt.target.value;
      },
      getCodeHandler() {
        if (this.btnText) return;
        if (!this.$regex.phone.test(this.phoneValidate)) return this.$vux.toast.text("请输入正确的手机号码");
        this.$emit('getCode');
        clearInterval(this.btnTimer);
        this.btnText = 60;
        this.btnTimer = setInterval(() => {
          if (this.btnText < 1) {
            return clearInterval(this.btnTimer);
          }
          this.btnText--;
        }, 1000)
      }
    },
    watch: {
      currentValue(val) {
        let returnVal = val;
        if (this.type === 'number' && this.maxlength) { //type=number的时候maxlength失效
          returnVal = val.substr(0, this.maxlength)
          this.currentValue = returnVal;
        }
        this.$emit('input', returnVal);
      },
      value(val) {
        this.currentValue = val;
      },
      error(val) {
        if (val) {
          clearInterval(this.btnTimer);
          this.btnText = 0;
          this.$emit('change-error');
        }
      }
    },
    destroyed() {
      clearInterval(this.btnTimer);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/mixin.less";
  @import '~@/assets/less/theme.less';
  .vp-input{
    display: flex;
    height: 0.8rem;
    background: #fff;
    .input-wrapper {
      flex: 1;
      height: 100%;
      padding: 0 0.22rem;
      &.border {
        border: 1px solid #D0D0D0;
        border-radius: 2px;
      }
      input {
        width: 100%;
        height: 100%;
        padding: 0.02rem;
        font-size: 0.28rem;
        border: none;
        border-radius: 0;
      }
    }
    .btn {
      width: 2.1rem;
      margin-left: 0.12rem;
      text-align: center;
      font-size: 0.28rem;
      color:@theme-secondary;
      background: none;
      border-radius: 2px;
      border: 1px solid @theme-secondary;
    }
  }
</style>
