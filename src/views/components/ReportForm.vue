<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="item in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.name+item.i}}</div>
              <div :id="'chart'+report.id+item.i" style='height:90%;' v-show='chartShow && item.tabs[0].objtype != "Table"'></div>  
              <Table style='margin:20px 10px'border :columns="columns" :data="currentTableData" v-show='tableShow && item.tabs[0].objtype == "Table"'></Table>
              <div style="margin: 10px;overflow: hidden" v-show='tableShow && item.tabs[0].objtype == "Table"'>
                <div style="float: right;">
                  <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage"></Page>
                </div>
              </div>                          
            </grid-item>
         </grid-layout>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  /*props:['report'],*/
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem
  },
  data(){
    return {
      report:null,
      chartShow :true,
      tableShow : true,
      total:null,
      columns:[],
      pageSize:4,
      historyData:[],
      currentTableData:[],  
    }
  }, 
  methods:{
    initReport(){
      let Vue = this;
      Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
      function(response){
         var portlets = JSON.parse(response.data.defineJSON).content.portlets;
         var chartData = response.data.chartData;
         var tableData = response.data.tableData;   
         for (var i in chartData){
            Vue.drawChart(chartData[i]);                
         }
         for(var j in tableData){
            Vue.drawTable(tableData[j]); 
         }         
      })         
     },
    drawTable (tableData){
      let Vue = this;
      var header = tableData.gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c],
          "key":header[c]
         })
      };
      var rows = [];
      var rowData = tableData.gridData.data;
       for(let r in rowData){
          let row = {};
          let curRow = rowData[r];
           for(let col in header){
             row[header[col]] = curRow[col].displayValue;
          };
          rows.push(row);
      }
      Vue.columns = cols; 
      Vue.total = rows.length;
      Vue.historyData = rows;
      if(Vue.total<Vue.pageSize){
        Vue.currentTableData = Vue.historyData;
      }else{
        Vue.currentTableData = Vue.historyData.slice(0,this.pageSize);
      }         
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
   },
   changePage(index){
      let Vue = this;
      var _start = ( index - 1 ) * Vue.pageSize;
      var _end = index * Vue.pageSize;
      Vue.currentTableData = Vue.historyData.slice(_start,_end);
   }
  },
  beforeMount(){
    this.report = this.$route.params;
    this.initReport();    
  }
}
</script>


<style scoped lang='less'>
.griditem-title{
  height:35px;
  background-color:#2d8cf0;
  color:white;
}
</style>
