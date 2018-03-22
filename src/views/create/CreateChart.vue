<template>
    <Row style="padding:20px">
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
                  <Button type="primary" @click="saveChart">Save</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="handleReset">Reset</Button>
              </FormItem> 
          </Form>
        </Col>
        <Col span="14" offset="1">   
          <component ref='chartContainer' :is="chartContainer" chartId='CR' :option='eoption' :styles='styles'></component>    
        </Col>
    </Row>
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import {mapGetters} from 'vuex'
import ChartTemplate from './../../libs/ChartTemplate.js'
import chartUtil from './../../libs/chartUtil.js'
import Chart from './../chartcomponents/Chart'
import CountCard from './../chartcomponents/CountCard'
import BarOption from './../chartcomponents/BarOption'
import PieOption from './../chartcomponents/PieOption'
import LineOption from './../chartcomponents/LineOption'
import HBarOption from './../chartcomponents/HBarOption'
import CardOption from './../chartcomponents/CardOption'

export default {
  name: 'createChart',
  components:{
    BarOption,
    PieOption,
    LineOption,
    HBarOption,
    CardOption,
    Chart,
    CountCard,
  },
  data () {
    return {
      isNew:true,
      isInit:true,
      chartPreview:false,
      colNames:[],
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
      '$route' (to, from) {
          let Vue = this;
          Vue.initChartData(to,from);
      },
　　　'myChart.bizViewId': 'getQueryData',
　},
  methods:{
     initChartData:function(to,from){
      let regex = /^\/createChart/;
      if(regex.test(from.fullPath)){
        return;
      }
      if(!regex.test(to.fullPath)){
        return;
      }
      let Vue = this;
      Vue.isInit = true;
      Vue.isNew =  $.isEmptyObject(to.params);
      if(Vue.isNew){
        Vue.handleReset();
      } else {
        Vue.myChart = to.params;
        Vue.$nextTick(function(){
        Vue.$refs['optionSelected'].setData(to.params.defineJSON)
         //Vue.getQueryData();
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
                 if(!Vue.isNew && Vue.isInit){ //编辑状态并且初始化状态需要在获取数据后初始化图表
                  Vue.previewChart();
                  Vue.isInit = false;
                }
              }
          ); 
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
  },
  mounted(){
    let Vue = this;
     Vue.$nextTick(function(){
         Vue.initChartData(Vue.$route,{fullPath:'/*'});
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
.CodeMirror-lines{
  text-align: left;
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
</style>
