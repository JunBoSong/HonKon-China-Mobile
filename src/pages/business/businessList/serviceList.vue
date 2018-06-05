<template>
    <vp-layout-page>
        <!-- <div class="servicelist" ref="servicescroller" > -->
           <vp-layout-scroll @unEvent="getServicelist" ref="scroller">
            <ul class='serviceList-list'>
                <li class="serviceList-item" v-for="(item, index) in booklist" :key="index" @click="gotoDetail(item)">
                    <img v-lazy="{src: item.packageImg, error: require('@/assets/images/default/error.png'), loading: require('@/assets/images/default/error.png')}" class="serviceImg">
                    <div class="rightView">
                        <p class="view-title">{{item.packageName}}</p>
                        <p class="view-description">{{item.shareTitle}}</p>
                        <p class="view-message">{{item.shareDesc}}</p>
                    </div>
                </li>
            </ul>
          </vp-layout-scroll>
      <!-- </div> -->
    </vp-layout-page>
</template>

<script>
  // import { LoadMore } from 'vux';
  export default {
    name:'serviceList',
    /* ********************* components ********************* */
    components:{

    },

    /* ********************* data ********************* */
    data() {
      return {
        pageSize: 10,
        pageNum: 1,
        booklist:[],
        isNoMore:false,
        scroller: null,
      }
    },

  /* ********************* computed ********************* */
    computed:{
      packageType () { // 业务包类型
        if (this.$route.query.businessType == 1 ) { //businessType, 1.带机上台、2集客上台、3.新客上台、4.旗舰机上台
            return 12 //带机上台
        }
        if (this.$route.query.businessType == 2 ) {
            return 15 //集客带机上台
        }
      }
    },

    /* ********************* methods ********************* */
    methods:{
      async getServicelist () { //业务包分页查询
        let res= await this.$post("business/packagePage", {
          pageNumber: this.pageNum,
          pageSize:this.pageSize,
          "userId":this.$client.userid,
          "orgId":this.$client.orgid,
          'packageType': this.packageType  //12 带机上台,15集客带机上台
      })

      if (res.returnCode == 1000 ) {
        this.booklist = [...this.booklist, ...res.records]

        if (res.records.length < this.pageSize) {
          this.$refs.scroller.endUpLoading(true)
        }else {
          this.pageNum ++;
          this.$refs.scroller.endUpLoading()
        }
      } else {
        this.$refs.scroller.endUpLoading(true)
        return this.$toast(res.message);
        }
      },
      gotoDetail (item) {
        this.$router.push({
          path:'/business/handleBase/serviceDetail',
          query:{
            'packageId':item.id,
            'businessType':this.$route.query.businessType,
            'reChoice': this.$route.query.reChoice,
            'packageName':item.packageName
          }
        })
      }
    },


   /* ********************* created ********************* */
    created () {
      // this.$jb.webview2js((params) => {params.type == 1 && this.$router.go(-1)})
        this.$jb.webview2js((params) => {
          if (params.type == 1) {
            if (this.$route.path === this.$session.get('beginPath')) {
              this.$jb.js2webview({
                type: 2
              })
            } else {
              this.$router.go(-1);
            }
          }
        })

      this.pageNumbr = 1
      // this.getServicelist()
      localStorage.asd = 123
    },

    /* ********************* beforeDestroy ********************* */
    beforeDestroy(){
      localStorage.removeItem('asd')
    }
  }
</script>

<style lang='less' scoped>
  // .servicelist{
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  // }
  .serviceList-list{
    flex: 1 0 auto;
    height: 100%;
    overflow-y: hidden;
    .serviceList-item{
      display: flex;
      img{
        width: 1.7rem;
        height: 1.7rem;
        margin-top:0.33rem;
      }
    }
  }
  .serviceList-item{
    display: flex;
    align-items: row;
    height: 2.2rem;
    margin-top: 0.22rem;
    padding: 0 0.24rem;
    background-color: white;
      .serviceImg{
          width: 1.7rem;
          height: 1.7rem;
          margin-top: 0.25rem;
      }
      .rightView{
          display: flex;
          flex-direction: column;
          margin-left: 0.29rem;
          .view-title{
              margin-top: 0.33rem;
              font-size: .28rem;
              color: #333;
              line-height: .28rem;
              font-weight: bold;
          }
          .view-description{
              margin-top: 0.25rem;
              font-size: .28rem;
              color: #666;
              line-height: .22rem;
              margin-bottom: .17rem;
          }
          .view-message{
            font-size: .24rem;
            color: #999999;
            line-height: .34rem;
          }
      }
  }
</style>
