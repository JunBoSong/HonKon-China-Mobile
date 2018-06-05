<template>
	<div style="height: 100%;">
    <vp-layout-page>

    <vp-layout-scroll @unEvent="getSubjectGoods" class="scroller" ref="scroller">
			<div class="banner">
				<!-- <img src="../../assets/images/gongxian/banner@2x.png" alt="" /> -->
        <img v-lazy="zoneImg" alt="">
			</div>
		  <div class="content">
        <div class="row" v-for="(item,index) in goodsList" :key="index" @click="go(item)">
          <div class="img-box"><img v-lazy="item.goodsImgBg"/></div>
          <div class="row-title row-2-ellipsis">{{item.goodsName}}</div>
          <div class="row-price">
            <span class="price-now row-ellipsis">{{item.price | filterPrice}}</span>
            <!-- <span class="price-old row-ellipsis">{{item.marketPrice | filterPrice}}</span> -->
            <span class="salesNum row-ellipsis">銷量：{{item.sellNumber || 0}}</span>
          </div>
        </div>
      </div>
      </vp-layout-scroll>
     </vp-layout-page>

	</div>
</template>

<script>
	// import "../../assets/style/my-mint-ui.less"
	export default {
  	name:"LoveHelp",
    data() {
      return {
        pageSize: 4,
        pageNum: 1,
        goodsList:[],
        oldId:'',
        zoneId:'',
        scTop:0,
        popupType: 1,
        isPopup:false
      }
    },
    computed: {
        // zoneId (){
        //     return this.$route.query.zoneId
        // },
        zoneImg(){
            return this.$route.query.zoneImg;
        },
        zoneName(){
            return this.$route.query.zoneName;
        },
  	},

    created() {
      this.zoneId = this.$route.query.zoneId
      this.oldId = this.zoneId
      // this.getSubjectGoods()
    },
    methods: {
      showPopup(n) {
      this.isPopup = true;
      this.popupType = n
    },

    async	getSubjectGoods(){ // 分页查询商品列表
      console.log('ddddd')
				let dataDic = {
          appId: "10000168",
          subjectId: this.zoneId,
          pageNumber: this.pageNum,
          pageSize:this.pageSize
				}
				let res = await this.$post('zoneconf/findSubjectGoods', dataDic)
          if (res.returnCode == 1000 ) {
            console.log('sgoodslist',res.records)
             this.goodsList = [...this.goodsList, ...res.records]
            // this.goodsList = res.records
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
      go (item) {
        // this.$session.set('scrollTopkey', this.scTop)
        this.$router.push({path:'/shopping/detail',query:{id:item.goodsId}});
      }

 		}
  }
</script>

<style lang = 'less' scoped>
@import '../../assets/less/theme.less';
@import '../../assets/less/mixin.less';
@bg_white: #ffffff;
.scroller{
  height: 100% !important;
  &::-webkit-scrollbar {display:none}
}
.zone {
  background: #f8f8f8;
}
.bottomContent {
  width: 100%;
  height: auto;
}
.banner{
	height: 2.4rem;
	width: 7.5rem;

	img{
		height: 2.4rem;
		width: 7.5rem;
	}
}

.content{
	margin-top: .24rem;

	.row{
		 display: inline-block;
      width: 49.5%;
      vertical-align: top;
      background: #fff;
      height: 5.22rem;
      position: relative;
      margin-top: 1%;

		.img-box{
			width: 100%;
			height: 3.6rem;

			img{
				width: 100%;
				height: 3.6rem;
			}
		}

		.row-title{
			height: 0.76rem;
      font-size: 0.26rem;
      padding: 0 .32rem;
			color: #333333;
      line-height: 0.38rem;
      margin-top: .16rem;
      margin-bottom: .12rem;
		}

		.row-price{
      padding: 0 .32rem;
      height: .32rem;
      display: flex;
      justify-content: space-between;
      .priceWrap {
        flex: 1;
      }
			.price-now{
        display: inline-block;
				font-size: 0.32rem;
				color: #F9595A;
				letter-spacing: 0;
        line-height: 0.32rem;
        max-width: 50%;
			}

			/* .price-old{
         display: inline-block;
				font-size: 0.24rem;
				color: #888888;
				line-height: 0.32rem;
        text-decoration:line-through;
        max-width: 40%;
      } */
      .salesNum {
        max-width: 50%;
        font-size: 0.22rem;
        color: #888888;
        line-height: 0.32rem;
      }
		}

   &:nth-child(odd) {
      margin-right: 1%;

    }
    &:nth-child(even) {
        margin-right: none;
    }
	}
}
.share{
  /* .bg-img('goods_detail/shareBtn'); */
  background-size:.48rem;
}
.mint-popup-goodsDetail {
    width: 100%;
    .productShare,
    .productParameter {
      width: 100%;
      background: @bg_white;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .productShare > .cancel,
    .productParameter > .confirm {
      width: 100%;
      height: 1rem;
      font-size: 0.32rem;
      text-align: center;
      line-height: 1rem;
    }
    .productParameter > .confirm {
      background: #fb9e4b;
      color: #ffffff;
    }
    .productShare {
      // height: 4.7rem;
      .selects {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0.36rem 0 0.26rem 0.62rem;
        li {
          display: flex;
          flex-direction: column;
          text-align: center;
          width: 0.96rem;
          height: 1.38rem;
          &:nth-of-type(odd) {
            margin-right: 0.84rem;
          }
          &:nth-of-type(even) {
            margin-right: 0.82rem;
          }
          &:nth-of-type(4n) {
            margin-right: 0;
          }
          p {
            width: 0.88rem;
            height: 0.88rem;
            background-size: 0.88rem;
            margin: 0 auto;
          }
          span {
            width: 0.96rem;
            margin-top: 0.16rem;
            font-size: 0.24rem;
            color: #9a9a9a;
          }
        }
      }
      .cancel {
        color: #666666;
        border-top: 0.01rem solid #e5e5e5;
      }
    }
    .productParameter {
      height: 5.94rem;
      h2 {
        font-size: 0.32rem;
        color: #666666;
        text-align: center;
        height: 0.83rem;
        line-height: 0.83rem;
      }
      .outer-container {
        width: 100%;
        flex: 1;
        position: relative;
        overflow: hidden;
        .inner-container {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          &::-webkit-scrollbar {
            display: none;
          }
          ul {
            width: 100%;
            height: 100%;
            padding: 0 0.28rem 0 0.32rem;
            li {
              font-size: 0.28rem;
              padding: 0.25rem 0 0.28rem;
              border-bottom: 0.01rem solid #eeeeee;
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              span {
                text-align: left;
                width: 1.12rem;
                color: #999999;
              }
              p {
                flex: 1;
                text-align: left;
                margin-left: 0.6rem;
              }
            }
          }
        }
      }
    }
  }
</style>
