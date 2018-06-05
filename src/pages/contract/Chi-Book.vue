<template>
 <table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.20rem;position:relative;height:65px;font-weight:bold;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.6rem;" src="../../assets/images/logo.png">聲明書 Declaration
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <span style="font-weight:bold;">電話號碼</span>
                <br/>Mobile No.</td>
            <td colspan="3">
            <span>{{dataInfo.mobileNo}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <span style="font-weight:bold;">客戶編號</span>
                <br/>Cust.Code</td>
            <td colspan="3">
            <span>{{dataInfo.custCode}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <span style="font-weight:bold;">電話賬戶持有人姓名</span>
                <br/>Name of Mobile Account Holder</td>
            <td colspan="3">
            <span>{{dataInfo.customerName}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <span style="font-weight:bold;">信用卡持有人姓名</span>
                <br/>Name of Credit Card Holder</td>
            <td colspan="3">
            <span>{{dataInfo.cardHolderName}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <span style="font-weight:bold;">信用卡號碼</span>
                <br/>Credit Card Number</td>
            <td colspan="3">
            <span>{{dataInfo.creditCardAccountNo}}</span>
            </td>
        </tr>
        <tr>
            <td style="font-weight:bold;" colspan="6">
                本人（信用卡持有人），現同意代上述電話賬戶持有人，以信用卡支付上述電話賬戶之賬單費用，直至另行書面通知為止。
            </td>
        </tr>
        <tr>
            <td colspan="6">I,the above said Credit Card Holder agree to pay the monthly bill charge of the above said mobile account by
                the credit card abovementioned until further written notice.</td>
        </tr>
        <tr>
            <td colspan="6">
                <i style="display:block; padding-top:100px;"></i>
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <div style="border-bottom:1px solid black;width:3.5rem;"></div>
                <span>
                    <span style="font-weight:bold;">信用卡持有人簽名&nbsp&nbsp&nbsp</span> Cardholder Signature</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span>
                    <span style="font-weight:bold;">須與信用卡背面的簽署相同&nbsp&nbsp&nbsp</span>Same as the signature in the back of the credit card</span>
            </td>
        </tr>
        <tr>
            <td style="font-weight:bold;" colspan="3">日期 Date:</td>
            <td colspan="3">
            <span>{{dataInfo.EnterDate}}</span>
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
    dataInfo: {
        type: Object,
        default: {}
    }
  }
};
</script>

<style>

</style>
