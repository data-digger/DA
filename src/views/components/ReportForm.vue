<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="draggable":is-resizable="resizable":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="item in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.i}}</div>
              <div :id="'chartBox'+item.i" style='height:90%;'></div>                
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
        var responseData = Vue.report.defineJSON.content.portlets;
        //for(var i in responseData){
            Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
            function(response){
              console.log(response);
             /*  chartUtil.analysis(eoption,responseData[i].tabs[0].type,response.data);
              // 基于准备好的dom，初始化echarts实例
              let chartView = echarts.init(document.getElementById(Vue.chartID+Vue.portletID));
              // 绘制图表
              chartView.setOption(eoption);*/
            })
       // }
    /*    var eoption = eval("(" + responseData[0].tabs[0].chartDefine + ")");
        Vue.AxiosPost("previewBizView",{'bizViewId':responseData[0].tabs[0].bizViewId},function(result){
           chartUtil.analysis(eoption,responseData[0].tabs[0].type,result.data);
           // 基于准备好的dom，初始化echarts实例
           let chartView = echarts.init(document.getElementById('chartBox'+responseData[0].tabs[0].portletID));
           // 绘制图表
           chartView.setOption(eoption);

        })*/
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
