<template>
     <table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.20rem;position:relative;height:65px;" colspan="6">
                <img style="position: absolute;left: 0px;top: 40%;width: 1.5rem;" src="../../assets/images/logo.png">
                <span style="position:absolute; left:25%;top:15px;font-size:.16rem;text-align:center;">
                  CMHK Prepaid SIM Card Cardholder Application
                <br/>for Subscription of Mobile Services Declaration Form
                </span>
                </td>
        </tr>
        <tr>
            <td colspan="6">To：China Mobile Hong Kong Co. Ltd. (“CMHK”)</td>
        </tr>
        <tr>
            <td colspan="6">I/We&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:4rem;">{{dataInfo.customerName}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">(*HKID No. / Passport No. / BR No.)&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.hkIdNo}}</span>
            </td>
        </tr>
        <tr>
            <td>declare that I/we am/are the legal and valid user of the</td>
        </tr>
        <tr>
            <td colspan="6">Stored Value SIM Card Mobile No&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.mobileNo}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">ICCID&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">{{dataInfo.iccId}}</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">expiry date&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">12/12/17</span>
            </td>
        </tr>
        <tr>
            <td colspan="6">and apply for subscription of mobile services.</td>
        </tr>
        <tr>
            <td colspan="6">
                (Cardholder Certificate No. if cannot produceSIM card&nbsp&nbsp&nbsp
                <span style="display:inline-block;border-bottom:1px solid black;width:2rem;">&nbsp</span>）
            </td>
        </tr>
        <tr>
            <td colspan="6">I/We understand that the aforesaid Stored Value SIM will be terminated at 22.00hrs one day before the effective
                date of the subscription of mobile service. The mobile service subscription will be activated by 04.00hrs
                on the mobile services effective date.</td>
        </tr>
        <tr>
            <td style="border:1px solid black;padding: 0.15rem 0.2rem;" colspan="6">
                I/We hereby declare that the above information is true and accurate. However, if someone other than myself/ourselves can
                at any time hereafter present the cardholder certificate of the above Stored Value SIM Card and request the
                use of the above mobile number, I/we agree that this application will be forthwith void and my/our right
                to use the above mobile number will be forfeited immediately. All monies or fees already paid will not be
                refunded nor transferred to other account (s). I/we agree and understand the above mobile number will be
                given to the one who can present the cardholder certificate.
                <br/>
                <br/>For SIM Card which as expired or service terminated due to whatever reasons, I/We accept that the remaining
                stored value is non-refundable or non-transferable.
                <br/>
                <br/>I/We accept that upon my/our right to use the above mobile number being forfeited. The General Contract and
                its Supplementary Agreement signed together with this declaration will also be terminated simultaneously.
                CMHK will not be liable to me or any person for any loss, damages or compensation, however arisen.
            </td>
        </tr>
        <tr style="text-align:right;">
            <td colspan="6" style="padding-right:44%;padding-top:20px;">
                Declared :
            </td>
        </tr>
        <tr style="text-align:right;">
            <td colspan="6" style="padding-right:1rem;">
                <br/>
                <br/>
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle;display: block;text-align: right;    margin-left: 4rem;" :src="dataImg" alt="" srcset="">
                <i style="display: inline-block;width: 3rem;border-top: 1px solid black;text-align: right;"></i>
                <span style="color:blue;display:block;">Customer Signature/Company Chop
                    <br/>
                    <span style="color:black;">Date : 07/09/17</span>
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
