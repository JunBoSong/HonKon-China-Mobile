<template>
  <vp-layout-page>
      <vp-header-page title="商品列表" slot="header">
        <vp-header-sort :navbars="navbars" :filters="filterList" :types="goodsTypes" @change="sortChange" @types-change="typesChange" @filters-submit="filtersChange">
        </vp-header-sort>
      </vp-header-page>
      <vp-li-goods v-for="item of 10" :key="item" :data="goodsItem">
        <div slot="recommend" class="options child-vertical-middle" @click.stop="toggleRecommend(index)">
          <span class="text" :class="{'cancel': goodsItem.isRecommend*1 === 1}">{{goodsItem.isRecommend*1 === 1 ? '取消推薦' : '推薦'}}</span>
        </div>
      </vp-li-goods>

  </vp-layout-page>
</template>
<script type = 'text/javascript'>
import { vpHeaderSort, vpLiGoods } from '@/components';
import {Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    vpHeaderSort, vpLiGoods
  },
  data() {
    return {
      goodsItem: {
        id: 123,
        coverImage: 'http://placehold.it/3000x30000',
        name: 'iPhoneX',
        price: '7,888.00',
        sold: 1000,
      },
      navbars: [
        {
          name: '綜合',
          value: 1,
          type: 'normal'
        }, {
          name: '銷量',
          value: 2,
          type: 'normal'
        }, {
          name: '價格',
          value: 3,
          type: 'price'
        }, {
          name: '篩選',
          value: 4,
          type: 'filter'
        }
      ],
      filterList: [{
        id: 1,
        name: '品牌',
        sonList: [
          {
            parentId: 1,
            name: '格力'
          },
          {
            parentId: 1,
            name: '海尔'
          },
          {
            parentId: 1,
            name: '美的'
          },
          {
            parentId: 1,
            name: '三星'
          }
        ]
      }],//筛选属性列表（后台返回）
      goodsTypes: [{
        parentId: 2,
        name: '出产地',
        sonList: [{
          parentId: 2,
          name: '中国'
        }, {
          parentId: 2,
          name: '日本'
        }, {
          parentId: 2,
          name: '德国'
        }, {
          parentId: 2,
          name: '美国'
        }]
      }
      ], //商品分类列表
    }
  },
  methods: {
    toggleRecommend() {

    },
    sortChange(params) {
      console.log(params)

    },
    typesChange(data) {
      console.log(data)
    },
    filtersChange(data) {
      console.log(data)
    },
    refresh() {
      console.log(12)
    },
    infinite() {
      console.log(3333)
    }
  }
}
</script>
<style lang = 'less' scoped>
  .footer{
    background: yellow;
  }
</style>
