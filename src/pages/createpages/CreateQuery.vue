<template>
  <div id='queryedit'>
       <div class="row queryedit">
        <div class="col-md-12">
          <div class="portlet box crusta">
            <div class="portlet-title">
              <div class="caption">
                <i class="fa fa-gift"></i>新建查询器
              </div>
            </div>
            <QueryForm></QueryForm>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import QueryForm from './../../components/QueryForm'
export default {
  name: 'QueryEdit',
  components:{
   QueryForm
  }
}
</script>

<style scoped>
/*@import "codemirror/lib/codemirror.css"*/
#queryedit{
  width: 87%;
  height: 100%;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
}
.queryedit{
  margin:9px !important;
}
#notific8_show{
  color: white;
  background-color: #45b6af;
}
.portlet.box > .portlet-title {
    border-bottom: 0;
    padding: 0 10px;
    margin-bottom: 0;
    color: #fff;
    background-color:#45b6af;
    min-height: 41px;
    text-align: left;
    line-height: 41px;
}
.portlet > .portlet-body.crusta, .portlet.crusta {
    background-color: #fff;
    border: 1px solid #45b6af;
    border-top: 0;
}
</style>
