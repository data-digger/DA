<template> 
    <div>
      <div class="header">
        <div class='left_logo'></div>
        <div class='right_logo'></div>
      </div>    
      <Grid 
        :portlets='report.defineJSON.content.portlets' 
        isEdit='false'
        ref='Grid'>
      </Grid>
  </div>    
</template>
<script>
import Grid from "./gridcomponents/Grid"
import echarts from 'echarts'
import {mapGetters} from 'vuex'

export default {
  components: {
    Grid    
  },
  data(){
    return { 
      isIntoFromResource:false,//是否从资源入口进入
      report_replace:null,//用于更新数据的report替身
    }
  }, 
  computed:{
    ...mapGetters({
      report:'report'
    })
  },
    
  mounted(){
    let Vue = this;
    Vue.initReport();
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
      }
      Vue.getReportData();
    },

    /**
     * 获取报表数据
     */
    getReportData(){
      let Vue = this;   
      if(Vue.isIntoFromResource){//如果从资源界面进入
        Vue.AxiosPost("getReportDataById",{'reportID':Vue.report.id},
        function(response){
          Vue.drawReport(response.data.content);
        })          
      }  
      if(!Vue.isIntoFromResource){//如果从新建下一步入口进入
        Vue.AxiosPost("getReportDataByDefine",{'reportDefine':JSON.stringify(Vue.report.defineJSON)},
        function(response){
          Vue.drawReport(response.data.content);
        })        
      } 
    },

   
    /**
     * 绘制报表
     */
    drawReport(response){
      let Vue = this;
      let chartDataArray = response.chartData;
      if(chartDataArray.length != 0){//chart图形
        for (let i in chartDataArray){
          let chartData = chartDataArray[i];
          let portlets = Vue.report.defineJSON.content.portlets;
          let gridItemContent = {
              gridItemTitle:"",
              gridItemTitleBackgroundImg:portlets[chartData.portletID].tabs[0].gridItemTitleBackgroundImg,//选中title的背景图
              gridItemChartBoxBackgroundImg:portlets[chartData.portletID].tabs[0].gridItemChartBoxBackgroundImg,//选中chart容器的背景图
              chartBoxBackgroundStyles:portlets[chartData.portletID].tabs[0].chartBoxBackgroundStyles,
              chartId:chartData.id,
              chartType:chartData.type,
              chartComponent:"Chart",
              chartOption:'',
              chartData:chartData      
            }
          Vue.$refs.Grid.$refs.gridItemContent[chartData.portletID].initGridItemContent(gridItemContent);
        }        
      }   
    }
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
