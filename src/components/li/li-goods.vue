<template>
  <div class="li-goods">
    <div class="li-goods__cont" >
      <div class="cover">
        <img v-lazy="data.coverImage">
      </div>
      <div class="content">
        <p class="title row-2-ellipsis">{{data.name}}</p>
        <p class="price" :class="priceColor">{{data.sellPrice | filterPrice}}</p>
      </div>
    </div>
    <div class="li-goods__opts" v-show="hasRecommend || data.gifts && data.gifts.length">
      <div class="gifts">
        <p class="gift row-2-ellipsis" v-for="(item, index) in data.gifts" :key="index">{{item.giftName}}</p>
      </div>
      <slot name="recommend"></slot>
    </div>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    priceColor: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      require: true
    }
  },
  computed: {
    hasRecommend() {
      return this.$slots.recommend;
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
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
.li-goods {
  background: #fff;
  margin-top: 0.2rem;

}
.li-goods__cont {
  display: flex;
  padding: 0 @page-space;
  .cover {
    width: 1.6rem;
    height: 1.6rem;
    padding: 0.16rem 0 0.14rem;
    margin-right: 0.24rem;
    text-align: center;
    box-sizing: content-box;
    img {
      width: auto;
      max-width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 1 1 auto;
    width: 0;
    .title {
      height: 0.78rem;
      margin-top: 0.22rem;
      line-height: 0.36rem;
      font-size: 0.28rem;
      color: #333;
      /* font-weight: 500; */
    }

    .price {
      margin-top: 0.18rem;
      font-size: 0.32rem;
      color: @theme;
      &.black {
        color: @text-color;
      }
    }
    .sold {
        margin-top: 0.42rem;
        font-size: 0.24rem;
        color: #888;
    }
  }

}
.li-goods__opts {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.15rem @page-space;
  /* border-top: 0.01rem solid @border-color; */

  .gifts {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    .gift {
      margin-right: .2rem;
      padding-left: 0.3rem;
      font-size: 0.24rem;
      color: #333;
      background: url("~@/assets/images/goodsdetai_gift@2x.png") 0 center no-repeat;
      background-size: 0.26rem;
    }
  }
}
.li-goods__opts::before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid @border-color;
    color: @border-color;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
</style>
