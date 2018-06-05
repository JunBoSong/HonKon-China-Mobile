<template>
  <div>
    <vp-layout-page>
      <vpFlowStatus :page='1'></vpFlowStatus>
      <!-- 辦理方式 -->
      <section class="specail-section">
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_way@2x.png')">
          <span>辦理方式</span>
        </div>
        <vpInputRadio v-model="saveMore.transactType" :isNeedLine=true class="vpInputRadio" :list="handleData" />
        <!-- 办理方式：现场办理，输入ICCID -->
        <vpInputMessage class="vpInputMessage" v-model="saveMore.newIccid" label="ICCID" placeholder="請輸入ICCID" v-if="saveMore.transactType ==='1'" />
        <!-- 办理方式：送货上门 -->
        <div v-if="saveMore.transactType ==='2'">
          <div>
            <vpInputRadio class="vpInputRadio" v-model="saveMore.deliverAddrType" :list="deliverAddrTips" label="送貨地址" @on-change="deliverAddrTypeChange" />
          </div>
          <div>
            <vp-input-message placeholder="請填寫送货地址" v-if="saveMore.deliverAddrType=='2'" :value="deliverAddrInfoStr" label-width="0rem" icon="editor" :readonly="true" @click.native="goSelectAddress" />
          </div>
          <div class="store-web-textarea">
            <vpInputTextarea title="送貨備註" v-model="saveMore.deliverRemark" :max="50" :rows="50/25" placeholder="客人可以填寫送貨補充資料及特別要求"></vpInputTextarea>
          </div>
        </div>
        <!-- 办理方式：门市取货 -->
        <div class="panel-store-get" v-if="saveMore.transactType ==='3'">
          <vp-input-message :value="saveMore.takeRegion" label="區域&地區" placeholder="請選擇區域&地區" :readonly="true" labelWidth="1.4rem" icon="editor" @click.native="searchStoreArea" />
          <vp-input-message :value="saveMore.takeOrg" label="門市" placeholder="請選擇門市" :readonly="true" labelWidth="1.4rem" icon="editor" @click.native="searchStore" />
          <vp-input-message label="營業時間" labelWidth="1.4rem" :value="addrStoreValFormat.businessHourTc" placeholder="營業時間" :readonly="true" :border-b="false" />
          <div class="logistics-tips">
            <i class="icon-tips"></i>
            <span class="text">
              提交訂單後，我們將於1 - 3個工作天內將貨品運送至指定門市， 請閣下收到取貨通知後到門市取貨(儲值卡、增值券和服務計劃 除外，可即到門市取貨)。
            </span>
          </div>
        </div>
      </section>
      <!-- 增值服務優惠 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_value@2x.png')">
          <span>增值服務優惠</span>
        </div>
        <vpInputRadio v-model="bindingVasInfoListOrigin" class="vpInputRadio" type="checkbox" :list="couponData2" direction="column" />
        <div v-if="hardBundleAmount" class="base-info-tip">以上服務請至少選擇${{hardBundleAmount | filterPrice}}</div>
        <vpInputRadio v-model="freeVasInfoListOrigin" class="vpInputRadio" type="checkbox" :list="couponData1" direction="column" />
      </section>
      <!-- 开通大湾区语音包 -->
      <div v-if="deliverParams.isDawan=='1'">
        <section>
          <vpInputRadio v-model="isOpenDawan" class="vpInputRadio" fontSize="0.28rem" type="checkbox" :list="dawanVoice1" direction="column" />
          <vpInputRadio v-show="isOpenDawan.length>0" :radioRequired=true :isNeedLine=true v-model="dawanVoiceType" class="vpInputRadio" direction="column" :list="dawanData" label="" />
        </section>
        <section v-show="isOpenDawan.length>0">
          <vpInputRadio v-model="isChinaNumbers" class="vpInputRadio" type="checkbox" :list="dawanVoice2" direction="column" />
          <vp-cell-bus v-show="isChinaNumbers.length>0" :borderB="false" label="選擇中國號碼（可選）" :value="this.saveMore.dawanVoiceInfo.dawanPhoneNo" @click="goSelectInlandNum(1,1)" />
        </section>
        <section v-show="isOpenDawan.length>0">
          <vpInputRadio v-model="isAomenNumbers" class="vpInputRadio" type="checkbox" :list="dawanVoice3" direction="column" />
          <vp-cell-bus v-show="isAomenNumbers.length>0" :borderB="false" label="選擇澳門號碼（可選）" :value="this.saveMore.dawanVoiceInfo.macaoPhoneNo" @click="goSelectInlandNum(4,2)" />
        </section>
      </div>
      <!-- 开通中国漫游话音 -->
      <!-- 仅当上台证件类型为身份证且服务计划为基本服务计划（非大湾区服务计划 isDawan==1:属于大湾区服务计划，isDawan==2:基本服务计划 ）时可选择开通中国漫游话音，否则不显示当前模块.certificateType: 1.身份证，2护照 -->
      <section v-if="deliverParams.isDawan=='2' && deliverParams.certificateType=='1'">
        <vpInputRadio v-model="isOpenInternet" class="vpInputRadio" fontSize="0.28rem" type="checkbox" :list="opneIntenet" direction="column" />
        <div v-show="isOpenInternet.length>0">
          <vpInputRadio :radioRequired=true v-model="saveMore.roamingVoiceInfo.openCnPhone" class="vpInputRadio" :isNeedLine=true :list="inlandNum" label="" />
          <vp-cell-bus v-if="saveMore.roamingVoiceInfo.openCnPhone==='1'" :borderB="true" label="選擇内地號碼" :value="this.saveMore.roamingVoiceInfo.cnPhoneNo" @click="goSelectInlandNum(1,3)" />
          <vp-cell-bus :borderB="false" label="服務計劃" :value="choosePlanLand.serviceName?'選擇套餐':'重新選擇'" @click="goSelectBusiness" />
          <div class="business-name" v-if="choosePlanLand.serviceName">
            <div>{{ choosePlanLand.serviceName}}</div>
            <div class="last" v-if="choosePlanLand.marketingPromotion"> {{ choosePlanLand.marketingPromotion}}</div>
          </div>
          <div class="business-product" v-if="choosePlanLand.productName">
            <span>手　　機</span>
            <span class="last">{{choosePlanLand.productName}}</span>
          </div>
          <div class="business-price" v-if="totalFee>0">
            <div>
              首月月費及出機價{{totalFee | filterPrice}}
            </div>
            <div class="last" v-if="deliverParams.businessType=='1'||deliverParams.businessType=='2' ">
              回贈后月費{{choosePlanLand.monthlyFee | filterPrice}}+行政費{{choosePlanLand.administrationFee | filterPrice}}
            </div>
            <div class="last" v-if="deliverParams.businessType=='3'">
              手機上台價{{choosePlanLand.registerPrice | filterPrice}}+回贈后月費{{choosePlanLand.monthlyFee | filterPrice}}+行政費{{choosePlanLand.administrationFee | filterPrice}}
            </div>
            <div class="last" v-if="deliverParams.businessType=='4' ">
              手機上台價{{choosePlanLand.registerPrice | filterPrice}}+預繳{{choosePlanLand.prepayments | filterPrice}}+回贈后月費{{choosePlanLand.monthlyFee | filterPrice}}+行政費{{choosePlanLand.administrationFee | filterPrice}}
            </div>
          </div>
          <div class="business-discount" v-if="choosePlanLand.discounts">
            <img :src="require('@/assets/images/goodsdetai_gift@2x.png')">
            <span>{{choosePlanLand.discounts }}</span>
          </div>
        </div>
      </section>
      <!-- 新號碼上台資料 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_number@2x.png')">
          <span>新號碼上台資料</span>
        </div>
        <div class="gray-back">
          <vpInputRadio labelWidth='2.8rem' :radioRequired=true v-model="saveMore.billLang" class="vpInputRadio" :list="languageData" label="賬 單 語 言 " />
        </div>
        <div>
          <vpInputRadio labelWidth='2.8rem' :radioRequired=true v-model="saveMore.debitType" class="vpInputRadio" :list="payStyleData" label="繳 費 方 式" @on-change="changeDebitType" />
        </div>
        <div class="gray-back">
          <vpInputRadio labelWidth='2.8rem' :radioRequired=true v-model="saveMore.openIdd" class="vpInputRadio" :list="IDDData" label="開啟IDD服務" />
        </div>
        <div>
          <vpInputRadio labelWidth='2.8rem' :radioRequired=true v-show="saveMore.openIdd =='1'" v-model="saveMore.iddPayType" class="vpInputRadio" :list="IDDpayData" label="IDD付款方法" />
        </div>
        <div class="gray-back">
          <vpInputRadio labelWidth='2.8rem' :radioRequired=true v-model="saveMore.autoPay" class="vpInputRadio" :list="IDDData" label="接受服務計劃自動續約" />
        </div>
        <div>
          <vpInputRadio labelWidth='2.8rem' v-model="isAcceptSpread" class="vpInputRadio" direction="column" type="checkbox" :list="messageData1" label="接受推廣信息" />
          <vpInputRadio labelWidth='2.8rem' v-model="notAcceptSpread" class="vpInputRadio" direction="column" type="checkbox" :list="messageData2" label="　　　　　　" />
        </div>
      </section>
      <!-- 信用卡信息 -->
      <section class="card-section specail-section" v-if="saveMore.debitType == '1' || saveMore.iddPayType == '1'">
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_card@2x.png')">
          <span>信用卡信息</span>
        </div>
        <vpInputRadio v-model="saveMore.creditInfo.creditType" :radioRequired=true class="vpInputRadio" :list="bankType" label="信用卡銀行" />
        <vpInputMessage class="vpInputMessage" labelWidth='1.2rem' :maxlength=16 v-model="saveMore.creditInfo.creditCode" label="卡 　 號" placeholder="請輸入信用卡卡號" />
        <vpInputMessage class="vpInputMessage" labelWidth='1.2rem' :maxlength=4 v-model="saveMore.creditInfo.creditEffectDate" label="有 效 期" placeholder="MM / YY" />
        <vpInputMessage class="vpInputMessage" labelWidth='1.2rem' :maxlength=3 v-model="saveMore.creditInfo.creditCvv" label="C V V 2" placeholder="請輸入卡背面簽名區域最後3位數字" />
        <vpInputMessage class="vpInputMessage" labelWidth='1.2rem' v-model="saveMore.creditInfo.creditUserName" label="用戶姓名" placeholder="請輸入信用卡用戶姓名（與身份證一致）" />
      </section>
      <!-- 底部按钮 -->
      <div class="page-btns" slot="footer">
        <vp-button content="下一步，選擇優惠" @click.native="next"></vp-button>
      </div>
      <popup-picker :show="addrStoreAreaShow" :show-cell="false" :data="addrStoreArea" :columns="1" v-model="addrStoreAreaVal" @on-change="addrStoreAreaChangeHandler" @on-hide="addrStoreAreaShow = false" ref="addrStoreArea"></popup-picker>
      <popup-picker :show="addrStoreShow" :show-cell="false" :data="addrStore" :columns="1" v-model="addrStoreVal" @on-change="addrStoreChangeHandler" @on-hide="addrStoreShow = false" ref="addrStore"></popup-picker>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import {
  vpHeaderSort,
  vpButton,
  vpUpdateImg,
  vpInputRadio,
  vpInputMessage,
  vpFlowStatus,
  vpCell,
  vpCellBus,
  vpInputTextarea
} from "@/components";
import { PopupPicker } from "vux";
import setTitle from '@/mixin/setTitle.js'
import { Checker, CheckerItem } from "vux";
export default {
  name:'handleInfo',
  components: {
    vpHeaderSort,
    vpButton,
    vpUpdateImg,
    vpInputRadio,
    vpInputMessage,
    vpFlowStatus,
    vpCell,
    vpCellBus,
    PopupPicker,
    vpInputTextarea
  },
  data() {
    return {
      value: "",
      dawan: [],
      totalFee: 0,
      vasRequired: "",
      deliverParams: {}, //界面跳转传参
      deliverAddrInfoStr: "", //送货地址凭证，以字符串展示
      dawanVoiceType: 1, //选中的大湾区语音包角标
      isOpenInternet: [], //用来判断是否勾选了开通中国漫游话音
      isOpenDawan: [], //用来判断是否勾选了开通大湾区语音包
      isChinaNumbers: [], //用来判断是否勾选了申请大湾区中国多号增值服务
      isAomenNumbers: [], //用来判断是否勾选了申请大湾区澳门多号增值服务
      freeVasInfoListOrigin: [], //增值服务优惠信息，初选，为按接口格式化
      bindingVasInfoListOrigin: [], //捆绑增值服务优惠信息,初选，为按接口格式化
      hardBundleAmount: "",
      isAcceptSpread: ["1"],
      notAcceptSpread: ["1"],
      choosePlanLand: {},
      saveMore: {
        transactType: "1", //办理方式
        newIccid: "", //ICCID（手机卡背面20位数字）
        freeVasInfoList: [], //增值服务优惠信息
        bindingVasInfoList: [], //捆绑增值服务优惠信息
        deliverAddrType: "1", //送货地址方式, 1同联络地址，2重新填写送货地址
        deliverAddrInfo: {}, //送货地址信息
        deliverRemark: "", //送货备注
        takeRegion: "", //取貨區域&地區
        takeOrg: "", //取货门市
        roamingVoiceInfo: {
          //中國漫遊話音信息
          openCnPhone: "1", //是否设置内地号码,1.是，2否
          cnPhoneNo: "", //内地号码
          cnPlanCode: "", //内地服务计划Code,
          cnPlanId: "" //内地服务计划ID
        },
        dawanVoiceInfo: {
          //大湾区语音包
          dawanPackageCode: "", //分钟套餐编码
          minutes: "", //分钟数，单位分
          monthFee: "", //月费，单位分
          openDawanPhone: "2", //是否申請大灣區中國一卡多號增值服務,1是，2否
          dawanPhoneNo: "", //大灣區中國号码
          openMacaoPhone: "2", //是否申請大灣區澳門一卡多號增值服務,1是，2否
          macaoPhoneNo: "" //大灣區澳門号码
        },
        billLang: "1", //账单语言,1中文，2英文
        openIdd: "1", //是否開啟IDD服務（国际漫游）,1是，2否
        debitType: "1", //缴费方式,1信用卡自動轉賬，2其他方式
        iddPayType: "1", //IDD 付款方式,1信用卡自動轉賬，2押金。当缴费方式为1时，此字段值必须为1信用卡自动转账
        autoPay: "1", //是否自动续约,1是，2否
        acceptCMHKPromotion: "1", //是否接受中國香港移動推廣信息,1是，2否
        acceptOtherPromotion: "1", //接收非中國香港移動推廣信息,1是，2否
        creditInfo: {
          //信用卡信息
          creditType: "1", //信用卡银行类型,1VASA，2MASTER
          creditCode: "", //信用卡卡号
          creditEffectDate: "", //有效期
          creditCvv: "", //CVV2,卡背面簽名區域最後3位數字
          creditUserName: "" //信用卡用户姓名
        }
      },
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
      handleData: [],
      bankType: [
        {
          name: "VISA",
          value: "1"
        },
        {
          name: "MASTER",
          value: "2"
        }
      ],
      couponData1: [],
      couponData2: [],
      opneIntenet: [
        {
          name: "開通中國漫游話音",
          value: "1"
        }
      ],
      dawanVoice1: [
        {
          name: "開通大灣區語音包",
          value: "1"
        }
      ],
      dawanVoice2: [
        {
          name: "申請大灣區中國咭多號增值服務",
          value: "2"
        }
      ],
      dawanVoice3: [
        {
          name: "申請大灣區澳门咭多號增值服務",
          value: "3"
        }
      ],
      languageData: [
        //账单语言
        {
          name: "中文",
          value: "1"
        },
        {
          name: "英文",
          value: "2"
        }
      ],
      payStyleData: [
        {
          name: "信用卡自動轉賬",
          value: "1"
        },
        {
          name: "其他方式",
          value: "2"
        }
      ],
      IDDData: [
        {
          name: "是",
          value: "1"
        },
        {
          name: "否",
          value: "2"
        }
      ],
      IDDpayData: [
        {
          name: "信用卡自動轉賬",
          value: "1"
        }
      ],
      contractData: [
        {
          name: "接受服務計劃自動續約",
          value: "1"
        }
      ],
      messageData1: [
        {
          name: "接受中國香港移動推廣信息",
          value: "1"
        }
      ],
      messageData2: [
        {
          name: "接收非中國香港移動推廣信息",
          value: "1"
        }
      ],
      dawanData: [],
      inlandNum: [
        {
          name: "設置内地號碼",
          value: "1"
        },
        {
          name: "不設置内地號碼",
          value: "2"
        }
      ],
      deliverAddrTips: [
        {
          name: "同登記地址",
          value: "1"
        },
        {
          name: "重新填寫送貨地址",
          value: "2"
        }
      ]
    };
  },
  computed: {
    addrStoreAreaStr() {
      const obj = this.addrStoreAreaValFormat;
      return `${obj.areaTcResult || ""}${obj.districtTcResult || ""}`;
    }
  },
  created() {
    // console.error('显示头部测试')
    // this.$jb.js2webview({type: 6, header: true})
    this.$jb.webview2js(params => {
      params.type == 1 && this.$router.go(-1);
    });
    this.deliverParams = this.$route.query;
    this.setHandleType();

    this.getVasPage();
    this.getDiscountsAndVas();
  },
  activated(){
    this.setTitle()
  },
  methods: {
    goSelectBusiness() {
      //选择服务计划
      //开通内地号码和不开通内地号码选的服务计划不一样，开通内地号码需传type 为18，不开通内地号码传type19
      this.$router.push({
        name: "serviceDetail",
        query: {
          inlandPlanType:
          this.saveMore.roamingVoiceInfo.openCnPhone === "1" ? "18" : "18",
          businessType: this.deliverParams.businessType
        }
      });
    },
    //numberType: 1:内地号码;2:带机上台号码;3集客号码;4澳门号码
    //phoneType : 1,去选择中国号码，2去选择澳门号码，3 去选择内地号码
    goSelectInlandNum(numberType, phoneType) {
      let oldNumber = "";
      switch (phoneType) {
        case 1:
          oldNumber = this.saveMore.dawanVoiceInfo.dawanPhoneNo;
          break;
        case 2:
          oldNumber = this.saveMore.dawanVoiceInfo.macaoPhoneNo;
          break;
        case 3:
          oldNumber = this.saveMore.roamingVoiceInfo.cnPhoneNo;
          break;

        default:
          break;
      }
      //去选择内地号码页面
      this.$router.push({
        name: "selectInlandPhoneNumber",
        query: {
          orderId: this.deliverParams.orderId || "",
          numberType: numberType,
          phoneType: phoneType,
          oldNumber: oldNumber
        }
      });
    },
    next() {
      // this.$router.push({ name: "coupon" });
      this.perfectInfo();
    },
    goSelectAddress() {
      //重新填寫聯絡地址
      this.$router.push({ name: "addressSelect" });
    },
    deliverAddrTypeChange(val) {
      //送货地址方式切换,val=1:同登记地址，2重新填写联络地址
      this.saveMore.deliverAddrType = val;
      this.getCachAddress();
    },
    //根据入口和上台类别设置办理方式
    // 1.集客上台：
    // 工作台模式下，办理方式包含：现场开台、送货上门
    // 店铺模式下，办理方式包含：送货上门
    // 2.带机上台、新客上台、旗舰机上台：
    // 工作台模式下，办理方式包含：现场开台、送货上门、门市取货
    // 店铺模式下，办理方式包含：送货上门、门市取货
    //    handleData: [
    //   { name: "现场开台", value: "1" },
    //   { name: "送货上门", value: "2" },
    //   { name: "门市取货", value: "3" }
    // ];
    setHandleType() {
      // businessType, 1.上机上台、2集客上台、3.新客上台、4.旗舰机上台
      //this.$client.right , 权限  staging: 工作台 | store: 店铺
      if (this.deliverParams.businessType == "2") {
        //集客上台
        if (this.$client.right == "store") {
          //店铺入口
          this.handleData = [{ name: "送貨上門", value: "2" }];
          this.saveMore.transactType = "2";
        } else {
          //工作台入口
          this.handleData = [
            { name: "現場開台", value: "1" },
            { name: "送貨上門", value: "2" }
          ];
          this.saveMore.transactType = "1";
        }
      } else {
        //带机上台、新客上台、旗舰机上台
        if (this.$client.right == "store") {
          //店铺入口
          this.handleData = [
            { name: "送貨上門", value: "2" },
            { name: "門市取貨", value: "3" }
          ];
          this.saveMore.transactType = "2";
        } else {
          //工作台入口
          this.handleData = [
            { name: "現場開台", value: "1" },
            { name: "送貨上門", value: "2" },
            { name: "門市取貨", value: "3" }
          ];
          this.saveMore.transactType = "1";
        }
      }
    },
    //切换缴费方式,1.信用卡自动转账 2.其他方式
    //当缴费方式为 1 时，IDD 付款方式只能选择 信用卡自动转账
    //当缴费方式为 2 时，IDD 付款方式只能选择 押金
    changeDebitType(val) {
      if (val == "1") {
        this.IDDpayData = [{ name: "信用卡自動轉賬", value: "1" }];
        this.saveMore.iddPayType = "1";
      } else {
        this.IDDpayData = [{ name: "押金", value: "2" }];
        this.saveMore.iddPayType = "2";
      }
    },
    addressFormate(originVal) {
      //地址信息按照接口要求格式化
      let formatAddress = {
        area: originVal.areaTcResult ? originVal.areaTcResult : "",
        district: originVal.districtTcResult ? originVal.districtTcResult : "",
        streetName: originVal.streetTcResult ? originVal.streetTcResult : "",
        estateInput: originVal.estateTcResult ? originVal.estateTcResult : "",
        buildingInput: originVal.bldgTcResult ? originVal.bldgTcResult : "",
        blockInput: originVal.bldgTcNum ? originVal.bldgTcNum : "",
        blockBox: "座",
        floorInput: originVal.floor ? originVal.floor : "",
        floorBox: "樓（層）",
        flatInput: originVal.door ? originVal.door : "",
        flatBox: "室"
      };
      return formatAddress;
    },
    //根据选择送货方式获取缓存的登记地址或者缓存的重新填写送货地址
    getCachAddress() {
      if (this.saveMore.deliverAddrType == "1") {
        //同登记地址
        let address = this.$session.get("address-business");
        if (address instanceof Object && Object.keys(address).length > 0) {
          this.saveMore.deliverAddrInfo = address;
        } else {
          this.saveMore.deliverAddrInfo = {};
          this.deliverAddrInfoStr = "";
        }
      } else {
        //重新填写送货地址
        let address = this.$session.get("address-deliver");
        if (address instanceof Object && Object.keys(address).length > 0) {
          this.saveMore.deliverAddrInfo = this.addressFormate(address);
          this.deliverAddrInfoStr = Object.values(this.saveMore.deliverAddrInfo)
            .toString()
            .replace(/,/g, "");
        } else {
          this.saveMore.deliverAddrInfo = {};
          this.deliverAddrInfoStr = "";
        }
      }
    },
    //读取缓存信息
    getSession() {
      this.getCachAddress();
      //获取缓存的内地服务计划
      //  this.choosePlanLand = {
      //    administrationFee:100,
      //    discounts:'hjskfhksjksjkshhjskfhksjksjkshhjskfhksjksjkshhjskfhksjksjksh',
      //    mFeeAndPhone:100,
      //    registerPrice :100,
      //    prepayments:'1',
      //    monthlyFee:100,
      //    serviceName:'服务计划明称服务计划明称服务计划明称服务计划明称1234567',
      //    productName:'商品名称商品名称商品名称商品名称商品名称1233',
      //    marketingPromotion:'子标题子标题子标题子标题子标题子标题子标题34567765438'
      //  }

      this.choosePlanLand = this.$session.get("ChoosePlanLand");
      this.saveMore.roamingVoiceInfo.cnPlanCode = this.choosePlanLand.businessPlanCode;
      this.saveMore.roamingVoiceInfo.cnPlanId = this.choosePlanLand.businessPlanId;

      let monthlyFee = parseInt(this.choosePlanLand.monthlyFee);
      let administrationFee = parseInt(this.choosePlanLand.administrationFee);
      let registerPrice = parseInt(this.choosePlanLand.registerPrice);
      let prepayments = parseInt(this.choosePlanLand.prepayments);

      switch (this.deliverParams.businessType) {
        case "1":
        case "2":
          this.totalFee = monthlyFee + administrationFee;
          break;
        case "3":
          this.totalFee = registerPrice + monthlyFee + administrationFee;
          break;
        case "4":
          break;
          this.totalFee =
            registerPrice + prepayments + monthlyFee + administrationFee;
        default:
          break;
      }

      //获取缓存的中国号码
      this.saveMore.dawanVoiceInfo.dawanPhoneNo = this.$session.get(
        "ChinaPhone"
      );
      //获取缓存的澳门号码
      this.saveMore.dawanVoiceInfo.macaoPhoneNo = this.$session.get(
        "aomenPhone"
      );
      //获取缓存的内地号码
      this.saveMore.roamingVoiceInfo.cnPhoneNo = this.$session.get(
        "inlandPhone"
      );
    },
    async searchStoreArea() {
      //搜索门店区域
      let arr = [];
      if (this.addrStoreArea.length) return (this.addrStoreAreaShow = true); //已经请求过了
      const res = await this.$post("address/searchShopArea");
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
      const [area, districts] = [
        res.dataInfo.areas.area,
        res.dataInfo.districts.district
      ];
      //格式化成组件需要的格式
      for (const item of area) {
        arr.push({
          value: item.areaId,
          name: item.areaNameTc,
          name_en: item.areaNameEn,
          name_sc: item.areaNameSc
        });
      }
      for (const item of districts) {
        arr.push({
          parent: item.areaId,
          value: item.districtId,
          name: item.districtNameTc,
          name_en: item.districtNameEn,
          name_sc: item.districtNameSc
        });
      }
      this.addrStoreArea = arr;
      this.addrStoreAreaShow = true;
    },
    async searchStore() {
      //搜索门店
      let arr = [];
      const req = {
        word: "_",
        districtId: this.addrStoreAreaValFormat.districtId,
        pageNumber: 1,
        pageSize: 100
      };
      if (!req.districtId) return this.$vux.toast.text("請選擇區域&地區");
      const res = await this.$post("address/searchShop", req);
      if (res.returnCode != 1000) return this.$vux.toast.text(res.message);
      const addr = res.records;
      //格式化成组件需要的格式
      for (const item of addr) {
        arr.push({
          value: JSON.stringify(item),
          name: item.addressTc + item.addressHintTc
        });
      }
      this.addrStore = arr;
      this.addrStoreShow = true;
    },
    async getVasPage() {
      //获取大湾区语音包，当服务计划为大湾区类型时，才能获取大湾区语音包  this.deliverParams.isDawan : 1 是大湾区，2 非大湾区
      if (this.deliverParams.isDawan == "2") {
        return;
      }
      let params = {
        type: "2"
      };
      const res = await this.$post("business/vasPage", params);
      if (res && res.returnCode == 1000) {
        let records = res.records;
        if (records && records.length > 0) {
          records.forEach((item, index) => {
            this.dawanData.push({
              vasCode: item.vasCode,
              callMinutes: item.callMinutes,
              vasFee: item.vasFee,
              value: index + 1,
              name: item.vasName
            });
          });
          //默认选中第一个大湾区语音包
          this.dawanVoiceType = 1;
          this.saveMore.dawanVoiceInfo.dawanPackageCode = this.dawanData[0].vasCode;
          this.saveMore.dawanVoiceInfo.minutes = this.dawanData[0].callMinutes;
          this.saveMore.dawanVoiceInfo.monthFee = this.dawanData[0].vasFee;
        }
      }
    },
    async getDiscountsAndVas() {
      debugger
      //根据服务计划id，获取增值服务优惠
      let params = {
        id: this.deliverParams.businessPlanId
      };
      const res = await this.$post("business/getDiscountsAndVas", params);
      if (res && res.returnCode == 1000) {
        //根据服务计划里的合约期取数据，目前合约期只有 12个月和24个月
        let month = this.deliverParams.contractPeriod;
        let vasDataLv1List = res.dataInfo.vasDataLv1List;

        let temp = vasDataLv1List.filter(item => item.months === month);
        let dataLv2List = temp[0].dataLv2List;
        //捆绑类型bundleType(1:basic 2:hard bundle),捆绑类型:dataLv2List[index].bundleType
        //当hardBundleAmount 不为null时 ，捆绑类型 bundleType==2 的数据多选后，月费（vasFee）之和需满足 大于等于hardBundleAmount条件
        //只有旗舰机上台才需判断hardBundleAmount，其他三种，带机上台、新客上台、集客上台都忽略
        if (this.deliverParams.businessType == "4") {
          //旗舰机上台
          this.hardBundleAmount = temp[0].hardBundleAmount;
        }
        //vasRequired 用来判断该vas 列表是否必选其一 ，vasRequired=1：是，vasRequired=2 否
        this.vasRequired = temp[0].vasRequired;
        //item.required 属性定义该条数据是否必选，item.required=1 是，  item.required=2 否
        //格式化 bundleType ==1 的数据
        let hardBundle1 = dataLv2List.filter(item => item.bundleType == "1");
        let arr1 = [];

        hardBundle1.forEach((item, index) => {
          arr1.push({
            value: index + "",
            name: item.vasName,
            vasCode: item.vasCode,
            vasFee: item.vasFee,
            disabled: item.required == "1" ? true : false
          });

          if (item.required == "1") {
            this.freeVasInfoListOrigin.push(index + "");
          }
        });

        this.couponData1 = arr1;
        //格式化 bundleType ==2 的数据
        let hardBundle2 = dataLv2List.filter(item => item.bundleType == "2");
        let arr2 = [];
        hardBundle2.forEach((item, index) => {
          arr2.push({
            value: index + "",
            name: item.vasName,
            vasCode: item.vasCode,
            vasFee: item.vasFee,
            disabled: item.required == "1" ? true : false
          });
          if (item.required == "1") {
            this.bindingVasInfoListOrigin.push(index + "");
          }
        });
        this.couponData2 = arr2;
      }
    },
    verifyAddress(addressInfo) {
      //验证地址信息是否有误
      const verify = {
        area: "請選擇送貨地址區域",
        district: "請選擇送貨地址地區",
        // streetName: "請輸入送貨地址街道名稱",
        // estateInput: "請輸入送貨地址屋苑名稱",
        // buildingInput: "請輸入送貨地址大廈名稱",
        // blockInput: "請輸入送貨地址大廈座數",
        floorInput: "請輸入送貨地址層數/樓",
        flatInput: "請輸入送貨地址室/單位"
      };
      for (const key in verify) {
        if (verify.hasOwnProperty(key)) {
          const element = verify[key];
          if (!addressInfo[key]) {
            this.$vux.toast.text(element);
            return false;
          }
        }
      }
      return true;
    },
    async perfectInfo() {
      //完善上台资料信息
      if (this.saveMore.transactType == "1") {
        //现场开台
        if (!this.saveMore.newIccid) return this.$vux.toast.text("請輸入ICCID");
      } else if (this.saveMore.transactType == "2") {
        //送货上门
        let a = this.verifyAddress(this.saveMore.deliverAddrInfo);
        if (!a) return;
      } else {
        //门市取货
        if (!this.saveMore.takeRegion)
          return this.$vux.toast.text("請選擇取貨門市區域&地區");
        if (!this.saveMore.takeOrg)
          return this.$vux.toast.text("請選擇取貨門市");
      }

      //vasRequired 用来判断该vas 列表是否必选其一 ，vasRequired=1：是，vasRequired=2 否
      if (this.vasRequired == "1") {
        if (
          this.saveMore.freeVasInfoList.length == 0 &&
          this.saveMore.bindingVasInfoList.length == 0
        ) {
          return this.$vux.toast.text("增值服務優惠至少需要選一個");
        }
      }

      //当hardBundleAmount 不为null时 ，捆绑类型 bundleType==2 的数据多选后，月费（vasFee）之和需满足 大于等于hardBundleAmount条件
      //只有旗舰机上台才需判断hardBundleAmount，其他三种，带机上台、新客上台、集客上台都忽略
      if (this.hardBundleAmount && this.deliverParams.businessType == "4") {
        let bindToalFee = 0;
        this.bindingVasInfoListOrigin.forEach(element => {
          bindToalFee += parseInt(element.vasFee);
        });

        if (bindToalFee < parseInt(this.hardBundleAmount)) {
          return this.$vux.toast.text(
            "不能小於hardBundleAmount=" + this.hardBundleAmount
          );
        }
      }

      if (
        this.deliverParams.isDawan == "1" &&
        this.isOpenDawan.length > 0 //是否勾选开通大湾区语音包
      ) {
        //服务计划为大湾区语音包
        if (!this.saveMore.dawanVoiceInfo.dawanPackageCode) {
          return this.$vux.toast.text("請先選擇大灣區語音包");
        }
        if (this.saveMore.dawanVoiceInfo.openDawanPhone == "1") {
          if (!this.saveMore.dawanVoiceInfo.dawanPhoneNo) {
            return this.$vux.toast.text("請先選擇大灣區中國號碼");
          }
        }
        if (this.saveMore.dawanVoiceInfo.openMacaoPhone == "1") {
          if (!this.saveMore.dawanVoiceInfo.macaoPhoneNo) {
            return this.$vux.toast.text("請先選擇大灣區澳門號碼");
          }
        }
      }
      // <!-- 仅当上台证件类型为身份证且服务计划为基本服务计划（非大湾区服务计划 isDawan==1:属于大湾区服务计划，isDawan==2:基本服务计划 ）时可选择开通中国漫游话音，否则不显示当前模块.certificateType: 1.身份证，2护照 -->
      if (
        this.deliverParams.isDawan == "2" &&
        this.deliverParams.certificateType == "1" &&
        this.isOpenInternet.length > 0 //是否勾选开通中国漫游话音
      ) {
        if (this.saveMore.roamingVoiceInfo.openCnPhone == "1") {
          if (!this.saveMore.roamingVoiceInfo.cnPhoneNo) {
            return this.$vux.toast.text("請先選擇内地號碼");
          }
        }

        if (!this.saveMore.roamingVoiceInfo.cnPlanCode) {
          return this.$vux.toast.text("請先選擇内地服務計劃");
        }
      }

      if (this.saveMore.debitType == "1" || this.saveMore.iddPayType == "1") {
        //若付款方式为信用卡自动转账
        if (!this.saveMore.creditInfo.creditCode)
          return this.$vux.toast.text("請輸入信用卡卡號");
        if (!this.saveMore.creditInfo.creditEffectDate)
          return this.$vux.toast.text("請輸入信用卡有效期");
        if (!this.saveMore.creditInfo.creditCvv)
          return this.$vux.toast.text(
            "請輸入信用卡CVV2，背面簽名區域最後3位數字"
          );
        if (!this.saveMore.creditInfo.creditUserName)
          return this.$vux.toast.text("請輸入信用卡用戶姓名");
      }

      let params = {};
      params.id = this.deliverParams.orderId;
      params.transactType = this.saveMore.transactType;
      if (this.saveMore.transactType == "1") {
        //现场开台
        params.newIccid = this.saveMore.newIccid;
      } else if (this.saveMore.transactType == "2") {
        //送货上门
        params.deliverAddrType = this.saveMore.deliverAddrType;
        params.deliverRemark = this.saveMore.deliverRemark;
        params.deliverAddrInfo = this.saveMore.deliverAddrInfo;
      } else {
        //门市取货
        params.takeRegion = this.saveMore.takeRegion;
        params.takeOrg = this.saveMore.takeOrg;
      }
      params.freeVasInfoList = this.saveMore.freeVasInfoList;
      params.bindingVasInfoList = this.saveMore.bindingVasInfoList;

      if (
        this.deliverParams.isDawan == "1" &&
        this.isOpenDawan.length > 0 //是否勾选开通大湾区语音包
      ) {
        //服务计划为大湾区语音包
        params.dawanVoiceInfo = this.saveMore.dawanVoiceInfo;
      }
      // <!-- 仅当上台证件类型为身份证且服务计划为基本服务计划（非大湾区服务计划 isDawan==1:属于大湾区服务计划，isDawan==2:基本服务计划 ）时可选择开通中国漫游话音，否则不显示当前模块.certificateType: 1.身份证，2护照 -->
      if (
        this.deliverParams.isDawan == "2" &&
        this.deliverParams.certificateType == "1" &&
        this.isOpenInternet.length > 0 //是否勾选开通中国漫游话音
      ) {
        params.roamingVoiceInfo = this.saveMore.roamingVoiceInfo;
      }

      params.billLang = this.saveMore.billLang;
      params.openIdd = this.saveMore.openIdd;
      params.debitType = this.saveMore.debitType;
      params.iddPayType = this.saveMore.iddPayType;
      params.autoPay = this.saveMore.autoPay;
      params.acceptCMHKPromotion = this.saveMore.acceptCMHKPromotion;
      params.acceptOtherPromotion = this.saveMore.acceptOtherPromotion;
      if (this.saveMore.debitType == "1" || this.saveMore.iddPayType == "1") {
        params.creditInfo = this.saveMore.creditInfo;
      }

      Object.assign(params, {
        userId: this.$client.userid
      });
      console.log("saveMore.params=", JSON.stringify(params));
      const res = await this.$post("business/saveMore", params);
      if (res && res.returnCode == 1000) {
        let discountInfoList = res.dataInfo.discountInfoList;
        debugger
        this.$session.set("discountInfoList", discountInfoList);
        this.$router.push({
          name: "coupon",
          query: {
            orderId: this.deliverParams.orderId || ""
          }
        });
      }
    },

    addrStoreAreaChangeHandler(val) {
      //选择门店区域关闭弹窗回调
      const names =
        this.$refs.addrStoreArea && this.$refs.addrStoreArea.getNameValues();
      const nameArr = names.split(" ");
      this.addrStoreAreaValFormat = {
        areaTcResult: nameArr[0],
        areaId: val[0],
        districtTcResult: nameArr[1],
        districtId: val[1]
      };
      this.saveMore.takeRegion = `${this.addrStoreAreaValFormat.areaTcResult ||
        ""}${this.addrStoreAreaValFormat.districtTcResult || ""}`;
    },
    addrStoreChangeHandler(val) {
      //选择门店关闭弹窗回调
      const value = JSON.parse(val[0]);
      this.addrStoreValFormat = {
        id: value.id, //店铺id
        districtId: value.districtId, // 店铺区域id
        businessHourSc: value.businessHourSc.replace(/<br \/>/g, ""), //营业时间
        businessHourTc: value.businessHourTc.replace(/<br \/>/g, ""),
        businessHourEn: value.businessHourEn.replace(/<br \/>/g, ""),
        storeNameSc: value.addressSc, //店铺名称
        storeNameTc: value.addressTc,
        storeNameEn: value.addressEn,
        storeHintSc: value.addressHintSc, //店铺提示
        storeHintTc: value.addressHintTc,
        storeHintEn: value.addressHintEn
      };
      this.saveMore.takeOrg =
        this.addrStoreValFormat.storeNameTc +
        this.addrStoreValFormat.storeHintTc;
    }
  },
  watch: {
    freeVasInfoListOrigin(val) {
      //增值服務地址被選擇
      //按接口入參需要格式化數據
      let length = this.saveMore.freeVasInfoList.length;
      this.saveMore.freeVasInfoList.splice(0, length); //清空数组
      if (val instanceof Array && val.length > 0) {
        for (const item in val) {
          let temp = this.couponData1[item];

          this.saveMore.freeVasInfoList.push({
            vasCode: temp.vasCode,
            vasName: temp.name,
            vasAmount: temp.vasFee
          });
        }
      }
    },
    bindingVasInfoListOrigin(val) {
      //捆綁增值服務地址被選擇
      //按接口入參需要格式化數據
      let length = this.saveMore.bindingVasInfoList.length;
      this.saveMore.bindingVasInfoList.splice(0, length); //清空数组
      if (val instanceof Array && val.length > 0) {
        for (const item in val) {
          let temp = this.couponData2[item];
          this.saveMore.bindingVasInfoList.push({
            vasCode: temp.vasCode,
            vasName: temp.name,
            vasAmount: temp.vasFee
          });
        }
      }
    },
    dawanVoiceType(val) {
      //选中某个大湾区语音包
      this.saveMore.dawanVoiceInfo.dawanPackageCode = this.dawanData[
        val - 1
      ].vasCode;
      this.saveMore.dawanVoiceInfo.minutes = this.dawanData[
        val - 1
      ].callMinutes;
      this.saveMore.dawanVoiceInfo.monthFee = this.dawanData[val - 1].vasFee;
    },
    isOpenInternet(val) {
      if (val.length > 0) {
        //开通中国漫游话音
      } else {
        //不开通中国漫游话音
        // this.saveMore.roamingVoiceInfo.openCnPhone = "1";
        // this.saveMore.roamingVoiceInfo.cnPhoneNo = "";
        // this.saveMore.roamingVoiceInfo.cnPlanCode = "";
        // this.saveMore.roamingVoiceInfo.cnPlanId = "";
      }
    },
    isOpenDawan(val) {
      if (val.length > 0) {
        //开通大湾区语音包
        //默认选中第一个大湾区语音包
        this.dawanVoiceType = 1;
        this.saveMore.dawanVoiceInfo.dawanPackageCode = this.dawanData[0].vasCode;
        this.saveMore.dawanVoiceInfo.minutes = this.dawanData[0].callMinutes;
        this.saveMore.dawanVoiceInfo.monthFee = this.dawanData[0].vasFee;
      } else {
        //不开通大湾区语音包
        // this.saveMore.dawanVoiceInfo.dawanPackageCode = "";
        // this.saveMore.dawanVoiceInfo.minutes = "";
        // this.saveMore.dawanVoiceInfo.monthFee = "";
        // this.saveMore.dawanVoiceInfo.openDawanPhone = "2";
        // this.isChinaNumbers = [];
        // this.saveMore.dawanVoiceInfo.dawanPhoneNo = "";
        // this.saveMore.dawanVoiceInfo.openMacaoPhone = "2";
        // this.isAomenNumbers = [];
        // this.saveMore.dawanVoiceInfo.macaoPhoneNo = "";
      }
    },
    isChinaNumbers(val) {
      if (val.length > 0) {
        //申请大湾区中国多号增值服务
        this.saveMore.dawanVoiceInfo.openDawanPhone = "1";
      } else {
        //不申请大湾区中国多号增值服务
        this.saveMore.dawanVoiceInfo.openDawanPhone = "2";
      }
    },
    isAomenNumbers(val) {
      if (val.length > 0) {
        //申请大湾区澳门多号增值服务
        this.saveMore.dawanVoiceInfo.openMacaoPhone = "1";
      } else {
        //不申请大湾区澳门多号增值服务
        this.saveMore.dawanVoiceInfo.openMacaoPhone = "2";
      }
    },
    isAcceptSpread(val) {
      if (val.length > 0) {
        this.saveMore.acceptCMHKPromotion = "1";
      } else {
        this.saveMore.acceptCMHKPromotion = "2";
        this.notAcceptSpread = [];
      }
    },
    notAcceptSpread(val) {
      if (val.length > 0) {
        this.saveMore.acceptOtherPromotion = "1";
        this.isAcceptSpread = ["1"];
      } else {
        this.saveMore.acceptOtherPromotion = "2";
      }
    }
  },
  activated() {
    //keep-alive 组件激活时调用
    this.getSession();
  },
  deactivated() {
    // keep-alive 组件停用时调用
  },
  beforeRouteLeave(to, from, next) {
    let path = to.path;
    if (path == "/business/handleBase/baseInfo") {
      this.$emit("calculatePage");
    }
    next(true);
  }
};
</script>

<style lang = 'less' scoped>
section {
  margin-top: 0.22rem;
  background: white;
}
.specail-section {
  padding-bottom: 0.2rem;
}
.business-cell-style {
  padding: 0 @page-space;
  margin: 0.02rem 0;
}

.panel-store-get {
  .logistics-tips {
    display: flex;
    padding: 0.1rem 0.24rem;
    .icon-tips {
      width: 0.22rem;
      height: 0.22rem;
      margin: 0.04rem 0.08rem 0 0;
      background: url("~@/assets/images/all_notice@2x.png") 0 center no-repeat;
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

.business-name {
  font-size: 0.26rem;
  color: #333333;
  background: #fffafb;
  padding: 0.2rem @page-space 0.2rem 0.8rem;
  /* font-weight: bold; */
  .last {
    color: #666666;
    font-weight: normal;
    padding-top: 0.1rem;
  }
}

.business-product {
  display: flex;
  justify-content: space-between;
  font-size: 0.26rem;
  color: #666666;
  padding: 0.2rem @page-space 0.2rem 0rem;
  margin-left: 0.8rem;
  border-bottom: 1px solid #e9e9e9;
  .last {
    color: #333333;
  }
}

.business-price {
  padding: 0.1rem @page-space 0.1rem 0rem;
  margin-left: 0.8rem;
  font-size: 0.24rem;
  color: #666666;
  border-bottom: 1px solid #e9e9e9;
  .last {
    color: #888888;
  }
  div {
    padding-top: 0.1rem;
  }
}

.business-discount {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.24rem;
  color: #ffa008;
  padding: 0.1rem @page-space 0.1rem 0.8rem;
  img {
    width: 0.26rem;
    height: 0.26rem;
    margin-top: 0.03rem;
  }
  span {
    padding-left: 0.1rem;
  }
}

.store-web-textarea {
  padding: 0 @page-space;
}

.card-section {
  margin-bottom: 0.4rem;
}
.flow-message {
  width: 100%;
}
.vpInputRadio {
  padding: 0 @page-space;
}
.vpInputMessage {
  padding: 0 @page-space;
}
.button {
  background: #e52c79;
  height: 0.9rem;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.gray-back {
  background: #fbfbfb;
}
.base-info-tip {
  font-size: 0.24rem;
  color: #666666;
  background: #fffafb;
  padding: 0.1rem 0.3rem;
}
</style>
