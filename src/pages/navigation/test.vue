<template>
    <!-- <div class="bg" ref="bg" :style="{'background': `url(${bgUrl}) 0 0 no-repeat`}"></div> -->
    <div>
      <v-map ref="map"></v-map>
      <div>{{location}}</div>
      <button type="button" @click="getLocation">获取</button>
    </div>
</template>
<script type='text/javascript'>
import vMap from '@/components/dialog/map';
  export default {
    components: {
      vMap
    },
    data() {
      return {
        location: ''
      };
    },
    methods: {
      async getLocation() {
        const map = this.$refs.map;
        const res = await map.getCurrentPosition();
        this.location = `${res.latitude}   ${res.longitude}`
        const resParse1 = await map.mapParse('科技园金融基地2栋', '深圳市');
        const resParse2 = await map.mapParse('弘雅小学', '深圳市');
        console.log(resParse1);
        console.log(resParse2);
        // const resStringfy = await map.mapStringfy(resParse);
        // console.log(resStringfy);
        const resDis = await map.getDistance( resParse1, resParse2);
        console.log(resDis);
        
      },
      onFocus() {
        var inputTextBox = document.getElementById('box');
        setInterval(function(){
          inputTextBox.scrollIntoView(false);
        },200)
      },
      
    },
  };

</script>
<style lang='less' scoped>
.bg {
  width: 100%;
  height: 300px;
  // background: url('http://placehold.it/750x600');
  // background-size: 100% auto;
}
.content1 {
  height: 20%;
  background: brown;
}
.content2 {
  height: 30%;
  background: blanchedalmond;
}
.content3 {
  height: 30%;
  background: blueviolet;
}
.box {
  height: 0.5rem;
  border: 1px solid;
}
</style>
