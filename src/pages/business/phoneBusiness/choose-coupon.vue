<template>
  <div>
    <vp-layout-page>
      <vpFlowStatus :page='2'></vpFlowStatus>
      <!-- 上載上台登記地址證明 -->
      <section>
        <div class="panel-title">
          <img :src="require('@/assets/images/resource/work_discount@2x.png')">
          <span>優惠</span>
        </div>
        <vpInputRadio v-model="selectDiscount" class="vpInputRadio" :list="preferentialData" type="checkbox" direction="column" />
        <div class="more-coupon">
          <input type="text" v-model="moreOferId" placeholder="請輸入更多優惠碼">
        </div>
        <vpUploadImg class="upload-img" message="上載其它證明圖像" :limit=5 @imgUploadResult="imgUploadResult" />
      </section>
      <!-- 底部按钮 -->
      <div class="page-btns" slot="footer">
        <vp-button content="下一步，確認信息" @click.native="next"></vp-button>
      </div>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import {
  vpHeaderSort,
  vpButton,
  vpUploadImg,
  vpInputRadio,
  vpFlowStatus
} from "@/components";
export default {
  components: {
    vpHeaderSort,
    vpButton,
    vpUploadImg,
    vpInputRadio,
    vpFlowStatus
  },
  data() {
    return {
      value: "",
      preferentialData: [],
      imgUploaded: [], //图片的上传结果
      moreOferId: "", //输入更多优惠码
      deliverParams: {},
      selectDiscount: [],
      allDiscountInfoList: [], //总的优惠信息
      discountInfoList: [] //选择中的优惠信息
    };
  },
  created() {
    this.$jb.webview2js(params => {
      params.type == 1 && this.$router.go(-1);
    });
    this.deliverParams = this.$route.query;

    this.getSession();
  },
  methods: {
    next() {
      this.commitDiscount();
    },
    imgUploadResult(result) {
      let _this = this;
      result.forEach(function(item, index) {
        let obj = {
          picName: item.uploasResult.fileId,
          picUrl: item.uploasResult.url
        };
        _this.imgUploaded.push(obj);
      });
    },
    /**
     * 获取缓存
     */
    getSession() {
      //获取缓存的优惠信息
      this.allDiscountInfoList = this.$session.get("discountInfoList");
      let arr = [];
      this.allDiscountInfoList.forEach((item, index) => {
        arr.push({
          name: item.offerDesc,
          offerId: item.offerId
        });
      });
      this.preferentialData = arr; //用于界面展示和选择
    },
    /**
     * 提交优惠
     */
    async commitDiscount() {
      console.log(this.selectDiscount)
      // if (this.selectDiscount.length == 0) {
      //   return this.$vux.toast.text("請先選擇優惠");
      // }
      const arr = this.selectDiscount.map((item, index) => {
        return {offerId: item.offerId}
      })
      if (this.moreOferId && this.moreOferId != '') {
        arr.push({
          offerId: this.moreOferId
        });
      }

      let params = {
        discountInfoList: arr,
        discountProvePicList: this.imgUploaded,
        id: this.deliverParams.orderId
      };
      Object.assign(params,{
        userId:this.$client.userid
      });
      debugger
      console.log("params=", JSON.stringify(params));
      const res = await this.$post("business/commitDiscount", params);
      if (res && res.returnCode == 1000) {
        this.$router.push({ name: "confirmingInfo",query:{orderId:this.deliverParams.orderId} });
      }
    }
  },
  watch: {
    // selectDiscount(val) {
    //   //优惠被選擇
    //   let length = this.discountInfoList.length;
    //   this.discountInfoList.splice(0, length); //清空数组
    //   if (val instanceof Array && val.length > 0) {
    //     for (let item in val) {
    //       let obj = this.allDiscountInfoList[item];
    //       this.discountInfoList.push({
    //         offerId: obj.offerId
    //       });
    //     }
    //   }
    // }
  }
};
</script>

<style lang = 'less' scoped>
section {
  margin-top: 0.22rem;
  background: white;
  padding-bottom: 0.22rem;
}
.vpInputRadio {
  padding: 0 @page-space;
}
.button {
  width: 6.6rem;
  margin-left: 0.45rem;
  height: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.more-coupon {
  padding: 0.1rem 0.44rem;
  input {
    background: #f4f4f4;
    border-radius: 4px;
    width: 100%;
    border: none;
    height: 0.72rem;
    padding: 0 0.2rem;
    font-size: 0.28rem;
    color: #999999;
  }
}
.upload-img {
  padding: 0 @page-space;
}
</style>
