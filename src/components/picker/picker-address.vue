<template>
  <div>
      <popup-picker
            :show="showPopupPicker"
            :show-cell="false"
            :data="dataList"
            :columns="columns"
            v-model="addressValue"
            @on-hide ="showPopupPicker = false"
            @on-change = "onChange"
        ref="pickerAddress"></popup-picker>
  </div>
</template>
<script type = 'text/javascript'>
import { PopupPicker } from 'vux';
import addressList from '@/config/address-list.json'
  export default {
    props:{
      value: {
        type: Boolean,
        require: true
      },
      dataList:{
        type: Array
      },
      columns: {
        type: Number,
        default: 3
      }
    },
    components: {
      PopupPicker
    },
    data() {
      return {
        showPopupPicker: this.value,
        // addressData: addressList,
        addressValue: [],
      }
    },
    methods: {
        onChange(val) {
          // console.log(this.addressValue)
          // alert(val)
          if (this.dataList[0] instanceof Array) return this.$emit('on-change', val)
          console.log('onChange',val)
          const names = this.$refs.pickerAddress && this.$refs.pickerAddress.getNameValues();
          // console.log('names', names) 
          this.dataList.map((item, index) => {
            if (item.value == val[1] && item.parent == val[0]) {
              this.$emit('on-change', item)
            }
          })
        },
      },
      watch: {
        showPopupPicker(val){
          this.$emit('input',val)
        },
        value(val){
          this.showPopupPicker = val;
        }
      }
  }
</script>
<style lang = 'less' scoped>

</style>
