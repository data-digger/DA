<template> 
    <div>
      <div class="header">
        <div class='left_logo'></div>
        <div class='right_logo'></div>
      </div>    
    <grid-layout :layout="report.defineJSON.content.portlets" 
                 :col-num="12" 
                 :row-height="30" 
                 :is-draggable="false" 
                 :is-resizable="false" 
                 :vertical-compact="true" 
                 :use-css-transforms="true">
        <grid-item :id="'grid_item'+item.i" 
                   v-for="(item,itemIndex) in report.defineJSON.content.portlets" 
                   :x="item.x" 
                   :y="item.y" 
                   :w="item.w" 
                   :h="item.h" 
                   :i="item.i" 
                   :key='item.i'>
           <div class='griditem_title' :style="{background:'url('+item.tabs[0].titleBackgroundImg+') no-repeat'}">{{item.tabs[0].title}}</div>
           <div :id="'chartBox'+item.i" 
                class='chartBox' 
                :style='{width:item.tabs[0].chartBackgroundStyles.width,height:item.tabs[0].chartBackgroundStyles.height,background:"url("+item.tabs[0].chartBoxBackgroundImg+") no-repeat"}'>
              <!-- Chart图 -->
              <component  v-if='item.component != "Table"' 
                          :ref="'chartContainer'+item.i"
                          :is="item.component" 
                          :option="option[itemIndex]"
                          :chartId='report.id+item.i'
                          :styles='{width:"100%",height:"100%"}'>
              </component>
          </div>
        </grid-item>    
    </grid-layout>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import echarts from 'echarts'
import {mapGetters} from 'vuex'
// import Table from './../chartcomponents/Table'//表格
import datepicker from "./../paramcomponents/DatePicker"//日期
import list from "./../paramcomponents/List"//列表
import DefineInput from "./../paramcomponents/Input"//列表
import util from './../chartcomponents/util.js'
import Chart from "./../chartcomponents/Chart"//echart图形
import CountCard from "./../chartcomponents/CountCard"//统计卡

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
      // Table,
      datepicker,
      list,
      Chart,
      DefineInput,
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
      globalFilters:[],
      //tableContent:{'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null},//表格组件的内容
      paramSelected:null,//选择的参数值
      report_replace:null,//用于更新数据的report替身
      option:[],
    }
  }, 
  methods:{

    /**
     * 初始化报表
     */
    initReport(){
      let Vue =this;
      Vue.isIntoFromResource =  !$.isEmptyObject(Vue.$route.params);//判断是否从资源界面入口进入
      if(Vue.isIntoFromResource){//如果是从资源界面入口进入
        Vue.report.name= Vue.$route.params.name;
        Vue.report.id= Vue.$route.params.id;
        Vue.report.desc= Vue.$route.params.desc;
        Vue.report.defineJSON= Vue.$route.params.defineJSON;
        Vue.report.alias= Vue.$route.params.alias;
        Vue.initChartComponent();
      }
    },

    /**
     * 初始化图形组件
     */
    initChartComponent(){
      let Vue = this;
      let portlets = Vue.report.defineJSON.content.portlets;
      for(var i in portlets){
        if(portlets[i].tabs[0].objtype == 'Table'){

        }else if(portlets[i].tabs[0].objtype == 'Card'){
          portlets[i].component = 'CountCard'
        }else{
          portlets[i].component = 'Chart'
        }
      };
      Vue.initReportData(); 
    },

    /**
     * 初始化报表数据
     */
    initReportData(){
      let Vue = this;   
      if(Vue.isIntoFromResource){//如果从资源界面进入
        Vue.AxiosPost("getReportDataById",{'reportID':Vue.report.id},
        function(response){
          //为了不改变原始report，更新数据用report_replace
          Vue.report_replace = $.extend(true,{},Vue.report);
          //修改后台传来的默认值
          let reportDefineObject = JSON.parse(response.data.content.defineJSON);
          Vue.report_replace.defineJSON.header.globalFilter = reportDefineObject.header.globalFilter;
          //初始化过滤器
          Vue.initFilter(response.data.content.defineJSON);
          //绘制报表
          Vue.drawReport(response.data.content);
        })          
      }  
      if(!Vue.isIntoFromResource){//如果从新建下一步入口进入
        Vue.AxiosPost("getReportDataByDefine",{'reportDefine':JSON.stringify(Vue.report.defineJSON)},
        function(response){
          //为了不改变原始report，更新数据用report_replace
          Vue.report_replace = $.extend(true,{},Vue.report);
          //修改后台传来的默认值
          let reportDefineObject = JSON.parse(response.data.content.defineJSON);
          Vue.report_replace.defineJSON.header.globalFilter = reportDefineObject.header.globalFilter;
          //初始化过滤器
          Vue.initFilter(response.data.content.defineJSON);
          //绘制报表
          Vue.drawReport(response.data.content);
        })        
      } 
    },

    /**
     * 初始化过滤器组件
     */
    initFilter(defineJSON){
      let Vue = this;
      Vue.globalFilters = [];
      let reportDefineObject = JSON.parse(defineJSON);
      let globalFiltersArray = reportDefineObject.header.globalFilter;
      let aGlobalFilters = [];
      let randomName=Math.random();
      for(let i in globalFiltersArray){
        //当过滤器为日期
        if(globalFiltersArray[i].type == "DateByDay" || globalFiltersArray[i].type == "DateByMonth" || globalFiltersArray[i].type == "DateByUser"){
          aGlobalFilters.push({
            component:'datepicker',
            alias:globalFiltersArray[i].alias,
            defaultValue:globalFiltersArray[i].value,
            type:globalFiltersArray[i].type,
            standByValue:[],
            randomName:randomName
          });
        }
        //当过滤器为单选框或者多选框
        if(globalFiltersArray[i].type == 'singleSelect' || globalFiltersArray[i].type == 'multiSelect'){
          if(globalFiltersArray[i].type == 'singleSelect'){
            globalFiltersArray[i].value = globalFiltersArray[i].value[0];
          }
          aGlobalFilters.push({
            component:'list',
            alias:globalFiltersArray[i].alias,
            standByValue:globalFiltersArray[i].standByValues,
            defaultValue:globalFiltersArray[i].value,
            type:globalFiltersArray[i].type,
            randomName:randomName
          });                 
          
        }
        //当过滤器为输入框
        if(globalFiltersArray[i].type == 'input'){
          aGlobalFilters.push({
            component:'DefineInput',
            alias:globalFiltersArray[i].alias,
            defaultValue:globalFiltersArray[i].value,
            type:globalFiltersArray[i].type,
            standByValue:[],
            randomName:randomName
          });
        }
      }   
      Vue.globalFilters = aGlobalFilters;
    },

    /**
     * 绘制报表
     */
    drawReport(response){
      let Vue = this;
      Vue.option = [];
      var chartDataArray = response.chartData;
      // var tableDataArray = response.tableData;
      if(chartDataArray.length != 0){//chart图形
        for (var i in chartDataArray){
          Vue.drawChart(chartDataArray[i]);
        }        
      }   
    },

    /**
     * 绘制Chart图形
     */  
    drawChart (chartData) {
      let Vue = this;
      let data = chartData.data;
      Vue.option = JSON.parse(chartData.defineJSON).option;
      let type = chartData.type;
      let theme = chartData.theme
      util.attachData(Vue.option,data,type,1);
      Vue.$refs['chartContainer'+chartData.portletID][0].show(Vue.option);    
    },   


    /**
     * 更新报表数据
     */
    updateReport(param){
      let Vue = this;
      Vue.report_replace.defineJSON.header.globalFilter[param.index].value = param.value;
        Vue.AxiosPost("updateReport",{'reportDefine':JSON.stringify(Vue.report_replace.defineJSON)},
        function(response){
          Vue.drawReport(response.data.content);
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
  width: 100%;
  height: 90px;
  background: url('./../../assets/img/report_header.png');
}
.header .left_logo,
.header .right_logo{
  width:400px;
}
.left_logo{
  float: left;
  height: 50px;
  margin: 22px;
  background: url('./../../assets/img/left_logo.png') no-repeat;
}
.right_logo{
  float: right;
  height: 90px;
  margin:5px 10px;
  background: url('./../../assets/img/right_logo.png') no-repeat;
}
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
