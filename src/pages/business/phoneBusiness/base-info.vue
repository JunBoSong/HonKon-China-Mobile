<template>
  <div class="base-info">
    <vp-layout-page>
      <vpFlowStatus :page='0'></vpFlowStatus>
      <!-- 基础业务信息选择 -->
      <section>
        <vp-cell class="business-cell-style" label="電話號碼" :title="phoneInfo.phoneNo" :value="`${phoneInfo.phoneNo?'重新選擇':'選擇電話號碼'}`" @click="goSelectPhoneNumber" />
        <vp-cell class="business-cell-style" label="服務計畫" :title="choosePlan.serviceName" :value="`${choosePlan.serviceName?'重新選擇':'選擇服務計劃'}`" @click="goSelectBusiness" />
        <div class="base-info-tip" v-if="totalFee>0">
          <div>首月月費及出機價{{totalFee | filterPrice}}</div>
          <div class="last" v-if="choosePlan.marketingPromotion"> {{ choosePlan.marketingPromotion}}</div>
        </div>
        <div class="business-product" v-if="choosePlan.productName">
          <span>手　　機</span>
          <span class="last">{{choosePlan.productName}}</span>
        </div>
        <div class="business-price" v-if="totalFee>0">
          <div class="last" v-if="deliverParams.businessType=='1'||deliverParams.businessType=='2' ">
            回贈后月費{{choosePlan.monthlyFee | filterPrice}}+行政費{{choosePlan.administrationFee | filterPrice}}
          </div>
          <div class="last" v-if="deliverParams.businessType=='3'">
            手機上台價{{choosePlan.registerPrice | filterPrice}}+回贈后月費{{choosePlan.monthlyFee | filterPrice}}+行政費{{choosePlan.administrationFee | filterPrice}}
          </div>
          <div class="last" v-if="deliverParams.businessType=='4' ">
            手機上台價{{choosePlan.registerPrice | filterPrice}}+預繳{{choosePlan.prepayments | filterPrice}}+回贈后月費{{choosePlan.monthlyFee | filterPrice}}+行政費{{choosePlan.administrationFee | filterPrice}}
          </div>
        </div>
        <div class="business-discount" v-if="choosePlan.discounts">
          <img :src="require('@/assets/images/goodsdetai_gift@2x.png')">
          <span>{{choosePlan.discounts }}</span>
        </div>
        <vpFlowMessage class="flow-message" message="CMHK儲值卡客戶如要保留號碼上台，請選擇預付轉后付。" />
      </section>
      <!-- 个人资料 -->
      <section class="specail-section">
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_ personal@3x.png')">
          <span>個人資料</span>
        </div>
        <div class="papers">
          <vpInputRadio v-model="customerInfo.certificateType" :radioRequired=true class="vpInputRadio" :isNeedLine=true :list="document" label="證件類型　" />
        </div>
        <div class="baseInput">
          <vpInputMessage  class="vpInputMessage" v-if="deliverParams.businessType==='2'" v-model="customerInfo.companyName" label="公司名称　" placeholder="請輸入公司名称" />
          <vpInputMessage class="vpInputMessage" v-model="customerInfo.lastName" label="姓　　氏　" placeholder="請輸入姓氏" />
          <vpInputMessage class="vpInputMessage" v-model="customerInfo.ccCode" labelWidth='1.4rem' label="CC CODE" placeholder="請輸入CC CODE" />
          <vpInputMessage class="vpInputMessage" v-model="customerInfo.firstName" label="名　　字　" placeholder="請輸入名字" />
          <vpInputRadio class="vpInputRadio" :radioRequired=true v-model="customerInfo.gender" :isNeedLine=true :list="sexData" label="性　　别 　" />
          <vpInputMessage class="vpInputMessage" :value="bornDay" @click.native="showDateTimePlugin" label="出生日期　" type='number' icon="date" placeholder="請選擇出生日期" :readonly=true />
          <div class="business-certificate " v-show="customerInfo.certificateType==='1'">
            <span class="label">身份證號碼</span>
            <div class="vux-1px-b">
              <input type="text" v-model="certificateCode1" placeholder="請輸入身份證號" class="first" maxlength="7" v-keyBoard>
              <span>(</span>
              <input type="text" v-model="certificateCode2" class="second" maxlength="1" v-keyBoard/>
              <span>)</span>
            </div>
          </div>
          <vpInputMessage class="vpInputMessage" v-show="customerInfo.certificateType==='2'" v-model="passPort" :maxlength=10 label="護照ID　　" placeholder="請輸入证件號碼" />
          <vpInputMessage class="vpInputMessage" v-model="customerInfo.contactNumber" label="電話號碼　" type='number' placeholder="請輸入聯絡電話號碼" />
          <vpInputMessage class="vpInputMessage" v-model="customerInfo.email" label="電郵地址　" placeholder="請輸入電郵地址" />
          <div class="email-tips">(電郵用於發送電子合約，請務必填寫正確。若未填寫電郵，將接受不到電子合約。)</div>
        </div>
        <vpUpdateImg message="上傳證件副本" v-model="certificateObj" />
        <vpUpdateImg v-if="deliverParams.businessType==='2'" message="上傳員工證明副本" v-model="employeeObj" />
      </section>
      <!-- 上台登记住处 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_address_work_adress@3x.png')">
          <span>上台登記住處</span>
        </div>
        <vpInputAddress v-model="loginAddress" />
      </section>
      <!-- 上傳上台登記地址證明 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_proof@3x.png')">
          <span>上傳上台登記地址證明</span>
        </div>
        <vpInputRadio :radioRequired=true v-model="proveType" class="vpInputRadio" :list="proofData" direction="column" @on-change="``" />
        <div v-if="proveType==='1'">
          <vpUpdateImg message="上傳地址證明" v-model="addrProveObj" />
          <div class="address-upload-tips">
            請提供最近三個月內發出的地址證明文件+恕不接受電子帳單
          </div>
        </div>
      </section>
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_address_work_adress@3x.png')">
          <span>聯絡地址</span>
        </div>
        <div>
          <vpInputRadio :radioRequired=true class="vpInputRadio" v-model="contactAddressType" :list="contactAddressChoise" label="" @on-change="choiseContactAddressWay" />
        </div>
        <div>
          <vp-input-message placeholder="請填寫聯絡地址" v-if="contactAddressType=='2'" :value="contactAddressInfoStr" label-width="0rem" icon="editor" :readonly="true" @click.native="goSelectAddress" />
          <div class="line-input" v-if="contactAddressType=='1'" ></div>
        </div>
      </section>
      <!-- <div class="page-btns" slot="footer"> -->
      <vp-button content="下一步，完善上台资料" @click.native="next" slot="footer"> </vp-button>
      <!-- </div> -->
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import {
  vpHeaderSort,
  vpLiGoods,
  vpButton,
  vpCell,
  vpFlowMessage,
  vpInputMessage,
  vpUpdateImg,
  vpInputRadio,
  vpInputAddress,
  vpFlowStatus
} from "@/components";
import { XInput, Group, Calendar } from "vux";
import getDate from "@/utils/time";
export default {
  components: {
    vpHeaderSort,
    vpLiGoods,
    vpButton,
    vpCell,
    vpFlowMessage,
    vpInputMessage,
    vpUpdateImg,
    vpInputRadio,
    vpInputAddress,
    XInput,
    Group,
    Calendar,
    vpFlowStatus
  },
  data() {
    return {
      certificateObj: {}, //证件副本图片文件信息
      employeeObj: {}, //员工证明图片文件信息
      addrProveObj: {}, //上台地址证明图片文件信息
      value: "",
      test: "2",
      passPort: "", //護照
      certificateCodeStr: "",
      certificateCode1: "", //身份证前7位
      certificateCode2: "", //身份证号码最后一位
      deliverParams: {},
      bornDay: "",
      totalFee: 0,
      sexData: [
        {
          name: "先生",
          value: "1"
        },
        {
          name: "女士",
          value: "2"
        }
      ],
      contactAddressChoise: [
        {
          name: "同登記地址",
          value: "1"
        },
        {
          name: "重新填寫聯絡地址",
          value: "2"
        }
      ],
      document: [
        {
          name: "身份證",
          value: "1"
        },
        {
          name: "護照（需交$1000押金）",
          value: "2"
        }
      ],
      proofData: [
        {
          name: "已有地址證明，即時上載",
          value: "1"
        },
        {
          name: "已有地址證明，七天內將地址證明帶到門市",
          value: "2"
        },
        {
          name:
            "沒有地址證明，由CMHK發送信件到您的地址，七天內攜帶該信到門市",
          value: "3"
        }
      ],
      id: "", //上台业务订单ID
      phoneInfo: {}, //选择号码相关的信息
      servicePlan: {}, //服务计划相关信息
      choosePlan: {},
      customerInfo: {
        //客户信息
        companyName: "微品", //公司名称，集客上台时必传
        lastName: "宋", //姓氏
        ccCode: "8888", // 姓氏 CC Code,一个中文字=4位数字的CC CODE。多个字（复姓）用英文的逗号隔开
        firstName: "俊波", //名字
        gender: "1", // 性别，1男，2 女，3未知
        birthday: "", //出生日期，YYYYMMDD
        certificateType: "1", //證件類型,1身份证，2護照
        certificateCode: "", //证件号码，
        contactNumber: "92070279", //聯絡電話號碼
        email: "123345566@email.com", //電郵地址
        addressInfo: {} //上台登记地址
      },
      certificateAttach: "", //证件副本，url路径
      employeeAttach: "", //员工证明副本，url路径，集客上台时必填
      contactAddressType: "1", //联络地址填写方式（1同登记地址，2重新填写登记地址）
      contactAddressInfo: {}, //联络地址
      contactAddressInfoStr: "", //联络地址拼接，以字符串展示
      proveType: "1", //上台登记地址方式
      addrProveAttach: "", //上台登记地址证明，url 路径
      loginAddress: {} //登记上台地址
    };
  },
  created() {
    this.deliverParams = this.$route.query;
    if (this.$client.right == 'store') this.setShare();
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    this.initJB();
    // console.error('隐藏头部测试')
    // this.$jb.js2webview({type: 6, header: false})
    this.setTitle();
    //如果是businessType == 3 或者 businessType==4 ,不需要重新获取 orderId，会在链接上带过来
    if (!this.deliverParams.orderId) {
      this.registerOrderInfo();
    }
  },
  methods: {
    initJB() {
      this.$jb.webview2js(params => {
        if (params.type == 1) {
          if (this.$route.path === this.$session.get("beginPath")) {
            this.$jb.js2webview({ type: 2 });
          } else {
            this.$router.go(-1);
          }
        }
      });
    },
    onScroll() {
      console.log(1)
    },
    setShare() {
      //工作台的带机上台和集客上台完善上台資料有分享
      if (
        this.$client.right == "staging" &&
        (this.deliverParams.businessType == 1 ||
          this.deliverParams.businessType == 2)
      ) {
        const req = {
          type: 1,
          isShare: 1,
          shareTitle:
            this.deliverParams.businessType == 1 ? "帶機上台" : "集團客戶上台",
          shareDesc: "完善上台資料",
          shareImg: "",
          shareLink: location.href
            .replace("staging", "store")
            .replace(/ios|android/gi, "h5") //分享出去都是店铺权限
        };
        this.$jb.js2webview(req);
      }
    },
    setTitle() {
      let title = "帶機上台";
      switch (this.deliverParams.businessType) {
        case "1":
          title = "帶機上台";
          break;
        case "2":
          title = "集團客戶上台";
          break;
        case "3":
          title = "买机上台 買機上台";
          break;
        case "4":
          title = "旗艦機上台";
          break;
        default:
          break;
      }
      const req = { type: 5, title: title };
      this.$jb.js2webview(req);
    },
    goSelectPhoneNumber() {
      //选择号码
      this.$router.push({
        name: "selectPhoneNumber",
        query: {
          orderId: this.deliverParams.orderId || "",
          number: this.phoneInfo.phoneNo || "",
          businessType: this.deliverParams.businessType || ""
        }
      });
    },
    goSelectBusiness() {
      //选择服务计划
      //传参 reChoice 用于下级页面判断是否是重新选择
      if (
        this.deliverParams.businessType == "1" ||
        this.deliverParams.businessType == "2"
      ) {
        this.$router.push({
          name: "serviceList",
          query: {
            businessType: this.deliverParams.businessType || "",
            reChoice: true
          }
        });
      }

      if (
        this.deliverParams.businessType == "3" ||
        this.deliverParams.businessType == "4"
      ) {
        this.$router.push({
          name: "serviceChoice",
          query: {
            businessType: this.deliverParams.businessType || "",
            reChoice: true
          }
        });
      }
    },
    choiseContactAddressWay(val) {
      //选择联络地址方式
      if (val == "1") {
        //同登记地址

        this.contactAddressInfo = this.customerInfo.addressInfo;
      } else {
        //重新填写联络地址
        this.contactAddressInfo = {};
        this.contactAddressInfoStr = "";
      }
    },
    goSelectAddress() {
      //重新填寫聯絡地址
      this.$router.push({ name: "addressSelect" });
    },
    next() {
      //缓存上台登记地址
      console.log(this.customerInfo.addressInfo)
      let address = '' // 
      for (let key in this.customerInfo.addressInfo) {
        if (this.customerInfo.addressInfo[key] && this.customerInfo.addressInfo !== '') {
          address += this.customerInfo.addressInfo[key]
        }
      }
      console.log(this.loginAddress)
      debugger
      this.$session.set("address-business", this.customerInfo.addressInfo);
      this.isHkidValid();
      // this.$router.push({
      //   name: "handleInfo",
      //   query: { ...this.deliverParams }
      // });
    },
    verifyAddress(addressInfo, type) {
      //验证地址信息是否有误
      let tip = type == "loginAddress" ? "上台登记住处" : "联络地址";
      //街道名称和屋苑名称只能二选一且都是非必填
      debugger
      // if (addressInfo.streetName && addressInfo.estateInput) {
      //   this.$vux.toast.text('街道名称和屋苑名称只能二选一');
      //   return false;
      // }
      let address = ''
      for (let key in addressInfo) {
        if (addressInfo.hasOwnProperty(key)) {
          console.log(key, addressInfo[key])
          address = address + addressInfo[key]
        }
      }
      if (address.length > 40) {
        this.$vux.toast.text(tip + '地址过长');
        return false
      }
      const verify = {
        area: "請選擇" + tip + "區域",
        district: "請選擇" + tip + "地區",
        streetName: "請輸入" + tip + "街道名稱",
        // estateInput: "請輸入" + tip + "屋苑名稱",
        // buildingInput: "請輸入" + tip + "大廈名稱",
        // blockInput: "請輸入" + tip + "大廈座數",
        floorInput: "請輸入" + tip + "層數/樓",
        flatInput: "請輸入" + tip + "室/單位"
      };

      for (const key in verify) {
        if (verify.hasOwnProperty(key)) {
          const element = verify[key];
          if (!addressInfo[key] || addressInfo[key] == '') {
            this.$vux.toast.text(element);
            return false;
          }
        }
      }
      if ((addressInfo.estateInput == '' && addressInfo.estateInput == null) && (addressInfo.buildingInput == '' && addressInfo.buildingInput == null) ) {
        this.$vux.toast.text('請填寫屋院或大廈');
        return false
      }
      return true;
    },
    async registerOrderInfo() {
      //上台业务单初始化
      let params = {};

      Object.assign(params, {
        businessType: this.deliverParams.businessType,
        userId: this.$client.userid
      });
      if (this.$session.get('order')) return this.deliverParams.orderId = this.$session.get('order')
      const res = await this.$post("business/init", params);
      if (res && res.returnCode == 1000) {
        this.deliverParams.orderId = res.dataInfo.orderId;
        this.$session.set('order', res.dataInfo.orderId)
      }
      
    },
    async isHkidValid() {
      //身份证及護照ID 验证
      let tip = "";
      if (this.customerInfo.certificateType == "1") {
        //身份证
        this.customerInfo.certificateCode = this.certificateCodeStr;
        tip = "請先输入身份证号码";
      }
      if (this.customerInfo.certificateType == "2") {
        //護照
        this.customerInfo.certificateCode = this.passPort;
        tip = "請先输入護照证件号码";
      }

      let params = {};
      if (!this.customerInfo.certificateCode) return this.$vux.toast.text(tip);
      Object.assign(params, {
        hkId: this.customerInfo.certificateCode,
        userId: this.$client.userid
      });
      const res = await this.$post("business/isHkidValid", params);
      if (res && res.returnCode == 1000) {
        this.saveBase();
      } else {
      }
    },
    async saveBase() {
      //上台业务单信息更新
      if (!this.phoneInfo.phoneNo)
        return this.$vux.toast.text("請選擇电话号码");

      if (!this.servicePlan.businessPlanId)
        return this.$vux.toast.text("請選擇服务计划");
      if (this.deliverParams.businessType == "2") {
        //集客上台
        if (!this.customerInfo.companyName)
          return this.$vux.toast.text("请输入公司名称");
      }
      if (!this.customerInfo.lastName)
        return this.$vux.toast.text("请输入姓氏");
      if (!this.customerInfo.ccCode)
        return this.$vux.toast.text("请输入ccCode");
      if (!this.customerInfo.firstName)
        return this.$vux.toast.text("请输入名字");
      if (!this.customerInfo.birthday)
        return this.$vux.toast.text("请输入出生日期");
      // if (!this.$regex.phone.test(this.customerInfo.contactNumber))
      //   return this.$vux.toast.text("请输入正确的手机号码");
      // if (!this.$regex.email.test(this.customerInfo.email))
      //   return this.$vux.toast.text("请输入正确的电邮地址");

      if (!this.certificateAttach)
        return this.$vux.toast.text("请先上传证件副本");
      if (this.deliverParams.businessType == "2") {
        //集客
        if (!this.employeeAttach)
          return this.$vux.toast.text("请先上传员工证明");
      }

      if (!this.verifyAddress(this.customerInfo.addressInfo, "loginAddress")) {
        return;
      }

      if (this.proveType == "1") {
        if (!this.addrProveAttach)
          return this.$vux.toast.text("请先上传地址证明");
      }

      if (!this.verifyAddress(this.contactAddressInfo, "contactAddress")) {
        return;
      }
      let params = {};
      Object.assign(params, this.phoneInfo, this.servicePlan, {
        userId: this.$client.userid
      });

      params.id = this.deliverParams.orderId;
      params.customerInfo = this.customerInfo;
      params.certificateAttach = this.certificateAttach;
      if (this.deliverParams.businessType == "2") {
        //集客上台方式时才需传员工证明
        params.employeeAttach = this.employeeAttach;
      }
      //联络地址
      params.contactAddressType = this.contactAddressType;
      params.contactAddressInfo = this.contactAddressInfo;
      //上台登记地址方式和信息
      params.proveType = this.proveType;
      if (this.proveType == "1") {
        params.addrProveAttach = this.addrProveAttach;
      }

      console.log("saveBase-params==", JSON.stringify(params));
      const res = await this.$post("business/saveBase", params);
      if (res && res.returnCode == 1000) {
        this.deliverParams.certificateType = this.customerInfo.certificateType; //证件类型
        this.deliverParams.isDawan = this.choosePlan.isDawan; //isDawan==1:属于大湾区服务计划，isDawan==2:不属于大湾区服务计划，
        this.deliverParams.contractPeriod = this.choosePlan.contractPeriod; //选中的服务计划的 合约期
        this.deliverParams.businessPlanId = this.choosePlan.businessPlanId;
        this.$router.push({
          name: "handleInfo",
          query: { ...this.deliverParams }
        });
      }
    },
    getSession() {
      //读取缓存信息
      //获取缓存的联络地址
      var address = this.$session.get("address-contact");
      if (address) {
        this.contactAddressInfo = this.addressFormate(address);
        this.contactAddressInfoStr = Object.values(this.contactAddressInfo)
          .toString()
          .replace(/,/g, "");
      }

      //获取选择的服务计划
      this.choosePlan = this.$session.get("ChoosePlan");
      this.servicePlan = {
        //服务计划相关
        businessPlanId: this.choosePlan.businessPlanId,
        contractPeriod: this.choosePlan.contractPeriod,
        businessPlanCode: this.choosePlan.businessPlanCode
      };

      let monthlyFee = parseInt(this.choosePlan.monthlyFee);
      let administrationFee = parseInt(this.choosePlan.administrationFee);
      let registerPrice = parseInt(this.choosePlan.registerPrice);
      let prepayments = parseInt(this.choosePlan.prepayments);

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

      //获取选择的电话号码
      //   this.phoneInfo = {//测试用，记得删
      //   //选号信息
      //   registerType: 1,
      //   phoneNo: "92044748",
      //   effectDate: "20180301 ",
      //   effectTime: "1200",
      //   simAttach: "http://sssssssssss",
      //   providerInfo: "微品xx",
      //   effectiveEndDate: "20190301"
      // };
      this.phoneInfo = this.$session.get("ChooseNum");
      // this.phoneInfo.phoneNo = '69101237';
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
        floorBox: "楼（层）",
        flatInput: originVal.door ? originVal.door : "",
        flatBox: "室"
      };
      return formatAddress;
    },
    showDateTimePlugin() {
      let that = this;
      let today = getDate();
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: "2017-05-20",
        startDate: "1900-01-01",
        endDate: today,
        onConfirm(val) {
          that.bornDay = val;
          var date = new Date(val);
          var tamstamp = date.getTime();
          that.customerInfo.birthday = tamstamp;
        },
        onShow() {},
        onHide() {}
      });
    }
  },
  watch: {
    // loginAddress(val) {
    //   //监听地址输入
    //   const newObj = this.$deepcopy(this.customerInfo);
    //   newObj.addressInfo = this.addressFormate(val);
    //   if (this.contactAddressType == "1") {
    //     //默认同登记地址
    //     this.contactAddressInfo = newObj.addressInfo;
    //   }

    //   this.customerInfo = newObj;
    // },
    loginAddress: {
      handler: function (val) {
        const newObj = this.$deepcopy(this.customerInfo);
        newObj.addressInfo = this.addressFormate(val);
        if (this.contactAddressType == "1") {
          //默认同登记地址
          this.contactAddressInfo = newObj.addressInfo;
        }
        this.customerInfo = newObj;
      },
      deep: true
    },
    contactAddressType(val) { // 监听联络地址
      if (val == 2) {
        
      }
    },
    certificateObj(val) {
      this.certificateAttach = val.imageUrl;
    },
    employeeObj(val) {
      this.employeeAttach = val.imageUrl;
    },
    addrProveObj(val) {
      this.addrProveAttach = val.imageUrl;
    },
    certificateCode1(val) {
      this.certificateCodeStr = val + "(" + this.certificateCode2 + ")";
    },
    certificateCode2(val) {
      this.certificateCodeStr = this.certificateCode1 + "(" + val + ")";
    }
  },
  activated() {
    //keep-alive 组件激活时调用
    this.getSession();
  },
  deactivated() {
    // keep-alive 组件停用时调用
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
.flow-message {
  width: 100%;
  padding: 0 @page-space;
}
.vpInputRadio {
  padding: 0 @page-space;
}
.vpInputMessage {
  padding: 0 @page-space;
}
.xinput {
  font-size: 0.28rem;
  color: #666;
}
.button {
  width: 6.6rem;
  margin-left: 0.45rem;
  height: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.papers {
  position: relative;
  .pledge {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 0.8rem;
  }
}
.baseInput {
  .email-tips {
    font-size: 0.22rem;
    color: #999999;
    padding-left: 0.28rem;
    padding-top: 0.1rem;
  }
}
.base-info-tip {
  font-size: 0.28rem;
  color: #333333;
  background: #fffafb;
  padding: 0.2rem @page-space;
  .last {
    color: #666666;
    font-weight: normal;
    padding-top: 0.1rem;
  }
}

.address-upload-tips {
  font-size: 0.22rem;
  color: #999999;
  padding-left: 0.6rem;
  padding-bottom: 0.1rem;
}

.business-product {
  display: flex;
  justify-content: space-between;
  font-size: 0.28rem;
  color: #666666;
  padding: 0.2rem @page-space 0.2rem 0;
  margin-left: @page-space;
  border-bottom: 1px solid #e9e9e9;
  .last {
    color: #333333;
  }
}

.business-price {
  padding: 0.1rem @page-space 0.1rem 0;
  margin-left: @page-space;
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

.business-certificate {
  display: flex;
  justify-content: flex-start;
  margin-left: @page-space;
  .label {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #666;
    margin-right: @label-input-space;
  }
  div {
    flex: 1;
    margin-right: @page-space;
    display: flex;
    align-items: center;
    .first {
      width: 3rem;
      height: 100%;
      border: none;
      background: none;
      font-size: 0.28rem;
      height: 0.8rem;
    }
    .second {
      width: 1rem;
      height: 100%;
      border: none;
      background: none;
      font-size: 0.28rem;
      text-align: center;
      height: 0.8rem;
    }
    span {
      color: #999999;
      font-size: 0.28rem;
    }
  }
}

.business-discount {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.24rem;
  color: #ffa008;
  padding: 0.1rem @page-space;
  img {
    width: 0.26rem;
    height: 0.26rem;
    margin-top: 0.03rem;
  }
  span {
    padding-left: 0.1rem;
  }
}
.line-input{
  flex: 1;
  height: 0.8rem;
  width: 100%;
}
</style>

