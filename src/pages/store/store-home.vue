<template>
<div style="height: 100%">
  <vp-layout-page>
    <!-- <vp-header-page title='店铺' slot='header'/> -->
    <!-- <div style="position:relative;height:100%;overflow:hidden;"> -->
    <!-- <vp-layout-scroll :on-refresh="refresh" :on-infinite="infinite" ref="scroller"
                refreshText="下拉就刷新一下咯"
                noDataText="真没有了"> -->
    <div style="padding-bottom: 10px;">
      <swiper :auto="false" :loop="true" :aspect-ratio="320/750">
        <swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
          <!-- <router-link :to="item.urlType | filterLink"> -->
          <div @click="filterLink(item)">
            <img v-lazy="item.advertImage" width="100%" height="100%">
          </div>
        </swiper-item>
      </swiper>

      <div class="info">
        <i class="icon-personal"></i>
        <span class="user">{{storeInfo&&storeInfo.name}}</span>
        <p class="location">
          <i class="icon-address"></i>
          <span>{{storeInfo&&storeInfo.province + storeInfo&&storeInfo.city + storeInfo&&storeInfo.district || '無地址'}}</span>
        </p>
      </div>
      <div class="menu">
        <div class="menu-item" v-for="(item,index) in menuList" :key="index" @click="filterLink(item)">
          <!-- <router-link class="menu-item" v-for="(item,index) in menuList" :key="index" to=""> -->
          <img v-lazy="item.advertImage" width="100%" height="100%">
        </div>
      </div>
      <component class="subject" v-for="(item,index) in subjectList" v-if="filterSubjectShow(item)" :key="index" :is="item.childStyle | vpSubjectType"
        :childList="item.childSubjectList || []">
        <!-- <vp-subject-title :title="item.style != 2 && item.name" :icon="item.style != 2 && item.icon" :img="item.style != 3 && item.cover"
          :to="item.childSubject == 1 ? {path:'home/zone/child',query:{parentId:item.id}} :  {path:'home/zone/parent',query:{parentId:item.id}}"
          :color="item.nameColor"></vp-subject-title> -->
        <vp-subject-title :data="item"></vp-subject-title>
      </component>
      <div class="recomoned" v-if="goodsList.length">
        <h1 class="title">推薦商品</h1>
        <ul style="font-size: 0;">
          <vp-li-goods-grid v-for="(item, index) in goodsList" :data="item" :key="index" @click.native="$router.push({name:'shoppingDetail',query:{id:item.id}})"></vp-li-goods-grid>
        </ul>
      </div>
      <!-- </vp-layout-scroll> -->
    </div>
  </vp-layout-page>
  </div>
</template>
<script type='text/javascript'>
  import {
    Swiper,
    SwiperItem
  } from 'vux';
  import {
    vpSubjectNone,
    vpSubjectTwo,
    vpSubjectThree,
    vpSubjectFour,
    vpSubjectFive,
    vpSubjectTitle,
    vpLiGoodsGrid,
  } from '@/components';
import { PassThrough } from 'stream';
  export default {
    components: {
      Swiper,
      SwiperItem,
      vpSubjectNone,
      vpSubjectTwo,
      vpSubjectThree,
      vpSubjectFour,
      vpSubjectFive,
      vpSubjectTitle,
      vpLiGoodsGrid
    },
    data() {
      return {
        defaultImgBanner: require('@/assets/images/default/750x250.png'),
        defaultImgMenu: require('@/assets/images/default/144x144.png'),
        swiperList: [],
        menuList: [],
        subjectList: [],
        goodsList: [],
        storeInfo: {}
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
      this.$session.remove('createOrderInfo');
      this.getAdvertPage(1)
      this.getAdvertPage(3)
      this.getSubject();
      this.getGoods();
      this.getStoreInfo();
    },
    filters: {
      vpSubjectType(childStyle) { //childStyle显示是什么样的排版 1:不显示 2:2图 3:3图  4:4图  5:5图
        console.log(childStyle)
        let obj = {
          null: 'vpSubjectNone',
          1: 'vpSubjectNone',
          2: 'vpSubjectTwo',
          3: 'vpSubjectThree',
          4: 'vpSubjectFour',
          5: 'vpSubjectFive',
        }
        return obj[childStyle]
      },
    },
    methods: {
      filterSubjectShow(val) {
        return true
      },
      // banner轮播跳转 - item: 后台单条数据
      // urlType: 1.商品 （2.前台分类） （3.后台分类） 4.专题活动 5.业务包 （6.业务）业务包 （6.业务） 7.外部链接 8.其它链接  9.业务预约
      // urlType = 4: urlKey当前专题id。如果当前专题是子专题，mixin为该子专题的父专题id
      // urlType = 5: mixin-业务包类型。//1.合约；2.套餐；3.流量包；4.宽带；5.充值；6.预存赠送；7.数字化服务
      filterLink(item) {
        if(!item.urlAddr) return //如果配置的空地址什么都不响应
        switch (item.urlType - 0) {
          case 1: // 商品详情
            this.$router.push({path: '/shopping/detail', query: {packageId: item.id, businessType: 1, packageName: itme.advertName}})
            break
          case 5:
            this.$router.push({path: '', query: {id: item.id}})
            break
          case 7: // 外部链接
            window.location.href = item.urlType
            break
          case 8: // 其它链接是内部链接
            console.log(item.urlType)
            this.$router.push({path: item.urlAddr})
            break
          default:
            window.location.href = item.urlType
            break
        }
      },
      async getAdvertPage(type, page = 1) { //获取banner和菜单
        let res = await this.$post("advert/page", {
          pageNumber: page,
          pageSize: 10,
          userId: this.$client.userid,
          advertType: type //1.首页Banner 2.列表Banner 3.导航管理 4.专题管理 5.H5底部菜单 6.IOS底部菜单 7.ANDROID底部菜单 8.闪屏页管理 9.图文广告 10.工作台
        })
        const obj = {
          1: 'swiperList',
          3: 'menuList'
        }
        this[obj[type]] = res.records;
      },
      async getSubject() { //获取专题列表
      
        const res = await this.$post("zoneconf/list", {
          userId: this.$client.userid, //机构隔离必传  不隔离不传
          status: 0 //0：查询全部  1：查询已上架  2：查询未上架
        })
        
        this.subjectList = res.records;
      },
      async getGoods() { //获取推荐商品
        const req = {
          pageNumber: this.pageNumber,
          pageSize: 20,
          // userId: this.$client.userid,
          orgId: this.$client.orgid,
          shopId: this.$client.shopid,
          isRecommend: 1, //是否为推荐商品 [{1: 是}, {2：否}]
          aesToken: this.$client.aesToken,
          shopUserType: this.$client.usertype
        }
//         {
//   "pageSize" : "20",
//   "shopId" : "985119216739872768",
//   "pageNumber" : "1",
//   "isRecommend" : "1",
//   "orgId" : "918720751226753026",
//   "appId" : "10000188",
//   "shopUserType" : "2"
// }
        const res = await this.$post("product/product", req)
        if (!res.records) return
        this.pageNumber++;
        this.goodsList = [...this.goodsList, ...res.records];
      },
      async getStoreInfo() {
        const res = await this.$post("shop/info", {
          'id': this.$client.shopid
        })

        if (res.returnCode != 1000) return
        this.storeInfo = res.dataInfo;
      }
    },

  }

</script>
<style lang='less' scoped>
  .menu {
    margin-bottom: 0.1rem;
    padding: 0 0.15rem;
    background: #fff;
    .menu-item {
      display: inline-block;
      width: 1.8rem;
      height: 1.6rem;
    }
  }
  .info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.56rem;
    padding: 0 @page-space;
    color: #fff;
    font-size: 0.24rem;
    background-image: linear-gradient(-161deg, #D3EA62, #A7D133);
    .icon-personal {
      width: 0.34rem;
      height: 0.34rem;
      background: url('~@/assets/images/store_name@2x.png') 0 0 no-repeat;
      background-size: 100%;
    }
    .user {
      max-width: 1rem;
    }
    .location {
      flex: 1;
      text-align: right;
      .icon-address {
        display: inline-block;
        width: 0.36rem;
        height: 0.36rem;
        vertical-align: middle;
        background: url('~@/assets/images/store_location.png') 0 0 no-repeat;
        background-size: 100%;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }



  }

  .subject {
    font-size: 0;
    background: #fff;
  }

  .recomoned {
    background: #fff;
    .title {
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-weight: bold;
      font-size: 0.28rem;
      color: #8EC31F;
      background: url('~@/assets/images/store_recommended.png') center center no-repeat @theme-bg;
      background-size: 2.64rem auto;
    }
  }
.swiper-item{
  div{
    height: 100%;
  }
}
</style>
