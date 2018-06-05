<template>
<div style="height:100%">
  <router-view style="height:100%" ></router-view>
</div>
</template>
<script type='text/javascript'>

  export default {
    data() {
      return {
        preTarget: null,
        tot: null
      }
    },
    methods: {
      toLocal() {
        let firstClickTime = 0;
        let secondClickTime = 0;
        const query = location.hash.split('?')[1];
        document.body.addEventListener('touchend', (event) => {
          const nowTime = new Date().getTime();
          if (!firstClickTime) return firstClickTime = nowTime
          if (!secondClickTime) return secondClickTime = nowTime
          if (nowTime - firstClickTime < 1000) location.href = 'http://172.16.0.177:8080/#/?'+query
        }); 
      }
    },
    mounted() {
      console.log(1);
      
      // this.toLocal(); //點擊頁面任何地方三击就會跳轉到本地，用來調試
    },
  }

</script>
<style lang='less'>
@import '~vux/src/styles/1px.less';
</style>
