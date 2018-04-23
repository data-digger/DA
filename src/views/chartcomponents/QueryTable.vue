<template>
  <div class="tabs_style">
    <Tabs type="card" :animated="false" >
      <TabPane id='calculatedfield' label="计算字段">
        <Row class='addField' v-show='showAddCaculatedField'>
          <div class='addField_title'>Add Column</div>
          <Form ref='calculatedfield' :rules="ruleValidate">
            <Col span='22'>
              <FormItem label="columnName" :label-width="100" prop="columnName">
                <Input v-model='addCaculatedObj.columnName' :disabled='edit_disabled' placeholder="Enter something..."></Input>
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
            <Col span='20' v-show='addCaculatedObj.category == 0 ? false:true'>
              <FormItem label="Expression" :label-width="80">
                <textarea id='c_expression' v-model='addCaculatedObj.expression'></textarea>
              </FormItem>
            </Col>
            <Col span='12'  v-show='addCaculatedObj.category == 0 ? false:true'>
              <FormItem label="type" :label-width="80">
                <Input v-model='addCaculatedObj.columnType'placeholder="Enter something..."></Input>
              </FormItem> 
            </Col>
            <Col span='1' style='margin-top:8px' v-show='addCaculatedObj.category == 0 ? false:true'>
              <Spin  v-if='loadSpin'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Spin>
              <Spin  v-if='loadSpin_success' >
                <Icon type="checkmark"></Icon>
              </Spin>
            </Col>
          </Form>
          <Col span='24' class='save_addcalculatedField_buttonBox'>
            <div v-if='btn_add' style='display:inline-block'>
              <Button class='addcalculatedField_button' type="success" size="small" @click="save_calculatedfield('calculatedfield')">添加</Button> 
            </div>
            <div v-else='btn_add' style='display:inline-block'>
              <Button class='addcalculatedField_button'  type="success" size="small" @click="update_calculatedfield('calculatedfield')">更新</Button>
            </div>
            <Button class='addcalculatedField_button' type="error" size="small" @click='cancel_addCaculatedfield()'>取消</Button>  
            <img class='preview_addcalculatedField' src="./../../assets/img/page_preview.png" @click='preview_calculatedfield()'>
            <Modal
            v-model="showPreviewCaculatedield"
            width ="1200px"
            title="数据预览">
              <iviewtable :chartCmpContent ='calculatedfield_queryData'></iviewtable>        
            </Modal>            
          </Col>
        </Row>
        <Icon type="ios-plus" @click.native='add_caculated_field()' class='add_listColumn_Icon'></Icon>
        <Table 
          :columns="caculated_columns" 
          :data="caculated_TableData" 
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
                <Input  v-model='addMetricObj.columnName' placeholder="Enter something..."></Input>
              </FormItem> 
              <FormItem label="alias" :label-width="80" prop="alias">
                <Input  v-model='addMetricObj.columnAlias' placeholder="Enter something..."></Input>
              </FormItem>  
            </Col>
            <Col span='20'  v-show='addMetricObj.category == 0 ? false:true'>
              <FormItem label="Expression" :label-width="80">
                <textarea id='m_expression' v-model='addMetricObj.expression'></textarea>
              </FormItem>
            </Col>
            <Col span='12'  v-show='addMetricObj.category == 0 ? false:true'>
              <FormItem label="type" :label-width="80">
                <Input v-model='addMetricObj.columnType'placeholder="Enter something..."></Input>
              </FormItem> 
            </Col>
            <Col span='1' style='margin-top:8px' v-show='addMetricObj.category == 0 ? false:true'>
              <Spin  v-if='loadSpin'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Spin>
              <Spin  v-if='loadSpin_success' >
                <Icon type="checkmark"></Icon>
              </Spin>
            </Col>
            <Col span='24' class='save_addcalculatedField_buttonBox'>
              <div v-if='btn_add' style='display:inline-block'>
                <Button class='addcalculatedField_button' type="success" size="small" @click="save_metric('metric')">添加</Button> 
              </div>
              <div v-else='btn_add' style='display:inline-block'>
                <Button class='addcalculatedField_button'  type="success" size="small" @click="update_metric('calculatedfield')">更新</Button>
              </div>
              <Button class='addcalculatedField_button' type="error" size="small" @click='cancel_addMetric()'>取消</Button>
            </Col>
          </Form>
        </Row>
        <Icon type="ios-plus" @click.native='add_metric(2)' class='add_listColumn_Icon'></Icon>
        <Table 
          :columns="metric_columns" 
          :data='metric_TableData'
          :row-class-name="rowClassName">   
        </Table> 
      </TabPane>



    </Tabs>
  </div>
</template>
<script>
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/sql-hint.js"
import vbar from 'v-bar'
import expandRow from './EditField.vue'
import iviewtable from './Table.vue'
export default {
  props:['tableData','bizView'],
  components:{
    vbar,
    expandRow,
    iviewtable
  },
  computed:{
  },
  watch:{
    'tableData':'refreshTableData'
  },
  data(){
    return {
      loadSpin:false, //加载进度条
      loadSpin_success:false,//成功加载进度条
      btn_add:true,//添加按钮
      showAddCaculatedField:false,//显示添加字段框
      showAddMetric:false,//显示添加度量框
      showPreviewCaculatedield:false,//显示计算字段预览框
      edit_disabled:false,//不可编辑的选项
      calculatedfield_queryData:null,//计算字段查询数据
      edit_caculated_index:null,//被编辑计算字段选项的序号
      edit_metric_index:null,//被编辑度量选项的序号
      deleteItem:[],//被删除的选项
      addCaculatedObj:{},//计算字段对象
      addMetricObj:{},//度量对象
      caculated_columns:[],//计算字段列
      metric_columns:[],//度量列
      caculated_TableData:[],
      metric_TableData:[],
      caculated_sqlEditor:null,//计算字段sql编辑器
      metric_sqlEditor:null,//度量sql编辑器
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
      Vue.caculated_sqlEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });  
      Vue.caculated_sqlEditor.on('focus',function(){
        Vue.Spin_type_control();       
      });
      Vue.caculated_sqlEditor.on('blur',function(){
        Vue.addCaculatedObj.expression = Vue.caculated_sqlEditor.doc.getValue();
        Vue.intoType(1);
      });
    },

    /*初始化度量expression编辑器*/
    initMetricSql(){
      let Vue = this;
      var myTextarea = $("#m_expression")[0];
      Vue.metric_sqlEditor = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });  
      Vue.metric_sqlEditor.on('focus',function(){
        Vue.Spin_type_control();       
      });
      Vue.metric_sqlEditor.on('blur',function(){
        Vue.addMetricObj.expression = Vue.metric_sqlEditor.doc.getValue();
        Vue.intoType(2);
      });
    },

    /*进度条控制*/
    Spin_type_control(){
      let Vue = this;
      Vue.loadSpin = true;
      Vue.loadSpin_success = false;
    },

    /*根据所填写的expression判断类型*/
    intoType(category){
      let Vue = this;
      let param;
      if(category == 1){
        param = {
          dataSourceId:Vue.bizView.dataSourceId,
          bizViewSql : Vue.bizView.defineJSON,
          expression:Vue.addCaculatedObj.expression
        };
      }
      if(category == 2){
        param = {
            dataSourceId:Vue.bizView.dataSourceId,
            bizViewSql : Vue.bizView.defineJSON,
            expression:Vue.addMetricObj.expression
          };        
      }
      Vue.AxiosPost("calculatedfield",param,
        function(response){
          if(category == 1){
            Vue.addCaculatedObj.columnType = response.data.content.columsType[0];
            Vue.calculatedfield_queryData = response.data.content;
          }
          if(category == 2){
            Vue.addMetricObj.columnType = response.data.content.columsType[0];
            /*Vue.calculatedfield_queryData = response.data.content;  */          
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
      Vue.btn_add = true;//按钮更换为添加
      Vue.edit_disabled = false;//columnName 可编辑      
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
    add_caculated_field(){
      let Vue = this;      
      Vue.addCaculatedObj = Vue.initColumnModel(1);
      Vue.showAddCaculatedField = true;
      Vue.$nextTick(function(){
        if(Vue.caculated_sqlEditor == null){
          Vue.initCalculatedfieldSql();
        }
        Vue.caculated_sqlEditor.setValue(Vue.addCaculatedObj.expression);
      })       
    },

    /*添加度量*/
    add_metric(){
      let Vue = this;      
      Vue.addMetricObj = Vue.initColumnModel(2);
      Vue.showAddMetric = true;
      Vue.$nextTick(function(){
        if(Vue.metric_sqlEditor == null){
          Vue.initMetricSql();
        }
        Vue.metric_sqlEditor.setValue(Vue.addMetricObj.expression);
      })       
    },

    /*插入到计算字段表中*/
    save_calculatedfield(field){
      let Vue = this;
      Vue.$refs[field].validate((valid) => {
        if(valid){
          Vue.caculated_TableData.push(Vue.addCaculatedObj);
          Vue.cancel_addCaculatedfield();
        }else{
          Vue.$Message.error('请输入正确的信息!');
        }
      })  
    },
    
    /*插入度量表中*/
    save_metric(field){
      let Vue = this;
      Vue.$refs[field].validate((valid) => {
        if(valid){
          Vue.metric_TableData.push(Vue.addMetricObj);
          Vue.cancel_addMetric();
        }else{
          Vue.$Message.error('请输入正确的信息!');
        }
      })  
    },

    /*预览计算字段表数据*/
    preview_calculatedfield(){
      let Vue = this;
      Vue.showPreviewCaculatedield = true;
    },

    
    /*预览度量表数据*/
/*    preview_metric(){
      let Vue = this;
      Vue.metric_preview = true;
    },*/

    /*编辑计算字段表字段*/
    editCaculatedField(params){
      let Vue =this;
      Vue.cancel_addCaculatedfield();
      Vue.showAddCaculatedField = true;//展开编辑页面
      Vue.btn_add = false;//新建按钮改为更新按钮
      Vue.edit_disabled = true;//columnName 不可编辑
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
        if(Vue.addCaculatedObj.category == 1 && Vue.caculated_sqlEditor == null){
          //准备好数据后，如果是计算字段，加载sql编辑器，并且是第一次加载
          Vue.initCalculatedfieldSql();      
        }
        if(Vue.addCaculatedObj.category == 1){
          Vue.caculated_sqlEditor.setValue(Vue.addCaculatedObj.expression);
        }
        
      }) 
      Vue.edit_caculated_index = params.index;
    },


    /*编辑计算字段表字段*/
    editMetric(params){
      let Vue =this;
      Vue.cancel_addMetric();
      Vue.showAddMetric = true;//展开编辑页面
      Vue.btn_add = false;//新建按钮改为更新按钮
      Vue.edit_disabled = true;//columnName 不可编辑
      Vue.addMetricObj.columnName = params.row.columnName;
      Vue.addMetricObj.columnType = params.row.columnType;
      Vue.addMetricObj.columnAlias = params.row.columnAlias;
      Vue.addMetricObj.expression = params.row.expression;
      Vue.$nextTick(function(){
        if(Vue.addMetricObj.category == 2 && Vue.metric_sqlEditor == null){
          Vue.initMetricSql();      
        }
        if(Vue.addMetricObj.category == 2){
          Vue.metric_sqlEditor.setValue(Vue.addMetricObj.expression);
        }
        
      }) 
      Vue.edit_metric_index = params.index;
    },

    /*点击更新计算字段*/
    update_calculatedfield(){
      let Vue = this;
      if(Vue.edit_caculated_index !=null){
        Vue.caculated_TableData[Vue.edit_caculated_index].columnName = Vue.addCaculatedObj.columnName;
        Vue.caculated_TableData[Vue.edit_caculated_index].columnType = Vue.addCaculatedObj.columnType;
        Vue.caculated_TableData[Vue.edit_caculated_index].columnAlias = Vue.addCaculatedObj.columnAlias;
        Vue.caculated_TableData[Vue.edit_caculated_index].groupby = Vue.addCaculatedObj.groupby;
        Vue.caculated_TableData[Vue.edit_caculated_index].filterable = Vue.addCaculatedObj.filterable;
        Vue.caculated_TableData[Vue.edit_caculated_index].countDistinct = Vue.addCaculatedObj.countDistinct;
        Vue.caculated_TableData[Vue.edit_caculated_index].sum = Vue.addCaculatedObj.sum;
        Vue.caculated_TableData[Vue.edit_caculated_index].max = Vue.addCaculatedObj.max;
        Vue.caculated_TableData[Vue.edit_caculated_index].min = Vue.addCaculatedObj.min;
        Vue.caculated_TableData[Vue.edit_caculated_index].category = Vue.addCaculatedObj.category;
        Vue.caculated_TableData[Vue.edit_caculated_index].expression = Vue.addCaculatedObj.expression;        
      }

      Vue.cancel_addCaculatedfield();
    },
    
    /*点击度量*/
    update_metric(){
      let Vue = this;
      if(Vue.edit_metric_index !=null){
        Vue.metric_TableData[Vue.edit_metric_index].columnName = Vue.addMetricObj.columnName;
        Vue.metric_TableData[Vue.edit_metric_index].columnType = Vue.addMetricObj.columnType;
        Vue.metric_TableData[Vue.edit_metric_index].columnAlias = Vue.addMetricObj.columnAlias;
        Vue.metric_TableData[Vue.edit_metric_index].expression = Vue.addMetricObj.expression;        
      }

      Vue.cancel_addMetric();
    },

    /*取消添加计算字段操作*/
    cancel_addCaculatedfield(){
      let Vue = this;
      Vue.showAddCaculatedField = false;
    },
    
    /*取消添加度量操作*/
    cancel_addMetric(){
      let Vue = this;
      Vue.showAddMetric = false;
    },

    /*保存表编辑*/
    saveEdit(){
      let Vue = this;
      //将字段编辑表数据存储到store
      Vue.$store.commit("save_query_fieldEdit_table",Vue.caculated_TableData.concat(Vue.metric_TableData));        
    },

    /*删除表字段*/
    delete_field(){
      let Vue = this;
      Vue.AxiosPost("delete_field",{columnsJSON:JSON.stringify(Vue.deleteItem)},function(response){});  
    },

    /*计算字段表*/
    drawCaculatedTable (caculated_tableData){
      let Vue = this;
      if(Vue.tableData != null){
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
                Vue.deleteItem.push(params.row);
                Vue.caculated_TableData.splice(params.index,1);  
                Vue.cancel_addCaculatedfield();            
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
      })
      var rows = [];
      for(let r in caculated_tableData){
        rows.push({
          'columnName':caculated_tableData[r].stringHeader,
          'columnType':caculated_tableData[r].columnType,
          'columnAlias':caculated_tableData[r].stringHeader,            
          'groupby':0,
          'filterable':0,
          'countDistinct':0,
          'sum':0,
          'max':0,
          'min':0,
          'category':0,
          'expression':null
        });
      }
      Vue.caculated_TableData = rows;                 
    }
    Vue.caculated_columns = cols;
     
    },

    /*度量表*/
    drawMetricTable(metric_TableData){
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
                Vue.deleteItem.push(params.row);
                Vue.metric_TableData.splice(params.index,1);    
                Vue.cancel_addMetric();             
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
      var rows = [];
      for(let r in metric_TableData){
        rows.push({
          'columnName':metric_TableData[r].stringHeader,
          'columnType':metric_TableData[r].columnType,
          'columnAlias':metric_TableData[r].stringHeader,            
        });
      }
      Vue.metric_TableData = rows;                 
      Vue.metric_columns = cols;
    },

    /*根据columnType判断tab类型*/
    dataFilter(){
      let Vue = this;
      if(!Vue.tableData.stringHeaders){
        Vue.caculated_TableData = Vue.tableData; 
        return;
      };
      var caculated_tableData = [];
      var metric_TableData = [];
      for(let i in Vue.tableData.columsType){
        var columnType = Vue.tableData.columsType[i];
        var stringHeader = Vue.tableData.stringHeaders[i];
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
            metric_TableData.push({'columnType':columnType,'stringHeader':stringHeader});
          break;
          default:caculated_tableData.push({'columnType':columnType,'stringHeader':stringHeader});
        }
        
      };
      
      Vue.drawMetricTable(metric_TableData);
      Vue.drawCaculatedTable(caculated_tableData);
    },

    /*刷新表数据*/
    refreshTableData(){
      let Vue = this;
      Vue.dataFilter();
    },
    
    /*表格行样式*/
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
