<template>
  <div id="createQuery">
      <Carousel v-model="step" :dots="setting.dots" :arrow="setting.arrow" ref='slide'>
        <CarouselItem>
          <div class="demo-carousel">
            <Row style="padding:0px 0px 0px 25px;">
              <Col span='10'>
                <Form style='margin:5px 10px 0px 10px;'>
                  <FormItem label="数据源" prop="dataSourceId">
                    <Select class="form-control" v-model='bizView.dataSourceId' @on-change='selectTableFields' placeholder='选择数据源' :disabled='canEdit'>        
                        <Option v-for = 'datasource in datasourceList' :key='datasource.id' :value="datasource.id" >{{datasource.name}}</Option>
                    </Select>
                  </FormItem>
                </Form>
                <treebox :datasourceId ='bizView.dataSourceId' :treeName='datasourceName'></treebox>             
              </Col>
              <Col span='12' style='margin-top:12px;margin-left:10px'>
                <p style='color:#a0acbf;height: 20px; margin-bottom: 5px;'>sql定义(按ctrl键可语法提示)</p>
                <textarea id='defineJSON' v-model ="bizView.defineJSON"></textarea>
                <div class='preview_img' @click='previewSQLResult()'><img src="./../../assets/img/page_preview.png"></div>
                <Modal
                v-model="showSQLResultModal"
                width ="1200px"
                title="数据预览">
                  <iviewtable :tableContent='queryMetaData' :pageSize='pageSize'></iviewtable>        
                </Modal>
              </Col>
            </Row>
          </div>
        </CarouselItem>


        <CarouselItem>
          <div class="demo-carousel">
             <Row style="padding: 20px 40px 40px 20px;">
              <Col span="24">
                <editquerytable :queryMetaData ='queryMetaData' :isCreate='isCreate' :bizView='bizView' ref='Edit'></editquerytable>
              </Col>
             </Row>
          </div>
        </CarouselItem>

        
        <CarouselItem>
          <div class="demo-carousel">
            <Row  style="padding:20px 20px">
                <Col span="22">
                  <Form id="createQuery" ref="bizView" :model="bizView" :rules="ruleValidate" :label-width="80">
                      <FormItem label="名称" prop="name">
                          <Input v-model="bizView.name" placeholder="输入名称" :disabled ='canEdit'></Input>
                      </FormItem>
                      <FormItem label="别名" prop="alias">
                          <Input v-model="bizView.alias" placeholder="输入别名"></Input>
                      </FormItem>
                      <FormItem label="描述" prop="desc">
                          <Input v-model="bizView.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                      </FormItem>
                  </Form>
                </Col>
              </Row>
          </div>
        </CarouselItem>
      </Carousel>
    <Row  class='cd_button_box'>
      <Button type="primary"  class='cd_button_pre' @click='prev()'>上一步</Button>
      <Button v-if="!finished" type="primary" class='cd_button_next' @click='next()'>下一步</Button>
      <Button v-if="finished" type="primary" class='cd_button_save' @click='saveQuery("bizView")'>保存</Button>
    </Row> 
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/sql-hint.js"
import {mapGetters} from 'vuex'
import treebox from './../paramcomponents/Tree'
import editquerytable from './../chartcomponents/QueryTable'
import iviewtable from './../chartcomponents/Table'
export default {
  name:"createQuery",
  components:{
    treebox,
    editquerytable,
    iviewtable
  },
  computed:{
  ...mapGetters({
    datasourceList:'datasourceList',
    queryFields:'queryFields'
   }),
  canEdit(){
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
      finished:false,
      step:0, //创建查询器的步骤
      pageSize:3,
      showSQLResultModal:false,
      datasourceName:null,
      sqlEditor:null,
      setting: {
        height:"200",
        dots:"none",
        arrow:"never",
      },
      bizView: null,
      ruleValidate:{
        name: [
          { required: true, message: '名称不能为空'}
        ],
        alias: [
          { required: true, message: '别名不能为空'}
        ]
      },
      route:null,
      isCreate:true,
      queryMetaData:null,
      edit_queryMetaData:null
    }
  },
  methods:{
    /*下一步操作*/
    next() {
      let Vue = this;
      if (Vue.step >=3) return ;
      //Slide向前移一步
      Vue.$refs.slide.arrowEvent(1);
      if (Vue.step == 1) {
        if (Vue.isCreate){//如果是新建
          if (Vue.queryMetaData != null){
              //已经点击了预览获取了查询器元数据
              return;
          }else{
            Vue.getQueryMetaData();      
          }             
        }else{//如果编辑
          Vue.queryMetaData = Vue.edit_queryMetaData;
        }       
      }
      if(Vue.step == 2){
          Vue.finished = true;
      }
    },

    /*上一步操作*/
    prev() {
      let Vue = this;
      if(Vue.step !=0){
        Vue.$refs.slide.arrowEvent(-1);
        Vue.finished = false;
      }
    },

    /*创建查询器*/
    saveQuery(bizView){
      let Vue = this;
      Vue.$refs.Edit.saveQueryFields();//在填写完查询器信息的时候，保存之前字段表操作
      //保存查询器表。包含查询器名称，别名,描述，数据源id,sql;
      //保存字段编辑表。包含查询器id，字段名称，别名，类型...
      Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
      let bizViewColum = [];
      for(var c in Vue.queryFields){
        let field = {};
        field.columnName = Vue.queryFields[c].columnName;
        field.columnAlias = Vue.queryFields[c].columnAlias;
        field.columnType = Vue.queryFields[c].columnType;
        field.groupby = Vue.queryFields[c].groupby;
        field.filterable = Vue.queryFields[c].filterable;
        field.countDistinct = Vue.queryFields[c].countDistinct;
        field.sum = Vue.queryFields[c].sum;
        field.min = Vue.queryFields[c].min;
        field.max = Vue.queryFields[c].max;
        field.category = Vue.queryFields[c].category;
        field.expression = Vue.queryFields[c].expression;
        bizViewColum.push(field);        
      }
      let columsJSON = JSON.stringify(bizViewColum);
      let bizViewJSON = JSON.stringify(Vue.bizView)
      Vue.$refs[bizView].validate((valid) => {
        if (valid) {
          Vue.AxiosPost("createQuery",{'bizViewJSON':bizViewJSON,'columsJSON':columsJSON},
            function(){
              Vue.$Message.success('成功!');
              Vue.closePage(event,'createQuery')
            }
          ); 
          Vue.$refs.Edit.deleteField();//在填写完查询器信息的时候，保存之前字段表操作                
        }else{
          Vue.$Message.error('失败!');
        }
      })

    }, 

    /*关闭当前页面*/
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


    /*关闭当前页面后，链接到资源页面*/
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


    /* 初始化sql编辑器 */      
    initSqlEdit(){
      let Vue = this;
      var myTextarea = $("#defineJSON")[0];
      Vue.sqlEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });
      if(!Vue.isCreate){
        Vue.sqlEditor.setOption("readOnly", true); 
      }
    },


    /*初始化编辑查询器数据，判断是新建操作还是编辑操作*/
    initEditBizViewData(to,from){
      let Vue = this;
      Vue.isCreate =  $.isEmptyObject(to.params);
      if(!Vue.isCreate){ //如果是编辑，通过路由接收到查询器信息以及字段数据
        let bizViewInfo = to.params.querybox;
        Vue.edit_queryMetaData = to.params.fieldTableData;
        if(bizViewInfo != null){
          Vue.bizView = bizViewInfo;
        }
      }
      if(Vue.isCreate){//如果是新建，信息初始化
        Vue.bizView = {
          name:'',
          alias:'',
          desc:'',
          dataSourceId:'',
          defineJSON:'select * from ...'
        }
      }     
    },

    /*选择数据库表字段*/
    selectTableFields(dataSourceId){
      let Vue = this;
      if(Vue.bizView.dataSourceId != ""){//根据所选的数据源，找到相应数据源名称，显示在数据树卡片
        for(var i in Vue.datasourceList){
          if(Vue.datasourceList[i].id == Vue.bizView.dataSourceId){
            Vue.datasourceName = Vue.datasourceList[i].name;
            break;
          }
        }
        Vue.bizView.dataSourceId = dataSourceId;
      }
    },

    /*预览SQL结果集数据*/
    previewSQLResult(){
      let Vue = this;
      Vue.showSQLResultModal = true;
      Vue.getQueryMetaData();
    },

    /*获取查询器元数据，该数据包括预览结果集，字段元数据，输出字段数据类型*/
    getQueryMetaData(){
      let Vue = this;
      Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
      let params = {
        'dateSourceId':Vue.bizView.dataSourceId,
        'sqlStament':Vue.bizView.defineJSON,
        'pageSize':Vue.pageSize
      };
      Vue.AxiosPost("previewBizView_extra",params,
        function(response){        
          if(response.data.success) 
            Vue.queryMetaData = response.data.content;
          else
            Vue.$Message.error('SQL Error: ' + response.data.content);
        });          
    }
      
  },
  mounted(){
    let Vue = this;
    Vue.initSqlEdit();
  },
  beforeMount(){
    let Vue = this;
    Vue.initEditBizViewData(Vue.$route);
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
  margin: -17px 20px;
}
.cd_button_box{
  margin-left: 38%;
}
.cd_button_box button{
  background-color: #008aff;
  width: 150px;
}
.cd_button_box button:hover{
  border:0;
}
.cd_button_pre{
  margin-right: 15px;
}
#createQuery .ivu-carousel{
  height: 560px;
  overflow-y: auto;
  -webkit-user-select: text;/*解决无法选中的问题*/ 
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}  
/*@media only screen and (min-width: 1600px) and (max-width: 1681px){
  #createQuery .ivu-carousel{
    height: 700px;
  }  
}
@media only screen and (min-width: 1681px) and (max-width: 1920px){
  #createQuery .ivu-carousel{
    height: 750px;
  }  
}*/
.preview_img{
  position: absolute;
  z-index: 100;
  bottom: 5px;
  right: 20px;
}
.preview_img>img{
  cursor: pointer;
}
</style>
