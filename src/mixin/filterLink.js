export default {
    filters: {
      filterLink(item) {
        //urlType: 1.商品 （2.前台分类） （3.后台分类） 4.专题活动 5.业务包 （6.业务） 7.外部链接 8.其它链接  9.业务预约
        //urlType = 4: urlKey当前专题id。如果当前专题是子专题，mixin为该子专题的父专题id
        //urlType = 5: mixin-业务包类型。//1.合约；2.套餐；3.流量包；4.宽带；5.充值；6.预存赠送；7.数字化服务
        //urlKey跳转的key（id之类的）：urlType为1,2,3,4,5,6时有值
        //urlAddr链接地址:urlType为7,8时有值
        let link = '';
        switch (item.urlType - 0) {
          case 1: //商品
            link = `/shopping/detail?id=${item.urlKey}`
            break;
          case 4: //专题
            switch (item.mixin - 0) {
              case 0: //mixin为''
              case 1: //当前父专题 && 有子专题 => 父专题id取 urlKey。
                link = `home/zone/child?parentId=${item.urlKey}`
                break;
              case 2: //当前父专题 && 没有子专题 => 父专题id取 urlKey。
                link = `home/zone/parent?parentId=${item.urlKey}`
                break;
              default: //当前子专题 => 父专题id取mixin，子专题id取urlKey   //mixin为'12346549879846254'
                link = `home/zone/child?parentId=${item.mixin}&childId=${item.urlKey}`
                break;
            }
            // let childId = item.mixin == 1 || item.mixin == 2 ? item.urlKey : item.mixin; //mixin不为空且不为 1||2（当前专题是子专题），子专题id就是urlKey ; mixin为 1||2（当前专题是父专题），子专题就不存在
            // let parentId = item.mixin ? item.mixin : item.urlKey; //mixin不为空且不为 1||2（当前专题是子专题），父专题id就是mixin ; mixin为 1||2（当前专题是父专题），父专题就是urlKey
            // link = `home/zone/child?childId=${childId}&parentId=${parentId}`
            break;
          case 5: //业务包
            let packageType = item.mixin - 0; //业务包类型
            switch (packageType) {
              case 1: //合约
                break;
              case 2: //套餐
              case 3: //流量
              case 6: //预存赠送
              case 7: //数字化服务
                link = `home/business?childId=${packageType}`
                break;
              case 4: //宽带
                link = `broadband/new/install`
                break;
              case 5: //充值
                link = `home/recharge/recharge`
                break;
              default:
                break;
            }
            break;
          case 7: //外部链接
          case 8: //其它链接
            link = `http://${item.urlAddr}`;
            break;
          case 9: //业务预约
            link = '/home/bookView/bookList';
            break;
        }
        console.log(item)
        console.log(link)
        return link;
      }
    }
  }
  