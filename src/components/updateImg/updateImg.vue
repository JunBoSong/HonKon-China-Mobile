<template>
  <div class="vp-update">
    <span class="message-title">{{message}}</span>
    <div class="img-wrap">
      <img v-if="!showImg" :src="require('@/assets/images/common_upload@2x.png')">
      <img v-else :src="showImg">
      <input class="file" type="file" name="image" @change="preview($event)">
    </div>
    <vpFlowMessage class="flow-message" message="最大上傳圖片體積為2MB, 支援jpg, gif, pdf 或 png格式" />
  </div>
</template>
<script type = 'text/javascript'>
import vpFlowMessage from "../flow/flow-message";
import axios from 'axios'
export default {
  components: {
    vpFlowMessage
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          imageUrl: "",
        };
      }
    },
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      resultObj: this.value,
      showImg: null,
    };
  },
  methods: {
    async preview(event) {
      //打开文件夹，查找图片
      let files = event.target.files || event.dataTransfer.files;
      // let uploadFiles = event.currentTarget.files[0];
      if (!files.length) return;
      let config = { // 请求头
        headers: { "Content-Type": "multipart/form-data" }
      };
      // console.log(axios.defaults.baseURL)
      let file = event.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("fileData", file, file.name) // 添加文件
      let res = await axios.post("moses/upload/file/upload", param, config) // 上传图片
      if (res && res.returnCode != '1000') return event.target.value = null && event.target.reset()
      const newResultObj = this.$deepcopy(this.resultObj);
      newResultObj.imageUrl = `${axios.defaults.baseURL}/${res.dataInfo.fileId}`
      this.resultObj = newResultObj;
      let reader = new FileReader()
      let _this = this
      reader.readAsDataURL(file)
      reader.onload = function () { // 读取base64用于本地展示
        _this.showImg = this.result;
      }
    }
  },
  watch: {
    resultObj(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.resultObj = val;
    }
  }
};
</script>
<style lang = 'less' scoped>
.vp-update {
  display: flex;
  flex-direction: column;
  padding: 0 @page-space;
  height: 3.84rem;
  .message-title {
    margin-left: 0.1rem;
    font-size: 0.28rem;
    color: #666;
    height: 0.64rem;
    line-height: 0.64rem;
  }
  img {
    /* margin-left: 1.18rem; */
    width: 4.9rem;
    height: 2.42rem;
  }
  .flow-message {
    margin-top: 0.2rem;
  }
  .img-wrap {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 4.9rem;
    height: 2.42rem;
    .file {
      position: absolute;
      left: 0;
      top: 0;
      width: 4.9rem;
      height: 2.42rem;
      opacity: 0;
    }
  }
}
.select-phone .message-title {
  margin-left: 0 !important;
}
</style>
