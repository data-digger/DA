<template>
    <Row style="padding:20px">
      <Carousel v-model="value" :dots="carouselSetting.dots" :arrow="carouselSetting.arrow" ref='slide'>
      <CarouselItem>
        <Col span="6">
             <FieldList ref='fieldList' :columns="columns" @getFilter = 'setFilter'></FieldList>
          </Col>
          <Col span="7">
              <Form id="chartOption" ref="chartOption" :model="myChart" :rules="ruleValidate" :label-width="80">
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
                    <component ref='optionSelected' :is="chartComponent" @getSelectedOption = 'setOption'></component>
                </FormItem>
                <FormItem>
                    <Button type="ghost" shape="circle" icon="ios-search"  @click="previewChart"></Button>
                    <Button type="ghost" style="margin-left: 8px" @click="handleReset">重置</Button>
                </FormItem> 
            </Form>
          </Col>
          <Col span="11">  
            <Row><component v-show='chartPreview' ref='chartContainer' :is="chartContainer" chartId='CR' :option='eoption' :styles='styles'></component></Row>  
          </Col>
        </CarouselItem>
        <CarouselItem>
          <Row  style="padding:20px 20px">
              <Col span="24">
                <Form id="chartInfo" ref="chartInfo" :model="myChart" :rules="ruleValidate" :label-width="80">
                     <FormItem label="名称" prop="name">
                        <Input v-model="myChart.name" placeholder="输入名称" :disabled="!isNew"></Input>
                    </FormItem>
                    <FormItem label="别名" prop="alias">
                      <Input v-model="myChart.alias" placeholder="输入别名"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="desc">
                      <Input v-model="myChart.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter chart descript..."></Input>
                    </FormItem>
                </Form>
              </Col>
            </Row>
      </CarouselItem>
      </Carousel>
      <Row  class='cd_button_box'>
        <Button type="primary"  class='cd_button_pre' @click='pre()'>上一步</Button>
        <Button v-if="!finished" type="primary" class='cd_button_next' @click='next()'>下一步</Button>
        <Button v-if="finished" type="primary" class='cd_button_save' @click="saveChart">保存</Button>
      </Row> 
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
  },
  data () {
    return {
      isNew:true,
      isInit:true,
      //paramComponent:[],
      //paramSelected:null,
      //paramShow:false,
      chartPreview:false,
      columns:[],
      value:0,
      carouselSetting:{
        height:"200",
        dots:"none",
        arrow:"never",
      },
      finished:false,
      filters:{},
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
     'myChart.bizViewId': 'getFieldList',
　},
  methods:{
     pre:function(){
        let Vue = this;
        if(Vue.value !=0){
          Vue.$refs.slide.arrowEvent(-1);
          Vue.finished = false;
        }
     },
     next() {
      let Vue = this;
      if(Vue.value <2){
        Vue.$refs.slide.arrowEvent(1);
        if(Vue.value == 1){
          Vue.finished = true;
        }
      }
    },
     initChartData:function(to,from){
      let Vue = this;
      Vue.isInit = true;
      Vue.isNew =  $.isEmptyObject(to.params);
      if(Vue.isNew){  //新建图表
        Vue.chartPreview = false;
        Vue.handleReset();
      } else {  //编辑图表图表
        Vue.chartPreview = false;
        Vue.myChart = to.params.chartbox;
        let define = JSON.parse(Vue.myChart.defineJSON);
        Vue.eoption = define.option;
        Vue.filters = define.filters;
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
    getFieldList:function(){
      let Vue = this;
      Vue.chartPreview = false;
      if (Vue.myChart.bizViewId != ''){
            Vue.AxiosPost("getFieldTable",{'bizviewId':Vue.myChart.bizViewId},
              function(response){
                if(response.data.success){
                  Vue.columns = response.data.content;
                  if(Vue.isInit && !Vue.isNew){
                    Vue.$nextTick(function(){
                        Vue.$refs['optionSelected'].setData(Vue.eoption,Vue.filters);
                        Vue.$refs['fieldList'].setData(Vue.filters);
                        Vue.initChart();
                        Vue.isInit = false;
                    }) 
                  }
                }  
            })
        }
    },
    setOption(selectdOption){
      let Vue = this;
      Vue.eoption = $.extend(true, {}, selectdOption.option);
      Vue.filters.value = selectdOption.filter.value;
      Vue.filters.groupby = selectdOption.filter.groupby;
      Vue.filters.isgroupby = selectdOption.filter.isgroupby;
    },
    setFilter(filter){
      let Vue = this;
      Vue.filters = filter;
    },
    analyzeOption:function(){  
      let Vue = this;
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
    },
    previewChart:function(){
        let Vue = this;
        Vue.chartPreview = true;
        Vue.$refs['fieldList'].sentFilter();
        Vue.$refs['optionSelected'].sentOption();
        Vue.AxiosPost("chartPreview",{bizViewId:Vue.myChart.bizViewId,filterJSON:JSON.stringify(Vue.filters)},
                           function(response){
                              Vue.queryData = response.data.content;
                              Vue.drawChart();
                           });
    },
    initChart(){ 
      let Vue = this;
      Vue.chartPreview = true;
       Vue.AxiosPost("getChartData",{'chartId':Vue.myChart.id},
        function(response){
           Vue.queryData = response.data.content.data;
           Vue.drawChart();

      });
    },
    drawChart(){
      let Vue = this;
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
      Vue.$nextTick(function(){
         Vue.$refs['chartContainer'].show(Vue.eoption);
       })
    },
    saveChart:function(){
      let Vue = this;
      Vue.$refs['fieldList'].sentFilter();
      Vue.$refs['optionSelected'].sentOption();
      let chartOption = {filters:Vue.filters,option:Vue.eoption};
      Vue.myChart.defineJSON = JSON.stringify(chartOption);
      Vue.$refs["chartInfo"].validate((valid) => {
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
      Vue.myChart.defineJSON = '';
      Vue.chartPreview = false;
      Vue.eoption = null;
      Vue.$refs['optionSelected'].reset();
      Vue.$refs['chartContainer'].reset();
      Vue.$refs['fieldList'].reset();
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
.cd_button_box{
  position: fixed; 
  left: 38%;
  bottom: 3%

}
.cd_button_box button{
  background-color: #008aff;
  width: 150px;
}
.cd_button_box button:hover{
  border:0;
}
.cd_button_pre{
  margin-right: 15px;
}
.ivu-carousel-item{
  min-height: 550px
}
</style>
