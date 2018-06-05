<template>
 <table style="width:90%;margin:0 auto;line-height:20px;font-size:.18rem;" cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.18rem;position:relative;height:65px;" colspan="6">
                《針對中國內地流動電話號碼實名登記政策的個人資料收集聲明及客戶同意書》
            </td>
        </tr>
        <tr>
            <td colspan="6">本聲明是由中國移動香港有限公司（「我們」或「中國香港」）根據香港特別行政區法例第486章《個人資料（私隱）條例》（「條例」）而作出。本聲明內「個人資料」一詞含有條例所解釋的意義。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">1.</span>
                <div style="display:inline-block;width:96%;">收集的資料及目的：鑒於中國內地政府推行的流動電話號碼實名登記政策，我們須向閣下搜集閣下的個人資料，包括姓名、流動電話號碼、聯絡方法、個人相片、及港澳居民來往內地通行證、香港身份證、中國公民身份證、外國公民護照或者其他身份證明文件資料等（「上述資料」），以協助閣下向中國內地當局辦理實名登記（「上述登記」）。</div>
            </td>
        </tr>
        <tr>
            <td style="padding-top:10px;" colspan="2">註冊用戶名稱：</td>
            <td style="padding-top:10px;" colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td  colspan="2">使用者名稱：</td>
            <td colspan="4">{{dataInfo.registerName}}</td>
        </tr>
        <tr>
            <td  colspan="2">實名制證件類別：</td>
            <td colspan="4">香港身份證</td>
        </tr>
        <tr>
            <td  colspan="2">實名制證件號碼：</td>
            <td colspan="4">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td  colspan="2">中國內地流動電話號碼</td>
            <td colspan="4">{{dataInfo.cnMobileNo}}</td>
        </tr>
        <tr>
            <td  colspan="2">客戶編號：</td>
            <td colspan="4">{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td  colspan="6">其他補充資料：（如有）</td>
        </tr>
        <tr>
            <td style="padding-left:4%;" colspan="6">閣下沒有義務向我們提供上述資料，但如閣下不提供個人資料，中國當局會按相關政策指令停止閣下的中國號碼服務，閣下將無法開通、使用或繼續使用涉及中國內地流動電話號碼的電訊服務。但是，閣下香港流動電話號碼的電訊服務將不會受到影響。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">2.</span>
                <div style="display:inline-block;width:96%;">轉移及披露：我們可能會向以下各方轉移、披露或共用閣下以上的個人資料（不論是在香港境內或境外）以達到上述目的或相關的目的，包括（a）總部設於中國內地的中國移動通信集團公司（「中國移動集團」）、其附屬公司、關連公司，或由中國移動集團所持有或其同屬一家口控制公司的公司或聯營公司或承辦商（如適用）：及（b）中國內地政府及其授權的機關。</div>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">3.</span>
                <div style="display:inline-block;width:96%;">查閱及更正：閣下有查閱個人資料的權利。若閣下欲取得該等資料的副本或認為我們收集及保留了不準確的個人資料，請致函本公司地址：
                    <span style="text-decoration:underline">香港新界葵湧葵昌路51號九龍貿易中心1座20樓，中國移動香港有限公司資料保護主任。</span>有關查閱或更正個人資料的要求或對我們在收集顧客個人資料的政策和做法的查詢，可致函我們上述的地址。根據條例規定，我們有權為受理資料查核要求而收取合理費用。</div>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">4.</span>
                <div style="display:inline-block;width:96%;">免責聲明：中國內地政府擁有上述登記的最終審批權，我們在登記中僅提供協助（「上述協助」），並不保證登記成功。我們不保證上述資料送達的準確性或是否及時。在法律容許的最大程度下，我們不會就上述協助或登記承擔任何責任。</div>
            </td>
        </tr>
        <tr>
            <td style="color:red;" colspan="6">防騙提示：在任何情況下，我們或任何國內機關均不會主動致電要求閣下就上述登記提供任何銀行資料、密碼或個人資料。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>本人已經閱讀、明白及同意本聲明、《一般個人資料收集聲明》及《私隱政策》。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>《一般個人資料收集聲明》及《私隱政策》分別可於https://www.hk.chinamobile.com/tc/pics.html及https://www.hk.chinamobile.com/tc/privacy.html下載。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="display:inline-block;width:13px;height:13px;background:black;border-radius:50%;margin-right:.3rem;"></span>本人確認上述資料準確無誤，並明白如果上述資料有誤，本人可能無法通過上述登記。</td>
        </tr>
        <tr>
            <td style="padding-top:80px;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.registerName}}</div>
                <span>客戶姓名</span>
            </td>
            <td style="padding-top:80px;width:270px;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;"><img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset=""></div>
                <span>客戶簽署</span>
            </td>
            <td style="padding-top:80px;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.time}}</div>
                <span>簽署日期</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">註：中移香港保留不時修改本聲明的權利。</td>
            <td colspan="2" style="text-align:right;">2017.09.01版本</td>
        </tr>
        <tr>
            <td style="text-align:center;" colspan="6">【僅供內部使用】</td>
        </tr>
        <tr>
            <td colspan="6">實名制新增入網簽署：</td>
        </tr>
        <tr>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">&nbsp</div>
                <span>辦理員工簽署</span>
            </td>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">&nbsp</div>
                <span>店鋪經理/集團客戶經理簽署</span>
            </td>
            <td style="padding-top:80px;width:33%;" colspan="2">
                <div style="border-bottom:1px solid black;text-align:center;">{{dataInfo.time}}</div>
                <span>簽署日期</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">註：中移香港保留不時修改本聲明的權利。</td>
            <td colspan="2" style="text-align:right;">2017.09.01版本</td>
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
