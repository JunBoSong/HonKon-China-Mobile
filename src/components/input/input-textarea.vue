<template>
  <div class="vp-input-textarea">
    <h1 class="title">{{title}}</h1>
    <div class="content">
      <textarea class="textarea" 
      :autocomplete="autocomplete" 
      :autocapitalize="autocapitalize" 
      :placeholder="placeholder" 
      :readonly="readonly" 
      :name="name" 
      :rows="rows" 
      :cols="cols" 
      :spellcheck="false"
      v-model="currentValue" 
      @focus="$emit('on-focus')" 
      @blur="$emit('on-blur')" 
      :maxlength="max" ref="textarea"></textarea>
      <div class="counter" v-show="showCounter && max" @click="focus">
        <span>{{count}}</span>/{{max}}
      </div>

    </div>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props:{
    title: String,
    showCounter: {
      type: Boolean,
      default: true
    },
    max: Number,
    value: String,
    name: String,
    placeholder: String,
    readonly: Boolean,
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 30
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autosize: Boolean // prop.autosize
  },
  computed: {
    count () {
      let len = 0
      if (this.currentValue) {
        len = this.currentValue.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    }
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  methods: {
    focus () {
      this.$refs.textarea.focus()
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (newVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
      }
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    }
  },
}
</script>
<style lang = 'less' scoped>
.vp-input-textarea{
  position: relative;
   .title{
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.28rem;
      color: #666666;
    }
  .content{
    padding: 0.15rem 0.2rem;
    background: #F7F7F7;
    border-radius: 0.04rem;
    overflow: hidden;
    .textarea {
      width: 100%;
      font-size: 0.26rem;
      color: #888;
      border: none;
      background: none;
      resize:none;
    }
    .counter{
      text-align: right;
      color: #999;
    }
    
  }
 
}
</style>