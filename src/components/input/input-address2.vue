<template>
  <!-- 地址组件模块 -->
  <section>
    <vp-input-search v-model="searchVal" :result="searchResult" @submit="submitSearch" @select="selectHandler" placeholder="輸入地址信息搜索"/>
    <vp-input-message label="區域&地區" placeholder="請選擇區域&地區" :value="`${addressObj.areaTcResult || ''}${addressObj.districtTcResult || ''}`" label-width="1.4rem" icon="editor" :readonly="true"
    @click.native="togglePopup"/>
    <!-- <vp-input-message label="街道名稱" placeholder="請輸入街道名稱" v-model="addressObj.streetTcResult" label-width="1.4rem" /> -->

    <div class="slectRight">
        <group>
          <popup-picker :data="list1" v-model="addressObj.streetTcResult"  :placeholder="('請選擇區域&地區')" @on-change="change1" ></popup-picker>
        </group>
      </div>

    <!-- <vp-input-message label="屋苑名稱" placeholder="請輸入屋苑名稱" v-model="addressObj.estateTcResult" label-width="1.4rem" /> -->
    <div class="slectRight">
        <group>
          <popup-picker :data="list2" v-model="addressObj.estateTcResult"  :placeholder="('請輸入屋苑名稱')" @on-change="change2" ></popup-picker>
        </group>
      </div>


    <!-- <vp-input-message label="大廈名稱" placeholder="請輸入大廈名稱" v-model="addressObj.bldgTcResult" label-width="1.4rem" /> -->
     <div class="slectRight">
        <group>
          <popup-picker :data="list3" v-model="addressObj.bldgTcResult"  :placeholder="('請輸入大廈名稱')" @on-change="change3" ></popup-picker>
        </group>
      </div>

    <vp-input-message label="大廈座數" placeholder="請輸入大廈座數" v-model="addressObj.bldgTcNum" label-width="1.4rem" />
    <vp-input-message label="層數/樓" placeholder="請輸入層數/樓" v-model="addressObj.floor" label-width="1.4rem" />
    <vp-input-message label="室/單位" placeholder="請輸入室/單位" v-model="addressObj.door" label-width="1.4rem" />
    <div class="send-time">
      <h5>送貨時間: </h5>
      <p>星期一至五(上午九時至晚上六時)及星期六(上午九時至下午一時)</p>
    </div>
    <div class="add">
      <div class="tips">
        注意：一般情況下產品將會透過指定速遞公司或香港郵政於訂購後1-2個工作天內寄送到客戶的送貨地址，恕不送貨至港鐵站、郵政信箱、馬灣、赤鱲角(包括香港赤國際機場) 、香港迪士尼樂園、愉景灣、昂平360、長洲、大嶼山、梅窩、大澳、坪洲、南丫島、沙頭角、落馬洲地區。
      </div>
    </div>
    <vp-picker-address v-model="showPopupPicker" @on-change="pickerAddress"/>

  </section>
</template>

<script type='text/javascript'>
  import vpInputMessage from '../input/input-message';
  import vpInputSearch from '../input/input-search';
  import vpPickerAddress from '../picker/picker-address';
  import addressList from '@/config/address-list.json'
import { Group,PopupPicker } from 'vux'
  export default {
    props: {
      value: {
        type: Object,
        default: ()=> { //默认必须有这些值
          return {
            areaTcResult: '', //區域
            areaId: '', //區域id
            districtTcResult: '', //地區
            districtId: '', //地區id
            streetTcResult: '', //街道名稱
            estateTcResult: '', //屋苑名稱
            bldgTcResult: '', //大廈名稱
            bldgTcNum: '', //座數
            floor: '', //層數/樓
            door: '' //室/單位
          }
        }
      },
    },
    components: {
      vpPickerAddress,
      vpInputMessage,
      vpInputSearch,
      Group,
      PopupPicker
    },
    data() {
      return {
        showPopupPicker: false, //显示、隐藏选择地址的piker
        searchVal: '', //搜索的值
        addressList: addressList,//地址列表（本地）
        addressListParent: addressList.filter(item => !item.parent), //一级地址
        addressListChild: addressList.filter(item => item.parent), //二级地址
        addressObj: this.value, //当前地址数据
        searchResult: [], //搜索的结果
        list1:[],
        list2:[],
        list3:[],
        sdistrictTcResult :'', //
        valueI:'',
        valueII:'',
        valueIII:''
      }
    },

    created() {

    },
    methods: {
      async submitSearch(val) {
        const res = await this.$post('address/search', {"wd": val})
        if(!res || !res.records.length) return this.$vux.toast.text(res.message)
        let arr = res.records;
        for (let item of arr) {
          item.name = item.areaTcResult + item.districtTcResult + item.streetTcResult + item.estateTcResult + item.bldgTcResult
        }
        this.searchResult = arr
      },
      async submitSearchII(val,type) {
        const res = await this.$post('address/search', {"wd": val})
        if(!res || !res.records.length) return this.$vux.toast.text(res.message)
        let arr = res.records;
        // for (let item of arr) {
        //   item.name = item.areaTcResult + item.districtTcResult + item.streetTcResult + item.estateTcResult + item.bldgTcResult
        // }
        // this.searchResult = arr
      if (type == 1) {
          this.list1 = []
          let sarr = []
          arr.map((item)=>{
              sarr.push(item.streetTcResult)
            })
          let newSarr = Array.from(new Set(sarr))
          if(newSarr != "") {
            this.list1.push(newSarr)
          }
          console.log('this.list1',this.list1)
      }
      if(type == 2) {
           this.list2 = []
            let sarr2 = []
            arr.map((item)=>{
                sarr2.push(item.estateTcResult)
              })
            let newSarr2 = Array.from(new Set(sarr2))
            if (newSarr2 != ""){
               this.list2.push(newSarr2)
            }
            console.log('this.list2',this.list2)
      }
      if(type == 3) {
           this.list3 = []
            let sarr3 = []
            arr.map((item)=>{
                sarr3.push(item.bldgTcResult)
              })
            let newSarr3 = Array.from(new Set(sarr3))
            if (newSarr3 != ""){
               this.list3.push(newSarr3)
            }
            console.log('this.list3',this.list3)
      }
        // console.log('this.searchResult',this.searchResult)
      },
      togglePopup() {
        this.showPopupPicker = true
      },
      selectHandler(val) {
        this.searchVal = val.name;
        this.addressObj = val;
      },
      pickerAddress(val) {
        this.addressObj = val;
      },
      change1 (value) {
        console.log('value',value) ///["嘉禾街"]
        // this.addressObj.streetTcResult = value[0]
        this.valueI = value

        this.valueII = []
        this.valueIII =[]
      },
      change2 (value) {
        console.log('value2',value) ///["嘉和大廈"]
        this.valueII = value
        // this.addressObj.streetTcResult = value[0]
        this.valueIII =[]
      },
      change3 (value){
         this.valueIII = value
        console.log('value3',value)
      }
    },
    watch: {
      addressObj(val) {

        console.log('addressObj=',val);
        this.$emit('input', val);

        this.submitSearchII(val.districtTcResult,1)  //用地区搜索街道
        // this.sdistrictTcResult = val.districtTcResult
      },
      valueI(val) {

        this.valueII = []
        this.valueIII =[]

        console.log('vvvvvvvvvvv1',val)
        this.submitSearchII(val[0],2)
        this.submitSearchII(val[0],3)

      },
       valueII(val) {
         this.valueIII =[]
        console.log('vvvvvvvvvvv2',val)
        // if (val == '') {
        //   this.submitSearchII(this.valueII[0],3)
        // } else {
        //    this.submitSearchII(this.valueI[0] + this.valueII[0],3)
        // }

      },
        valueIII(val) {
        console.log('vvvvvvvvvvv3',val)
      },
      // valueIV(val) {
      //   console.log('vvvvvvvvvvv4',val)
      // },
      value(val) {
        this.addressObj = val;
      },
      searchVal(val) {
        this.searchResult = []
      }
    }

  }

</script>

<style lang='less' scoped>
  section {
    margin-top: 0.22rem;
    background: white;
    .sub-message {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 0 @page-space;
      .sub-input1 {
        width: 2.0rem;
      }
      .sub-input2 {
        width: 2.6rem;
      }
      .sub-input3 {
        width: 2.3rem;
      }
    }
    .send-time {
      display: flex;
      padding: 0.2rem 0.24rem 0.1rem;
      background: #fff;
      font-size: 0.24rem;
      color: #888;
      p {
        flex: 1;
        margin-left: 0.2rem;
      }
    }
    .add {

      padding:0.1rem 0.24rem;
      background: @theme-bg;
      .tips {
        margin-top: 0;
        // background: @theme-bg;
      }
    }
  }

</style>
