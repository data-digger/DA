<template>
  <div :id="'portlet'+portletID" class="text">
    <div class="no-drag">
      <!-- title区 -->
      <div class='griditem_title' :style="{background:'url('+imgSelecteToTitle+') no-repeat'}">
        <div @click='deletePortlet(portletID)'><Icon class='delete-portlet' type="android-close" v-if='isShowExtraIcon()'></Icon></div>
        <div v-if='flag' style='display:inline-block'><span @click='edit()'>{{portletTitle}}</span></div>
        <input type="text" v-else v-model='portletTitle' @change='input()'>
        <div style='float:right;margin-right:5px;cursor:pointer' @click = "selectReportChart()"><Icon type="plus-round"></Icon></div>
      </div> 
      <!-- echart图形组件 -->
      <div :id="'chartBox'+portletID" 
           class='chartBox' 
           :style='{width:chartBackgroundStyles.width,height:chartBackgroundStyles.height,background:"url("+imgSelecteTochartBox+") no-repeat"}'>
      <component v-if='itemComponent != "Table"' 
                :ref="'chartContainer'+portletID"
                :is="itemComponent" 
                :option="option"
                :chartId='"report"+portletID'
                :styles='chartBackgroundStyles'
                >
      </component></div>
      <!-- 图形选择和背景图片选择 -->
      <Modal
        v-model="showSelectChartModal"
        title="选择图表"
        width ="1200px"
        @on-ok="drawReportChart">
          <!-- 背景图 -->
          <!-- @on-change='renderTitleBgr' -->
          <RadioGroup v-model="imgSelecteToTitle" class='imgSelecteToTitle'>选择title背景图：
              <Radio :label="require('./../../assets/img/gridItemTitle1.png')"><img src="./../../assets/img/gridItemTitle1.png" alt=""></Radio>
              <Radio :label="require('./../../assets/img/gridItemTitle2.png')"><img src="./../../assets/img/gridItemTitle2.png" alt=""></Radio>
          </RadioGroup>
          <RadioGroup v-model="imgSelecteTochartBox" class='imgSelecteTochartBox'>选择容器背景图：
              <Radio :label="require('./../../assets/img/chartBox1.png')"><img src="./../../assets/img/chartBox1.png" alt=""></Radio>
              <Radio :label="require('./../../assets/img/chartBox2.png')"><img src="./../../assets/img/chartBox2.png" alt=""></Radio>
              <Radio label="">无背景</Radio>
          </RadioGroup>  
          <!-- 图形 -->
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
        portletTitle:"点击编辑title",
        showSelectChartModal:false,//显示图形选择modal
        imgSelecteToTitle:require("./../../assets/img/gridItemTitle1.png"),//选中title的背景图
        imgSelecteTochartBox:"",//选中chart容器的背景图
        chartID:null,//选中的chart图形id
        currentTab:"chart",//modal中当前停留的的tab，默认chart
        chartSelected:0,//选中的chart图形
        tableSelected:0,//选中的table图形
        itemComponent:"",//根据选择图形，渲染组件容器
        option:'',//chart图形option
        chartBackgroundStyles:''//chart背景容器容器样式
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
        Vue.getChartBackgroundStyle();
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
            var tabs =[{"tabID":Vue.portletID,
                         "title":Vue.portletTitle,
                         "objid":chart.id,
                         "objtype":chart.type?chart.type:'Table',
                         'titleBackgroundImg':Vue.imgSelecteToTitle,
                         'chartBoxBackgroundImg':Vue.imgSelecteTochartBox}
                      ];
            Vue.$store.commit("saveTabs",tabs); 
          }
        );
      },

      //绘制EChart图形
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
    
      //获取背景图片容器样式
      getChartBackgroundStyle (){
        let Vue = this;
        let style = {};
        let $grid_item = $("#portlet"+Vue.portletID);
        let $grid_item_title = $grid_item.find(".griditem_title");
        style.width = '100%';
        style.height = ($grid_item.height()-$grid_item_title.height())/$grid_item.height()*100+"%";
        Vue.chartBackgroundStyles = style;
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
.ivu-radio-group-button .ivu-radio-wrapper{
  height:100% !important;
  margin: 10px;
}
.imgSelecteToTitle{
  margin: 10px 0px 20px 10px;
}
.imgSelecteTochartBox{
  margin: 0px 0px 50px 10px;
}
</style>

