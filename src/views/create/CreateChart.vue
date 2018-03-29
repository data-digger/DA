<template>
    <Row style="padding:20px">
      <Col span="4">
          <FieldList :colNames="colNames"></FieldList>
        </Col>
        <Col span="7">
            <Form id="createChart" ref="myChart" :model="myChart" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="myChart.name" placeholder="输入名称" :disabled="!isNew"></Input>
              </FormItem>
              <FormItem label="别名" prop="alias">
                  <Input v-model="myChart.alias" placeholder="输入别名"></Input>
              </FormItem>
              <FormItem label="描述" prop="desc">
                  <Input v-model="myChart.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter chart descript..."></Input>
              </FormItem>
              <FormItem label="查询器" prop="bizViewId">
                  <Select class="form-control" v-model='myChart.bizViewId'>               
                      <Option v-for = 'q in queryList' :key='q.id' :name='q.name' :value="q.id" >{{q.name}}</option>
                  </Select>
              </FormItem>
               <FormItem label="类型" prop="type">
                <RadioGroup v-model="myChart.type" type="button">
                  <Tooltip v-for="T in chartType" :content="T.desc" :key="T.type" placement="top">
                      <Radio :label="T.type">
                          <img v-bind:src="T.src">
                      </Radio>
                  </Tooltip> 
                </RadioGroup>
              </FormItem>
              <FormItem label="图表选项" prop="defineJSON">
                  <component ref='optionSelected' :is="chartComponent" :data="colNames" @getSelectedOption = 'setOption'></component>
              </FormItem>
              <FormItem>
                  <Button type="ghost" shape="circle" icon="ios-search"  @click="previewChart"></Button>
                  <Button type="primary" @click="saveChart">保存</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="handleReset">重置</Button>
              </FormItem> 
          </Form>
        </Col>
        <Col span="12" offset="1">
          <Row>筛选器<FilterOption :filters="filters"></FilterOption></Row>
          <Row><component v-show='paramShow'  class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component></Row>   
          <Row><component v-show='chartPreview' ref='chartContainer' :is="chartContainer" chartId='CR' :option='eoption' :styles='styles'></component></Row>  
        </Col>
    </Row>
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import {mapGetters} from 'vuex'
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
import ChartTemplate from './../../libs/ChartTemplate.js'
import chartUtil from './../../libs/chartUtil.js'
import Chart from './../chartcomponents/Chart'
import CountCard from './../chartcomponents/CountCard'
import BarOption from './../chartcomponents/BarOption'
import PieOption from './../chartcomponents/PieOption'
import LineOption from './../chartcomponents/LineOption'
import HBarOption from './../chartcomponents/HBarOption'
import CardOption from './../chartcomponents/CardOption'
import RingOption from './../chartcomponents/RingOption'
import StackOption from './../chartcomponents/StackOption'
import ChinaMapOption from './../chartcomponents/ChinaOption'
import FieldList from './../chartcomponents/FieldList'
import FilterOption from './../chartcomponents/Filter'

export default {
  name: 'createChart',
  components:{
    datepicker,
    list,
    BarOption,
    PieOption,
    LineOption,
    HBarOption,
    CardOption,
    Chart,
    CountCard,
    RingOption,
    StackOption,
    ChinaMapOption,
    FieldList,
    FilterOption
  },
  data () {
    return {
      isNew:true,
      isInit:true,
      paramComponent:[],
      paramSelected:null,
      paramShow:false,
      chartPreview:false,
      colNames:[],
      filters:[{name:'',defineJSON:''}],
      queryData:null,
      eoption:null,
      chartType:ChartTemplate.TYPE,
      myChart:{
        name:'',
        alias:'',
        type:'Bar',
        bizViewId:'',
        desc:'',
        defineJSON:'',
      },
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        type: [
            { required: true, message: 'Please select the type', trigger: 'change' }
        ],
        bizViewId: [
            { required: true, message: 'Please select the bizView', trigger: 'change' }
        ],
      },
      
    }
  },
   computed: {
    ...mapGetters({
      queryList:'queryList',
    }),
      chartComponent:function(){
        if (this.myChart.type == 'Bar'){
          return BarOption
        } else if (this.myChart.type == 'Pie'){
          return PieOption
        } else if (this.myChart.type == 'Line'){
          return LineOption
        } else if (this.myChart.type == 'HBar'){
          return HBarOption
        } else if (this.myChart.type == 'Card'){
          return CardOption
        } else if (this.myChart.type == 'Ring'){
          return RingOption
        } else if (this.myChart.type == 'Stack'){
          return StackOption
        } else if (this.myChart.type == 'ChinaMap'){
          return ChinaMapOption
        }
      },
      chartContainer: function(){
        if(this.myChart.type == 'Card'){
          return CountCard
        } else {
          return Chart
        }
      },
    styles: function(){
      if(this.myChart.type == 'Card'){
          return {}
        } else {
          return {height:400+'px'}
        }
    }
  },
  　watch:{
　　　'myChart.bizViewId': 'getQueryData',
　},
  methods:{
     initChartData:function(to,from){
      let Vue = this;
      Vue.isInit = true;
      Vue.isNew =  $.isEmptyObject(to.params);
      if(Vue.isNew){  //新建图表
        Vue.paramShow = false;
        Vue.chartPreview = false;
        Vue.handleReset();
      } else {  //编辑图表图表
        Vue.paramShow = true;
        Vue.chartPreview = true;
        Vue.myChart = to.params;
        Vue.$nextTick(function(){
        Vue.$refs['optionSelected'].setData(to.params.defineJSON)
        Vue.getQueryData();
       }) 
      }
      
    },
    getQueryList:function(){
        let Vue = this;
        Vue.AxiosPost("getQuery",'',
          function(response){
            Vue.$store.dispatch('getQueryBox',response);
          }
        ); 
      },
    getQueryData:function(){
        let Vue = this;
        if (Vue.myChart.bizViewId != ''){
            Vue.AxiosPost("previewBizView",{'bizViewId':Vue.myChart.bizViewId},
              function(response){
                Vue.queryData = response.data.gridData;
                Vue.colNames = Vue.queryData.stringHeaders;
                Vue.initParameters(response);
                 if(!Vue.isNew && Vue.isInit){ //编辑状态并且初始化状态需要在获取数据后初始化图表
                  Vue.previewChart();
                  Vue.isInit = false;
                }
              }
          ); 
        }
        
      },
    initParameters(response){
      let Vue = this;
      Vue.paramComponent = [];
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
    },
    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateBizView",{"bizViewId":Vue.myChart.bizViewId,"JSONParam":JSONParam},
          function(response){
           Vue.queryData = response.data.gridData;
           if(Vue.chartPreview){
             Vue.previewChart();
           }   
        });         
      }     
    }, 
    setOption(selectdOption){
      let Vue = this;
      Vue.myChart.defineJSON = JSON.stringify(selectdOption);
      Vue.eoption = $.extend(true, {}, selectdOption);
    },
    analyzeOption:function(){  
      let Vue = this;
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
    },
    previewChart:function(){
        let Vue = this;
        Vue.chartPreview = true;
        Vue.paramShow = true;
        Vue.$refs['optionSelected'].sentOption();
        Vue.analyzeOption();
        Vue.$nextTick(function(){
         Vue.$refs['chartContainer'].show(Vue.eoption);
       })
    },
    saveChart:function(){
      let Vue = this;
      Vue.$refs['optionSelected'].sentOption();
      Vue.$refs["myChart"].validate((valid) => {
                    if (valid) {
                         Vue.AxiosPost("createChart",
                          Vue.myChart,
                           function(){
                              Vue.$Message.success('Success!');
                              Vue.closePage('createChart');
                           });
                    } else {
                        Vue.$Message.error('Fail!');
                    }
                })
    },
    handleReset:function(){
      let Vue = this;
      Vue.myChart.name = '';
      Vue.myChart.alias = '';
      Vue.myChart.bizViewId = '';
      Vue.myChart.desc =  '';
      Vue.myChart.type = 'Bar',
      Vue.myChart.defineJSON = '';
      Vue.chartPreview = false;
      Vue.eoption = null;
      Vue.$refs['optionSelected'].reset();
      Vue.$refs['chartContainer'].reset();
    },
    closePage(name){
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[1];
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);    
      this.linkTo(lastPageObj);          
    },
    linkTo (item) {
      let routerObj = {};
      routerObj.name = item.name;
      if (item.argu) {
          routerObj.params = item.argu;
      }
      if (item.query) {
          routerObj.query = item.query;
      }
      this.$router.push(routerObj);
    },
  },
  mounted(){
    let Vue = this;
     Vue.$nextTick(function(){
         Vue.initChartData(Vue.$route/*,{fullPath:'/*'}*/);
    })
    
  }
}
</script>

<style scoped>
#myChart{
  height: 350px;
}
#myCard{
  width: 300px;
  height: 350px;
  margin: auto;
}
.tag{
  width: 60px;
  height: 20px;
  border:1px solid black;
  display: inline-block;
}
.ivu-radio-group-button .ivu-radio-wrapper{
  padding: 0 10px;
  height:28px !important;
}
.paramcomponent{
   display: inline-block;
   margin: 0px 3px;
  }
</style>
