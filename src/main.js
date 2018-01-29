/*程序入口
*author:蔡安琪
*/
<<<<<<< HEAD
import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import API from '@/libs/API.js';
import 'iview/dist/styles/iview.css';
import util from './libs/util';

Vue.use(iView);

=======
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
  },
  chart: {
    list:`${window.uri}/chart/list`,
    new: `${window.uri}/chart/new`,
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
>>>>>>> 33f43e357742a388cd24f6040b35a43e1a3e3b53
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

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