<template>
  <div>
    <vp-layout-page>
      <vp-header-sort :navbars="navbars" :filters="filters" :types="goodsTypes" @change="sortChange" @typesChange="typesChange"
        @filtersSubmit="filtersSubmit" slot="header"></vp-header-sort>
      <vp-layout-scroll @unEvent="up" ref="scroller">
        <vp-li-goods v-for="(item, index) of goodsList" :key="index" :data="item" @click.native="$router.push({name:'shoppingDetail',query:{id:item.id}})">
        </vp-li-goods>
      </vp-layout-scroll>
    </vp-layout-page>
  </div>
</template>
<script type='text/javascript'>
  import {
    vpHeaderSort,
    vpLiGoods
  } from "@/components";
  export default {
    name: 'shoppingList',
    components: {
      vpHeaderSort,
      vpLiGoods
    },
    created() {
      const that = this;
      that.initRequest();
      that.getGoodsTypes();
      that.initJB();

    },
    data() {
      return {
        scroll: 0,
        request: {}, //获取商品列表请求参数
        searchVal: "請輸入商品關鍵字",
        goodsList: [],
        navbars: [{
            name: this.$t("推薦"),
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
      initJB() {
        this.$jb.webview2js((params) => {
          if (params.type == 1) {
            if (this.$route.path === this.$session.get('beginPath')) {
              this.$jb.js2webview({
                type: 2
              })
            } else {
              this.$router.go(-1);
            }
          }
        })
      },
      async up(isReplace) { // isReplace 是否列表替换 
        console.log('----------------up----------------')
        const that = this;
        //查询商品列表要，用阳新波的搜索接口，不然伟哥会吊你的
        const res = await that.$post("search/page", that.request);
        if (res.returnCode != 1000) return that.$vux.toast.text(res.message);
        let resPageData = res.pageData;
        const isNoMore = resPageData.length < that.request.pageSize;
        //查询礼品，用商品id数组
        const reqGift = resPageData.map(item => item.id);
        const resGift = await that.$post('product/gift', {
          gift: 'GOODTYPE_ZENGPIN',
          ids: reqGift
        })
        if (resGift.returnCode == 1000) { //将请求到的礼品赋值到商品列表对象的gifts字段上
          for (let giftsItem of resGift.records) {
            for (let goodsItem of resPageData) {
              if (giftsItem.productId === goodsItem.id) { //由于可能会有多个，所以不要请求到一个就return出去
                goodsItem.gifts = goodsItem.gifts || [];
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
        } else {
          //缓冲一下
          clearTimeout(that.timer)
          that.timer = setTimeout(() => {
            that.goodsList.push(...resPageData)
            that.$refs.scroller.endUpLoading(isNoMore);
            clearTimeout(that.timer)
          }, 800);
        }
      },
      async getGoodsTypes(id) { //获取商品分类
        let newGoodsTypes = this.$deepcopy(this.goodsTypes);
        let parentId = id;
        let res = await this.$post('category/page', {
          name: '', //分类名称
          level: parentId ? 2 : 1, //分类级别（1,2,3）
          parentId: parentId || '', //父级编号
          pageNumber: 1, //页码
          pageSize: 20 //每页查询记录数
        })
        if (!res.records || !res.records.length) return
        if (!parentId) { //一级分类
          this.goodsTypes = res.records;
          for (const item of res.records) {
            this.getGoodsTypes(item.id)
          }
        } else { //二级分类
          for (let item of newGoodsTypes) {
            if (item.id === parentId) {
              item.sonList = res.records; //在一级分类下添加childTypes
            }
          }
          this.goodsTypes = newGoodsTypes;
        }
      },
      initRequest() { //初始化列表请求数据
        this.request = {
          pageNumber: 1, //bc,页码
          pageSize: 20, //bc,页数
          userId: undefined,
          orgId: undefined, //bc,机构编号 
          order: 'comprehensive', //排序-{comprehensive=综合为默认排序,sales=销量,price=价格,rebates=返利} 
          sortOrder: undefined, //{asc=升序，desc=降序}
          appCategoryIds: undefined, //应用分类编号集合
          filter: undefined, //品牌、动态SKU过滤-{从结果中的filterList中获取，例如：{brand:[value1],sku属性集id:[sku属性值id]}} 
          keywords: '', //关键词
          maxSellPrice: '', //最大价格
          minSellPrice: '', //最小价格
        };
      },
      sortChange(params) { //点击头部的tab
        this.initRequest();
        let requestNew = this.$deepcopy(this.request);
        const isFilterClick = params.value == 'filter'; //是否点击筛选

        requestNew.order = (isFilterClick ? '' : params.value) //如果是筛选就跳过赋值
        requestNew.sortOrder = params.sort
        this.request = requestNew;
        !isFilterClick && this.up(true)
      },
      typesChange(params) { //选择的分类有改变,根据分类刷新品牌和商品
        const typeIds = params.id ? [params.id] : undefined; //现在做的是单选
        this.request = { ...this.request,
          appCategoryIds: typeIds
        }
        this.up(true);
      },
      filtersSubmit(params) { //提交筛选,根据条件刷新商品
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
<style lang='less' scoped>
  @import "~@/assets/less/theme.less";
  .options {
    height: 0.4rem;
    padding: 0.05rem 0.19rem;
    text-align: center;
    border: 1px solid @theme-secondary;
    background: @theme-secondary;
    border-radius: 0.2rem;
    .icon {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
      border: 1px solid red;
    }
    .text {
      display: inline-block;
      width: 0.48rem;
      margin-left: 0.06rem;
      vertical-align: middle;
      line-height: 0.3rem;
      font-size: 0.24rem;
      color: #fff;
    }
    &.cancel {
      background: #fff;
      .text {
        color: @theme-secondary;
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
