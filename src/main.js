/*程序入口
*author:蔡安琪
*/

import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import API from '@/libs/API.js';
import util from './libs/util';
import 'iview/dist/styles/iview.css';
import "codemirror/lib/codemirror.css";
import "@/assets/css/gridlayout.css";
import 'dataTables/media/js/jquery.dataTables.min.js'
import 'dataTables/media/css/jquery.dataTables.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'dataTables.net-bs/css/dataTables.bootstrap.css';
Vue.use(iView);

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