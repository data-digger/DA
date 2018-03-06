<template>
  <Form id="createChart" ref="myChart" :model="myChart" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="myChart.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="myChart.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
           <Select class="form-control" v-model='myChart.type'>               
                <Option v-for = 't in type' :key='t' :value="t" >{{t}}</Option>
           </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="myChart.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter chart descript..."></Input>
        </FormItem>
        <FormItem label="查询器" prop="bizViewId">
            <Select class="form-control" v-model='myChart.bizViewId'>               
                <Option v-for = 'q in queryList' :key='q.id' :name='q.name' :value="q.id" >{{q.name}}</option>
            </Select>
        </FormItem>
         <FormItem v-if="colNameShow" label="" prop="colNames">
            <Tag  type="border" color="blue" v-for= 'col in queryData.stringHeaders' :key="col">{{col}}</Tag>
            <!-- <div style='width:100%;height:30px;border:1px solid blue'@drop='drop($event)' @dragover='allowDrop($event)'>s</div> -->
        </FormItem>
        <FormItem label="Option:" prop="defineJSON">
            <textarea id='chartOption'></textarea>
        </FormItem>
        <FormItem>
            <Button type="ghost" shape="circle" icon="ios-search" :disabled='!colNameShow'  @click="previewChart"></Button>
            <Button type="primary" :disabled='!chartPreview' @click="saveChart">Save</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset">Reset</Button>
        </FormItem> 
        <FormItem>
          <div id="myChart" v-if="chartPreview && myChart.type != 'Card'"></div>
          <div id="myCard" v-if="chartPreview && myChart.type == 'Card'">  
            <infoCard               
                :id-name="eoption.name"
                :end-val="eoption.data"
                :iconType="eoption.iconType"
                :icon-size="eoption.iconSize"
                :color="eoption.color"
                :count-size="eoption.countSize"
                :count-weight="eoption.countWeight"
                :intro-text="eoption.introText"
                :intro-color='eoption.introColor'
                :intro-size='eoption.introSize'
                :intro-weight='eoption.introWeight'                         
            ></infoCard>
          </div>
        </FormItem>
    </Form>  
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/javascript/javascript.js"
import {mapGetters} from 'vuex'
import ChartTemplate from './../../libs/ChartTemplate.js'
import chartUtil from './../../libs/chartUtil.js'
import infoCard from './../home/components/inforCard'

export default {
  name: 'createChart',
  components:{
    infoCard
  },
  data () {
    return {
      chartPreview:false,
      colNameShow:false,
      queryData:null,
      chartView:null,
      tableView:null,
      type:ChartTemplate.TYPE,
      eoption:null,
      dom:null,
      myChart:{
        name:'',
        alias:'myChartAlias',
        type:'Line',
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
  },
  　watch:{
　　　'myChart.bizViewId': 'getQueryData',
     'myChart.type':function(curType){
         /*this.optionEditor.getDoc().setValue(JSON.stringify(ChartTemplate[curType])
                                            .replace(/},/g, "},\n").replace(/],/g, "],\n"));*/
        this.chartPreview = false;
        this.optionEditor.getDoc().setValue(ChartTemplate[curType]);
        //this.eoption = eval("(" + ChartTemplate[curType] + ")");
        //$('#chartOption').val(ChartTemplate[curType]);
     }
　},
  mounted:function(){
    let Vue = this;
     Vue.initOptionEdit();
     window.addEventListener('resize', function () {
                if(Vue.chartView != null){
                  Vue.chartView.resize();
                }
            });
    //this.getQueryList();
  },
  methods:{
   initOptionEdit: function(){
      /*初始化option编辑器*/
    var myTextarea = $("#chartOption")[0];
    this.optionEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true, 
        mode: "text/javascript", 
        content: myTextarea.value,
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
    });
    this.optionEditor.getDoc().setValue(ChartTemplate.Line)
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
              Vue.queryData = response.data;
              Vue.colNameShow = true;
            }
        ); 
       }
      
    },
    previewChart:function(){
        let Vue = this;
        Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
        Vue.eoption = eval("(" + Vue.myChart.defineJSON + ")");
        if(Vue.myChart.type == 'Card'){
          Vue.drawCard();
        }else{
           Vue.chartPreview=true;
           this.$nextTick(function(){
           Vue.drawEChart();
        })    
        }
       
    },
    drawCard(){
      let Vue = this;      
       chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
       Vue.eoption.name = "cardName";
       Vue.chartPreview=true;
    },
    drawEChart(){
      let Vue = this;
       //Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
       //Vue.eoption = eval("(" + Vue.myChart.defineJSON + ")");
       if(Vue.chartView != null){
            Vue.chartView.dispose();
       }
       //根据类型和字段解析option
      chartUtil.analysis(Vue.eoption,Vue.myChart.type,Vue.queryData);
      // 基于准备好的dom，初始化echarts实例
      Vue.chartView = echarts.init(document.getElementById('myChart')); 
      // 绘制图表
      Vue.chartView.setOption(this.eoption);   
    },
    saveChart:function(){
      let Vue = this;
      Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
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
      //Vue.optionEditor.getDoc().setValue(JSON.stringify(ChartTemplate.Line).replace(/},/g, "},\n").replace(/],/g, "],\n"));
      Vue.optionEditor.getDoc().setValue(ChartTemplate.Line)
      Vue.chartPreview = false;
      Vue.eoption = null;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event){
      let Vue = this;
      Vue.dom = event.currentTarget;
    },
    drop(event) {
      let Vue = this;
      event.preventDefault();
      event.target.appendChild(Vue.dom);
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
