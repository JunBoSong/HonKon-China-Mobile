<template>
  <div>
    <vp-layout-page>
      <div>
        <swiper :list="imgList" :show-desc-mask="false" :loop="true" :aspect-ratio="1" v-model="swiperIndex" @click.native="doPreviewerGoods"></swiper>
        <div class="goods-info">
          <div class="title">
            <h4 class="row-2-ellipsis">{{goodsTitle}}</h4>
          </div>
          <div class="price-wrapper">
            <div class="price-item bare">
              <span class="price-title">凈機特惠價：</span>
              <span class="price-sell">{{ priceBare | filterPrice }}</span>
              <span class="price-market">{{ (selectedSku.marketPrice || goodsDetail.marketPrice) | filterPrice }}</span>
            </div>
            <div class="price-item discount" v-show="isLogin && goodsDetail.contractPrice">
              <span class="price-title">客戶優惠價：</span>
              <span class="price-sell">{{goodsDetail.contractPrice | filterPrice}}</span>
            </div>
            <span class="goods-stock">{{ stock > 0 ? '有貨' : '售馨' }}{{ goodsDetail.freightId*1 === -1 ? '/包郵' : '' }}</span>
          </div>
          <div class="customer-info" v-if="($client.right === 'staging' && isLogin)">
           {{`（現有服務計劃：${customerInfo.ratePlan || ' '}，合約截止時間：${customerInfo.contractEndDate || ' '}，剩餘手機配額：${customerInfo.contractPriceLimit || 0}）`}}
          </div>
          <div class="gift" v-if="goodsGifts.length">
            <p v-for="(item, index) in goodsGifts" :key="index" class="gift-item">{{item.giftName}}</p>
          </div>
          <!-- 4.客户登录前，显示 新客上台的营销用语 -->
          <!-- 6.客户登录后，店铺模式下仍显示新客上台营销用语，工作台模式下显示现有服务计划、合约截止时间、剩余手机配额，若无，不显示-->
          <div class="price-contract" v-if="($client.right === 'store' || !isLogin) && discountInfo">{{discountInfo}}</div>

        </div>

        <vp-cell class="master-cell-style master-cell-1" label="已選: " :title="selectedSku.skus" value="重新選擇" @click="showSku = true"
        />
        <vp-cell class="master-cell-style master-cell-2" v-if="goodsDetail.freightId*1 !== -1" label="網站送貨郵費: " :title="getExpressVal.price | filterPrice" :value="getExpressVal.freightName"
          @click="expressShow = true" />
        <tab :line-width="2" ref="tabWrapper" class="tab-wrapper">
          <tab-item :selected="showTab == 1" @on-item-click="toggleTab(1)">產品詳情</tab-item>
          <tab-item :selected="showTab == 2" @on-item-click="toggleTab(2)">條款條約</tab-item>
        </tab>
        <div class="goods-detail html-content" ref="html_content" v-show="showTab == 1 || showTab == 0" v-html="goodsDetail4html"></div>
        <div class="goods-detail html-content" ref="html_content2" v-show="showTab == 2" v-html="treaties"></div>
      </div>
      <div class="page-detail-btns vux-1px-t" slot='footer' ref="page_footer">
        <router-link class="btns-cart" :to="{name: 'shoppingCart'}">
          <badge v-if="cartCounter > 99" class="badge"></badge>
          <badge v-if="cartCounter > 0 && cartCounter <= 99" :text="cartCounter" class="badge"></badge>
        </router-link>
        <div class="btns-options" :class="{'disable': stock < 0}">
          <!-- 1.客户未登录前显示，客户登录后不显示 -->
          <div class="btns-add" v-if="!isLogin" @click="showSkuMethod('addCart')">加入購物車</div>
          <div class="btns-buy" @click="showSkuMethod('doBuy')">立即購買</div>
        </div>
      </div>
    </vp-layout-page>
    <vp-picker-sku v-model="showSku" :skuArr="skuArr" :goodsData="goodsDetail" :goodsThumbnail="goodsThumbnail" :goodsTitle="goodsTitle" :btnText="selcetedBuyType.name" @submit="submitSku" @change="changeSku">
      <div class="sku-box">
        <p class="sku-title">購買方式</p>
        <div class="check-box">
          <template v-for="(item, index) in selectedSku.buyTypes">
            <!-- 净手机仅当客户未登录时显示，客户登录后不显示。 -->
            <span class="sku-item" :class="{'selected':selcetedBuyType === item}" :key="index" v-show="item.purchaseTypeKey != 1 || !isLogin"
              @click="selcetedBuyType = item">
              {{item.name}}
            </span>
          </template>
        </div>
        <div class="buy-type-tips">
          {{selcetedBuyType.purchaseTypeName}}
        </div>
      </div>
    </vp-picker-sku>
    <popup-picker :show="expressShow" :show-cell="false" :data="express" :columns="1" v-model="expressVal" @on-hide="onHide"></popup-picker>
    <!-- <div v-transfer-dom>
      <confirm v-model="showCustomerLogin" show-input title="客戶" :input-attrs="{type: 'number', placeHolder: $t('請輸入客戶電話號碼')}"
        @on-confirm="customerLogin" v-keyBoard>
      </confirm>
    </div> -->
    <!-- //g -->
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
     <div class="inputWrapMask" v-show="showCustomerLogin" @touchmove.prevent>
        <div class="inputWrap" >
          <p>客戶</p>
          <input type="text" placeholder="請輸入客戶電話號碼" v-model="ktelNum" v-keyBoard>
          <div class="getBtn">
            <span class="cancelBtn" @click="cancelHandle()">取消</span>
            <span class="comfirmBtn" @click="customerLogin(ktelNum)">確定</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    </transition> -->
  </div>
</template>
<script type='text/javascript'>
//92044748
  import config from '@/config';
  import { mapGetters, mapMutations } from "vuex";
  import { Swiper, Tab, TabItem, PopupPicker, Badge, Confirm, TransferDomDirective as TransferDom } from "vux";
  import {
    vpPickerSku,
    vpCell,
    vpInputNumber
  } from "@/components";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      Tab,
      TabItem,
      PopupPicker,
      Badge,
      Confirm,
      vpPickerSku,
      vpCell,
      vpInputNumber
    },
    data() {
      return {
        goodsSupplier: {},
        goodsDetail: {},
        goodsGifts: [],
        swiperIndex: 0,
        imgList: [],
        discountInfo: '', //新客上台手機优惠信息，取购买方式的“新客上台”的描述字段purchaseTypeName
        priceContract: 0, //签约优惠价
        //关于现有客户买手机
        showCustomerLogin: false, //显示、隐藏客户登录


        customerInfo: this.$session.get('customerInfo') || {
          customerPhone: undefined, //用户手机号
          customerId: undefined, //客户id
          tmcode: undefined, //现有服务计划 ID
          ratePlan: undefined, //现有服务计划
          contractEndDate: undefined, //合约截止时间
          contractPriceLimit: 0,//签约价限额
          emailAddress: undefined, //邮箱地址
        },
        //关于现有客户买手机结束

        onlineCounter: 0, // 线上购物车数量
        submitType: 'doBuy', //提交sku方式： addCart | doBuy
        skuArr: [], // 可选的sku
        showSku: false, // 显示/隐藏 sku选择框
        selectedSku: {}, // 选中的sku
        selcetedBuyType: {}, // 选中的购买方式
        showFreight: false, // 显示/隐藏 快递选择
        expressShow: false,
        expressVal: [],
        express: [],
        showTab: true, // 详情/条约条款切换
        goodsDetail4html: '', //商品详情-富文本
        treaties: '', //条款条约
        ktelNum:''  //g现有客户买手机客户手机号
      };
    },
    computed: {
      ...mapGetters([
        'counter',//本地购物车数量
      ]),
      cartCounter() {//购物车数量，根据运行环境来去本地购物车或者线上
        return this.$client.webview == 3 ? this.counter : this.onlineCounter
      },
      goodsThumbnail() {//当前商品缩略图， 当前sku的image > 商品的coverImage > 商品的image[0]
        const that = this;
        return that.selectedSku.image || that.goodsDetail.coverImage || (JSON.parse(that.goodsDetail.image || '[{}]')[0].url)
      },
      goodsTitle() {//当前商品标题， 商品名称+skus
        const that = this;
        return `${that.goodsDetail.name || ''} ${that.selectedSku.skus || ''}`
      },
      priceBare() { //净手机特惠价 分两种：客户登录前是净手机价，客户登录后是免签约价
        const that = this;
        const freeContractPrice = that.goodsDetail.freeContractPrice;
        const sellPrice = that.selectedSku.sellPrice || that.goodsDetail.sellPrice;
        return that.isLogin ? freeContractPrice : sellPrice;
      },
      stock() { //总库存
        return this.skuArr.reduce((pre, cur) => pre + cur.stock * 1, 0);
      },
      isLogin() { //是否登录
        return this.customerInfo.customerId ? true : false
      },
      productId() {
        return this.$route.query.id;
      },
      getExpressVal() {
        return this.expressVal[0] && JSON.parse(this.expressVal[0]) || {};
      }
    },
    created() {


      /**
       * Q: 2. 工作台模式 簽約優惠價  現有服務計劃   合約截止時間  剩餘手機配額
       *
       * A: 客户免签约价--在商品详情的freeContractPrice字段
       *    簽約優惠價--调【获取现有客户手机价钱/umall/product/adapter/product/getUpfrontPrice】 这个接口。签约优惠价只跟当前用户有关
       *    店铺模式的----指定最低簽約服務計劃 【取商品购买方式的新客上台的宣传语】
       *    工作台模式的----現有服務計劃、合約截止時間、剩餘手機配額
       *
       *    ~ 关于现有客户购买要判断3个地方，满足其中一項就只能以免签约价购买，不能以签约价购买
       *        1. 合同截止日期返回为空
       *        2. 配额为0
       *        3. 配额接口的另一个出参
       *
       * T: contractPrice \ contractPriceLimit 写死了
       *    smsCode: 1234, \ 验证码写死了 现有客户登录，不支持单手机号登录
       */
      const that = this;
      that.initJB();
      that.getGoodsDetail();
      that.getGoodsSku();
      that.getCartCount();
      that.getGifts();
      that.getTreaties();
      that.getGoodsDetail4html();
    },
    methods: {
      ...mapMutations([
        'CART_ADD'
      ]),
      cancelHandle() { //g
        this.showCustomerLogin = false
      },
      onHide() {
        this.expressShow = false
      },
      initJB() {
        this.$jb.webview2js((params) => {
          if (params.type == 1) {
            if (this.$route.path === this.$session.get('beginPath')) {
              this.$jb.js2webview({ type: 2 })
            } else {
              this.$router.go(-1);
            }
          }
        })
      },
      triggleJB() { //触发js桥
        const that = this;
        that.$jb.js2webview({ //分享
          type: 1,
          shareTitle: that.goodsTitle,
          shareDesc: that.goodsDetail.comment,
          shareImg: that.goodsThumbnail,
          shareLink: location.href.replace('staging', 'store').replace(/ios|android/ig, 'h5'), //分享出去都是店铺权限
        })
        that.$jb.js2webview({//标题
          type: 5,
          title: that.goodsTitle,
        })
      },

      async customerLogin(val) { // 工作台模式现有客户买手机登录. 登录后查询  现有客户价格、现有服务计划、合约截止时间、剩余手机配额
        this.showCustomerLogin = false //g
        if (!this.$regex.phone.test(val)) return this.$vux.toast.text('手機號格式錯誤')

        const res = await this.$post('customer/login', {
          msisdn: val
        })
        if (!res || res.returnCode != 1000 || !res.dataInfo.postpaid) return;
        const resData = res.dataInfo.postpaid;

        this.customerInfo = {
          ...this.customerInfo,
          customerPhone: val, //客户手机号
          customerId: resData.customerId, //客户id
          tmcode: resData.tmcode, //现有服务计划 ID
          ratePlan: resData.ratePlan, //现有服务计划 名字
          contractEndDate: resData.contractEndDate, //合约截止时间
          emailAddress: resData.emailAddress
        }
           console.log(' this.customerInfo', this.customerInfo)
        this.price4customer(resData.customerId);
        this.getLimit4customer(resData.customerId);
        this.$session.set('customerInfo', this.customerInfo) //存起来。
      },
      async price4customer(customerId) { //获取现有客户价格
        const res = await this.$post('product/price4customer', {
          "customerId": customerId,
          "prodCode": this.selectedSku.code, //产品确认是用sku的code
          "userId": this.$client.userid
        })
        if (!res || res.returnCode == 1000) return
        this.priceContract = res.dataInfo
      },
      async getLimit4customer(customerId) { //获取客户剩余手机配额

        const res = await this.$post('customer/limitBuy', {
          "userId": this.$client.userid,
          "phoneNo": this.customerInfo.customerPhone,
        })
        if (!res || res.returnCode != 1000) return;
        this.customerInfo.contractPriceLimit = res.dataInfo.upfrontQuota*1;
      },
      async buyPhoneUp(businessType) {//上台购买手机 注意: 就算用户登录了,选择新客上台或者旗舰级上台,都不能用客户登录返回的customerId
        const client = this.$client;
        const res = await this.$post('order/sellProductNewSales', {
          prodCode: this.selectedSku.code,
          qty: this.selectedSku.num,
          userId: this.$client.userid, //非集团用户传1
          // lotCode: "12345678901234567890", //这个写死了
        })
        if(!res || res.returnCode != 1000) return
        this.$router.push({name: 'serviceChoice', query: {businessType: businessType, cmhkCustomerId: res.dataInfo.customerId}})

      },
      buy1() { //净手机购买
        this.$router.push({
          name: 'shoppingCheck'
        })
      },
      buy2() { //现有客户买手机
        /**
         * 7.店铺模式下，客户登录需输入密码或者验证码，工作台方式下，输入手机号码即可登录
         * 8.店铺模式下，直至客户关闭退出，一直保持登录状态；工作台方式下，返回首页则退出客户登录状态
         */
        const that = this;
        const customerInfo = that.$session.get('customerInfo') || {};
        const noLogin = {
          staging: function () { //未登录-工作台
            that.showSku = false;
            this.ktelNum = '' //g 在弹框展示前清空输入框值
            that.showCustomerLogin = true;
          },
          store: function () { //未登录-店铺
            that.$router.push({ name: 'shoppingLogin' })
          }
        }
        if (customerInfo.customerId) //已登录
          that.$router.push({ name: 'shoppingPick' })
        else {
          noLogin[that.$client.right]()
        }
      },
      buy3() { // 旗舰机上台
        this.buyPhoneUp(4)
      },
      buy4() { //新客上台
        this.buyPhoneUp(3)
      },
      showSkuMethod(type) { //显示sku选择弹窗。 type: addCart -- 添加购物车 | doBuy -- 立即购买
        if (this.stock < 1) return this.$vux.toast.text('此商品已售馨')
        this.showSku = true;
        this.submitType = type;
      },
      changeSku(val) { //选中的sku改变了，包括初始化的, 注意: 改变了商品数量不会触发,也不需要触发,所以在最后的操作取this.selectedSku,num永远是1.
        console.log('sku', val);
        const changeVal = val;
        const that = this;
        const custId = that.customerInfo.customerId;
        that.selcetedBuyType = changeVal.buyTypes[0] || {} //设置默认购买方式(这里潜在一个逻辑bug: 用户每次更换sku,都将购买方式重置了)

        that.selectedSku = changeVal;
        if (custId && that.selcetedBuyType.purchaseTypeKey == 2) {//客户登录了 && 购买方式是现有客户买手机, 每次改变sku后要重新查询,因为是根据商品sku的code来的.
          that.price4customer(custId);
          that.getLimit4customer(custId);
        }
        that.triggleJB()
      },
      submitSku(val) { //提交sku选择。 根据type来执行添加购物车 | 立即购买
        this[this.submitType](val);
      },
      async addCart(val) { //添加购物车
        const selectedSku = val;
        if (this.selcetedBuyType.purchaseTypeKey != 1) return this.$vux.toast.text('僅净手機可加入購物車')
        if (this.$client.webview == 3) {//本地购物车
          const req = {
            productId: selectedSku.productId,
            skuId: selectedSku.id,
            coverImage: this.goodsThumbnail,
            name: selectedSku.productName,
            skus: selectedSku.skus,
            sellPrice: selectedSku.sellPrice,
            num: selectedSku.num,
            stock: selectedSku.stock,
            freightId: this.goodsDetail.freightId,//运费模板
            onShelfStatus: 2 //上架状态（1,未上架2，已上架,3已下架）  本地购物车当然是默认上架的
          };
          this.CART_ADD(req)
          this.$vux.toast.text("添加成功");
        }else {//线上购物车
          const req = {
            ownerId: this.$client.userid,
            addDate: new Date().getTime(),
            productId: selectedSku.productId,
            skuId: selectedSku.id,
            num: selectedSku.num,
            isReturnDateList: undefined
          };
          const res = await this.$post("cart/add", req);
          this.showSku = false;
          if (!res) return
          if (res.returnCode == 1000) {
            this.$vux.toast.text("添加成功");
            this.onlineCounter = res.dataInfo * 1;
          } else {
            this.$vux.toast.text(res.message);
          }
        }
      },
      doBuy(val) { //立即购买
        const [goodsDetail, selectedSku] = [this.$deepcopy(this.goodsDetail), val];
        const productList = [{ //整理信息,后面的页面会用到
          name: goodsDetail.name,
          coverImage: selectedSku.image || goodsDetail.coverImage,
          skus: selectedSku.skus,
          num: selectedSku.num,
          productId: goodsDetail.id,
          skuId: selectedSku.id,
          sellPrice: selectedSku.sellPrice,
          stock: selectedSku.stock,
          freeContractPrice: goodsDetail.freeContractPrice, //免签约价
          contractPrice: 1, //签约价
          contractPriceLimit: this.customerInfo.contractPriceLimit, //签约价限量
          //check订单页面可以重新选择快递，所以把当前页面选择的带过去
          freightId: goodsDetail.freightId,//运费模板
          express: this.express,
          expressVal: this.$deepcopy(this.getExpressVal),
          gifts: this.$deepcopy(this.goodsGifts),
          // expressInfo: this.$deepcopy(this.getExpressVal),
        }]
        this.$session.set('createOrderInfo', {
          selcetedBuyType: this.$deepcopy(this.selcetedBuyType),
          productList: productList
        })
        const method = `buy${this.selcetedBuyType.purchaseTypeKey}`; //根据选择的购买方式调用不同的方法 buy1 buy2 buy3 buy4
        this[method]()
      },
      async getGoodsDetail() { //获取商品详情
        const res = await this.$post("product/detail", {
          id: this.productId
        });
        if (!res || res.returnCode != 1000) return
        const resData = res.dataInfo;
        this.goodsDetail = resData;

        this.getFreight(); // 获取运费模板
        try {
          let imgList = JSON.parse(resData.image);
          imgList.map(item => { //格式化成swipe组件需要的格式
            item.img = item.url;
            item.url = "";
            item.fallbackImg = require("@/assets/images/default/750x750.png");
          });
          this.imgList = imgList;
        } catch (error) {
          this.imgList = [];
        }

      },
      async getGoodsSku() { //商品sku、库存、购买方式
        let [arr, skuIds, stock] = [
          [],
          [], 0
        ];
        const resSkus = await this.$post("product/sku", {
          productId: this.productId
        });
        skuIds = resSkus.records.map(item => item.id) //将提取skuid用来下面请求库存
        const resStock = await this.$post("product/stock", {
          skuIds: skuIds
        }); //根据skuid获取库存
        const resBuytypes = await this.$post("product/buyType", { //根据productId获取购买方式，需要查询数据字典获取对应的中文
          // productId: this.productId,
          productId: this.$route.query.id,
          pageNumber: 1,
          pageSize: 10
        });
        const resDectionary = await this.$post('admin/dectionary', { //查询数据字典获取购买方式对应的中文
          "type": 124
        })
        const dectBuytypes = resDectionary.dataInfo[config.APPID][124];
        //对sku列表遍历处理，做了下面几件事。
        //  1. 解析sku返回的json字符串为json对象
        //  2. 将上面根据skuId获取到的库存覆盖sku接口返回的库存（stock）
        //  3. 将新客户上台的优惠信息赋值给discountInfo（默认显示在页面的赠品下方）
        //  4. 通过 购买方式接口返回的purchaseTypeKey 与 数据字典中的 value 匹配，查询购买方式的中文，并赋值给购买方式新添加的一个字段name。
        //  5. 通过 购买方式的skuId与单条skuId匹配，将单条sku添加购买方式字段 {Array<Object>}buyTypes
        //  6. 将处理后的sku赋值给组件需要的sku
        resSkus.records.map(itemSku => {
          let skus = [];
          try { // 1
            itemSku.skusArray = JSON.parse(itemSku.skusArray).propertySets;
          } catch (error) {
            console.log('skusArray字段解析失败')
          }
          for (let itemStock of resStock.records) {
            if (itemSku.id === itemStock.skuId) { // 2
              const amount = itemStock.amount * 1;
              stock += amount;
              itemSku.stock = amount;
            }
          }
          for (let itemBuytype of resBuytypes.records) {
            if (itemBuytype.purchaseTypeKey * 1 === 4) { // 3
              this.discountInfo = itemBuytype.purchaseTypeName;
            }
            for (let itemDect of dectBuytypes) { // 4.
              if (itemDect.value * 1 === itemBuytype.purchaseTypeKey * 1) {
                itemBuytype.name = itemDect.name
              }
            }
            if (itemSku.id === itemBuytype.skuId) { // 5
              itemSku.buyTypes = itemSku.buyTypes || [];
              itemSku.buyTypes.push(itemBuytype)
            }
          }
          itemSku.price = itemSku.sellPrice;
          arr.push(itemSku);
        });
        this.skuArr = arr; //6
      },
      async getGifts() { //获取礼品
        const res = await this.$post('product/gift', {
          gift: "GOODTYPE_ZENGPIN",
          ids: [this.productId]
        });
        if (!res || !res.records) return;
        this.goodsGifts = res.records;
      },
      async getCartCount() { //获取购物车数量
        const res = await this.$post("cart/count", {
          ownerId: this.$client.userid
        });
        if (!res || !res.dataInfo) return;
        this.onlineCounter = res.dataInfo * 1;
      },
      async getGoodsDetail4html() { //商品详情富文本
        let res = await this.$post("product/detail4html", {
          productId: this.productId
        });
        if (!res || res.returnCode != 1000) return
        this.goodsDetail4html = res.dataInfo && res.dataInfo.graphicDetails || "";
        this.$nextTick(() => {
          let list = this.$refs.html_content.getElementsByTagName("a");
          for (let i = 0, len = list.length; i < len; i++) {
            list[i].className += " needsclick"; //解决fastClick插件a标签问题
          }
        });
      },
      async getTreaties() { //获取条款条约
        let res = await this.$post("hint/detail", {
          code: 'treaties'
        });
        if (!res || res.returnCode != 1000) return
        this.treaties = res.dataInfo.content;
        this.$nextTick(() => {
          let list = this.$refs.html_content2.getElementsByTagName("a");
          for (let i = 0, len = list.length; i < len; i++) {
            list[i].className += " needsclick"; //解决fastClick插件a标签问题
          }
        });
      },
      async getFreight() { //获取运费模板
        const freightId = this.goodsDetail.freightId;
        if (freightId * 1 === -1) return //包邮的
        const res = await this.$post('freight/detail', {
          ids: [freightId]
        });
        if (res.returnCode != 1000 || !res.dataInfo || !res.dataInfo.length) return
        const list = res.dataInfo[0].freightPriceList || [];
        const formatList = list.map(item => { //格式化为组件需要的格式
          return {
            name: item.freightName,
            value: JSON.stringify(item)
          }
        })
        this.express = formatList;
        this.expressVal = [formatList[0].value]; //设置默认运费模板
      },
      doPreviewerGoods() {

      },
      toggleTab(type) {
        this.showTab = type;
      }
    },
  };

</script>
<style lang='less' scoped>
  @import "../../assets/less/theme.less";
  @page-space-goods: 0.3rem;
  .goods-info {
    padding: 0.2rem 0;
    background: #fff;
    .title {
      padding: 0.2rem @page-space-goods 0;
      color: @text-color;
      h4 {
        font-size: 0.32rem;
        font-weight: bold;
      }
    }
    .price-wrapper {
      position: relative;
      padding: 0 @page-space-goods;
      .price-item {
        .price-title {
          font-size: 0.28rem;
          color: #666;
        }
        .price-sell {
          font-size: 0.4rem;
        }
        .price-market {
          vertical-align: baseline;
          text-decoration: line-through;
          font-size: 0.24rem;
          color: #666;
        }
        &.bare {
          margin-top: 0.18rem;
          .price-sell {
            color: @theme-yellow;
          }
        }
        &.discount {
          margin-top: 0.18rem;
          .price-sell {
            color: @theme;
          }
        }
      }
      .goods-stock {
        position: absolute;
        top: 0.18rem;
        right: @page-space-goods;
        font-size: 0.24rem;
        color: @text-color;
      }

    }
    .customer-info {
      padding: 0.14rem @page-space-goods 0.22rem;
      font-size: 0.24rem;
      color: #888888;
    }
    .gift {
      line-height: 0.3rem;
      margin-top: 0.16rem;
      padding: 0 @page-space-goods 0 0.54rem;
      font-size: 0.24rem;
      // color: #ffa008;
       color: #333;
      background: url("~@/assets/images/goodsdetai_gift@2x.png") 0.24rem 0 no-repeat;
      background-size: 0.26rem;
    }
    .price-contract {
      margin-top: 0.2rem;
      padding: 0.2rem @page-space-goods 0.24rem;
      background: #fffafb;
      font-size: 0.24rem;
      color: #888888;
    }
  }

  .goods-contract {
    padding: 0.22rem @page-space-goods;
    background: #fffafb;
    .icon-discount {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.06rem;
      vertical-align: top;
      background: url("~@/assets/images/goodsdetail_discounts@2x.png") 0 center no-repeat;
      background-size: 0.3rem;
    }
    .discount {
      display: inline-block;
      color: #666;
      font-size: 0.24rem; // .discount-price {
      //   color: #666;
      // }
      // .discount-month {
      //   margin-top: 0.14rem;
      //   font-size: 0.24rem;
      //   color: #888;
      // }
    }
  }

  .sku-box {
    padding: 0.26rem 0.12rem 0.25rem;
    .sku-title {
      padding: 0 0.12rem;
      font-size: 0.24rem;
      color: #333333;
    }
    .sku-item {
      display: inline-block;
      height: 0.54rem;
      margin: 0.2rem 0.12rem 0;
      padding: 0.1rem 0.18rem;
      text-align: center;
      font-size: 12px;
      color: #353535;
      border-radius: 0.04rem;
      border: 1px solid #666666;
      &.selected {
        background: #ffffff;
        border: 1px solid @theme;
        color: @theme;
      }
      &.disabled {
        /*border: 1px solid @theme;*/
        color: #bdbdbd;
      }
    }
    .buy-type-tips {
      margin: 0.2rem 0.12rem 0;
      padding: 0.2rem 0.3rem;
      font-size: 0.24rem;
      color: #666;
      background: @theme-bg;
      border-radius: 0.04rem;
    }
  }

  .sku-tips {
    margin: 0 @page-space-goods;
    padding: 0.21rem 0.32rem;
    font-size: 0.24rem;
    color: #666666;
    background: #f8f8f8;
    border-radius: 0.04rem;
  }

  .master-cell-style {
    padding: 0 @page-space-goods;
    &.master-cell-1 {
      margin-top: 0.2rem;
    }
  }
  .tab-wrapper {
    margin-top: 0.2rem;
  }

  .page-detail-btns {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.1rem;
    padding: 0 @page-space-goods;
    background: #fff;
    font-size: 0;
    .btns-cart {
      position: relative;
      width: 1.3rem;
      height: 90%;
      text-align: center;
      background: url("~@/assets/images/shopping_cart@2x.png") center center no-repeat;
      background-size: 0.52rem;
      .badge {
        position: absolute;
        top: 0;
        right: 0.14rem;
      }
    }
    .btns-options {
      display: flex;
      height: 0.78rem;
      line-height: 0.78rem;
      flex: 1;
      border: 1px solid @theme;
      border-radius: 0.06rem;
      font-size: 0.32rem;

      .btns-add,
      .btns-buy {
        flex: 1;
        text-align: center;
        color: #fff;
        background: @theme;
      }
      .btns-add {
        color: @theme;
        background: #fff;
      }
      &.disable {
        border: 1px solid #666;
        .btns-add {
          color: #666;
          background: #fff;
        }
        .btns-buy {
          flex: 1;
          text-align: center;
          color: #fff;
          background: #666;
        }
      }
    }
  }
.inputWrapMask {
    width: 100%;
	  min-height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  .inputWrap {
    width: 5.8rem;
    height: 2.8rem;
    padding-top: .1rem;
    background: #fff;
    position: absolute;
    left: 50%;
    // top: 4.25rem;
    top: 50%;
    margin-top: -1.4rem;
    transform: translateX(-50%);
    border-radius: .06rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
      width: 100%;
      text-align: center;
      font-size: .36rem;
      line-height: .8rem;
    }
    input {
      display: block;
      height: .76rem;
      width: 5.2rem;
      border: 1px solid #C7C7C7;
      border-radius: .06rem;
      margin: 0 auto;
      padding: 0 .2rem;
      font-size: .32rem;
    }
    .getBtn {
      display: flex;
      width: 100%;
      margin-top:.2rem;
      span{
        display: block;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: .36rem;
        line-height: .9rem;
        text-align: center;
      }
      .comfirmBtn {
        color: #e52c79;
      }
    }
  }
</style>
