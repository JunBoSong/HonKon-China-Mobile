<template>
    <div class="title-wrapper">
        <div class="subject-title">
            <img :src="data.icon" class="subject-title-icon" v-if="data.icon"/>
            <span class="subject-title-text" >{{data.name}}</span>
            <!-- <router-link to="/" class="subject-title-link">MORE</router-link> -->
        </div>
        <div @click="goPrefe(data)" class="img-wrapper" v-if="data.cover">
            <img v-lazy="{src: data.cover, error: defaultImg, loading: defaultImg }" alt="父专题封面图">
        </div>
    <div class="title-list" v-if="data.goodsStyle == 2 && data.subjectGoodsList.length">
        <ul class="list-wrapper">
            <router-link tag="li" :to="`/shopping/detail?id=${item.goodsId}`" class="goods-item vux-1px" v-for="(item, index) in data.subjectGoodsList.slice(0,5)" :key="index">
                <img :src="item.goodsImgPoster" width="100%">
                <p class="goods-item-name">{{item.goodsName}}</p>
                <p class="goods-item-price">HK{{item.price | filterPrice}}</p>
            </router-link>
            <!-- <router-link tag="li" v-if="link && data.subjectGoodsList.length >= 5"  class="goods-item ztmore"></router-link> -->
        </ul>        
    </div>
    </div>
</template>
<script type = 'text/javascript'>
export default {
  props: ["data"],
  data() {
    return {
      defaultImg: require("@/assets/images/default/750x300.png")
    };
  },
  methods: {
      goPrefe(data) {
          console.log(data)
          if (data.businessType == 1) {
              this.$router.push({path: '/store/prefecture', query: {zoneId: data.id, zoneImg: data.cover}})
          }
      }
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/less/theme.less";
@import "../../assets/less/mixin.less";
@import "~vux/src/styles/1px.less";
.img-wrapper {
  .img-box(43%);
  /*margin: 0.24rem 0;*/
}

.subject-title {
  display: flex;
  height: 0.9rem;
  padding: 0 @page-space;
  align-items: center;
  .subject-title-icon {
    width: 0.48rem;
    margin-right: 0.05rem;
  }
  .subject-title-text {
    flex: 1 1 auto;
    width: 0;
    height: 0.9rem;
    line-height: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.28rem;
    color: #333333;
    letter-spacing: 0;
  }
  .subject-title-link {
    width: 1.3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: right;
    font-size: 0.22rem;
    color: #999999;
  }
}
.title-list {
    width: 100%;
    height: 4.6rem;
    overflow: hidden;
    padding-top: 0.2rem;
    -webkit-overflow-scrolling: touch;
    .list-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        min-width: auto;
        height: 100%;
        padding: 0 0.2rem; 
        overflow-x: auto;
        .goods-item {
            /* flex: 0 0 1.6rem; */
            margin-right: 0.2rem;
            vertical-align: middle;
            font-size: 0;
            width:2.7rem;
            height: 3.7rem;
            background: #FCFCFC;
            /* border: 1px solid #EDEDED; */
            &.vux-1px {
            &:before {
                .setLine(#EDEDED);
            }
            }
            img {
              width:2.7rem;
              height: 2.67rem;
                /* display: block;
                width: 1.56rem;
                height: 1.56rem; */
            }
            .goods-item-name {
                width: 100%;
                padding: 0 0.08rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.25rem;
                text-align: center;
                color: #333333;
            }
            .goods-item-price {
                padding: 0 0.08rem;
                font-size: 0.24rem;
                text-align: center;
                color: @theme;
            }
            &.ztmore {
                /* background: url('../../assets/images/ztmore.png') no-repeat center; */
                background-size: 100%;
                border: none;
            }
        }
    }
}
</style>