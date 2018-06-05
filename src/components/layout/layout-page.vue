<template>
  <div class="page-wrapper" :style="{height: `${ heightAuto || height}px`}">
  <!-- <div class="page-wrapper" :style="{height: `100%`}"> -->
    
    <slot name="header"></slot>
    <div class="page-content" :class="{'overflow-touch': overflowTouch}" ref="content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script type='text/javascript'>
  export default {
    props: {
      //-webkit-overflow-scrolling: touch; 会导致弹层不能正常定位，如果页面中用position: absolute; 来实现弹层的效果将此值设定为false
      overflowTouch: {
        type: Boolean,
        default: true
      },
      heightAuto: {
        type: [String, Number],
        default: null,
      }
    },
    computed: {
      height() {
        return document.documentElement.clientHeight || document.body.clientHeight
      }
    },
    data() {
      return {

      }
    },
    methods: {
      // height() {
      //   return document.documentElement.clientHeight || document.body.clientHeight
      // }
    }
  }

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  .page-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: @theme-bg;
    .page-content {
      position: relative;
      flex: 1 1 0;
      width: 100%;
      position: relative;
      overflow-x: hidden;
      &.overflow-touch {
        -webkit-overflow-scrolling: touch;
      }
    }
  }

</style>
