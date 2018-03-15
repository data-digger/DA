<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{querybox.name}}</p>
        <p class="box-desc" :title='querybox.desc'> {{querybox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>     
    </Card>
    <Modal
      v-model="modaledit"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="editOk"
      @on-cancel="cancel">
      <QueryForm ref="queryedit" :bizView='querybox'></QueryForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Row><component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component></Row>
      <Table border :columns="columns" :data="currentTableData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage"></Page>
        </div>
    </div>      
    </Modal>
  </Col>
</template>

<script>
import QueryForm from './../components/QueryForm'
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
export default {
  name: 'query',
  components:{
    QueryForm,
    datepicker,
    list
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false,
      paramComponent:[],
      total:null,
      pageSize:4,
      columns:[],
      historyData:[],
      currentTableData:[],
      paramSelected:null    
    }
  },
  props:['querybox','index'],
  methods:{
    preview (){ 
      let Vue = this;
      Vue.modalpreview = true;
      Vue.paramComponent = [];
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.querybox.id},
        function(response){
          for(var i in response.data.defaultParameters){
            if(response.data.defaultParameters[i].paramType == 'list'){
              var cmpObj = {};
              cmpObj.component = list;
              cmpObj.content = response.data.defaultParameters[i];
              Vue.paramComponent.push(cmpObj);
            };
            if(response.data.defaultParameters[i].paramType == 'date'){
              var cmpObj = {};
              cmpObj.component = datepicker;
              cmpObj.content = response.data.defaultParameters[i];
              Vue.paramComponent.push(cmpObj);
            }
          }          
          /*Vue.initPreviewTable(response.data.gridData);*/
        }
      );
    },
    edit (){
      this.modaledit = true;
    },
    editOk(){
      this.$refs.queryedit.createQuery();
    },
    previewOk(){

    },
    cancel(){
      
    },
    //加载预览查询器表格
    initPreviewTable:function(response){
      let Vue = this;
      var header = response.data.gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c],
          "key":header[c]
         })
      };
      var rows = [];
      var rowData = response.data.gridData.data;
       for(let r in rowData){
          let row = {};
          let curRow = rowData[r];
           for(let col in header){
             row[header[col]] = curRow[col].displayValue;
          };
          rows.push(row);
      }
      Vue.columns = cols; 
      Vue.total = rows.length;
      Vue.historyData = rows;
      if(Vue.total<Vue.pageSize){
        Vue.currentTableData = Vue.historyData;
      }else{
        Vue.currentTableData = Vue.historyData.slice(0,this.pageSize);
      }
      
    },
    changePage(index){
      let Vue = this;
      var _start = ( index - 1 ) * Vue.pageSize;
      var _end = index * Vue.pageSize;
      Vue.currentTableData = Vue.historyData.slice(_start,_end);
    },
    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      console.log(Vue.param);
      let JSONParam = JSON.stringify(Vue.paramSelected);
      Vue.AxiosPost("updateBizView",{"bizViewId":Vue.querybox.id,"JSONParam":JSONParam},
        function(response){
        Vue.initPreviewTable(response);
      });      
    }
   }
}
</script>
<style scoped>
.paramcomponent{
  display: inline-block;
  margin: 10px auto;
}
</style>
