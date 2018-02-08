<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="item in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.i}}</div>
              <div :id="'chartBox'+item.i" style='height:90%;' v-if='show'></div>                
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
       show:false,
    }
  }, 
  methods:{
    initReport(){
            let Vue = this;
            Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
            function(response){
              console.log(response)
              // var portlets = JSON.parse(response.data.defineJSON).content.portlets;
              // var chartData = response.data.data;              
              // for(var i in portlets){
              //   var portletID = portlets[i].portletID;
              //   for(var j in portlets[i].tabs){
              //      var chartID = portlets[i].tabs[j].objid;
            //        var gridData = chartData[chartID].gridData;
            //        var chartDefineJSON = chartData[chartID].defineJSON;
            //        var type = chartData[chartID].type;
            //        console.log(chartDefineJSON);
            //        var eoption = eval('(' + chartDefineJSON + ')');
            //        chartUtil.analysis(eoption,type,gridData);
            //        Vue.show = true;
            //        Vue.$nextTick(function(){
            //         // 基于准备好的dom，初始化echarts实例
            //           let chartView = echarts.init(document.getElementById("chartBox"+portletID));
            //        // 绘制图表
            //           chartView.setOption(eoption);
            //        })
            //    }
              // }
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
