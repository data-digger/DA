<template>
    <Row style="padding:20px">
        <Col span="7">
            <Form id="createChart" ref="myChart" :model="myChart" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="myChart.name" placeholder="输入名称"></Input>
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
                <Select class="form-control" v-model='myChart.type'>               
                      <Option v-for = 't in type' :key='t' :value="t" >{{t}}</Option>
                </Select>
              </FormItem>
              <FormItem label="图表选项" prop="defineJSON">
                  <component ref='optionSelected' :is="chartComponent" :data="colNames" @getSelectedOption = 'analyzeOption'></component>
              </FormItem>
              <FormItem>
                  <Button type="ghost" shape="circle" icon="ios-search"  @click="previewChart"></Button>
                  <Button type="primary" @click="saveChart">Save</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="handleReset">Reset</Button>
              </FormItem> 
          </Form>
        </Col>
        <Col span="14" offset="1">   
          <component ref='chartContainer' :is="chartContainer" chartId='CR' :option='eoption'></component>    
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

export default {
  name: 'createChart',
  components:{
    BarOption,
    PieOption,
    Chart,
    CountCard
  },
  data () {
    return {
      chartPreview:false,
      colNames:[],
      queryData:null,
      eoption:null,
      type:ChartTemplate.TYPE,
      myChart:{
        name:'',
        alias:'myChartAlias',
        type:'Bar',
        bizViewId:'',
        desc:'this is my desc',
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
        }
      },
      chartContainer: function(){
        if(this.myChart.type == 'Card'){
          return CountCard
        } else {
          return Chart
        }
      }
  },
  　watch:{
　　　'myChart.bizViewId': 'getQueryData',
　},
  methods:{
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
            }
        ); 
       }
      
    },
    analyzeOption:function(selectdOption){
      let Vue = this;
      Vue.myChart.defineJSON = JSON.stringify(selectdOption);
      Vue.eoption = $.extend(true, {}, selectdOption);
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
    },
    previewChart:function(){
        let Vue = this;
        Vue.$refs['optionSelected'].sentOption();
        Vue.$nextTick(function(){
         Vue.$refs['chartContainer'].show();
       })
    },
    drawCard(){
      let Vue = this;      
       chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
       Vue.eoption.name = "cardName";
       Vue.chartPreview=true;
    },
    drawEChart(){
      let Vue = this;
        //根据类型和字段解析option
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
      if(Vue.chartView != null){
            Vue.chartView.dispose();             
       }
      // 基于准备好的dom，初始化echarts实例
      Vue.chartView = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      Vue.chartView.setOption(this.eoption);  
    },
    saveChart:function(){
      let Vue = this;
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
      Vue.colNameShow = false;
      Vue.myChart.name = '';
      Vue.myChart.alias = 'myChartAlias';
      Vue.myChart.bizViewId = '';
      Vue.myChart.desc =  'this is my desc';
      $('#chartOption').empty();
		  $('#chartOption').text('');
      Vue.chartPreview = false;
      Vue.eoption = null;
    },
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
</style>
