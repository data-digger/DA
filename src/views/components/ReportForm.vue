<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
          <Collapse accordion >
              <Panel name="1" ref='collapse'>

                <Row slot="content">
                 <component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component>
               </Row>
              </Panel>
            </Collapse>        

            <div class='header' v-if='false'></div>
            <grid-item v-for="(item,itemIndex) in report.defineJSON.content.portlets" :x="item.x" :y="item.y" :w="item.w" :h="item.h":i="item.i" :key='item.i'>
              <div class='griditem-title'>{{item.tabs[0].title}}</div>


              <!-- EChart容器 -->
              <div :id="'chart'+report.id+item.i" style='height:90%;' v-show='chartShow && item.tabs[0].objtype != "Table"&& item.tabs[0].objtype != "Card"'></div>  


              <component :chartCmpContent='chartCmpContent[item.i]' :is='item.component' ></component> 



              <!-- 卡片容器  -->  
              <div class='infoCard' v-if = "cardShow && item.tabs[0].objtype == 'Card'">
              <infoCard 
                  :id-name="'card'+report.id+item.i"
                  :end-val="cardOption.data"
                  :iconType="cardOption.iconType"
                  :icon-size="cardOption.iconSize"
                  :color="cardOption.color"
                  :count-size="cardOption.countSize"
                  :count-weight="cardOption.countWeight"
                  :intro-text="cardOption.introText"
                  :intro-color='cardOption.introColor'
                  :intro-size='cardOption.introSize'
                  :intro-weight='cardOption.introWeight'                         
                ></infoCard></div>     



            </grid-item>
            <ButtonGroup vertical class="demo-affix" style='right:18px;position:fixed;top:35%;'>
                <div class='monitor'><Icon type="arrow-expand"></Icon></div>
                <div class='monitor' @click='selectParam()'><Icon type="funnel"></Icon></div>
                <Poptip placement="left" trigger='hover'>
                  <div class='monitor'><Icon type="more"></Icon></div>
                  <div class="api" slot="content">
                      {{report.desc}}
                  </div>                      
                </Poptip> 
            </ButtonGroup>          
         </grid-layout>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import infoCard from './../home/components/inforCard'
import {mapGetters} from 'vuex'
import iviewtable from './../chartcomponents/Table'
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
import Chart from "./../chartcomponents/Chart"
import CountCard from "./../chartcomponents/CountCard"


var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
      iviewtable,
      infoCard,
      datepicker,
      list,
      Chart,
      CountCard     
  },
  computed:{
    ...mapGetters({
      paramList:'paramList'
    }),
  },
  data(){
    return {
      report:null,
      chartShow :true,
      cardShow:false,
      cardOption:[],
      paramComponent:[],
      chartCmpContent:{'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null},
      paramSelected:null,
    }
  }, 
  methods:{
    //初始化图形组件
    initChartComponent(){
      let Vue = this;
      let portlets = Vue.report.defineJSON.content.portlets;
      for(var i in portlets){
        if(portlets[i].tabs[0].objtype == 'Table'){
          portlets[i].component = 'iviewtable';
        }else if(portlets[i].tabs[0].objtype == 'Card'){
          /*portlets[i].component = 'CountCard'*/
        }else{
          /*portlets[i].component = 'Chart'*/
        }
      };
    },

    initReport(){
      let Vue = this;
      Vue.paramComponent = [];  
      //初始化参数控件          
      Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
      function(response){
        if(response.data.parameterSet.length != 0){//如果有参数控件，初始化参数控件
          for(var i in response.data.parameterSet){
            if(response.data.parameterSet[i].paramType == 'list'){
              var cmpObj = {};
              cmpObj.component = list;
              cmpObj.content = response.data.parameterSet[i];
              Vue.paramComponent.push(cmpObj);
            };
            if(response.data.parameterSet[i].paramType == 'date'){
              var cmpObj = {};
              cmpObj.component = datepicker;
              cmpObj.content = response.data.parameterSet[i];
              Vue.paramComponent.push(cmpObj);
            }
          } 
        }else{//如果没有参数控件，便开始刷新报表
          Vue.refreshReport(response);
        }
      })         
    },

    refreshReport(response){
      let Vue = this;
      var chartDataArray = response.data.chartData;
      var tableDataArray = response.data.tableData;
      if(chartDataArray.length != 0){
        for (var i in chartDataArray){
          if(chartDataArray[i].type == 'Card'){
            Vue.drawCard(chartDataArray[i]);
            Vue.cardShow = true;
          }else{
            Vue.drawEChart(chartDataArray[i]);
          }
        }        
      }   
      if(tableDataArray.length != 0){
        for(var j in tableDataArray){
          Vue.chartCmpContent[tableDataArray[j].portletID] = tableDataArray[j].data;
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

    drawEChart (chartData) {
      let Vue = this;
      var gridData = chartData.data.gridData;
      var chartDefineJSON = chartData.defineJSON;
      var type = chartData.type;
      var eoption = eval('(' + chartDefineJSON + ')');
      chartUtil.analysis(eoption,type,gridData);
      let chartView = echarts.init(document.getElementById("chart"+Vue.report.id +chartData.portletID));
      chartView.setOption(eoption);           
    },

    drawCard(cardData){
      let Vue = this;
      Vue.cardOption=eval("(" + cardData.defineJSON + ")");
      chartUtil.analysis(Vue.cardOption,cardData.type,cardData.data.gridData);
    },   

    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateReport",{"reportID":Vue.report.id,"JSONparam":JSONParam},
          function(response){
            Vue.refreshReport(response);
        });        
      }
    },

    selectParam(){
      let Vue = this;
      Vue.$refs.collapse.toggle();
    }
  },

  beforeMount(){
    let Vue =this;
    Vue.report = Vue.$route.params;
    Vue.initChartComponent();//初始化图形控件
    Vue.initReport();//初始化报表  
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
.paramcomponent{
  display: inline-block;
  margin:0 3px;
}
</style>
