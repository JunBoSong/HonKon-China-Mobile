<template>
  <div class="vp-input-message">
    <div class="label" v-if="label" :style="'width:' + labelWidth">{{label}}</div>
    <div class="content" :class="{'vux-1px-b': borderB}" v-if="readonly">
      <div class="content-text" :class="{'placeholder': !curVal}">
        {{curVal || placeholder}}
      </div>
      <i class="icon-input" :class="[icon]" v-if="icon"></i>
    </div>
    <div class="content" :class="{'vux-1px-b': borderB}" v-else>
      <input :type="type" :maxlength="maxlength" :placeholder="placeholder" v-model="curVal" :readonly="readonly" v-keyBoard/>
      <!-- <i class="icon-input" :class="[icon]" v-if="icon"></i> -->
    </div>

  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    maxlength:{
      type: Number,
      default: 50
    },
    icon: {
      //editor 、 arrow
      type: String,
      default: ""
    },
    borderB: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    placeholder2:{
       type: String,
      default: "请输入"
    },
  },
  data() {
    return {
      curVal: this.value
    };
  },
  watch: {
    value(val) {
      this.curVal = val;
    },
    curVal(val) {

      this.$emit("input", val);
    }
  }
};
</script>
<style lang = 'less' scoped>
@import "~@/assets/less/theme.less";
.vp-input-message {
  position: relative;
  display: flex;
  /*height: 0.8rem;*/
  /* width: 100%; */
  padding: 0 @page-space;
  background: #fff;
  .label {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #666;
    margin-right: @label-input-space;
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
    /* &.border-b {
      border-bottom: 0.04rem solid @border-color;
    } */

    .content-text {
      flex: 1 1 auto;
      width: 0;
      line-height: 0.4rem;
      padding: 0.2rem 0.1rem 0.2rem 0;
      font-size: 0.28rem;
      &.placeholder {
        color: #d8d8d8;
      }
    }
    input {
      flex: 1;
      width: 0;
      height: 2.5em; /*解決金立手機輸入框文字被切割*/
      /* line-height: 1.6em;解決金立手機輸入框文字被切割 */
      /* line-height: 2.5rem; 去掉行高，ios8上的输入光标太高*/
      border: none;
      background: none;
      font-size: 0.28rem;
    }
    .icon-input {
      width: 0.4rem;
      height: 0.4rem;
      &.editor {
        background: url("~@/assets/images/address_write@2x.png") right 0
          no-repeat;
        background-size: 0.4rem;
      };
      &.date {
        background: url("~@/assets/images/work_dates@2x.png") right 0
          no-repeat;
        background-size: 0.4rem;
      }
    }
  }
}
.sectionTwo .vp-input-message {
  padding: 0;
}
.select-phone .label {
  width: 1.4rem;
  margin-right: 0;
  line-height: .9rem;
  padding-right: .25rem;
  z-index: 1;
  background: #fff;
  box-sizing: content-box;
}
.select-phone .vp-input-message {
  padding: 0 !important;
  height: .9rem;
}
.sectionTwo,.sectionThree {
  .vp-input-message .content{
    input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
      color:#999999;
      font-size:.28rem;
    }
  input:-moz-placeholder,textarea:-moz-placeholder{
   color:#999999;
      font-size:.28rem;
  }

  input::-moz-placeholder,textarea::-moz-placeholder{
   color:#999999;
      font-size:.28rem;
  }
  input:-ms-input-placeholder,textarea:-ms-input-placeholder{
   color:#999999;
      font-size:.28rem;
  }
}
}
</style>

