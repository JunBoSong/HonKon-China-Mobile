<template>
    <button 
    type="button" 
    :style="`height:${height};line-height:${height}`"
    :class="['common-btn',color , styleClass, {'radius':radius,'disable':disable}]" 
    @click="clickAction">
          {{content}}
    </button>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
    }
  },
  methods: {
     clickAction(){
       if (this.disable) return;
         this.$emit('click')
     }
  },
  props:{
      height: String,
      color: {
        type: String,
        default: 'theme'  //theme-secondary  //theme
      },
      styleClass: {
        type: String, //solid  hollow 
        default: 'solid'
      },
      content:{
        type:String,
        required: true
      },
      radius:{
        type:Boolean,
        default:false
      },
      disable:{
        type:Boolean,
        default:false
      }

   }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/theme.less';
.common-btn{
    display: block;
    font-size: 0.28rem;
    line-height: 0.9rem;
    height: 0.9rem;
    text-align: center;
    width: 100%;

    &.theme.hollow {
      color: @theme;
      border: 1px solid @theme;
      background: #fff;
    }
    &.theme-secondary.hollow {
      color: @theme-secondary;
      border: 1px solid @theme-secondary;
      background: #fff;
    }
    &.theme.solid{
      color: white;
      border: none;
      background: @theme;
    }
    &.theme-secondary.solid{
      color: white;
      border: none;
      background: @theme-secondary;
    }
    &.radius{
      border-radius: 0.04rem;
    }
    &.disable{
      background:#ccc;
    }
}
</style>
