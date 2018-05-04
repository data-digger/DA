
import * as types from '../mutation-types.js'


const state = {
  datasourceList:null,
  paramList:null,
  reportList:null,
  chartList:null,
  queryList:null,
  tableList:null,
  report:{//报表数据结构
    id:'',
    name:'',
    alias:'',
    desc:'',
    defineJSON:{
      header:{conditons:[{type:"",objid:""}]},
      content:{
        portlets:[]
      },
      tail:{}
    }
  },
  layoutSelected:"布局1",
  queryFields:[],//查询器字段集合
  dimensions:[], //维度字段集合
  metrics:[], //度量字段集合
  aggregationFun:[],//聚合函数集合
  filterableList:[],  //可过滤字段集合
  groupbyList:[], //可排序字段集合
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  paramList: state => state.paramList,
  reportList: state=> state.reportList,
  chartList: state => state.chartList,
  queryList: state => state.queryList,
  tableList: state => state.tableList,
  layoutSelected: state => state.layoutSelected,
  report: state => state.report,
  queryFields: state => state.queryFields,
  dimensions: state => state.dimensions,
  metrics: state => state.metrics,
  filterableList: state => state.filterableList,
  groupbyList: state => state.groupbyList,
  aggregationFun: state => state.aggregationFun
}

// actions
const actions = {
  getDatasourceBox({ commit, state }, param){
    commit('getDatasourceBox', param);  
  },
  getParamBox({ commit, state }, param){
    commit('getParamBox', param);  
  },
  getQueryBox ({ commit, state }, param){   
    commit('getQueryBox', param);  
  },
  getChartBox ({ commit, state }, param){   
    commit('getChartBox', param);  
  },
  getReportBox ({ commit, state }, param){   
    commit('getReportBox', param);  
  },
  getTableBox ({ commit, state }, param){   
    commit('getTableBox', param);  
  },
}

// mutations
const mutations = {
  getDatasourceBox(state,param){
    state.datasourceList = param.data.content;
  },
  getParamBox(state,param){
    state.paramList = param.data.content;
  },
  getQueryBox(state,param){
    state.queryList = param.data.content;
  },
  getChartBox(state,param){
    state.chartList = param.data.content;
  },
  getTableBox(state,param){
    state.tableList = param.data.content;
  },
  getReportBox(state,param){
    var paramData = param.data.content;
    for (var i in paramData) {
           var defineJSON = JSON.parse(paramData[i].defineJSON);
           paramData[i].defineJSON = defineJSON;
    }
    state.reportList = paramData;
  },
  initReportBaseInfo(state,param){
     state.report.name = param.name;
     state.report.alias = param.alias;
     state.report.desc = param.desc;
  },
  layoutSelected(state,param){
    state.layoutSelected = param;
  },
  initDefaultdPortlets(state,param){
    state.report.defineJSON.content.portlets=param;
  },
  addDefinePorlets(state,param){
    state.report.defineJSON = param;
  },
  deletePortlet(state,param){
     let portlets = state.report.defineJSON.content.portlets
     for(var i in portlets){
        if(portlets[i].portletID == param){
          portlets.splice(i,1);
          break;
        }
     }
  },
  saveTabs(state,param){
    for( let index in state.report.defineJSON.content.portlets){
      if(state.report.defineJSON.content.portlets[index].portletID == param[0].tabID){
        state.report.defineJSON.content.portlets[index].tabs = param;
      }
    }
  },
  savePortletTitle(state,param){
    for( let index in state.report.defineJSON.content.portlets){
      if(state.report.defineJSON.content.portlets[index].portletID == param.portletID){
        state.report.defineJSON.content.portlets[index].tabs[0].title= param.portletTitle;
      }
    }    
  },
  saveQueryFields(state,param){
    state.queryFields = param;
  },
  setdimensions(state,param){
    state.dimensions = param;
  },
  setmetrics(state,param){
    state.metrics = param;
  },
  setfilterableList(state,param){
    state.filterableList = param;
  },
  setgroupbyList(state,param){
    state.groupbyList = param;
  },
  setaggregationFun(state,param){
    state.aggregationFun = param;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}