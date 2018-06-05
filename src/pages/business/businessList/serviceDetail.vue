<template>
  <div>
    <vp-layout-page>
        <!-- 内地服务计划(包含4种的内地)和平常待机上台/集客上台一个页面 -->
        <div class="content">
            <section class="banner" v-if="detailData.packageImgBg">
              <img :src="detailData.packageImgBg" alt="">
            </section>
            <!-- 服务计划 -->
            <section class="service" :class="{'isInland': this.linkParam.inlandPlanType}">
                <h2 class="title vux-1px-b">
                    <!-- <img class="icon-img" :src="require('@/assets/images/resource/work_plan@2x.png')" alt=""> -->
                    服務計劃
                </h2>
                <ul class="service-content" :class="{'cisInland': this.linkParam.inlandPlanType}">
                    <li class="service-item" :class="{'margin': index%2 == 0, 'active': index == serviceIndex}" v-for="(item, index) in businessList" :key="index" @click="selectService(item,index)">
                      <p class="designation row-2-ellipsis">{{item.businessName}}</p>
                    </li>
                </ul>
            </section>
            <!-- 合约期 -->
            <section class="contract" v-if="contractList.length != 0">
                <h2 class="title vux-1px-b">合約期</h2>
                <ul class="contract-content">
                    <li class="contract-item" :class="{'margin': index%2 == 0, 'active': index == contractIndex}" v-for="(item, index) in contractList" :key="index" @click="selectTime(item, index)">
                        {{item.months}}個月
                    </li>
                </ul>
                 <div class="dest" v-if="this.linkParam.businessType == 4">
                    <p class="price">首月月費及出機價{{parseFloat( this.goodsInfo.registerPrice )+parseFloat(this.goodsInfo.prepayments) +parseFloat(this.goodsInfo.monthlyFee) +parseFloat(this.goodsInfo.administrationFee) | filterPrice}}</p>
                     <p class="price">手機上台價{{goodsInfo.registerPrice | filterPrice}}+預繳{{goodsInfo.prepayments | filterPrice}}+回贈后月費{{goodsInfo.monthlyFee | filterPrice}}+行政費{{goodsInfo.administrationFee | filterPrice}}</p>
                    <div class="discounts" v-if="this.jointDiscount">{{jointDiscount}}</div>
                </div>
                <div class="dest" v-if="this.linkParam.businessType == 3">
                    <p class="price">首月月費及出機價{{parseFloat( this.goodsInfo.registerPrice )+parseFloat(this.goodsInfo.prepayments) +parseFloat(this.goodsInfo.monthlyFee) +parseFloat(this.goodsInfo.administrationFee) | filterPrice}}</p>
                     <p class="price">手機優惠價{{goodsInfo.registerPrice | filterPrice}}+月費{{goodsInfo.monthlyFee | filterPrice}}+行政費{{goodsInfo.administrationFee | filterPrice}}</p>
                    <div class="discounts"  v-if="this.jointDiscount">{{jointDiscount}}</div>
                </div>
                <div class="dest" v-if="this.linkParam.businessType == 1 || this.linkParam.businessType == 2">
                    <p class="price">首月月費{{parseFloat(monthFeeData.monthFee) + parseFloat(monthFeeData.adminFee) | filterPrice}}（優惠月費{{monthFeeData.monthFee | filterPrice}}+行政費{{monthFeeData.adminFee | filterPrice}}）</p>
                    <div class="discounts"  v-if="this.jointDiscount">{{jointDiscount}}</div>
                </div>
            </section>
            <!-- 月費詳情 -->
            <section class="monthly">
                <h2 class="title vux-1px-b">
                    月費詳情
                </h2>
                <div class="monthly-content" v-html="businessInfo"></div>
            </section>
        </div>
        <div class="page-btns" slot="footer">
            <div class="footer">
                <div class="combo">
                    已選：{{this.serviceName}}
                </div>
                <div class="button" @click="commit">
                    確定
                </div>
            </div>
          <!-- <vp-button content="确定" @click.native="commit"></vp-button> -->
        </div>
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import { vpHeaderSort ,vpButton} from '@/components';

export default {
  name:'serviceDetail',
   /* ********************* components ********************* */
  components: {
    vpHeaderSort,
    vpButton
  },

  /* ********************* data ********************* */
  data() {
    return {
      serviceIndex: 0, // 默认选择第一个服务
      serviceName:'', //选择服务的名称
      contractIndex: 0, // 默认选择第一个时间套餐
      contractName:'', //选择的时间套餐名称
      contractId:'', //合约期id。对应的数据里的skuId
      detailData:{}, //业务包详情查询数据
      businessList:[],  //业务子集列表
      InfoDetail:{}, // 业务子集详情
      contractList:[], //合约期列表
      businessInfo:'', // 月費詳情
      monthFeeData:'', // 月费
      discountData:[],  // 合约期优惠信息
      jointDiscount:"", //拼接优惠信息
      serviceId:'', //服务计划id
      businessPlanCode:'', //合约期对应业务编码-传出的
      mPackageId:"" ,// 业务分页查询id（中国漫游。。。）
      goodsInfo:{}  // 价格转换中心商品信息
    }
  },

 /* ********************* computed ********************* */
  computed:{
     linkParam () {
      return this.$route.query
    }
  },

 /* ********************* created ********************* */
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    // this.$jb.js2webview({//标题
    //   type: 5,
    //   title: this.linkParam.packageName
    // })
    if(this.linkParam.inlandPlanType) { // 判断是否选内/非地服务计划。是的话url上会带有inlandPlanType=18（暂内地非内地都是18）

      this.getServicelist(this.linkParam.inlandPlanType) // packageType=18中国漫游语音选计划，如果是内/非需先调业务包分页查询，否则不需要
    }else {
      this.getMnpChangeOverDate() //业务包详情查询
    }
  },

 /* ********************* methods ********************* */
  methods: {
    // 如果是完善信息选内/非地号码——服务计划，先调业务包分页查询获取当前这个业务包分页查询的唯一结果中的id，然后根据这个id调业务子集详情
    async getServicelist (type) { //业务包分页查询
        const data = await this.$post("business/packagePage", {
        		"pageNumber": "1",
            "pageSize":"5", //此处无需在意一页多少，只会有1个
            "userId":this.$client.userid,
            "orgId":this.$client.orgid,
            "packageType": type // 业务包类型
      })
        let bookData = data&&data.records?data.records:[];
        this.goodsInfo =  bookData[0] // 商品信息
        this.mPackageId = bookData[0] && bookData[0].id? bookData[0].id :""// 只有一个业务包，所以取第一个就行了

        this.getMnpChangeOverDate() //业务包详情查询
    },
    commit() { // 点确定
      let param = {}
        param.businessPlanId = this.serviceId  //服务计划Id
        param.serviceName = this.serviceName // 服务计划名称
        param.contractPeriod = this.contractName // 合约期
        param.businessPlanCode = this.businessPlanCode // 合约期对应业务编码
        param.isDawan = this.InfoDetail.isDawan // 是否大湾区业务(1:是;2:否),业务子集获取
        param.contractId = this.contractId  // 合约期id

        // businessType, 1.带机上台、2集客上台、3.新客上台、4.旗舰机上台
        if(this.linkParam.businessType == 3 || this.linkParam.businessType == 4) {
          param.productName = this.goodsInfo.productName //商品名称
          param.mFeeAndPhone = parseFloat( this.goodsInfo.registerPrice )+parseFloat(this.goodsInfo.prepayments) +parseFloat(this.goodsInfo.monthlyFee) +parseFloat(this.goodsInfo.administrationFee)  // 首月月費及出機價(相加之和)
          param.registerPrice = this.goodsInfo.registerPrice //上台价格
          param.prepayments = this.goodsInfo.prepayments //预付费
          param.monthlyFee = this.goodsInfo.monthlyFee //月费
          param.administrationFee = this.goodsInfo.administrationFee //行政费
          param.discounts = this.phoneGift + (this.jointDiscount? "+":"")+ this.jointDiscount//手机赠品及服务计划优惠
          param.marketingPromotion = this.goodsInfo.marketingPromotion //营销推广信息
        } else if(this.linkParam.businessType == 1 || this.linkParam.businessType == 2){
          param.monthlyFee = (this.monthFeeData && this.monthFeeData.monthFee )? this.monthFeeData.monthFee :"" // 优惠月费
          param.administrationFee = (this.monthFeeData && this.monthFeeData.adminFee) ? this.monthFeeData.adminFee : ""  // 行政费
          param.discounts = this.jointDiscount  // 服务计划的优惠信息
        }

        if(this.linkParam && this.linkParam.inlandPlanType) { // 中国漫游。。。内地，非内地选服务计划
            this.$session.set('ChoosePlanLand', param)
            this.$router.go(-1)
         } else{
            this.$session.set('ChoosePlan', param) // 存起来输入的信息(最外选计划)
            if (this.$client.right == "store") { //店铺模式
              if (this.linkParam.businessType == 1 || this.linkParam.businessType == 2 || this.linkParam.businessType == 3 || this.linkParam.businessType == 4) {
                if (this.linkParam.reChoice == true) {
                  this.$router.go(-2)
                } else {
                    this.$router.push({path:'/business/handleBase/selectPhoneNumber',query:{businessType:this.linkParam.businessType}})
                }
              }
            } else if (this.$client.right == "staging") { //工作台模式
                if (this.linkParam.businessType == 1 || this.linkParam.businessType == 2 ) {
                  this.$router.go(-2)
                } else if (this.linkParam.businessType == 3 || this.linkParam.businessType == 4) {
                  this.$router.push({path:'/business/handleBase/selectPhoneNumber',query:{businessType:this.linkParam.businessType}})
                }
            }
        }
    },
    selectService (item,index) { // 选择服务
      this.serviceIndex = index
      this.serviceName = item.businessName
      this.serviceId = item.id
      this.contractIndex = 0 // 点击服务计划后把合约选择默认的第一个
      this.businessInfo = item.businessInfo
      if(this.linkParam && this.linkParam.inlandPlanType) {
        this.businessPlanCode = item.businessCode
      }
      this.$jb.js2webview({//标题
        type: 5,
        title: this.serviceName
      })
    },
    selectTime (item, index) { // 选择时间套餐
      this.contractIndex = index
      this.contractName = item.months
      this.contractId = item.skuId
      if(!(this.linkParam && this.linkParam.inlandPlanType)) {
        this.businessPlanCode = item.businessCode
      }
    },
    async getMnpChangeOverDate() { //查询业务包详情，以及关联的业务子集
      const res = await this.$post("business/packageQuery", {
        "packageId": this.linkParam.inlandPlanType ? this.mPackageId : this.linkParam.packageId, // 获取链接上的id
        "userId":this.$client.userid,
        "orgId":this.$client.orgid
      })
      if (res.returnCode == 1000) {
      //  console.log(res)
        this.detailData = res.dataInfo
        this.businessList = res.dataInfo.businessList
        this.serviceName = res.dataInfo.businessList && res.dataInfo.businessList[0].businessName ? res.dataInfo.businessList[0].businessName : ""// 默认的服务名称
        this.serviceId= res.dataInfo.businessList && res.dataInfo.businessList[0].id ? res.dataInfo.businessList[0].id : "" // 默认的服务id
        if (this.serviceId && this.serviceId != "") {
          this.BusinessInfoDetail() // 业务子集详情
          this.getDiscountsAndVas() //查询VAS及优惠
        }
        this.$jb.js2webview({//标题
          type: 5,
          title: this.serviceName
        })
      }
    },
    async BusinessInfoDetail() { //业务子集详情查询
      const res = await this.$post("business/businessInfoDetail", {
        //  "id":"960420550614634498"
          "id": this.serviceId //选中业务的id
      })
      if (res.returnCode == 1000) {
        this.InfoDetail = res.dataInfo
        this.contractList = res.dataInfo.contractList
        this.businessInfo = res.dataInfo.businessInfo
        this.monthFeeData =  res.dataInfo.contractList[0] // 默认的第一个的月费，行政费对象
        this.contractName =  res.dataInfo.contractList && res.dataInfo.contractList[0] && res.dataInfo.contractList[0].months ? res.dataInfo.contractList[0].months :""// 默认的第一个的合约期名称
        this.contractId =  res.dataInfo.contractList && res.dataInfo.contractList[0] && res.dataInfo.contractList[0].skuId ? res.dataInfo.contractList[0].skuId :""  //默认的第一个月的合约期id
        if(this.linkParam && this.linkParam.inlandPlanType) {
          this.businessPlanCode =  res.dataInfo.businessCode || ""// 合约期对应业务编码
        } else {
          this.businessPlanCode =  res.dataInfo.contractList && res.dataInfo.contractList[0] && res.dataInfo.contractList[0].businessCode ? res.dataInfo.contractList[0].businessCode :""// 默认的第一个的合约期名称
        }

      }
    },
    async getDiscountsAndVas() { //查询VAS及优惠
      const res = await this.$post("business/getDiscountsAndVas", {
          // "id":"960420550614634498"
          "id": this.serviceId  //选中业务的id
      })
      if (res.returnCode == 1000) {
        // console.log('res3',res)
        this.discountData = res.dataInfo.discDataLv1List  //合约期优惠信息
        let disarr =  res.dataInfo.discDataLv1List && res.dataInfo.discDataLv1List[0].dataLv2List ? res.dataInfo.discDataLv1List[0].dataLv2List : [] // 默认选排在第一个的优惠
        let smallArr = []
        disarr.map((item)=>{
          smallArr.push(item.name +'HK$'+ ((parseInt(item.amount) == 0 || item.amount == null)? 'HK$0.00' : (item.amount/100)).toFixed(2))
        })
        this.jointDiscount = smallArr.join('+')  //拼接的服务计划优惠
      }
    },
  },

 /* ********************* watch ********************* */
  watch:{
    contractIndex(val) { // 合约期的index
      this.monthFeeData = this.contractList[val]
      this.contractName = this.contractList[val].months
      this.contractId = this.contractList[val].skuId
      if(!(this.linkParam && this.linkParam.inlandPlanType)) {
         this.businessPlanCode = this.contractList[val].businessCode
      }
      // console.log(this.contractName)
      let disarr = this.discountData[val] && this.discountData[val].dataLv2List ? this.discountData[val].dataLv2List : []
      let smallArr = []
      disarr.map((item)=>{
         smallArr.push(item.name +'HK$'+ ((parseInt(item.amount) == 0 || item.amount == null)? 'HK$0.00' : (item.amount/100)).toFixed(2))
      })
      this.jointDiscount = smallArr.join('+')
    },
    serviceId(val) { //选服务计划的id
      // console.log(val)
      this.serviceId = val
      this.BusinessInfoDetail() // 选了服务计划后，重新根据id获取业务子集详情
      this.getDiscountsAndVas() //查询VAS及优惠
   },
  }
}
</script>
<style lang = 'less' scoped>
@import '~vux/src/styles/1px.less';
.banner{
    width: 100%;
    height:3.4rem;
    background: #fff;
    /* border: 1px salmon solid; */
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
}
.service {
    padding-left:0.44rem;
     padding-right:0.44rem;
    background: #fff;
    .title{
        height: 0.72rem;
        padding-left: 0.4rem;
        font-family: PingFangSC-Regular;
        font-size: 0.28rme;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.72rem;
        background: url('../../../assets/images/resource/work_plan@2x.png') no-repeat 0 0.18rem;
        background-size: 0.36rem 0.36rem;
      &.vux-1px-b {
        &:after {
          .setBottomLine(#E9E9E9);
        }
      }
    }
}
.service.isInland {
  padding-right:0.44rem;
}
.service-content{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 0.2rem;
    .service-item{
        height: 0.9rem;
        /* width: 3.2rem; */
        width: 48%;
        margin-top: 0.15rem;
        border: 1px solid #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 .23rem;
        &.margin{
            /* margin-right: 0.22rem; */
            margin-right:4%;
        }
        &.active{
            border: 1px solid #E52C79;
            p{
                color: #E52C79;
            }
        }
        p{
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 0.26rem;
            color: #333333;
            line-height: 0.34rem;
        }
    }
}
.service-content.cisInland {
  display: flex;
    flex-wrap: wrap;
     padding-bottom: 0.15rem;
    .service-item{
        height: .72rem;
        width: 100%;
        /* padding-top: 0.1rem; */
        margin-top: 0.15rem;
        border: 1px solid #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active{
            border: 1px solid #E52C79;
            p{
                color: #E52C79;
            }
        }
        p{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 0.26rem;
          color: #333333;
          letter-spacing: 0;
          line-height: 0.34rem;
        }
    }
}
.contract{
    padding-left:0.44rem;
     padding-right:0.44rem;
    background: #fff;
    .title{
        &:extend(.service .title);
        background: url('../../../assets/images/work_contract@2x.png') no-repeat 0 0.18rem;
        background-size: 0.36rem 0.36rem;
    }
    .dest {
        padding: 0.1rem 0 0.26rem 0;
        box-sizing: content-box;
        p{
            margin: 0.15rem 0;
        }
        .price{
            font-family: PingFangSC-Regular;
            font-size: 0.26rem;
            color: #333333;
            letter-spacing: 0;
            line-height: 0.26rem;
        }
        .discounts{
            height: 0.26rem;
            padding-left: 0.3rem;
            background: url('../../../assets/images/work_gift@2x.png') no-repeat 0 0rem;
            background-size: 0.26rem 0.26rem;
            &:extend(.price);
            font-size: 0.24rem;
            line-height: 0.26rem;
            color: #666;
        }
    }
}
.contract-content {
  display: flex;
  width: 100%;
    &:extend(.service-content);
    .contract-item{
        width:48%;
        height: 0.8rem;
        /* width: 3.2rem; */
        margin-top: 0.15rem;
        text-align: center;
        font-size: 0.26rem;
        letter-spacing: 0;
        color: #333333;
        line-height: 0.8rem;
        background: #F4F4F4;
        border-radius: 4px;
        &.margin{
            /* margin-right: 0.22rem; */
            margin-right: 4%;
        }
        &.active{
            background: #E52C79;
            color: #fff;
        }
    }
}
.service-content.cisInland .service-item.margin{
    margin-right: 0 !important;
}
.monthly{
    background: #fff;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
    .monthly-content{
        padding:0 0.44rem;
    }
    .title{
        height: 0.74rem;
        margin: 0 0.44rem;
        text-align: center;
        line-height: 0.74rem;
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: .18rem;
    }
    h3{
        font-family: PingFangSC-Regular;
        font-size: 0.26rem;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.4rem;
    }
    .zd{
        padding: 0.1rem 0;
        font-family: PingFangSC-Regular;
        font-size: 0.24rem;
        color: #666666;
        letter-spacing: 0;
        line-height: 0.4rem;
    }
    .tips{
        padding-left: 0.26rem;
        font-family: PingFangSC-Regular;
        font-size: 0.22rem;
        color: #888888;
        letter-spacing: 0;
        line-height: 0.3rem;
        background: url('../../../assets/images/all_notice@2x.png') no-repeat 0 0rem;
        background-size: 0.22rem 0.22rem;
    }
    .plan{
        padding: 0.2rem 0;
        font-family: PingFangSC-Regular;
        font-size: 0.26rem;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.4rem;
    }
    .dist{
        font-family: PingFangSC-Regular;
        font-size: 0.24rem;
        color: #666666;
        letter-spacing: 0;
        line-height: 0.4rem;
    }
}
.footer{
    height: 0.9rem;
    background: #fff;
    width: 100%;
    display: flex;
    .combo{
        /* width: 4.86rem; */
        flex: 1;
        text-align: center;
        line-height: 0.9rem;
        color: #333333;
        padding-left: .44rem;
        padding-right: .64rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
    .button{
        width: 2.64rem;
        background: #E52C79;
        text-align: center;
        line-height: 0.9rem;
        font-size: 0.3rem;
        color: #fff;
    }
}
</style>
