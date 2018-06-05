<template>
	<!--<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">-->
	<div class="userLogin_popup" v-show="userShow"  v-transfer-dom>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="userLogin" >
				<h2>客戶登錄</h2>
				<div class="userLogin_input">
					<div class="userLogin_number">
						<input type="number" maxlength="11" v-keyBoard :placeholder="isAppreciation?'请输入移動電話號碼':'请输入办理号码'" v-model.trim="userData.iPhoneNo" @keyup="checkNum" @blur="checkPhone">
					</div>
					<div class="userLogin_number password">
						<input  type="password" v-keyBoard :placeholder="isAppreciation?'请輸入驗證碼':'请输入服务密码'" @focus="teset" v-model.trim="userData.smsCode" @blur="checkPass">
						<div class="verification_code" v-if="isAppreciation" @click="getCode">{{timer || '獲取驗證碼'}}</div>
					</div>
				</div>
				<div class="makeSure" @click="logining">登錄</div>
	
			</div>
		</transition>
		<div class="popup_bg" @click="show">

		</div>
	</div>
	<!--</transition>-->
</template>

<script>
export default {
	name: 'userLogin',
	data() {
		return {
			userData: {
				iPhoneNo: "",
				smsCode: "",
			},
			timer: null,
		}
	},
	props: {
		userShow: {
			type: Boolean,
			default: false
		},
		isAppreciation: { // 是否是增值页面
			type: Boolean,
			default: false
		}
	},
	methods: {
		async getCode() { // 获取验证码
			if (this.timer) return 
			// this.$emit('getCode',this.userData)
			if (this.userData.iPhoneNo === '') return this.$vux.toast.text('請輸入電話號碼', 'top')
			if (!this.$regex.phone.test(this.userData.iPhoneNo)) return this.$vux.toast.text('請輸入正確的手機號', 'top')
			let param = {
        phoneNo: this.userData.iPhoneNo
			}
			let res = await this.$post('contribution/sendCode',param)
			if (res.returnCode !== '1000') return this.$vux.toast.text('獲取驗證碼失敗', 'top')
			this.timer = 60
			let timer = setInterval(() => {
				if (this.userShow === false) {
					clearInterval(timer)
					this.timer = null
				}
				this.timer--
				if (this.timer <= 0) {
					clearInterval(timer)
					this.timer = null
				}
			},1000)
		},
		async logining() { // 登录校验
			let param = {
        "msisdn": this.userData.iPhoneNo,
        "smsCode": this.userData.smsCode
			}
			if ( this.$route.path == '/contributionIndex/appreciate') { // 如果是增值用别的登入接口
					this.$emit("clickPop", this.userData);
			} else {
				if (this.userData.iPhoneNo === '') return this.$vux.toast.text('請輸入電話號碼', 'top')
				if (!this.$regex.phone.test(this.userData.iPhoneNo)) return this.$vux.toast.text('請輸入正確的手機號', 'top')
				if (this.userData.smsCode === '') return this.$vux.toast.text('請輸入驗證碼', 'top')
				let data = await this.$post('contribution/customerLogin',param) // 登入
				if (data.returnCode !== '1000') return
				this.$emit("clickPop", this.userData);
			}
		},
		checkNum() {
		},
		checkPhone() {

		},
		teset(el) { // 失去焦点
			// console.log('获取焦点', el)
			// setTimeout(() => {
			// 	el.target.scrollIntoView(false)
			// },200)
		},
		checkPass() {
		},
		show() {
			this.$emit("clickPop", false);
		}
  },
}
</script>

<style lang = 'less' scoped >
.userLogin_popup {
	width: 100%;
	min-height: 100%;
	/* background: rgba(0, 0, 0, 0.7); */
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 3;
}
.popup_bg{
	width: 100%;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.7);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 3;
}
.userLogin {
	width: 5.8rem;
	height: 4.5rem;
	position: fixed;
	display: table;
	z-index: 5000;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	background-color: #fff;
	text-align: center;
	border-radius: 3px;
	overflow: hidden;
}

.userLogin h2 {
	text-align: center;
	padding: 0.2rem 0;
    margin: 0 0.3rem;
    font-size: 0.30rem;
    color: #333;
    border-bottom: 1px solid #EAEAEA;
}

.userLogin_input {
	width: 100%;
	padding:0 0.3rem;
    margin-top: 0.3rem;
}

.userLogin_number {
	position: relative;
    padding: 0.1rem 0;
}
.userLogin_number.password{
	display: flex;
	input{
		padding: 0.2rem 0.2rem;
		flex: 1;
		color: #999;
		background: #F4F4F4;
	}
	.verification_code{
		height: 0.72rem;
		width: 2.13rem;
		border: 1px solid #E52C79;
		border-radius: 4px;
		color: #E52C79;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.72rem;
		margin-left: 0.2rem;
	}
}
.userLogin_number p {
	position: absolute;
	font-size: 0.28rem;
	color: #666;
	top: 0.3rem;
}

.userLogin_number input {
	width: 100%;
	background: #F4F4F4;
	padding: 0.2rem 0.2rem;
  border: none;
	color: #999;
}

.userLogin_number .getCode {
	right: 0.3rem;
}

.makeSure {
	width: 90%;
    margin: 0.2rem auto 0;
	font-size: 0.28rem;
    color: #FFFFFF;
	text-align: center;
	padding: 0.2rem 0;
    background: #F01095;
    border-radius: 1px;
}

.userLogin_close {
	position: absolute;
	width: 0.8rem;
	top: 0.05rem;
	right: 0;
}

.userLogin_close img {
	width: 100%;
	vertical-align: middle;
}

.animated {
	-webkit-animation-duration: 0.5s;
	animation-duration: 0.5s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}
</style>