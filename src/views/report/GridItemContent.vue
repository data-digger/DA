<template>
    <div :id="'portlet'+portletID"class="text">
        <div class="no-drag">
        <div class='griditem-title'>
          <div @click='deletePortlet(portletID)'><Icon class='delete-portlet'type="android-close" v-if='isShowExtraIcon()'></Icon></div>
          {{griditemTitle}}
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
        <div :id="'chart-'+chartID+portletID" style='height:85%' v-if = 'chartShow'></div>
        <Table border :columns="columns" :data="queryData" v-if = '!chartShow'></Table>
        <div style="margin: 10px;overflow: hidden" v-if = '!chartShow'>
          <div style="float: right;">
            <Page :total="total" :current="1" @on-change="changePage"></Page>
          </div>
        </div> 
      </div>
      <div class="vue-draggable-handle" v-if='isShowExtraIcon()'></div> 
    </div>
</template>

<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import EleResize from './../../libs/resize.js'
import {mapGetters} from 'vuex'
export default {
    props:['griditemTitle','portletID','hasExtraIcon'],
    computed: {
      ...mapGetters({
        chartList:'chartList',
        tableList:'tableList'
      }),
    },    
    data(){
      return {
        chartView:null,
        chartShow:true,
        total:null,
        columns:[],
        queryData:[], 
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
              Vue.chartShow = true;
              Vue.$nextTick(function(){
                Vue.drawChart(chart,response); 
              })   
            }else{
              Vue.chartShow = false;           
              Vue.$nextTick(function(){
                Vue.drawTable(chart,response);
              })
            }              
            //存储tabs
            var tabs = [{"tabID":Vue.portletID,"title":Vue.griditemTitle,"objid":chart.id,"objtype":chart.type?chart.type:'Table'}];
            Vue.$store.commit("saveTabs",tabs); 
          }
        );
      },
      drawChart (chart,chartData) {
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
        Vue.queryData = rows; 
        Vue.total = rows.length;
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
        this.$store.commit("deletePortlet",portletID);
      },
      changePage(){

      },
      cancel(){

      }
    },
    mounted(){
      this.resized();
    }
}
</script>

<style scoped>
.griditem-title{
    background-color:lightgray;
}
.delete-portlet{
  float: right;
  margin: 5px 20px;
}
.ivu-radio-group-button .ivu-radio-wrapper{
  height:100% !important;
}
</style>
