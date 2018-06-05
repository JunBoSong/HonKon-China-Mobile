<template>
  <div class="vp-search">
    <form action="javascript:" class="vp-search-content" @submit="$emit('submit',curValue)">
      <input type="text" v-model="curValue" :placeholder="placeholder" class="vp-search-input" />
      <i class="serch-icon" @click="curValue=''"></i>
      <ul class="vp-search-result" v-show="result.length">
        <li class="vp-search-result-item" @click="$emit('select', item)" v-for="(item, index) in result" :key="index">{{item.name || item}}</li>
      </ul>
    </form>
    <button type="button" class="vp-search-btn" @click="$emit('submit',curValue)">搜索</button>
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
      value: String,
    },
    data() {
      return {
        curValue: this.value
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
  .vp-search {
    display: flex;
    align-items: center;
    height: 1rem;
    padding-left: 0.46rem;
    background: #fff;
    .vp-search-content {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      height: 0.72rem;
      padding-left: 0.26rem;
      background: @theme-bg;
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
        background: #ddd;
        
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
