<template>
    <flow class="flow-view">
        <flow-state state="1" title="基礎信息" :class="{'active': page == 0, 'greater': page > 0}"  :is-done = 'page >= 0'></flow-state>
        <flow-line :is-done = 'page >= 1'></flow-line>
        <flow-state state="2" title="上台資料" :class="{'active': page == 1 || page == 2, 'greater': page > 2}" :is-done = 'page ==1 || page ==2'></flow-state>
        <flow-line :is-done = 'page >= 2'></flow-line>
        <flow-state state="3" title="確認信息" :class="{'active': page == 3, 'greater': page > 3}"  :is-done = 'page >= 3'></flow-state>
        <flow-line :is-done = 'page >= 3'></flow-line>
        <flow-state state="4" title="簽名" :class="{'active': page == 4, 'greater': page > 4}" :is-done = 'page >= 4'></flow-state>
        <flow-line :is-done = 'page >= 4'></flow-line>
        <flow-state state="5" class="test" title="支付" :class="{'active': page == 5, 'greater': page > 5}" :is-done = 'page >= 5'></flow-state>
    </flow>
</template>

<script type = 'text/javascript'>
import { Flow, FlowState, FlowLine } from 'vux'
export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  props: {
    page: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  methods: {
   
  }
}
</script>
<style lang = 'less' scoped>
  .flow-view{
    background: white;
    padding: 0.3rem 40px 0.6rem 40px;
  }
  /* .active{
    background: #000;
  } */
</style>