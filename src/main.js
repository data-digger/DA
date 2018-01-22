/*程序入口
*/
window.uri = 'http://localhost:8080'
window.urlConf = {
  datasource: {
    list: `${window.uri}/datasource/list`,
    new: `${window.uri}/datasource/new`,
  },
  bizview: {
    list:`${window.uri}/bizview/list`,
    new: `${window.uri}/bizview/new`,
    preview:`${window.uri}/bizview/preview`
  }
}

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import API from '@/assets/js/API.js'
import toastr from'toastr/build/toastr.min'
import 'toastr/build/toastr.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import "codemirror/lib/codemirror.css"
import "datatables/media/css/jquery.dataTables.css"
Vue.config.productionTip = false
Vue.prototype.toastr = toastr
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

/*封装AxiosPost请求
 * fun 获取操作接口函数
 * data 需要传入的参数
 * success 成功回调函数
 * faild 失败回调函数
*/
Vue.prototype.AxiosPost = function (fun, data, success,faild) {
  API[fun](data)
    .then(function (response) {
      if (response) {
        success(response);
      }
    })
    .catch(function (error) {
        console.log(error);
        /*error();*/
    });
}