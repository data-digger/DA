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
      <table :id="'previewTable'+index"></table>
      <!-- <v-table
       :width="500"
       :columns="columns"
       :table-data="tableData"
       :show-vertical-border="false"
      ></v-table> -->
    </Modal>
  </Col>
</template>

<script>
/*import dataTables from 'dataTables/media/js/jquery.dataTables.min.js'*/
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
      tableData:null,
      columns:null,
    }
  },
  props:['querybox','index'],
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
      let Vue = this;
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
/*     Vue.tableData =  [
         {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
         {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
         {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
         {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
         {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
     ];
    Vue.columns = [
        {field: 'name', title:'姓名', width: 100, titleAlign: 'center',columnAlign:'center'},
        {field: 'tel', title: '手机号码', width: 260, titleAlign: 'center',columnAlign:'center'},
        {field: 'hobby', title: '爱好', width: 330, titleAlign: 'center',columnAlign:'center'},
        {field: 'address', title: '地址', titleAlign: 'center',columnAlign:'left'}
    ]*/
    /*  var previewTable = $('#previewTable'+this.index).DataTable({
        bDestroy: true,
        pageLength: 3,
        searching:false,
        lengthChange:false,
        bInfo:false,
        bSort:false,
        columns: ,
        data:rows
      });*/
    },
    //获取预览查询器表格数据
    previewBizView(){
      let Vue = this;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.querybox.id},
        function(response){
          Vue.initPreviewTable(response.data);
          /*Vue.tableData = response.data;
          Vue.columns = response.data;*/
        }
      );
    },
   }
}
</script>
<style scoped>
</style>
