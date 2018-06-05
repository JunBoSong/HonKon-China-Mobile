<template>
  <div class="item" >
    <img v-lazy="data.coverImage" class="img">
    <div class="content">
      <p class="title row-2-ellipsis">{{data.name}}</p>
      <p class="gift row-2-ellipsis" v-if="!showSellNumber && data.gifts && data.gifts.length">{{data.gifts | filterGifts}}</p>
      <p class="price">{{data.sellPrice | filterPrice}}</p>
      <p class="sold" v-if="showSellNumber">已售：{{data.sellNumber}}</p>
    </div>
    <slot name="recommend"></slot>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: {
    showSellNumber: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      
    }
  },
  filters: {
    filterGifts(val) {
      const arr = val.map(item => item.giftName);
      return arr.join('，')
    }
  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
.item {
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  padding: 0.1rem @page-space;
  font-size: 0;
  background: #fff;
  .img {
    display: block;
    width: 2.26rem;
    height: 2.26rem;
    margin-right: 0.24rem;
  }
  .content {
    flex: 1 1 auto;
    width: 0;
    .title {
      height: 0.68rem;
      line-height: 0.34rem;
      font-size: 0.24rem;
      color: #353535;
      font-weight: 500;
    }
    .gift {
      margin: 0.1rem 0 0.12rem;
      line-height: 0.3rem;
      font-size: 0.24rem;
      color: #ffa008;
      padding-left: 0.3rem;
      background: url("~@/assets/images/goodsdetai_gift@2x.png") 0 0 no-repeat;
      background-size: 0.26rem;
    }
    .price {
      font-size: 0.32rem;
      color: @theme;
    }
    .sold {
        margin-top: 0.42rem;
        font-size: 0.24rem;
        color: #888;
    }
  }
  
}
</style>