<template>
<vp-layout-page >
  <!-- <vp-layout-page :heightAuto='heightAuto' > -->
    <!-- <div class="conFlex"> -->
      <div class="content">
        <div class="contentFlex">
          <iframe ref="iframe" class="iframe" name="ifrmname" style="width:100%;height:100vh;" :src="src" frameborder="0"></iframe>
          <!-- <div v-show="canSee">
            <pdf ref="myPdfComponent" src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf>
          </div> -->
          <div class="contentBottom">
            <p class="vhCenter" v-show="!canSee">合约加载中....</p>
          <label v-show="canSee">
            <input ref="input" type="checkbox">已閱讀所有合約，并知曉簽名適用于以上合約
          </label>
        </div>
        </div>
      </div>
      <div class="threBtn" v-if="showBtn" slot="footer">
        <p class="cancel" @click="cancelQian">撤銷簽名</p>
        <p class="goQian" @click="goQian">客戶簽名</p>
        <p class="goNext" @click="goNext">提交保存</p>
      </div>
    <!-- </div> -->
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="layH" v-if="layShow">
        <canvasDraw @submit="submit" :heightAuto='heightAuto' v-if="layShow"></canvasDraw>
      </div>
    </transition>
  </vp-layout-page>
</template>

<script>
// 簽名組件
import axios from "axios";
import canvasDraw from "../../components/canvas/canvas-draw";
import time from '../../utils/time.js'
import pdf from 'vue-pdf'
import {base64UrlToBlob} from '@/utils/agImg'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      dataImg: "",
      dataInfo: {},
      contractFlag: [],
      layShow: false,
      num: 1,
      checked: false,
      showBtn: true,
      Imgurl: "",
      canSee:false,
      src:"",
      heightAuto: null,
      isNext: true,
    };
  },
  components: {
    canvasDraw,
    pdf
  },
  created() {

    this.$jb.webview2js((params) => {
      if (params.type == 1 ) {
        this.$refs.iframe.src = `${axios.defaults.baseURL}/umall/attachment/consumer/contract/electronicInvoice?registerId=${this.$route.query.registerId}&userId=${this.$client.userid}`

        this.$router.go(-1)
      }
    })
    this.src=`${axios.defaults.baseURL}/umall/attachment/consumer/contract/electronicInvoice?registerId=${this.$route.query.registerId}&userId=${this.$client.userid}`
  },
  mounted () {

   this.$refs.iframe.addEventListener('load',()=>{
     this.canSee = true
     this.$refs.iframe.removeEventListener( "load", arguments.call, false);
   },false)
    window.addEventListener('resize', function(params) {
      // if (oHeight > document.body.clientHeight) { //键盘弹出
      //     el.scrollIntoView(false);
      // }
      this.heightAuto = document.body.clientHeight + 50
      // alert(document.body.clientHeight)

    }, false);
  },
  methods: {
    goQian() {
      if (!this.$refs.input.checked) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "請閱讀所有合約后才能進行簽名"
        });
        return;
      }
      this.showBtn = false
      this.$jb.js2webview({type: 6, header: false})
      // this.heightAuto = document.documentElement.clientHeight || document.body.clientHeight
      this.contentShow = false;
      this.layShow = true;

    },
    submit(getPNGImage) {
      this.layShow = false;
      this.showBtn = true
      this.$jb.js2webview({type: 6, header: true})
      this.heightAuto = document.documentElement.clientHeight || document.body.clientHeight
      this.dataImg = getPNGImage;
      console.log(getPNGImage)
      this.uploadImg();
    },
    cancelQian() {
      this.$vux.loading.show()
      this.dataImg = ''
      this.$refs.iframe.src = `${axios.defaults.baseURL}/umall/attachment/consumer/contract/electronicInvoice?registerId=${this.$route.query.registerId}&userId=${this.$client.userid}`
      setTimeout(()=>{
        this.$vux.loading.hide()
      },500)
    },
    goNext() {
      const _this = this;
      if (!_this.isNext) return
      _this.isNext = false
      
      if (!_this.$refs.input.checked) {
        _this.isNext = true
        _this.$vux.alert.show({
          title: "溫馨提示",
          content: "請閱讀所有合約后才能提交保存"
        });
        return;
      }
      if (_this.dataImg == "") {
        _this.isNext = true
        _this.$vux.alert.show({
          title: "溫馨提示",
          content: "請進行簽名"
        });
        return;
      }
      _this.$vux.confirm.show({
        title: "溫馨提示",
        content: "確認提交電子合約?",
        onCancel() {
        },
        onConfirm() {
          _this.postGoNext();
        }
      });
    },
    async uploadImg() {

      let fileData = this.dataImg
      let config = { // 请求头
        headers: { "Content-Type": "multipart/form-data" }
      };
      let param = new FormData(); //创建form对象
      const blob = base64UrlToBlob(fileData) // 讲base64转化为 blob对象
      console.log(blob)

      // debugger
      param.append("fileData", blob, 'file_' + Date.parse(new Date()) + '.jpg') // 添加文件
      let res = await axios.post("moses/upload/file/upload", param, config)
      // let res = await this.$post("file/upload", str);

      if (res.returnCode == 1000) {
        const _this = this
        _this.Imgurl = res.dataInfo.url;
        window.localStorage.setItem('signImgPath',this.Imgurl)
        _this.$vux.loading.show()
        _this.$refs.iframe.src = `${axios.defaults.baseURL}/umall/attachment/consumer/contract/electronicInvoice?registerId=${this.$route.query.registerId}&userId=${this.$client.userid}&signImgPath=${this.Imgurl}`
        _this.$refs.iframe.addEventListener('load',()=>{
          _this.$vux.loading.hide()
          _this.$refs.iframe.removeEventListener( "load", arguments.call, false);
        },false)
        // this.$refs.iframe.onreadystatechange = function () {
        //   if (this.readyState && this.readyState != 'complete') {
        //   //alert("加载中。。。");
        //   } else {
        //     _this.$vux.loading.hide()
        //   }
        // }

      } else {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "簽名上傳異常，請重試"
        });
      }
      console.log(res);
    },
    async postGoNext () {
      let str = {
        "registerId": this.$route.query.registerId,
        "signImgPath":this.Imgurl,
        "htmlPath": this.src
      };
      let res = await this.$post("recharge/submitContract", str);

      if (res && res.returnCode == 1000) {
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "提交合約成功"
        })
        // alert(this.$route.query.name)
        if (!this.$route.query.name) {
          alert('獲取路由失敗')
        }
       try{
         this.$router.push({name:this.$route.query.name})
       } catch(err) {
         alert(`${err}路由跳轉失敗`)
       }
       setTimeout(() => {
         this.isNext = true
       }, 200)
      } else {
        this.isNext = true
        this.$vux.alert.show({
          title: "溫馨提示",
          content: "提交合約異常，請重試"
        });
      } 
    }
    // postGoNext(){
    //    axios({
    //       method: 'post',
    //       url:"http://172.16.0.61:11081/contract/submitContract",
    //       contentType:'application/json,charset=UTF-8',
    //       data:{
    //           "registerId": this.$route.query.registerId,
    //           "signImgPath":this.Imgurl,
    //           "htmlPath": this.src,
    //         }
    //     })
    //     .then((res) => {
    //       if (res.returnCode == 1000) {
    //           this.$router.push({name:this.$route.query.name})
    //       }
    //     });
    // }
  }
};
</script>

<style scoped>
.content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom:50px;
}
.threBtn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: flex;
  z-index: 2;
}
.threBtn p {
  flex: 1;
  color: #fff;
  cursor: pointer;
}
.cancel {
  background-color: #EEEEEE;
  color:#888888!important;
}
.goQian {
  background: #FFFFFF;
  color: #E52C79!important;
}
.goNext {
  background: #E52C79;
  color: #FFFFFF!important;
}
.layH {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 99;
}
.contentBottom {
  /* padding-bottom: 60px; */
   /* padding-bottom: .6rem; */
   height: .8rem;
   line-height: .6rem;
  width: 100%;
  text-align: center;
}
.contract {
  display: none;
}
.vhCenter{
  position:absolute;
  width:90%;
  margin: 0 auto;
  top:50%;
  transform:translate3d(0,-50%,0);
  text-align:center;
}
</style>
