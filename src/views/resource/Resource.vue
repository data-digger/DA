<template>
  <div id='resource'>
    <div class="row datasource">
       <div class="note note-datasource">
          <h4 class="block">数据源</h4>
          <p>
             Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
          </p> 
       </div>
       <div class="row box">
          <DatasourceBox v-for="ds in datasourceList" :key='ds.id' :datasource = 'ds'></DatasourceBox>
          <Creator :routerpath="createdatasource"></Creator>
       </div>
    </div>
    <div class="row query">
     <div class="note note-query">
        <h4 class="block">查询器</h4>
        <p>
           Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
        </p>
     </div>
     <div class="row box">
        <QueryBox  v-for="(q,index) in queryList" :key='q.id':querybox='q' :index='index'></QueryBox>
        <Creator :routerpath='createquery'></Creator>
     </div>
    </div> 
    <div class="row chart">
       <div class="note note-chart">
          <h4 class="block">图表</h4>
          <p>
             Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
          </p>
       </div>
       <div class="row box">
          <ChartBox v-for="(chart,index) in chartList" :key='chart.id' :chartbox='chart' :index='index'></ChartBox>
          <Creator :routerpath='createchart'></Creator>
       </div>
    </div>
    <div class="row table">
       <div class="note note-table">
          <h4 class="block">表格</h4>
          <p>
             Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
          </p>
       </div>
       <div class="row box">
          <TableBox v-for="(tb,index) in tableList" :key='tb.id' :tablebox='tb' :index='index'></TableBox>
          <!-- v-for="(rp,index) in tableList" :key='tb.id' :tablebox='tb' :index='index' -->
          <Creator :routerpath='createtable' ></Creator>
       </div>
    </div>    
    <div class="row report">
       <div class="note note-report">
          <h4 class="block">报表</h4>
          <p>
             Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
          </p>
       </div>
       <div class="row box">
          <ReportBox v-for="(rp,index) in reportList" :key='rp.id' :reportbox='rp' :index='index'></ReportBox>
          <Creator :routerpath='createreport'></Creator>
       </div>
    </div>
</div>
</template>

<script>
import DatasourceBox from './../components/DatasourceBox'
import Creator from './../components/Creator'
import ReportBox from './../components/ReportBox'
import ChartBox from './../components/ChartBox'
import QueryBox from './../components/QueryBox'
import TableBox from './../components/TableBox'
import {mapGetters} from 'vuex'
export default {
  name: 'Resource',
  data(){
    return {
      createdatasource:'/createDatasource',
      createchart:'/createChart',
      createquery:'/createquery',
      createreport:'/createreport',
      createtable:'/createtable',
    }
  },
  components:{
    DatasourceBox,
    Creator,
    ReportBox,
    QueryBox,
    ChartBox,
    TableBox
  },
  computed: {
    ...mapGetters({
      datasourceList: 'datasourceList',
      reportList:'reportList',
      chartList:'chartList',
      queryList:'queryList',
      tableList:'tableList',
    })
  },
  methods:{
    getDatasourceBox(){
      let Vue = this;
      Vue.AxiosPost("getDatasourceList",'',
        function(response){
          console.log($(".block").html());
          Vue.$store.dispatch('getDatasourceBox',response);
        }
      );   
    },
    getQueryBox (){
      let Vue = this;
      Vue.AxiosPost("getQueryList",'',
        function(response){
          Vue.$store.dispatch('getQueryBox',response);
        }
      );
    },
    getReportBox (){
      let Vue = this;
      Vue.AxiosPost("getReportList",'',
        function(response){
          Vue.$store.dispatch('getReportBox',response);
        }
      );
    },   
    getChartBox (){
      let Vue = this;
      Vue.AxiosPost("getChartList",'',
        function(response){
          Vue.$store.dispatch('getChartBox',response);
        }
      );
    },
    getTableBox (){
      let Vue = this;
      Vue.AxiosPost("getTableList",'',
        function(response){
          Vue.$store.dispatch('getTableBox',response);
        }
      );      
    }
  },
  mounted (){
     this.getDatasourceBox();
     this.getReportBox();
     this.getQueryBox();
     this.getChartBox();
     this.getTableBox();
  }
}
</script>
<style scoped>
#resource{
  width: 87%;
  height: 100%;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
}
#resource .row{
  width: 100%;
  margin:20px;
}
.datasource,.report,.chart,.query,.table{
  border: 1px solid #f5f3f3;
  padding-right: 30px;
}
.note.note-datasource,
.note.note-report,
.note.note-chart,
.note.note-query,
.note.note-table{
  color: #3c763d, 80%;
  margin-bottom: 0px;
  float: left;
  text-align: left;
}
.note.note-datasource{
  background-color: #eef7ea;
  border-color: #bbdba1;
}
.note.note-report{
  background-color: #eef7fb;
  border-color: #91d9e8;
}
.note.note-chart{
  background-color: #f9f0f0;
  border-color: #dca7b0;
}
.note.note-query{
  background-color: #c5e3e1;
  border-color: #45b6af;
}
.note.note-table{
  background-color: #bbd5ef;
  border-color: #569de7;
}
.note {
  margin: 0 0 20px 0;
  padding: 15px 30px 15px 15px;
  border-left: 5px solid #eee;
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  -ms-border-radius: 0 4px 4px 0;
  -o-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
.box{
  float: left;
}
</style>
