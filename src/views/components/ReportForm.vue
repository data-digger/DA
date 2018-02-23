<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="item in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.name+item.i}}</div>
              <div :id="'chart'+report.id+item.i" style='height:90%;' v-show='chartShow && item.tabs[0].objtype != "Table"'></div>
              <table :id="'table'+report.name+item.i" style='width:85%;' v-show='tableShow && item.tabs[0].objtype == "Table"'></table>               
            </grid-item>
         </grid-layout>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import echarts from 'echarts'
import dataTables from 'dataTables/media/js/jquery.dataTables.min.js'
import chartUtil from './../../libs/chartUtil.js'
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  props:['report'],
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem
  },
  data(){
    return {
       chartShow :true,
       tableShow : true
    }
  }, 
  methods:{
    initReport(){
      let Vue = this;
      Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
      function(response){
         var portlets = JSON.parse(response.data.defineJSON).content.portlets;
         var chartData = response.data.data;     
         for (var i in chartData){
            if(chartData[i].type == 'Table'){
              Vue.drawTable(chartData[i]);               
            }else{
              Vue.drawChart(chartData[i]);                
            }

         }         
      })         
     },
   drawTable (tableData){
      let Vue = this;
      var header = tableData.gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c]
         })
      };
      var rows = [];
      var rowData = tableData.gridData.data;
       for(let i in rowData){
          let row = [];
          for (let j in rowData){
              row.push(rowData[i][j].displayValue);
          }
          rows.push(row);
      };
      $('#table'+Vue.report.name+tableData.portletID).DataTable({
        bDestroy: true,
        pageLength: 3,
        searching:false,
        lengthChange:false,
        bInfo:false,
        bSort:false,
        columns: cols,
        data:rows
      });          
   },
  drawChart (chartData) {
    let Vue = this;
    var gridData = chartData.gridData;
    var chartDefineJSON = chartData.defineJSON;
    var type = chartData.type;
    var eoption = eval('(' + chartDefineJSON + ')');
    chartUtil.analysis(eoption,type,gridData);
    let chartView = echarts.init(document.getElementById("chart"+Vue.report.id +chartData.portletID));
    chartView.setOption(eoption);           
  }
  }
}
</script>


<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
