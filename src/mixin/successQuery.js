//在下单成功页面调用
import { vpPageResult } from '@/components'
import { _businessOrderquery } from '@/service';
import time from '@/utils/timeFormat'
export default {
    data() {
        return {
            orderInfo: {}
        }
    },
    components: {
        vpPageResult
    },
    computed: {
        orderNo() { //订单号
            return this.$route.query.orderNo
        }
    },
    methods: {
        async query() { //查询订单信息
            if (!this.orderNo)
                return this.$vux.alert.show('订单号异常')
            let res = await _businessOrderquery({
                orderNo: this.orderNo
            })
            let businessInfo = JSON.parse(res.dataInfo.businessHandleInfo);
            businessInfo.handleTime = time(businessInfo.handleTime * 1, 'YYYY-MM-DD')
            this.orderInfo = businessInfo;
        }
    },
    created() {
        this.query();
    }
}