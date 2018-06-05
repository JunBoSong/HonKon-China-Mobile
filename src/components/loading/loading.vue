<template>
  <transition :name="transition">
    <div
      class="weui-loading_toast vux-loading"
      :class="!text ? 'vux-loading-no-text' : ''"
      v-show="show">
      <div class="vp-mask_transparent"></div>
      <div
        class="vp-toast"
        :style="{
          position: position
        }">
        <!-- <i class="weui-loading weui-icon_toast"></i> -->
        <i class="vp-loading weui-icon_toast"></i>        

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    text: String,
    position: String,
    transition: {
      type: String,
      default: 'vux-mask'
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/weui/widget/weui_tips/weui_mask';
@import '~vux/src/styles/weui/widget/weui_tips/weui_toast';
@import '~vux/src/styles/weui/widget/weui-loading/weui-loading.less';
.vp-mask_transparent{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.4)
}
.vux-loading .vp-toast {
  z-index: 100000000000;
  position: fixed;
  z-index: 5001;
  width: 7.6em;
  min-height: 7.6em;
  top: 180px;
  left: 50%;
  margin-left: -3.8em;
  background: none;
  text-align: center;
  border-radius: 5px;
  color: #FFFFFF;
}
.weui-icon_toast.weui-loading {
  margin: 30px 0 0;
  width: 38px;
  height: 38px;
  vertical-align: baseline;
  display: inline-block;
}
.vux-mask-enter, .vux-mask-leave-active,
.vux-mask-leave-active, .vux-mask-enter-active {
  position: relative;
  z-index: 1;
}
.vux-mask-enter, .vux-mask-leave-active {
  opacity: 0;
}
.vux-mask-leave-active, .vux-mask-enter-active {
  transition: opacity 300ms;
}
.vux-loading-no-text .weui-toast {
  min-height: 98px;
}
.vp-loading{

  width: 7.6em;
  height: 7.6em;
  vertical-align: baseline;
  display: inline-block;
  background: url('../../assets/images/loading.gif');
  background-size: 100%;
}
</style>