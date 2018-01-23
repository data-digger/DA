<template>
  <div id='chart'>
       <div class="row chartedit">
        <div class="col-md-12">
          <div class="portlet box crusta">
            <div class="portlet-title">
              <div class="caption">
                <i class="fa fa-gift"></i>新建图表
              </div>
            </div>
            <div class="portlet-body form">
              <form action="#" id="form-username" class="form-horizontal form-bordered">
                 <div class="form-group col-md-12">
                  <label class="col-sm-2 control-label">查询器:</label>
                  <div class="col-sm-9">
                     <select class="form-control" v-model="myChart.bizViewId" @change="getQueryData"> 
                        <option v-for = 'q in queryList' :key='q.id' :name='q.name' :value="q.id" >{{q.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label class="col-sm-2 control-label">图表名称:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                      </span>
                      <input type="text" class="form-control" v-model="myChart.name"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label class="col-sm-2 control-label">图表别名:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                      </span>
                      <input type="text" class="form-control" v-model="myChart.alias"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label class="col-sm-2 control-label">图表描述:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                      </span>
                      <input type="text" class="form-control" v-model="myChart.desc"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label">Echarts-Option:</label>
                    <div class="col-md-9">
                      <textarea id='chartOption'></textarea>
                    </div>
                </div>
                <div class="form-actions">
                  <div class="row">
                    <div class="col-md-offset-2 col-md-8">  
                      <button type="button" class="btn btn-green" @click="drawChart">预览</button>
                      <button type="button" class="btn" @click="saveChart">保存</button>
                      <button type="button" class="btn">返回</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>         
        </div>
      </div>
       <div class="row chartArea">
            <div id="myChart"></div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/javascript/javascript.js"
import {mapGetters} from 'vuex'
export default {
  name: 'Chart',
   data () {
    return {
      queryData:null,
      chartView:null,
      eoption:null,
      chartView:null,
      myChart:{
        name:'myChart',
        alias:'myChartAlias',
        bizViewId:'',
        desc:'this is my desc',
        defineJSON:''
      }     
    }
  },
   computed: {
    ...mapGetters({
      queryList:'queryList',
    })
  },
  mounted:function(){
    this.initOptionEdit();
   // this.getQueryList();
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
    drawChart:function(eOption){
        let Vue = this;
        Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
        this.eoption = JSON5.parse(Vue.myChart.defineJSON);
        if(this.chartView != null){
          this.chartView.dispose();
        }
      // 基于准备好的dom，初始化echarts实例
        this.chartView = echarts.init(document.getElementById('myChart'))
        
        // 绘制图表
         this.chartView.setOption(this.eoption);
    },
    saveChart:function(){
      let Vue = this;
      Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
      Vue.AxiosPost("createChart",Vue.myChart,
          function(){
            alert("created succeed!")
      });
    }
  }
}
</script>

<style scoped>
#chart{
  width: 87%;
  height: 100%;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
}
#myChart{
  height: 350px;
}
#chartOption{
  text-align: left;
}
.chartedit{
  margin:9px !important;
}
#notific8_show{
  color: white;
  background-color: #d4abab;
}
.portlet.box > .portlet-title {
    border-bottom: 0;
    padding: 0 10px;
    margin-bottom: 0;
    color: #fff;
    background-color:#d4abab;
    min-height: 41px;
    text-align: left;
    line-height: 41px;
}
.portlet > .portlet-body.crusta, .portlet.crusta {
    background-color: #fff;
    border: 1px solid #d4abab;
    border-top: 0;
}
.portlet.box {
    padding: 0px !important;
}
.portlet.box > .portlet-body {
    background-color: #fff;
    padding: 30px 10px;
}
.btn-green{
  background-color: #d4abab;
}
.chartArea{
  position: relative;
  padding : 0 38px;
}

</style>
