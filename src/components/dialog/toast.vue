<template>
<div>
  <transition name="wc-fade">
    <div class="wc-toast" v-if="show" :class="{'wc-toast--center': location == 'center'|| location =='', 'wc-toast--default': location == 'bottom', 'wc-toast--top': location == 'top'}">
      <div class="wc-toast-message" :style="toastStyle">
        <img :src="path" alt="" :style="imgStyle" v-if="path">
        <div class="wc-toast__text" :style="textStyle">{{content}}</div>
      </div>
    </div>
  </transition>

</div>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      content: String,
      duration: {
        type: Number,
        default: 3000
      },
      location: {
        type: String,
        default: 'center'
      },
      toastStyle: {
        type: Object,
        default: function () {
          return {}
        }
      },
      imgStyle: {
        type: Object,
        default: function () {
          return {}
        }
      },
      textStyle: {
        type: Object,
        default: function () {
          return {}
        }
      },
      path: {
        type: String,
        default: ''
      },
    },
    mounted() {
      let listener = () => {
        this.show = false;
      }
      window.addEventListener('hashchange', listener);
      window.addEventListener('popstate', listener);
      window.addEventListener('pagehide', listener);
    }
  }

</script>
<style scoped lang="less">
  .wc-toast {
    position: fixed;
    z-index: 999999;
    line-height: 17px;
  }

  .wc-toast--default {
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 80px;
  }

  .wc-toast--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wc-toast--top {
    top: 80px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wc-toast-message {
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;
    color: #fff;
    border-radius: 6px;
    background: #323232;
    opacity: .9;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      margin-bottom: 8px;
    }
    .wc-toast__text {}
  }

  .wc-fade-enter {
    opacity: 0
  }

  .wc-fade-enter-active,
  .wc-fade-leave-active {
    transition: opacity .4s
  }

  .wc-fade-leave-active {
    opacity: 0;
  }

</style>
