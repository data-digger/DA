<template>
  <div>
     <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >
        <grid-item v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key='item.i'>
           <Dropdown style='float:right;margin-right:5px' @on-click='drawChart'>   
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem v-for='chart in chartInfo':name="chart" :key='chart.bizViewId' :chartID='chart.id'>{{chart.name}}</DropdownItem>
            </DropdownMenu>   
           </Dropdown>
            <div class='griditem-title'>{{item.i}}</div>
            <div :id="'chart'+chartID" style='height:90%'></div>
        </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
    components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
    },
    data(){
        return{
            layout:[{"x":0,"y":0,"w":12,"h":4,"i":"0"},
                    {"x":0,"y":4,"w":12,"h":8,"i":"1"},
                    {"x":0,"y":12,"w":12,"h":8,"i":"2"},
                    {"x":0,"y":20,"w":12,"h":8,"i":"3"},
                    {"x":0,"y":28,"w":12,"h":8,"i":"4"}],
            chartInfo:null,
            chartView:[],
            chartID:"",
        }
    },
    methods:{
        getChartInfo(){
          let Vue = this;
          Vue.AxiosPost("getChart",'',
            function(response){
               Vue.chartInfo = response.data;
            }
          ); 
        },
        drawChart(chart){
          let Vue = this;
/*          if(Vue.chartView[Vue.portletID-1]){
            Vue.chartView[Vue.portletID-1].dispose();
          }*/
          Vue.chartID = chart.id;
          let eoption = eval("(" + chart.defineJSON + ")");
          Vue.AxiosPost("previewBizView",{'bizViewId':chart.bizViewId},
            function(response){
              chartUtil.analysis(eoption,chart.type,response.data);
              // 基于准备好的dom，初始化echarts实例
              let chartView = echarts.init(document.getElementById(Vue.chartID));
               
              // 绘制图表
              chartView.setOption(eoption);
              /*Vue.chartView[Vue.portletID-1] = chartView;*/
              var tabs = [{"portletID":Vue.portletID,"title":Vue.griditemTitle,"chartDefine":chart.defineJSON,"bizViewId":chart.bizViewId,"type":chart.type}];
              Vue.$store.commit("addChartComponent",tabs); 
            }
          );
     
        },      
    },
    mounted(){
        this.getChartInfo();
    }
}
</script>
<style scoped>
.griditem-title{
 background-color:lightgray;
}
</style>