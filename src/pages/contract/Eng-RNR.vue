<template>
<table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.18rem;position:relative;height:65px;" colspan="6">
                《Personal Information Collection Statement & Customer Consent Letter for the Real Name Registration Policy of the Mainland
                China》
            </td>
        </tr>
        <tr>
            <td colspan="6">This Statement is made by China Mobile Hong Kong Company Limited (“We” or “CMHK”) in accordance with the Personal
                Data (Privacy) Ordinance (Cap.486) (“PDPO”). For the purpose of this Statement, personal data shall carry
                the meaning as defined in PDPO.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">1.</span>
                <div style="display:inline-block;width:96%;">Personal Data to be collected and purposes: In light of the mobile number real name registration of the Mainland
                    Chinese Government, it is necessary for us to collect your personal data including your name, mobile
                    numbers, contact information, personal photo and the information of your Mainland Travel Permit for Hong
                    Kong and Macao Residents, Hong Kong Identity Card, China Resident Identity Card, Foreign Residents’ passport
                    or other identity documents and other information (“the said personal data”) in order to assist you to
                    comply with the said mobile number real name registration (“the Registration”).</div>
            </td>
        </tr>
        <tr>
            <td style="padding-top:10px;" colspan="2">Name of a/c holder:</td>
            <td style="padding-top:10px;" colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td colspan="2">Name of user:</td>
            <td colspan="4">{{dataInfo.registerName}}</td>
        </tr>
        <tr>
            <td colspan="2">ID document type:</td>
            <td colspan="4">香港身份證</td>
        </tr>
        <tr>
            <td colspan="2">ID number:</td>
            <td colspan="4">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td colspan="2">Mainland China mobile no.:</td>
            <td colspan="4">{{dataInfo.cnMobileNo}}</td>
        </tr>
        <tr>
            <td colspan="2">Customer Number:</td>
            <td colspan="4">{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td colspan="6">Remarks：(If applicable)</td>
        </tr>
        <tr>
            <td style="padding-left:4%;" colspan="6">You are not obliged to provide the said personal data to us. However, if you do not, the Mainland Chinese Government
                will have your Chinese mobile number suspended, and you may not be able to activate, use, or continue to
                use the telecommunication services with your Mainland China mobile number. In any event, the telecommunication
                services with your Hong Kong mobile number will NOT be affected.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">2.</span>
                <div style="display:inline-block;width:96%;">Transfer and disclosure: To facilitate the purposes set out above and other purposes incidental thereto,
                    we may transfer, disclose, grant access to, share your personal data in the above with the following
                    parties (whether within or outside Hong Kong): (a) China Mobile Communications Corporation which is headquartered
                    in Mainland China, its associated companies, or affiliates of, or companies controlled by, or under common
                    control with China Mobile Communications Corporation, or its contractors (if applicable); and (b) Mainland
                    Chinese Government and its authorized agencies.</div>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">3.</span>
                <div style="display:inline-block;width:96%;">You are entitled to access or correct your personal data held by us. If you wish to obtain a copy of any
                    of your personal data or if you believe that any of your personal data which we collect and maintain
                    is inaccurate, please write to
                    <span style="text-decoration:underline">Data Privacy Officer, China Mobile Hong Kong Company Limited, L20, Tower 1, Kowloon Commerce Centre,
                        No. 51, Kwai Cheong Road, Kwai Chung, New Territories, Hong Kong.</span>We have the right to charge
                    a reasonable fee for the processing of any data access request in accordance with the PDPO.</div>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">4.</span>
                <div style="display:inline-block;width:96%;">Disclaimer: The Registration is subject to the final approval of the Mainland Chinese Government, we only
                    offer assistance in the Registration (“the Assistance”). We make no warranties that the Registration
                    will be successful. We assume no liability for the accuracy and timeliness for the transfer of the said
                    personal data. To the largest extent permitted by law, we shall not incur any liability to you in relation
                    to the Assistance and the Registration.</div>
            </td>
        </tr>
        <tr>
            <td style="color:red;" colspan="6">ANTI-FRAUD ALERT: Under NO circumstances will we or any Mainland Authorities make phone calls to you to collect
                your bank account information, passwords or personal data.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>I have read, understood and agreed to this Statement, the General Personal Information Collection
                Statement, and the Privacy Policy Statement.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>The full texts of the General Personal Information Collection Statement and the Privacy Policy Statement
                are available at https://www.hk.chinamobile.com/en/pics.html and https://www.hk.chinamobile.com/en/privacy.html respectively.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>I confirm the said personal data is accurate and understand that the Registration may be rejected by the Mainland Chinese
                Government in case of data inaccuracy.</td>
        </tr>
        <tr>
            <td style="padding-top:80px; height:2rem;overflow:hidden;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.registerName}}</div>
                <span>Name</span>
            </td>
            <td style="padding-top:80px;width:270px;height:2rem;overflow:hidden;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;"><img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset=""></div>
                <span>Customer Signature/Company Chop</span>
            </td>
            <td style="padding-top:80px;height:2rem;overflow:hidden;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.time}}</div>
                <span>Date</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">Note: CMHK reserves the right to amend this statement from time to time.</td>
            <td colspan="2" style="text-align:right;">2017.09.01 version</td>
        </tr>
        <tr>
            <td style="text-align:center;" colspan="6">[For internal use only]</td>
        </tr>
        <tr>
            <td colspan="6">Signatures of new subscription for the Real Name Registration:</td>
        </tr>
        <tr>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">&nbsp</div>
                <span>Staff Signature</span>
            </td>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">&nbsp</div>
                <span>Shop Manager/Account Manager Signature</span>
            </td>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.time}}</div>
                <span>Date</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">Note: CMHK reserves the right to amend this statement from time to time.</td>
            <td colspan="2" style="text-align:right;">2017.09.01 version</td>
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
        default : {}
    }
  }
};
</script>

<style>

</style>
