<template>
  <div>
    <Table :loading="loading" height='500' style='margin:20px 10px'border :columns="columns" :data="currentTableData" ref='table'>   
    </Table>
  </div>
</template>
<script>

export default {
  props:['chartCmpContent','ifPage'],
  watch:{
    'chartCmpContent':'refreshChartContent'
  },
  data(){
    return {
      loading:false,
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
          /*"title":header[c],*/
          "key":header[c],
          "align":"center",
          renderHeader :(h, params) => {
            return h('div',
                    {style:{color: 'red'},
                     domProps: {innerHTML:header[c]+"<button>SS</button>"},
                                /*on:{
                                  click:Vue.changeField()
                                }*/},
                     []
                    );           
          }
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
      Vue.currentTableData = Vue.historyData;   
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
    refreshChartContent(){
      let Vue = this;
      Vue.drawTable();
    },
    changeField(){
      alert(1);
    }
  },
  beforeMount(){
    this.drawTable();
  }
}
</script>


<style scoped lang='less'>

</style>
