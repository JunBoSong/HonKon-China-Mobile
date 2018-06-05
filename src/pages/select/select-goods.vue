<template>
<div>
  <vp-layout-page>
    <div slot="header">
      <!-- <vp-base-search v-model="searchVal" placeholder="請輸入訂單號搜索" @submit="searchSubmit" /> -->
      <vpSearchPage :showSearch='true' v-model="searchVal" @submit="searchSubmit" placeholder="請輸入商品關鍵字"></vpSearchPage>
      <vp-header-sort
      :navbars="navbars"
      :filters="filters"
      :types="goodsTypes"
      @change="sortChange"
      @typesChange="typesChange"
      @filtersSubmit="filtersSubmit"
      ></vp-header-sort>
    </div>
    <vp-layout-scroll @unEvent="up" ref="scroller">
      <vp-li-goods-select v-for="(item, index) of goodsList" :key="index"
      :showSellNumber="true"
      :data="item"
      @click.native="$router.push({name:'shoppingDetail',query:{id:item.id}})">
        <div slot="recommend" class="options" :class="{'cancel': item.isRecommend == 2}" @click.stop="toggleRecommend(index)">
          <i class="icon-select"></i>
          <span class="text">{{item.isRecommend == 1 ? '下架' : '上架'}}</span>
        </div>
      </vp-li-goods-select>
    </vp-layout-scroll>
  </vp-layout-page>
</div>
</template>
<script type = 'text/javascript'>
import { vpBaseSearch,vpHeaderSort, vpLiGoodsSelect, vpSearchPage } from "@/components";
export default {
  components: {
    vpBaseSearch,
    vpHeaderSort,
    vpLiGoodsSelect,
    vpSearchPage
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    this.initRequest();
    this.getGoodsTypes()
  },
  data() {
    return {
      request: {}, //获取商品列表请求参数
      searchVal: "",
      goodsList: [],
      isUp: true, //
      navbars: [
        {
          name: this.$t("默認"),
          value: 'comprehensive',
          type: "normal"
        },
        {
          name: this.$t("銷量"),
          value: 'sales',
          type: "sort"
        },
        {
          name: this.$t("售價"),
          value: 'price',
          type: "sort"
        },
        {
          name: this.$t("篩選"),
          value: 'filter',
          type: "filter"
        }
      ],
      filters: [], //筛选条件
      goodsTypes: [], //分类
      timer: null
    };
  },
  methods: {
    async searchSubmit() { //搜索
      this.$router.push({path: 'selectSearch'})
    },
    async toggleRecommend(index) {// 推荐/取消推荐
      const list = this.$deepcopy(this.goodsList);
      let cur = list[index];
      const to = cur.isRecommend == 1 ? 2 : 1; // 要切换的目标  1: 上架 2: 否 下架。
      const req = {
          userId: this.$client.userid,
          productId: cur.productId,
          isRecommend: to,
          shopId: this.$client.shopid,
          createdBy: cur.createdBy,
          updatedBy: cur.updatedBy
        }
      const res = await this.$post('product/recommend', req)
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message)
      cur.isRecommend = to
      this.goodsList = list;
    },

    async up(isReplace) {// 上拉加载
      console.log('----------------up----------------')
      let that = this
      //查询商品列表要，用阳新波的搜索接口，不然伟哥会吊你的
      if (localStorage.getItem('keywords')) { // 本地存储搜索的关键字
         this.request.keywords = localStorage.getItem('keywords')
      }
      console.log(localStorage.getItem('keywords'))
      const res = await this.$post("search/page", this.request);
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
      let resPageData = res.pageData;
      const isNoMore = resPageData.length < that.request.pageSize;
      //查询是否为推荐商品，用商品id数组
      const reqIds = resPageData.map(item => item.id);
      const resRecommend = await this.$post('product/recommendPage', { ids: reqIds})
      if (resRecommend.returnCode != 1000) return this.$vux.toast.text(resRecommend.message);
      //将请求到的是否为推荐商品赋值到商品列表对象的isRecommend字段上
      for (let recommendItem of resRecommend.records) {
        for (let goodsItem of resPageData) {
          if(recommendItem.id === goodsItem.id) {
            goodsItem.isRecommend = recommendItem.isRecommend; // isRecommend: {1: 推荐商品, 2: 非推荐商品}
          }
        }
      }
      //查询礼品，用商品id数组
      const resGift = await this.$post('product/gift', {gift: 'GOODTYPE_ZENGPIN', ids: reqIds})
      if (resGift.returnCode == 1000) {
        //将请求到的礼品赋值到商品列表对象的gifts字段上
        for (let giftsItem of resGift.records) {
          for (let goodsItem of resPageData) {
            if(giftsItem.productId === goodsItem.id) {//由于可能会有多个，所以不要请求到一个就return出去
              goodsItem.gifts = goodsItem.gifts ||  [];
              goodsItem.gifts.push(giftsItem)
            }
          }
        }
      }
        //品牌
        if (!that.filters.length) that.filters = res.filterList;
        if (isReplace) {
          that.$refs.scroller.resetUpLoading();
          that.goodsList = resPageData
          that.$refs.scroller.endUpLoading(isNoMore);
        }else {
          //缓冲一下
          clearTimeout(that.timer)
          that.timer = setTimeout(() => {
            that.goodsList.push(...resPageData)
            that.$refs.scroller.endUpLoading(isNoMore);
            clearTimeout(that.timer)
          }, 800);
        }
    },
    initRequest() {//初始化列表请求数据
      this.request = {
        pageNumber: 1, //bc,页码
        pageSize: 20, //bc,页数
        userId: undefined,
        orgId: undefined,//bc,机构编号
        keywords: undefined, //关键字
        order: 'comprehensive', //排序-{comprehensive=综合为默认排序,sales=销量,price=价格,rebates=返利}
        sortOrder: undefined, //{asc=升序，desc=降序}
        filter: undefined, //品牌、动态SKU过滤-{从结果中的filterList中获取，例如：{brand:[value1],sku属性集id:[sku属性值id]}}
        keywords: '', //关键词
        maxSellPrice: '', //最大价格
        minSellPrice: '', //最小价格
      };
    },
      async getGoodsTypes(id) { //获取商品分类
        let newGoodsTypes = this.$deepcopy(this.goodsTypes);
        console.log(this.goodsTypes)
        let parentId = id;
        let res = await this.$post('category/page', {
          name: '', //分类名称
          level: parentId ? 2 : 1, //分类级别（1,2,3）
          parentId: parentId || '', //父级编号
          pageNumber: 1, //页码
          pageSize: 20 //每页查询记录数
        })
        console.log('res-----------', res)
        if (!res.records || !res.records.length) return
        if (!parentId) { //一级分类
          this.goodsTypes = res.records;
          for (const item of res.records) {
            this.getGoodsTypes(item.id)
          }
        } else { //二级分类
          for (let item of newGoodsTypes) {
            if (item.id === parentId) {
              item.sonList = res.records;//在一级分类下添加childTypes
            }
          }
          this.goodsTypes = newGoodsTypes;
        }
      },
    sortChange(params) {//点击头部的tab
      this.request.order = params.value
      this.request.sortOrder = params.sort
      this.goodsList = [];
      this.up()
    },
    typesChange(params) {
        this.initRequest();
        let requestNew = this.$deepcopy(this.request);
        const isFilterClick = params.value == 'filter'; //是否点击筛选

        requestNew.order = (isFilterClick ? '' : params.value) //如果是筛选就跳过赋值
        requestNew.sortOrder = params.sort
        this.request = requestNew;
        !isFilterClick && this.up(true)
    },
    filtersSubmit(params) {
        this.request = {
          ...this.request,
          maxSellPrice: params.maxSellPrice,
          minSellPrice: params.minSellPrice,
          filter: params.filter
        }
        this.up(true);
    }
  }
};
</script>
<style lang = 'less' scoped>
@import "~@/assets/less/theme.less";
.options {
  padding: 0.05rem 0.19rem;
  text-align: center;
  box-sizing: content-box;
  border: 0.01rem solid @theme-secondary;
  border-radius: 0.2rem;
  .icon-select {
    display: inline-block;
    width: 0.3rem;
    height: 0.4rem;
    background: url('~@/assets/images/store_goods_soldout@2x.png') 0 center no-repeat;
    background-size: 0.3rem;
  }
  .text {
    display: inline-block;
    width: 0.48rem;
    height: 0.4rem;
    vertical-align: top;
    line-height: 0.4rem;
    font-size: 0.24rem;
    color: @theme-secondary;
  }
  &.cancel {
    background: @theme-secondary;
    .icon-select {
      background: url('~@/assets/images/store_goods_putaway@2x.png') 0 center no-repeat;
      background-size: 0.3rem;
    }
    .text {
      color: #fff;
    }
  }
}

.search-btn {
  display: block;
  width: 100%;
  height: 1rem;
  padding: 0.2rem 0;
  background: #fff;
  .wrapper {
    display: flex;
    align-items: center;
    width: 6.18rem;
    height: 0.6rem;
    margin: 0 auto;
    padding: 0 0.26rem;
    background: @theme-bg;
    border-radius: 0.3rem;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.14rem;
      border: 1px solid red;
      vertical-align: middle;
    }
    input {
      flex: 1;
      font-size: 0.24rem;
      color: #888888;
      border: none;
      background: none;
      letter-spacing: 0.1em;
    }
  }
}
</style>
