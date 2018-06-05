<template>
  <!-- 地址组件模块 -->
  <section>
    <vp-input-search v-model="searchVal" :result="searchResult" @submit="submitSearch" @select="selectHandler" placeholder="輸入地址信息搜索"/>
    <vp-input-message label="區域&地區" placeholder="請選擇區域&地區" :value="`${addressObj.areaTcResult || ''}${addressObj.districtTcResult || ''}`" label-width="1.4rem" icon="editor" :readonly="true"
    @click.native="togglePopup"/>
    <VpinputSearchAddress label="街道名稱" label-width="1.4rem" v-model="addressObj.streetTcResult" :result='streetResult' placeholder="請選擇街道名稱" @keyup='streetKeyup' @select='streetSelect' />
    <!-- <vp-input-message label="街道名稱" placeholder="請選擇街道名稱"  label-width="1.4rem" icon="editor" :readonly="true"
    @click.native="searchStreet"/> -->
    <!-- <vp-input-message label="屋苑名稱" placeholder="請選擇屋苑名稱" :value="addressObj.estateTcResult" label-width="1.4rem" icon="editor" :readonly="true"
    @click.native="searchEstate"/> -->
    <VpinputSearchAddress label="屋苑名稱" label-width="1.4rem" v-model="addressObj.estateTcResult" :isStreet='false' :result='estateResult' @select='estateSelect' @keyup='estateKeyup' placeholder="請選擇街道名稱"   />
    <!-- <vp-input-message label="大廈名稱" placeholder="請選擇大廈名稱" :value="addressObj.bldgTcResult" label-width="1.4rem" icon="editor" :readonly="true"
    @click.native="searchBldg"/> -->
    <!-- <vp-input-message label="街道名稱" placeholder="請輸入街道名稱" v-model="addressObj.streetTcResult" label-width="1.4rem" />
    <vp-input-message label="屋苑名稱" placeholder="請輸入屋苑名稱" v-model="addressObj.estateTcResult" label-width="1.4rem" />
    <vp-input-message label="大廈名稱" placeholder="請輸入大廈名稱" v-model="addressObj.bldgTcResult" label-width="1.4rem" /> -->
    <vp-input-message label="大廈名稱" placeholder="請輸入大廈名稱" v-model="addressObj.bldgTcResult" label-width="1.4rem" /> 
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
    <vp-picker-address v-model="showPopupPicker" :dataList='addressData' @on-change="pickerAddress"/>
    <vp-picker-address v-model="StreetPicker" :columns='1'  :dataList='StreetData' @on-change="StreetAddress"/>
    <vp-picker-address v-model="estatePicker" :columns='1'  :dataList='estate' @on-change="estateAddress"/>
    <vp-picker-address v-model="bldgPicker" :columns='1'  :dataList='bldg' @on-change="bldgAddress"/>
  </section>
</template>

<script type='text/javascript'>
  import vpInputMessage from '../input/input-message';
  import vpInputSearch from '../input/input-search';
  import vpPickerAddress from '../picker/picker-address';
  import VpinputSearchAddress from './input-search-address';
  import addressList from '@/config/address-list.json'
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
            door: '', //室/單位

          }
        }
      },
    },
    components: {
      vpPickerAddress,
      vpInputMessage,
      vpInputSearch,
      VpinputSearchAddress
    },
    data() {
      return {
        showPopupPicker: false, //显示、隐藏选择地址的piker
        StreetPicker: false, // 显示、隐藏选择地址的piker 街道
        estatePicker: false, // 显示、隐藏选择地址的piker 屋院
        bldgPicker: false, // 显示、隐藏选择地址的piker 大厦
        searchVal: '', //搜索的值
        addressList: addressList,//地址列表（本地）
        addressListParent: addressList.filter(item => !item.parent), //一级地址
        addressListChild: addressList.filter(item => item.parent), //二级地址
        addressObj: this.value, //当前地址数据
        searchResult: [], //搜索的结果
        addressData: [],
        StreetData: [], // 街道地址
        savaStreeDate: [], // 保存原有街道地址
        estate: [], // 屋院地址
        saveEstate: [], // 保存接口返回的地址
        bldg:[], // 大厦地址
        savaBldg:[], // 保存接口返回的地址
        timer: null,
        streetResult: null, // 街道地址選擇列表
        estateResult: null, // 屋院地址選擇列表
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
      async togglePopup() {
        if (this.addressData.length > 0) return this.showPopupPicker = true
        let res = await this.$post('address/maparea')
        if(!res || res.returnCode != 1000 || !res.records) return this.$vux.toast.text(res.message);
        let arr = [] // 地址parent
        let obj = {}
        let addressData = res.records.map((item, index) => {
          if (!obj[item.areaId]) {
            let _item = Object.assign({},item)
            obj[item.areaId] = 1
            // let {areaId, areaEnResult, areaScResult, areaTcResult} = item
            _item.parent = 0
            _item.value = _item.areaId
            _item.name = _item.areaTcResult
            arr.push(_item)
          }
          item.value = item.districtId
          item.parent = item.areaId
          item.name = item.districtTcResult
          return item
        })
        this.addressData =arr.concat(addressData)
        this.showPopupPicker = true
      },
      async streetKeyup(curValue) { // 街道搜索
        if (!this.addressObj.areaTcResult || this.addressObj.areaTcResult == '') {
          this.addressObj.streetTcResult = ''
          return this.$vux.alert.show({
            title: "溫馨提示",
            content: "請先選擇擇區域&地區"
          });
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$post('address/searchStreet', {
            areaId: this.addressObj.areaId,
            districtId: this.addressObj.districtId
          }).then(res => {
            if (res && res.returnCode == 1000) {
              this.streetResult = res.records 
            }
          })
        }, 500);
      },
      streetSelect(item) { // 街道地址選擇
        this.addressObj = item
      },
      // async searchStreet() { // 街道搜索
      //  if (this.StreetData.length > 0) return this.StreetPicker = true
      //   if (!this.addressObj.areaId) return this.$vux.alert.show({
      //     title: "溫馨提示",
      //     content: "請選擇區域&地區"
      //   })
      //   let res = await this.$post('address/searchStreet', {
      //     areaId: this.addressObj.areaId,
      //     districtId: this.addressObj.districtId
      //   })
      //   if(!res || res.returnCode != 1000 || !res.records) return this.$vux.toast.text(res.message);
      //   this.savaStreeDate = res.records
      //   let arr = []
      //   res.records.map((item, index) => {
      //     arr.push(item.streetTcResult)
      //   })
      //   this.StreetData.push(arr)
      //   this.StreetPicker = true
      // },
      // async searchEstate() { // 房屋搜索
      //   if (this.estate.length > 0) return this.estatePicker = true
      //   let res = await this.$post('address/searchEstate', {
      //     areaId: this.addressObj.areaId,
      //     districtId: this.addressObj.districtId,
      //     streetId: this.addressObj.streetId
      //   })
      //   if(!res || res.returnCode != 1000 || !res.records) return this.$vux.toast.text(res.message);
      //   this.saveEstate = res.records
      //   let arr = []
      //   res.records.map((item, index) => {
      //     console.log(item)
      //     arr.push(item.estateTcResult)
      //   })
      //   this.estatePicker = true
      //   this.estate.push(arr)
      // },
      async estateKeyup() { // 房屋搜索
        if (!this.addressObj.areaTcResult || this.addressObj.areaTcResult == '') {
          this.addressObj.estateTcResult = ''
          return this.$vux.alert.show({
            title: "溫馨提示",
            content: "請先選擇擇區域&地區"
          });
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$post('address/searchEstate', {
            areaId: this.addressObj.areaId,
            districtId: this.addressObj.districtId,
            streetId: this.addressObj.streetId
          }).then(res => {
            if (res && res.returnCode == 1000) {
              this.estateResult = res.records 
            }
          })
        }, 500);
      },
      estateSelect(item) { // 房屋地址搜索
        this.addressObj.estateTcResult = item.estateTcResult
      },
      async searchBldg() { // 大厦搜索
        if (this.bldg.length > 0) return this.bldgPicker = true
        let res = await this.$post('address/searchBldg', {
          areaId: this.addressObj.areaId,
          districtId: this.addressObj.districtId,
          streetId: this.addressObj.streetId,
          estateId: this.addressObj.estateId,
        })
        if(!res || res.returnCode != 1000 || !res.records) return this.$vux.toast.text(res.message);
        this.savaBldg = res.records
        let arr = []
        res.records.map((item, index) => {
          console.log(item)
          arr.push(item.estateTcResult)
        })
        this.bldgPicker = true
        this.bldg.push(arr)
      },
      selectHandler(val) {
        this.searchVal = val.name;
        this.addressObj = val;
      },
      pickerAddress(val) { // 区域选择
        if (this.addressObj && this.addressObj.districtId != val.districtId) {
          this.StreetData = []
          this.estate = []
          this.bldg = []
          this.savaStreeDate = []
          this.saveEstate = []
          this.savaBldg = []
        }
        this.addressObj = val;
      },
      StreetAddress(val) { // 街道地址
        console.log('StreetAddress', val)
        if (val[0] != this.addressObj.streetTcResult) {
          this.estate = []
          this.bldg = []
          this.saveEstate = []
          this.savaBldg = []
        }
        this.savaStreeDate.map((item, index) => {
          if (item.streetTcResult == val[0]) {
            this.addressObj = item
          }
        })

      },
      estateAddress(val) { // 屋院地址
        if (val[0] != this.addressObj.estateTcResult) {
          this.bldg = []
          this.savaBldg = []
        }
        this.saveEstate.map((item, index) => {
            if (item.estateTcResult == val[0]) {
              this.addressObj = item
            }
        })
      },
      bldgAddress(val) { // 大厦地址
        this.saveEstate.map((item, index) => {
            if (item.estateTcResult == val[0]) {
              this.addressObj = item
            }
        })
      }
    },
    watch: {
      // addressObj(val) {
      //   console.log('addressObj', val)
      //   this.$emit('input', val);
      // },
      addressObj: {
        handler: function (val) {
          console.log('addressObj', val)
          this.$emit('input', val);
        },
        deep: true
      },
      value: {
        handler: function (val) {
          // console.log(val)
          this.addressObj = val;
        },
         deep: true
      },
      // value(val) {
      //   this.addressObj = val;
      // },
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