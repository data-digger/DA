<template>
    <div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="false":is-resizable="false":vertical-compact="true":use-css-transforms="true">
          <Row>
            <component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component>
          </Row>
            <div class='header' v-if='false'></div>
            <grid-item v-for="(item,itemIndex) in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>
              <div class='griditem-title'>{{item.tabs[0].title}}</div>
              <!-- EChart容器 -->
              <div :id="'chart'+report.id+item.i" style='height:90%;' v-show='chartShow && item.tabs[0].objtype != "Table"&& item.tabs[0].objtype != "Card"'></div>  
              <!-- 表格容器 -->
              <Table style='margin:20px 10px'border :columns="columns" :data="currentTableData[item.i]" v-show='tableShow && item.tabs[0].objtype == "Table"' ref='table'>   
              </Table>
              <div style="margin: 10px;overflow: hidden" v-show='tableShow && item.tabs[0].objtype == "Table"'>        
                <div style="float: right;">
                  <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage"></Page>
                </div>
                <Button style='background-color:#2d8cf0;color:white'@click="exportData(item.name)">导出表数据</Button>
              </div>  
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
<!--              <Poptip content="提示内容" placement="left" width='400' title='选择参数' trigger='hover'>
                    <Button type="warning" icon="funnel"></Button>
                      <div class="api" slot="content">
                          <Tag v-for='param in paramList' :key='param.id' color="yellow">{{param.name}}</Tag>
                       </div>
                  </Poptip>
                  <Poptip placement="left" title='报表描述'  trigger='hover'>
                      <Button type="warning" icon="android-more-horizontal"></Button>
                      <div class="api" slot="content">
                          {{report.desc}}
                      </div>                     
                  </Poptip>    -->   
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
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
      infoCard,
      datepicker,
      list
  },
  computed:{
  ...mapGetters({
    paramList:'paramList'
   })
  },
  data(){
    return {
      activeKey:null,
      report:null,
      chartShow :true,
      tableShow : true,
      cardShow:false,
      cardOption:[],
      total:null,
      columns:[],
      pageSize:4,
      historyData:[],
      currentTableData:{},  
      paramComponent:[],
      paramSelected:null
    }
  }, 
  methods:{
    initReport(){
      let Vue = this;
      Vue.paramComponent = [];
      Vue.AxiosPost("getReportData",{'reportID':Vue.report.id},
      function(response){
        if(response.data.parameterSet.length != 0){
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
        }else{
          Vue.refreshReport(response);
        }
      })         
     },
    refreshReport(response){
      let Vue = this;
      var portlets = JSON.parse(response.data.defineJSON).content.portlets;
      var chartData = response.data.chartData;
      var tableData = response.data.tableData;   
      for (var i in chartData){
        if(chartData[i].type == 'Card'){
          Vue.drawCard(chartData[i]);
          Vue.cardShow = true;
        }else{
          Vue.drawEChart(chartData[i]);
        }
      }
      for(var j in tableData){
          Vue.drawTable(tableData[j]); 
      } 
    },
    drawTable (tableData){
      let Vue = this;
      var header = tableData.data.gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c],
          "key":header[c]
         })
      };
      var rows = [];
      var rowData = tableData.data.gridData.data;
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
        Vue.currentTableData[tableData.portletID]= Vue.historyData;
      }else{
        Vue.currentTableData[tableData.portletID] = Vue.historyData.slice(0,this.pageSize);
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
   changePage(index){
      let Vue = this;
      var _start = ( index - 1 ) * Vue.pageSize;
      var _end = index * Vue.pageSize;
      Vue.currentTableData[tableData.portletID] = Vue.historyData.slice(_start,_end);
   },
   exportData(dataName){
    let Vue = this;
    Vue.$refs.table[0].exportCsv({
      filename: dataName
    });    
   },
    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      console.log(Vue.param);
      let JSONParam = JSON.stringify(Vue.paramSelected);
      Vue.AxiosPost("updateReport",{"reportID":Vue.report.id,"JSONparam":JSONParam},
        function(response){
          console.log(response);
          Vue.refreshReport(response);
      });     
    }
  },
  beforeMount(){
    this.report = this.$route.params;
    this.initReport();    
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
}
</style>
