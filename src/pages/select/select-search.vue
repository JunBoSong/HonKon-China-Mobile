<template>
<div>
  <vp-layout-page>
    <div >
      <!-- <vp-base-search v-model="searchVal" placeholder="請輸入訂單號搜索" @submit="searchSubmit" /> -->
      <vpSearchPage v-model="searchVal" placeholder="請輸入商品關鍵字" @submit="searchSubmit"></vpSearchPage>
    </div>
    <div class="content">
      <div class="history">
        <span>歷史紀錄</span>
        <span class="delete" @click="deleteHistory"></span>
      </div>
      <div class="content_info">
        <div v-for="(item, index) in history" :key="index" @click="searchSubmit(item)" class="info_list">{{item}}</div>
      </div>
    </div>
  </vp-layout-page>
</div>
</template>
<script type = 'text/javascript'>
import { vpBaseSearch,vpHeaderSort, vpLiGoods, vpSearchPage } from "@/components";
export default {
  components: {
    vpBaseSearch,
    vpHeaderSort,
    vpLiGoods,
    vpSearchPage
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    if (localStorage.getItem('searchHistory')) {
      this.history = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
  data() {
    return {
      searchVal: "", // 搜索关键字
      history: [], // 搜索历史记录
    };
  },
  methods: {
    async searchSubmit(item) { // 搜索商品
      if (item) {
        this.searchVal = item
      }
      if (this.searchVal === '') return
      console.log(localStorage.getItem('searchHistory')) // searchHistory 搜索的历史
      if(!localStorage.getItem('searchHistory')) {
        localStorage.setItem('searchHistory',JSON.stringify([]))
      }
      let history = JSON.parse(localStorage.getItem('searchHistory'))
      if (history.length >= 8) {
        history.unshift(this.searchVal)
        history.pop()
      } else {
        history.unshift(this.searchVal)
      }
      localStorage.setItem('searchHistory',JSON.stringify(history))
      localStorage.setItem('keywords', this.searchVal) // 搜索的关键字
      this.$router.push({ name: 'selectGoods'})
    },
    deleteHistory() { // 删除历史记录
      this.$vux.confirm.show({
        title: '提示',
        content: '確認刪除歷史記錄？',
        onConfirm: () => {
          localStorage.setItem('searchHistory',JSON.stringify([]))
          this.history = []
        }
      })
    }
  }
};
</script>
<style lang = 'less' scoped>
@import "~@/assets/less/theme.less";
.content{
  padding: 0.36rem 0.2rem;
}
.history{
  display: flex;
  justify-content: space-between;
  span{
    font-size: 0.26rem;
    color: #888888;
    letter-spacing: 0;
    line-height: 0.28rem;
  }
  .delete{
    height: 0.4rem;
    width: 0.4rem;
    align-self: center;
    background: url("~@/assets/images/search_delete@2x.png")  center no-repeat;
    background-size: 100% 100%;
  }
}
  .content_info{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    .info_list{
      margin-right: 0.4rem;
      margin-bottom: 0.2rem;
      text-align: center;
      padding: 0.1rem 0.3rem;
      border: 1px solid #EBEBEB;
      background: #fff;
      font-size: 0.22rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 0.28rem;
    }
  }
</style>