<template>
  <div>
    <vp-layout-page>
      <p class="panel-title">
        <img src="~@/assets/images/logistics@2x.png" alt="">
        <span>物流方式</span>
      </p>
      <div class="handle-type">
        <vp-input-radio class="vux-1px-b" v-model="handleType" :list="handleTypes[$client.right]" :radioRequired = "true"
        />
      </div>
      <div class="panel-store-get" v-show="handleType === 3">
        <!--<vp-input-radio v-model="logistics.time" label="是否及时取货" :list="[{name: '是', value: 1}, {name: '否', value: 2}]" />-->
        <vp-input-message :value="addrStoreAreaStr" label="區域&地區" placeholder="請選擇區域&地區" :readonly="true" labelWidth="1.4rem" icon="editor"
          @click.native="searchStoreArea" />
        <vp-input-message :value="addrStoreValFormat.storeNameTc + addrStoreValFormat.storeHintTc || ''" label="門市" placeholder="請選擇門市" :readonly="true" labelWidth="1.4rem" icon="editor"
          @click.native="searchStore" />
        <vp-input-message label="營業時間" labelWidth="1.4rem" :value="addrStoreValFormat.businessHourTc" placeholder="營業時間" :readonly="true" :border-b="false" />
        <div class="logistics-tips">
          <i class="icon-tips"></i>
          <span class="text">
            提交訂單後，我們將於1 - 3個工作天內將貨品運送至指定門市， 請閣下收到取貨通知後到門市取貨(儲值卡、增值券和服務計劃 除外，可即到門市取貨)。
          </span>
        </div>
      </div>
      <div class="panel-store-web" v-show="handleType === 2">
        <vp-input-message :value="expressAddress" label="送貨地址" placeholder="填寫送貨地址" :readonly="true" labelWidth="1.2rem" icon="editor"
          @click.native="showAddress=true" />
        <div class="store-web-textarea">
          <vpInputTextarea title="送貨備註" v-model="remark" :max="50" :rows="50/25" placeholder="客人可以填寫送貨補充資料及特別要求"></vpInputTextarea>
        </div>
      </div>
      <div class="panel-goods">
        <vp-li-goods-cart
        class="customer-cart-li"
        v-for="(item, index) in list"
        :key="index"
        :selector="false"
        :editor="false"
        :priceLabel="item.priceLabel"
        :coverImage="item.coverImage"
        :name="item.name"
        :skus="item.skus"
        :price="item.sellPrice | filterPrice"
        :num="item.num"
        :timeout="item.timeout">
           <div class="prize-wrapper" v-if="item.gifts && item.gifts.length">
            <div class="prize-title vux-1px-b">
              <div class="title-content">
                <i class="icon-prize"></i>
                <span class="text">贈送禮品</span>
              </div>
              <div class="express" @click="selectExpress(index, item)" v-if="handleType === 2 && item.freightId != -1">
                <div class="express-price vux-1px-r">{{item.expressVal && item.expressVal.price | filterPrice}}</div>
                <div class="express-type">
                  <span>{{ item.expressVal && item.expressVal.freightName || '選擇快遞方式'}}</span>
                  <i class="icon-arrow-bottom"></i>
                </div>
              </div>
            </div>
            <div class="prize-list">
              <p class="prize-li" v-for="(itemGift, indexGift) in item.gifts" :key="indexGift">
                <span class="dot">●</span>
                <span class="text">{{itemGift.giftName}}</span>
              </p>
            </div>
          </div>
        </vp-li-goods-cart>
      </div>
      <p class="panel-title">
        <img src="~@/assets/images/work_personal@2x.png" alt="">
        <span>個人資料</span>
      </p>
      <div class="panel-personal">
        <vp-input-message v-model="personal.firstName" label="姓氏" placeholder="請輸入姓氏" labelWidth="1.2rem" />
        <vp-input-message v-model="personal.lastName" label="名字" placeholder="請輸入名字" labelWidth="1.2rem" />
        <vp-input-message v-model="personal.phone" label="聯絡電話" type="tel" placeholder="請輸入聯絡電話號碼" labelWidth="1.2rem" />
        <vp-input-message v-model="personal.email" label="電郵地址" type="email" placeholder="請輸入電郵地址" labelWidth="1.2rem" :border-b="false" />
      </div>
      <!-- <p class="panel-title">
        <img src="~@/assets/images/work_personal@2x.png" alt="">
        <span>優惠code</span>
      </p>
      <div class="panel-discount-code">
        <vp-input-message v-model="discountCode" type="text" placeholder="輸入優惠碼" :border-b="false" />
      </div> -->
      <p class="panel-title">
        <img src="~@/assets/images/work_pay@2x.png" alt="">
        <span>支付明細</span>
      </p>
      <div class="panel-pay-info">
        <vp-cell label="商品小計" :value="paymentDetail.product | filterPrice" :isLink="false" :borderB="false" />
        <vp-cell label="郵費" :value="paymentDetail.express | filterPrice" :isLink="false" :borderB="false" />
        <vp-cell label="總計" :value="paymentDetail.sum | filterPrice" :isLink="false" :borderB="false" />
      </div>

      <vp-input-radio-pay v-model="payType" />
      <vp-input-radio-rules v-model="agreeRule" @check-rules="checkRules" />
      <vp-button content="支付" slot="footer" @click="goPay" />
    </vp-layout-page>
    <!-- <popup v-model="showAddress" width="100%" height="100%" position="right" :hide-on-blur="false">
      <div class="popup2">
        <div style="position:relative">
          <vpInputAddress v-model="addressVal" />
        </div>
        <div class="btn-wrapper">
          <vp-button content="確定" @click="slecteAddressBack"/>
        </div>
      </div>
    </popup> -->
      <div v-show="showAddress" class="addalert">
      <div class="popup2">
        <div style="position:relative">
          <vpInputAddress v-model="addressVal" />
        </div>
        <div class="btn-wrapper">
          <vp-button content="確定" @click="slecteAddressBack"/>
        </div>
      </div>
    </div>
    <popup-picker :show="expressShow" :show-cell="false" :data="express" :columns="1" v-model="expressVal" @on-hide="expressHideHandler"></popup-picker>
    <popup-picker :show="addrStoreAreaShow" :show-cell="false" :data="addrStoreArea" :columns="1" v-model="addrStoreAreaVal" @on-change="addrStoreAreaChangeHandler" @on-hide="addrStoreAreaShow = false" ref="addrStoreArea"></popup-picker>
    <popup-picker :show="addrStoreShow" :show-cell="false" :data="addrStore" :columns="1" v-model="addrStoreVal" @on-change="addrStoreChangeHandler" @on-hide="addrStoreShow = false" ref="addrStore"></popup-picker>
    <vp-layout-pay @on-fail="payFailCallback" ref="pay"/>
  </div>
</template>
<script type='text/javascript'>
  import {
    vpInputRadio,
    vpInputMessage,
    vpLiGoodsCart,
    vpInputRadioPay,
    vpInputTextarea,
    vpInputRadioRules,
    vpInputAddress,
    vpCell,
    vpLayoutPay
  } from '@/components';
  import {
    PopupPicker,
    Popup
  } from 'vux';
  export default {
    components: {
      PopupPicker,
      Popup,
      vpInputRadio,
      vpInputMessage,
      vpLiGoodsCart,
      vpInputRadioPay,
      vpInputTextarea,
      vpInputRadioRules,
      vpInputAddress,
      vpCell,
      vpLayoutPay
    },
    data() {
      return {
        handleTypes: {
          staging: [{name: '現場辦理', value: 1}, {name: '網站送貨', value: 2}, {name: '門市取貨', value: 3}],
          store: [{name: '網站送貨', value: 2}, {name: '門市取貨', value: 3}]
        },
        handleType: 2, //办理方式
        list: this.$session.get('createOrderInfo').productList || [],
        personal: {
          firstName: '盛', //盛
          lastName: '闯', //闯
          phone: '13972333765', //13972333765
          email: '309522304@qq.com' //309522304@qq.com
        },
        showAddress: false,
        expressShow: false, //快递选择
        listExpressIndex: 0, //当前操作的是商品数组中的哪个商品（下标）
        expressVal: [],
        express: [],
        addressVal: {
          areaTcResult: '', //區域  香港
          areaId: '', //區域id  1
          districtTcResult: '', //地區 香港仔
          districtId: '', //地區id  33
          streetTcResult: '', //街道名稱  香港仔大道
          streetId: '', //街道id  1318
          estateTcResult: '', //屋苑名稱  不知道
          bldgTcResult: '', //大廈名稱  上海商業銀行大廈
          bldgTcNum: '', //座數  B座
          floor: '', //層數/樓  9楼
          door: '' //室/單位  404
        },
        remark: '', //用户备注

        //门店区域
        addrStoreAreaShow: false,
        addrStoreArea: [],
        addrStoreAreaVal: [],
        addrStoreAreaValFormat: {}, //格式化后的值
        //门店
        addrStoreShow: false,
        addrStore: [],
        addrStoreVal: [],
        addrStoreValFormat: {}, //格式化后的值

        payType: '',
        agreeRule: false,

      }
    },
    computed: {
      paymentDetail() { //支付明细
        const copyList = this.$deepcopy(this.list);
        const productSum = copyList.map(item => item.sellPrice * 1 * item.num).reduce((pre, cur) => pre + cur, 0) || 0; //商品小计
        const expressSum = copyList.map(item => item.expressVal && item.expressVal.price * 1 || 0).reduce((pre, cur) => pre + cur, 0) || 0; //邮费小计（根据商品数量累加）
        const sum = productSum + expressSum;
        return {
          product: productSum,
          express: expressSum,
          sum: sum
        }
      },
      expressAddress() {//快递地址
        const addr = this.addressVal;
        const addrStr = addr.areaTcResult + addr.districtTcResult + addr.streetTcResult + addr.estateTcResult + addr.bldgTcResult +
          addr.bldgTcNum + addr.floor + addr.door;
        return addrStr
      },
      addrStoreAreaStr() {//门店地址
        const obj = this.addrStoreAreaValFormat;
        return `${obj.areaTcResult || ''}${obj.districtTcResult || ''}`;
      },

    },
    created() {
      this.$jb.webview2js((params) => {
        if (params.type == 1) {
          if (this.showAddress) {
            this.addrStoreAreaShow = this.showAddress = false;
          }else {
            this.$router.go(-1)
          }
        }
      })
    },
    methods: {
      selectExpress(index, item) {//选择快递
        this.express = item.express;
        this.expressShow = true;
        this.listExpressIndex = index;
        this.expressVal = [JSON.stringify(item.expressVal)];
      },
      expressHideHandler() {//选择完后要赋值给对应的商品信息上
        const list = this.$deepcopy(this.list);
        list[this.listExpressIndex].expressVal = JSON.parse(this.expressVal)
        this.list = list;
        this.expressShow = false;
      },
      addrStoreAreaChangeHandler(val) {//选择门店区域关闭弹窗回调
        const names = this.$refs.addrStoreArea && this.$refs.addrStoreArea.getNameValues();
        const nameArr = names.split(' ');
        this.addrStoreAreaValFormat = {
          areaTcResult: nameArr[0],
          areaId: val[0],
          districtTcResult: nameArr[1],
          districtId: val[1]
        }
      },
      addrStoreChangeHandler(val) {//选择门店关闭弹窗回调
        const value = JSON.parse(val[0])
        this.addrStoreValFormat = {
          id: value.id, //店铺id
          districtId: value.districtId, // 店铺区域id
          businessHourSc: value.businessHourSc.replace(/<br \/>/g, ''), //营业时间
          businessHourTc: value.businessHourTc.replace(/<br \/>/g, ''),
          businessHourEn: value.businessHourEn.replace(/<br \/>/g, ''),
          storeNameSc: value.addressSc, //店铺名称
          storeNameTc: value.addressTc,
          storeNameEn: value.addressEn,
          storeHintSc: value.addressHintSc, //店铺提示
          storeHintTc: value.addressHintTc,
          storeHintEn: value.addressHintEn,
        }
      },
      async searchStoreArea() {//搜索门店区域
        let arr = [];
        if (this.addrStoreArea.length) return this.addrStoreAreaShow = true; //已经请求过了
        const res = await this.$post('address/searchShopArea')
        if (res.returnCode != 1000) return this.$vux.toast.text(res.message)
        const [area, districts] = [res.dataInfo.areas.area, res.dataInfo.districts.district]
        //格式化成组件需要的格式
        for (const item of area) {
          arr.push({
            value: item.areaId,
            name: item.areaNameTc,
            name_en: item.areaNameEn,
            name_sc: item.areaNameSc
          })
        }
        for (const item of districts) {
          arr.push({
            parent: item.areaId,
            value: item.districtId,
            name: item.districtNameTc,
            name_en: item.districtNameEn,
            name_sc: item.districtNameSc
          })
        }
        this.addrStoreArea = arr;
        this.addrStoreAreaShow = true;
      },
      async searchStore() {//搜索门店
        let arr = [];
        const req = {
          word: '_',
          districtId: this.addrStoreAreaValFormat.districtId,
          pageNumber: 1,
          pageSize: 100
        }
        if (!req.districtId) return this.$vux.toast.text('請選擇區域&地區')
        const res = await this.$post('address/searchShop', req)
        if (res.returnCode != 1000) return this.$vux.toast.text(res.message)
        const addr = res.records
        //格式化成组件需要的格式
        for (const item of addr) {
          arr.push({
            value: JSON.stringify(item),
            name: item.addressTc+item.addressHintTc
          })
        }
        this.addrStore = arr;
        this.addrStoreShow = true;
      },
      slecteAddressBack() { //选择完地址后返回
        const addr = this.addressVal;
        const check = [ //必填項（用数组是为了保证验证顺序）
          {
            key: 'areaTcResult',
            toast: '請輸入區域&地區'
          },
          {
            key: 'districtTcResult',
            toast: '請輸入區域&地區'
          },
          {
            key: 'streetTcResult',
            toast: '請輸入街道名稱'
          },
          // {
          //   key: 'estateTcResult',
          //   toast: '請輸入屋苑名稱'
          // },
          // {
          //   key: 'bldgTcResult',
          //   toast: '請輸入大廈名稱'
          // },
          {
            key: 'bldgTcNum',
            toast: '請輸入座數'
          },
          {
            key: 'floor',
            toast: '請輸入層數/樓'
          },
          {
            key: 'door',
            toast: '請輸入室/單位'
          },
        ]
        for (const item of check) {
          if (!addr[item.key]) return this.$vux.toast.text(item.toast)
        }
        this.showAddress = false;
      },
      setCreateOrderData() { //整理提交订单需要的数据
        const that = this;
        const addressVal = that.addressVal; //地址信息
        const createOrderInfo = this.$session.get('createOrderInfo'); //上一个页面存储的数据
        const payPlatform = that.$client.webview; //订单来源、支付平台
        const frontUrl = `#/shopping/result`; //回调地址
        const exchangeBuyTypeArr = {
          '1': '0',
          '2': '7',
          '3': '4',
          '4': '3'
        } // 定义购买方式的key与下单需要值对应的对象，用于下一行
        const purchaseType = createOrderInfo.selcetedBuyType && exchangeBuyTypeArr[createOrderInfo.selcetedBuyType.purchaseTypeKey] || '0' //将购买方式中的purchaseTypeKey转为下单接口需要的值
        const productInfo = []; //商品列表
        const deliveryAddress = that.handleType == 2 ? { //收货地址(网站送货才传)
          provinceCode: addressVal.areaId || "", //省编号---區域
          cityCode: addressVal.districtId || "", //市编号---地區
          districtCode: addressVal.streetId || "", //区编号---街道
          province: addressVal.areaTcResult || "", //省名称
          city: addressVal.districtTcResult || "", //市名称
          district: addressVal.streetTcResult || "", //区名称
          detailAddress: addressVal.estateTcResult + addressVal.bldgTcResult + addressVal.bldgTcNum + addressVal.floor +
            addressVal.door, //详细地址---其它全部合并为详细地址
          shipPhone: that.personal.phone, //收货人手机
          shipName: that.personal.firstName + that.personal.lastName, //收货人名称
          shipPostCode: undefined, //收货人邮编
        } : undefined;
        for (const item of createOrderInfo.productList) { //格式化提交订单商品信息
          productInfo.push({
            skuId: item.skuId,
            id: item.productId,
            isContract: item.isContract || 2, //是否合约购机 香港移动专用 1是  2否  现有客户购买合约机必填
            deliveryCode: item.expressVal && item.expressVal.code, //快递编码 香港移动专用（网站送货必填）
            productQty: item.num, //购买数量
          })
        }
        const req = {
          ...that.payType,// 这里边解构出来有两个值。14：支付宝  16：微信 97：银联 （105：和包 257：和氏币）  22：VISA富邦支付  23：VISA中国银行支付  24：MASTERCARD富邦支付  25：MASTERCARD中国银行支付 下单支付必传
                          //支付平台 1：iOS 2：Android 3：H5 4：PC 5：扫码   下单支付必传
          paymentType: 3,//是支付接口需要，1话费充值 2 后付费账单 3购买订阅产品 手机 及附件
          origin: payPlatform, //订单来源 1：iOS 2：Android 3：H5   下单支付必传
          frontUrl: frontUrl, //支付后页面回调地址 下单支付必传
          remarks: [that.remark], //订单备注 页面中没有
          boId: undefined, //业务订单id  香港移动专用 购买纯商品、现有客户购买手机不用传
          // userId: that.$client.userid, //登录会员购买商品必传（香港不用）
          purchaseType: purchaseType, //商品购买方式 0：纯商品 1:带机上台 2:集客上台 3：买机上台 4:旗舰机上台 5:缴费 6:充值 7:现有客户买手机
          userInfo: { //销售员信息 香港移动专用
            id: that.$client.userid, //销售员id
            // token: that.$client.token, //登录凭证
            shopId: that.$client.shopid //店铺id
          },
          productInfo: productInfo,
          deliveryAddress: deliveryAddress,
          deliveryInfo: { //配送信息 香港移动专用
            logisticType: that.handleType, //物流方式 1现场办理 2网站送货 3门市取货
            // deliveryName: undefined, //快递名称 因为跟商品走的，所以这里就不传了
            // deliveryCode: undefined, //快递编码
            takeDepartName: (that.handleType == 3 ? that.addrStoreValFormat.storeNameTc : undefined), //取货门市名称
            takeDepartCode: (that.handleType == 3 ? that.addrStoreValFormat.id : undefined), //取货门市编码
            takeDistrict: (that.handleType == 3 ? that.addrStoreValFormat.districtId : undefined), //取货区域
            remark: undefined, //备注
          },
          customerInfo: { //买家信息 香港移动专用
            userId: purchaseType == 7 ? this.$session.get('customerInfo').customerId : undefined,
            buyerName: that.personal.firstName + that.personal.lastName,
            buyerPhone: that.personal.phone,
            buyerEmail: that.personal.email,
            buyerLastName: that.personal.firstName,
            buyerFirstName: that.personal.lastName,
          }
        }
        return req;
      },
      async goPay() {
        const that = this;
        const createOrderData = that.setCreateOrderData();
        const {customerInfo, deliveryAddress, deliveryInfo} = createOrderData;

        if (that.handleType == 2) {
          if (!deliveryAddress.province || !deliveryAddress.city || !deliveryAddress.district) return that.$vux.toast.text('請填寫完整的送貨地址')
        }

        if (that.handleType == 2) {
          if (!deliveryAddress.province || !deliveryAddress.city || !deliveryAddress.district) return that.$vux.toast.text('請填寫完整的送貨地址')
        }

        if (that.handleType == 3) {
          if (!deliveryInfo.takeDepartName) return that.$vux.toast.text('請填寫門市取貨門市名稱')
          if (!deliveryInfo.takeDepartCode) return that.$vux.toast.text('未知的取貨門市編碼')
          if (!deliveryInfo.takeDistrict) return that.$vux.toast.text('未知的取貨區域')
        }

        if (!customerInfo.buyerLastName) return that.$vux.toast.text('請填寫姓氏')
        if (!customerInfo.buyerFirstName) return that.$vux.toast.text('請填寫名字')
        if (!customerInfo.buyerPhone) return that.$vux.toast.text('請填寫聯絡電話')
        if (!customerInfo.buyerEmail) return that.$vux.toast.text('請填寫電郵地址')

        if (!that.agreeRule) return that.$vux.toast.text('您未同意《條款及細則》')
        that.$refs.pay.createOrder(createOrderData);
      },
      payFailCallback(res) { //支付或者下单失败回调
        console.log('支付失敗了')
      },
      checkRules() {
        console.log('查看規則')
      },
    }
  }

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  .handle-type {
    padding: 0 @page-space;
    background: #fff;
  }

  .panel-store-get {
    .logistics-tips {
      display: flex;
      padding: 0.1rem 0.24rem;
      .icon-tips {
        width: 0.22rem;
        height: 0.22rem;
        margin: 0.04rem 0.08rem 0 0;
        background: url('~@/assets/images/all_notice@2x.png') 0 center no-repeat;
        background-size: 0.22rem;
      }
      .text {
        flex: 1;
        line-height: 0.3rem;
        font-size: 0.22rem;
        color: #888888;
      }
    }
  }

  .panel-store-web {
    padding-bottom: @page-space;
    background: #fff;
    .store-web-textarea {
      padding: 0 @page-space;
    }
  }

  .panel-goods {
    margin-bottom: 0.22rem;
    .prize-wrapper {
    .prize-title {
      height: 0.4rem;
      padding: 0 @page-space 0.16rem;
      box-sizing: content-box;
      .title-content {
        display: inline;
        .icon-prize{
          display: inline-block;
          width: 0.26rem;
          height: 0.26rem;
          vertical-align: middle;
          background: url('~@/assets/images/goodsdetai_gift@2x.png') 0 0 no-repeat;
          background-size: 0.26rem;

        }
        .text {
          vertical-align: middle;
          font-size: 0.22rem;
          color: #666666;
        }
      }
      .express {
        position: relative;
        float: right;
        display: flex;
        align-items: center;
        height: 0.4rem;
        padding: .05rem 0.23rem;
        text-align: right;
        background: #F2F2F2;
        font-size: 0;
        border-radius: 0.04rem;
        color: #666666;
        .express-price{
          padding-right: 0.23rem;
          font-size: 0.22rem;
        }
        .express-type{
          // height: 0.4rem;
          // line-height: 0.4rem;
          display: flex;
          align-items: center;
          padding-left: 0.23rem;
          font-size: 0.22rem;
          .icon-arrow-bottom {
            width: 0;
            height: 0;
            margin-left: 0.1rem;
            border-left: 0.11rem solid transparent;
            border-right: 0.11rem solid transparent;
            border-top: 0.17rem solid #D8D8D8;
          }
        }
      }
    }
      .prize-list {
        padding-left: 0.32rem;
        .prize-li {
          display: inline-block;
          line-height: 0.54rem;
          margin-right: 0.2rem;
          .dot {
            color: @theme-yellow;
          }
          .text {
            vertical-align: middle;
            font-size: 0.22rem;
            color: #666666;
          }
        }
      }
    }
  }

  .panel-personal, .panel-discount-code, .panel-pay-info {
    margin-bottom: 0.22rem;
  }

  .panel-pay-info {
    padding: 0 @page-space;
    background: #fff;
  }

  .agreen {
    margin: 0.22rem 0 0.6rem @page-space;
    font-size: 0.26rem;
    color: #666666;
    span {
      vertical-align: middle;
    }
  }
  .popup2 {
    .btn-wrapper {
      padding: 0.24rem;
    }

  }


.addalert {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 1;
  z-index: 500;
}
</style>
