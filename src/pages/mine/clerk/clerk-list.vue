<template>
  <div>
    <vp-layout-page>
      <div slot='header'>
        <vp-header-page title='店員管理'>
          <p class="header-btn" slot="right-options" @click="$router.push({name: 'mineClerkAdd'})"><span class="child-vertical-middle">添加</span></p>
        </vp-header-page>
        <div class="header-nav">
          <p class="nav-btn" @click="showNavList = !showNavList"></p>
          <div class="nav-box">
            <p class="nav-cur row-ellipsis">{{curNavVal}}</p>
            <ul class="nav-list" :class="{'active': showNavList}">
              <li class="nav-item row-ellipsis border-b" @click="selectNav(item)" v-for="(item, index) in navList" :key="index">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="header-title border-b">
          <div class="title-item" @click="titleTabHandler(1)">姓名</div>
          <div class="title-item" :class="titleTabTop.pay ? 'top' : 'bottom'" @click="titleTabHandler('pay')">
            <span class="text">繳費</span>
            <div class="trangle-box">
              <i class="trangle-top"></i>
              <i class="trangle-bottom"></i>
            </div>
          </div>
          <div class="title-item" :class="titleTabTop.increment ? 'top' : 'bottom'" @click="titleTabHandler('increment')">
            <span class="text">增值</span>
            <div class="trangle-box">
              <i class="trangle-top active"></i>
              <i class="trangle-bottom"></i>
            </div>
          </div>
          <div class="title-item" :class="titleTabTop.newUser ? 'top' : 'bottom'" @click="titleTabHandler('newUser')">
            <span class="text">新開台</span>
            <div class="trangle-box">
              <i class="trangle-top active"></i>
              <i class="trangle-bottom"></i>
            </div>
          </div>
        </div>
      </div>
      <ul class="content-list">
        <li class="list-item" v-for="item in 100" @click="$router.push({name: 'mineClerkDetail'})">
          <p>吳亮</p>
          <p>100／10</p>
          <p>100／10</p>
          <p>100／10</p>
        </li>
       
      </ul>
      
    </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
  export default {
    data() {
      return {
        showNavList: false,
        navList: [{id: 1, name: '本月業務完成情況'}, {id: 2, name: '3月業務完成情況'}, {id: 3, name: '全部業務完成情況'}, {id: 4, name: '全年業務完成情況'}],
        curNavVal: '',
        titleTabTop: {
          pay: true,
          increment: true,
          newUser: true
        }
      }
    },
    created() {
      this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
    },
    methods: {
      selectNav(data) {
        this.curNavVal = data.name;
        this.showNavList = false;
      },
      titleTabHandler(type) {
        this.titleTabTop[type] = !this.titleTabTop[type]
      }
    }
  }
</script>
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
  .header-btn {
    height: 100%;
    text-align: center;
  }
  .header-nav {
    display: flex;
    height: 1rem;
    padding: 0.15rem 0.46rem;
    background: #fff;
    .nav-btn {
      position: relative;
      width: 0.65rem;
      height: 0.72rem;
      border-right: 0.01rem solid @border-color;
      background: @theme-bg;
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-left: 0.11rem solid transparent;
        border-right: 0.11rem solid transparent;
        border-top: 0.18rem solid #d8d8d8;
      }
    }
    .nav-box {
      flex: 1 1 auto;
      background: @theme-bg;
      .nav-cur {
        height: 0.72rem;
        line-height: 0.72rem;
        padding: 0 0.3rem;
        font-size: 0.28rem;
        color: #333;
      }
    }
    .nav-list {
      position: relative;
      z-index: 100;
      height: 0;
      background: #fff;
      box-shadow: 0 .02rem .08rem 0 rgba(0,0,0,0.18);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      transition: height 0.2s;
      &.active {
        height: 2.8rem;
      }
      .nav-item {
        line-height: 0.7rem;
        padding: 0 0.3rem;
        font-size: 0.26rem;
        color: #666;
      }
    }
  }
  .header-title {
    display: flex;
    height: 0.88rem;
     margin-top: 0.22rem;
    font-size: 0.26rem;
    color: #666;
    background: #fff;
    .title-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      .trangle-box {
        height: 0.28rem;
        margin-left: 0.08rem;
        .trangle-top {
          display: block;
          width: 0;
          height: 0;
          border-left: 0.08rem solid transparent;
          border-right: 0.08rem solid transparent;
          border-bottom: 0.12rem solid @border-color;
        }
        .trangle-bottom {
          display: block;
          width: 0;
          height: 0;
          margin-top: 0.04rem;
          border-left: 0.08rem solid transparent;
          border-right: 0.08rem solid transparent;
          border-top: 0.12rem solid @border-color;
        }
      }
      &.top {
        .trangle-top{
          border-bottom: 0.12rem solid @theme-secondary;          
        }
      }
      &.bottom {
        .trangle-bottom{
          border-top: 0.12rem solid @theme-secondary;          
        }
      }
    }

  }
  .content-list {
    .list-item {
      display: flex;
      p {
        flex: 1 1 0;
        text-align: center;
        line-height: 0.76rem;
      }
      &:nth-child(even) {
        background: #fff;
      }
    }
  }
</style>