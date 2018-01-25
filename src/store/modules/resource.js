
import * as types from '../mutation-types'


const state = {
  datasourceList:null,
  reportList:[{"id":"1","name":"report","desc":"report"}],
  chartList:null,
  queryList:null,
  showEdit:false,
  showPreview:false,
  chartId:'',
  chartName:'',
  chartOption:null,
  chartPreview:false,
  chartEdit:false,
  bizViewId:null,
  bizViewName:null
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  reportList: state=> state.reportList,
  chartList: state => state.chartList,
  queryList: state => state.queryList,
  bizViewId: state => state.bizViewId,
  bizViewName: state =>state.bizViewName,
  chartId: state => state.chartId,
  chartName: state => state.chartName,
  chartOption: state => state.chartOption,
  chartPreview: state => state.chartPreview,
  chartEdit: state => state.chartEdit,
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
  changeState({ commit, state },param){
    commit('changeState', param);
  },
  chartState({ commit, state },param){
    commit('chartState', param);
  }
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
  changeState(state,param){
   
  },
  chartState(state,param){
    state.chartPreview = param.chartPreview;
    state.chartEdit = param.chartEdit;
    state.chartId = param.chartId;
    state.chartName = param.chartName;
    state.chartOption = param.chartOption;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}