
import * as types from '../mutation-types'


const state = {
  datasourceList:null,
  reportList:null,
  chartList:null,
  queryList:null,
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
    }},
  layoutSelected:"布局1"
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  reportList: state=> state.reportList,
  chartList: state => state.chartList,
  queryList: state => state.queryList,
  layoutSelected: state => state.layoutSelected,
  report: state => state.report,
}

// actions
const actions = {
  getDatasourceBox({ commit, state }, param){
    commit('getDatasourceBox', param);  
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
}

// mutations
const mutations = {
  getDatasourceBox(state,param){
    state.datasourceList = param.data;
  },
  getQueryBox(state,param){
    state.queryList = param.data;
  },
  getChartBox(state,param){
    state.chartList = param.data;
  },
  getReportBox(state,param){
    var paramData = param.data;
    for (var i in paramData) {
           var defineJSON = JSON.parse(paramData[i].defineJSON);
           paramData[i].defineJSON = defineJSON;
    }
    state.reportList = paramData;
  },
/*  initPortlets(state,param){
    state.report.defineJSON.content.portlets = param.portlets;
  },*/
  addPortlet(state,param){
    state.report.defineJSON.content.portlets.push(param);
  },
  layoutSelected(state,param){
    state.layoutSelected = param;
  },
  addChartComponent(state,param){
    for( let index in state.report.defineJSON.content.portlets){
      if(state.report.defineJSON.content.portlets[index].id == param[0].portletID){
        state.report.defineJSON.content.portlets[index].tabs = param;
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}