<template>
 <table style="width:95%;margin:0 auto;line-height:20px;font-size:.18rem; " cellspacing='0' cellpadding='5'>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.6rem;" src="../../assets/images/logo.png">通訊服務（一般）合約</td>
        </tr>
        <tr style="line-height:20px;">
            <td>註冊用戶名稱：</td>
            <td>{{dataInfo.customerName}}</td>
            <td colspan="2">流動電話號碼：{{dataInfo.mobileNo}}</td>
            <td colspan="2">客戶號碼：{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td colspan="2">中國移動香港有限公司（“中國移動香港”）舆一下用戶逹成恊議：</td>
            <td colspan="2">合約生效日期：
                <br/>{{dataInfo.ContractEffectDate}}
            </td>
            <td colspan="2">服務生效日期：
                <br/>{{dataInfo.ServiceEffectDate}}
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">客戶資料</td>
        </tr>
        <tr>
            <td colspan="2">註冊用戶名稱：</td>
            <td colspan="4">{{dataInfo.customerName}}</td>
        </tr>
        <tr>
            <td colspan="2">身份證/商業登記號碼：</td>
            <td colspan="4">{{dataInfo.hkIdNo}}</td>
        </tr>
        <tr>
            <td>電話號碼：</td>
            <td></td>
            <td colspan="2">請選擇日後通訊，短訊及脹單的語言△</td>
            <td colspan="2">中文</td>
        </tr>
        <tr>
            <td colspan="2">傳呼/流動電話號碼：{{dataInfo.mobileNo}}</td>
            <td colspan="2">傳真號碼：</td>
            <td colspan="2">電郵地址：{{dataInfo.email}}</td>
        </tr>
        <tr>
            <td>登記地址：</td>
            <td colspan="5">{{dataInfo.registerAddr}}</td>
        </tr>
        <tr>
            <td colspan="3">收信人：</td>
            <td colspan="3"></td>
        </tr>
        <tr>
            <td colspan="6">^ 如本部份未有填寫，中文將為日後與閣下通訊及短訊的語言，直至閣下另行以書面通知中國移動香港。</td>
        </tr>
        <tr>
            <td colspan="2">客戶密碼：</td>
            <td colspan="4">個人客戶：由客戶於中國移動香港網頁或熱線自行設定。</td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">服務及收費詳情</td>
        </tr>
        <tr>
            <td>流動電話號碼：</td>
            <td>{{dataInfo.mobileNo}}</td>
            <td colspan="2">國內號碼：{{dataInfo.cnMobileNo}}</td>
            <td colspan="2">智能咭編號：
                <br/>{{dataInfo.iccId}}
            </td>
        </tr>
        <tr>
            <td colspan="2">服務計劃</td>
            <td colspan="4">{{dataInfo.serviceName}}</td>
        </tr>
        <tr>
            <td colspan="2">免費通話時間（分鐘）</td>
            <td colspan="4">{{dataInfo.callTime}}</td>
        </tr>
        <tr>
            <td colspan="2">服務月費</td>
            <td colspan="4">${{dataInfo.monthFee/100}}  通話時間不足一分鐘亦作一分鐘計算。</td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">申請IDD服務</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" :checked="dataInfo.isOpenIDD == 'Y'? 'checked': ''" disabled="disabled">申請IDD001服務（於香港、或中國內地以至世界各地漫遊時使用IDD服務）</td>
        </tr>
        <tr style="vertical-align: text-top;">
            <td style="border:1px solid black;" colspan="2">
                <input type="checkbox" :checked="dataInfo.isDeposit == 'Y'? 'checked': ''" disabled="disabled">HK$1000按金
                <br/>如使用其他方式繳付月費，須於上台時預繳指定金額作為按金。</td>
            <td style="border:1px solid black;" colspan="4">
                <input type="checkbox" :checked="dataInfo.isNoneDeposit == 'Y'? 'checked': ''" disabled="disabled">HK$1000按金豁免^
                <br/>^客戶須使用「信用咭自動轉脹」繳付流動電話服務月費並出示下列 有效證件之一：
                <br/>香港身份證、商業登記證或公司註冊證
                <br/>
                <br/>若客戶取消信用咭自動轉脹，中國移動香港將自動終止客戶之 IDD001服務而恕不另行通知。
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">註:當使用IDD001服務時，客戶須繳付有關的IDD費用。有關IDD收費資料，請參閱http://www.hk.chinamobile.com。如有任何更改，恕不另行通知。</td>
        </tr>
        <tr>
            <td colspan="6">額外增值服務</td>
        </tr>
        <tr style="width:100%;">
            <td colspan="3" :key="index" v-for="(item,index) in dataInfo.vasNameList" v-if="index < 2" style="width:50%; border:1px solid black;height:20px;">{{item}}</td>
        </tr>
        <tr>
            <td colspan="6">送增值服務（詳情請參閱附加合約）</td>
        </tr>
        <tr>
            <td colspan="6">不論客戶選擇任何服務計劃，客戶同意及必須每月繳付港鐵、隧道、流動電話服務牌照及行政費：$18</td>
        </tr>
        <tr>
            <td colspan="2">截數日期為每月</td>
            <td colspan="2">{{dataInfo.dayNum}}</td>
            <td colspan="3">智能咭密碼:8888</td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.6rem;" src="../../assets/images/logo.png">通訊服務（一般）合約</td>
        </tr>
        <tr style="line-height:20px;">
            <td>註冊用戶名稱：</td>
            <td>{{dataInfo.customerName}}</td>
            <td colspan="2">流動電話號碼：{{dataInfo.mobileNo}}</td>
            <td colspan="2">客戶號碼：{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">目標首個計帳截數日為（年）（月）（日） ，目標首個計帳周期日期為目標首個計帳截數日的後一天。
                <br/>
                <br/>客戶必須於目標服務生效日期前預先繳付第一期之上述服務月費。之後及於首個實際計帳周期日發出的第一張帳單時,若實際服務生效日期 與首個實際計帳截數日不足一整個帳單月，客戶於第一期所預繳而多付之服務月費（除行政費及增值服務收費（如有））,
                中國移動香港 將會 根據該帳單月之日數按比例退回客戶之流動電話帳戶。</td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="text-decoration: underline;">額外功能*</span> （以下額外功能首月及第二個月（如適用）月費將於第一期脹單內一併收取。）</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="3">China voice mth fee(No CH no.) $59</td>
            <td style="border:1px solid black;" colspan="3"></td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">只適用於服務計劃的客戶</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">母需申請，自動享有以下IDD服務
                <br/> •香港IDD001服務（於香港使用IDD服務）
                <br/> •中國漫遊IDD服務（於中國內地漫遊時使用IDD服務）
                <br/>
                <br/> 註: 當使用上述服務時，客戶須繳付相關費用。有關收費資料，請參閱 http://www.hk.chinamobile.com。 如有任何更改，恕不另行通知。
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">適用於服務計劃的客戶</td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">母需申請，自動享有以下服務*
                <br/> •漫遊回撥及國際漫遊服務-全球話音及數據
                <br/> •IDD1597服務（於香港致電指定地方）
                <br/> •本地Wi-Fi服務
                <br/>
                <br/> *除額外附加合約另有規定
                <br/> 註: 當使用上述服務時，客戶須繳付相關費用。有關收費資料，請參閱 http://www.hk.chinamobile.com。 如有任何更改，恕不另行通知。
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;height:20px;" colspan="6"></td>
        </tr>
        <tr>
            <td colspan="6">中國移動香港擬使用閣下的姓名、手機號碼、通訊地址和電郵地址等資料，透過不同聯絡方式作為促銷下列產品/服務的用途，請在以下方格內加上√號，以表示閣下同意接受相關資訊；如未得到閣下同意，我們將不會向閣下提供以下資訊：
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <input type="checkbox" checked="checked" disabled="disabled">接收有關中國移動香港所提供之電訊網絡產品及相關服務的促銷資訊及材料，包括流動電視服務及裝置、手機供應商促銷資訊，任何流動裝置及配件、贈品、折扣等優惠及其他宣傳資訊，以及中國移動國際有限公司所提供之電訊網絡產品及相關服務的促銷資訊及材料。
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:2rem;border-top:1px solid black;">客戶同意及接受</span>
                <br/>
                <br/>
            </td>
        </tr>
        <tr style="background:black;color:white;font-size:.20rem;">
            <td colspan="6">有關之額外附加合約</td>
        </tr>
        <tr>
            <td colspan="6">客戶同意繳付中國移動香港有限公司（簡稱“CMHK”）所列服務計劃之費用及遵守所列優惠所載之有關條款及條件。
                <br/>重要條款</td>

        </tr>
        <tr>
            <td colspan="6">客戶現聲明已收妥本合約和下列有關之額外附加合約的附帶文件及條款（分別以其合約編號作識別）並完全明白、理解、接受和同意全部合約文件所載的條款的內容。客戶亦明白及同意，縱使客戶未有在下列有關之額外附加合約文件上另行及/或個別簽署，惟客戶簽署本合約之同時，即受本合約所載條款連同刊載於下列有關之額外附加合約文件的條款之約束。
            </td>
        </tr>
        <tr>
            <td colspan="6">服務計劃:</td>
        </tr>
        <tr>
            <td colspan="2">{{dataInfo.serviceName}}</td>
            <td colspan="4">4.5G_SIM_Only_本地服務計劃_007C</td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.6rem;" src="../../assets/images/logo.png">通訊服務（一般）合約</td>
        </tr>
        <tr style="line-height:20px;">
            <td>註冊用戶名稱：</td>
            <td>{{dataInfo.customerName}}</td>
            <td colspan="2">流動電話號碼：{{dataInfo.mobileNo}}</td>
            <td colspan="2">客戶號碼：{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td colspan="6">有關之額外附加合約 :</td>
        </tr>
        <tr>
            <td>產品/服務優惠代號</td>
            <td colspan="2">產品/服務優惠內容</td>
            <td>產品/服務合約編號</td>
            <td>合約期</td>
            <td>約定賠償金額</td>
        </tr>
        <tr>
            <td>
                「一咭多號」通話組合100
            </td>
            <td colspan="2">China 1CMN Voice Package 100</td>
            <td>China 1CMN Voice Pkg_015C_DMS</td>
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
                4.5G 全速本地服務計劃月費折扣優惠（24個月）
                <br/>
                <br/>No IDD (HK to all) and IDD (China to all)
                <br/>
                <br/>Reserve 4.5 local 12GB Plan or above sign
                <br/>24mth Free U Eye
            </td>
            <td>4.5G_SIM Only_Local_waive
                <br/>$18_24mth_Offer_001C
            </td>
            <td>24</td>
            <td>已承諾之剩餘服務月費</td>
        </tr>

        <tr>
            <td style="border:1px solid black;color:blue;" colspan="6">
                自動績約選項
                <br/> 本人/吾等在下方簽署，即代表本人/吾等同意以下條款及細則:-
                <br/>
                <br/> 當此額外附加合約有效期屆滿，除非本人/吾等透過中國移動香港客戶服務熱線或分店在現有或任何後績合約有效期屆滿前另作通知，否則 此額外附加合約將會根據績約時的最新債格一直自動績約，每次為期24個月。除非另有說明，其他條款及細則維持不變。中國移動香港對
                於上述自動績約安排在任何時候均有最後及絕對的決定權。
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:3rem;border-top:1px solid black;">客戶簽署
                    <span style="color:red">及</span>公司蓋章
                    <span style="color:red;">（如適用）</span>
                </span>
                <br/>
                <br/>
                <br/>
            </td>
        </tr>
        <tr>
            <td style="border:1px solid black;" colspan="6">
                重要條款
                <br/>
                <br/> 作為中國移動香港可繼績向客戶提供手提電話服務的先決條件，客戶同意於開啟服務三天內提供有效住址證明（發出日期必須為最近三個 月內），否則中國移動香港有權不作任何通知而即時終止客戶之手提電話服務。屆時一切根據本合約已繳付之手機及/或服務款項將會全數
                沒收而不予發還。再者，皆因客戶不能履行有關附加合約內之最少使用服務期，客戶亦必須即時退回於附加合約內已享用之折扣、優惠 或獎賞的等同金額予中國移動香港。
                <br/>
                <br/> •中國移動香港所有服務之月費均按每個"脹單月"計算，而"脹單月"之定義為由每個月的脹單發單日期計算至下個月發單日期的前一 天。若此合約於現行"脹單月"完結前終止（無論任何情況下），即使客戶使用服務不足一個月，客戶仍需繳付該整個"脹單月"的月費。所有已付的費用包括服務月費及港鐵、隧道、流動電話服務牌照及行政費均不獲退還、轉換或轉讓。無論在任何情況下，終止服務及/
                或服務計劃及/或一般合約及/或客戶攜號碼轉台等均被視為終止此合約。
                <br/> •如須更改服務計劃，客戶必須於該"脹單月"發單日期（已顯示於月結單的正面）前的最少兩個營業日通知中國移動香港。如客戶未能於 有關日期前通知本公司，新服務計劃將於再下個"脹單月"的首天起才生效。
                <br/> •客戶除必須遵守本合約內所載條款外，並同時確認收妥隨此合約附上的附加合約（如有的話）及須遵守附加合約（如有的話）上之條款。
                <br/> •客戶現聲明已收妥本合約附載的條款的中文版本及完全明白和接受條款的內容。
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <span style="float:left;width:4%;">1.</span>
                <div style="display:inline-block;width:96%;">此合約及上述有關之額外附加合約文件及條款乃客戶申請有關服務計劃所簽署的「服務（一般）合約」及連同一般合約之條款及條件的 不可分割部份。</div>
                <span style="float:left;width:4%;">2.</span>
                <div style="display:inline-block;width:96%;">CMHK有權修改所述內容或收費，而無須先行獲得客戶同意或另行給予客戶通知。有關的修改會於CMHK的網頁公佈。</div>
                <span style="float:left;width:4%;">3.</span>
                <div style="display:inline-block;width:96%;">本合約之所有條款與規章均根據本公司不時生效之「一般合約」之條款與規章（「一般條款」）提供。倘本條款與規章與一般條款有異 者，一概以本條款與規章為準。</div>
                <span style="float:left;width:4%;">4.</span>
                <div style="display:inline-block;width:96%;">客戶現聲明上述資料正確無誤。如有更改，客戶須立刻通知中國移動香港。雙方同意遵守背頁之「合約（一般）-電訊服務及購買手機 條款及條件」，而此等條款為本合約不可分割的部份。</div>
                <span style="float:left;width:4%;">5.</span>
                <div style="display:inline-block;width:96%;">客戶茲收妥上列產品及配件並確認此產品妥當。收貨後客戶明白此產品之風險在於買方。</div>
                <span style="float:left;width:4%;">6.</span>
                <div style="display:inline-block;width:96%;">本公司保留隨時調整收費的權利。</div>
            </td>
        </tr>
        <tr>
            <td style="text-align:center;font-size:.22rem;position:relative;height:65px;" colspan="6">
                <img style="position:absolute;left:0;top:10;width:1.6rem;" src="../../assets/images/logo.png">通訊服務（一般）合約</td>
        </tr>
        <tr style="line-height:20px;">
            <td>註冊用戶名稱：</td>
            <td>{{dataInfo.customerName}}</td>
            <td colspan="2">流動電話號碼：{{dataInfo.mobileNo}}</td>
            <td colspan="2">客戶號碼：{{dataInfo.customerNo}}</td>
        </tr>
        <tr>
            <td colspan="4">
                <img style="width:25%; vertical-align: middle" :src="dataImg" alt="" srcset="">
                <span style="display:block;width:2rem;border-top:1px solid black;">客戶簽署/公司蓋章</span>
            </td>
            <td colspan="3">
                中國移動香港有限公司
                <br/> 門市編號：PT61
                <br/> 員工編號：P1617
                <br/> 網址： www.hk.chinamobile.com
                <br/> 24小時客戶服務熱線：2945 8888
                <br/> 此乃電腦打印,無需簽署
                <br/>
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
      default:{}
    }
  }
};
</script>

<style>

</style>
