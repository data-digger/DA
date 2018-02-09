<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="item in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.name+item.i}}</div>
              <div :id="report.id+item.i" style='height:90%;' ></div>                
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
  props:['report'],
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem
  },
  data(){
    return {
     
    }
  }, 
  methods:{
    initReport(){
            let Vue = this;
            Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
            function(response){
              console.log(response)
               var portlets = JSON.parse(response.data.defineJSON).content.portlets;
               var chartData = response.data.data;     
               for (var i in chartData){
                  var cData = chartData[i];
                  var gridData = cData.gridData;
                  var chartDefineJSON = cData.defineJSON;
                  var type = cData.type;
                  console.log(chartDefineJSON);
                  var eoption = eval('(' + chartDefineJSON + ')');
                  chartUtil.analysis(eoption,type,gridData);
                  let chartView = echarts.init(document.getElementById(Vue.report.id +cData.portletID));
                  chartView.setOption(eoption);
               }         
            })         
     }
  },
  mounted(){
      console.log(this.report)
  }
}
</script>


<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
