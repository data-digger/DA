
import * as types from '../mutation-types'


const state = {
  datasourceList:null,
  reportList:[{"id":"1","name":"report","desc":"report"}],
  chartList:null,
  queryList:null,
  chartId:'',
  chartName:'',
  chartOption:null,
  chartPreview:false,
  chartEdit:false,
  layoutSelected:"布局1"
}

// getters
const getters = {
  datasourceList: state => state.datasourceList,
  reportList: state=> state.reportList,
  chartList: state => state.chartList,
  queryList: state => state.queryList,
  chartId: state => state.chartId,
  chartName: state => state.chartName,
  chartOption: state => state.chartOption,
  chartPreview: state => state.chartPreview,
  chartEdit: state => state.chartEdit,
  layoutSelected: state => state.layoutSelected,
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
  chartState(state,param){
    state.chartPreview = param.chartPreview;
    state.chartEdit = param.chartEdit;
    state.chartId = param.chartId;
    state.chartName = param.chartName;
    state.chartOption = param.chartOption;
  },
  layoutSelected(state,param){
    state.layoutSelected = param;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}