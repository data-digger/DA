<template>
<!--   <Row  style="padding:20px 0px">
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
  </Row> -->
  <div>
    <Carousel v-model="value" :dots="setting.dots" :arrow="setting.arrow" ref='slide'>


      <CarouselItem>
        <div class="demo-carousel">
          <Row style="padding:15px 0px 0px 20px">
            <Col span='11'>
              <Form :label-width="60" style='margin:5px 5px 0px 0px;'>
                <FormItem label="数据源" prop="dataSourceId">
                    <Select class="form-control" v-model='bizView.dataSourceId' @on-change='selectTableFields'>         
                        <Option v-for = 'datasource in datasourceList' :key='datasource.id' :value="datasource.id" >{{datasource.name}}</Option>
                    </Select>
                </FormItem>
              </Form>
              <treeBox :datasourceId ='bizView.dataSourceId' :treeName='datasourceName'></treeBox>             
            </Col>
            <Col span='12'>
              <Card  style='margin:10px'>
                <p slot="title">sql定义</p><!-- <button @click="copyHtml()">copy</button> -->
                <textarea id='defineJSON' v-model ="bizView.defineJSON"></textarea>
                <p style='padding-left: 95%;'>
                  <Tooltip content="预览表数据" placement="top-end" always>
                    <Button type="ghost" shape="circle" icon="ios-search" @click='previewTable()'></Button>
                  </Tooltip>
                </p>
              </Card>
              <Modal
              v-model="modalPreview"
              width ="1200px"
              title="数据预览">
                 <iviewtable :chartCmpContent='currentTableData' :pageSize='pageSize'></iviewtable>        
              </Modal>
            </Col>
          </Row>
        </div>
      </CarouselItem>



      <CarouselItem>
        <div class="demo-carousel">
           <Row>
            <Col span="24">
            <editquerytable :tableData ='currentTableData'></editquerytable>
            </Col>
           </Row>
          
        </div>
      </CarouselItem>


      <CarouselItem>
        <div class="demo-carousel">
          <Row  style="padding:20px 20px">
              <Col span="24">
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
                </Form>
              </Col>
            </Row>
        </div>
      </CarouselItem>


    </Carousel>
    <Row  class='button'>
      <Button type="primary" @click='pre()'>上一步</Button>
      <Button v-if="!finished" type="primary" @click='next()'>下一步</Button>
      <Button v-if="finished" type="primary" @click='save("bizView")'>保存</Button>
    </Row> 
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'
import treeBox from './../paramcomponents/Tree'
import editquerytable from './../chartcomponents/QueryTable'
import iviewtable from './../chartcomponents/Table'
export default {
  name:"createQuery",
  components:{
    treeBox,
    editquerytable,
    iviewtable
  },
  computed:{
  ...mapGetters({
    datasourceList:'datasourceList',
    paramList:'paramList',
    query_fieldEdit_table:'query_fieldEdit_table'
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
      finished:false,
      value:0,
      pageSize:null,
      modalPreview:false,
      datasourceName:null,
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
      currentTableData:null
    }
  },
  methods:{
    //后一步操作
    next() {
      let Vue = this;
      if(Vue.value <3){
        Vue.$refs.slide.arrowEvent(1);
        if(Vue.value == 1){
          //如果用户已经预览了表格
          if(Vue.currentTableData != null){
            return;
          }else{//如果用户没有预览表格
            Vue.getpreviewData();      
          } 
          //将字段编辑表数据存储到store
          Vue.$store.commit("save_query_fieldEdit_table",Vue.currentTableData);         
        }
        if(Vue.value == 2){
          console.log(Vue.query_fieldEdit_table);
          Vue.finished = true;
        }
      }
    },

    //前一步操作
    pre() {
      let Vue = this;
      if(Vue.value !=0){
        Vue.$refs.slide.arrowEvent(-1);
        Vue.finished = false;
        Vue.currentTableData = null;
      }
    },

    //创建查询器
    save(bizView){
      let Vue = this;
      //保存查询器表。包含查询器名称，别名,描述，数据源id,sql;
      //保存字段编辑表。包含查询器id，字段名称，别名，类型...
      Vue.bizView.defineJSON = Vue.sqlEditor.doc.getValue();
      let bizViewColum = [];
      for(var c in Vue.query_fieldEdit_table){
        let field_obj = {};
        field_obj.columnName = Vue.query_fieldEdit_table[c].columnNames;
        field_obj.columnAlias = Vue.query_fieldEdit_table[c].columnsAlias;
        field_obj.columnType = Vue.query_fieldEdit_table[c].Type;
        field_obj.groupby = Vue.query_fieldEdit_table[c].GroupBy;
        field_obj.filterable = Vue.query_fieldEdit_table[c].Filterable;
        field_obj.countDistinct = Vue.query_fieldEdit_table[c].CountDistinct;
        field_obj.sum = Vue.query_fieldEdit_table[c].sum;
        field_obj.min = Vue.query_fieldEdit_table[c].min;
        field_obj.max = Vue.query_fieldEdit_table[c].max;
        bizViewColum.push(field_obj);        
      }
      let columsJSON = JSON.stringify(bizViewColum);
      let bizViewJSON = JSON.stringify(Vue.bizView)
      Vue.$refs[bizView].validate((valid) => {
        if (valid) {
          Vue.AxiosPost("createQuery",{'bizViewJSON':bizViewJSON,'columsJSON':columsJSON},
            function(){
              Vue.$Message.success('成功!');
              Vue.closePage(event,'createQuery')});             
        }else{
          Vue.$Message.error('失败!');
        }
      })
    }, 

    //关闭当前页面
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


    //关闭当前页面后，链接到资源页面
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


    //初始化sql编辑器       
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
/*

    drag(ev){
      ev.dataTransfer.setData("Text",`^${ev.target.id}^`);
    },*/

    initBizViewData(to,from){
      let Vue = this;
      Vue.isCreate =  $.isEmptyObject(to.params)
      if(Vue.isCreate == false){     
        let bizViewInfo = to.params;
        if(bizViewInfo != null){
          Vue.bizView = bizViewInfo;       
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

    //选择数据库表字段
    selectTableFields(dataSourceId){
      let Vue = this;
      if(Vue.bizView.dataSourceId != ""){
        for(var i in Vue.datasourceList){
          if(Vue.datasourceList[i].id == Vue.bizView.dataSourceId){
            Vue.datasourceName = Vue.datasourceList[i].name;
            break;
          }
        }
        Vue.bizView.dataSourceId = dataSourceId;
      }
    },

    //预览表
    previewTable(){
      let Vue = this;
      Vue.modalPreview = true;
      Vue.getpreviewData();
    },

    //获取预览表的数据，包括字段编辑表数据
    getpreviewData(){
      let Vue = this;
      Vue.pageSize = 3;
      let params = {
        'dateSourceId':Vue.bizView.dataSourceId,
        'sqlStament':Vue.sqlEditor.doc.getValue(),
        'pageSize':Vue.pageSize
      };
      Vue.AxiosPost("previewBizView",params,
        function(response){         
          Vue.currentTableData = response.data.content;
        },
        function(){
          Vue.$Message.error('请输入正确sql!')
        })  
      ;
         
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
  .tableBox{
    margin: -17px 20px;
  }
  .button {
    text-align: center;
    margin-top: 0;
  }
  .ivu-carousel{
    height: 550px;
  }
</style>
