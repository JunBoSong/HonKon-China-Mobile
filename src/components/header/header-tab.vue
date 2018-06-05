<template>
  <div class="header-tab">
    <ul class="header-tab-box">
     <li 
     :class="['header-tab-item', {'active': curTabIndex === index}]" 
     @click="handler(item, index)" 
     v-for="(item, index) in tabs" 
     :key="index"
     >{{item.name || item}}</li> 
   </ul>
   <i class="indicator" :style="{left: indicatorLeft}"></i>
  </div>
   
</template>
<script type = 'text/javascript'>
  export default {
    props: {
      tabs: {
        type: Array,
        required: true
      },
      curTabIndex: Number
    },
    computed: {
      indicatorLeft() {
        const i = 100 / (this.tabs.length *2 );
        return (i * (this.curTabIndex + 1) + i * this.curTabIndex) +'%';
      }
    },
    methods: {
      handler(item, index) {
        this.$emit('on-item-click', item, index)
      }
    }
  }
</script>
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
@border-height: 0.06rem;
/* @border-width:  */
  .header-tab {
    position: relative;
    width: 100%;
    height: 0.84rem;
    background: #fff;
    .header-tab-box {
      display: flex;
      width: 100%;
      .header-tab-item {
        flex: 1;
        line-height: 0.84rem;
        transition: color 0.2s;
        text-align: center;
        font-size: 0.28rem;
        color: #666666;
        &.active {
          color: @theme-secondary;
        }
      }
    }
    .indicator {
      position: absolute;
      bottom: 0;
      transform: translateX(-50%);
      transition: left 0.2s;
      display: block;
      width: 0.7rem;
      height: @border-height;
      background: @theme-secondary;
    }
  }
</style>