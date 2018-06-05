<template>
  <div class="vp-input-radio">
    <span class="label" v-if="label" :style="'width:' + labelWidth">{{label}}</span>
    <checker v-model="currentValue" :type="type" :default-item-class="type" selected-item-class="selected"  :class="direction" :radio-required="radioRequired" @on-change="$emit('on-change', currentValue)">
      <checker-item :class="{'line':isNeedLine}" :disabled="item.disabled" :value="item.value || item" v-for="(item, index) of list" :key="index">
        <i class="icon-state"></i>
        <span :style="'font-size:' + fontSize" class="name">{{item.name || item}}{{item.tip ? item.tip:''}}</span>
        <!-- <span class="tip">{{item.tip ? item.tip:''}}</span> -->
      </checker-item>
    </checker>
  </div>
</template>
<script type = 'text/javascript'>
import { Checker, CheckerItem } from "vux";
export default {
  props: {
    value: {
      required: true
    },
    type: {
      type: String,
      default: "radio" //多选： checkbox 单选： radio
    },
    fontSize: {
      type: String,
      default: "0.26rem"
    },
    radioRequired: {
      //在单选模式下是否必选一个值。设为 true 后点击当前选中項不会取消选中。
      type: Boolean,
      default: false
    },
    labelWidth:{
      type: String
    },
    max: Number, //最多可选个数，多选时可用,
    label: String,
    direction: {
      type: String,
      default: "row" // column
    },
    list: {
      type: Array, //数组对象 [{name: '选項1', value: 1,tip:'备注'}, {name: '选項2', value: 2,tip:'备注'}]   [1 , 2]
      require: true
    },
    isNeedLine: {
      //是否需要分割线
      type: Boolean,
      default: false
    },
  },
  components: { Checker, CheckerItem },
  created() {
    if (
      this.type === "checkbox" &&
      Object.prototype.toString.call(this.value) !== "[object Array]"
    ) {
      throw new Error("类型为多选的时候，value应为数组");
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang = 'less' scoped>
@import "~@/assets/less/theme.less";

.vp-input-radio {
  display: flex;
  .label {
    width: auto;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-right: @label-input-space;
    font-size: 0.28rem;
    color: #666666;
  }
  .vux-checker-box {
    flex: 1;
    display: flex;
    .vux-checker-item {
      display: flex;
      flex: 1 1 auto;
      margin-top: 0.2rem;
      padding-bottom: 0.2rem;
      &.line {
        border-bottom: 1px solid #e9e9e9;
      }
      .icon-state {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        margin-top: 0.02rem;
      }
      .name {
        flex: 1 1 0;
        display: inline-block;
        margin-left: 0.1rem;
      }
      &.radio {
        .icon-state {
          background: url("~@/assets/images/common_checkbox_normal@2x.png")
            center center no-repeat;
          background-size: 0.3rem auto;
        }
        &.selected {
          .icon-state {
            background: url("~@/assets/images/common_checkbox_selected@2x.png")
              center center no-repeat;
            background-size: 0.3rem auto;
          }
        }
      }
      &.checkbox {
        .icon-state {
          background: url("~@/assets/images/common_checkbox_multiselect_nor@2x.png")
            center center no-repeat;
          background-size: 0.3rem auto;
        }
        &.selected {
          .icon-state {
            background: url("~@/assets/images/common_checkbox_multiselect@2x.png")
              center center no-repeat;
            background-size: 0.3rem auto;
          }
        }
      }
    }
    &.column {
      display: block;
    }
  }
}

.select-phone .vux-checker-box .vux-checker-item .icon-state {
  /* margin: 0.25rem 0.06rem 0 0; */
}

</style>
