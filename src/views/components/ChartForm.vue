<template>
  <Form id="chartForm" ref="myChart" :model="myChart" :rules="ruleValidate" :label-width="80">
        <FormItem label="ID" prop="id">
            <Input v-model="myChart.id" disabled></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
            <Input v-model="myChart.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="myChart.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="myChart.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter chart descript..."></Input>
        </FormItem>
        <FormItem label="查询器" prop="bizViewId">
            <Select class="form-control" v-model='myChart.bizViewId'>               
                <Option v-for = 'q in queryList' :key='q.id' :name='q.name' :value="q.id" >{{q.name}}</option>
            </Select>
        </FormItem>
        <FormItem label="Option:" prop="defineJSON">
            <textarea id='chartOption' v-model='myChart.defineJSON'></textarea>
        </FormItem>
    </Form>  
</template>

<script>

import JSON5 from 'json5'
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/javascript/javascript.js"
import {mapGetters} from 'vuex'
export default {
  name:"ChartForm",
  props:['myChart'],
  computed:{
  ...mapGetters({
    queryList:'queryList'
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
        bizViewId: [
            { required: true, message: 'Please select the bizView', trigger: 'change' }
        ],
        defineJSON: [
            { required: true, message: 'echartsOption define cannot be empty', trigger: 'blur' }
        ]
      }  
    }
  },
  methods:{
    saveChart:function(){
      let Vue = this;
      //Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue().replace(/\n/g, "");
      Vue.myChart.defineJSON = Vue.optionEditor.doc.getValue();
      Vue.$refs["myChart"].validate((valid) => {
                    if (valid) {
                         Vue.AxiosPost("createChart",
                          Vue.myChart,
                           function(){
                              Vue.$Message.success('Success!');
                           });
                    } else {
                        Vue.$Message.error('Fail!');
                    }
                })
    },  
     initOptionEdit: function(){
        var myTextarea = $("#chartOption")[0];
        this.optionEditor = CodeMirror.fromTextArea(myTextarea,{
            lineNumbers: true, 
            mode: "text/javascript", 
            content: myTextarea.value,
            extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        });
   },
  },
  mounted:function(){
    this.initOptionEdit();
  }
}
</script>

<style scoped>
</style>
