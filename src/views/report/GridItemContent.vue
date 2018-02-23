<template>
     <div :id="'portlet'+portletID"class="text">
        <div class="no-drag">
          <div class='griditem-title'>
            <div @click='deletePortlet(portletID)'><Icon class='delete-portlet'type="android-close" ></Icon></div>
            {{griditemTitle}}
            <Dropdown style='float:right;margin-right:5px' @on-click='drawChart'>   
              <Icon type="arrow-down-b"></Icon>
              <DropdownMenu slot="list">
                  <DropdownItem v-for='chart in chartInfo':name="chart" :key='chart.id'>{{chart.name}}</DropdownItem>
              </DropdownMenu>
            </Dropdown> 
          </div>
          <div :id="'chart-'+chartID+portletID" style='height:85%' v-show = 'chartShow'></div>
          <table :id="'table-'+portletID" style='width:85%' v-show = '!chartShow'></table>
        </div>
        <div class="vue-draggable-handle"></div> 
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import echarts from 'echarts'
import dataTables from 'dataTables/media/js/jquery.dataTables.min.js'
import chartUtil from './../../libs/chartUtil.js'
import EleResize from './../../libs/resize.js'
export default {
    props:['griditemTitle','portletID'],
    data(){
      return {
        chartInfo:null,
        chartView:null,
        tableView:null,
        chartShow:true,
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
            if(chart.type == 'Table'){
              Vue.chartShow = false;
              var header = response.data.stringHeaders;
              var cols = [];
              for(let c in header){
                 cols.push({
                  "title":header[c]
                 })
              };
              var rows = [];
              var rowData = response.data.data;
               for(let i in rowData){
                  let row = [];
                  for (let j in rowData[i]){
                      row.push(rowData[i][j].displayValue);
                  }
                  rows.push(row);
              };
              $('#table-'+Vue.portletID).DataTable({
                "destroy": true,
                pageLength: 3,
                searching:false,
                lengthChange:false,
                bInfo:false,
                bSort:false,
                columns: cols,
                data:rows
              });             
            }else{
              //解析option
              chartUtil.analysis(eoption,chart.type,response.data);
              // 基于准备好的dom，初始化echarts实例
              Vue.chartView = echarts.init(document.getElementById("chart-"+Vue.chartID+Vue.portletID));
              // 绘制图表
              Vue.chartView.setOption(eoption);
            }
              //存储tabs
              var tabs = [{"tabID":Vue.portletID,"title":Vue.griditemTitle,"objid":chart.id,"objtype":chart.type}];
              Vue.$store.commit("saveTabs",tabs); 
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
      },
      deletePortlet(portletID){
        this.$store.commit("deletePortlet",portletID);
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
.delete-portlet{
  float: right;
  margin: 5px 20px;
}
</style>
