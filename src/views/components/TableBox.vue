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
      <table :id="tablebox.name"class="table table-striped table-bordered" cellspacing="0" width="90%"></table>
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
      previewTable:null,
    }
  }, 
  methods:{
    preview(){
      this.modalpreview = true;
      this.previewTableData();
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
      Vue.previewTable = $('#'+Vue.tablebox.name).DataTable({
        "destroy": true,
        pageLength: 3,
        searching:false,
        lengthChange:false,
        bInfo:false,
        bSort:false,
        columns:cols,
        data:rows
      });
    },
    previewTableData(){
      let Vue = this;
      if(Vue.previewTable != null ){
         Vue.previewTable.destroy();
         $('#previewTable'+Vue.index).empty();
      };
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.tablebox.bizViewId},
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
