<template>
<transition>
  <div class="dialog-wrapper" v-if="show">
    <div class="dialog-title" v-if="title" v-html="title"></div>
    <div class="dialog-content" v-html="content"></div>
    <div class="dialog-btns" ref="success" v-if="buttons.length">
      <a href="javascript:" 
      class="dialog-btns-item"
       v-for="(item, index) in buttons" 
       :key="index"
       @click="callback(index)" 
       >{{item}}</a>
    </div>
  </div>
  
</transition>
</template>
<script type='text/javascript'>
  export default {
    props: {
      type: {
        type: Number,
        default: 1
      },
      shade: {
        type: Boolean,
        default: true
      },
      shadeClose: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      btns: {
        type: Array | String,
        default: ''
      },
      btnsCallback: {
        type: Function,
        default: () => {
          console.log('succes')
        }
      },
    },
    data() {
      return {
        show: true
      }
    },
    computed: {
      buttons() {
        const b = this.btns;
        return typeof b === 'string' ? [b] : b;
      }
    },
    created() {

    },
    methods: {
      callback(index) {
        this.show = false;
        this.btnsCallback(index);
      }
    },
  }

</script>
<style lang='less' scoped>
  .dialog-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10000;
    transform: translate(-50%, -50%);
    width: 6rem;
    text-align: center;
    overflow: hidden;
    border-radius: 2px;
    background: #fff;
    .dialog-title {
      margin: 30px 16px 0;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
    }
    .dialog-content {
      margin: 16px 0;
      padding: 0 16px;
      text-align: center;
      color: #666;
      font-size: 14px;
      line-height: 22px;
    }
    .dialog-btns {
      display: flex;
      height: 1rem;
      border-top: 0.01rem solid #ebebeb;
      .dialog-btns-item {
        flex: 1;
        line-height: 1rem;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        background: #fff;
        color: #999;
        &:last-child {
          border-left: 0.01rem solid #ebebeb;
          color: #fc9153;
        }
      }
    }
    
  }

</style>
