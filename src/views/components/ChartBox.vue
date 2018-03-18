<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card' @click='link(subpath)'>
        <p slot="title">{{chartbox.alias}} ({{chartbox.type}})</p>
        <p class="box-desc" :title='chartbox.desc'> {{chartbox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>        
    </Card>
    <Modal
      v-model="modaledit"
      width ="1200px"
      title="编辑图表"
      @on-ok="editOk"
      @on-cancel="cancel">
      <ChartForm ref="chartedit" :myChart='chartbox'></ChartForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="图表预览"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <!-- <Condition :showOptions='showOptions'></Condition> -->
        <Row><component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component></Row>
        <Row><component :ref="'chart'+chartbox.id" :is="chartComponent" :chartbox='chartbox' :option='eoption'></component></Row>
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
      this.modaledit = true;
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
         Vue.$refs['chart'+Vue.chartbox.id].show();
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
  </style>
