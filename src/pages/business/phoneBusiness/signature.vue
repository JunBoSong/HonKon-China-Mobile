<template>
  <div>
  <vp-layout-page>

     
    <div class="footer vux-1px" slot="footer">
      这是页脚
    </div>
    
  </vp-layout-page>
  </div>
</template>
<script type = 'text/javascript'>
import { vpHeaderSort, vpLiGoods } from '@/components';
export default {
  components: {
    vpHeaderSort, vpLiGoods
  },
  data() {
    return {
    }
  },
  methods: {
    infinite() {
      console.log(3333)
    }
  }
}
</script>
<style lang = 'less' scoped>
  .footer{
    width: 100%;
    height: 100px;
    background: yellow;
  }
</style>