import Vue from 'vue'
import Router from 'vue-router'

const navigation = () =>
    import ( /* webpackChunkName: "navigation" */ '../pages/navigation/index')
const navigationTest = () =>
    import ( /* webpackChunkName: "navigationTest" */ '../pages/navigation/test')
    //店铺
const business = () =>
    import ( /* webpackChunkName: "business" */ '../pages/business/index')
    //购物
const shopping = () =>
    import ( /* webpackChunkName: "shopping" */ '../pages/shopping/index')
const shoppingList = () =>
    import ( /* webpackChunkName: "shoppingList" */ '../pages/shopping/shopping-list')
const shoppingChoose = () =>
    import ( /* webpackChunkName: "shoppingChoose" */ '../pages/shopping/shopping-choose')
const shoppingDetail = () =>
    import ( /* webpackChunkName: "shoppingDetail" */ '../pages/shopping/shopping-detail')
const shoppingCart = () =>
    import ( /* webpackChunkName: "shoppingCart" */ '../pages/shopping/shopping-cart')
const shoppingSearch = () =>
    import ( /* webpackChunkName: "shoppingSearch" */ '../pages/shopping/shopping-search')
const shoppingLogin = () =>
    import ( /* webpackChunkName: "shoppingLogin" */ '../pages/shopping/shopping-login')
const shoppingCheck = () =>
    import ( /* webpackChunkName: "shoppingCheck" */ '../pages/shopping/shopping-check')
const shoppingPick = () =>
    import ( /* webpackChunkName: "shoppingPick" */ '../pages/shopping/shopping-pick')
const shoppingResult = () =>
    import ( /* webpackChunkName: "shoppingResult" */ '../pages/shopping/shopping-result')
const shoppingSign = () =>
    import ( /* webpackChunkName: "shoppingSign" */ '../pages/shopping/shopping-sign')
    //选货
const select = () =>
    import ( /* webpackChunkName: "select" */ '../pages/select/index')
const selectGoods = () =>
    import ( /* webpackChunkName: "selectGoods" */ '../pages/select/select-goods')
const selectSearch = () =>
    import ( /* webpackChunkName: "selectGoods" */ '../pages/select/select-search')
    //店铺首页
const store = () =>
    import ( /* webpackChunkName: "store" */ '../pages/store/index')
const storeHome = () =>
    import ( /* webpackChunkName: "storeHome" */ '../pages/store/store-home')
const prefecture = () =>
    import( /* webpackChunkName: "storeHome" */ '../pages/store/prefecture')
    //我的
const mine = () =>
    import ( /* webpackChunkName: "mine" */ '../pages/mine/index')
    //我的-订单
const mineOrder = () =>
    import ( /* webpackChunkName: "mineOrder" */ '../pages/mine/order/index')
const mineOrderList = () =>
    import ( /* webpackChunkName: "mineOrderList" */ '../pages/mine/order/order-list.vue')
const mineOrderDetail = () =>
    import ( /* webpackChunkName: "mineOrderDetail" */ '../pages/mine/order/order-detail.vue')
const orderResult = r => require.ensure([], () => r(require('../pages/mine/order/order-result.vue')), 'orderResult')
    //我的-业务
const mineBusiness = () =>
    import ( /* webpackChunkName: "mineBusiness" */ '../pages/mine/business/index')
const mineBusinessList = () =>
    import ( /* webpackChunkName: "mineBusinessList" */ '../pages/mine/business/business-list.vue')
const mineBusinessDetail = () =>
    import ( /* webpackChunkName: "mineBusinessDetail" */ '../pages/mine/business/business-detail.vue')
    //我的-店员
const mineClerk = () =>
    import ( /* webpackChunkName: "mineClerk" */ '../pages/mine/clerk/index')
const mineClerkList = () =>
    import ( /* webpackChunkName: "mineClerkList" */ '../pages/mine/clerk/clerk-list.vue')
const mineClerkDetail = () =>
    import ( /* webpackChunkName: "mineClerkDetail" */ '../pages/mine/clerk/clerk-detail.vue')
const mineClerkAdd = () =>
    import ( /* webpackChunkName: "mineClerkAdd" */ '../pages/mine/clerk/clerk-add.vue')
    //我的-門市取卡
const mineGetcard = () =>
    import ( /* webpackChunkName: "mineGetcard" */ '../pages/mine/getcard.vue')
    //  合约
const contract = () =>
    import ( /* webpackChunkName: "contract" */ '../pages/contract/index')
    //服务计划
const serviceList = r => require.ensure([], () => r(require('../pages/business/businessList/serviceList')), 'business') //选服务计划（系列）
const serviceDetail = r => require.ensure([], () => r(require('../pages/business/businessList/serviceDetail')), 'business')
const serviceChoice = r => require.ensure([], () => r(require('../pages/business/businessList/serviceChoice')), 'business') // 新客上台，旗舰上台选服务计划
    //各种上台业务
const handleBase = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/handle-base')), 'phoneBusiness')
const baseInfo = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/base-info')), 'phoneBusiness')
const addressSelect = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/address-select')), 'phoneBusiness')
const confirmingInfo = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/confirming-info')), 'phoneBusiness')
const handleInfo = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/handle-info')), 'phoneBusiness')
const handlePay = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/handle-pay')), 'phoneBusiness')
const signature = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/signature')), 'phoneBusiness')
const coupon = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/choose-coupon')), 'phoneBusiness')
const resultBusiness = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/result-business.vue')), 'phoneBusiness')
const selectPhoneNumber = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/select-phoneNumber')), 'phoneBusiness')
const addressProof = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/address-proof')), 'phoneBusiness')
const selectInlandPhoneNumber = r => require.ensure([], () => r(require('../pages/business/phoneBusiness/select-inlandPhoneNumber')), 'phoneBusiness')
    // 繳費、增值
const contributionIndex = r => require.ensure([], () => r(require('../pages/contribution/index')), 'contributionIndex')
const contribution = r => require.ensure([], () => r(require('../pages/contribution/children/contribution')), 'contribution')
const contributionSuccess = r => require.ensure([], () => r(require('../pages/contribution/children/contribution-success')), 'contributionSuccess')
const appreciate = r => require.ensure([], () => r(require('../pages/contribution/children/appreciate')), 'appreciate')
const automatic = r => require.ensure([], () => r(require('../pages/contribution/children/automatic')), 'automatic')
const appreciateSuccess = r => require.ensure([], () => r(require('../pages/contribution/children/appreciate-success')), 'appreciateSuccess')

// 合约
// const chiAgt = r => require.ensure([], () => r(require('../pages/contract/Chi-Agt')), 'chiAgt')
// const engAgt = r => require.ensure([], () => r(require('../pages/contract/Eng-Agt')), 'engAgt')
const contractCont = r => require.ensure([], () => r(require('../pages/contract/contract-cont')), 'contractCont')

// 二维码支付页面
const pay = r => require.ensure([], () => r(require('../pages/pay/index')), 'payIndex')
const qrcodePay = r => require.ensure([], () => r(require('../pages/pay/qrcode-pay')), 'qrcodePay')
const paying = r => require.ensure([], () => r(require('../pages/pay/paying')), 'paying')
const failPay = r => require.ensure([], () => r(require('../pages/pay/fail-pay')), 'failPay')
Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            component: navigation,
            meta: {
                title: '导航'
            }
        }, {
            path: '/test',
            component: navigationTest,
            meta: {
                title: '测试'
            }
        },
        {
            path: '/sign',
            name: "shoppingSign",
            component: shoppingSign,
            meta: {
                title: '簽名'
            }
        },
        { //二维码支付
            path: '/pay',
            name: "payIndex",
            component: pay,
            children: [{
                    path: 'qrcodePay',
                    name: 'qrcodePay',
                    component: qrcodePay,
                    meta: {
                        title: '訂單支付'
                    }
                },
                {
                    path: 'paying',
                    name: 'paying',
                    component: paying,
                },
                { // 支付失败
                    path: 'failPay',
                    name: 'failPay',
                    component: failPay,
                    meta: {
                        title: '支付失敗'
                    }
                }
            ]
        },
        {
            path: '/shopping',
            component: shopping,
            children: [{
                    path: 'list',
                    name: "shoppingList",
                    component: shoppingList,
                    meta: {
                        title: "全部商品"
                    }
                },
                {
                    path: 'choose',
                    name: "shoppingChoose",
                    component: shoppingChoose
                },
                {
                    path: 'detail',
                    name: "shoppingDetail",
                    component: shoppingDetail,
                    meta: {
                        title: ''
                    }
                },
                {
                    path: 'cart',
                    name: "shoppingCart",
                    component: shoppingCart,
                    meta: {
                        title: '購物車'
                    }
                },
                {
                    path: 'search',
                    name: "shoppingSearch",
                    component: shoppingSearch,
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: 'login',
                    name: "shoppingLogin",
                    component: shoppingLogin,
                    meta: {
                        title: '登錄'
                    }
                },
                {
                    path: 'pick',
                    name: "shoppingPick",
                    component: shoppingPick,
                    meta: {
                        title: '現有客戶買手機'
                    }
                },
                {
                    path: 'check',
                    name: "shoppingCheck",
                    component: shoppingCheck,
                    meta: {
                        title: '確認訂單'
                    }
                },
                {
                    path: 'result',
                    name: "shoppingResult",
                    component: shoppingResult,
                    meta: {
                        title: '購買結果'
                    }
                },
            ]
        },
        {
            path: '/select',
            component: select,
            children: [{
                path: 'goods',
                name: 'selectGoods',
                component: selectGoods,
                meta: {
                    title: '選貨'
                }
            }, {
                path: 'selectSearch',
                name: 'selectSearch',
                component: selectSearch,
                meta: {
                    title: '搜索'
                }
            }]
        }, {
            path: '/store',
            component: store,
            children: [{
                path: 'home',
                component: storeHome
            },{
                    path: 'prefecture',
                    name: 'prefecture',
                    component: prefecture
            }]
        }, {
            path: '/business',
            component: business,
            children: [{
                path: 'handleBase',
                component: handleBase,
                children: [{
                        path: 'baseInfo',
                        name: "baseInfo",
                        component: baseInfo,
                        meta: {
                            keepAlive: true,
                            // title: '帶機上台'
                        }
                    },
                    {
                        path: 'addressSelect',
                        name: 'addressSelect',
                        component: addressSelect
                    },
                    {
                        path: 'confirmingInfo',
                        name: "confirmingInfo",
                        component: confirmingInfo,
                        meta: {
                            title: '確認信息'
                        }
                    },
                    {
                        path: 'handleInfo',
                        name: "handleInfo",
                        component: handleInfo,
                        meta: {
                            keepAlive: true,
                            title: '完善上台資料'
                        }
                    },
                    {
                        path: 'handlePay',
                        name: "handlePay",
                        component: handlePay,
                        meta: {
                            title: '支付'
                        }
                    },
                    {
                        path: 'signature',
                        name: "signature",
                        component: signature
                    },
                    {
                        path: 'coupon',
                        name: "coupon",
                        component: coupon,
                        meta: {
                            title: '選擇優惠'
                        }
                    },
                    {
                        path: 'resultBusiness',
                        name: "resultBusiness",
                        component: resultBusiness
                    },
                    {
                        path: 'selectPhoneNumber',
                        name: "selectPhoneNumber",
                        component: selectPhoneNumber,
                        meta: {
                          title: '選擇號碼'
                        }
                    },
                    {
                        path: 'selectInlandPhoneNumber',
                        name: "selectInlandPhoneNumber",
                        component: selectInlandPhoneNumber,meta: {
                          title: '選擇號碼'
                        }
                    },
                    {
                        path: 'addressProof',
                        name: "addressProof",
                        component: addressProof
                    },
                    {
                        path: 'serviceList',
                        name: "serviceList",
                        component: serviceList,
                        meta: {
                          title: '選擇服務計劃'
                        }
                    },
                    {
                        path: 'serviceDetail',
                        name: "serviceDetail",
                        component: serviceDetail,
                        meta: {
                          title: '選擇服務計劃'
                        }
                    },
                    {
                        path: 'serviceChoice',
                        name: "serviceChoice",
                        component: serviceChoice,
                        meta: {
                          title: '選擇服務計劃'
                        }
                    },
                ]
            }, ]

        }, {
            path: '/mine',
            component: mine,
            children: [{
                    path: 'order',
                    name: 'mineOrder',
                    component: mineOrder,
                    children: [{
                            path: 'list',
                            name: 'mineOrderList',
                            component: mineOrderList,
                            meta: {
                                title: '訂單明細',
                                keepAlive: true
                            }
                        },

                        {
                            path: 'detail',
                            name: 'mineOrderDetail',
                            component: mineOrderDetail,
                            meta: {
                                title: '訂單詳情'
                            }
                        },
                        {
                            path: 'result',
                            name: 'orderResult',
                            component: orderResult
                        },
                        {
                            path: '*',
                            redirect: 'list'
                        },
                    ]
                },
                {
                    path: 'business',
                    name: 'mineBusiness',
                    component: mineBusiness,
                    children: [{
                            path: 'list',
                            name: 'mineBusinessList',
                            component: mineBusinessList,
                            meta: {
                                title: '業務明細',
                                keepAlive: true
                            }
                        },
                        {
                            path: 'detail',
                            name: 'mineBusinessDetail',
                            component: mineBusinessDetail,
                            meta: {
                                title: '詳情'
                            }
                        }
                    ]
                },
                {
                    path: '/contributionIndex',
                    component: contributionIndex,
                    children: [{
                            name: 'contribution',
                            path: 'contribution',
                            component: contribution,
                            meta: {
                                title: '繳費',
                                keepAlive: true
                            }
                        },
                        {
                            name: 'contributionSuccess',
                            path: 'contributionSuccess',
                            component: contributionSuccess,
                            meta: {
                                title: '繳費成功'
                            }
                        },
                        {
                            name: 'appreciate',
                            path: 'appreciate',
                            component: appreciate,
                            meta: {
                                title: '儲值卡增值'
                            }
                        },
                        {
                            name: 'automatic',
                            path: 'automatic',
                            component: automatic,
                            meta: {
                                title: '申請信用卡自動轉賬',
                                keepAlive: true
                            }
                        },
                        {
                            name: 'appreciateSuccess',
                            path: 'appreciateSuccess',
                            component: appreciateSuccess,
                            meta: {
                                title: '儲值成功'
                            }
                        },
                    ]
                },
                {
                    name: "mineGetcard",
                    path: "mineGetcard",
                    component: mineGetcard,
                    meta: {
                        title: '門市取卡'
                    }
                }
            ]
        }, {
            path: '/contract',
            name: 'contract',
            component: contract,
            children: [{
                path: 'contractCont',
                name: 'contractCont',
                component: contractCont
            }]
        }
    ]
})
