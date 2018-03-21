<template>
  <Row>
    <Col :xs="15" :sm="15" :md="15" :lg="15">
      <Form id="createQuery" ref="bizView" :model="bizView" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称" prop="name">
              <Input v-model="bizView.name" placeholder="输入名称" :disabled ='nameEdit'></Input>
          </FormItem>
          <FormItem label="别名" prop="alias">
              <Input v-model="bizView.alias" placeholder="输入别名"></Input>
          </FormItem>
          <FormItem label="描述" prop="desc">
              <Input v-model="bizView.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="数据源" prop="dataSourceId">
              <Select class="form-control" v-model='bizView.dataSourceId' @on-change='selectTableFields'>               
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
    </Col>
  </Row>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
import treeBox from './../paramcomponents/Tree'
export default {
  name:"createQuery",
  components:{
    treeBox
  },
  computed:{
  ...mapGetters({
    datasourceList:'datasourceList',
    paramList:'paramList'
   }),
  nameEdit(){
    let Vue = this;  
    if(Vue.isCreate){
        return false;
    }else{
      return true;
    }
   }
  },
  watch: {
    '$route' (to, from) {
      let Vue = this;
      Vue.initBizViewData(to);
    }
  },
  data(){
    return {
      bizView: null,
      ruleValidate:{
/*        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],*/
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
       /* dataSourceId: [
            { required: true, message: 'Please select the dataSourceId', trigger: 'change' }
        ],*/
        defineJSON: [
            { required: true, message: 'sql define cannot be empty', trigger: 'blur' }
        ]
      },
      route:null,
      isCreate:true,
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
                  Vue.$Message.success('success!');
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
    },
    drag(ev){
      ev.dataTransfer.setData("Text",`^${ev.target.id}^`);
    },
    initBizViewData(to){
      let Vue = this;
      Vue.isCreate =  $.isEmptyObject(to.params)
      if(!Vue.isCreate){        
        let bizViewInfo = Vue.$route.params;
        if(bizViewInfo != null){
          Vue.bizView = bizViewInfo;          
        }
      }
      if(Vue.isCreate){
        Vue.bizView = {
          name:'',
          alias:'',
          desc:'',
          dataSourceId:'',
          defineJSON:'select * from ...'
        }
      } 
      if(Vue.sqlEditor){
        Vue.sqlEditor.setValue(Vue.bizView.defineJSON);
      }     
    },
    selectTableFields(){
      let Vue = this;
      Vue.$Notice.destroy();
      if(Vue.bizView.dataSourceId != ""){
        var datasourceName = null;
        for(var i in Vue.datasourceList){
          if(Vue.datasourceList[i].id == Vue.bizView.dataSourceId){
            datasourceName = Vue.datasourceList[i].name;
            break;
          }
        }
        Vue.$Notice.open({
          name:'treeBox',        
          title: datasourceName+'的数据表(展开可以查看表字段)',
          render: function(createElement){
            return createElement(treeBox,{props:{datasourceId:Vue.bizView.dataSourceId}})
          },        
          duration: 0
        });
      }
    }
  },
  mounted(){
    let Vue = this;
    Vue.initSqlEdit();
  },
  beforeMount(){
    let Vue = this;
    Vue.initBizViewData(Vue.$route);
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
