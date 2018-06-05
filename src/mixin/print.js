export default {
  methods: {
    async printFn(data, num) { // 1：列印合约 2：列印收據 3：一鍵列印： 一键打印传数组 Array[0] 
      
      if (num == 1) {
        console.log('1：列印合约')
        let res = await this.$post('exit/printContract', {
          "registerId": '961207815133011911'
        })
        if (res.returnCode != 1000) return
        this.$jb.js2webview({ type: 3, printType: num, printParam: {
          "registerId": '961207815133011911'
        }})
      }
      if (num == 2) {
        console.log('列印收據')
        this.$jb.js2webview({ type: 3, printType: num, printParam: {
          "phoneNo": "60383369",
          "customerId": "",
          "paymentType": "0",
          "caxact": "233795053",
          "coId": "5320876",
          "userId": '974582750482440192'
        }})
      }
      if (num ==3) { // 
        console.log('3：一鍵列印：')
        this.$jb.js2webview({ type: 3, printType: num, printParam: [
          { 
            "registerId": '961207815133011911'
          },
          {
            "phoneNo": "60383369",
            "customerId": "",
            "paymentType": "0",
            "caxact": "233795053",
            "coId": "5320876",
            "userId": '974582750482440192'
          }
        ]})
      }
    }
  }
} 