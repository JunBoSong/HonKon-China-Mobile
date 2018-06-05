<template>
  <form class="search-wrapper" @submit="submit">
    <div class="input-wrapper">
      <input type="text" v-model="curValue" :placeholder="placeholder" class="input">
      <i class="icon-x" @click="curValue = ''"></i>
    </div>
    <button type="submit" class="btn-submit">搜索</button>
  </form>
</template>
<script type='text/javascript'>
  export default {
    props: {
      value: {
        require: true,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        curValue: this.value
      }
    },
    methods: {
      submit(event) {
        event.preventDefault();
        this.$emit('submit')
      }
    },
    watch: {
      value(val) {
        this.curValue = val;
      },
      curValue(val) {
        this.$emit('input', val);
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  .search-wrapper {
    display: flex;
    padding: 0.14rem 0.1rem 0.14rem 0.46rem;
    background: #fff;
    border-bottom: 0.01rem solid @border-color;
    .input-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      height: 0.72rem;
      padding-left: 0.26rem;
      background: @theme-bg;
      .input {
        flex: 1;
        padding: 0.1rem 0;
        font-size: .26rem;
        background: none;
        border: none;
      }
      .icon-x {
        width: 0.6rem;
        height: 100%;
        background: url("~@/assets/images/search_clean.png") 0.04rem center no-repeat;
        background-size: 0.3rem;
      }
    }
    .btn-submit {
      width: 1.16rem;
      text-align: center;
      font-size: 0.24rem;
      color: #333333;
      background: none;
      border: none;
    }
  }

</style>
