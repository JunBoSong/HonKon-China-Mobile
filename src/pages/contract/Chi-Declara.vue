<template>
<table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.20rem;position:relative;height:65px;" colspan="6">
                <img style="position: absolute;left: 0px;top: 40%;width: 1.5rem;" src="../../assets/images/logo.png">中國移動香港儲值卡卡主申請上台聲明表格</td>
        </tr>
        <tr>
            <td colspan="6">致：中國移動香港有限公司（簡稱“中國移動香港”）</td>
        </tr>
        <tr>
            <td colspan="6">本人/吾等&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:4rem;">{{dataInfo.customerName}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">身份証號碼 / 護照號碼 / 商業登記證號碼&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.hkIdNo}}</span>
            </td>
        </tr>
        <tr>
            <td>現特此聲明為</td>
        </tr>
        <tr>
            <td colspan="6">流動儲值卡電話號碼&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.mobileNo}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">儲值智能卡號碼&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.iccId}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">有效期至&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.effectEndDate}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                （未能出示智能卡，請填上卡主證明書號碼&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">&nbsp</span>）
            </td>
        </tr>
        <tr>
            <td colspan="6">之合法及有效用戶，並申請上台。本人/吾等明白該儲值卡於轉用月費計劃生效日前一天晚上十時停止服務，而月費計劃智能卡則於月費計劃生效日凌晨四時前啟動。</td>
        </tr>
        <tr>
            <td style="border:1px solid black;    padding: 0.15rem 0.2rem;" colspan="6">
                茲此聲明以上資料屬實，但日後若有他人出示上述流動儲值卡電話號碼之卡主證明書要求使用此電話號碼，本人同意此申請立即作為及本人使用上述流動儲值卡電話號碼之權利被即時停止，所繳付之費用均不會退還給本人及不能轉讓，而上述電話號碼會給予該位能出示儲值卡卡主證明書之人仕使用。
                <br/>
                <br/>本人/吾等同意儲值卡因過期而無效或任何原因被終止服務，未用之餘額將不予退還或轉讓。
                <br/>
                <br/>本人/吾等確認若本人/吾等使用上述流動儲值卡電話電話號碼之權利被作廢，根據此聲明所簽訂之“通訊服務（一般）合約”及其附加合約均會同時終止，而中國移動香港亦無需對本人或其他人負上任何責任及賠償。
            </td>
        </tr>
        <tr style="text-align:right;">
            <td colspan="6" style="padding-right:44%;padding-top:20px;">
                聲明：
            </td>
        </tr>
        <tr style="text-align:right;">
            <td colspan="6" style="padding-right:1rem;">
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle;display: block;text-align: right;    margin-left: 4rem;" :src="dataImg" alt="" srcset="">
                <i style="display: inline-block;width: 3rem;border-top: 1px solid black;text-align: right;"></i>
                <span style="color:blue;display:block;">客戶簽署
                    <span style="color:red">及</span>公司蓋章
                    <span style="color:red;">（如適用）</span>
                    <br/>
                    <span style="color:black;">日期： {{dataInfo.effectEndDate}}</span>
                    <br/>
                    <span style="color:black;font-size:12px;">SA/PPC/1965/1208/007</span>
                </span>
            </td>
        </tr>
    </table>
</template>

<script>
import { vpResultHandle, vpCanvasDraw } from "@/components";
export default {
  props: {
    dataImg: {
      // 簽名圖片
      type: String,
      default: ""
    },
    dataInfo:{
        type:Object,
        default:{}
    }
  }
};
</script>

<style>

</style>
