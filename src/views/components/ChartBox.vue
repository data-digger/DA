<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'chart'+chartbox.name">
      <div class='card-content'  @mouseenter="enter()">
        <div style='height:30px'><img src="./../../assets/img/chart.png"></div>
        <div style='height:30px ; text-overflow:ellipsis'>{{chartbox.alias}}</div>   
      </div>
      <div :id='"chart_shade"+chartbox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/preview.png" @click='preview()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{chartbox.alias}}</p>
              <p style='white-space: normal;'>{{chartbox.desc}}</p>
          </div>          
        </Tooltip>
      </div>
    </Card>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="图表预览"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <!-- <Condition :showOptions='showOptions'></Condition> -->
        <Row><component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component></Row>
        <Row><component :ref="'chart'+chartbox.id" :is="chartComponent" :chartId='chartbox.id' :option='eoption'></component></Row>
    </Modal>
  </Col>
</template>

<script>
import echarts from 'echarts'
import ChartForm from './../components/ChartForm'
import chartUtil from './../../libs/chartUtil.js'
import infoCard from './../home/components/inforCard'
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
import Chart from "./../chartcomponents/Chart"
import CountCard from "./../chartcomponents/CountCard"
export default {
  name: 'ChartBox',
  components:{
    ChartForm,
    infoCard,
    datepicker,
    list,
    Chart,
    CountCard
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false,
      chartShow:false,
      eoption:null,
      queryData:null,
      paramComponent:[],
      paramSelected:null
    }
  },
  props:['chartbox','index'],
  computed:{
    chartComponent:function(){
      let Vue = this;
      if(Vue.chartbox.type=='Card'){
        return CountCard
      } else {
        return Chart
      }
    },
  },
  methods:{
    enter(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
      $('#chart_shade'+Vue.chartbox.name).css("display",'block');
      $('#chart'+Vue.chartbox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#chart'+Vue.chartbox.name).css('-webkit-transform','scale(1)');  
    },
    preview (){ 
      let Vue = this;
      Vue.paramComponent = [];
       Vue.AxiosPost("previewBizView",{'bizViewId':Vue.chartbox.bizViewId},
        function(response){
            for(var i in response.data.defaultParameters){
              if(response.data.defaultParameters[i].paramType == 'list'){
                var cmpObj = {};
                cmpObj.component = list;
                cmpObj.content = response.data.defaultParameters[i];
                Vue.paramComponent.push(cmpObj);
              };
              if(response.data.defaultParameters[i].paramType == 'date'){
                var cmpObj = {};
                cmpObj.component = datepicker;
                cmpObj.content = response.data.defaultParameters[i];
                Vue.paramComponent.push(cmpObj);
              }
            }
            Vue.refreshChartData(response); 
      });
    },
    refreshChartData(response){
      let Vue = this;
      Vue.queryData = response.data.gridData;   
      Vue.drawChart();     
    },
    edit (){
      let Vue = this; 
      this.$router.push({
        name:"createChart",
        params:Vue.chartbox
      });
    },
    editOk(){
      this.$refs.chartedit.saveChart();
    },
    previewOk(){

    },
    cancel(){
      
    },
    drawChart(){
      let Vue = this;
      Vue.chartShow = true;
      Vue.eoption = eval("(" + Vue.chartbox.defineJSON + ")");
      chartUtil.analysis(Vue.eoption,Vue.chartbox.type,Vue.queryData);
      Vue.modalpreview = true;
      //Vue.$refs['chart'+Vue.chartbox.id].show();
      Vue.$nextTick(function(){
         Vue.$refs['chart'+Vue.chartbox.id].show(Vue.eoption);
       })
    },
    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      console.log(Vue.param);
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateBizView",{"bizViewId":Vue.chartbox.bizViewId,"JSONParam":JSONParam},
          function(response){
           Vue.refreshChartData(response);
        });         
      }     
    }, 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paramcomponent{
 display: inline-block;
 margin: 0px 3px;
}
.icon{
  font-size:30px;
  cursor: pointer;
}
.card-shade{
  background-color: #0aabb1;
  opacity: 0.9;
  padding: 60px 20px;
}
.card-shade>img:nth-child(2){
  margin:0 15.5px;
}
.box-card{
  background-color: #1ebbc1;
}
  </style>
