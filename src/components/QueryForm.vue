<template>
    <div class="portlet-body form">
      <form action="#" id="form-username" class="form-horizontal form-bordered">
        <div class="form-group col-md-12">
          <label class="col-sm-2 control-label">名称:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <span class="input-group-addon">
              <i class="fa fa-user"></i>
              </span>
              <input type="text" id="name"class="form-control" v-model='bizView.name'/>
            </div>
          </div>
        </div>
        <div class="form-group col-md-12">
          <label class="col-sm-2 control-label">别名:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <span class="input-group-addon">
              <i class="fa fa-user"></i>
              </span>
              <input type="text" id="name"class="form-control" v-model='bizView.alias'/>
            </div>
          </div>
        </div>
        <div class="form-group col-md-12">
          <label class="col-sm-2 control-label">描述:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <span class="input-group-addon">
              <i class="fa fa-user"></i>
              </span>
              <input type="text" id="name"class="form-control" v-model='bizView.desc'/>
            </div>
          </div>
        </div>
        <div class="form-group col-md-12">
            <label class="control-label col-sm-2">数据源:</label>
            <div class="col-md-9">
              <select class="form-control" v-model='bizView.dataSourceId'>               
                <option v-for = '(datasource,index) in bizView.datasourceList' :value="datasource.id" >{{datasource.name}}</option>
              </select>
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-2 control-label">SQL定义:</label>
            <div class="col-md-9">
              <textarea id='defineJSON'></textarea>
            </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="col-md-offset-2 col-md-8">
              <button type="button" class="btn btn-green" @click="createQuery()">提交</button>
              <button type="button" class="btn" @click="comeback()">返回</button>
            </div>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
export default {
  name:"QueryForm",
  data(){
    return {
      bizView: {
        name:'ddd',
        alias:'sss',
        desc:'sss',
        dataSourceId:'',
        defineJSON:''
      },
      datasourceList:[]
    }
  },
  methods:{
    createQuery(){
       let Vue = this;
       Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
       Vue.AxiosPost("createQuery",Vue.bizView,
       function(){
          alert("提交成功！")
       });
    },
    initSqlEdit(){
      var myTextarea = $("#defineJSON")[0];
      this.sqlEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
      });
    }
  },
  mounted:function(){
    this.initSqlEdit();
  }
}
</script>

<style scoped>
.portlet.box > .portlet-body {
    background-color: #fff;
    padding: 30px 10px;
}
.btn-green{
  background-color: #45b6af;
}
</style>
