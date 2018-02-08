<template>
     <div :id="'portlet'+portletID"class="text">
        <div class="no-drag">
          <Dropdown style='float:right;margin-right:5px' @on-click='drawChart'>   
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem v-for='chart in chartInfo':name="chart" :key='chart.id'>{{chart.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
          <div class='griditem-title'>{{griditemTitle}}</div>
          <div :id="chartID+portletID" style='height:85%'></div>
        </div>
        <div class="vue-draggable-handle"></div> 
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import EleResize from './../../libs/resize.js'
export default {
    components: {},
    props:['griditemTitle','portletID'],
    data(){
      return {
        component:null,
        chartInfo:null,
        chartView:null,
        hasResized:false,
        chartID:null
      }
    },
    methods:{
        drawChart(chart){
          let Vue = this;
          Vue.chartID = chart.id;
          if(Vue.chartView != null){
            Vue.chartView.dispose();
          }
          let eoption = eval("(" + chart.defineJSON + ")");
          Vue.AxiosPost("getChartData",{'chartId':chart.id},
            function(response){
              chartUtil.analysis(eoption,chart.type,response.data);
              // 基于准备好的dom，初始化echarts实例
              Vue.chartView = echarts.init(document.getElementById(Vue.chartID+Vue.portletID));
              // 绘制图表
              Vue.chartView.setOption(eoption);
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
        },
        resized(){
          let Vue = this;
           EleResize.on(document.getElementById('portlet'+Vue.portletID), function(){
            if(Vue.chartView!=null){
              Vue.chartView.resize();
            }                
          });
        }
    },
    mounted(){
      this.getChartList();
      this.resized();
    }
}
</script>

<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
