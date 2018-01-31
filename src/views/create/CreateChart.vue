<template>
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
        <FormItem label="Option:" prop="defineJSON">
            <textarea id='chartOption' v-model='myChart.defineJSON'></textarea>
        </FormItem>
        <FormItem>
            <Button type="ghost" shape="circle" icon="ios-search" @click="drawChart"></Button>
            <Button type="primary" @click="saveChart">Save</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset">Reset</Button>
        </FormItem> 
        <FormItem>
          <div id="myChart" v-show="chartPreview"></div>
        </FormItem>
    </Form>  
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/javascript/javascript.js"
import {mapGetters} from 'vuex'
export default {
  name: 'createChart',
   data () {
    return {
      chartPreview:false,
      queryData:null,
      chartView:null,
      eoption:null,
      myChart:{
        name:'',
        alias:'myChartAlias',
        bizViewId:'',
        desc:'this is my desc',
        defineJSON:''
      },
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        bizViewId: [
            { required: true, message: 'Please select the bizView', trigger: 'change' }
        ],
        defineJSON: [
            { required: true, message: 'echartsOption define cannot be empty', trigger: 'blur' }
        ]
      }    
    }
  },
   computed: {
    ...mapGetters({
      queryList:'queryList',
    })
  },
  mounted:function(){
    let Vue = this;
     Vue.initOptionEdit();
     window.addEventListener('resize', function () {
                if(Vue.chartView == null){
                  return false;
                }
                Vue.chartView.resize();
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
        Vue.AxiosPost("previewBizView",{'bizViewId':Vue.myChart.bizViewId},
        function(response){
          Vue.queryData = response.data;
        }
      ); 
    },
    drawChart:function(){
        let Vue = this;
        Vue.chartPreview=true;
        //Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
        //this.eoption = JSON5.parse(Vue.myChart.defineJSON);
        this.$nextTick(function(){
          Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
          Vue.eoption = eval("(" + Vue.myChart.defineJSON + ")");
          if(Vue.chartView != null){
            Vue.chartView.dispose();
          }
        // 基于准备好的dom，初始化echarts实例
          Vue.chartView = echarts.init(document.getElementById('myChart'))
        
        // 绘制图表
          Vue.chartView.setOption(this.eoption);
        })    
    },
    saveChart:function(){
      let Vue = this;
      //Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
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
      Vue.myChart.name = '';
      Vue.myChart.alias = 'myChartAlias';
      Vue.myChart.bizViewId = '';
      Vue.myChart.desc =  'this is my desc';
      $('#chartOption').empty();
		  $('#chartOption').text('');
		  Vue.optionEditor.doc.setValue('');
      Vue.optionEditor.refresh();
      Vue.chartPreview = false;
      Vue.eoption = null;
    }
  }
}
</script>

<style scoped>
#myChart{
  height: 350px;
}
.CodeMirror-lines{
  text-align: left;
}
</style>
