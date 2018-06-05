<template>
<div>
  <!-- <vp-layout-page> -->
    <div class="navigation">
      <div class="item">
        <h1>测试各种demo:</h1>
        <button class="btn" @click="test">测试</button>
        <!-- <router-link to="test" class="btn">测试</router-link> -->
      </div>
      <div class="item">
        <h1>刘榜州:</h1>
        <a :href="`http://172.16.0.177:8080/?orgid=918720751226753026&token=d8adf5298d09fcdfe05dbeb1b251398f&webview=1&userid=907104682427482112&right=staging&shopid=907063093516382208#/contributionIndex/contribution`" class="btn">市场-首页(繳費)</a>
        <a :href="`http://172.16.0.177:8080/${searchParams}#/contributionIndex/appreciate`" class="btn">市场-首页(充值)</a>
        <a :href="`http://172.16.0.177:8080/?userid=907106903739269120&shopid=907081970942042112&orgid=918720751226753026&token=bbafe2826d16b182d73d193b58ee4d0d&webview=2&right=store&orgcode=&operator=,P2561,#/store/home`" class="btn">市场-首页(店鋪)</a>
        <a :href="`http://172.16.0.177:8080/${searchParams}#/mine/order/list`" class="btn">订单列表(刘榜州)</a>
      </div>
      
      <div class="item">
        <h1>市场:</h1>
        <a :href="`http://172.16.0.194:8080/${searchParams}#/shopping/list`" class="btn">市场-首页(盛闯)</a>
      </div>
      <input type="text" style="width: 100%;height: 30px;" ref="ipt" v-keyBoard>
      <div class="item">
        <h1>上台(宋俊波)</h1>
        <router-link to="/business/handleBase/serviceList?businessType=1" class="btn">带机上台--店铺模式</router-link>
        <router-link to="/business/handleBase/serviceList?businessType=2" class="btn">集客上台--店铺模式</router-link>
        <router-link to="/business/handleBase/baseInfo?businessType=1" class="btn">带机上台—工作台模式</router-link>
        <router-link to="business/handleBase/baseInfo?businessType=2" class="btn">集客上台--工作台模式</router-link>
      </div>
    </div>
  <button slot="footer">測試的</button>
  <!-- </vp-layout-page> -->

</div>

</template>
<script type = 'text/javascript'>
import {
    vpInputMessage,
  } from '@/components';
export default {
  components: {
    vpInputMessage
  },
  data() {
    return {
      searchParams: window.location.search
    };
  },
  created() {
    this.$jb.webview2js(() => {
      type == 1 && this.$jb.js2webview({type: 2})
    })
  },
  methods: {
    test() {
      location.href = 'http://172.16.0.194:8080/test.html'
    }
  },
  mounted() {
    
    console.dir(this.$refs.ipt)
    // window.scrollTo(100,500)
    // this.$refs.ipt.scrollTop = screen.width;
  }
};
</script>
<style lang = 'less' scoped>
.navigation {
  overflow-y: auto;
  padding-bottom: 10px;
}

.tip {
  padding: 10px;
}

.item {
  margin-top: 20px;
  h1 {
    padding-left: 20px;
    color: #333;
    font-size: 14px;
  }
}

.btn {
  display: block;
  width: 200px;
  height: 45px;
  margin: 10px auto 0;
  line-height: 45px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  color: rgb(59, 129, 255);
  box-shadow: 0 0 4px 1px rgba(59, 129, 255, 0.5);
  &.stop {
    color: rgb(169, 169, 169);
    box-shadow: 0 0 4px rgba(169, 169, 169, 0.5);
  }
}
</style>