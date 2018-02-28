<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{tablebox.name}}</p>
        <p>{{tablebox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card> 
    <Modal
      v-model="modalpreview"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Table border :columns="columns" :data="queryData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </Modal>  
  </Col>
</template>
<script>
export default {
  props:['tablebox','index'],
  components: {
  },
  data(){
    return {
      modalpreview:false,
      total:null,
      columns:[],
      queryData:[], 
    }
  }, 
  methods:{
    preview(){
      let Vue = this;
      Vue.modalpreview = true;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.tablebox.bizViewId},
        function(response){
          Vue.initPreviewTable(response.data);
        }
      );
    },
    cancel(){

    },
    previewOk(){

    },
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
      Vue.queryData = rows; 
      Vue.total = rows.length;
    },
    changePage(){

    }
  }
}
</script>


<style scoped>

</style>
