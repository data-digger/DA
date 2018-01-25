<template>
  <div id='QueryEdit' >
    <div class="portlet box crusta">
      <div class="portlet-title">
        <div class="caption">编辑 {{bizViewName}} 查询器</div>
        <div class="tools">
          <a href="javascript:;" class="remove" data-original-title="" title="" @click="deleteEdit()">×
          </a>
        </div>
      </div>
      <QueryForm></QueryForm>
    </div>
  </div>
</template>

<script>
import QueryForm from './../../components/QueryForm'
import bus from "../../assets/js/TransferBus.js"
import {mapGetters} from 'vuex'
export default {
  name: 'QueryEdit',
  props:['bizViewId','bizViewName'],
  components:{
    QueryForm
  },
  methods:{
     deleteEdit (){
      this.$emit("delete",false);
    }
  },
}
</script>

<style scoped>
#QueryEdit{
  position: absolute;
  width: 500px;
  left: 250px;
  top: -330px;
}
#QueryEdit .portlet.box > .portlet-body{
   height: 300px;
   height: 300px;
   overflow-y: auto;
   overflow-x:hidden;
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
