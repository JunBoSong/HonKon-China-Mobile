const APPID = 10000188; //10000188
const CUSTOMER_SERVIECE_PHONE = 15053187000;
const API_HOST = 'http://devgw.vpclub.cn'; //开发环境的api域名
const CLIENT = { //本地开发数据，項目中 可以通过  this.$client.userid 的格式来获取
    userid: "907106903739269120", //用户id
    orgid: "918720751226753026", // 机构编号
    shopid: "960372204422119425", // 店铺id
    webview: 2, // 浏览器环境 1: iOS | 2: Android | 3: H5
    right: "store", // 权限  staging: 工作台 | store: 店铺
    usertype: "2", // 用户类型

}

/**
 *
 *
 * f9c7890256b4735f0540b2cdcd8906fb   172.19.14.120
  937e08e35901f88785f6dc9e39000c11   172.19.14.118
 * \$client\.(orgcode|operator|token)
 * 需要用户token的接口：
 *  1.获取客户手机价格 /umall/product/adapter/product/getUpfrontPrice。
 *  2.下单 /moses/order/adapter/create
 */

export default {
    APPID,
    CUSTOMER_SERVIECE_PHONE,
    API_HOST,
    CLIENT
}
