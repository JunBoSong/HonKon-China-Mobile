<template>
  <div class="li-mine-business">
    <div class="info-box">
      <div :class="['info-item', {'vux-1px-b': index != data.length-1}]" v-for="(item, index) in data" :key="index">
        <span class="label">{{item.name}}</span>
        <span class="value">{{item.value}}</span>
      </div>
    </div>
    <div class="info-opts child-vertical-middle vux-1px-l">
      <button type="button" @click="$emit('on-click-btn')">{{btnText}}</button>
    </div>
  </div>
</template>
<script type='text/javascript'>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      btnText: {
        type: String,
        default: '查看'
      }
    },
    data() {
      return {

      }
    },
    created() {

    }
  }

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  @import "~vux/src/styles/1px.less";
  .li-mine-business {
    display: flex;
    margin-top: 0.22rem;
    padding-left: 0.24rem;
    background: #fff;
    .info-box {
      flex: 1 1 auto;
      .info-item {
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.24rem;
        color: #666;
        &.vux-1px-b{
          &:after {
          .setBottomLine(#ededed );
          }
        }
        .value {
          color: #333;
        }
      }
    }
    .info-opts {
      width: 1.8rem;
      margin-left: 0.4rem;
      text-align: center;
      display: flex;
      justify-content: center;
      &.vux-1px-l{
        &::after {
        .setLeftLine(#ededed );
        }
      }
      button {
        align-self: center;
        width: 1.3rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border: 0.01rem solid @theme-secondary;
        border-radius: 0.04rem;
        background: none;
        color: @theme-secondary;
        font-size: 0.22rem;
      }
    }
  }

</style>
