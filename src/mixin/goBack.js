export default {
  methods: {
    goBack() {
      if (this.$store.state.common.beginPath === this.$route.path) { //
        try {//webview
          console.log('返回1-1')
          window.LvUJsBridge.invoke('GoBack', {}, function (response) { })
        } catch (error) {//外部浏览器头部是没有返回按钮的
          alert('js桥返回失败')
        }
      } else {
        this.$router.go(-1)
      }
    }
  }
} 