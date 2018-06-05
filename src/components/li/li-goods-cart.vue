<template>
  <div class="goods-cart__li" :class="{'timeout': timeout}">
    <div class="flex-wrapper">
      <div class="state" :class="{'selected': selected}" v-if="selector"></div>
      <div class="cover">
        <img v-lazy="coverImage" width="100%" height="100%">
      </div>
      <div class="info">
        <h4 class="title row-2-ellipsis">{{name}}</h4>
        <p class="sku row-ellipsis">{{skus}}</p>
        <div class="other">
          <p class="price">
            <span class="label">{{priceLabel}}</span>
            <span class="number">{{price}}</span>
          </p>
          <div class="cout">
            <vpInputNumber v-model="curNum" :maxValue="maxNum" :minValue="minNum" v-if="editor" :readonly="timeout" />
            <span v-else>x{{curNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script type='text/javascript'>
  import vpInputNumber from '../input/input-number.vue'
  export default {
    props: {
      productId: String,
      skuId: String,
      coverImage: String,
      name: String,
      skus: String,
      priceLabel: String,
      price: Number | String,
      num: Number,
      maxNum: Number, //限制数量
      minNum: Number, //限制数量
      selected: Boolean,
      timeout: Boolean,
      selector: { //是否显示选择框
        type: Boolean,
        default: true
      },
      editor: {
        type: Boolean,
        default: false
      },
    },
    components: {
      vpInputNumber
    },
    data() {
      return {
        curNum: this.num
      }
    },
    methods: {
      async change(isPlus, newVal) {
          this.$vux.loading.show('加载中')
          const params = {
            ownerId: this.$client.userid,
            productId: this.productId,
            skuId: this.skuId,
            num: isPlus ? 1 : -1
          };
          const res = await this.$post('cart/editNum', params);
          this.$vux.loading.hide()
          if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
        // this.$emit('update:num', newVal)
      },
    },
    watch: {
      curNum(newVal, oldVal) {
        this.$emit('updateNum', newVal > oldVal) // 因为接口只支持传 1 或 -1，接口垃圾吧
        // this.$emit('updateNum', newVal)
        // this.change(newVal > oldVal, newVal)
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  .goods-cart__li {
    margin-top: 0.22rem;
    background: #fff;
    .flex-wrapper {
      display: flex;
      padding: 0.36rem @page-space;
      .state {
        width: 0.54rem;
        height: 1.44rem;
        background: url('~@/assets/images/common_checkbox_normal@2x.png') center center no-repeat;
        background-size: 0.3rem auto;
        &.selected {
          background: url('~@/assets/images/common_checkbox_selected@2x.png') center center no-repeat;
          background-size: 0.3rem auto;
        }
      }
      .cover {
        width: 1.44rem;
        height: 1.44rem;
        margin-right: 0.26rem;
      }
      .info {
        flex: 1;
        width: 0;
        .title {
          line-height: 0.3rem;
          font-size: 0.24rem;
          color: #333333;
        }
        .sku {
          // margin: 0.06rem 0 0.16rem;
          line-height: 0.5rem;
          font-size: 0.22rem;
          color: #999999;
        }
        .other {
          display: flex;
          align-items: center;
          .price {
            flex: 1;
            .label {
              font-size: 0.24rem;
              color: #666666;
              vertical-align: middle;
            }
            .number {
              font-size: 0.3rem;
              vertical-align: middle;
              color: @theme;
            }
          }
          .cout {
            height: 0.48rem;
            line-height: 0.48rem;
          }
        }
      }
    }
  }

  .goods-cart__li.timeout {
    background: rgba(255, 255, 255, 0.5);
    .state {
      background: url('~@/assets/images/goods_lapse@2x.png') center center no-repeat;
      background-size: 0.3rem auto;
    }
    .info {
      .other {
        .price {
          .number {
            color: #333;
          }
        }
      }
    }
  }

</style>
