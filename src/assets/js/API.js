import axios from 'axios'
import Qs from 'qs'//添加请求拦截器，目前没有用到

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080'; //主服务器
axios.defaults.paramsSerializer = function(params){
    return Qs.stringify(params,{arrayFormat:'brackets'})
};
axios.defaults.transformRequest = function(obj) {
　　var str = [];
　　for ( var p in obj) {
　　    str.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
　　}
　　return str.join("&");
};

/*接口暴露*/
export default {
   /*创建数据源*/
   createDatasource(params){
     return axios.post(urlConf.datasource.new, params);  
   },
   /*获取数据源*/
   getDatasource(params){
   	 return axios.post(urlConf.datasource.list, params); 
   },
   /*创建查询器*/
   createQuery(params){
   	 return axios.post(urlConf.bizview.new, params); 
   },
   /*获取查询器*/
   getQuery(params){
   	 return axios.post(urlConf.bizview.list, params); 
   },
   /*预览查询器数据*/
   previewBizView(params){
     return axios.post(urlConf.bizview.preview, params); 
   },
    /*创建仪表*/
    createChart(params){
      return axios.post(urlConf.chart.new, params); 
    },
    /*获取仪表*/
    getChart(params){
      return axios.post(urlConf.chart.list, params); 
    },
};