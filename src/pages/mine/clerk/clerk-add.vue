<template>
  <div>
    <vp-layout-page>
      <vp-header-page title='添加店員' slot='header' />

      <div class="add-info">
        <div class="info-item">
          <i class="icon icon-tel"></i>
          <div class="info-input border-b">
            <input type="text" placeholder="請輸入人店員電話號碼" v-model="addInfo.phone" />
          </div>
        </div>
        <div class="info-item">
          <i class="icon icon-code"></i>
          <div class="info-input border-b">
            <input type="text" placeholder="請輸入人店員電話號碼" v-model="addInfo.phone" />
            <button type="button" class="btn-code">獲取驗證碼</button>
          </div>
        </div>
        <div class="info-item">
          <i class="icon icon-user"></i>
          <div class="info-input">
            <input type="text" placeholder="請輸入人店員電話號碼" v-model="addInfo.phone" />
          </div>
        </div>
      </div>
      <p class="tips">新添加的店員初始登入密碼為電話號碼后6位數字，請登入后修改</p>
      <div class="btn-wrapper">
        <vp-button content="保存"/>
      </div>
    </vp-layout-page>
  </div>
</template>
<script type='text/javascript'>
  import {
    vpInput
  } from '@/components';
  export default {
    components: {
      vpInput
    },
    data() {
      return {
        addInfo: {
          phone: '',
          verificationCode: '',
          name: ''
        }
      }
    },
    mounted() {
     
    }
  }

</script>
<style lang='less' scoped>
.add-info {
  margin-top: 0.22rem;
  padding: 0 0.24rem;
  background: #fff;
  .info-item {
    display: flex;
    align-items: center;
    height: 0.9rem;
    box-sizing: border-box;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.2rem;
    }
    .icon-tel {
      background: url('~@/assets/images/add_phone@2x.png') 0 0 no-repeat;
      background-size: 0.4rem;
    }
    .icon-code {
      background: url('~@/assets/images/add_code@2x.png') 0 0 no-repeat;
      background-size: 0.4rem;
    }
    .icon-user {
      background: url('~@/assets/images/add_name@2x.png') 0 0 no-repeat;
      background-size: 0.4rem;
    }
    .info-input {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      height: 0.9rem;
      padding: 0 0.01rem;
      input {
        flex: 1 1 auto;
        height: 100%;
        font-size: 0.28rem;
        background: none;
        border: none;
      }
      .btn-code {
        width: 1.54rem;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border: 0.01rem solid @theme;
        border-radius: 0.04rem;
        background: none;
        font-size: 0.22rem;
        color: @theme;
      }
    }
  }
}
.btn-wrapper {
  padding: 0 0.24rem;
  margin-top: 0.6rem;

}

</style>
