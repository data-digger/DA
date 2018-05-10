<template> 
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">


          <!-- 过滤器 -->
          <component 
            class='globalFilters' 
            v-for='(cmp,index) in globalFilters' 
            :is="cmp.component" 
            :key='cmp.defaultValue' 
            :componentType='cmp.type'
            :defaultValue='cmp.defaultValue'
            @sentDate = 'updateReport'
          ></component>   


          <grid-item v-for="(item,itemIndex) in report.defineJSON.content.portlets" :x="item.x" :y="item.y" :w="item.w" :h="item.h":i="item.i" :key='item.i'>
            <div class='griditem-title'>{{item.tabs[0].title}}</div>
            <!-- 表格 -->
            <component v-if='item.component == "Table"' 
                       :tableContent='tableContent[item.i]'
                       :is="item.component"
                       :ifPage='true'>
            </component>
            <!-- Chart图 -->
            <component v-if='item.component != "Table"' 
                       :ref="'chartContainer'+item.i"
                       :is="item.component" 
                       :option="'COption'+item.i"
                       :chartId='report.id+item.i'
                       :styles='chartStyles'>
            </component>
          </grid-item>    



      </grid-layout>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import {mapGetters} from 'vuex'
import Table from './../chartcomponents/Table'//表格
import datepicker from "./../paramcomponents/DatePicker"//日期
import list from "./../paramcomponents/List"//列表
import Chart from "./../chartcomponents/Chart"//echart图形
import CountCard from "./../chartcomponents/CountCard"//统计卡

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
      Table,
      datepicker,
      list,
      Chart,
      CountCard     
  },
  computed:{
    ...mapGetters({
      report:'report'
    })
  },
  data(){
    return { 
      isIntoFromResource:false,//是否从资源入口进入
      chartStyles:{height:400+'px'},//chart图样式
      cardShow:false,//显示卡片容器
      globalFilters:[],
      tableContent:{'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null},//表格组件的内容
      paramSelected:null,//选择的参数值
    }
  }, 
  methods:{

    /*初始化报表*/
    initReport(){
      let Vue =this;
      Vue.isIntoFromResource =  !$.isEmptyObject(Vue.$route.params);//判断是否从资源界面入口进入
      if(Vue.isIntoFromResource){//如果是从资源界面入口进入
        Vue.report.name= Vue.$route.params.name;
        Vue.report.id= Vue.$route.params.id;
        Vue.report.desc= Vue.$route.params.desc;
        Vue.report.defineJSON= Vue.$route.params.defineJSON;
        Vue.report.alias= Vue.$route.params.alias;
        Vue.initReportData();
      }
      Vue.initChartComponent();//初始化图形控件
    },

    /*初始化图形组件*/
    initChartComponent(){
      let Vue = this;
      let portlets = Vue.report.defineJSON.content.portlets;
      for(var i in portlets){
        if(portlets[i].tabs[0].objtype == 'Table'){
          portlets[i].component = 'Table';
        }else if(portlets[i].tabs[0].objtype == 'Card'){
          portlets[i].component = 'CountCard'
        }else{
          portlets[i].component = 'Chart'
        }
      };
    },

    /*初始化报表数据*/
    initReportData(){
      let Vue = this;   
      if(Vue.isIntoFromResource){//如果从资源界面进入
        Vue.AxiosPost("getReportDataById",{'reportID':Vue.report.id},
        function(response){
          Vue.initFilter(response.data.content.defineJSON);
          Vue.drawReport(response.data.content);
        })          
      }  
      if(!Vue.isIntoFromResource){//如果从新建下一步入口进入
        Vue.AxiosPost("getReportDataByDefine",{'reportDefine':JSON.stringify(Vue.report.defineJSON)},
        function(response){
          Vue.initFilter(response.data.content.defineJSON);
          Vue.drawReport(response.data.content);
        })        
      } 
    },

    /*初始化过滤器组件*/
    initFilter(defineJSON){
      let Vue = this;
      let reportDefineObject = JSON.parse(defineJSON);
      let globalFiltersArray = reportDefineObject.header.globalFilter;
      let aGlobalFilters = [];
      for(let i in globalFiltersArray){
        if(globalFiltersArray[i].type == "DateByDay" || globalFiltersArray[i].type == "DateByMonth" || globalFiltersArray[i].type == "DateByUser"){
          aGlobalFilters.push({component:'datepicker',defaultValue:globalFiltersArray[i].value,type:globalFiltersArray[i].type});
        }
        if(globalFiltersArray[i].type == 'singleSelect'){
          aGlobalFilters.push({component:'input',defaultValue:globalFiltersArray[i].value,type:globalFiltersArray[i].type});
        }
        if(globalFiltersArray[i].type == 'multiSelect'){
          
        }
        if(globalFiltersArray[i].type == 'input'){
          
        }
      }
      Vue.globalFilters = aGlobalFilters;
    },

    /*绘制报表*/
    drawReport(response){
      let Vue = this;
      var chartDataArray = response.chartData;
      var tableDataArray = response.tableData;
      if(chartDataArray.length != 0){//chart图形
        for (var i in chartDataArray){
          if(chartDataArray[i].type == 'Card'){
            Vue.cardShow = true;
          }
          Vue.drawChart(chartDataArray[i]);
        }        
      }   
      if(tableDataArray.length != 0){//表格
        for(var j in tableDataArray){
          Vue.tableContent[tableDataArray[j].portletID] = tableDataArray[j].data;
/*          let portlets = Vue.report.defineJSON.content.portlets;
          for(var k in portlets){
            if(portlets[k].portletID == tableDataArray[j].portletID){
              portlets[k].cmpData = tableDataArray[j].data;
              console.log(Vue.report)
            }
          }; */         
        }
      }
    },

    /*更新报表数据*/
    updateReport(param){
      let Vue = this;
      let _reportDefine = Vue.report.defineJSON;


/*      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateReport",{"reportID":Vue.report.id,"JSONparam":JSONParam},
          function(response){
            Vue.drawReport(response);
        });        
      }*/

    },

      
    /*绘制Chart图形*/  
    drawChart (chartData) {
      let Vue = this;
      let data = chartData.data;
      let currentCOption = "COption" + chartData.portletID ;
      Vue[currentCOption]= JSON.parse(chartData.defineJSON).option;
      var type = chartData.type;
      chartUtil.analysis(Vue[currentCOption],type,data);
      Vue.$nextTick(function(){
        Vue.$refs['chartContainer'+chartData.portletID][0].show(Vue[currentCOption]);
      })     
    },   

  },
  mounted(){
    let Vue = this;
    Vue.initReport();
  }
}
</script>


<style scoped lang='less'>
.header{
  width: 99%;
  margin: 0px 10px;
  height: 45px;
  background-color: #f8f8f9;
  border-radius: 4px;
  border: 1px solid lightgray;
  box-shadow: 3px 6px 3px -2px lightgrey;
}
.griditem-title{
  height: 40px;
  line-height: 40px;
  background-color: #f8f8f9;
  border-bottom: 0.5px solid lightgray;
  padding-left: 11px;
  color: black;
  font-size: 14px;
}
.infoCard{
  width: 80%;
  margin: 10px;
}
.grid-layout{
  background-color:#f0f0f0 !important;
}
.ivu-tooltip,.ivu-poptip{
  display:block !important;
}
.monitor{
  width: 60px;
  height: 60px;
  background: rgba(163,166,167,.63);
  text-align: center;
  cursor: pointer;
  line-height:60px;
  margin-bottom:2px;
  font-size: 30px;
}
.monitor:hover{
  background-color:#2d8cf0;
}
.globalFilters{
  display: inline-block;
  margin:0 3px;
}
</style>
