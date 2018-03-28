<template>
  <div id='resource'>
    <Row id='scroll-datasource' class="datasource">
      <Col>
        <div class="note note-datasource">
          <h4 id='scroll-datasource' class="block " >数据源</h4> 
        </div>
      </Col>
      <Row class='cardBox'>
        <DatasourceBox v-for="ds in datasourceList" :key='ds.id' :datasource = 'ds'></DatasourceBox>
        <Creator :routerpath="createDatasource"></Creator>     
      </Row>
    </Row>

    <Row id='scroll-param'  class=" param">
      <Col>
        <div class="note note-param">
          <h4 id='scroll-param' class="block ">参数管理</h4> 
        </div>
      </Col>
      <Row class='cardBox'>
        <ParamBox v-for="pr in paramList" :key='pr.id' :parambox = 'pr'></ParamBox>
        <Creator :routerpath='createParam'></Creator>
      </Row>       
    </Row> 


    <Row id='scroll-query'  class=" query">
      <Col>
        <div class="note note-query">
          <h4 id='scroll-query' class="block ">查询器</h4>
        </div>      
      </Col>
      <Row class='cardBox'>
        <QueryBox  v-for="(q,index) in queryList" :key='q.id':querybox='q' :index='index'></QueryBox>
        <Creator :routerpath='createQuery'></Creator>
      </Row>
    </Row> 


    <Row id='scroll-chart'  class=" chart">
      <Col>
        <div class="note note-chart">
          <h4 id='scroll-chart' class="block ">图表</h4>
        </div>        
      </Col>
      <Row class='cardBox'>
        <ChartBox v-for="(chart,index) in chartList" :key='chart.id' :chartbox='chart' :index='index'></ChartBox>
        <Creator :routerpath='creatEchart'></Creator>
      </Row>
    </Row>


    <Row id='scroll-table'  class=" table">
      <Col>
        <div class="note note-table">
          <h4 id='scroll-table' class="block ">表格</h4>
        </div>
      </Col>
      <Row class='cardBox'>
        <TableBox v-for="(tb,index) in tableList" :key='tb.id' :tablebox='tb' :index='index'></TableBox>
        <Creator :routerpath='createTable' ></Creator>
      </Row>
    </Row>  

    <Row  id='scroll-report' class=" report">
      <Col>
        <div class="note note-report">
          <h4 id='scroll-report' class="block ">报表</h4>
        </div>
        </Col>
        <Row class='cardBox'>
          <ReportBox v-for="(rp,index) in reportList" :key='rp.id' :reportbox='rp' :index='index'></ReportBox>
          <Creator :routerpath='createReport'></Creator>
        </Row>
    </Row>
    <ButtonGroup vertical class="demo-affix" style='right:18px;position:fixed;top:35%;'>
          <Tooltip class='monitor' :content="m.title" placement="left-end" v-for='(m,index) in monitor' :key='index'>
             <div :id='m.id' @click='scroll(m.id)'><Icon :type="m.icon"></Icon></div>
          </Tooltip>
    </ButtonGroup>     
</div>
</template>

<script>
import DatasourceBox from './../components/DatasourceBox'
import ParamBox from './../components/ParamBox'
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
      createDatasource:'/createDatasource',
      creatEchart:'/createChart',
      createQuery:'/createQuery',
      createReport:'/createReport',
      createTable:'/createTable',
      createParam:'/createParam',
      monitor:[{title:'数据源' ,icon:'social-dropbox-outline',id:'scroll-datasource'},
      {title:'参数' ,icon:'wrench',id:'scroll-param'},
      {title:'查询器', icon:'search',id:'scroll-query'},
      {title:'图表' ,icon:'connection-bars',id:'scroll-chart'},
      {title:'表格' ,icon:'ios-grid-view',id:'scroll-table'},
      {title:'报表', icon:'ios-paper-outline',id:'scroll-report'}]
    }
  },
  components:{
    DatasourceBox,
    Creator,
    ReportBox,
    QueryBox,
    ChartBox,
    TableBox,
    ParamBox
  },
  computed: {
    ...mapGetters({
      datasourceList: 'datasourceList',
      paramList: 'paramList',
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
          Vue.$store.dispatch('getDatasourceBox',response);
        }
      );   
    },
    getParamBox(){
      let Vue = this;
      Vue.AxiosPost("getParamList",'',
        function(response){
          Vue.$store.dispatch('getParamBox',response);
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
    },
    scroll(id){
      document.getElementById(id).scrollIntoView();
     /* $('#resource').animate({scrollTop:$('#'+id).offset().top-100}, 300)*/
    }
  },
  mounted (){
     this.getDatasourceBox();
     this.getParamBox();
     this.getReportBox();
     this.getQueryBox();
     this.getChartBox();
     this.getTableBox();
  }
}
</script>
<style scoped>
#resource{
  /*width: 87%;*/
  height: 1000px;
  overflow-y: auto;
  overflow-x: hidden;
}
.cardBox{
  margin:10px 20px;
}
.datasource,.report,.chart,.query,.table,.param{
   margin:15px;
   padding-top:10px;
}
.note.note-datasource,
.note.note-report,
.note.note-chart,
.note.note-query,
.note.note-table,
.note.note-param{
  width: 100%;
  color: #3c763d, 80%;
  margin-bottom: 0px;
  text-align: left;
}
.note.note-datasource{
  background-color: #eef7ea;
  border-color: #bbdba1;
}
.note.note-param{
  background-color: #f1bec1;
  border-color: #dca7b0;
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
.monitor{
  width: 60px;
  height: 60px;
  background: rgba(163,166,167,.63);
  text-align: center;
  cursor: pointer;
  line-height:60px;
  margin-bottom:2px;
  font-size: 30px;
  display: block;
}
.monitor:hover{
  background-color:#2d8cf0;
}
</style>
