import axios from 'axios'
import Qs from 'qs'//添加请求拦截器，目前没有用到

window.uri = 'http://localhost:8080'
window.urlConf = {
  datasource: {
    list: `${window.uri}/datasource/list`,
    save: `${window.uri}/datasource/save`,
    gettables: `${window.uri}/datasource/gettables`,
  },
  bizview: {
    list:`${window.uri}/bizview/list`,
    save: `${window.uri}/bizview/save`,
    preview:`${window.uri}/bizview/preview`,
    previewById:`${window.uri}/bizview/preview/id`,
    update: `${window.uri}/bizview/update`,
    columnList:`${window.uri}/bizview/column/list`,
    calculatedfield:`${window.uri}/bizview/column/calculatedfield/preview`,
    update_calculatedfield:`${window.uri}/bizview/column/save`,
    deleteField:`${window.uri}/bizview/column/delete`,
    initData:`${window.uri}/bizview/initData`,
  },
  chart: {
    list:`${window.uri}/chart/list`,
    save: `${window.uri}/chart/save`,
    getone:`${window.uri}/chart/getone`,
    getdata:`${window.uri}/chart/getdata`,
    preview:`${window.uri}/chart/preview`,
    filterStandByValue:`${window.uri}/chart/filter/standby`
  },
  table: {
    list: `${window.uri}/table/list`,
    save: `${window.uri}/table/save`,
    preview:`${window.uri}/table/preview`
  },
  report: {
    list:`${window.uri}/report/list`,
    save: `${window.uri}/report/save`,
    getone: `${window.uri}/report/getone`,
    getdata: `${window.uri}/report/getdata`,
    update: `${window.uri}/report/update`,
    preview:`${window.uri}/report/preview`,
    getStandBy:`${window.uri}/report/getStandBy`
  },
  param: {
    list:`${window.uri}/parameter/list`,
    save: `${window.uri}/parameter/save`,
    getSqlStandBy: `${window.uri}/parameter/getSqlStandBy`,
    
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
     return axios.post(urlConf.datasource.save, params);  
   },
   /*获取数据源列表*/
    getDatasourceList(params){
   	 return axios.post(urlConf.datasource.list, params); 
   },
   /*获取数据表和字段树*/
    getTablesTree(params){
     return axios.post(urlConf.datasource.gettables, params); 
   },
   /*创建查询器*/
    createQuery(params){
   	 return axios.post(urlConf.bizview.save, params); 
   },
   /*获取查询器列表*/
    getQueryList(params){
   	 return axios.post(urlConf.bizview.list, params); 
    },
    /*新建计算字段后返回计算字段数据类型和数据*/
    calculatedfield(params){
      return axios.post(urlConf.bizview.calculatedfield, params); 
    },
    /*更新计算字段*/
    update_calculatedfield(params){
      return axios.post(urlConf.bizview.update_calculatedfield, params);
    },
    /*删除计算字段*/
    deleteField(params){
      return axios.post(urlConf.bizview.deleteField, params);
    },    
    /*预览查询器中包含字段表的数据*/
    previewBizView_extra(params){
     return axios.post(urlConf.bizview.preview, params); 
    },
    /*预览查询器*/
    previewBizView(params){
     return axios.post(urlConf.bizview.previewById, params); 
    },
    /*根据参数值更新查询器数据*/
    updateBizView(params){
     return axios.post(urlConf.bizview.update, params); 
    },
    /*获取字段表*/
    getFieldTable(params){
      return axios.post(urlConf.bizview.columnList, params); 
    },
    /*创建仪表*/
    createChart(params){
      return axios.post(urlConf.chart.save, params); 
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
    /*创建表格*/
    createTable(params){
      return axios.post(urlConf.table.save, params); 
    },
    /*预览表格数据*/
    previewTable(params){
      return axios.post(urlConf.table.preview, params); 
    },
    /*获取表格列表*/
    getTableList(params){
      return axios.post(urlConf.table.list, params); 
    },
    /*创建报表*/
    createReport(params){
      return axios.post(urlConf.report.save, params); 
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
    getReportDataById(params){
      return axios.post(urlConf.report.getdata, params); 
    },
    /*获取报表数据通过defineJSON*/
    getReportDataByDefine(params){
      return axios.post(urlConf.report.preview, params); 
    },
    /*获取关联查询器的候选值*/
    getReportRelatedStandBy(params){
      return axios.post(urlConf.report.getStandBy, params); 
    },
    /*根据参数值更新报表数据*/
    updateReport(params){
      return axios.post(urlConf.report.update, params); 
    },
    /*新建参数*/
    createParam(params){
      return axios.post(urlConf.param.save, params); 
    },
    /*获取参数列表*/
    getParamList(params){
      return axios.post(urlConf.param.list, params); 
    },
    /*获取参数候选值*/
    getSqlStandBy(params){
      return axios.post(urlConf.param.getSqlStandBy, params); 
    },
    /*获取图表数据*/
    chartPreview(params){
      return axios.post(urlConf.chart.preview, params); 
    },
    /*获取过滤器列表候选值*/
    getFilterStandByValue(params){
      return axios.post(urlConf.chart.filterStandByValue, params); 
    },
     /*初始化查询器数据*/
     initData(params){
      return axios.post(urlConf.bizview.initData, params); 
     }
};