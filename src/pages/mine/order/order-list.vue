<template>
  <div class="order-list">
    <vp-layout-page>
      <div slot='header'>
        <vp-base-search v-model="searchVal" placeholder="請輸入訂單號搜索" @submit="searchSubmit" />
        <vp-header-tab :curTabIndex = 'curTabIndex' :tabs="['全部', '待付款', '待發貨', '已發貨']" @on-item-click="tabHandler"/>
      </div>
      <keep-alive>
        <vp-layout-scroll scrollId = 'scroll0' @unEvent = 'unEvent(curTabIndex)'  ref="scroll0" v-if="curTabIndex == 0" :key="0">
          <vp-li-goods-order 
          v-for="(item, index) in orderList0" 
          :key="index" 
          :data="item"
          @on-content-click="$router.push({path: 'detail', query: {id: item.orderId, mainOrderId:item.mainOrderId, type:item.orderStatus}})"
          @on-btn-click="btnHandler(item)"
          />
        </vp-layout-scroll>  
      </keep-alive>

      <keep-alive>
        <vp-layout-scroll scrollId = 'scroll1' @unEvent = 'unEvent(curTabIndex)'  ref="scroll1" v-if="curTabIndex == 1" :key="1">
          <vp-li-goods-order 
          v-for="(item, index) in orderList1" 
          :key="index" 
          :data="item"
          @on-content-click="$router.push({path: 'detail', query: {id: item.orderId, mainOrderId:item.mainOrderId, type:item.orderStatus}})"
          @on-btn-click="btnHandler(item)"
          />
        </vp-layout-scroll>  
      </keep-alive>
      <keep-alive>
        <vp-layout-scroll scrollId = 'scroll2' @unEvent = 'unEvent(curTabIndex)'  ref="scroll2" v-if="curTabIndex == 2" :key="2">
          <vp-li-goods-order 
          v-for="(item, index) in orderList2" 
          :key="index" 
          :data="item"
          @on-content-click="$router.push({path: 'detail', query: {id: item.orderId, mainOrderId:item.mainOrderId, type:item.orderStatus}})"
          @on-btn-click="btnHandler(item)"
          />
        </vp-layout-scroll> 
      </keep-alive>
      <keep-alive> 
        <vp-layout-scroll scrollId = 'scroll3' @unEvent = 'unEvent(curTabIndex)'  ref="scroll3" v-if="curTabIndex == 3" :key="3">
          <vp-li-goods-order 
          v-for="(item, index) in orderList3" 
          :key="index" 
          :data="item"
          @on-content-click="$router.push({path: 'detail', query: {id: item.orderId, mainOrderId:item.mainOrderId, type:item.orderStatus}})"
          @on-btn-click="btnHandler(item)"
          />
        </vp-layout-scroll>  
      </keep-alive>
    </vp-layout-page>
    <popup v-model="showPay">
      <group>
      <vp-input-radio-pay :pay='pay' v-model="payType"/>
       <vp-button content="確認付款" @click.native="doPay"></vp-button>
      </group>
    </popup>
    <vp-layout-pay ref="pay" @on-fail="payFailCallback"></vp-layout-pay>
  </div>
</template>
<script type='text/javascript'>
import { Popup, Group } from "vux";
import {
  vpHeaderTab,
  vpBaseSearch,
  vpLiGoodsOrder,
  vpInputRadioPay,
  vpLayoutPay
} from "@/components";
import { clearTimeout, setTimeout } from "timers";
export default {
  components: {
    Popup,
    vpHeaderTab,
    vpBaseSearch,
    vpLiGoodsOrder,
    vpInputRadioPay,
    Group,
    vpLayoutPay
  },
  data() {
    return {
      searchVal: "", // 订单搜索
      curTabIndex: 0,
      orderList0: [],
      orderList1: [],
      orderList2: [],
      orderList3: [],
      flang: true, // 控制列表加载
      showPay: false,
      payType: null,
      pay: null, // 控制支付展示
      pageSize: 20,
      isCrocs: false, // 是否是门市取货
      mainOrderId: null,
      tabPage: { // 加载请求的也是和总数
        pageNumber0: 1,
        pageNumber1: 1,
        pageNumber2: 1,
        pageNumber3: 1,
        total0: -1,
        total1: -1,
        total2: -1,
        total3: -1
      }
    };
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})})
    if (this.$route.query.curtabindex) { // 进入展示的tab項 
      this.curTabIndex = this.$route.query.curtabindex - 0
    }
    // alert()
    if (this.$route.query.from) {
      this.isCrocs = true
    }
  },
  methods: {
    btnHandler(item) {
      // 点击操作按钮
      this.pay = item.payType
      console.log(item)
      if (item.orderStatus - 0 === 1) {
        // 支付
        this.mainOrderId = item.mainOrderId;
        this.showPay = true;
      }
    },
    doPay() { // 确认付款
      let param = {
        ...this.payType, // 结构 payType payPlatform
        mainOrderId: this.mainOrderId,
        origin: 3,
        frontUrl: `#/mine/order/result`,
        successURL: `#/mine/order/result`,
        cancelURL: `#/mine/order/result`,
        failURL: `#/mine/order/result`,
        lang: "X",
        paymentType: "1"
      };
      this.$refs.pay.pay(this.mainOrderId, param)
    },
    unEvent(type) {
      // 加载更多自定义事件
      if (!this.flang) return; // 开关 控制无线请求
      if (this.tabPage[`total${type}`] === this[`orderList${type}`].length) {
        this.$refs[`scroll${type}`].endUpLoading(true);
      } else {
        this.getOeder(type);
      }
    },
    tabHandler(val, index) {
      this.curTabIndex = index;
    },
    async searchSubmit() { // 搜索
      this.tabPage[`pageNumber0`] = 1
      let param = {
        orderNo: this.searchVal,
        pageSize: this.pageSize,
        pageNumber: 1,
        purchaseTypes: [0, 2, 3, 4, 7] // 筛选类型 0:普通商品 1:带机上台,2:集客上台,3:买机上台 4:旗舰机上台 5:缴费 6:充值 7:现有客户买手机 8:O2O商品  9：卡券商品
      }
      if (this.isCrocs) { // 如果是门市取货传机构id
        param.orgId = this.$client.orgid
      } else { // 不是门市取货 传userid
        param.saleId = this.$client.userid
      }
      this.curTabIndex = 0
      this.getOeder(this.curTabIndex, param)
      let res = await this.getOeder(this.curTabIndex, param)
      // if (!res) return this.$vux.toast.show({text: '没有找到',type:'text'})
    },
    async getOeder(num, paramData) {
      // 获取订单列表
      this.flang = false;
      let param = {
        orderStatus: num === 0 ? null : String(num),
        pageNumber: this.tabPage[`pageNumber${num}`],
        pageSize: this.pageSize,
        purchaseTypes: [0, 2, 3, 4, 7] // 筛选类型 0:普通商品 1:带机上台,2:集客上台,3:买机上台 4:旗舰机上台 5:缴费 6:充值 7:现有客户买手机 8:O2O商品  9：卡券商品
      };
      if (this.isCrocs) { // 如果是门市取货传机构id
        param.orgId = this.$client.orgid
      } else { // 不是门市取货 传userid
        param.saleId = this.$client.userid
      }
      let res = await this.$post("order/page", paramData || param)
      this.flang = true;
      // if (paramData) return this[`orderList${num}`] = res.records // 如果有paramData那就是搜索直接替换之前的数据
      if (res.returnCode == 1002 && paramData)  return this.$vux.toast.text('您搜索的信息不存在')
      if (res.returnCode !== '1000') return this.$refs[`scroll${num}`].endUpLoading(true); // 如果请求不是1000 就禁止加载
      if (paramData) { // 如果有参数就是搜索 直接进行赋值 并结束下面语句
        this[`orderList${num}`] = res.records
        
        return this.loadingFn(num, res)
      }
      this.tabPage[`pageNumber${num}`]++ // 请求成功页数加1
      this[`orderList${num}`] = this[`orderList${num}`].concat(res.records) // 数组
      this.tabPage[`total${num}`] = res.total * 1;
      this.loadingFn(num, res)
      // this.flang = true;
      return new Promise((res, rej) => {
        if (res.returnCode === '1000'){
          res(true)
        }else {
          res(false)
        }
      })
    },
    loadingFn(num, res) { // 判断是否继续加载的方法 num 当前tab选择 res请求回来的数据
      if (res.total - 0 === this[`orderList${num}`].length) { // 当前类别的长度是否和总数相等 true停止加载 
        this.$refs[`scroll${num}`].endUpLoading(true);
      } else {
        this.$refs[`scroll${num}`].endUpLoading();
      }
    },
    payFailCallback() {
      // 支付结果回调
    }
  }
};
</script>
<style lang='less' scoped>

</style>
