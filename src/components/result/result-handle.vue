<template>
  <div class="vp-result-handle">
    <div class="bg-img">
      <img v-lazy="{src: img, error: defaultImg, loading: defaultImg}">
    </div>
    <div class="data-wrapper">
      <h1 class="data-title" v-if="title">{{title}}</h1>
      <p class="data-item" :class="{'vux-1px-b': index !== list.length-1}" v-for="(item, index) of list" :key="index">
        <span class="data-item-name">{{item.name}}</span>
        <span class="data-item-value" v-html="item.value"></span>
      </p>
    </div>
    <slot></slot>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    img: {
      type: String,
      default: require('@/assets/images/work_success_img.png')
    },
    title: String,
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      defaultImg: require('@/assets/images/default/336x210.png')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/mixin.less';
.vp-result-handle {
  height: 100%;
  background-image: linear-gradient(-180deg, #FFFFFF 0%, #FAFAFA 100%);
  .bg-img {
    .img-box(60%);
  }
  .data-wrapper {
    width: 90%;
    margin: 0.5rem auto 0;
    background: #FFFFFF;
    box-shadow: 0 0.02rem 0.15rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.1rem;
    padding: 0.2rem 0.3rem;
    .data-title {
      padding: 0.2rem 0;
      text-align: center;
      font-size: 0.36rem;
      color: #333333;
      font-weight: bold;
    }
    .data-item {
      display: flex;
      font-size: 0.28rem;
      color: #666;
      padding: 0.3rem 0;
      .data-item-value {
        flex: 1;
        margin-left: 0.2rem;
        text-align: right;
      }
    }
  }
}
</style>
