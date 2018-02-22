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
                <Option v-for = 't in type' :key='t' :value="t" >{{t}}</option>
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
            <Tag type="border" color="blue" v-for= 'col in queryData.stringHeaders' :key="col">{{col}}</Tag>
        </FormItem>
        <FormItem v-show="optionShow" label="Option:" prop="defineJSON">
            <textarea id='chartOption'></textarea>
        </FormItem>
        <FormItem>
            <Button type="ghost" shape="circle" icon="ios-search" :disabled='!colNameShow'  @click="previewChart"></Button>
            <Button type="primary" :disabled='!chartPreview' @click="saveChart">Save</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset">Reset</Button>
        </FormItem> 
        <FormItem>
          <div id="myChart" v-show="chartPreview && myChart.type != 'Table'"></div>
          <table id='myTable' v-show="chartPreview && myChart.type == 'Table'" width="100%"></table>
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
export default {
  name: 'createChart',
   data () {
    return {
      chartPreview:false,
      colNameShow:false,
      queryData:null,
      chartView:null,
      tableView:null,
      eoption:null,
      type:ChartTemplate.TYPE,
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
      }    
    }
  },
   computed: {
    ...mapGetters({
      queryList:'queryList',
    }),
    optionShow:function(){
      if(this.myChart.type == 'Table'){
        return false
      }else{
        return true
      }
    },
  },
  　watch:{
　　　'myChart.bizViewId': 'getQueryData',
     'myChart.type':function(curType){
       if (curType != 'Table'){
         /*this.optionEditor.getDoc().setValue(JSON.stringify(ChartTemplate[curType])
                                            .replace(/},/g, "},\n").replace(/],/g, "],\n"));*/
        this.optionEditor.getDoc().setValue(ChartTemplate[curType]);
        $('#chartOption').val(ChartTemplate[curType]);
       }
       
     }
　},
  mounted:function(){
    let Vue = this;
     Vue.initOptionEdit();
     window.addEventListener('resize', function () {
                if(Vue.myChart.type != 'Table' && Vue.chartView != null){
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
    /*this.optionEditor.getDoc().setValue(JSON.stringify(ChartTemplate.Line)
                                         .replace(/},/g, "},\n").replace(/],/g, "],\n"))*/
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
        Vue.chartPreview=true;
        this.$nextTick(function(){
          if(Vue.myChart.type == 'Table'){
            Vue.drawTable();
          } else {
            Vue.drawEChart();
          }
        })    
    },
    drawTable(){
      let Vue = this;
      if(Vue.chartView != null){
            Vue.chartView.dispose();
            Vue.chartView = null;
       } 
       if(Vue.tableView != null){
         Vue.tableView.destroy();
         $('#myTable').empty();
       }
      var header = Vue.queryData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c]
         })
      };
      var rows = [];
      var rowData = Vue.queryData.data;
       for(let i in rowData){
          let row = [];
          for (let j in rowData[i]){
              row.push(rowData[i][j].displayValue);
          }
          rows.push(row);
      };
          Vue.tableView = $('#myTable').DataTable({
          "destroy": true,
          pageLength: 3,
          searching:false,
          lengthChange:false,
          bInfo:false,
          bSort:false,
          columns: cols,
          data:rows
      });
     
    },
    drawEChart(){
      let Vue = this;
       Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
       Vue.eoption = eval("(" + Vue.myChart.defineJSON + ")");
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
      //Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
      if(Vue.myChart.type == 'Table'){
        Vue.myChart.defineJSON = null;
      } else{
        Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
      }
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
