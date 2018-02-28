<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{querybox.name}}</p>
        <p> {{querybox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>     
    </Card>
    <Modal
      v-model="modaledit"
      title="Common Modal dialog box title"
      @on-ok="editOk"
      @on-cancel="cancel">
      <QueryForm ref="queryedit" :bizView='querybox'></QueryForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
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
export default {
  name: 'query',
  components:{
    QueryForm
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false,
      total:null,
      pageSize:4,
      columns:[],
      historyData:[],
      currentTableData:[],      
    }
  },
  props:['querybox','index'],
  methods:{
    preview (){ 
      let Vue = this;
      Vue.modalpreview = true;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.querybox.id},
        function(response){
          Vue.initPreviewTable(response.data);
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
    initPreviewTable:function(gridData){
      let Vue = this;
      var header = gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c],
          "key":header[c]
         })
      };
      var rows = [];
      var rowData = gridData.data;
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
    }
   }
}
</script>
<style scoped>
</style>
