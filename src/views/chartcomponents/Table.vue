<template>
  <div>
    <Table style='margin:20px 10px'border :columns="columns" :data="currentTableData" ref='table'>   
    </Table>
    <div style="margin: 10px;overflow: hidden">        
      <div style="float: right;">
        <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage"></Page>
      </div>
      <Button style='background-color:#2d8cf0;color:white' @click="exportData()">导出表数据</Button>
     </div> 
  </div>
</template>
<script>

export default {
  props:['chartCmpContent'],
  watch:{
    'chartCmpContent':'chartContentChange'
  },
  data(){
    return {
      columns:[],
      currentTableData:[],
      total:null,
      pageSize:4,
      historyData:null,
    }
  }, 
  methods:{
    drawTable (){
      let Vue = this;
      if(Vue.chartCmpContent != null){
      var header = Vue.chartCmpContent.gridData.stringHeaders;
      var cols = [];
      for(let c in header){
         cols.push({
          "title":header[c],
          "key":header[c]
         })
      };
      var rows = [];
      var rowData = Vue.chartCmpContent.gridData.data;
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
    }       
    },
    changePage(index){
      let Vue = this;
      var _start = ( index - 1 ) * Vue.pageSize;
      var _end = index * Vue.pageSize;
      Vue.currentTableData = Vue.historyData.slice(_start,_end);
    },
    exportData(){
      let Vue = this;
      Vue.$refs.table.exportCsv({
        filename: "当前表数据"
      });   
    },
    chartContentChange(){
      let Vue = this;
      Vue.drawTable();
    }
  },
  beforeMount(){
    this.drawTable();
  }
}
</script>


<style scoped lang='less'>

</style>
