<template>
     <div class="text">
        <div class="no-drag">
          <Dropdown style='float:right;margin-right:5px' @on-click='drawChart'>   
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem v-for='chart in chartInfo':name="chart" :key='chart.bizViewId'>{{chart.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
          <div class='griditem-title'>{{griditemTitle}}</div>
          <div :id="'chartBox'+portletID" style='height:90%'></div>
        </div>
        <div class="vue-draggable-handle"></div> 
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
export default {
    components: {},
    props:['griditemTitle','portletID'],
    data(){
      return {
        component:null,
        chartInfo:null,
        chartView:[],
      }
    },
    methods:{
        drawChart(chart){
          let Vue = this;
          if(Vue.chartView[Vue.portletID-1]){
            Vue.chartView[Vue.portletID-1].dispose();
          }
          let eoption = eval("(" + chart.defineJSON + ")");
          Vue.AxiosPost("previewBizView",{'bizViewId':chart.bizViewId},
            function(response){
              chartUtil.analysis(eoption,chart.type,response.data);
              // 基于准备好的dom，初始化echarts实例
              let chartView = echarts.init(document.getElementById('chartBox'+Vue.portletID));
               
              // 绘制图表
              chartView.setOption(eoption);
              Vue.chartView[Vue.portletID-1] = chartView;
              var tabs = [{"portletID":Vue.portletID,"title":Vue.griditemTitle,"chartDefine":chart.defineJSON,"bizViewId":chart.bizViewId,"type":chart.type}];
              Vue.$store.commit("addChartComponent",tabs); 
            }
          );
     
        },
        getChart(){
          let Vue = this;
          Vue.AxiosPost("getChart",'',
            function(response){
               Vue.chartInfo = response.data;
            }
          ); 
        }
    },
    mounted(){
      this.getChart();
    }
}
</script>

<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
