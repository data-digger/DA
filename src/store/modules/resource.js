
import * as types from '../mutation-types.js'


const state = {
  datasourceList:null,
  paramList:null,
  reportList:null,
  chartList:null,
  queryList:null,
  tableList:null,
  report:{
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
  /*paramData:'',*/
  layoutSelected:"布局1",
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
 /* paramData:state => state.paramData,*/
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
    state.datasourceList = param.data;
  },
  getParamBox(state,param){
    state.paramList = param.data;
  },
  getQueryBox(state,param){
    state.queryList = param.data;
  },
  getChartBox(state,param){
    state.chartList = param.data;
  },
  getTableBox(state,param){
    state.tableList = param.data;
  },
  getReportBox(state,param){
    var paramData = param.data;
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
}

export default {
  state,
  getters,
  actions,
  mutations
}