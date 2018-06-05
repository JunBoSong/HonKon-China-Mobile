<template>
  <div class="vp-cell" :class="{'vux-1px-b': borderB}" :style="{height: height}" @click="linkTo ? $router.push(linkTo) : $emit('click')">
    <span class="vp-cell__label">
      {{label}}
      <slot name="label"></slot>
    </span>
    <span class="vp-cell__title">
      {{title}}
      <slot name="title"></slot>
    </span>
    <span class="vp-cell__value">
      {{value}}
      <slot name="value"></slot>
    </span>
    <i class="vp-cell__arrow" v-show="isLink"></i>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    height: {
      type: String,
      default: "0.9rem"
    },
    isLink: {
      type: Boolean,
      default: true
    },
    borderB: {
      type: Boolean,
      default: true
    },
    label: String,
    title: String,
    value: String,
    linkTo: {//跳转地址
      default: ''
    },
  },
  data() {
    return {

    }
  }
}
</script>
<style lang = 'less' scoped>
@import "~vux/src/styles/1px.less";
.vp-cell {
  display: flex;
  align-items: center;
  /* height: 0.8rem; */
  font-size: 0.28rem;
  color: #666666;
  background: #fff;
  &.vux-1px-b{
    &:after {
    .setBottomLine(#ededed );
    }
  }
  .vp-cell__label {
    width: auto;
  }
  .vp-cell__title {
    margin-left: 0.2rem;
    flex: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vp-cell__value {
    flex: 1 1 0;
    margin-left: 0.1rem;
    text-align: right;
    color: #888888;
    font-size: 0.24rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .vp-cell__arrow{
   display: inline-block;
   width: 0.3rem;
   height: 100%;
   margin-left: 0.08rem;
   background: url('~@/assets/images/arrow_right.png') 0 center no-repeat;
   background-size: 0.3rem;
  }
}
</style>