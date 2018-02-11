<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card  @click='link(subpath)' style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{chartbox.name}}</p>
        <p> {{chartbox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>        
    </Card>
    <Modal
      v-model="modaledit"
      title="编辑图表"
      @on-ok="editOk"
      @on-cancel="cancel">
      <ChartForm ref="chartedit" :myChart='chartbox'></ChartForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      title="图表预览"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Condition :showOptions='showOptions'></Condition>
      <div v-if="chartbox.type != 'Table'" class="previewChart" :id="'previewChart'+chartbox.id"></div>
      <table :id="'previewTable'+index" v-if="chartbox.type == 'Table'"></table>
    </Modal>
  </Col>
</template>

<script>
import echarts from 'echarts'
import ChartForm from './../components/ChartForm'
import Condition from './../components/Condition'
import chartUtil from './../../libs/chartUtil.js'
export default {
  name: 'ChartBox',
  components:{
    ChartForm,
    Condition
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false,
      tableView:null,
      chartView:null,
      showOptions:{date:true}
    }
  },
  props:['chartbox','index'],
  methods:{
    preview (){ 
      let Vue = this;
       Vue.AxiosPost("previewBizView",{'bizViewId':Vue.chartbox.bizViewId},
        function(response){
          Vue.queryData = response.data;
          Vue.modalpreview = true;
          Vue.$nextTick(function(){
            Vue.previewChart();
        })
      });
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
    previewChart(){
      let Vue = this;
      if (Vue.chartbox.type == 'Table'){
        Vue.drawTable();
      } else {
        Vue.drawEChart();
      }
    },
     drawTable(){
      let Vue = this;
      if(Vue.tableView != null){
         Vue.tableView.destroy();
         $('#previewTable'+Vue.index).empty(); 
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
          Vue.tableView= $('#previewTable'+Vue.index).DataTable({
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
      if(Vue.chartView != null){
            Vue.chartView.dispose();
            Vue.chartView = null;
       } 
      let eoption = eval("(" + Vue.chartbox.defineJSON + ")");
         //解析Option
          chartUtil.analysis(eoption,Vue.chartbox.type,Vue.queryData);
          // 基于准备好的dom，初始化echarts实例
          let chartView = echarts.init(document.getElementById('previewChart'+Vue.chartbox.id));
          // 绘制图表
          chartView.setOption(eoption); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewChart{
    height: 250px;
  }
</style>
