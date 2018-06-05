<template>
  <div id="allmap"></div>
</template>
<script type='text/javascript'>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      getCurrentPosition() { //获取当前位置信息
        var geolocation = new BMap.Geolocation();
        return new Promise(function (resolve, reject) {
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              resolve(r)
            } else {
              reject('失败')
            }
          }, {
            enableHighAccuracy: true
          })
        })
      },
      mapParse(str, city = '') { //根据地址获取经纬度
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        return new Promise(function (resolve, reject) {
          myGeo.getPoint(str, function (point) {
            if (point) {
              resolve(point)
            } else {
              reject('失败')
            }
          }, city);
        })
      },
      mapStringfy({lng, lat}) { //根据经纬度获取地址
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        return new Promise(function (resolve, reject) {
          myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
            if (result) {
              resolve(result)
            }else {
              reject('失败')
            }
          });
        })
      },
      getDistance(start = {lng , lat}, end = {lng , lat}) {//获取驾车或步行出行距离，单位：米
        let transit = null;
        return new Promise(function (resolve, reject) {
          transit = new BMap.DrivingRoute('深圳', {
            policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE, //驾车策略--取最短距离
            onSearchComplete(results){ //检索完成后的回调函数。参数： results: DrivingRouteResult
              if (transit.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = results.getPlan(0);
                resolve(plan.getDistance(true))
              }else {
                reject('错误')
              } 
            }
          });
          transit.search(start, end);
        })
      }

    }

  }

</script>
<style lang='less' scoped>


</style>
