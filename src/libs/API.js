import axios from 'axios'
import Qs from 'qs'//添加请求拦截器，目前没有用到

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
    getone:`${window.uri}/chart/getone`,
    getdata:`${window.uri}/chart/getdata`,
  },
  report: {
    list:`${window.uri}/report/list`,
    new: `${window.uri}/report/new`,
    getone: `${window.uri}/report/getone`,
    getdata: `${window.uri}/report/getdata`,
  },
}

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
   /*获取数据源列表*/
   getDatasourceList(params){
   	 return axios.post(urlConf.datasource.list, params); 
   },
   /*创建查询器*/
   createQuery(params){
   	 return axios.post(urlConf.bizview.new, params); 
   },
   /*获取查询器列表*/
   getQueryList(params){
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
    /*获取仪表列表*/
    getChartList(params){
      return axios.post(urlConf.chart.list, params); 
    },
    /*获取仪表*/
    getChart(params){
      return axios.post(urlConf.chart.getone, params); 
    },
    /*获取仪表数据*/
    getChartData(params){
      return axios.post(urlConf.chart.getdata, params); 
    },
    /*创建报表*/
    createReport(params){
      return axios.post(urlConf.report.new, params); 
    },
    /*获取报表列表*/
    getReportList(params){
      return axios.post(urlConf.report.list, params); 
    },
    /*预览单张报表*/
    getReport(params){
      return axios.post(urlConf.report.getone, params); 
    },
    /*获取单张报表数据*/
    getReportData(params){
      return axios.post(urlConf.report.getdata, params); 
    }
};