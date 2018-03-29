<template>
  <Row  style="padding:20px 0px">
    <Col span="7">
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
            <Tooltip content="点击生成工作表" placement="top-end" always>
              <Button type="ghost" shape="circle" icon="ios-search" @click='previewTable'></Button></Tooltip>
            <Button type="primary" @click="createQuery('bizView')">提交</Button>
            <Button type="ghost" @click="handleReset('bizView')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Form>
    </Col>
    <Col span='16' class='tableBox'>
      <querytable :chartCmpContent='currentTableData'></querytable>
    </Col>
  </Row>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
import treeBox from './../paramcomponents/Tree'
import querytable from './../chartcomponents/QueryTable'
export default {
  name:"createQuery",
  components:{
    treeBox,
    querytable
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
  data(){
    return {
      bizView: null,
      ruleValidate:{
      },
      route:null,
      isCreate:true,
      currentTableData:null
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
                 Vue.closePage(event,'createQuery');             
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })
    },  
    closePage(event, name){
      this.$Notice.destroy(); //关闭当前查询器页面前，销毁字段树提示卡
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[1];
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);  
      this.linkTo(lastPageObj); 
    },
    linkTo (item) {
      let routerObj = {};
      routerObj.name = item.name;
      if (item.argu) {
          routerObj.params = item.argu;
      }
      if (item.query) {
          routerObj.query = item.query;
      }
      this.$router.push(routerObj);
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
    initBizViewData(to,from){
      let Vue = this;
      /*Vue.$Notice.destroy();*/
/*      let regex = /^\/createQuery/;
      if(regex.test(from.fullPath)){
        return;
      }
      if(!regex.test(to.fullPath)){
        return;
      }*/
      Vue.isCreate =  $.isEmptyObject(to.params)
      if(Vue.isCreate == false){    
          
        let bizViewInfo = to.params;
        if(bizViewInfo != null){
          Vue.bizView = bizViewInfo; 
          Vue.selectTableFields();         
        }
      }
      if(Vue.isCreate == true){
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
      Vue.$Notice.destroy();//重绘字段树之前，先销毁之前的
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
    },
    previewTable(){
      let Vue = this;
      Vue.AxiosPost("previewBizView",{'bizViewId':"BZ.goodPrice"},
        function(response){
         console.log(response);
         Vue.$Notice.destroy();
         Vue.currentTableData = response.data;
      })       
    }
  },
  mounted(){
    let Vue = this;
    Vue.initSqlEdit();
  },
  beforeMount(){
    let Vue = this;
    Vue.initBizViewData(Vue.$route/*,{fullPath:'/*'}*/);
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
.tableBox{
  margin: -15px 25px;
}
</style>
