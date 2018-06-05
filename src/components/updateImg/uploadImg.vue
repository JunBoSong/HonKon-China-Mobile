// 上传多张图片
<template>
  <div class="upload">
    <div class="message-title">{{message}}</div>
    <div class="upload-img-wrap">
      <div class="upload-img-item" v-for="(item,index) in imgObjs" :key="index">
        <img class="upload-img" v-if="!item.imgBase64" :src="require('@/assets/images/work_upload.png')">
        <img class="upload-img-uploaded" v-else :src="item.imgBase64">
        <img @click="deleteItem(index)" v-if="item.imgBase64" :src="require('@/assets/images/common_close@2x.png')" class="upload-img-close">
        <input v-if="!item.imgBase64" class="upload-file" type="file" name="image" @change="preview($event)">
      </div>
    </div>
  </div>
</template>


<script type = 'text/javascript'>
import vpFlowMessage from "../flow/flow-message";
import axios from "axios";
export default {
  components: {
    vpFlowMessage
  },
  props: {
    message: {
      type: String,
      default: ""
    },
    limit: {
      //图片上传张数
      type: Number,
      default: 3
    }
  },
  methods: {
    deleteItem(index) {
      this.imgObjs.splice(index, 1);
      let l = this.imgObjs.length;
      if (l == this.limit - 1 && this.imgObjs[l - 1].imgBase64.length > 0) {
        this.imgObjs.push({
          imgBase64: "" //用于展示
        });
      }
      this.sendUploadResult();
    },
    sendUploadResult() {
      let l = this.imgObjs.length;
      if (!this.imgObjs[l - 1].imgBase64) {
        let t =  this.$deepcopy(this.imgObjs);
        t.pop();
        this.$emit("imgUploadResult", t);
      } else {
        this.$emit("imgUploadResult", this.imgObjs);
      }
    },
    async preview(event) {
      //打开文件夹，查找图片
      let files = event.target.files || event.dataTransfer.files;
      let uploadFiles = event.currentTarget.files[0];
      if (!files.length) return;
      let file = event.target.files[0];
      this.uploadImag(file, file.name);
    },
    async uploadImag(file, fileNmae) {
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let param = new FormData();
      param.append("fileData", file, fileNmae);
      let res = await axios.post("moses/upload/file/upload", param, config);
      if (res && res.returnCode == "1000") {
        let reader = new FileReader();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          // 读取base64用于本地展示
          _this.imgObjs.unshift({
            imgBase64: this.result,
            uploasResult: res.dataInfo
          });
          if (_this.imgObjs.length == _this.limit + 1) {
            _this.imgObjs.pop();
          }
          _this.sendUploadResult();
        };
       
      }
      return;
    }
  },
  data() {
    return {
      imgObjs: [
        {
          imgBase64: "" //用于展示
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.upload {
  .message-title {
    font-size: 0.28rem;
    color: #666;
    height: 0.64rem;
    line-height: 0.64rem;
  }
  .upload-img-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .upload-img-item {
      background: #f4f4f4;
      border-radius: 4px;
      width: 2rem;
      height: 2rem;
      flex: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      position: relative;
      .upload-img {
        width: 0.9rem;
      }
      .upload-img-close {
        position: absolute;
        width: 0.4rem;
        top: -0.18rem;
        right: -0.18rem;
      }
      .upload-file {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      .upload-img-uploaded {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
}
</style>
