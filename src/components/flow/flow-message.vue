<template>
  <div class="vp-message">
    <img :src = "require('@/assets/images/all_notice@2x.png')">
    <span class="message-title">{{message}}</span>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang = 'less' scoped>
.vp-message{
    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding: 0 @page-space; */
    height: 0.55rem;
    background: #fff;
    img{
        width: 0.2rem;
        height: 0.2rem;
    }
    .message-title{
        margin-left: 0.1rem;
         font-size: 0.2rem;
         color: #999999;
    }
}

.sectionThree .section-img .vp-update .vp-message img {
  display: none;
}

.select-phone .vp-message.flow-message.bottom-message {
  background: #f4f4f4;
  padding: 0 .44rem;
  margin-left: 0;
  font-size: .22rem;
  height: .33rem;
  line-height: .33rem;
  margin-top: .16rem;
}
</style>
