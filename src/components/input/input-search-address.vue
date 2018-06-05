<template>
  <div class="vp-search">
    <div class="lable" v-if="label"  :style="'width:' + labelWidth">{{label}}</div>
    <div  class="vp-search-content vux-1px-b" >
      <input type="text" v-model="curValue" @keyup="$emit('keyup',curValue, isResult = true)" @blur='isResult = false' :placeholder="placeholder" class="vp-search-input" />
      <!-- <i class="serch-icon" @click="curValue=''"></i> -->
      <ul class="vp-search-result" v-show="result&&result.length && isResult">
        <li class="vp-search-result-item" @click="$emit('select', item)" v-for="(item, index) in result" :key="index">{{isStreet ? item.streetTcResult: item.estateTcResult}}</li>
      </ul>
    </div>
    <!-- <button type="button" class="vp-search-btn" @click="$emit('submit',curValue)">搜索</button> -->
  </div>
</template>
<script type='text/javascript'>
  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      result: {
        type: Array,
        default: () => {
          return []
        }
      },
      isStreet: {
        type: Boolean,
        default: true
      },
      labelWidth: {
        type: String
      },
      label: {
        type: String,
        default: ""
      },
      value: String,
    },
    data() {
      return {
        curValue: this.value,
        isResult: true,
      }
    },
    watch: {
      value(val) {
        this.curValue = val;
      },
      curValue(val) {
        this.$emit('input', val);
      },
    },
  }

</script>
<style lang='less' scoped>
  @import '../../assets/less/theme.less';
  .lable{
    margin-right: 0.4rem;
  }
  .vp-search {
    display: flex;
    align-items: center;
    height: 0.8rem;
    padding: 0 0.3rem;
    background: #fff;
    .vp-search-content {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      height: 0.72rem;
      // padding-left: 0.26rem;
      .vp-search-input {
        flex: 1 1 auto;
        height: 0.72rem;
        font-size: 0.26rem;
        color: @text-color;
        background: none;
        border: none;
      }
      .serch-icon {
        width: 0.82rem;
        height: 100%;
        margin-left: 0.2rem;
        background: url('~@/assets/images/search_clean.png') center center no-repeat;
        background-size: 0.3rem;
      }
      .vp-search-result {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        transform: translateY(100%);
        width: 100%;
        max-height: 4.1rem;
        border-bottom-left-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
        overflow-y: auto;
        background: @theme-bg;
        
        .vp-search-result-item {
            padding: 0 0.24rem;
            line-height: 0.8rem;
            border-bottom: 0.01rem solid @border-color;
        }
      }

    }
    .vp-search-btn {
      width: 1.26rem;
      height: 0.72rem;
      line-height: 0.72rem;
      text-align: center;
      font-size: 0.24rem;
      background: none;
      border: none;
    }
  }

</style>
