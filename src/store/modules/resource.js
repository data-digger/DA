
import * as types from '../mutation-types'


const state = {
  datasourceList:null,
  reportList:[{"id":"1","name":"report","desc":"report"}],
  chartList:null,
  queryList:null,
  showEdit:false,
  showPreview:false
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  reportList: state=> state.reportList,
  chartList: state => state.chartList,
  queryList: state => state.queryList,
  showEdit: state => state.showEdit,
  showPreview: state => state.showPreview,
  bizViewId: state => state.bizViewId,
  bizViewName: state =>state.bizViewName,
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
    state.showEdit = param.showEdit;
    state.showPreview = param.showPreview;
    state.bizViewId = param.bizViewId;
    state.bizViewName = param.bizViewName;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}