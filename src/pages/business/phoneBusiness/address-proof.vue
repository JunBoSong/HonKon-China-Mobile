<template>
  <div class="backup">
    <vp-layout-page>
     <!-- 候補上台登記地址證明 -->
     <div class="panel-title">
         <img :src = "require('@/assets/images/work_contract@2x.png')">
         <span >候補上台登記地址證明</span>
       </div>
    <vpInputMessage class="vpInputMessage"  v-model.trim="phone"  label="電話號碼" placeholder="請輸入電話號碼"/>
    <vpInputRadio v-model="way" class="vpInputRadio" :radioRequired="true" :list="styleData" label="候補方式"/>
    <vpUpdateImg class="vpUpdateImg" message="上載上台登記住址證明"  v-if="way === '1'"/>
    <vpInputMessage class="vpInputMessage" v-if="way === '2'"  v-model.trim="ussd"  label="ussd密碼" placeholder="請輸入ussd密碼"/>
    <section class="button">
      <vp-button content="提交申請" @click.native="commit"></vp-button>
    </section>
    </vp-layout-page>
  </div>
</template>

<script type = 'text/javascript'>
import { vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio,vpInputMessage} from '@/components';
export default {
  components: {
    vpHeaderSort,vpButton,vpUpdateImg,vpInputRadio,vpInputMessage
  },
  data() {
    return {
      phone:'',
      ussd: '',
      way: '1',
      styleData:[
        {
         name:"上傳上台登記地址證明",
         value:'1'
        },
        {
         name:"輸入ussd密码",
         value:'2'
        }]
    }
  },
  methods: {
    commit() { // 提交申请

    }
  },
}
</script>

<style lang = 'less' scoped>
.backup{
  background: #fff;
}
.vpInputRadio{
  padding: 0 @page-space;
  background: #fff;
}
.vpUpdateImg{
  background: #fff;
}
.vpInputMessage{
  background: #fff;
  padding: 0 @page-space;
}
.button{
  width: 6.6rem;
  margin-left: 0.45rem;
  height: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
</style>
