<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{tablebox.name}}</p>
        <p class="box-desc" :title='tablebox.desc'>{{tablebox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card> 
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Table border :columns="columns" :data="currentTableData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage" ></Page>
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
      pageSize:4,
      historyData:[],
      currentTableData:[], 
    }
  }, 
  methods:{
    preview(){
      let Vue = this;
      Vue.modalpreview = true;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.tablebox.bizViewId},
        function(response){
          Vue.initPreviewTable(response.data.gridData);
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
