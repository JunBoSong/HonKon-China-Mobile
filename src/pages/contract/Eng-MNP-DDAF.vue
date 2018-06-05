<template>
 <table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:0.16rem;position:relative;height:65px;font-weight:bold;" colspan="6">
                <img style="position: absolute;left: 0px;top: 40%;width: 1.4rem;" src="../../assets/images/logo.png">
                <span style="position:absolute; left:16%;top:15px;font-size:.16rem;text-align:center;">
                  信用卡直接授權書
                <br/>Credit Card Direct Debit Authorization Form
                </span>
                <span style="position:absolute; right:0;top:15px;font-size:.16rem;text-align:left;">Enter Date:{{dataInfo.EnterDate}}
                    <br/>Shop Code: {{dataInfo.shopCode}}</span>
            </td>
        </tr>
        <tr>
            <td style="font-weight:bold;" colspan="6">
                本人／我們現授權中國移動香港有限公司（“中國移動香港”）從本人仍然生效之信用卡戶口（包括因當信用卡被更新後有效期與原有之登記不同時）中扣除本人所要繳付予中國移動香港之逾期未付之費用及／或應繳付款項之全數（不論中國移動香港賬單寄出與否）直至中國移動香港收到本人另書面通知終止自動轉賬為止。
            </td>
        </tr>
        <tr>
            <td colspan="6">
                I/We, the undersigned, hereby irrevocably authorize China Mobile Hong Kong Company Limited (“CMHK”) to direct debit all amounts
                payable and /or due to CMHK (irrespective of whether the bill(s) have been sent) from my valid credit card
                account (even when the credit card is renewed and the valid date thus different from registered) until further
                written notice of otherwise.
            </td>
        </tr>
        <tr>
            <td colspan="2"><span style="font-weight:bold;">客戶名稱</span> Customer Name
            </td>
            <td colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td colspan="2"><span style="font-weight:bold;">流動電話號碼</span> Mobile No. </td>
            <td>{{dataInfo.mobileNo}}</td>
            <td colspan="2"><span style="font-weight:bold;">客戶號碼</span> Customer No.</td>
            <td>{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td>
                <span style="text-decoration:underline;font-weight:bold;">信用卡詳情 Credit Card Details</span>
            </td>
        </tr>
        <tr>
            <td colspan="3"><span style="font-weight:bold;">信用卡持卡人姓名</span> Card Holder Name:
            </td>
            <td colspan="3">{{dataInfo.cardHolderName}}</td>
        </tr>
        <tr>
            <td colspan="4"><span style="font-weight:bold;">香港身份證號碼（信用卡持卡人）</span> HKID No.(Cardholder):
            </td>
            <td colspan="2">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td colspan="4"><span style="font-weight:bold;">信用卡號碼</span> Credit Card Account No.
            </td>
            <td>
                <span v-show="dataInfo.creditCardType == 'VISA'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;">×</span>
                <span v-show="dataInfo.creditCardType != 'VISA'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;"></span>
                VISA
            </td>
            <td style="white-space: nowrap;">
                <span v-show="dataInfo.creditCardType == 'MASTER'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;">x</span>
                <span v-show="dataInfo.creditCardType != 'MASTER'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;"></span>
                MASTER
            </td>        
        </tr>
        <tr>
            <td colspan="6">
                 <span>{{dataInfo.creditCardAccountNo}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3"><span style="font-weight:bold;">信用卡簽發銀行</span> Card Issuing Bank:
            </td>
            <td colspan="3">{{dataInfo.cardIssuingBank}}</td>
        </tr>
        <tr>
            <td colspan="3"><span style="font-weight:bold;">信用卡到期日</span> Card Expiry Date:
            </td>
            <td colspan="3">{{dataInfo.cardExpiryDate}}</td>
        </tr>
        <tr>
            <td style="padding-top:1rem;">
              <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:3rem;">
                    <hr/>
                </span>
            </td>
        </tr>
        <tr>
            <td colspan="6"><span style="font-weight:bold;">信用卡持有人簽名</span> Cardholder Signature
            </td>
        </tr>
        <tr>
            <td colspan="6"><span style="font-weight:bold;">須與信用卡背面的簽署相同</span> Same as the signature in the back of the credit card
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
    dataInfo: {}
  }
};
</script>

<style>

</style>
