<template>
  <div>
    <!-- <vp-layout-page> -->
      <!-- <vp-header-page title="带机上台" slot="header"> -->
      <!-- <vpFlowStatus :page = 'pageNumber' ></vpFlowStatus> -->
      <!-- </vp-header-page> -->

      <!-- <router-view class="child-view" ></router-view> -->
      <keep-alive exclude='serviceChoice,serviceDetail,serviceList,selectInlandPhoneNumber,selectPhoneNumber'>
        <router-view class="child-view"></router-view>
      </keep-alive>

    <!-- </vp-layout-page> -->
  </div>
</template>
<script type = 'text/javascript'>
import { vpHeaderSort, vpLiGoods, vpFlowStatus, vpButton } from "@/components";
import { Flow, FlowState, FlowLine } from "vux";
import setTitle from '@/mixin/setTitle.js'
export default {
  components: {
    vpHeaderSort,
    vpLiGoods,
    Flow,
    FlowState,
    FlowLine,
    vpFlowStatus,
    vpButton
  },
  data() {
    return {
      pageNumber: this.$session.get("spage") ? this.$session.get("spage") : 0
    };
  },
  mixins: [setTitle],
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
  },
  watch: {
    $route: function() {
      // 监听路由变化
      console.log(this.$route.path);
      if (this.$route.path === "/business/handleBase/baseInfo") {
        this.setTitle()
        this.pageNumber = 0;
      }
      if (this.$route.path === "/business/handleBase/handleInfo") {
        this.pageNumber = 1;
      }
      if (this.$route.path === "/business/handleBase/coupon") {
        this.pageNumber = 2;
      }
      if (this.$route.path === "/business/handleBase/confirmingInfo") {
        this.pageNumber = 3;
      }
      if (this.$route.path === "/business/handleBase/signature") {
        this.pageNumber = 4;
      }
      if (this.$route.path === "/business/handleBase/handlePay") {
        this.pageNumber = 5;
      }
      console.log(this.pageNumber);
      this.$session.set("spage", this.pageNumber);
    }
  },
  methods: {
    commit() {
      this.$event.$emit("next"); // 自定义事件 下一步
      if (this.pageNumber === 5) {
        this.pageNumber = 5;
      } else {
        this.pageNumber += 1;
      }
      switch (this.pageNumber) {
        case 1:
          {
            this.$router.push({ name: "handleInfo" });
          }
          break;
        case 2:
          {
            this.$router.push({ name: "coupon" });
          }
          break;
        case 3:
          {
            this.$router.push({ name: "confirmingInfo" });
          }
          break;
        case 4:
          {
            this.$router.push({ name: "signature" });
          }
          break;
        case 5:
          {
            this.$router.push({ name: "handlePay" });
          }
          break;
      }
    }
  }
};
</script>
<style lang = 'less' scoped>
.flow-view {
  background: white;
}
.child-view {
  height: 100%;
}
.page-btns {
  height: 1rem;
  width: 100%;
  background: #ed008d;
}
</style>
