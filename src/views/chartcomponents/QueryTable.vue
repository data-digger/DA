<template>
  <div>
    <Table :loading="loading" height='500' style='margin:20px 10px'border :columns="columns" :data="currentTableData" ref='table'>   
    </Table>
  </div>
</template>
<script>

export default {
  props:['tableData'],
  watch:{
    'tableData':'refreshTableData'
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
      if(Vue.tableData != null){
      var cols = [];
      cols.push({
        "title":'columnNames',
        "key":'columnNames',
        "align":"center",
        'sortable': true,
      },{
        "title":'Type',
        "key":'Type',
        "align":"center",
        'sortable': true,        
      },{
        "title":'GroupBy',
        "key":'GroupBy',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
             {props:{'checked':true},
              on:{'on-change':()=>{
               Vue.tableEdit(params);
              }
             }})
        }        
      },{
        "title":'Filterable',
        "key":'Filterable',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'checked':true},
             on:{'on-change':()=>{
               Vue.tableEdit(params);
             }
            }})
        }                  
      },{
        "title":'CountDistinct',
        "key":'CountDistinct',
        "align":"center", 
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'checked':true},
             on:{'on-change':()=>{
               Vue.tableEdit(params);
             }
            }})
        }       
      },{
        "title":'sum',
        "key":'sum',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'checked':true},
             on:{'on-change':()=>{
               Vue.tableEdit(params);
             }
            }})
        }        
      },{
        "title":'max',
        "key":'max',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'checked':true},
             on:{'on-change':()=>{
               Vue.tableEdit(params);
             }
            }})
        }         
      },{
        "title":'min',
        "key":'min',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'checked':true},
             on:{'on-change':()=>{
               Vue.tableEdit(params);
             }
            }})
        }         
      })
      var rows = [];
      var rowData = Vue.tableData;
      var stringHeaders = rowData.stringHeaders;
      var columnType = rowData.columsType;
      for(let r in stringHeaders){
        rows.push({
          'columnNames':stringHeaders[r],
          'Type':columnType[r],
          'GroupBy':0,
          'Filterable':0,
          'CountDistinct':0,
          'sum':0,
          'max':0,
          'min':0
        });
      }
      Vue.columns = cols; 
      Vue.total = rows.length;
      Vue.historyData = rows;
      Vue.currentTableData = Vue.historyData; 
    }       
    },
    tableEdit(params){
      let Vue = this;
      let editItem = params.column.key;
      Vue.currentTableData[params.index][editItem] = 1;
      //将字段编辑表数据存储到store
      Vue.$store.commit("save_query_fieldEdit_table",Vue.currentTableData);  
    },
/*    changePage(index){
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
    },*/
    refreshTableData(){
      let Vue = this;
      Vue.drawTable();
    },
  },
/*  beforeMount(){
    this.drawTable();
  }*/
}
</script>


<style scoped lang='less'>

</style>
