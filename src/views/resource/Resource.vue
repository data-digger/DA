<template>
  <div id='resource' @mouseenter = 'enter()'>
    <Row id='scroll-datasource' class="datasource">
      <Col>
        <div class="note note-datasource">
          <h3 id='scroll-datasource' class="block " >数据源</h3> 
        </div>
      </Col>
      <Row class='cardBox'>
        <DatasourceBox v-for="ds in datasourceList" :key='ds.id' :datasource = 'ds'></DatasourceBox>
        <Creator routerpath="/createDatasource" id='creator_datasource'></Creator>     
      </Row>
    </Row>

    <Row id='scroll-param'  class=" param">
      <Col>
        <div class="note note-param">
          <h3 id='scroll-param' class="block ">参数管理</h3> 
        </div>
      </Col>
      <Row class='cardBox'>
        <ParamBox v-for="pr in paramList" :key='pr.id' :parambox = 'pr'></ParamBox>
        <Creator routerpath='/createParam' id='creator_param'></Creator>
      </Row>       
    </Row>  


    <Row id='scroll-query'  class=" query">
      <Col>
        <div class="note note-query">
          <h3 id='scroll-query' class="block ">查询器</h3>
        </div>      
      </Col>
      <Row class='cardBox'>
        <QueryBox  v-for="(q,index) in queryList" :key='q.id':querybox='q' :index='index'></QueryBox>
        <Creator routerpath='/createQuery' id='creator_query' abc='123'></Creator>
      </Row>
    </Row> 


    <Row id='scroll-chart'  class=" chart">
      <Col>
        <div class="note note-chart">
          <h3 id='scroll-chart' class="block ">图表</h3>
        </div>        
      </Col>
      <Row class='cardBox'>
        <ChartBox v-for="(chart,index) in chartList" :key='chart.id' :chartbox='chart' :index='index'></ChartBox>
        <Creator routerpath='/creatEchart' id='creator_chart'></Creator>
      </Row>
    </Row>


    <!-- <Row id='scroll-table'  class=" table">
      <Col>
        <div class="note note-table">
          <h3 id='scroll-table' class="block ">表格</h3>
        </div>
      </Col>
      <Row class='cardBox'>
        <TableBox v-for="(tb,index) in tableList" :key='tb.id' :tablebox='tb' :index='index'></TableBox>
        <Creator routerpath='/createTable' id='creator_table'></Creator>
      </Row>
    </Row>   -->

    <Row  id='scroll-report' class=" report">
      <Col>
        <div class="note note-report">
          <h3 id='scroll-report' class="block ">报表</h3>
        </div>
        </Col>
        <Row class='cardBox'>
          <ReportBox v-for="(rp,index) in reportList" :key='rp.id' :reportbox='rp' :index='index'></ReportBox>
          <Creator routerpath='/createReport' id='creator_report'></Creator>
        </Row>
    </Row>
    <ButtonGroup vertical class="demo-affix" style='right:18px;position:fixed;top:50%;'>
        <Tooltip class='monitor' :content="m.title" placement="left-end" v-for='(m,index) in monitor' :key='index'>
          <div :id='m.id' @click='scroll(m.id)'><img v-bind:src="m.src" style='width:50%;height:50%'></div>
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
      monitor:[{title:'数据源' ,src:require('./../../assets/img/datasource_small.png'),id:'scroll-datasource'},
      /*{title:'参数' ,src:require('./../../assets/img/parameter_small.png'),id:'scroll-param'},*/
      {title:'查询器', src:require('./../../assets/img/search_small.png'),id:'scroll-query'},
      {title:'图表' ,src:require('./../../assets/img/chart_small.png'),id:'scroll-chart'},
      // {title:'表格' ,src:require('./../../assets/img/table_small.png'),id:'scroll-table'},
      {title:'报表', src:require('./../../assets/img/report_small.png'),id:'scroll-report'}],
    }
  },
  components:{
    DatasourceBox,
    Creator,
    ReportBox,
    QueryBox,
    ChartBox,
    // TableBox,
   ParamBox
  },
  computed: {
    ...mapGetters({
      datasourceList: 'datasourceList',
      paramList: 'paramList',
      reportList:'reportList',
      chartList:'chartList',
      queryList:'queryList',
      // tableList:'tableList',
    })
  },
  methods:{
    enter(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('.box-card').css('-webkit-transform','scale(1)');        
    },
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
    // getTableBox (){
    //   let Vue = this;
    //   Vue.AxiosPost("getTableList",'',
    //     function(response){
    //       Vue.$store.dispatch('getTableBox',response);
    //     }
    //   );      
    // },
    scroll(id){
      document.getElementById(id).scrollIntoView();
     /*$('html,body').animate({scrollTop:$('#'+id).offset().top}, 300)*/
    }
  },
  mounted (){
     this.getDatasourceBox();
     this.getParamBox();
     this.getReportBox();
     this.getQueryBox();
     this.getChartBox();
    //  this.getTableBox();
  }
}
</script>
<style scoped>
.datasource,.report,.chart,.query,.table,.param{
   margin:11px;
}
.cardBox{
  padding-left: 25px;
}
.note.note-datasource,
.note.note-report,
.note.note-chart,
.note.note-query,
.note.note-table,
.note.note-param{
  width: 100%;
  color: #a0acbf;;
  margin-bottom: 0px;
  text-align: left;
}
.note {
  margin: 0 0 20px 0;
  padding: 15px 30px 15px 15px;
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  -ms-border-radius: 0 4px 4px 0;
  -o-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
.monitor{
  width: 40px;
  height: 40px;
  background: rgba(163,166,167,.63);
  text-align: center;
  cursor: pointer;
  line-height:45px;
  margin-bottom:2px;
  font-size: 30px;
  display: block;
}
.monitor:hover{
  opacity: 0.5;
}
</style>

{"componenttype":"list","valuetype":"String","defalutDefine":{"key":"牛肉","value":"牛肉"},"standbyDefine":{"valueSource":"SQL","values":"select cname,cname from t_price;","dataSourceID":"DS.demo_db"},"formattype":"","datetime":""}
