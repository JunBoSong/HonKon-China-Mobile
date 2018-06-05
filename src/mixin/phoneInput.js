// 此mixin是格式化输入框手机号为 3 4 4 格式的。
//引入改mixin 注意 ： 1.要设置phoneNumMethod方法（手机号输入成功执行函数）
//                  2.获取输入的值获取getPhoneNum计算属性
export default {
    computed: {
        getPhoneNum: function() {
            return this.phoneNum.replace(/\s+/g, '');
        }
    },
    watch: {
        phoneNum: function(val, oldVal) {
            let valLen = val.length;
            let oldLen = oldVal.length;
            if (valLen > oldLen) {
                if (valLen >= 11) {
                    this.phoneNum = val.replace(/\s+/g, '').replace(/(\d{3})(\d{4})(\d{1,4})/g, "$1 $2 $3");
                    this.$refs.phoneInput.blur(); //解决安卓webview点击其它地方会再次唤出键盘
                    if (valLen === 13) this.phoneNumMethod()
                }
            } else {
                this.phoneNum = '';
            }

        }
    }
}