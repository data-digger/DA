<template>
  <div id='QueryPreview'>
          <div class="portlet box crusta">
            <div class="portlet-title">
              <div class="caption">预览{{bizViewId}}查询器</div>
              <div class="tools">
                <a href="javascript:;" class="remove" data-original-title="" title="" @click="deletePreview()">×
                </a>
              </div>
            </div>
            <div class="portlet-body">
              <table id='previewTable'></table>
           </div>
          </div>
      </div>
</template>

<script>
import dataTables from 'dataTables/media/js/jquery.dataTables.min.js'
import {mapGetters} from 'vuex'
export default {
  name: 'QueryPreview',
  computed: {
    ...mapGetters({
      bizViewId:'bizViewId',
      bizViewName:'bizViewName',
    })
  },
  methods:{
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
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.bizViewId},
        function(response){
          Vue.initPreviewTable(response.data);
        }
      );
    },
    //关闭预览弹框
    deletePreview (){
      this.$store.dispatch('changeState',{showPreview:false})
    }
  },
  mounted:function(){
    this.previewBizView();
  }
}
</script>

<style scoped>
/*@import "codemirror/lib/codemirror.css"*/
/*@import "./../../../node_modules/datatables/media/css/jquery.dataTables.css"*/
#QueryPreview{
  position: absolute;
  width: 500px;
  left: 250px;
  top: -330px;
}
.portlet.box > .portlet-title{
  border-bottom: 0;
  padding: 0 10px;
  margin-bottom: 0;
  color: #fff;
  background-color:#45b6af;
  min-height: 41px;
  text-align: left;
  line-height: 41px;
}
.portlet .caption{
  width: 50%;
  display: inline-block;
}
.portlet > .portlet-title > .tools {
  float: right;
  display: inline-block;
}
.portlet.box > .portlet-title > .tools > a.remove {
  color: white;
}
.portlet.box > .portlet-body{
  background-color: #fff;
  padding: 30px 10px;
  border: 1px solid #45b6af;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
