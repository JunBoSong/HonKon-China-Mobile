<template>
  <div>
    <vp-layout-page>
      <div slot='header'>
        <vp-base-search v-model="searchVal" placeholder="請輸入電話號碼搜索" @submit="searchSubmit" />
        <vp-header-tab :curTabIndex = 'curTabIndex' :tabs="['繳費', '增值', '帶機上台']" @on-item-click="tabHandler"/>
      </div>
      <keep-alive>
        <vp-layout-scroll @unEvent = 'unEvent(curTabIndex)' scrollId = 'scroll0' ref="scroll0" v-if="curTabIndex == 0" :key="1">
          <vp-li-mine-business v-for="(item, index) in business.businessList0" :key="index"
          :data="[{name: '繳費號碼：', value: item.buyerPhone},{name: '繳費金額：', value: filterPrice(item.paymentAmount)},{name: '繳費時間：', value: fiterTime(item.payTime)}]"
          btnText="列印收據"
          @on-click-btn="btnHandler(0)" />  
        </vp-layout-scroll>
      </keep-alive>
      <keep-alive>
        <vp-layout-scroll @unEvent = 'unEvent(curTabIndex)' scrollId = 'scroll1' ref="scroll1" v-if="curTabIndex == 1" :key="2">
          <vp-li-mine-business v-for="(item, index) in business.businessList1" :key="index"
          :data="[{name: '增值號碼：',  value: item.buyerPhone},{name: '增值金額：', value: filterPrice(item.paymentAmount)},{name: '储值金額：', value: filterPrice(item.productAmount)}, {name: '繳費時間：', value: fiterTime(item.payTime)}]"
          btnText="列印收據"
          @on-click-btn="btnHandler(1)" /> 
        </vp-layout-scroll>
      </keep-alive>  
      <keep-alive>
        <vp-layout-scroll @unEvent = 'unEvent(curTabIndex)' scrollId = 'scroll2' ref="scroll2" v-if="curTabIndex == 2" :key="3">
          <vp-li-mine-business v-for="(item, index) in business.businessList2" :key="index"
          :data="[{name: '開台號碼：', value: item.phoneNo},{name: '服務計畫：', value: item.businessPlanName}]"
          btnText="详情"
          @on-click-btn="btnHandler(2, item)" /> 
        </vp-layout-scroll>
      </keep-alive>
    </vp-layout-page>
  </div>
</template>
<script type='text/javascript'>
import { Popup } from 'vux'
  import {
    vpHeaderTab,
    vpBaseSearch,
    vpLiMineBusiness
  } from '@/components';
import { setTimeout } from 'timers';
  export default {
    components: {
      vpHeaderTab,
      vpBaseSearch,
      vpLiMineBusiness
    },
    data() {
      return {
        searchVal: "",
        curTabIndex: 0,
        pageSize: 10,
        business: { // 业务列表
          businessList0: [],
          businessList1: [],
          businessList2: [],
          pageNumber0: 1,
          pageNumber1: 1,
          pageNumber2: 1,
          total0: -1,
          total1: -1,
          total2: -1,
        }
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})})
      if (this.$route.query.curtabindex ) {
        this.curTabIndex = this.$route.query.curtabindex - 0 - 1
      }
    },
    methods: {
      btnHandler(num, item) {//点击操作按钮 上台信息多一个item
        let printData = {
          printType: num
        }
        if (num === 2) return this.$router.push({path: 'detail',query:{id: item.id}})
        this.$vux.confirm.show({
          title: '提示',
          content: '打印可能需要一段時間請確認是否列印',
          confirmText: '繼續列印',
          onConfirm: () => {
            this.$jb.js2webview({type: 3,printType: 2})
          }
        })
      },
      tabHandler(val,index) {
        this.curTabIndex = index;
        // console.log(this.curTabIndex)
      },
      unEvent(type) { // 加载事件
        // console.log(type)
        if (this.business[`total${type}`] === this.business[`businessList${type}`].length) {
          this.$refs[`scroll${type}`].endUpLoading(true);
        } else {
          // if(type == 2) return this.getStageList()
          this.getList(type);
        }
      },
      async searchSubmit() {
        this.business[`pageNumber${this.curTabIndex}`] = 1
        if (this.curTabIndex == 2) { // 上台搜索
          let param ={
            pageNumber: this.business[`pageNumber${this.curTabIndex}`],
            pageSize: this.pageSize,
            userId: this.$client.userid,
            phoneNo: this.searchVal
            }
          let  data = await this.$post('order/registerOrderInfo', param)
          if ( data.returnCode !== '1000' ) {
            // this.$vux.toast.text(res.message)
            this.$refs[`scroll${this.curTabIndex}`].endUpLoading(true);
            if (data.returnCode == 1002) return this.$vux.toast.text('您搜索的信息不存在')
            return this.$vux.toast.text(data.message)
          }
          return this.loadFn(data)
        }
        // 充值、缴费搜索
        let param = {
          pageNumber: this.business[`pageNumber${this.curTabIndex}`],
          pageSize: this.pageSize,
          purchaseType: this.curTabIndex ==0 ? 5 : 6, // 业务类型 5缴费 6增值
          saleId: this.$client.userid,
          buyerPhone: this.searchVal
        }
        let res = await this.$post('order/businessOrderList', param)
        if (res.returnCode == 1002) return this.$vux.toast.text('您搜索的信息不存在')
        if(res.returnCode != 1000) return this.$vux.toast.text(res.message)
        // console.log(this.business[`businessList${this.curTabIndex}`])

        this.loadFn(res)
      },
      loadFn(res) { // 判断搜索加载
        this.business[`businessList${this.curTabIndex}`] = res.records
        console.log(this.business[`pageNumber${this.curTabIndex}`], '---------------------')
        this.business[`pageNumber${this.curTabIndex}`]++
        this.business[`total${this.curTabIndex}`] = res.total
        if (this.business[`businessList${this.curTabIndex}`].length == this.business[`total${this.curTabIndex}`]) {
          this.$refs[`scroll${this.curTabIndex}`].endUpLoading(true);
        }
      },
      async getList(num) { // 获取数据列表
        let param = {
          pageNumber:this.business[`pageNumber${num}`],
          pageSize: this.pageSize,
          buyerPhone: this.searchVal, // 搜到的电话号码
          purchaseType: num ==0 ? 5 : 6, // 业务类型 5缴费 6增值
          saleId: this.$client.userid
        }
        let res 
        if (num == 2) { // 上台信息
          let param = {
            pageNumber: this.business[`pageNumber${num}`],
            pageSize: this.pageSize,
            userId: this.$client.userid,// 用户id
            phoneNo: this.searchVal
            // orgCode: this.$client.orgcode,
            // operator: this.$client.operator // 不能传这两个参数 
          }
          res = await this.$post('order/registerOrderInfo', param)
          if ( res.returnCode !== '1000' ) {
            // this.$vux.toast.text(res.message)
            this.$refs[`scroll${num}`].endUpLoading(true);
            return
          }
        } else { // 充值、缴费
          res = await this.$post('order/businessOrderList', param)
          if ( res.returnCode !== '1000' ) {
            this.$refs[`scroll${num}`].endUpLoading(true);
            return
          }
        }

        this.business[`businessList${num}`] = this.business[`businessList${num}`].concat(res.records)
        this.business[`pageNumber${num}`] = this.business[`pageNumber${num}`]+ 1;
        this.business[`total${num}`] = res.total * 1;
        if (res.total * 1 === this.business[`businessList${num}`].length) {
          this.$refs[`scroll${num}`].endUpLoading(true);
        } else {
          this.$refs[`scroll${num}`].endUpLoading();
        }
      },
      filterPrice(value) { // 价格过滤器
        if (!value) return 'HK$0.00'
        return `HK$${(value/100).toFixed(2)}`
      },
      fiterTime(val) { // 时间过滤
        if (!val) return null
        var d = new Date(val-0);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        var seconds = d.getSeconds();
        if (seconds <10) {
          seconds = '0' + seconds
        }
        return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds 
      },
    }
  }

</script>
<style lang='less' scoped>

</style>
