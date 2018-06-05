<template>
  <div class="select-phone">
    <vp-layout-page>
      <div>
        <!-- 选择内地号码 -->
        <section class="sectionOne">
          <ul class="phone-list">
            <li v-for="(item,index) in phoneList" :key="index" :class="{active: index === phoneIndex}" @click="goSelectPhoneNumber(index,item)">{{item.phoneNo}}</li>
          </ul>
          <!-- <div class="change" @click="changeHandele()">換一批</div> -->
        </section>
      </div>
      <div slot="footer">
        <div class="btn-wrap">
          <span ><span v-show = " this.phoneSelect">已選：{{phoneSelect}}</span></span>
          <div class="btn" @click="confirmValid()">確定</div>
        </div>
      </div>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import config from '@/config';
import { Group, DatetimeRange,Datetime, XButton,PopupPicker } from 'vux'
import { vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio, vpFlowMessage, vpInputMessage} from '@/components';
export default {
  name:'selectInlandPhoneNumber',
  components: {
    vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio,vpFlowMessage, vpInputMessage,Group,DatetimeRange,Datetime,XButton,PopupPicker
  },
  data() {
    return {
        phoneIndex: -1, // 选中的电话花码index
        phoneSelect: "", // 选中的电话号码
        phoneList:[], // 电话号码分页结果
        pageNumber:1,
        resData:{}, //号码池分页查询res
    }
  },
  computed:{
    linkParam () {
      return this.$route.query
    }
  },
  methods: {
    goSelectPhoneNumber(index,item){ // 点击号码选择
      this.phoneIndex = index
      this.phoneSelect = item.phoneNo
    },
    async getPhoneNoReserve() { //号码预占
      const res = await this.$post("business/phoneNoReserve", {
        "phoneNo": this.phoneSelect,
        "orderNo": this.linkParam.orderId
      })
      if (res.returnCode == 1000) {
        if (this.linkParam.oldNumber) {
           this.getPhoneNoRelease() //号码释放
        } else{
           if (this.linkParam.phoneType == 1) {
                this.$session.set('ChinaPhone', this.phoneSelect) // 存中国号码
            }
              if (this.linkParam.phoneType == 2) {
                this.$session.set('aomenPhone', this.phoneSelect) // 存澳门号码
            }
            if (this.linkParam.phoneType == 3) {
                this.$session.set('inlandPhone', this.phoneSelect) // 存内地号码
            }
            this.$router.go(-1)
        }

      }
    },
    async getPhoneNoRelease() { //号码释放
      const res = await this.$post("business/phoneNoRelease", {
        "phoneNo": this.linkParam.oldNumber, //先前号码
        "orderNo": this.linkParam.orderId
      })
      if (res.returnCode == 1000) {
         if (this.linkParam.phoneType == 1) {
            this.$session.set('ChinaPhone', this.phoneSelect) // 存中国号码
        }
          if (this.linkParam.phoneType == 2) {
            this.$session.set('aomenPhone', this.phoneSelect) // 存澳门号码
        }
        if (this.linkParam.phoneType == 3) {
            this.$session.set('inlandPhone', this.phoneSelect) // 存内地号码
        }
         this.$router.go(-1)
      }
    },

    confirmValid () { // 点确定 （先预占号码，再号码释放）
      this.getPhoneNoReserve()
    },
    async getPhonePage(type) { //号码池分页查询，添加关键词number可以做号码筛选
      const res = await this.$post("business/phonePage", {
        	pageNumber: this.pageNumber,
          pageSize: 8,
          type: type,  // 类型(1:内地号码;2:带机上台号码;3集客号码;4澳门号码)
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
  },

  beforeRouteLeave (to, from, next) {
    let path = to.path;
    if(path == "/business/handleBase/handleInfo"){
      this.$emit('calculatePage')
    }
    next(true);
  },

  created() {
    this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    this.getPhonePage(this.linkParam.numberType); // 从链接上获取号码池类型
    //(1:内地号码;2:带机上台号码;3集客号码;4澳门号码)
    // this.getPhonePage(1);
  },
  beforeDestroy(){
    this.$session.remove('styleIndex')

  },

}
</script>

<style lang = 'less' scoped>
 @import '~@/assets/less/theme.less';
h3 {
  padding: 0 .44rem;
  height: .72rem;
  font-size: .28rem;
  color: #333333;
  padding-top: .22rem;
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
  background: #fff;
}
section{
  padding: 0 .44rem;
  padding-top: 0.22rem;
  /* background: white !important; */
}
.sectionOne {
  .search {
    width: 6.6rem;
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
       background: #fff
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
    height: .8rem;
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
      top: .2rem;
      right: .2rem;
    }
    div {
      height: 100%;
      width: 100%;
    }
  }

.slectRight {
  flex: 1;
}
.btn-wrap {
  height: .9rem;
  width: 100%;
  display: flex;
  padding-left: 1.39rem;
  justify-content: space-between;
  align-self: flex-end;
  background:#fff;
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
  }
}
.label {
  width: 1.4rem;
  margin-right: .25rem;
}
.select-phone .vp-message.flow-message {
  padding: 0 ;
  margin-top: .36rem;
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
