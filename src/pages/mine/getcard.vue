<template>
  <div>
    <vp-layout-page :overflow-touch="!popupShow">
      <div slot="header">
        <vp-base-search v-model="searchVal" placeholder="請輸入訂單號搜索" @submit="searchSubmit" />
      </div>
      <vp-layout-scroll @unEvent="up" ref="scroller">
      <vp-li-mine-business 
        v-for="(item, index) in cardList"
        :key="index"
        :data="[{name: '訂單號：', value: item.orderNo},{name: '電話號碼：', value: item.phoneNo},
        {name: '客戶姓名：', value: item.custName }, {name: '生效時間：', value: filTime(item.effectDate)}]"
        btnText="寫卡"
        @on-click-btn="btnHandler(item)" /> 
      </vp-layout-scroll>
    </vp-layout-page>
      <div v-show="popupShow" class="popup-bg" @click.self="popupShow = false">
        <div class="popup-wrapper">
          <h2 class="border-b">門市取卡</h2>
          <vp-input-message v-model.trim="iccid" label="ICCID" placeholder="請輸入ICCID" labelWidth="1rem" />
          <vpUpdateImg message="上載其它證明圖像" v-model="imgsrc"></vpUpdateImg>
          <p class="tips">已過上台生效日期，請上傳附加合約副本</p>
          <div class="btn-wrapper">
            <button type="button" class="btn-item" @click="cancel">取消</button>
            <button type="button" class="btn-item" @click="write">寫卡</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script type = 'text/javascript'>
import {vpBaseSearch, vpLiMineBusiness, vpInputMessage, vpUpdateImg} from '@/components';
import {Popup} from 'vux';
  export default {
    components: {
      vpBaseSearch, vpLiMineBusiness, Popup, vpInputMessage, vpUpdateImg 
    },
    data() {
      return {
        searchVal: null, // 搜索信息
        popupShow: false,
        iccid: '',
        phone: '',
        total: -1, // 总数
        pageSize: 10,
        pageNumber: 1,
        cardList: [], // 列表
        orderId: '', // 订单id
        typeValue: [{name: '选項1', value: 1}, {name: '选項2', value: 2}],
        imgsrc: {},
      }
    },
    created() {
      // this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
      this.$jb.webview2js((params) => {params.type == 1 && this.$jb.js2webview({type: 2})}) // 点击返回关闭webview
      this.getCard()
    },
    methods: {
      searchSubmit() { // 搜索
        this.getCard(this.searchVal, true)
      },

      btnHandler(item) {
        this.popupShow = true
        this.orderId = item.orderId
      },
      up() {
        this.getCard(this.searchVa)
      },
      cancel() { // 取消
        this.popupShow =false
      },
      async write() { // 写卡
        console.log(this.imgsrc)
        if (this.iccid === '') return this.$vux.toast.show({text: '请输入ICCID',type:'text'})
        let param = {
          id: this.orderId, // 订单id
          iccId: this.iccid,
          extContractUrl: this.imgsrc.imageUrl ? this.imgsrc.imageUrl : null
        }
        let res = await this.$post('exit/write', param)
        if (res.returnCode !== '1000') return this.$vux.toast.show({text: res.message, type:'text'})
        this.popupShow =false
      },
      async getCard(phone, isSearch) { // 获取列表 isSearch: 点击搜索是传true
        let param = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          userId: this.$client.userid,
          // orgCode: this.$client.orgcode,
          phoneNo: phone
        }
        let res = await this.$post('exit/page', param)
        if (!res || res.returnCode !== 1000 || !res.records) {
          return this.$refs.scroller.endUpLoading(true);
        }
        
        this.total = res.total
        if (isSearch) {
          this.cardList = res.records
        } else {
          this.cardList = this.cardList.concat(res.records)
        } 
        this.pageNumber++
        if (thsi.total = res.total) {
          return this.$refs.scroller.endUpLoading(true);
        }
        this.$refs.scroller.endUpLoading();
        // if (res.returnCode !== '1000') return this.$vux.toast.show({text: res.message, type:'text'})
      },
      filTime(value) { // 过滤时间
        let time = value.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
        return time
      },
    }
  }
</script>
<style lang = 'less' scoped>
  .popup-bg{
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    .popup-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      padding: 0 0.4rem 0.5rem;
      background: #fff;
      border-radius: 0.04rem;
      box-shadow: 0 0 0.1rem 0.02rem rgba(0, 0, 0, 0.1);
      h2 {
        height: 0.82rem;
        line-height: 0.82rem;
        margin-bottom: 0.2rem;
        text-align: center;
        color: #333;
        font-size: 0.28rem;
      }
      .upload {
        margin-top: 0.26rem;
        .title {
          line-height: 0.7rem;
          font-size: 0.26rem;
          color: #666;
        }
        .btn {
          position: relative;
          width: 100%;
          height: 2.42rem;
          border-radius: 0.04rem;
          background: @theme-bg;
          border: none;

          .icon-add {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 100%;
            border: 0.03rem solid #dedede;
            &::before, &::after {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: block;
              content: '';
              background: #dedede;
            }
            &::before {
              width: 80%;
              height: 0.03rem;
            }
            &::after {
              width: 0.03rem;
              height: 80%;
            }
          }
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: space-between;
        height: 0.56rem;
        margin-top: 0.55rem;
        .btn-item {
          flex: 1;
          line-height: 0.56rem;
          font-size: 0.24rem;
          border: none;
          background: none;
          border-radius: 0.04rem;
          &:first-child {
            margin-right: 0.7rem;
            background: @theme-secondary;
            color: #fff;
          }
          &:last-child {
            border: 0.01rem solid @theme-secondary;
            color: @theme-secondary;
          }
        }

      }
    }
  }
</style>