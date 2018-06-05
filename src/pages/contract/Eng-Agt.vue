<template>
      <table style="width:95%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.5rem;" src="../../assets/images/logo.png">THE (GENERAL) CONTRACT FOR
                <br/> TELECOMMUNICATIONS SERVICES
            </td>
        </tr>
        <tr style="line-height:20px;">
            <td colspan="2">Registered Customer Name：{{dataInfo.customerName}}</td>
            <td colspan="2">Mobile No.:{{dataInfo.mobileNo}}</td>
            <td colspan="2">Customer No:{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td colspan="2">This Agreement is made between China Mobile Hong Kong Co. Ltd.("CMHK") and the customer named below:</td>
            <td colspan="2">Contract Date:
                <br/>{{dataInfo.ContractEffectDate}}
            </td>
            <td colspan="2">Service Commencement Date:
                <br/>{{dataInfo.ServiceEffectDate}}
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Customer Details</td>
        </tr>
        <tr>
            <td colspan="2">Registered Customer Name:</td>
            <td colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td colspan="2">HKID No./BR No.:</td>
            <td colspan="4">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td>Tel. No.:</td>
            <td></td>
            <td colspan="2">Preferred language for future correspondence, sms and invoice^</td>
            <td colspan="2">English</td>
        </tr>
        <tr>
            <td colspan="2">Pager/Mobile No.:{{dataInfo.mobileNo}}</td>
            <td colspan="2">Fax No.:</td>
            <td colspan="2">Email Address:{{dataInfo.email}}</td>
        </tr>
        <tr>
            <td>Registered Address:</td>
            <td colspan="5">FLAT R 55/F BLK ED,BROADVIEW GARDEN
                <br/> SHEUNG WAN HK</td>
        </tr>
        <tr>
            <td colspan="3">Attn.:</td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td colspan="6">^ Where this part is not completed, Chinese will be used for future correspondence and sms until you notify CMHK
                in writing otherwise.</td>
        </tr>
        <tr>
            <td>Customer Password:</td>
            <td colspan="5">Individual Customer:By customer self setup at CMHK website or Hotline</td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Service Details & Charges</td>
        </tr>
        <tr>
            <td>Mobile No.:</td>
            <td>{{dataInfo.mobileNo}}</td>
            <td colspan="2">China Number:{{dataInfo.cnMobileNo}}</td>
            <td colspan="2">SIM No.:
                <br/>{{dataInfo.iccId}}
            </td>
        </tr>
        <tr>
            <td colspan="2">Service Plan:</td>
            <td colspan="4">{{dataInfo.serviceName}}</td>
        </tr>
        <tr>
            <td colspan="2">Free Minutes:</td>
            <td colspan="4">{{dataInfo.callTime}}</td>
        </tr>
        <tr>
            <td colspan="2">Monthly Fee:</td>
            <td>${{dataInfo.monthFee/100}}   </td>
            <td colspan="3">Airtime usage of less than one minute will be rounded up to one minute.</td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Application for IDD Services</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" :checked="dataInfo.isOpenIDD == 'Y'? 'checked': ''" disabled="disabled">Apply for IDD001 Service (Using an IDD service in Hong Kong, or when roaming in Mainland China or in worldwide
                roaming destinations)</td>
        </tr>
        <tr style="vertical-align: text-top;">
            <td style="border:1px solid black;" colspan="2">
                <input type="checkbox" :checked="dataInfo.isDeposit == 'Y'? 'checked': ''" disabled="disabled">HK$1000 Deposit Fee
                <br/>If the Customer does not wish to settle monthly bill by Credit Card Direct Debit, a refundable HK$1000 Deposit
                Fee is required</td>
            <td style="border:1px solid black;" colspan="4">
                <input type="checkbox" :checked="dataInfo.isNoneDeposit == 'Y'? 'checked': ''" disabled="disabled">HK$1000 Deposit Fee Waived^
                <br/>^The Customer shall use Credit Card Direct Debit to settle monthly fee and upon presentation one of the following:
                Hong Kong
                <br/>Identity Card, Business Registration or Certificate of Incorporation.
                <br/>
                <br/>If the Customer cancels Credit Card Direct Debit, CMHK shall automatically terminate the IDD001 service to
                the Customer without prior notice.
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">Remark: Applicable IDD charges will be incurred when using the IDD001 service. Please refer to http://www.hk.chinamobile.com
                for the latest IDD rate which is subject to change from time to time without prior notice.</td>
        </tr>
        <tr>
            <td colspan="6">Additional Value Added Service</td>
        </tr>
        <tr>
            <td colspan="3" :key="index" v-for="(item,index) in dataInfo.vasNameList" v-if="index < 2" style="width:50%; border:1px solid black;height:20px;">{{item}}</td>
        </tr>
        <tr>
            <td colspan="6">Free Value-added Service (Please refer to Supplementary Agreement for details)</td>
        </tr>
        <tr>
            <td colspan="6">Customer has agreed and is required to pay an additional monthly fee towards MTR/Tunnels/Mobile Services License
                & Administration Fees regardless of the service plan he/she has selected: $18</td>
        </tr>
        <tr>
            <td colspan="2">Billing cut-off date is</td>
            <td colspan="2">{{dataInfo.dayNum}}</td>
            <td colspan="2">(SIM PIN Code): 8888</td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.5rem;" src="../../assets/images/logo.png">THE (GENERAL) CONTRACT FOR
                <br/> TELECOMMUNICATIONS SERVICES
            </td>
        </tr>
        <tr style="line-height:20px;">
            <td colspan="2">Registered Customer Name：{{dataInfo.customerName}}</td>
            <td colspan="2">Mobile No.:{{dataInfo.mobileNo}}</td>
            <td colspan="2">Customer No:{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">The target first bill cut-off date is on // (dd/mm/yyyy).The target first bill cycle date is the day
                immediately after the target first bill cut-off date.
                <br/>Customer shall prepay the first instalment of the above mentioned monthly service fee prior to the target
                service commencement date.
                <br/>
                <br/>Thereafter and on the actual first bill cycle date on which the 1st bill will be issued to Customer, any
                additional service fee (excluding Administration Fees, VAS(if any)) prepaid by the Customer in the first
                instalment will be credited back to the Customer's mobile account on a pro-rata basis (according to the number
                of days in that bill month) should the period between the actual service commencement date and the actual
                first bill cut off date be less than a complete bill month.</td>
        </tr>
        <tr>
            <td>
                <span style="text-decoration: underline;">Additional Features*</span>
            </td>
            <td colspan="5">
                The following features' first and second (if applicable) month's monthly fee will be charged together on your 1st monthly
                invoice)
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="3">CN 1CMN & Free 100 China mins $59</td>
            <td style="border:1px solid black;" colspan="3"></td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Applicable to Service Plan Subscriber with Minimum Service Period only</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">No subscription required􀁨the following IDD services will automatically apply
                <br/> •Hong Kong IDD 001 service (to use IDD service in Hong Kong)
                <br/> •China Roaming IDD service (to use IDD service when roaming in Mainland China)
                <br/>
                <br/> Remark: Applicable charges will be incurred when using the abovementioned service. Please refer to http://www.hk.chinamobile.com
                for the latest charges which is subject to change from time to time without prior notice.
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Applicable to Service Plan Subscriber</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">No subscription required􀁨the following services will automatically apply*
                <br/> •Roaming Call Back & International Roaming - Voice & Data
                <br/> •IDD 1597 Service (to call designated destinations in Hong Kong)
                <br/> •Local Wi-Fi Service
                <br/>
                <br/> *Unless otherwise specified in the Additional Supplementary Agreement
                <br/> Remark: Applicable charges will be incurred when using the abovementioned service. Please refer to http://www.hk.chinamobile.com
                for the latest charges which is subject to change from time to time without prior notice.
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;height:20px;" colspan="6"></td>
        </tr>
        <tr>
            <td colspan="6">CMHK intends to use your name, mobile phone number, correspondence address and email address for direct marketing
                of the following goods/services through different means. We may not so use your personal data unless we have
                received your consent. In this respect, please tick the box provided below to indicate your consent to:
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">receipt of direct marketing information and materials about telecommunication network products and services
                provided by CMHK, including mobile TV services and devices, handset offers of handset vendors, any mobile
                devices and accessories, gifts, discounts, benefits and other promotions and direct marketing information
                and materials about telecommunication network products and services provided by China Mobile International
                Limited.
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:2.5rem;border-top:1px solid black;">Agreed & Accepted by Customer</span>
                <br/>
                <br/>
            </td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.5rem;" src="../../assets/images/logo.png">THE (GENERAL) CONTRACT FOR
                <br/> TELECOMMUNICATIONS SERVICES
            </td>
        </tr>
        <tr style="line-height:20px;">
            <td colspan="2">Registered Customer Name：{{dataInfo.customerName}}</td>
            <td colspan="2">Mobile No.:{{dataInfo.mobileNo}}</td>
            <td colspan="2">Customer No:{{dataInfo.customerNo}}</td>
        </tr>
        <tr style="background:black;color:white;font-size:.22rem">
            <td colspan="6">Additional Supplementary Agreements</td>
        </tr>
        <tr>
            <td colspan="6">The Customer shall pay China Mobile Hong Kong Company Limited ( “ CMHK ” ) the service fee and observe the agreed
                and accepted terms and conditions of the privilege mentioned in th is supplementary agreement(s), in addition
                to the terms and conditions of the General Contract.
                <br/>
                <span style="font-weight:bold;text-decoration:underline;">IMPORTANT TERMS</span>
            </td>

        </tr>
        <tr>
            <td colspan="6">The Customer hereby declares that he/she has received a copy of this Supplementary Agreement and each of the
                below - listed additional supplementary agreements as attached and identified by their respective reference
                numbers, and that he/she fully understands, agrees and accepts the terms and conditions contained in this
                Supplementary Agreemen t as well as in these additional ly attached supplementary agreements . Customer further
                agrees and accepts that even though he/she does not actually sign on these additionally attached supplementary
                agreements , upon his/her signing on this Supplementary Agreement , Customers is deemed to be forthwith bound
                by all terms and conditions contained herein and printed on the those additional ly attached supplementary
                agreements .
            </td>
        </tr>
        <tr>
            <td colspan="6">Service Plan:</td>
        </tr>
        <tr>
            <td colspan="2">{{dataInfo.serviceName}}</td>
            <td colspan="4">4.5G_SIM_Only_Local_007E</td>
        </tr>

        <tr>
            <td colspan="6">Additional Supplementary agreement:</td>
        </tr>
        <tr>
            <td>Offer Code</td>
            <td colspan="2">Offer Description</td>
            <td>Supplementary Agreement Number
            </td>
            <td>Offer Period
            </td>
            <td>Liquidated Damages</td>
        </tr>
        <tr>
            <td>
                China 1CMN Voice Package 100
            </td>
            <td colspan="2">China 1CMN Voice Package 100</td>
            <td>China 1CMN Voice Pkg_015E_DMS
            </td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>N_4GLC_
                <br/>$70_FMTRX24M
                <br/>_AUTO_RM
                <br/>NO HK IDD & CHINA IDD
                <br/>TO ALL
                <br/>REV_N4GLC(UN)
                <br/>_24MTHFREEUEYE
            </td>
            <td colspan="2">
                4.5G Full Speed Local Service Plan (24 months)
                <br/>
                <br/>No IDD (HK to all) and IDD (China to all)
                <br/>
                <br/>Reserve 4.5 local 12GB Plan or above sign
                <br/>24mth Free U Eye
            </td>
            <td>4.5G_SIM Only_Local_waive
                <br/>$18_24mth_Offer_001E
            </td>
            <td>24</td>
            <td>The total amount for the remaining months</td>
        </tr>

        <tr>
            <td style="border:1px solid black;color:blue;" colspan="6">
                Auto-renewal Option
                <br/> By signing hereunder, I/we agree to the following terms and conditions:-
                <br/>
                <br/> Upon expiry of the term of this Supplementary Agreement, this Supplementary Agreement will be automatically
                extended at the prevailing market tariff for successive periods of 24 months each unless I/we notify CMHK
                otherwise before the expiration of an existing or any of the extended term(s) of this Supplementary Agreement
                via the hotline or retail shops of CMHK. The same terms and conditions shall apply unless otherwise stated.
                The said automatic extension is subject to the final and absolute discretion of CMHK at any times.
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:3.5rem;border-top:1px solid black;">Customer Signature
                    <span style="color:red">/</span>Company Chop
                    <span style="color:red;">(if applicable)</span>
                </span>
                <br/>
                <br/>
                <br/>
            </td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.5rem;" src="../../assets/images/logo.png">THE (GENERAL) CONTRACT FOR
                <br/> TELECOMMUNICATIONS SERVICES
            </td>
        </tr>
        <tr style="line-height:20px;">
            <td colspan="2">Registered Customer Name：{{dataInfo.customerName}}</td>
            <td colspan="2">Mobile No.:{{dataInfo.mobileNo}}</td>
            <td colspan="2">Customer No:{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                IMPORTANT TERMS
                <br/>
                <br/> As a condition precedent to CMHK continuing to provide mobile service to Customer, Customer shall provide
                the valid proof of address ( the issue date should be within three months) within 3 days upon the activation
                of the service, failing which CMHK has the right to terminate the mobile services without notice. On termination,
                all monies paid in respect of the handset and/or services under this Agreement will be forfeited, and, in
                addition, customer shall forthwith return to CMHK the entire amount or the equivalent value of discount,
                privilege or reward provided to Customer under the related Supplementary Agreement on the ground that of
                the Customer's failure to satisfy the Minimum Service Period requirement.
                <br/>
                <br/> •The monthly fees of all CMHK services are calculated on a monthly basis, which is defined as the period
                from the monthly invoice issue date in any month to the date immediately preceding the same date in the following
                month ("Bill Month"). Customer is required to pay a full Bill Month's service fee even if the service is
                used for less than a month or if this Agreement shall for whatever reason be terminated before the expiration
                of the current Bill Month. All fees paid including "Monthly Service Fee" and MTR/Tunnels/Mobile Services
                License & Administration Fees are non-refundable, non-transferable and non-transmissible. Termination of
                this Agreement shall be deemed to have taken place in the event of termination of the services and/or the
                Service Plan and/or the General Contract and/or the switching of the telecommunication service by Customer
                to another operator while retaining the same telephone number.
                <br/> •Customer who wishes to change Service Plan is required to inform CMHK at least two business days before
                the bill issue date of the current Bill Month (as shown on the front page of the monthly invoice). If Customer
                gives CMHK less than the required two business days' notice, the new service plan will only be effective
                on the first day of the Bill Month after the following.
                <br/> •In addition to complying with the terms and conditions of this Agreement, Customer hereby acknowledges
                receipt of a copy of the attached supplementary agreement(s) (if any) and agrees to comply with the terms
                and conditions contained therein.
                <br/> •The Customer hereby declares that a copy of the English version of the terms and conditions contained attched
                has been received and that he fully understands and accepts the contents thereof.
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">1.</span>
                <div style="display:inline-block;width:96%;">This Supplementary Agreement , together wi th the additional supplementary agreements hereto attached , is
                    an inseparable and integral part of the "The (General) Contract for Telecommunications Services" containing
                    the Terms and Conditions ("General Contract") which the Customer has executed in respect of the service
                    plan ("Service Plan") he/she has subscribed.</div>
                <span style="float:left;width:4%;">2.</span>
                <div style="display:inline-block;width:96%;">The mentioned information and rates or tariffs are subject to change without prior consent from or notice
                    to customer . Any amendment will be published on CMHK website.</div>
                <span style="float:left;width:4%;">3.</span>
                <div style="display:inline-block;width:96%;">All terms & conditions stated in this Supplementary Agreement and the additional supplementary agreements
                    hereto attached are subject to the Terms and Conditions for the " General Agreement " from time to time
                    in force ( " The General Conditi on " ). In case of conflict or inconsistency between the terms and conditions
                    contained herein and the General Condition, the former shall prevail to the extent of such inconsistency.
                </div>
                <span style="float:left;width:4%;">4.</span>
                <div style="display:inline-block;width:96%;">The Customer declares that the information stated above is true and accurate and undertake to inform CMHK
                    of any change of information immediately. Both parties hereby agree to be bound by the terms and conditions
                    attached hereto entitled "The (General) Contract for the Provision of Telecommunication Services and
                    Handset Purchase Terms and Conditions" which shall form an inseparable and integral part of this Agreement.</div>
                <span style="float:left;width:4%;">5.</span>
                <div style="display:inline-block;width:96%;">The Customer acknowledges receipt of the above equipment in good condition. The Customer understands that
                    the risk of property of the said equipment will thereafter be passed onto him/her.</div>
                <span style="float:left;width:4%;">6.</span>
                <div style="display:inline-block;width:96%;">CMHK reserves its rights to vary the charges from time to time.</div>
            </td>
        </tr>

        <tr>
            <td style="padding-top:1rem;" colspan="3">
                <img style="width:50%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:2.5rem;border-top:1px solid black;">Customer Signature/Company Chop</span>
            </td>
            <td colspan="3">
                    China Mobile Hong Kong Co. Ltd.
                <br/> Outlet Code : PT01
                <br/> Staff ID : P2780
                <br/> Website : www.hk.chinamobile.com
                <br/> 24-hour Customer Care Hotline: 2945 8888
                <br/> This is computer print out carry no signature
                <br/>
            </td>
        </tr>
    </table>
</template>

<script>
import { vpResultHandle, vpCanvasDraw } from "@/components";
export default {
    props:{
    dataImg:{ // 簽名圖片
      type:String,
      default:''
    },
    dataInfo: {
      type: Object,
      default:{}
    }
  }
};
</script>

<style>

</style>
