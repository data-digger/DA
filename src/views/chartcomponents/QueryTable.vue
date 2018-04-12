<template>
  <vbar wrapper="wrapper">
    <Table 
      :loading="loading" 
      :columns="columns" 
      :data="currentTableData" 
      ref='table'
      :row-class-name="rowClassName" >   
    </Table>
  </vbar>
</template>
<script>
import vbar from 'v-bar'
export default {
  props:['tableData'],
  components:{
    vbar
  },
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
        "title":'columnName',
        "key":'columnName',
        "align":"center",
        'sortable': true,
      },{
        "title":'type',
        "key":'columnType',
        "align":"center",
        'width':150,
        'sortable': true,        
      },{
        "title":'alias',
        "key":'columnAlias',
        "align":"center",
        'render':(h,params)=>{
          return h('Input',{
            props:{
              type:'text',
              value:params.row.columnAlias
            },
            on:{
              'on-blur':(event) => {
                Vue.currentTableData[params.index].columnAlias = event.target.value;
                Vue.saveEdit();
              }
            }
          })
        }      
      },{
        "title":'groupby',
        "key":'groupby',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.groupby == 1?true:false},
             on:{'on-change':(value)=>{
              if(value == true){
                value = 1;
              }else{
                value = 0;
              }
              Vue.currentTableData[params.index].groupby = value;           
              Vue.saveEdit();
             }
            }}
           )
          }       
      },{
        "title":'filterable',
        "key":'filterable',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.filterable},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].filterable = value; 
              Vue.saveEdit();
             }
            }})
        }                  
      },{
        "title":'countDistinct',
        "key":'countDistinct',
        "align":"center", 
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'true-value':1,'false-value':0,value:params.row.countDistinct},
             on:{'on-change':(value)=>{
              Vue.currentTableData[params.index].countDistinct = value;
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
      
      var rowData = Vue.tableData;
      if(!rowData.stringHeaders){
        Vue.currentTableData = rowData; 
      }else{
        var rows = [];
        var stringHeaders = rowData.stringHeaders;
        var columnType = rowData.columsType;
        for(let r in stringHeaders){
          rows.push({
            'columnName':stringHeaders[r],
            'columnType':columnType[r],
            'columnAlias':stringHeaders[r],
            'groupby':0,
            'filterable':0,
            'countDistinct':0,
            'sum':0,
            'max':0,
            'min':0
          });
        }
        Vue.total = rows.length;
        Vue.historyData = rows;
        Vue.currentTableData = Vue.historyData;                 
      }
      Vue.columns = cols; 
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
      if(index ==0){
        return 'tbody_first';
      }
      if(index % 2 == 1){
        return 'headRow_even'
      }
    }
  },
/*  beforeMount(){
    this.drawTable();
  }*/
}
</script>


<style>
#createQuery .ivu-input{
  border:1px solid #75839c;
  background-color:#404c60;
  color:#ffffff;
}
#createQuery .ivu-table{
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
}
#createQuery .ivu-table-wrapper{
  border:0;
}
#createQuery .ivu-table,
#createQuery .ivu-table:after,
#createQuery .ivu-table:before{
  background-color: #2f3949;
}
#createQuery .ivu-table th{
  height: 35px;
  background-color: #57647a !important;
  color:#a0acbf;
  border-bottom: 1px solid #6a788f;
}
#createQuery .ivu-table  td{
  background-color: #404c60 !important;
  color:#ffffff;
  height: 70px;
  border-right: 1px solid #404c60;
  border-bottom:1px solid #28313d;
}
#createQuery .ivu-table .headRow_even td:nth-child(1){
  border-left: 3px solid #e0604b;
}
#createQuery .ivu-table .tbody_first td{
  border-top:1px solid #28313d;
}
#createQuery .ivu-table .ivu-checkbox-inner{
  background-color: #404c60;
  border-color: #ffffff;
}
#createQuery .ivu-table .ivu-table-body{
  overflow: hidden;
}
.wrapper {
  height: 520px;
}
</style>
