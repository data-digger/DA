
import * as types from '../mutation-types'


const state = {
  datasourceList:null,
  reportList:[{"id":"1","name":"report","desc":"report"}],
  dashboardList:null,
  queryList:null,
  bizViewId:null,
  bizViewName:null
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  reportList: state=> state.reportList,
  dashboardList: state => state.dashboardList,
  queryList: state => state.queryList,
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
  getDashboardBox ({ commit, state }, param){   
    commit('getDashboardBox', param);  
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
  getDashboardBox(state,param){
    state.dashboardList = param.data;
  },
  changeState(state,param){
   
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}