/**
 * 组件内请求接口示例：
 * const data = this.$post('shop/info', {id: 123})
 *
 */

const API = {
    "shop": { //钟航
        "info": "/moses/shop/app/shop/query", //店铺用户查询
    },
    "product": { //钟航
        "page": "/moses/product/app/product/page", //商品列表 //查询商品列表要用阳新波的搜索接口，不然伟哥会吊你的
        "stock": "/moses/product/app/stock/queryStock", //库存查询
        "sku": "/moses/product/app/sku/page", //sku查询
        "product": "/moses/product/app/product/page", 
        "detail": "/moses/product/app/product/query", //商品详情
        "detail4html": "/moses/product/app/productDetail/queryDetailByProductId", //商品富文本
        "recommend": "/moses/product/app/productRecommend/recommend", //推荐/取消商品推荐
        "recommendPage": "/moses/product/app/product/queryRecommendProduct", //推荐商品列表
        "buyType": "/moses/product/app/productPurchaseType/page", //SKU的购买方式查询
        "gift": "/moses/product/app/product/queryGift", //查询指定商品对应赠品列表
        "stock4store": "/umall/product/adapter/product/countProductInInventory", //查询指定商品的门店库存
        "price4customer": "/umall/product/adapter/product/getUpfrontPrice", //获取现有客户手机价钱 陈伟 (不分是不是手机都查)
    },
    "brand": { //卢松炯
        "page": "/moses/brand/app/appBrand/page" //品牌
    },
    "category": { //卢松炯
        "page": "/moses/category/app/customAppCategory/page" //分类
    },
    "search": { //阳新波
        "page": "/moses/search/consumer/product/search", //搜索
        "hotKeywords": "/moses/search/consumer/product/hotKeywords" //热门搜索关键字
    },
    "cart": { //刘俊峰
        "page": "/moses/cart/consumer/cartInfo/get", //购物车列表
        "add": "/moses/cart/consumer/cartInfo/add", //添加商品到购物车
        "clear": "/moses/cart/consumer/cart/clearCart", //清空购物车
        "count": "/moses/cart/consumer/cart/getCartCount", //获取购物车商品数量
        "editNum": "/moses/cart/consumer/cartInfo/editNum", //修改购物车商品
        "delete": "/moses/cart/consumer/cartInfo/deleteShop" //删除物车商品
    },
    "freight": { //段金良
        "detail": "/moses/freight/template/getFreight" //运费模板
    },
    "order": { //段金良
        "create": "/moses/order/adapter/create", //下单
        "pay": "/moses/order/adapter/pay", //支付
        "payStatus": "/moses/order/app/mainOrder/query", //查询是否支付成功
        "page": "/moses/order/query/getAllUserOrder", //订单列表
        "detail": "/moses/order/query/getOrderInfo", //订单详情
        "businessOrderList": "/moses/order/query/getBusinessOrderList", // 查询业务订单列表
        "businessOrderInfo": "/moses/order/query/getBusinessOrderInfo", // 支付后查询订单详情
        'delivery': "/moses/order/command/delivery", // 订单发货
        "queryOrderInfo": "umall/business/consumer/registerOrderInfo/queryOrderInfo", // 订单-上台信息回显 --王睿
        "registerOrderInfo": "umall/business/consumer/registerOrderInfo/page", // 业务明细上台列表 --王睿
        "confirmReceipt": "/moses/order/command/confirmReceipt", //确认收货
        "deliveryPush": "/moses/order/app/userOrder/deliveryPush", //催发货
        "applyRefund": "/moses/order/app/refund/applyRefund", //申请退款
        "closeOrder": "/moses/order/app/userOrder/closeOrder", //取消订单
        "comment": "/moses/order/app/comment/add", //订单评论---张斌
        "sellProductNewSales": "/moses/order/adapter/sellProductNewSales", //上台购买手机
    },
    "admin": {
        "disctricts": "/moses/app/admin/disctricts/list", //获取省市区信息
        "dectionary": "/moses/app/admin/appDictionary/json" //数据字典
    },
    "refund": { //杨奇璋
        "apply": "/moses/refund/refund/apply", //获提交退款申请
        "page": "/moses/refund/refund/page", //获取买家退款订单列表
        "pageByPhone": "/moses/refund/refund/pageByPhone", //通过手机号获取买家退款订单列表
        "detail": "/moses/refund/refund/query" //退款订单详情
    },

    "zoneconf": { //专区专题-段金良11111暂时，还未找段金良
        "list": "/moses/zoneconf/subject/selectAllUserSubject",
        "childList": "/moses/zoneconf/subject/findChildSubjectList",
        "subjectGoods": "/moses/zoneconf/subjectGoods/page",
        "findSubjectGoods": "/moses/zoneconf/subjectGoods/findSubjectGoods",//商家分页列表
        
    },
    "advert": { //罗正顺  专题找段金良
        "page": "/cmbs/advert/consumer/advertInfo/advertPage"
    },
    "file": {
        "upload": "/moses/upload/file/upload", //文件上传
        "imgUploadByBase64": "/moses/upload/file/imgUploadByBase64" //文件上传
    },
    "verifycode": { //验证码
        "send": "/umall/business/consumer/sms/sendCode" //获取验证码
    },
    "hint": { //谭政成
        "detail": "/umall/business/consumer/hint/queryByCode" //根据code获取提示详情
    },
    "contribution": { // 充值缴费----谭平
        "postpaidAccountInfo": "/umall/business/consumer/postpaidAccountInfo", // 查询应缴金额
        "submitBillPayment": "/umall/business/consumer/recharge/submitBillPayment", // 缴费办理
        "recharge": "/umall/business/consumer/recharge/postpaidAccountInfo", // 后付费查询账户信息 缴费
        "msisdnCurrentInfo": "/umall/business/consumer/recharge/prepaidBalanceInfo", // 增值-查询账户结余
        "addDeposit": "/umall/business/consumer/recharge/addDeposit", // 储值卡增值办理
        "sendCode": "/umall/business/consumer/sms/sendCode", // 发送短信  --------杨奇璋
        "package": "/umall/business/consumer/packageInfo/page", // 业务包详情查询 -------杨奇璋
        "query": "/umall/business/consumer/packageInfo/query", // 业务子集详情查询 ------杨奇璋
        "customerLogin": "/moses/authc/query/user/customerLogin", //现有登入 ----钟航
        "autopaySubmit": "/umall/business/consumer/recharge/autopaySubmit", // 开通信用卡自动续费 -----杨奇璋
        "prepaidBalanceInfoBySMS": "/umall/business/consumer/recharge/prepaidBalanceInfoBySMS", // 增值-查询账户结余
    },
    "customer": { //客户操作
        "login": "/moses/authc/query/user/customerLogin", //现有客户登录 -- 钟航
        "limitBuy": "/umall/business/consumer/registerOrderInfo/getCustomerData", //现有用户购买手机配額 -- 鐘航
        "buyData": "/umall/business/consumer/registerOrderInfo/getAgreementData", //现有用户购买手机信息 -- 王睿
    },
    "address": { //地址 --谭平
        "search": "/umall/business/consumer/maparea/search", //搜索
        "maparea": "/umall/business/consumer/maparea/searchAreaAndDistrict", // 地址搜索 -- 谢聪
        "searchStreet": "/umall/business/consumer/maparea/searchStreet", // 街道搜索 -- 谢聪
        "searchEstate": "/umall/business/consumer/maparea/searchEstate", // 房屋搜索-- 谢聪
        "searchBldg": "/umall/business/consumer/maparea/searchBldg", // 大厦搜索-- 谢聪
        "searchShopArea": "/umall/business/consumer/eshop/areas", //门店区域搜索
        "searchShop": "/umall/business/consumer/eshop/search" //门店搜索
    },
    "recharge": { //合約 --王睿
        "getAutoPaySignInfo": "umall/business/consumer/recharge/getAutoPaySignInfo", // 初始化合約
        "submitContract": "umall/business/consumer/contract/submitContract", // 提交保存合約
        "autopaySubmit": "umall/business/consumer/recharge/autopaySubmit" // 開通通信卡自動繳費
    },
    "exit": { // 门市取卡 --王睿
        "page": "umall/business/consumer/custTakeCardInfo/page", // 门市取卡分页
        "write": "umall/business/consumer/custTakeCardInfo/writeCard", // 写卡
        "generate": "umall/business/consumer/registerOrderInfo/generateReceipt", // 获取发票信息
        "printContract": "umall/business/consumer/contract/printContract" // 获取合约
    },
    "business": { //上台 --王睿
        "init": "umall/business/consumer/registerOrderInfo/init", //初始化---王睿
        "isHkidValid": "umall/business/consumer/registerOrderInfo/isHkidValid", //身份证及护照ID验证----王睿
        "saveBase": "umall/business/consumer/registerOrderInfo/saveBase", //上台业务单信息更新----王睿
        "saveMore": "umall/business/consumer/registerOrderInfo/saveMore", //上台业务单信息更新，并返回优惠列表----王睿
        "commitDiscount": "umall/business/consumer/registerOrderInfo/commitDiscount", //提交优惠，上台业务单信息更新----王睿
        "calPay": "umall/business/consumer/registerOrderInfo/calPay", //算费并查询支付明细 ----王睿
        "queryOrderInfo": "umall/business/consumer/registerOrderInfo/queryOrderInfo", //上台业务信息回显查询----王睿
        "phonePage": "umall/business/consumer/phoneNo/page", // 号码池分页查询-----杨奇璋
        "NewValid": "umall/business/consumer/registerOrderInfo/isNewSalesInfoValid", // 新号校验-----王睿
        "vasPage": "umall/business/consumer/vas/page", // VAS分页查询-----杨奇璋
        "isMnpQuotaValid": "umall/business/consumer/registerOrderInfo/isMnpQuotaValid", //3.1.6校验携号配额-----王睿
        "isMnpInfoValid": "umall/business/consumer/registerOrderInfo/isMnpInfoValid", // 3.1.4携号号码验证-----王睿
        "isIppInfoValid": "umall/business/consumer/registerOrderInfo/isIppInfoValid", // 3.1.5IPP号码验证-----王睿
        "reduceMnpQuota": "umall/business/consumer/registerOrderInfo/reduceMnpQuota", // 3.1.7扣减携号配额-----王睿
        "packagePage": "umall/business/consumer/packageInfo/page", // 业务包分页查询-----杨奇璋
        "packageQuery": "umall/business/consumer/packageInfo/query", // 业务包详情查询-----杨奇璋
        "businessInfoDetail": "umall/business/consumer/businessInfo/query", // 业务子集详情查询-----杨奇璋
        "getDiscountsAndVas": "umall/business/consumer/businessInfo/getDiscountsAndVas", // 查询VAS及优惠-----杨奇璋
        "productPriceConversion": "/moses/product/app/productPriceConversion/page", // 查询商品上台价-----陈伟
        "phoneNoReserve": "/umall/business/consumer/phoneNo/reserve", // 号码预占-----杨奇璋
        "phoneNoRelease": "/umall/business/consumer/phoneNo/release", // 号码释放-----杨奇璋
        "queryGift": "/moses/product/app/product/queryGift", // 查询指定商品对应赠品列表-----陈伟
    }
}

export default API