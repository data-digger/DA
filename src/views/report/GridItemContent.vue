<template>
  <div :id="'portlet'+portletID" class="text">
    <!-- 不可拖拽区 -->
    <div class="no-drag">
      <!-- title区 -->
      <div class='griditem_title' :style="{background:'url('+imgAndChartInfo.imgSelecteToTitle+') no-repeat'}">
        <div @click='deletePortlet(portletID)'>
          <Icon class='delete-portlet' type="android-close" v-if='isShowExtraIcon()'></Icon>
        </div>
        <div v-if='flag' style='display:inline-block'>
          <span @click='edit()'>{{portletTitle}}</span>
        </div>
        <input type="text" v-else v-model='portletTitle' @change='input()'>
        <div class='selectReportChart' @click ="selectReportChart()">
          <Icon type="plus-round"></Icon>
        </div>
      </div> 
      <!-- chart图形背景容器 -->
      <div :id="'chartBox'+portletID" class='chartBox' 
           :style='{width:chartBackgroundStyles.width,
                    height:chartBackgroundStyles.height,
                    background:"url("+imgAndChartInfo.imgSelecteTochartBox+") no-repeat"}'>
          <!-- chart图形组件 -->          
          <component v-if='itemComponent != "Table"' 
                    :ref="'chartContainer'+portletID"
                    :is="itemComponent" 
                    :option="option"
                    :chartId='"report"+portletID'
                    :styles='{width:"100%",height:"100%"}'>
          </component>
      </div>
      <!-- 图形选择modal -->
      <ChartSelectModal ref='ChartSelectModal' @drawReportChart="drawReportChart"></ChartSelectModal>
    </div>
    <!-- 可拖拽区 -->
    <div class="vue-draggable-handle" v-if='isShowExtraIcon()'></div> 
  </div>
</template>

<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import EleResize from './../../libs/resize.js'
import ChartSelectModal from './SelectChart'
import Chart from "./../chartcomponents/Chart"//echart图形
import CountCard from "./../chartcomponents/CountCard"//统计卡
import {mapGetters} from 'vuex'
export default {
    props:['portletID','hasExtraIcon'],
    components:{
      ChartSelectModal,
      Chart,
      CountCard
    },
    computed: {
      ...mapGetters({
        chartList:'chartList',
        tableList:'tableList'
      }),
    },    
    data(){
      return {
        chartView:null,//chart图形视图，用作chart图形resize
        flag:true,
        portletTitle:"点击编辑title",//点击编辑title
        itemComponent:"",//根据选择图形，渲染组件容器
        option:'',//chart图形option
        chartBackgroundStyles:{width:"",height:""},//chart背景容器容器样式
        imgAndChartInfo:{
          imgSelecteToTitle:'',//选中title的背景图
          imgSelecteTochartBox:'',//选中chart容器的背景图  
        }
      }
    },
    methods:{

      isShowExtraIcon(){
        let Vue =this;
        if(Vue.hasExtraIcon == false){
          return false;
        }else{
          return true;
        }
      },

      /**
       * 选择报表
       */
      selectReportChart(){
        let Vue = this;
        Vue.$refs.ChartSelectModal.showModal();
        Vue.getChartBackgroundStyle();
      },

      /**
       * 绘制报表图形
       */
      drawReportChart(imgAndChartInfo){
        let Vue = this;
        Vue.imgAndChartInfo = imgAndChartInfo;
        let chart = null;
        if(Vue.imgAndChartInfo.tabType == "chart"){
          chart = Vue.chartList[Vue.imgAndChartInfo.chartSelected];
        }
        if(Vue.imgAndChartInfo.tabType == "table"){
          chart = Vue.tableList[Vue.imgAndChartInfo.tableSelected];
        };    
        Vue.AxiosPost("getChartData",{'chartId':chart.id},
          function(response){
            if(chart.type){
              if(chart.type == 'Card'){
                Vue.itemComponent = "CountCard"; 
                Vue.drawEChart(response.data.content);            
              }else{
                Vue.itemComponent = "Chart" ;
                Vue.drawEChart(response.data.content);        
              }
            }else{
                            
            }     
          }
        );
        //存储tabs
        var tabs =[{"tabID":Vue.portletID,
                    "title":Vue.portletTitle,
                    "objid":chart.id,
                    "objtype":chart.type?chart.type:'Table',
                    'titleBackgroundImg':Vue.imgAndChartInfo.imgSelecteToTitle,
                    'chartBoxBackgroundImg':Vue.imgAndChartInfo.imgSelecteTochartBox,
                    'chartBackgroundStyles':Vue.chartBackgroundStyles}
                  ];
        Vue.$store.commit("saveTabs",tabs); 
      },

      /**
       * 绘制EChart图形
       */
      drawEChart (chartData) {
        let Vue = this;
        let data = chartData.data;
        let Coption = JSON.parse(chartData.defineJSON).option;
        Vue.option = Coption;
        var type = chartData.type;
        chartUtil.analysis(Coption,type,data);
        Vue.$nextTick(function(){
          Vue.$refs['chartContainer'+Vue.portletID].show(Coption);
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
        Vue.chartBackgroundStyles = style;
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
       *删除portlet块 
       */
      deletePortlet(portletID){
        let Vue = this;
        Vue.$store.commit("deletePortlet",portletID);
      },

      /**
       * 编辑title
       */
      edit(){
        let Vue = this;
        Vue.flag=false;
      },


      input(text){
        let Vue = this;
        Vue.flag=true;
        Vue.$store.commit("savePortletTitle",{"portletTitle":Vue.portletTitle,"portletID":Vue.portletID}); 
      },
    },
    mounted(){
      let Vue = this;
      Vue.resized();   
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

