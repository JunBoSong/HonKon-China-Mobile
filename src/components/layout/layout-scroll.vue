<template>
  <div class="layout-scroll">
    <div :id="scrollId || 'minirefresh'" class="minirefresh-wrap">
      <div class="minirefresh-scroll">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/javascript'>
  import MiniRefreshTools from 'minirefresh'; //http://www.minirefresh.com/minirefresh-doc/
  import 'minirefresh/dist/debug/minirefresh.css'
  export default {
    props: {
      down: Function,
      scrollId: String // 解决实例化id相同造成的冲突
    },
    data() {
      return {
        scrollTop: 0, //滚动位置
        minirefresh: null
      };
    },
    mounted() {
      const that = this;
      that.init()

      const scrollWrapper = document.getElementById(that.scrollId || 'minirefresh');
      scrollWrapper.addEventListener('scroll', that.savePosition);
    },
    methods: {
      savePosition() {//记录滚动位置
        const scrollWrapper = document.getElementById(this.scrollId || 'minirefresh');
        this.scrollTop = scrollWrapper.scrollTop;
      },
      init() {
        const self = this;
        // eslint-disable-next-line
        self.miniRefresh = new MiniRefresh({
          container: this.scrollId ? `#${this.scrollId}` : '#minirefresh',
          dampRate: 0,
          down: {
            isLock: true
          },
          up: {
            isAuto: true,
            callback() {
              // 上拉事件
              self.$emit('unEvent')
              // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            },
            // callback: self.up,
            loadFull: {
              isEnable: false,
              delay: 400
            }
          }
        });
      },
      triggerUpLoading() {
        this.miniRefresh.triggerUpLoading()
      },
      triggerDownLoading() {
        this.miniRefresh.triggerDownLoading()
      },
      endDownLoading(end) {
        this.miniRefresh.endDownLoading(end)
      },
      endUpLoading(end) {
        this.miniRefresh.endUpLoading(end)
      },
      resetUpLoading() {
        this.miniRefresh.resetUpLoading()
      }
    },
    activated() {//设置为记忆的滚动位置
      const that = this;
      const scrollWrapper = document.getElementById(that.scrollId || 'minirefresh');
      if (that.scrollTop > 0) {
        scrollWrapper.scrollTop = that.scrollTop
        that.scrollTop = 0;
      }
    },
  };

</script>
<style lang='less' scoped>
  @import '~@/assets/less/theme.less';
  /**
 * showcase通用样式
 */

  .layout-scroll {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  * {
    -webkit-user-select: none;
  }

  .minirefresh-scroll {
    background: @theme-bg;
  }

</style>
