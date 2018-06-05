  //WebViewJavaScriptBridge 初始化
  (function(callback) {
      if (window.LvUJsBridge) {
          callback(LvUJsBridge)
      } else {
          if (document.addEventListener) {
              document.addEventListener(
                  'LvUJsBridgeReady',
                  function() {
                      callback(LvUJsBridge)
                  },
                  false
              );
          }
      }
  })
  (function(bridge) { //init
      bridge.init(function(message, responseCallback) {
          var data = {
              'jsResponse': 'Wee!'
          };
          responseCallback(data);
      });
      clientShare = bridge;
  });


  /*
   * js 触发 原生函数 
   * triggerTips:约定的标识
   * params: 传递给原生的参数
   * callback 接收响应回调
   */
  function triggerNative(triggerTips, params, callback) {
      if (window.LvUJsBridge) {
          try {
              window.LvUJsBridge.invoke(triggerTips, params, callback);
          } catch (ex) {
              alert("1当前APP不支持此功能，请升级您的版本");
          }
      } else {
          alert("2当前APP不支持此功能，请升级您的版本");
      }
  }

  /*
   ** 客户端 触发 js 方法
   *  triggerTips:约定的标识
   *  callback:调函数，可传参 
   */
  function triggerJS(triggerTips, callback) {
      if (window.LvUJsBridge) {
          try {
              window.LvUJsBridge.on(triggerTips, callback);
          } catch (ex) {
              alert("3当前APP不支持此功能，请升级您的版本");
          }
      } else {
          alert("4当前APP不支持此功能，请升级您的版本");
      }
  }