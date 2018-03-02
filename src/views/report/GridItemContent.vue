<template>
    <div :id="'portlet'+portletID"class="text">
        <div class="no-drag">
        <div class='griditem-title'>
          <div @click='deletePortlet(portletID)'><Icon class='delete-portlet'type="android-close" v-if='isShowExtraIcon()'></Icon></div>
          <div v-if='flag' style='display:inline-block'><span @click='edit()'>{{portletTitle}}</span></div>
          <input type="text" v-else v-model='portletTitle'@change='input()'>
          <div style='float:right;margin-right:5px;cursor:pointer' @click = "selectReportChart()"><Icon type="plus-round"></Icon></div>
        </div>
        <Modal
          v-model="modalSelectChart"
          title="选择图表"
          width ="1200px"
          @on-ok="drawReport"
          @on-cancel="cancel">
            <Tabs type="card" v-model='currentTab'>
                <TabPane label="选择图形" name='chart'>
                  <RadioGroup v-model="chartSelected" type='button'>
                    <Radio v-for='(chart,chartIndex) in chartList' :key='chart.id' :label='chartIndex'>
                      <Card style="width:250px;margin:10px;display:inline-block;" >
                          <p slot="title">{{chart.name}}</p>
                          <p>{{chart.desc}}</p>      
                      </Card> 
                    </Radio>
                  </RadioGroup>
                </TabPane>
                <TabPane label="选择表格" name='table'>
                  <RadioGroup v-model="tableSelected"type='button'>
                    <Radio v-for='(table,tableIndex) in tableList' :key='table.id' :label='tableIndex'>
                      <Card style="width:250px;margin:10px;display:inline-block;">
                       <p slot="title">{{table.name}}</p>
                        <p>{{table.desc}}</p>      
                      </Card>
                    </Radio>
                  </RadioGroup>
                </TabPane>
            </Tabs>                   
        </Modal>  
        <!-- EChart图形容器   -->     
        <div :id="'chart-'+chartID+portletID" style='height:85%' v-if = 'EChartShow'></div>
        <!-- 表格容器 -->
        <Table style='margin:20px 10px' border :columns="columns" :data="currentTableData" v-if = 'tableShow'></Table>
        <div style="margin: 10px;overflow: hidden" v-if = 'tableShow'>
          <div style="float: right;">
            <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage"></Page>
          </div>
        </div> 
        <!-- 卡片容器 -->
        <div class='infoCard'>
        <infoCard 
            v-if = "cardShow"
            :id-name="portletID"
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
      </div>
      <div class="vue-draggable-handle" v-if='isShowExtraIcon()'></div> 
    </div>
</template>

<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import infoCard from './../home/components/inforCard'
import EleResize from './../../libs/resize.js'
import {mapGetters} from 'vuex'
export default {
    props:['portletID','hasExtraIcon'],
    components:{
      infoCard
    },
    computed: {
      ...mapGetters({
        chartList:'chartList',
        tableList:'tableList'
      }),
    },    
    data(){
      return {
        chartView:null,
        EChartShow:false,
        tableShow:false,
        cardShow:false,
        cardOption:null,
        flag:true,
        portletTitle:"点击编辑title",
        total:null,
        columns:[],
        historyData:[],
        currentTableData:[],
        pageSize:4, 
        modalSelectChart:false,
        chartID:null,
        currentTab:"chart",
        chartSelected:0,
        tableSelected:0
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
      selectReportChart(){
        let Vue = this;
        Vue.modalSelectChart = true;
      },
      drawReport(){
        let Vue = this;
        let chart;
        if(Vue.currentTab == "chart"){
          chart = Vue.chartList[Vue.chartSelected];
        }
        if(Vue.currentTab == "table"){
          chart = Vue.tableList[Vue.tableSelected];
        }
        Vue.chartID = chart.id;
        if(Vue.chartView != null){
          Vue.chartView.dispose();
        }       
        Vue.AxiosPost("previewBizView",{'bizViewId':chart.bizViewId},
          function(response){
            if(chart.type){
              if(chart.type == 'Card'){
                Vue.$nextTick(function(){
                  Vue.drawCard(chart,response);
                })
                Vue.cardShow = true;
                Vue.EChartShow = false;
                Vue.tableShow = false;                
              }else{
                Vue.cardShow = false;
                Vue.EChartShow = true;
                Vue.tableShow = false;
                Vue.$nextTick(function(){
                  Vue.drawEChart(chart,response); 
                })                
              }
            }else{
              Vue.cardShow = false;
              Vue.EChartShow = false;
              Vue.tableShow = true;          
              Vue.$nextTick(function(){
                Vue.drawTable(chart,response);
              })              
            }        
            //存储tabs
            var tabs = [{"tabID":Vue.portletID,"title":Vue.portletTitle,"objid":chart.id,"objtype":chart.type?chart.type:'Table'}];
            Vue.$store.commit("saveTabs",tabs); 
          }
        );
      },
      drawEChart (chart,chartData) {
        let Vue = this;
        let eoption = eval("(" + chart.defineJSON + ")");
        //解析option
        chartUtil.analysis(eoption,chart.type,chartData.data);
        // 基于准备好的dom，初始化echarts实例
        Vue.chartView = echarts.init(document.getElementById("chart-"+Vue.chartID+Vue.portletID));
        // 绘制图表
        Vue.chartView.setOption(eoption);
      },
      drawTable(chart,tableData){
        let Vue = this;
        var header = tableData.data.stringHeaders;
        var cols = [];
        for(let c in header){
           cols.push({
            "title":header[c],
            "key":header[c]
           })
        };
        var rows = [];
        var rowData = tableData.data.data;
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
          Vue.currentTableData = Vue.historyData;
        }else{
          Vue.currentTableData = Vue.historyData.slice(0,this.pageSize);
        } 
      },
      drawCard(chart,cardData){
        let Vue = this;
        Vue.cardOption = eval("(" + chart.defineJSON + ")");
        chartUtil.analysis(Vue.cardOption,chart.type,cardData.data);        
      },
      resized(){
        let Vue = this;
         EleResize.on(document.getElementById('portlet'+Vue.portletID), function(){
          if(Vue.chartView!=null){
            Vue.chartView.resize();
          }                
        });
      },
      deletePortlet(portletID){
        let Vue = this;
        Vue.$store.commit("deletePortlet",portletID);
      },
      changePage(index){
        let Vue = this;
        var _start = ( index - 1 ) * Vue.pageSize;
        var _end = index * Vue.pageSize;
        Vue.currentTableData = Vue.historyData.slice(_start,_end);
      },
      edit(){
        let Vue = this;
        Vue.flag=false;
      },
      input(text){
        let Vue = this;
        Vue.flag=true;
        Vue.$store.commit("savePortletTitle",{"portletTitle":Vue.portletTitle,"portletID":Vue.portletID}); 
      },
      cancel(){

      }
    },
    mounted(){
      this.resized();
      $(".infoCard").resize();
    }
}
</script>

<style scoped lang='less'>
.vue-grid-layout {
   height: 400px !important;
   overflow:auto !important;
}
.griditem-title{
  height: 40px;
  line-height: 40px;
  text-align:left;
  background-color: #f8f8f9;
  border-bottom: 0.5px solid lightgray;
  padding-left: 11px;
  color: black;
  font-size: 14px;
}
.delete-portlet{
  float: right;
  margin: 5px 20px;
}
.ivu-radio-group-button .ivu-radio-wrapper{
  height:100% !important;
}
.infoCard{
  width: 80%;
  margin: 10px;
}
</style>
