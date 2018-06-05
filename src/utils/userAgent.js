
const ua = navigator.userAgent.toLowerCase(); 
const isWechat = () => ua.match(/MicroMessenger/i) == "micromessenger" //是否微信

export {
  isWechat
}