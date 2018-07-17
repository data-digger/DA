<template>
    <div :id="'portlet'+portletID" class="text">
        <div class="no-drag">
        <div class='griditem_title'>
          <div @click='deletePortlet(portletID)'><Icon class='delete-portlet' type="android-close" v-if='isShowExtraIcon()'></Icon></div>
          <div v-if='flag' style='display:inline-block'><span @click='edit()'>{{portletTitle}}</span></div>
          <input type="text" v-else v-model='portletTitle'@change='input()'>
          <div style='float:right;margin-right:5px;cursor:pointer' @click = "selectReportChart()"><Icon type="plus-round"></Icon></div>
        </div> 
        <component v-if='itemComponent != "Table"' 
                    :ref="'chartContainer'+portletID"
                    :is="itemComponent" 
                    :option="option"
                    :chartId='"report"+portletID'
                    :styles='chartStyles'>
        </component>
        <Modal
          v-model="showSelectChartModal"
          title="选择图表"
          width ="1200px"
          @on-ok="drawReportChart">
            <Tabs type="card" v-model='currentTab'>
                <TabPane label="选择图形" name='chart'>
                  <RadioGroup v-model="chartSelected" type='button'>
                    <Radio v-for='(chart,chartIndex) in chartList' :key='chart.id' :label='chartIndex'>
                      <Card style="width:250px;margin:10px;display:inline-block;" >
                          <p slot="title" :title="chart.name">{{chart.name}}</p>
                          <p :title="chart.desc">{{chart.desc}}</p>      
                      </Card> 
                    </Radio>
                  </RadioGroup>
                </TabPane>
                <TabPane label="选择表格" name='table'>
                  <RadioGroup v-model="tableSelected" type='button'>
                    <Radio v-for='(table,tableIndex) in tableList' :key='table.id' :label='tableIndex'>
                      <Card style="width:250px;margin:10px;display:inline-block;">
                        <p slot="title" :title="table.name">{{table.name}}</p>
                        <p :title="table.desc">{{table.desc}}</p>      
                      </Card>
                    </Radio>
                  </RadioGroup>
                </TabPane>
            </Tabs>                   
        </Modal> 
      </div>
      <div class="vue-draggable-handle" v-if='isShowExtraIcon()'></div> 
    </div>
</template>

<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
import EleResize from './../../libs/resize.js'
import Chart from "./../chartcomponents/Chart"//echart图形
import CountCard from "./../chartcomponents/CountCard"//统计卡
import {mapGetters} from 'vuex'
export default {
    props:['portletID','hasExtraIcon'],
    components:{
      // infoCard
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
        chartView:null,
        flag:true,
        portletTitle:"点击编辑title",
        showSelectChartModal:false,
        chartID:null,
        currentTab:"chart",
        chartSelected:0,
        tableSelected:0,
        itemComponent:"",//图形组件
        option:'',
        chartStyles:''
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

      //选择报表
      selectReportChart(){
        let Vue = this;
        Vue.showSelectChartModal = true;
      },

      //绘制报表图形
      drawReportChart(){
        let Vue = this;
        let chart = null;
        if(Vue.currentTab == "chart"){
          chart = Vue.chartList[Vue.chartSelected];
        }
        if(Vue.currentTab == "table"){
          chart = Vue.tableList[Vue.tableSelected];
        }
        Vue.chartID = chart.id;      
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
            
            
            //存储tabs
            var tabs = [{"tabID":Vue.portletID,"title":Vue.portletTitle,"objid":chart.id,"objtype":chart.type?chart.type:'Table'}];
            Vue.$store.commit("saveTabs",tabs); 
          }
        );
      },

      //绘制EChart图形
      drawEChart (chartData) {
        let Vue = this;
        let data = chartData.data;
        let style = {};
        let $grid_item = $("#portlet"+Vue.portletID);
        let $grid_item_title = $grid_item.find(".griditem_title");
        style.width = '100%';
        style.height = '80%';
        Vue.chartStyles = style;
        let Coption = JSON.parse(chartData.defineJSON).option;
        Vue.option = Coption;
        var type = chartData.type;
        chartUtil.analysis(Coption,type,data);
        Vue.$nextTick(function(){
          Vue.$refs['chartContainer'+Vue.portletID].show(Coption);
          Vue.chartView =Vue.$refs['chartContainer'+Vue.portletID].getChartView();
        }) 
      },
      //
      resized(){
        let Vue = this;
         EleResize.on(document.getElementById('portlet'+Vue.portletID), function(){
          if(Vue.chartView){
            Vue.chartView.resize();
          }                
        });
      },
      deletePortlet(portletID){
        let Vue = this;
        Vue.$store.commit("deletePortlet",portletID);
      },
      edit(){
        let Vue = this;
        Vue.flag=false;
      },
      input(text){
        let Vue = this;
        Vue.flag=true;
        Vue.$store.commit("savePortletTitle",{"portletTitle":Vue.portletTitle,"portletID":Vue.portletID}); 
      }
    },
    mounted(){
      let Vue = this;
      Vue.resized();   
    }
}
</script>

<style scoped lang='less'>
.griditem_title{
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

