<template>
  <div id="canvasBox" :style="getHorizontalStyle">
    <canvas></canvas>
    <div class="setting">
      <button class="setting-clear" @touchstart="clear" @mousedown="clear">重寫</button>
      <button @touchstart="download" @mousedown="download">完成</button>
    </div>
  </div>
</template>

<script>
// @submit 方法获取签名base64
import Draw from './drawer';
export default {
  name: 'canvas-draw',
  data() {
    return {
      degree: 90, // 屏幕整体旋转的角度, 可取 -90,90,180等值
      scope: [
        {
          value: 0,
          title: '正常'
        },
        {
          value: 90,
          title: '顺时针旋转90°'
        },
        {
          value: 180,
          title: '顺时针旋转180°'
        },
        {
          value: -90,
          title: '逆时针旋转90°'
        }
      ]
    };
  },
  components: {
    Draw
  },
  mounted() {
    this.canvasBox = document.getElementById('canvasBox');
    this.initCanvas();
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      console.log(height)
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center'
      };
    }
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    download() {
      console.log(this.draw.getPNGImage())
      this.$emit('submit', this.draw.getPNGImage())
      // this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
    upload(url) {
      const image = this.draw.getPNGImage();
      const blob = this.draw.dataURLtoBlob(image);

      // const url = '';
      const successCallback = (response) => {
        console.log(response);
      };
      const failureCallback = (error) => {
        console.log(error);
      };
      this.draw.upload(blob, url, successCallback, failureCallback);
    }
  }
};


</script>

<style>
#canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.setting {
  height: .9rem;
  font-size: 20px;
  user-select: none;
  display: flex;
}

.setting button {
  box-sizing: border-box;
  display: block;
  flex: 1;
  width: 50%;
  background-color: #f9f9f9;
  border: 0;
  outline: 0;
}

.setting .setting-clear {
  border-right: 1px solid #ddd;
}

canvas {
  flex: 1;
  cursor: crosshair;
  border-bottom: 1px dashed #ddd;
}
</style>
