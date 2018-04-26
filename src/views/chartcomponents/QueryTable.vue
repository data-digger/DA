<template>
  <div class="tabs_style">
    <Tabs type="card" :animated="false" >
      <TabPane id='calculatedfield' label="计算字段">
        <Row class='addField' v-show='showAddCaculatedField'>
          <div class='addField_title'>Add Column</div>
          <Form ref='calculatedfield' :rules="ruleValidate">
            <Col span='22'>
              <FormItem label="columnName" :label-width="100" prop="columnName">
                <Input v-model='addCaculatedObj.columnName' :disabled='canEdit' placeholder="Enter something..."></Input>
              </FormItem> 
              <FormItem label="alias" :label-width="80" prop="alias">
                <Input v-model='addCaculatedObj.columnAlias' placeholder="Enter something..."></Input>
              </FormItem>  
            </Col>
            <Col span=3>
              <FormItem label="Groupable" :label-width="80" prop="Groupable">
                <Checkbox v-model='addCaculatedObj.groupby' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Filterable" :label-width="80">
                <Checkbox v-model='addCaculatedObj.filterable' :true-value ='1' :false-value ='0' ></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Count" :label-width="80">
                <Checkbox v-model='addCaculatedObj.countDistinct' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Sum" :label-width="80">
                <Checkbox v-model='addCaculatedObj.sum' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Max" :label-width="80">
                <Checkbox v-model='addCaculatedObj.max' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col> 
            <Col span=3>
              <FormItem label="Min" :label-width="80">
                <Checkbox v-model='addCaculatedObj.min' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>         
            <Col span='20' v-show='addCaculatedObj.category != 0 ? true:false'>
              <FormItem label="Expression" :label-width="80">
                <textarea id='c_expression' v-model='addCaculatedObj.expression'></textarea>
              </FormItem>
            </Col>
            <Col span='12' v-show='addCaculatedObj.category != 0 ? true:false'>
              <FormItem label="type" :label-width="80">
                <Input v-model='addCaculatedObj.columnType'placeholder="Enter something..."></Input>
              </FormItem> 
            </Col>
            <Col span='1' style='margin-top:8px' v-show='addCaculatedObj.category != 0 ? true:false'>
              <Spin  v-if='loadSpin'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Spin>
              <Spin  v-if='loadSpin_success' >
                <Icon type="checkmark"></Icon>
              </Spin>
            </Col>
          </Form>
          <Col span='24' class='save_addcalculatedField_buttonBox'>
            <div v-if='isAddBtn' style='display:inline-block'>
              <Button class='addcalculatedField_button' type="success" size="small" @click="saveCalculateField('calculatedfield')">添加</Button> 
            </div>
            <div v-else='isAddBtn' style='display:inline-block'>
              <Button class='addcalculatedField_button'  type="success" size="small" @click="updateCalculateField('calculatedfield')">更新</Button>
            </div>
            <Button class='addcalculatedField_button' type="error" size="small" @click='hideCaculatePanel()'>取消</Button>  
            <img class='preview_addcalculatedField' src="./../../assets/img/page_preview.png" @click='previewCalculateField()'>
            <Modal
            v-model="showPreviewCaculatedField"
            width ="1200px"
            title="数据预览">
              <iviewtable :chartCmpContent ='calculateFieldSampleData'></iviewtable>        
            </Modal>            
          </Col>
        </Row>
        <Icon type="ios-plus" @click.native='addCaculateField()' class='add_listColumn_Icon'></Icon>
        <Table 
          :columns="caculateColumns" 
          :data="caculateTableData" 
          ref='table'
          :row-class-name="rowClassName" >   
        </Table>      
      </TabPane>



      <TabPane  id='metric' label="度量">
        <Row  class='addField'  v-show='showAddMetric'>
          <div class='addField_title'>Add Metric</div>
          <Form  ref='metric' >
            <Col span='22'>
              <FormItem label="metricName" :label-width="100" prop="metricName">
                <Input  v-model='addMetricObj.columnName':disabled='canEdit' placeholder="Enter something..."></Input>
              </FormItem> 
              <FormItem label="alias" :label-width="80" prop="alias">
                <Input  v-model='addMetricObj.columnAlias' placeholder="Enter something..."></Input>
              </FormItem>  
            </Col>
            <Col span='20' v-show='addMetricObj.category != 0 ? true:false'>
              <FormItem label="Expression" :label-width="80">
                <textarea id='m_expression' v-model='addMetricObj.expression'></textarea>
              </FormItem>
            </Col>
            <Col span='12' v-show='addMetricObj.category != 0 ? true:false'>
              <FormItem label="type" :label-width="80">
                <Input v-model='addMetricObj.columnType'placeholder="Enter something..."></Input>
              </FormItem> 
            </Col>
            <Col span='1' style='margin-top:8px' v-show='addMetricObj.category != 0 ? true:false'>
              <Spin  v-if='loadSpin'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Spin>
              <Spin  v-if='loadSpin_success' >
                <Icon type="checkmark"></Icon>
              </Spin>
            </Col>
            <Col span='24' class='save_addcalculatedField_buttonBox'>
              <div v-if='isAddBtn' style='display:inline-block'>
                <Button class='addcalculatedField_button' type="success" size="small" @click="saveMetric('metric')">添加</Button> 
              </div>
              <div v-else='isAddBtn' style='display:inline-block'>
                <Button class='addcalculatedField_button'  type="success" size="small" @click="updateMetric('metric')">更新</Button>
              </div>
              <Button class='addcalculatedField_button' type="error" size="small" @click='hideMetricPanel()'>取消</Button>
              <img class='preview_addcalculatedField' src="./../../assets/img/page_preview.png" @click='previewMetric()'>
              <Modal
              v-model="showPreviewMetric"
              width ="1200px"
              title="数据预览">
                <iviewtable :chartCmpContent ='metricSampleData'></iviewtable>        
              </Modal> 
            </Col>
          </Form>
        </Row>
        <Icon type="ios-plus" @click.native='addMetric()' class='add_listColumn_Icon'></Icon>
        <Table 
          :columns="metricColumns" 
          :data='metricTableData'
          :row-class-name="rowClassName">   
        </Table> 
      </TabPane>



    </Tabs>
  </div>
</template>
<script>
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/sql-hint.js";
import vbar from 'v-bar';
import expandRow from './EditField.vue';
import iviewtable from './Table.vue';
const CATEGORY = {
  'RAW': 0,
  'CACULATE': 1,
  'METRIC': 2
};
export default {
  props:['queryMetaData','bizView','isCreate'],
  components:{
    vbar,
    expandRow,
    iviewtable
  },
  computed:{
  },
  watch:{
    'queryMetaData':'refreshCaculateAndMetric'
  },
  data(){
    return {
      loadSpin:false, //加载进度条
      loadSpin_success:false,//成功加载进度条
      isAddBtn:true,//添加按钮
      showAddCaculatedField:false,//显示添加字段框
      showAddMetric:false,//显示添加度量框
      showPreviewCaculatedField:false,//显示计算字段预览框
      showPreviewMetric:false,//显示度量预览框
      canEdit:false,//不可编辑的选项
      calculateFieldSampleData:null,//计算字段查询数据
      metricSampleData:null,//度量查询数据
      selectedCaculatedIndex:null,//被编辑计算字段选项的序号
      selectedMetricIndex:null,//被编辑度量选项的序号
      deleteItem:[],//被删除的选项
      addCaculatedObj:{},//计算字段对象
      addMetricObj:{},//度量对象
      caculateColumns:[],//计算字段列
      metricColumns:[],//度量列
      caculateTableData:[],
      metricTableData:[],
      caculatedSQLEditor:null,//计算字段sql编辑器
      metricSQLEditor:null,//度量sql编辑器
      ruleValidate:{
       /* columnName: [{ required: true, message: '字段名不能为空',trigger: 'blur'}]*/
      }
    }
  },  
  methods:{

    /*初始化计算字段expression编辑器*/
    initCalculatedfieldSql(){
      let Vue = this;
      var myTextarea = $("#c_expression")[0];
      Vue.caculatedSQLEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });  
      Vue.caculatedSQLEditor.on('focus',function(){
        Vue.Spin_type_control();       
      });
      Vue.caculatedSQLEditor.on('blur',function(){
        Vue.addCaculatedObj.expression = Vue.caculatedSQLEditor.doc.getValue();
        Vue.getExpressionData(CATEGORY.CACULATE);
      });
    },

    /*初始化度量expression编辑器*/
    initMetricSql(){
      let Vue = this;
      var myTextarea = $("#m_expression")[0];
      Vue.metricSQLEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });  
      Vue.metricSQLEditor.on('focus',function(){
        Vue.Spin_type_control();       
      });
      Vue.metricSQLEditor.on('blur',function(){
        Vue.addMetricObj.expression = Vue.metricSQLEditor.doc.getValue();
        Vue.getExpressionData(CATEGORY.METRIC);
      });
    },

    /*进度条控制*/
    Spin_type_control(){
      let Vue = this;
      Vue.loadSpin = true;
      Vue.loadSpin_success = false;
    },

    /*根据所填写的expression判断类型*/
    getExpressionData(category){
      let Vue = this;
      let param;
      if(category == CATEGORY.CACULATE){
        param = {
          dataSourceId:Vue.bizView.dataSourceId,
          bizViewSql : Vue.bizView.defineJSON,
          expression:Vue.addCaculatedObj.expression
        };
      }
      if(category == CATEGORY.METRIC){
        param = {
            dataSourceId:Vue.bizView.dataSourceId,
            bizViewSql : Vue.bizView.defineJSON,
            expression:Vue.addMetricObj.expression
          };        
      }
      Vue.AxiosPost("calculatedfield",param,
        function(response){
          if(category == CATEGORY.CACULATE){
            Vue.addCaculatedObj.columnType = response.data.content.columsType[0];
            Vue.calculateFieldSampleData = response.data.content;
          }
          if(category == CATEGORY.METRIC){
            Vue.addMetricObj.columnType = response.data.content.columsType[0];
            Vue.metricSampleData = response.data.content;         
          }
          Vue.loadSpin = false;
          Vue.loadSpin_success = true;
        },
        function(){
          Vue.$Message.error('请输入正确的expression!');
        }
      )        
    },

    /*初始化列*/
    initColumnModel(category){
      let Vue = this;      
      Vue.isAddBtn = true;//按钮更换为添加
      Vue.canEdit = false;//columnName 可编辑      
      return {
        'columnName':null,
        'columnType':null,
        'columnAlias':null,
        'groupby':0,
        'filterable':0,
        'countDistinct':0,
        'sum':0,
        'max':0,
        'min':0,
        'category':category,
        'expression':''
      };
    },

    /*添加计算字段*/
    addCaculateField(){
      let Vue = this;      
      Vue.addCaculatedObj = Vue.initColumnModel(CATEGORY.CACULATE);
      Vue.showAddCaculatedField = true;
      Vue.$nextTick(function(){
        if(Vue.caculatedSQLEditor == null){
          Vue.initCalculatedfieldSql();
        }
        Vue.caculatedSQLEditor.setValue(Vue.addCaculatedObj.expression);
      })       
    },

    /*添加度量*/
    addMetric(){
      let Vue = this;      
      Vue.addMetricObj = Vue.initColumnModel(CATEGORY.METRIC);
      Vue.showAddMetric = true;
      Vue.$nextTick(function(){
        if(Vue.metricSQLEditor == null){
          Vue.initMetricSql();
        }
        Vue.metricSQLEditor.setValue(Vue.addMetricObj.expression);
      })       
    },

    /*插入到计算字段表中*/
    saveCalculateField(field){
      let Vue = this;
      Vue.$refs[field].validate((valid) => {
        if(valid){
          Vue.caculateTableData.push(Vue.addCaculatedObj);
          Vue.hideCaculatePanel();
        }else{
          Vue.$Message.error('请输入正确的信息!');
        }
      })  
    },
    
    /*插入度量表中*/
    saveMetric(field){
      let Vue = this;
      Vue.$refs[field].validate((valid) => {
        if(valid){
          Vue.metricTableData.push(Vue.addMetricObj);
          Vue.hideMetricPanel();
        }else{
          Vue.$Message.error('请输入正确的信息!');
        }
      })  
    },

    /*预览计算字段表数据*/
    previewCalculateField(){
      let Vue = this;
      Vue.showPreviewCaculatedField = true;
      Vue.getExpressionData(CATEGORY.CACULATE);
    },

    
    /*预览度量表数据*/
    previewMetric(){
      let Vue = this;
      Vue.showPreviewMetric = true;
      Vue.getExpressionData(CATEGORY.METRIC);
    },

    /*编辑计算字段表字段*/
    editCaculatedField(params){
      let Vue =this;
      Vue.hideCaculatePanel();
      Vue.showAddCaculatedField = true;//展开编辑页面
      Vue.isAddBtn = false;//新建按钮改为更新按钮
      Vue.canEdit = true;//columnName 不可编辑
      Vue.addCaculatedObj.columnName = params.row.columnName;
      Vue.addCaculatedObj.columnType = params.row.columnType;
      Vue.addCaculatedObj.columnAlias = params.row.columnAlias;
      Vue.addCaculatedObj.groupby = params.row.groupby;
      Vue.addCaculatedObj.filterable = params.row.filterable;
      Vue.addCaculatedObj.countDistinct = params.row.countDistinct;
      Vue.addCaculatedObj.sum = params.row.sum;
      Vue.addCaculatedObj.max = params.row.max;
      Vue.addCaculatedObj.min = params.row.min;
      Vue.addCaculatedObj.category = params.row.category;
      Vue.addCaculatedObj.expression = params.row.expression;
      Vue.$nextTick(function(){
        if (Vue.addCaculatedObj.category == CATEGORY.CACULATE) {
          if (Vue.caculatedSQLEditor == null) {//准备好数据后，如果是计算字段，加载sql编辑器，并且是第一次加载
            Vue.initCalculatedfieldSql();   
          }   
          Vue.caculatedSQLEditor.setValue(Vue.addCaculatedObj.expression);
        }
      }) 
      Vue.selectedCaculatedIndex = params.index;
    },


    /*编辑度量表字段*/
    editMetric(params){
      let Vue =this;
      Vue.hideMetricPanel();
      Vue.showAddMetric = true;//展开编辑页面
      Vue.isAddBtn = false;//新建按钮改为更新按钮
      Vue.canEdit = true;//columnName 不可编辑
      Vue.addMetricObj.columnName = params.row.columnName;
      Vue.addMetricObj.columnType = params.row.columnType;
      Vue.addMetricObj.columnAlias = params.row.columnAlias;
      Vue.addMetricObj.category = params.row.category;
      Vue.addMetricObj.expression = params.row.expression;
      Vue.$nextTick(function(){
        if (Vue.addMetricObj.category == CATEGORY.METRIC ){
          if (Vue.metricSQLEditor == null){
             Vue.initMetricSql();
          }
          Vue.metricSQLEditor.setValue(Vue.addMetricObj.expression);      
        }
      }) 
      Vue.selectedMetricIndex = params.index;
    },

    /*点击更新计算字段*/
    updateCalculateField(){
      let Vue = this;
      if(Vue.selectedCaculatedIndex !=null){
        Vue.caculateTableData[Vue.selectedCaculatedIndex].columnName = Vue.addCaculatedObj.columnName;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].columnType = Vue.addCaculatedObj.columnType;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].columnAlias = Vue.addCaculatedObj.columnAlias;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].groupby = Vue.addCaculatedObj.groupby;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].filterable = Vue.addCaculatedObj.filterable;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].countDistinct = Vue.addCaculatedObj.countDistinct;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].sum = Vue.addCaculatedObj.sum;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].max = Vue.addCaculatedObj.max;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].min = Vue.addCaculatedObj.min;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].category = Vue.addCaculatedObj.category;
        Vue.caculateTableData[Vue.selectedCaculatedIndex].expression = Vue.addCaculatedObj.expression;        
      }

      Vue.hideCaculatePanel();
    },
    
    /*点击更新度量*/
    updateMetric(){
      let Vue = this;
      if(Vue.selectedMetricIndex !=null){
        Vue.metricTableData[Vue.selectedMetricIndex].columnName = Vue.addMetricObj.columnName;
        Vue.metricTableData[Vue.selectedMetricIndex].columnType = Vue.addMetricObj.columnType;
        Vue.metricTableData[Vue.selectedMetricIndex].columnAlias = Vue.addMetricObj.columnAlias;
        Vue.metricTableData[Vue.selectedMetricIndex].expression = Vue.addMetricObj.expression;        
      }
      Vue.hideMetricPanel();
    },

    /*取消添加计算字段操作*/
    hideCaculatePanel(){
      let Vue = this;
      Vue.showAddCaculatedField = false;
    },
    
    /*取消添加度量操作*/
    hideMetricPanel(){
      let Vue = this;
      Vue.showAddMetric = false;
    },

    /*保存表编辑*/
    saveQueryFields(){
      let Vue = this;
      //将字段编辑表数据存储到store
      Vue.$store.commit("saveQueryFields",Vue.caculateTableData.concat(Vue.metricTableData));        
    },

    /*删除表字段*/
    deleteField(){
      let Vue = this;
      Vue.AxiosPost("deleteField",{columnsJSON:JSON.stringify(Vue.deleteItem)},function(response){});  
    },

    /*画字段表，数据包含原始字段和计算字段*/
    drawFieldTable (caculatetableData){
    let Vue = this;
      var cols = [];
      cols.push({
        render: (h, params) => {
          return h('Icon',{
            props: {
              type: "trash-a"
            },
            style:{
              cursor:'pointer'
            },
            nativeOn:{
              'click':(event)=>{
                if(!Vue.isCreate){
                  for(let i in Vue.queryMetaData){
                    if(Vue.queryMetaData[i].id == Vue.bizView.id+"_"+params.row.columnName){
                      Vue.deleteItem.push(Vue.queryMetaData[i]);
                    }
                  }                  
                }

                Vue.caculateTableData.splice(params.index,1);  
                Vue.hideCaculatePanel();            
              }
            }
          })
        }
      },{
        render: (h, params) => {
          return h('Icon',{
            props: {
              type: "edit"
            },
            style:{
              cursor:'pointer'
            },
            nativeOn:{
              'click':(event)=>{
                Vue.editCaculatedField(params);
              }
            }
          })
        }
      },{
        "title":'columnName',
        "key":'columnName',
        "align":"center",
        'sortable': true,
      },{
        "title":'type',
        "key":'columnType',
        "align":"center",
        'width':150,
        'sortable': true,        
      },{
        "title":'alias',
        "key":'columnAlias',
        "align":"center",     
      },{
        "title":'groupby',
        "key":'groupby',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',{props:{'value':params.row.groupby == 1?true:false,'disabled':true}})
        }       
      },{
        "title":'filterable',
        "key":'filterable',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.filterable == 1?true:false,'disabled':true}})
        }                  
      },{
        "title":'countDistinct',
        "key":'countDistinct',
        "align":"center", 
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.countDistinct == 1?true:false,'disabled':true}})
        }       
      },{
        "title":'sum',
        "key":'sum',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.sum == 1?true:false,'disabled':true}})
        }        
      },{
        "title":'max',
        "key":'max',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.max == 1?true:false,'disabled':true}})
        }         
      },{
        "title":'min',
        "key":'min',
        "align":"center",
        'render':(h,params)=>{
          return h('Checkbox',
            {props:{'value':params.row.min == 1?true:false,'disabled':true}})
        }         
      });
      Vue.caculateTableData = caculatetableData;                 
      Vue.caculateColumns = cols;
     
    },

    /*度量表*/
    drawMetricTable(metricTableData){
      let Vue = this;
      var cols = [];
      cols.push({
        render: (h, params) => {
          return h('Icon',{//删除度量
            props: {
              type: "trash-a"
            },
            style:{
              cursor:'pointer'
            },
            nativeOn:{
              'click':(event)=>{
                if(!Vue.isCreate){
                  for(let i in Vue.queryMetaData){
                    if(Vue.queryMetaData[i].id == Vue.bizView.id+"_"+params.row.columnName){
                      Vue.deleteItem.push(Vue.queryMetaData[i]);
                    }
                  }                  
                }
                Vue.metricTableData.splice(params.index,1);    
                Vue.hideMetricPanel();             
              }
            }
          })
        }
      },{
        render: (h, params) => {
          return h('Icon',{
            props: {
              type: "edit"
            },
            style:{
              cursor:'pointer'
            },
            nativeOn:{
              'click':(event)=>{
                Vue.editMetric(params);
              }
            }
          })
        }
      },{
        "title":'Metric',
        "key":'columnName',
        "align":"center"       
      },{
        "title":'alias',
        "key":'columnAlias',
        "align":"center"       
      },{
        "title":'type',
        "key":'columnType',
        "align":"center"       
      });
      Vue.metricTableData = metricTableData;                 
      Vue.metricColumns = cols;
    },

    /*新建查询器的字段表判断，metric->category:2,original->category:0
      将数据按照度量，字段进行分割
      度量数据存放在metricTableData中
      计算字段和原始字段放在field_TableData中
    */
    renderQueryMetaDataForCreate(){
      let Vue = this;
      let field_TableData = [];
      let metricTableData = [];
      for(let i in Vue.queryMetaData.columsType){
        let columnType = Vue.queryMetaData.columsType[i];
        let stringHeader = Vue.queryMetaData.stringHeaders[i];
        switch(columnType){
          case "BIT":
          case "BIGINT":
          case "TINYINT":
          case "SMALLINT":
          case "INTEGER":
          case "FLOAT":
          case "DOUBLE":
          case "REAL":
          case "DECIMAL":
          case "NUMERIC":
            metricTableData.push({
              'columnType':columnType,
              'columnName':stringHeader,
              'columnAlias':stringHeader,
              'category':CATEGORY.METRIC,
              'expression':''});
          break;
          default:field_TableData.push({
            'columnType':columnType,
            'columnName':stringHeader,
            'columnAlias':stringHeader,
            'groupby':0,
            'filterable':0,
            'countDistinct':0,
            'sum':0,
            'max':0,
            'min':0,
            'category':CATEGORY.RAW,
            'expression':''});
        }
        
      };
      Vue.drawMetricTable(metricTableData);
      Vue.drawFieldTable(field_TableData);//包含计算字段和原始字段
    },

    /*编辑查询器的字段类型判断 metric->category:2, original->category:0, caculatedField->category:1
      将数据按照度量，字段进行分割
      度量数据存放在metricTableData中
      计算字段和原始字段放在field_TableData中
    */
    renderQueryMetaDataForEdit(){
      let Vue = this;
      let field_TableData = [];
      let metricTableData = [];
      for(let i in Vue.queryMetaData){
        if(Vue.queryMetaData[i].category == CATEGORY.METRIC){//度量
          metricTableData.push(Vue.queryMetaData[i]);
        }
        if(Vue.queryMetaData[i].category == CATEGORY.RAW || Vue.queryMetaData[i].category == CATEGORY.CACULATE){
          field_TableData.push(Vue.queryMetaData[i]);
        }        
      }
      Vue.drawMetricTable(metricTableData);
      Vue.drawFieldTable(field_TableData);//计算字段和原始字段
    },


    /*刷新计算字段、度量表格数据*/
    refreshCaculateAndMetric(){
      let Vue = this;
      if (Vue.isCreate) {
        Vue.renderQueryMetaDataForCreate();
      }else{
        Vue.renderQueryMetaDataForEdit();
      }
    },
    
    /*表格行样式,暂不启用*/
    rowClassName (row, index){
      if(index ==0){
        return 'tbody_first';
      }
      if(index % 2 == 1){
        return 'headRow_even'
      }
    }
  }
}
</script>


<style>
#createQuery .ivu-table th{
  height: 40px;
  border-bottom:1px solid #28313d;
}
#calculatedfield .CodeMirror,#metric .CodeMirror{
  height: 100px !important;
}
.tabs_style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0;
    background: #fff;
}
.tabs_style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    border-top: 1px solid #3399ff;
}
.tabs_style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
}
.add_listColumn_Icon{
  color:#2d8cf0;
  font-size:30px;
  margin-left:5px;
  cursor:pointer;
}
.addField{
  background-color: #ffffff;
  padding: 15px 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #dadcdf;
}
.addcalculatedField_button{
  margin-top:-22px;
}
.addField_title{
  height: 40px;
  font-size: 20px;
}
.preview_addcalculatedField{
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-bottom: 2px;
}
.wrapper {
  height: 520px;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
