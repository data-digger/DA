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
          <DatasourceBox v-for="ds in datasourceList" :key='ds.id' :name='ds.name' :desc='ds.desc'></DatasourceBox>
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
          <ReportBox v-for="box in reportList" :key='box.id' :name='box.name' :desc='box.desc'></ReportBox>
       </div>
    </div>
    <div class="row chart">
       <div class="note note-chart">
          <h4 class="block">图表</h4>
          <p>
             Duis mollis, est non commodo luctus, nisi erat mattis consectetur purus sit amet porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
          </p>
       </div>
       <div class="row box chart-box">
          <ChartBox v-for="box in chartList" :key='box.id' :id='box.id' :name='box.name' :desc='box.desc' :defineJSON='box.defineJSON'></ChartBox>
          <ChartPreview v-if="chartPreview"></ChartPreview>
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
        <QueryBox  v-for="q in queryList" :key='q.id' :id='q.id' :name='q.name' :desc='q.desc'></QueryBox>
       
     </div>
  </div> 
</div>
</template>

<script>
import DatasourceBox from './../../components/DatasourceBox'
import ReportBox from './../../components/ReportBox'
import ChartBox from './../../components/ChartBox'
import QueryBox from './../../components/QueryBox'
import ChartPreview from './ChartPreview'
import {mapGetters} from 'vuex'
export default {
  name: 'Resource',
  components:{
    DatasourceBox,
    ReportBox,
<<<<<<< HEAD
    QueryBox,
    ChartBox
=======
    ChartBox,
    QueryBox,
    ChartPreview,
>>>>>>> 33f43e357742a388cd24f6040b35a43e1a3e3b53
  },
  computed: {
    ...mapGetters({
      datasourceList: 'datasourceList',
      reportList:'reportList',
      chartList:'chartList',
      queryList:'queryList',
      chartPreview:'chartPreview',
      showEdit:'showEdit',
      showPreview:'showPreview'
    })
  },
  methods:{
    getDatasourceBox(){
      let Vue = this;
      Vue.AxiosPost("getDatasource",'',
        function(response){
          Vue.$store.dispatch('getDatasourceBox',response);
        }
      );   
    },
    getQueryBox (){
      let Vue = this;
      Vue.AxiosPost("getQuery",'',
        function(response){
          Vue.$store.dispatch('getQueryBox',response);
        }
      );
    },
    getChartBox (){
      let Vue = this;
      Vue.AxiosPost("getChart",'',
        function(response){
          Vue.$store.dispatch('getChartBox',response);
        }
      );
    }
  },
  mounted (){
     this.getDatasourceBox();
     this.getQueryBox();
     this.getChartBox();
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
.datasource,.report,.dashboard,.query{
.datasource,.report,.chart,.query{
  border: 1px solid #f5f3f3;
  padding-right: 30px;
}
.note.note-datasource,
.note.note-report,
.note.note-dashboard,
.note.note-chart,
.note.note-query{
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
.chart-box{
  position: relative;
}
</style>
