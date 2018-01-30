<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card  @click='link(subpath)' style="margin-bottom:10px">
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
      <table id='previewTable'></table>
    </Modal>
  </Col>
</template>

<script>
import dataTables from 'dataTables/media/js/jquery.dataTables.min.js'
import QueryForm from './../components/QueryForm'
export default {
  name: 'query',
  components:{
    QueryForm
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false
    }
  },
  props:['querybox'],
  methods:{
    preview (){ 
      this.modalpreview = true;
      this.previewBizView();
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
      var header = gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c]
         })
      };
      var rows = [];
      var rowData = gridData.data;
       for(let i in rowData){
          let row = [];
          for (let j in rowData[i]){
              row.push(rowData[i][j].displayValue);
          }
          rows.push(row);
      };
      var previewTable = $('#previewTable').DataTable({
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
    //获取预览查询器表格数据
    previewBizView(){
      let Vue = this;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.querybox.id},
        function(response){
          Vue.initPreviewTable(response.data);
        }
      );
    },
   }
}
</script>
<style scoped>
</style>
