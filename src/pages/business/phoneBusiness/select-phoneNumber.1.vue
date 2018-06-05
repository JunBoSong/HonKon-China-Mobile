<template>
  <div class="select-phone">
    <!-- 上台方式（新号，携号，預付轉後付） -->
    <vp-layout-page>
      <div>
        <h3><i></i>上台方式</h3>
        <div class="selectWrap">
          <vpInputRadio :value="choiceindex" class="vpInputRadio" :list="preferentialData" @input="input" :radioRequired = "true"/>
        </div>
        <!-- 新号码上台 -->
        <section v-show = "choiceindex==1" class="sectionOne">
          <div class="search">
            <i></i>
            <form action="#"  @submit="searchBtn($event)">
              <input type="search" ref= "keyword" placeholder="請輸入搜索號碼" v-model.trim="keyWord"  autocomplete="off" >
            </form>
          </div>
          <ul class="phone-list">
            <li v-for="(item,index) in phoneList" :key="index" :class="{active: index === phoneIndex}" @click="goSelectPhoneNumber(index,item)">{{item.phoneNo}}</li>
          </ul>
          <div class="change" @click="changeHandele()">換一批</div>
          <div class="selectDate">
            <group>
              <datetime v-model="limitHourValue" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD" @on-change="change" :title="(limitHourValue? '':'請選擇服務生效日期')" class="dateWrap"></datetime>
            </group>
            <i></i>
          </div>
        </section>
         <!-- 攜號上台 -->
        <section v-show = "choiceindex==2" class="sectionTwo">
          <div class="messageWrap">
            <vpInputMessage class="vpInputMessage InputMessageI" :borderB='false' :value="imessage1"  label="電話號碼" placeholder="請輸入正確攜號電話號碼" @input="iimessage1" ref= "telNum"/>
           <div class="selectDate  operatorWrap">
            <span class="turnDate">轉台運營商</span>
            <div class="slectRight">
              <group>
                <popup-picker :data="list1" v-model="value4"  :placeholder="('請選擇轉台運營商')" @on-change="change4" ></popup-picker>
              </group>
              <i class="simIcon"></i>
            </div>
          </div>
          <div class="selectDate">
            <span class="turnDate">轉台日期</span>
            <div class="slectRight">
              <group>
                <datetime
                  v-model="value1"
                  @on-change="change1"
                  :title="(value1? '':'請選擇轉台日期')"
                  @on-cancel="log('cancel')"
                  @on-confirm="log('confirm')"
                  @on-hide="log('hide', $event)"
                  :start-date="startDate"
                  :end-date="endDate"
                  format="YYYY-MM-DD"
                  >
                </datetime>
              </group>
              <i></i>
            </div>
          </div>
           <div class="selectDate">
            <span class="turnDate">轉台時間</span>
            <div class="slectRight">
               <group>
                <popup-picker :data="list2" v-model="value2"  :placeholder="('請選擇轉台時間')" @on-change="change2" ></popup-picker>
              </group>
              <i></i>
            </div>
          </div>
          <div class="selectDate">
            <span class="turnDate">SIM卡類型</span>
            <div class="slectRight">
               <group>
                <popup-picker :data="list3" v-model="value5"  :placeholder="('請選擇SIM卡類型')" @on-change="change5" ></popup-picker>
              </group>
              <i class="simIcon"></i>
            </div>
          </div>
          <vpInputMessage class="vpInputMessage InputMessageI "  :value="imessage6"  label="ICCID" placeholder="請輸入ICCID" @input="iimessage6" ref="xICCID" v-if="isShowICCID"/>
          </div>
          <vpFlowMessage class="flow-message bottom-message" message = "CMHK儲值卡客戶如要保留號碼上台，請選擇預付轉后付。 "/>
        </section>
        <!-- 預付轉後付 -->
        <section v-show = "choiceindex==3" class="sectionThree">
          <div class="messageWrap">
            <vpInputMessage class="vpInputMessage InputMessageI"  :value="imessage3"  label="儲值卡號碼" placeholder="請輸入CMHK儲值卡號碼" @input="iimessage3" ref="cardNum"/>
          <vpInputMessage class="vpInputMessage InputMessageI"  :value="imessage4"  label="ICCID" placeholder="請輸入ICCID" @input="iimessage4" ref="ICCID"/>
           <div class="selectDate">
            <span class="turnDate">轉台日期</span>
            <div class="slectRight">
              <group>
                <datetime
                  v-model="value3"
                  @on-change="change3"
                  :title="(value3? '':'請選擇轉台日期')"
                  @on-cancel="log('cancel')"
                  @on-confirm="log('confirm')"
                  @on-hide="log('hide', $event)"
                  :start-date="startDate"
                  :end-date="endDate"
                  format="YYYY-MM-DD"
                  >
                </datetime>
              </group>
              <i></i>
            </div>
          </div>
           <section class="section-img">
            <vpUpdateImg message="上載SIM卡圖像" v-model="simImgObj"/>
          </section>
          </div>
          <vpFlowMessage class="flow-message bottom-message" message = "請確保您的賬戶有餘額，以免辦理失敗 "/>
        </section>

      </div>
      <div class="btn-wrap" slot="footer">
        <span  v-if = "choiceindex==1 && this.phoneSelect"><span>已選：{{phoneSelect}}</span></span>
        <span  v-if = "choiceindex==2 && this.imessage1"><span>已選：{{imessage1}}</span></span>
        <span  v-if = "choiceindex==3 && this.imessage3"><span>已選：{{imessage3}}</span></span>
        <div class="btn" @click="confirmValid()">確定</div>
      </div>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import config from '@/config';
import { Group, DatetimeRange,Datetime, XButton,PopupPicker } from 'vux'
import { vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio, vpFlowMessage, vpInputMessage} from '@/components';
export default {
  name:'selectPhoneNumber',
  components: {
    vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio,vpFlowMessage, vpInputMessage,Group,DatetimeRange,Datetime,XButton,PopupPicker
  },
  data() {
    return {
      // value:'1',
      imessage:'',
      preferentialData:[
        {
         name:"新號碼上台",
         value:'1'
        },
        {
         name:"攜號上台",
         value:'2'
        },
        {
         name:"預付轉後付",
         value:'3'
        }],
        choiceindex:this.$session.get('styleIndex')?this.$session.get('styleIndex'):"1", // 选择的方式（新号码上台。携号上台。。
        phoneIndex: -1, // 选中的电话花码index
        phoneSelect: "", // 选中的电话号码
        phoneList:[], // 电话号码分页结果
        pageNumber:1,
        resData:{}, //号码池分页查询res
        keyWord:'', // 号码搜索关键词
        format: 'YYYY-MM-DD HH:mm',
        limitHourValue: '',
        xDate:'', // 新号上台服务生效日期
        xDate2:'',  // 新号上台服务生效日期时间戳
        imessage1:'',
        imessage3:'',
        imessage4:'',
         imessage6:'',
        telNum:'',  // 携号上台电话
        cardNum:'', // 预付转后付卡号
        ICCID:'', // 预付转后付 ICCID
        value1: '', // 携号上台时间
        value2: [], // 携号上台日期
        value5:[], //携号SIM卡
        effectDate1:'', // 携号上台日期去掉“-”
        effectDate2:'',// 携号上台日期时间戳
        effectTime1:'', // 携号上台时间去掉“-”
        value3: '', //預付轉后付选日期
        value4: [], // 携号运营商
        list1: [],
        list2:[["01:00","12:00"]], // 携号转台时间数据
        list3:[["Prepaid Sim","Postpaid Sim"]], // 携号SIM卡類型
        activationDate:'', //ipp預付轉后付选日期去掉“-”
        activationDate2:'', //ipp預付轉后付选日期时间戳
        operatorList:[], // 运营商信息列表
        providerInfo:{}, // 当前选中的运营商详细信息
        id:"", // 初始化出来的id
        xICCID:"", // 携号ICCID
        isShowICCID: false, // 携号ICCID是否显示
        // endDate2:"",// 新号上台选生效日期的结束时间戳
        simImgObj:{}, //上传图片对象
        simImgUrl:"", //上传图片URL
        cardExpiryDate:'' //預付轉后付验证接口返回日期
    }
  },
  computed:{
    startDate () { //新号上台选生效日期的当前时间
      let date1 = new Date();
      let y = date1.getFullYear()
      let m = date1.getMonth() + 1
      let d = date1.getDate()
      m = m < 0 ? '00' : (m < 10 ? '0' + m : m)
      d = d < 0 ? '00' : (d < 10 ? '0' + d : d)
      return y + "-" + m + "-" + d
    },
    endDate () { //新号上台选生效日期的结束时间，60天后
      let date1 = new Date();
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() + 30);
      let y = date2.getFullYear()
      let m = date2.getMonth() + 1
      let d = date2.getDate()
      m = m < 0 ? '00' : (m < 10 ? '0' + m : m)
      d = d < 0 ? '00' : (d < 10 ? '0' + d : d)
      return y + "-" + m + "-" + d
    },
     linkParam () { //链接上的值
      return this.$route.query
    },
    NumType () { //号码池类型(1:内地号码;2:带机上台号码;3集客号码;4澳门号码)
      if (this.$route.query.businessType == 1 || this.$route.query.businessType == 3 || this.$route.query.businessType == 4 ) {  //1.带机上台、2集客上台、3.新客上台、4.旗舰机上台
        return 2  //新客上台,旗舰机上台,带机上台 号码池类型都是带机上台2
      } else if (this.$route.query.businessType == 2) {  //1.带机上台、2集客上台、3.新客上台、4.旗舰机上台
        return 3 //集客上台号码池类型是3
      }
    }
  },
  methods: {
    async registerOrderInfo() {
      //上台业务单初始化
      const res = await this.$post("business/init", {
        businessType: this.linkParam.businessType,
        cmhkCustomerId: this.linkParam.cmhkCustomerId // 客户ID
      });
      if (res && res.returnCode == 1000) {
        this.id = res.dataInfo.orderId;
        this.$router.push({path:'/business/handleBase/baseInfo',query:{orderId: this.id,businessType:this.linkParam.businessType}})
      }
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    showPlugin () {
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH',
        value: '2017-05-20 18',
        onConfirm (val) {
          console.log('plugin confirm', val)
        },
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        }
      })
    },
    goSelectPhoneNumber(index,item){ // 点击号码选择
      this.phoneIndex = index
      this.phoneSelect = item.phoneNo
    },
    input (val) { // 切换类型子组件传过来的类型值
       this.choiceindex = val
    },
    iimessage1 (val) {
      console.log("val1",val)
      this.imessage1 = val
    },
    iimessage3 (val) {
      console.log("val3",val)
      this.imessage3 = val
    },
     iimessage4 (val) {
        console.log("val4",val)
      this.imessage4 = val
    },
     iimessage6 (val) {
        console.log("val6",val)
      this.imessage6 = val
    },
    changeHandele () { // 点击换一批
      if (this.resData.pages >= this.pageNumber+1) { //3.翻到最后一页循环返回第一页
        this.pageNumber = this.pageNumber + 1
      } else {
        this.pageNumber = 1
      }
      if (this.keyWord) {
        this.getPhonePage(this.NumType,this.keyWord);
      } else {
        this.getPhonePage(this.NumType,"");
      }

    },
    searchBtn (e) { // 点手机的搜索 搜索号码 分页
        e.preventDefault();
        this.getPhonePage(this.NumType,this.keyWord);
        return false;
    },
    confirmValid () { // 点确定
      if (this.choiceindex == 1) {
        this.getNewValid()  //新号校验
      } else if (this.choiceindex == 2) {
        if (!this.telNum) {
          this.$vux.toast.text("請輸入電話號碼")
        }else if (Object.keys(this.providerInfo).length == 0) {
          this.$vux.toast.text("請選擇轉台運營商")
        } else if (!this.effectDate2) {
           this.$vux.toast.text("請選擇轉台日期")
        } else if (!this.effectTime1) {
           this.$vux.toast.text("請選擇轉台時間")
        }else if (!this.value5[0]) {
          this.$vux.toast.text("請選擇SIM卡類型")
        } else if (this.value5[0] == "Prepaid Sim" && !this.xICCID) {
           this.$vux.toast.text("請輸入ICCID")
        }else {
           this.isMnpQuotaValid() //校验携号配额
        }

      } else{
        if (!this.cardNum) {
           this.$vux.toast.text("請輸入儲值卡號碼")
        }else if (!this.ICCID) {
          this.$vux.toast.text("請輸入ICCID")
        } else if (!this.activationDate2){
          this.$vux.toast.text("請選擇轉台日期")
        } else {
          this.isIppInfoValid()
        }
      }
    },
    async getPhonePage(type,number) { //号码池分页查询，添加关键词number可以做号码筛选
      const res = await this.$post("business/phonePage", {
        	pageNumber: this.pageNumber,
          pageSize: 8,
          type: type,  // (1:内地号码;2:香港号码;3集客号码;4带机上台号码)
          number: number
      })
      if (res.returnCode != 1000) {
          return this.$vux.toast.text(res.message)
      } else { //如果有结果，默认选中结果第一个
        this.resData = res
        this.phoneList = res.records;
        // this.phoneSelect = this.phoneList[0].phoneNo
        this.phoneSelect = ""
        this.phoneIndex = -1
        console.log(this.phoneList[0].phoneNo)
      }
    },
    async getDictionaries(){
      const resDectionary = await this.$post('admin/dectionary', { //查询数据字典运营商
        "type": 135
      })
      console.log(resDectionary)
      let operatorList = resDectionary.dataInfo[config.APPID][135]
      this.operatorList = operatorList
      let arr = []
      operatorList.map((item)=>{
        arr.push(item.name)
      })
      this.list1.push(arr)
     },
    async getNewValid() { //3.1.3新号校验
      const res = await this.$post("business/NewValid", {
          "phoneNo":this.phoneSelect,
          "activationDate": this.xDate,
          "userId":this.$client.userid
      })
      if (res.returnCode == 1000) {
        this.getPhoneNoReserve() //号码预占
      }
    },
    async getPhoneNoReserve() { //号码预占(此只新号时要)
      const res = await this.$post("business/phoneNoReserve", {
        "phoneNo": this.phoneSelect,
        "orderNo": this.linkParam.orderId ? this.linkParam.orderId :this.id
      })
      if (res.returnCode == 1000) {
         if ( this.linkParam && this.linkParam.number) {
           this.getPhoneNoRelease() //号码释放
        } else {
          this.JudgeJump () //页面跳转
        }
      }
    },
    async getPhoneNoRelease() { //号码释放(此只新号时要)
      const res = await this.$post("business/phoneNoRelease", {
        "phoneNo": this.linkParam && this.linkParam.number ?this.linkParam.number :"", //先前号码
        "orderNo": this.linkParam.orderId ? this.linkParam.orderId :this.id
      })
       if (res.returnCode == 1000) {
        this.JudgeJump () //页面跳转
      }
    },
    async isMnpQuotaValid() { //校验携号配额
      const res = await this.$post("business/isMnpQuotaValid", {
        	"effectDate":this.effectDate1,
          "effectTime":this.effectTime1,
          "userId":this.$client.userid
      })
      if (res.returnCode == 1000) {
        this.isMnpInfoValid() // 如果携号配额有，则携号号码验证
      } else {
          return this.$vux.toast.text(res.message)
      }
    },
    async isMnpInfoValid() { //携号号码验证
      console.log(this.imessage3)
      const res = await this.$post("business/isMnpInfoValid", {
          "phoneNo":this.telNum,
          "effectDate": this.effectDate1,
          "effectTime":this.effectTime1,
          "userId":this.$client.userid
      })

      if (res.returnCode == 1000) {
        this.JudgeJump () //页面跳转
      }
    },
    async isIppInfoValid() { //IPP号码验证
      console.log(this.imessage3)
      const res = await this.$post("business/isIppInfoValid", {
        	"phoneNo": this.cardNum,
          "activationDate": this.activationDate,
          "iccId": this.ICCID,
          "userId":this.$client.userid
      })
      if (res.returnCode == 1000) {
          this.cardExpiryDate = res.dataInfo.cardExpiryDate
          this.JudgeJump () //页面跳转
      }
    },
    JudgeJump () { // 判断跳转点了确定之后跳转页面的方式
      this.SaveInfo() // 页面跳转之前先存信息
      if(this.$client.right == "store") {
          if (this.linkParam.businessType == 1 || this.linkParam.businessType == 2 ) { // 带机上台/集客上台
            if (this.linkParam && this.linkParam.number) {
              return this.$router.go(-1)
            } else {
              //this.registerOrderInfo ()  //..............新加
              return this.$router.push({path:'/business/handleBase/baseInfo',query:{orderId: this.id, businessType:this.linkParam.businessType}})
            }
          } else if (this.linkParam.businessType == 3 || this.linkParam.businessType == 4) {
             if (this.linkParam && this.linkParam.number) {
              return this.$router.go(-1)
            } else {
              this.registerOrderInfo () //上台业务单初始化
            }
          }
      }else if (this.$client.right == "staging") {
        if (this.linkParam.businessType == 1 || this.linkParam.businessType == 2){
          return this.$router.go(-1)
        } else if(this.linkParam.businessType == 3 || this.linkParam.businessType == 4){
          if (this.linkParam && this.linkParam.number) {
              return this.$router.go(-1)
          } else {
            this.registerOrderInfo () //上台业务单初始化
          }
        }
      }
    },
    SaveInfo() { // 缓存本地信息
      let param = {}
      param.registerType = this.choiceindex
      if (this.choiceindex == 1) {
        param.phoneNo = this.phoneSelect
        param.effectDate = this.xDate2
      }
      if (this.choiceindex == 2) {
        param.phoneNo = this.telNum
        param.effectDate = this.effectDate2
        param.effectTime = this.effectTime1
        // param.effectiveEndDate = this.endDate

        if ( this.value5[0] == "Prepaid Sim") { // 如果sim卡类型是Prepaid Sim，则显示ICCID选項
            param.simType = 1
            param.oldIccid = this.xICCID
        }else if (this.value5[0] == "Postpaid Sim") {
            param.simType = 2
        }
        param.providerInfo = this.providerInfo.name
        param.dno = this.providerInfo.value
      }
      if (this.choiceindex == 3) {
        param.phoneNo = this.cardNum
        param.effectDate = this.activationDate2

        //let dstr = "20151202" // 后IPP验证接口返回20151202格式后更换 let dstr = this.cardExpiryDate
        let dstr = this.cardExpiryDate
        let sdstr = dstr.slice(0,4) + "/" + dstr.slice(4,6) + "/" + dstr.slice(6,8)
        let etime = new Date(Date.parse(sdstr));
        // this.cardExpiryDate = etime ? etime.getTime()/1000 : ""
         this.cardExpiryDate = etime ? etime.getTime() : ""
        param.effectiveEndDate = this.cardExpiryDate
        param.oldIccid = this.ICCID
        param.simAttach = this.simImgUrl
      }
      this.$session.set('ChooseNum', param) // 存起来输入的信息
    },
    toggleFormat () {
      this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
    },
    change (value) { // 新号上台选日期的改变
      console.log('change', value)
      let reg = new RegExp("-","g");
      let vstr = value.replace(reg,"");
      this.xDate = vstr  //20180313
      let date = new Date(Date.parse(value.replace(/-/g, "/")));
      // this.xDate2 = (date.getTime())/1000; //时间戳
      this.xDate2 = (date.getTime()); //时间戳
    },
     change4(value) { // 携号上台选运营的改变
      this.value4 = value
      console.log('change4', value)
      this.operatorList.map((item)=>{
        if (item.name == value) {
          this.providerInfo = item // 遍历出当期名称的供应商详细信息
        }
      })
      console.log( this.providerInfo)
    },
     change1 (value) { // 携号上台选日期的改变
      console.log('change1', value)
      this.value1 = value
      let reg = new RegExp("-","g");
      let vstr = value.replace(reg,"");
      this.effectDate1 = vstr
      let date = new Date(Date.parse(value.replace(/-/g, "/")));
      // this.effectDate2 = (date.getTime())/1000; //时间戳
       this.effectDate2 = (date.getTime()); //时间戳

    },
     change2 (value) { //携号上台选时间的改变
      this.value2 = value
      let reg = new RegExp(":","g");
      let vstr = value[0].replace(reg,"");
      this.effectTime1 = vstr
      console.log('change2', value)
    },
     change5 (value) { //携号上台选时间的改变
       this.value5 = value
      console.log('change5', value)
      if (value[0] == "Prepaid Sim" ) {
        this.isShowICCID = true
      } else {
        this.isShowICCID = false
      }
    },
    change3 (value) { //预付转后付选日期的改变activationDate
      this.value3 = value
      let reg = new RegExp("-","g");
      let vstr = value.replace(reg,"");
      this.activationDate = vstr
      let date = new Date(Date.parse(value.replace(/-/g, "/")));
      // this.activationDate2 = (date.getTime())/1000 ; //时间戳
      this.activationDate2 = (date.getTime()) ; //时间戳
      console.log('change3', value)
    },
  },
  beforeRouteLeave (to, from, next) {
    let path = to.path;
    if(path == "/business/handleBase/handleInfo"){
      this.$emit('calculatePage')
    }
    next(true);
  },
  watch: {
    choiceindex (val) {
      console.log('val',val)
      this.$session.set('styleIndex', val)
      this.$session.remove('ChooseNum')
      // this.ICCID = ''
      // this.isShowICCID = false
    },
    imessage1 (val) {
       console.log('val',val)
       this.telNum = val
    },
    imessage3 (val) {
       console.log('val',val)
       this.cardNum= val
    },
    imessage4 (val) {
       console.log('val',val)
       this.ICCID= val
    },
     imessage6 (val) {
       console.log('val',val)
       this.xICCID= val
    },
    simImgObj(val) {
      this.simImgUrl = val.imageUrl;
    },
  },
  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})

     this.$jb.js2webview({//标题
      type: 5,
      title: "選擇號碼"
    })

    // if (!(this.linkParam && this.linkParam.orderId && this.linkParam.orderId != "")) {
    //   console.log("hhh")
    //   this.registerOrderInfo()
    // }
    this.getDictionaries()
    this.getPhonePage(this.NumType,"");

  },
  beforeDestroy(){
    this.$session.remove('styleIndex')
  },
}
</script>

<style lang = 'less' scoped>
 @import '~@/assets/less/theme.less';
.select-phone {
  background: #fff;
}
h3 {
  padding: 0.18rem .44rem;
  margin-top: .22rem;
  height: .72rem;
  font-size: .28rem;
  color: #333333;
  /* padding-top: .22rem; */
  display: flex;
  align-items: center;
  background: #fff;
  i {
    display: block;
    width: .36rem;
    height: .36rem;
    background: url('~@/assets/images/resource/work_way@2x.png') center center no-repeat;
    background-size: 0.36rem auto;
  }
}
.vpInputRadio {
  margin: 0 .44rem;
  border-bottom: 0.01rem solid @border-color;
  border-top: 0.01rem solid @border-color;
  background: #fff;
}
.selectWrap {
  background: #fff;
}
section{
  padding: 0 .44rem;
  padding-top: 0.22rem;
}
.sectionOne {
  padding-bottom: .36rem;
  background: #fff;
  .search {
    /* width: 6.6rem; */
    width: 100%;
    height: .72rem;
    background: #F4F4F4;
    border-radius: .04rem;
    /* margin-top: .3rem; */
    margin-bottom: .2rem;
    padding-left: .6rem;
    position: relative;
    i {
      display: block;
      width: .36rem;
      height: .36rem;
      background: url('~@/assets/images/resource/topbar_search@2x.png') center center no-repeat;
      background-size: 0.36rem auto;
      position: absolute;
      top: .18rem;
      left: .16rem;
    }
    form {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: .04rem;
      background: #F4F4F4;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: .04rem;
      background: #F4F4F4;
    }
  }
  .phone-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 2.94rem;
      height: .62rem;
      border: .01rem solid #666666;
      border-radius: .02rem;
      margin-top: .2rem;
      text-align: center;
      line-height: .62rem;
      position: relative;
    }
    li.active {
       border: .01rem solid @theme;
       color: @theme;
    }
    li.active:after {
        position: absolute;
        content: '';
        height: .24rem;
        width: 0.24rem;
        background: url('~@/assets/images/resource/number_select@2x.png') center center no-repeat;
        background-size: 0.24rem auto;
        right: 0;
        bottom: 0;
     }
  }
  .change {
    font-size: .28rem;
    color: @theme;
    line-height: .22rem;
    padding-top: .40rem;
    padding-bottom: .28rem;
    text-align: center;
    border-bottom: 1px solid #E9E9E9;
  }

}
.selectDate {
    width: 100%;
    height: .9rem;
    margin-top: .41rem;
    box-sizing: border-box;
    padding: 0rem .56rem 0rem .23rem;
    position: relative;
    background: #F4F4F4;
    border-radius: .04rem;
    i {
      display: block;
      width: .36rem;
      height: .36rem;
      background: url('~@/assets/images/resource/work_dates@2x.png') center center no-repeat;
      background-size: 0.36rem auto;
      position: absolute;
      top: 50%;
      margin-top: -.18rem;
      right: .2rem;
    }
    i.simIcon {
      display: block;
      width: .36rem;
      height: .36rem;
      background: url('~@/assets/images/resource/all_rightarrow@3x.png') center center no-repeat;
      background-size: 0.36rem auto;
      position: absolute;
      top: 50%;
      margin-top: -.18rem;
      right: .2rem;
    }
    div {
      height: 100%;
      width: 100%;
    }
  }
  .sectionTwo .selectDate, .sectionThree .selectDate{
    margin-top: 0;
    background:#fff;
    padding-left: 1.65rem;
    /* display: flex;
    align-items: center; */
    position: relative;
    i {

    }
  }
 .operatorWrap {
    /* padding-right: 0; */
    white-space: nowrap;
    overflow: auto;
  }
  .sectionTwo .turnDate,.sectionThree .turnDate {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 0.9rem;
    font-size: 0.28rem;
    color: #666;
    display: block;
    background: #fff;
    z-index: 1;
    width: 1.4rem;
    padding-right: .25rem;
    box-sizing: content-box;
  }
  .sectionTwo, .sectionThree {
     .selectDate::after{
      content: " ";
      position: absolute;
      left: 0;
      bottom: .2rem;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
   }
  }
  .sectionTwo,.sectionThree {
    padding: 0;
    background: #F4F4F4;
  }
 .messageWrap {
      padding: 0 .44rem;
      background: #fff;
      padding-top: .16rem
  }
.slectRight {
  flex: 1;
}
.btn-wrap {
  height: .9rem;
  width: 100%;
  background: #fff;
  display: flex;
  /* padding-left: 1.39rem; */
  padding-left:.44rem;
  justify-content: space-between;
  align-self: flex-end;
  justify-content: flex-end;
  .btn {
    width: 2.64rem;
    height: 100%;
    color: #fff;
    font-size: .3rem;
    background: @theme;
    text-align: center;
    line-height: .9rem;
  }
  span{
    display: block;
    flex: 1;
    font-size: .28rem;
    color: #333333;
    text-align: left;
    line-height: .9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
.label {
  width: 1.4rem;
  margin-right: .25rem;
}
.section-img {
  padding: 0;
}
.section-img .vp-update {
  padding: 0;
}
.section-img .vp-update  .message-title {
  margin-left: 0;
}

</style>
