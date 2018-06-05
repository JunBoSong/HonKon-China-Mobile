<template>
<table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.18rem;position:relative;height:65px;" colspan="6">
                <img style="position: absolute;left: 0px;top: 40%;width: 1.5rem;" src="../../assets/images/logo.png">流動電話號碼可攜服務申請表格
                <br/>Mobile Number Portability Application Form
                <span style="position:absolute; right:0;top:15px;font-size:.18rem;">Customer Copy</span>
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.18rem;">
            <td colspan="6">Customer Information 客戶資料</td>
        </tr>
        <tr>
            <td colspan="2">Name in English
                <br/> 英文/中文姓名
            </td>
            <td colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td>Mobile Number
                <br/> 流動電話號碼
            </td>
            <td>{{dataInfo.mobileNo}}</td>
            <td colspan="4">
                <input type="checkbox" :checked="dataInfo.isPrepaid == 'Y'?'checked':''" disabled="disabled">Prepaid SIM Service 儲值智能咭服務</td>
        </tr>
        <tr>
            <td colspan="3">ID No./Passport No./BR No.
                <br/> 身份證號碼 / 護照號碼 / 商業登記號碼
            </td>
            <td colspan="3">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td colspan="3">Donor Network Operator ("DNO")
                <br/> 現時使用之網絡營辦商 (供號網絡營辦商)
            </td>
            <td colspan="3">{{dataInfo.provider}}</td>
        </tr>
        <tr>
            <td colspan="3">Recipient Network Operator ("RNO")
                <br/> 擬轉往之網絡營辦商 (受號網絡營辦商)
            </td>
            <td colspan="3">China Mobile Hong Kong Co. Ltd.
                <br/>中國移動香港有限公司</td>
        </tr>
        <tr>
            <td colspan="2">Requested Cut-over Time
                <br/> 生效時間
            </td>
            <td colspan="2">08-NOV-2017 {{dataInfo.effectDate}}</td>
            <td>
                <span style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;">×</span>0100 - 0400 Hrs</td>
            <td>
                <span style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin-right:5px;height:15px;line-height:15px;">&nbsp</span>1200 - 1400 Hrs</td>
        </tr>
        <tr>
            <td colspan="6">Declaration by Customer of Prepaid SIM Service : (select as appropriate) 儲值智能咭服務客戶聲明 : (請選擇如適用)</td>
        </tr>
        <tr>
            <td colspan="6">
                <span v-if="dataInfo.isCertificate == 'Y'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin:20px 15px;height:15px;line-height:15px;float:left;">x</span>
                <span v-if="dataInfo.isCertificate == 'N'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin:20px 15px;height:15px;line-height:15px;float:left;">&nbsp</span>
                We are / I am the holder of the Cardholder Certificate for the Mobile Number, a copy of which is attached.
                <br/> 我們 / 我是載有上述流動電話號碼的咭主証明書持有人，現付上証明書副本。
                </td>
        </tr>
        <tr>
            <td colspan="6">
                <span v-if="dataInfo.isLoseCertificate == 'Y'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin:25px 15px;height:15px;line-height:15px;float:left;">x</span>
                <span v-if="dataInfo.isLoseCertificate == 'N'" style="border:1px solid black;display:inline-block;width:12px;text-align:center;margin:25px 15px;height:15px;line-height:15px;float:left;">x</span>
                We / I have lost our / my Cardholder Certificate for the Prepaid SIM Service associated with the Mobile Number allocated
                to us / me by the DNO.
                <br/> 我們 / 我已遺失由供號網絡營辦商編配給我們 / 我作儲值智能咭服務而載有上述流動電話號碼的咭主証明書。</td>
        </tr>
        <tr style="background:black;color:white;font-size:14px;">
            <td colspan="6">For Internal Use Only 只供本公司職員使用</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td>Ticket no.:
                <br/>票號</td>
            <td>{{dataInfo.ticketNo}}</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td style="padding-top:.8rem;" colspan="2">
                07/09/17 {{dataInfo.currentDate}}
                <hr/> Date(D/M/Y)
                <br/> 日期（日/月/年）
            </td>
        </tr>
        <tr>
            <td  colspan="6">
              <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
              <div style="margin-top:.5rem;border-top:1px solid #e8e8e8;">
                We / I accept the attached / overleaf / website Terms & Conditions
                <br/> Customer Signature (with Company Chop if appropriate)
                <br/> 我們 / 我接受附頁/本頁背面/ 網上的服務條款與細則
                <br/> 客戶簽署(公司印鑒如適用)
              </div>
                
            </td>
        </tr>
        <tr>
            <td style="font-weight:bold;font-size:.18rem;" colspan="6">
                Terms & Conditions of Mobile Number Portability Application
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:77px;">1.</span>Subject to the successful porting of the Mobile Number to the RNO‚ we/I request the DNO to terminate
                the voice / data / fax services on the Mobile Number with effect from the Requested Cut-over Time. The continuation
                of other services provided by the DNO‚ if any‚ shall be subject to the applicable terms and conditions for
                such services of the DNO.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:36px;">2.</span>We/I request the DNO and the RNO to effect the porting of the Mobile Number to the RNO's network
                with effect from the Requested Cut-over Time.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:57px;">3.</span>We/I understand that the porting of the Mobile Number does not affect our/my obligations owing to
                the DNO incurred prior to the successful porting of the Mobile Number under the applicable service terms
                and conditions of the DNO.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:115px;">4.</span>The Requested Cut-over Time is subject to the DNO's confirmation of the details herein and the technical
                arrangements between the DNO and the RNO in accordance with the Code of Practice related to the Implementation
                of Mobile Number Portability issued by the Telecommunications Authority. For the purposes of effecting the
                arrangements as detailed in paragraphs 1 and 2 herein, the RNO is hereby expressly authorized to change the
                Requested Cut-over Time as the RNO may reasonably consider appropriate.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:57px;">5.</span>In the event that the Mobile Number cannot be ported to the RNO's network due to the incomplete‚
                wrong or false information provided by us/me or any grounds beyond the reasonable control of the RNO‚ the
                RNO has the right to cancel this porting application.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:75px;">6.</span>Except for any liability which cannot be excluded by law‚ we/I agree that the DNO and the RNO will
                not be liable to us/me or any other party in contract‚ tort or otherwise for any loss or damage suffered
                by us/me or any other party howsoever arising from or in relation to this application and the related number
                porting arrangements.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:76px;">7.</span>We/I agree and authorize that our/my personal data disclosed herein may be transferred to all relevant
                parties who may require access to our/my personal data in connection with this application and we/I understand
                that we/I may request access to and corrections of our/my personal data.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:75px;">8.</span>We/I confirm and declare that all information provided herein by us/me are accurate and correct
                and we/I shall be wholly liable for and shall fully indemnify each of the RNO and the DNO against any costs‚
                claims‚ demands‚ liabilities and expenses resulting from our/my breach of this clause.</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:36px;">9.</span>We/I agree that no request for cancellation of this porting application will be entertained after
                17:00 on the day immediately before the Requested Cut-over Time.</td>
        </tr>
        <tr>
            <td style="font-weight:bold;font-size:.18rem;" colspan="6">
                申請流動電話號碼可攜服務之服務條款與細則
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:58px;">1.</span>倘若有關流動號碼成功轉攜至受號網絡營辦商，我們/我要求供號網絡營辦商於生效時間終止有關流動號碼的話音/數據/傳真服務。供號網絡營辦商如繼續提供其他服務，將受限於適用於該等服務的相關條款與細則。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:36px;">2.</span>我們/我要求供號網絡營辦商及受號網絡營辦商於生效時間將有關流動號碼轉攜至受號網絡營辦商的網絡。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:37px;">3.</span>我們/我明白有關流動號碼的轉攜並不影響有關流動號碼成功轉攜前我們/我在供號網絡營辦商適用的服務條款與細則下對供號網絡營辦商的責任。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:56px;">4.</span>生效時間受供號網絡營辦商確認上述資料及供號營辦商與受號網絡營辦商之間按電訊管理局局長所發出的與實施流動電話號碼可攜性有關的實務守則技術安排的限制。為上文第1及2段提及的生效安排的目的，受號網絡營辦商獲明示授權更改受號網絡營辦商合理地認為合適的生效時間。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:57px;">5.</span>有關流動號碼若由於我們/我未有提供完整的資料，或提供錯誤或失實的資料或因非受號網絡營辦商所能合理控制的任何理由，而導致流動電話號碼無法攜帶至受號網絡營辦商的網絡，受號網絡營辦商有權取消本轉攜申請。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:56px;">6.</span>除任何無法卸除的法律責任外，我們/我同意因本申請和相關號碼轉攜安排引致或造成我們/我或其他任何人士蒙受損失或損害，供號網絡營辦商及受號網絡營辦商均無需對我們/我或任何其他人士負上法律責任（不論是在合約、侵權或其他方面）。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:36px;">7.</span>我們/我同意及授權我們/我在本表格披露的個人資料可能轉移予所有需要查閱我們/我在本申請所提供的個人資料的有關人士。我們/我亦明白我們/我可要求查閱及改正我們/我的個人資料。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;height:56px;">8.</span>我們/我確認及聲明我們/我在本表格提供的所有資料均屬真確。如果我們/我違反本條款而導致任何訟費、申索、要求、責任及開支，我們/我需負上全部責任及向受號網絡營辦商和供號網絡營辦商做出十足賠償。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;">9.</span>我們/我同意在生效時間前一天下午五時後提出的轉攜申請取消要求將不獲受理。
            </td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="6">
                M/NS/MNPT&C/1965/0604/004
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
