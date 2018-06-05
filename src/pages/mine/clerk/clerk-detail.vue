<template>
  <div>
    <vp-layout-page>
      <vp-header-page title='查看店員' slot='header'/>
      <div class="clerk-info">
        <vp-cell label="姓名" value="翁鴻傑" :isLink="false"/>
        <vp-cell label="電話號碼" value="891792732" :isLink="false"/>
        <vp-cell label="加入時間" value="2018/01/01" :isLink="false"/>
      </div>
      <div class="clerk-record">
        <div class="record-title border-b">
          <p class="title-placeholder"></p>
          <p class="title-pay">繳費</p>
          <p class="title-increment">增值</p>
          <p class="title-newUser">新開台</p>
        </div>
        <div class="record-set">
          <p class="title">辦理設定</p>
          <div class="set-input child-vertical-middle">
            <input type="number" v-model="setData.pay">
          </div>
          <div class="set-input child-vertical-middle">
            <input type="number" v-model="setData.increment">
          </div>
          <div class="set-input child-vertical-middle">
            <input type="number" v-model="setData.newUser">
          </div>
        </div>
      </div>
      <div class="btn-wrapper">
        <vp-button content="保存"/>
      </div>
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import {vpCell} from '@/components';
  export default {
    components: {
      vpCell,
    },
    data() {
      return {
        setData: {
          pay: '',
          increment: '',
          newUser: ''
        }
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    }
  }
</script>
<style lang = 'less' scoped>
  .clerk-info{
    margin: 0.22rem 0;
    padding: 0 0.24rem;
    background: #fff;
  }
  .clerk-record {
    margin-bottom: 0.6rem;
    font-size: 0.26rem;
    color: #666;
    background: #fff;
    .record-title {
      display: flex;
      height: 0.74rem;
      line-height: 0.74rem;
      text-align: center;
      p {
        flex: 1 1 0;
        margin: 0 0.22rem;
        &.title-placeholder {
          margin: 0;
        }
      }
    }
    .record-set {
      display: flex;
      align-items: center;
      height: 1rem;
      text-align: center;
      .title {
        flex: 1 1 0;
      }
      .set-input{
        .title();
        height: 0.68rem;
        margin: 0 0.22rem;
        background: @theme-bg;
        border-radius: 0.02rem;
        input {
          width: 80%;
          vertical-align: middle;
          text-align: center;
          font-size: 0.28rem;
          color: #333;
          border: none;
          background: none;
        }
      }
    }
  }
  .btn-wrapper {
    padding: 0 0.44rem;
  }
</style>