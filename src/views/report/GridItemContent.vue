<template>
     <div class="text">
        <div class="no-drag">
          <Dropdown style='float:right;margin-right:5px' @on-click='drawChart'>   
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem v-for='chart in chartInfo':name="chart" :key='chart.id'>{{chart.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
          <div class='griditem-title'>{{griditemTitle}}</div>
          <div :id="chartID+portletID" style='height:90%'></div>
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
        chartID:null
      }
    },
    methods:{
        drawChart(chart){
          let Vue = this;
          Vue.chartID = chart.id;
          if(Vue.chartView[Vue.portletID-1]){
            Vue.chartView[Vue.portletID-1].dispose();
          }
          let eoption = eval("(" + chart.defineJSON + ")");
          Vue.AxiosPost("getChartData",{'chartId':chart.id},
            function(response){
              chartUtil.analysis(eoption,chart.type,response.data);
              // 基于准备好的dom，初始化echarts实例
              let chartView = echarts.init(document.getElementById(Vue.chartID+Vue.portletID));
              // 绘制图表
              chartView.setOption(eoption);
              Vue.chartView[Vue.portletID-1] = chartView;
              //存储tabs
              var tabs = [{"tabID":Vue.portletID,"title":Vue.griditemTitle,"objid":chart.id,"objtype":chart.type}];
              Vue.$store.commit("addChartComponent",tabs); 
            }
          );
        },
        getChartList(){
          let Vue = this;
          Vue.AxiosPost("getChartList",'',
            function(response){
               Vue.chartInfo = response.data;
            }
          ); 
        }
    },
    mounted(){
      this.getChartList();
    }
   /* "chartboxname":Vue.chartID+Vue.portletID*/
}
</script>

<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
