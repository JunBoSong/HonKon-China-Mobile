<template>
   <div>
       <vp-layout-page>
            <vp-result-handle :list="resultList" title="帶機上台">
              <div class="btns">
                <router-link to="" class="btn" @click.native="$router.replace('shoppingList')">
                  <vp-button content="返回工作台" :radius="true" height="0.8rem"></vp-button>
                </router-link>
                <router-link to=" " class="btn">
                  <vp-button content="繼續辦理" :radius="true" styleClass="hollow" height="0.8rem"></vp-button>
                </router-link>
              </div>
              <div  class="printBtn">
                <div class="first">列印合約</div>
                <div class="sec">列印收據</div>
              </div>
              <div class="oneKeyPrint">一鍵列印</div>
            </vp-result-handle>
       </vp-layout-page>
   </div>
</template>
<script type = 'text/javascript'>
import {vpResultHandle} from '@/components';
  export default {
    components: {vpResultHandle},
    data() {
      return {
        resultList: [
          {name: '上台號碼', value: 9848465},
          {name: '服務計劃', value: '4.5G全速本地服務計劃6GB'},
          {name: '支付金額', value: 'HK$110.0'},
          {name: '上台時間', value: '2018-3-16 10:00:00'}
        ]
      }
    }
  }
</script>
<style lang = 'less' scoped>
  .btns {
    width: 100%;
    margin-top: 0.7rem;
    text-align: center;
    .btn {
      display: inline-block;
      width: 3.1rem;
      &:first-child{
        margin-right: 0.2rem;
      }
    }
  }
  .printBtn {
    height: .56rem;
    width: 100%;
    display: flex;
    padding: 0 .54rem;
    margin-top: .84rem;
    font-size: .24rem;
    div{
      flex: 1;
      border: 1px solid #8CC235;
      text-align: center;
      line-height: .56rem;
    }
    div.first {
      background: #8CC235;
      color: #fff;
    }
    div.sec {
      color: #8CC235;
      background: #fff;
    }
  }
  .oneKeyPrint {
    text-align: center;
    line-height: .64rem;
    color: #333333;
    text-decoration:underline;
  }
</style>
