<template>
  <Form id="createQuery" ref="bizView" :model="bizView" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="bizView.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="bizView.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="bizView.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="数据源" prop="dataSourceId">
            <Select class="form-control" v-model='bizView.dataSourceId'>               
                <Option v-for = 'datasource in datasourceList' :key='datasource.id' :value="datasource.id" >{{datasource.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="参数">
             <span v-for="p in paramList"  :id='p.id' :key="p.id" class='param-span' draggable="true" @dragstart="drag">{{p.name}}</span>
        </FormItem>
        <FormItem label="SQL定义:" prop="defineJSON">
            <textarea id='defineJSON' v-model ="bizView.defineJSON"></textarea>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="createQuery('bizView')">Submit</Button>
            <Button type="ghost" @click="handleReset('bizView')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
export default {
  name:"createQuery",
  computed:{
  ...mapGetters({
    datasourceList:'datasourceList',
    paramList:'paramList'
   })
  },
  data(){
    return {
      bizView: {
        name:'',
        alias:'',
        desc:'',
        dataSourceId:'',
        defineJSON:'select * from dual'
      },
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        dataSourceId: [
            { required: true, message: 'Please select the dataSourceId', trigger: 'change' }
        ],
        defineJSON: [
            { required: true, message: 'sql define cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    createQuery(bizView){
      let Vue = this;
      Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
      Vue.$refs[bizView].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createQuery",
              Vue.bizView,
               function(){
                  Vue.$Message.success('新建成功!');
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })
    },  
    handleReset(bizView){
      let Vue = this;
      Vue.$refs[bizView].resetFields();
    },       
    initSqlEdit(){
      let Vue = this;
      var Market = {};
      var myTextarea = $("#defineJSON")[0];
      this.sqlEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true,
      });

    //    this.sqlEditor.on("drop",function(editor,e){
    //    // console.log(e.dataTransfer.files[0]);
    //    e.preventDefault();
    //    if(!(e.dataTransfer&&e.dataTransfer.files)){
    //        alert("该浏览器不支持操作");
    //        return;
    //    }
    //    e.target.ondrop = function(e){
    //       //e.preventDefault();
          
    //       var id = e.dataTransfer.getData("Text");
    //       var span=document.createElement('span');
    //       var name = document.getElementById(id).innerHTML;
    //       var $span = $(`<span style='width:50px;height:30px;border:1px solid blue'>${name}</span>`);
    //       let l = Vue.sqlEditor.getCursor().line;
    //       let c = Vue.sqlEditor.getCursor().ch;
    //       Vue.sqlEditor.replaceSelection(`^${id}^`);        

    //       alert(Vue.sqlEditor.doc.getValue());
         
    //   }
    // });
    },

  /*  drag(ev){
      ev.dataTransfer.setData("Text",ev.target.id);
    }*/

    drag(ev){
      ev.dataTransfer.setData("Text",`^${ev.target.id}^`);
    },
    getValue(){

    },
  },
  mounted:function(){
    this.initSqlEdit();
  }
}
</script>

<style scoped>
  .param-span{
    border: 1px solid #2d8cf0;
    font-size: 13px;
    color: #2d8cf0;
    padding: 4px;
    border-radius: 4px;
    background-color: #ffffff;
    margin-right:3px
  }
</style>
