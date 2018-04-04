<template>
  <div>
    <Table 
      :loading="loading" 
      height='500' 
      style='margin:20px 10px'
      border 
      :columns="columns" 
      :data="currentTableData" 
      ref='table'
      :row-class-name="rowClassName" >   
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
        'width':150,
        'sortable': true,        
      },{
        "title":'alias',
        "key":'columnsAlias',
        "align":"center",
        'render':(h,params)=>{
          return h('Input',{
            props:{
              type:'text',
              value:params.row.columnsAlias
            },
            on:{
              'on-blur':(event) => {
                Vue.currentTableData[params.index].columnsAlias = event.target.value;
                Vue.saveEdit();
              }
            }
          })
        }      
      },{
        "title":'GroupBy',
        "key":'GroupBy',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.GroupBy},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].GroupBy = value;             
              Vue.saveEdit();
             }
            }})
          }       
      },{
        "title":'Filterable',
        "key":'Filterable',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.Filterable},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].Filterable = value; 
              Vue.saveEdit();
             }
            }})
        }                  
      },{
        "title":'CountDistinct',
        "key":'CountDistinct',
        "align":"center", 
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.CountDistinct},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].CountDistinct = value;
              Vue.saveEdit();
             }
            }})
        }       
      },{
        "title":'sum',
        "key":'sum',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.sum},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].sum = value;
              Vue.saveEdit();
             }
            }})
        }        
      },{
        "title":'max',
        "key":'max',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.max},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].max = value;
              Vue.saveEdit();
             }
            }})
        }         
      },{
        "title":'min',
        "key":'min',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.min},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].min = value;
              Vue.saveEdit();
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
          'columnsAlias':stringHeaders[r],
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
    //保存表编辑
    saveEdit(){
      let Vue = this;
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
    rowClassName (row, index){
      if(index == 0){
        return 'headRow';
      }
    }
  },
/*  beforeMount(){
    this.drawTable();
  }*/
}
</script>


<style scoped>
/*.ivu-table .headRow td{
  background-color: black !important;
}*/
</style>
