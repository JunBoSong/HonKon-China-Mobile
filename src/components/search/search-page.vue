<template>
  <div>
    <form v-if="showSearch === false" class="search-wrapper" @submit="submit">
      <div class='goBakc' @click='goBakc'></div>
      <div class="input-wrapper">
        <input type="text" v-model="curValue" :placeholder="placeholder" class="input">
        <i class="icon-x" :class="curValue !=='' ? '' : 'icon-s'" @click="curValue = ''"></i>
      </div>
      <button type="submit" class="btn-submit">搜索</button>
    </form>
    <div class='search' v-if='showSearch === true'>
      <div class='search_info' @click="submit">
        <div class="icon-s"></div>
        {{placeholder}}
      </div>
    </div>
  </div>
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
      },
      showSearch: {
        type: Boolean,
        default: false,
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
      },
      goBakc() {
        this.$router.go(-1)
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
  .goBakc{
    height: 0.4rem;
    width: 0.4rem;
    align-self: center;
    background: url("~@/assets/images/topbar_back_arrow@2x.png")  center no-repeat;
    background-size: 100% 100%;
  }
  .search-wrapper {
    display: flex;
    padding: 0.14rem 0.1rem 0.14rem 0.2rem;
    background: #fff;
    border-bottom: 0.01rem solid @border-color;
    .input-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      border-radius: 0.99rem;
      height: 0.6rem;
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
      .icon-s{
        background: url("~@/assets/images/topbar_search@2x.png") 0.04rem center no-repeat;
        background-size: 0.4rem;
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
  .search{
    display: flex;
    padding: 0.14rem 0.6rem;
    background: #fff;
    border-bottom: 1px solid @border-color;
    .search_info{
      flex: 1;
      display: flex;
      height: 0.6rem;
      padding: 0.1rem 0.2rem;
      opacity: 0.5;
      background: #DCDCDC;
      border-radius: 0.99rem;
      font-size: 0.24rem;
      color: #888888;
      letter-spacing: 0;
    }
    .icon-s{
      width: 0.6rem;
      height: 100%;
      margin-right: 0.1rem;
      background: url("~@/assets/images/topbar_search@2x.png") 0.04rem center no-repeat;
      background-size: 0.3rem;
    }
  }

</style>
