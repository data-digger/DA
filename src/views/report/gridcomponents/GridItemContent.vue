<template>
  <div 
    :id="'portlet'+portletID" 
    class="text" 
    style="border:1px solid">
    <!-- 不可拖拽区 -->
    <div class="no-drag">
      <!-- title区 -->
      <div 
        class='griditem_title' 
        :style="{background:'url('+gridItemContent.gridItemTitleBackgroundImg+') no-repeat'}">
        <div 
          v-if='isEdit == "true"?true:false'
          @click='deleteCurrentGridItem(portletID)'>
          <Icon class='delete-portlet' type="android-close"></Icon>
        </div>
        <div 
          v-if='isEdit == "true"?true:false'
          class='selectReportChart' 
          @click ="selectReportChart()">
          <Icon type="plus-round"></Icon>
        </div>
      </div> 
      <!-- chart图形背景容器 -->
      <div :id="'chartBox'+portletID" 
           class='chartBox' 
           :style='{width:chartBoxBackgroundStyles.width,
                    height:chartBoxBackgroundStyles.height,
                    background:"url("+gridItemContent.gridItemChartBoxBackgroundImg+") no-repeat"}'>
          <!-- chart图形组件 -->          
          <component  
            :ref="'chartContainer'+portletID"
            :is="gridItemContent.chartComponent" 
            :option="gridItemContent.chartOption"
            :chartId='"report"+portletID'
            :styles='{width:"100%",height:"100%"}'
          ></component>
      </div>
      <!-- 图形选择modal -->
      <ChartSelectModal 
        ref='ChartSelectModal' 
        @initGridItemContent="initGridItemContent"
      ></ChartSelectModal>
    </div>
    <!-- 可拖拽区 -->
    <div 
      v-if='isEdit == "true"?true:false'
      class="vue-draggable-handle" 
    ></div> 
  </div>
</template>

<script>
import echarts from 'echarts'
import EleResize from './../../../libs/resize.js'
import ChartSelectModal from './../ReportChartSelect'
import util from './../../chartcomponents/util.js'
import Chart from "./../../chartcomponents/Chart"//echart图形
import CountCard from "./../../chartcomponents/CountCard"//统计卡
import {mapGetters} from 'vuex'
import { isExportDeclaration } from 'babel-types';
export default {
  components:{
    ChartSelectModal,
    Chart,
    CountCard
  },   
  props:['portletID','isEdit'],
  data(){
    return {
      chartView:"", 
      chartBoxBackgroundStyles:{width:"",height:""},
      gridItemContent:{
        gridItemTitle:"",
        gridItemTitleBackgroundImg:require("./../../../assets/img/gridItemTitle1.png"),//选中title的背景图
        gridItemChartBoxBackgroundImg:require('./../../../assets/img/chartBox2.png'),//选中chart容器的背景图
        chartId:"",
        chartType:'',
        chartComponent:"",
        chartOption:'',
        chartData:null
      }      
    }
  },
  mounted(){
    let Vue = this;
    Vue.resized();   
  },
  methods:{

    /**
     * 初始化gridItem内容
     */  
    initGridItemContent(gridItemContent){
      let Vue = this;
      Vue.gridItemContent = gridItemContent;
      if(gridItemContent.chartBoxBackgroundStyles){
        Vue.chartBoxBackgroundStyles = gridItemContent.chartBoxBackgroundStyles;
      }
      Vue.drawReportChart();
    },

    /**
     * 选择报表
     */
    selectReportChart(){
      let Vue = this;
      Vue.$refs.ChartSelectModal.showChartSelectModal();
      if(Vue.isEdit == "true"){
        Vue.getChartBackgroundStyle();
      }
    },

    /**
     * 绘制报表图形
     */
    drawReportChart(){
      let Vue = this;
      let data = Vue.gridItemContent.chartData.data;
      let option = JSON.parse(Vue.gridItemContent.chartData.defineJSON).option;
      let type = Vue.gridItemContent.chartData.type;
      let theme = Vue.gridItemContent.chartData.theme;
      Vue.gridItemContent.chartOption = option;
      Vue.drawEChart(option,data,type,1);
      //存储tabs
      var tabs =[{"tabID":Vue.portletID,
                  "title":Vue.gridItemContent.gridItemTitle,
                  "objid":Vue.gridItemContent.chartId,
                  "objtype":Vue.gridItemContent.chartType,
                  'gridItemTitleBackgroundImg':Vue.gridItemContent.gridItemTitleBackgroundImg,
                  'gridItemChartBoxBackgroundImg':Vue.gridItemContent.gridItemChartBoxBackgroundImg,
                  'chartBoxBackgroundStyles':Vue.chartBoxBackgroundStyles}
                ];
      Vue.$store.commit("saveTabs",tabs); 
    },

    /**
     * 绘制EChart图形
     */
    drawEChart (option,data,type,theme) {
      let Vue = this;
      util.attachData(option,data,type,theme);
      Vue.$nextTick(function(){
        Vue.$refs['chartContainer'+Vue.portletID].show(option);
        Vue.chartView =Vue.$refs['chartContainer'+Vue.portletID].getChartView();
      }) 
    },
  
    /**
     * 获取背景图片容器样式
     */
    getChartBackgroundStyle (){
      let Vue = this;
      let style = {};
      let $grid_item = $("#portlet"+Vue.portletID);
      let $grid_item_title = $grid_item.find(".griditem_title");
      style.width = '100%';
      style.height = ($grid_item.height()-$grid_item_title.height())/$grid_item.height()*100+"%";
      Vue.chartBoxBackgroundStyles = style;
    },

    /**
     * echart图形resize
     */
    resized(){
      let Vue = this;
        EleResize.on(document.getElementById('portlet'+Vue.portletID), function(){
        if(Vue.chartView){
          Vue.chartView.resize();
        }                
      });
    },

    /**
     *删除当前Griditem
      */
    deleteCurrentGridItem(portletID){
      let Vue = this;
      Vue.$store.commit("deleteGridItem",portletID);
    },
  }
}
</script>

<style scoped lang='less'>
.chartBox{
  background-size:100% 100% !important; 
}
.griditem_title{
  height: 45px;
  line-height: 45px;
  text-align:left;
  background-size:100% 100% !important; 
  padding-left: 11px;
  color:white;
  font-size: 14px;
}
.delete-portlet{
  float: right;
  margin: 5px 20px;
}
.selectReportChart{
  float:right;
  margin-right:5px;
  cursor:pointer;
}
</style>

