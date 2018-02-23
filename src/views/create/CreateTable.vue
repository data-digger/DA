<template>
  <Form id="createTable" ref="table" :model="table" :rules="ruleValidate" :label-width="80">
        <FormItem label="表格ID" prop="id">
            <Input v-model="table.id" placeholder="表格ID"></Input>
        </FormItem>
        <FormItem label="表名称" prop="name">
            <Input v-model="table.name" placeholder="表名称"></Input>
        </FormItem>
        <FormItem label="表别名" prop="alias">
            <Input v-model="table.alias" placeholder="表别名"></Input>
        </FormItem>
        <FormItem label="表描述" prop="desc">
            <Input v-model="table.desc" placeholder="表描述"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="createTable('table')">Submit</Button>
            <Button type="ghost" @click="handleReset('table')" style="margin-left: 8px">Reset</Button>
        </FormItem>
     <!--    <FormItem label="表" prop="id">
            <Input v-model="table.id" placeholder="输入名称"></Input>
        </FormItem>  -->     
    </Form>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
export default {
  name:"createQuery",
  data(){
    return {
      table: {
        id:'',
        name:'',
        alias:'',
        desc:'',
      },
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        id: [
            { required: true, message: 'id cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    createTable(table){
      let Vue = this;
      Vue.$refs[table].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createTable",
              Vue.table,
               function(){
                  alert("新建成功！")
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })      
    },
    handleReset(table){
      let Vue = this;
      Vue.$refs[table].resetFields();
    }
  },
  mounted:function(){

  }
}
</script>

<style scoped>
</style>
