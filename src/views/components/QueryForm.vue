<template>
  <Form id="QueryForm" ref="bizView" :model="bizView" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="bizView.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="bizView.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="bizView.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="数据源" prop="driverType">
            <Select class="form-control" v-model='bizView.dataSourceId'>               
                <Option v-for = 'datasource in datasourceList' :key='datasource.id' :value="datasource.id" >{{datasource.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="SQL定义:" prop="defineJSON">
            <textarea id='defineJSON' v-model ="bizView.defineJSON"></textarea>
        </FormItem>
    </Form>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
export default {
  name:"QueryForm",
  props:['bizView'],
  computed:{
  ...mapGetters({
    datasourceList:'datasourceList'
   })
  },
  data(){
    return {
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        dataSourceId: [
            { required: true, message: 'Please select the driverType', trigger: 'change' }
        ],
        defineJSON: [
            { required: true, message: 'sql define cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    createQuery(){
       let Vue = this;
       Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
       Vue.$refs["bizView"].validate((valid) => {
            if (valid) {
                 Vue.AxiosPost("createQuery",
                  Vue.bizView,
                   function(){
                      alert("提交成功！")
                   });
            } else {
                Vue.$Message.error('Fail!');
            }
        })
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
</style>
