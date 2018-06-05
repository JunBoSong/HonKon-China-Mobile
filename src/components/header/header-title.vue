<template>
  <div class="wrap">
      <h2 class="title vux-1px-b">
        <img class="icon-img" src="../../assets/images/resource/work_plan@2x.png" alt="">
          <span>服務計劃</span>
      </h2>
  </div>
</template>
<script>
export default {
  props:{
    title: String,
    imgsrc:String,
  }
}
</script>
<style lang = 'less' scoped>
@import '~vux/src/styles/1px.less';
.wrap{
  background: #fff;
}
    .title{
        height: 0.72rem;
        padding-left: 0.4rem;
        font-family: PingFangSC-Regular;
        font-size: 0.28rme;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.72rem;
        /* background: url('../../../assets/images/resource/work_plan@2x.png') no-repeat 0 0.18rem; */
        background-size: 0.36rem 0.36rem;
      &.vux-1px-b {
        &:after {
          .setBottomLine(#E9E9E9);
        }
      }
      .icon-img{
        height: 0.36rem;
        width: 0.36rem;
        position: relative;
        top: 0.09rem;
      }
    }
</style>
