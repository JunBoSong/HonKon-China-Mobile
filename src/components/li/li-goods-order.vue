<template>
  <div class="li-goods-order">
    <div class="title">
      <p class="order-num">訂單號：{{data.orderNo}}</p>
      <p class="order-state" v-if="data.orderStatus">{{stateText}}</p>
    </div>
    <div class="content-wrapper" @click="$emit('on-content-click')">
      <img v-lazy="data.orderItemList[0].coverImage" class="cover" alt="商品图片">
      <div class="content">
        <p class="name row-2-ellipsis">{{data.orderItemList[0].productName}}</p>
        <p class="skus row-ellipsis">{{data.orderItemList[0].property}}</p>
        <p class="price-num">
          <span class="price">{{data.orderItemList[0].salePrice | filterPrice}}</span>
          <span class="num">x{{data.productNum}}</span>
        </p>
      </div>
    </div>
    <div class="add" v-show="data.orderStatus*1 !== 3">
      <button type="button" :class="['btn-submit', stateBtnColor]" @click="$emit('on-btn-click')">
        <i :class="['icon', stateIconClass]"></i>
        <span class="text">{{ stateBtnText }}</span>
      </button>
    </div>
  </div>
</template>
<script type='text/javascript'>
  export default {
    props: {
      data: {
        type: Object,
        required: true,
        default: {}
      }
    },
    computed: {
      stateText() {
        const arr = ['','待支付', '待發貨', '已發貨', '已完成', '退款中', '已關閉']
        return arr[this.data.orderStatus*1]
      },
      stateIconClass() {
        const arr = ['','icon-card', 'icon-truck', 'icon-truck', 'icon-truck', 'icon-truck', 'icon-truck', 'icon-truck']
        return arr[this.data.orderStatus*1]
      },
      stateBtnColor() {
        const arr = ['','yellow', 'green', 'green', 'green','green', 'green']
        return arr[this.data.orderStatus*1]
      },
      stateBtnText() {
        // console.log(this.data)
        // 1-待付款->2-待发货->3-待收货->4-已完成 ->5-退款中—>6-已关闭
        const arr = ['','待支付', '待發貨', '已發貨', '已完成', '退款中', '已關閉']
        return arr[this.data.orderStatus*1]
      }
    },
    data() {
      return {

      }
    },
    mounted() {
    }
  }

</script>
<style lang='less' scoped>
@import '~@/assets/less/theme.less';
.li-goods-order {
  margin-top: 0.22rem;
  padding-left: 0.3rem;
  background: #fff;
  .title {
    display: flex;
    height: 0.64rem;
    line-height: 0.64rem;
    padding-right: 0.3rem;
    font-size: 0.24rem;
    border-bottom: 0.01rem solid @border-color;
    .order-num {
      flex: 1;
      color: #333;
    }
    .order-state {
      color: #888;
    }
  }
  .content-wrapper {
    display: flex;
    padding: 0.3rem 0.48rem 0.3rem 0;
    border-bottom: 0.01rem solid @border-color;
    .cover {
      width: 1.44rem;
      height: 1.44rem;
      margin-right: 0.35rem;
    }
    .content {
      flex: 1;
      .name {
        line-height: 0.3rem;
        font-size: 0.24rem;
        color: #222222;
      }
      .skus {
        line-height: 0.54rem;
        font-size: 0.22rem;
        color: #666666;
      }
      .price-num {
        line-height: 0.36rem;
        .price {
          font-size: 0.28rem;
          color: @theme;
        }
        .num {
          float: right;
          font-size: 0.2rem;
          color: #222222;
        }
      }
    }
  }
  .add {
    position: relative;
    height: 0.64rem;
    padding: 0.12rem 0;
    .btn-submit {
      position: absolute;
      right: 0.3rem;
      display: flex;
      align-items: center;
      height: 0.4rem;
      padding: 0 0.18rem;
      border-radius: 0.2rem;
      background: none;
      font-size: 0.22rem;
      &.yellow {
        color: @theme-yellow;
         border: 0.01rem solid @theme-yellow;
      }
      &.green {
        color: @theme-secondary;
         border: 0.01rem solid @theme-secondary;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: middle;
        margin-right: 0.04rem;
        &.icon-card {
          background: url('~@/assets/images/my_pay@2x.png') 0 0 no-repeat;
          background-size: 0.3rem;
        }
        &.icon-truck {
          background: url('~@/assets/images/my_shipping@2x.png') 0 0 no-repeat;
          background-size: 0.3rem;
        }
      }
    }
  }
}

</style>
