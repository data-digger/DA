<template>
  <div class="tabs_style">
    <Tabs type="card" :animated="false" >
      <TabPane id='calculatedfield' label="计算字段">
        <Row class='addcalculatedField' v-show='addcalculatedField_show'>
          <div class='addcalculatedField_title'>Add Column</div>
          <Form ref='calculatedfield' :rules="ruleValidate">
            <Col span='22'>
              <FormItem label="columnName" :label-width="100" prop="columnName">
                <Input v-model='modal_addField_obj.columnName' :disabled='column_disabled' placeholder="Enter something..."></Input>
              </FormItem> 
              <FormItem label="alias" :label-width="80" prop="alias">
                <Input v-model='modal_addField_obj.columnAlias' placeholder="Enter something..."></Input>
              </FormItem>  
            </Col>
            <Col span=3>
              <FormItem label="Groupable" :label-width="80" prop="Groupable">
                <Checkbox v-model='modal_addField_obj.groupby' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Filterable" :label-width="80">
                <Checkbox v-model='modal_addField_obj.filterable' :true-value ='1' :false-value ='0' ></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Count" :label-width="80">
                <Checkbox v-model='modal_addField_obj.countDistinct' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Sum" :label-width="80">
                <Checkbox v-model='modal_addField_obj.sum' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>
            <Col span=3>
              <FormItem label="Max" :label-width="80">
                <Checkbox v-model='modal_addField_obj.max' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col> 
            <Col span=3>
              <FormItem label="Min" :label-width="80">
                <Checkbox v-model='modal_addField_obj.min' :true-value ='1' :false-value ='0'></Checkbox>
              </FormItem>
            </Col>         
            <Col span='20' v-show='modal_addField_obj.category == 1 ? true:false'>
              <FormItem label="Expression" :label-width="80">
            <!--     <Input type='textarea' @on-focus='Spin_type_f'  @on-blur='intoType'placeholder="a valid SQL expression as support by the underlying backend.Example:substr(name,1,1)" v-model='modal_addField_obj.expression'></Input> -->
                <textarea id='c_expression' v-model='modal_addField_obj.expression'></textarea>
              </FormItem>
            </Col>
            <Col span='12'  v-show='modal_addField_obj.category == 1 ? true:false'>
              <FormItem label="type" :label-width="80">
                <Input v-model='modal_addField_obj.columnType'placeholder="Enter something..."></Input>
              </FormItem> 
            </Col>
            <Col span='1' style='margin-top:8px' v-show='modal_addField_obj.category == 1 ? true:false'>
              <Spin  v-if='Spin_type'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Spin>
              <Spin  v-if='Spin_type_s' >
                <Icon type="checkmark"></Icon>
              </Spin>
            </Col>
          </Form>
          <Col span='24' class='save_addcalculatedField_buttonBox'>
            <div v-if='create_button' style='display:inline-block'>
              <Button class='addcalculatedField_button' type="success" size="small" @click="save_calculatedfield('calculatedfield')">添加</Button> 
            </div>
            <div v-else='create_button' style='display:inline-block'>
              <Button class='addcalculatedField_button'  type="success" size="small" @click="update_calculatedfield('calculatedfield')">更新</Button>
            </div>
            <Button class='addcalculatedField_button' type="error" size="small" @click='cancel_addCalculatedfield()'>取消</Button>  
            <img class='preview_addcalculatedField' src="./../../assets/img/page_preview.png" @click='preview_calculatedfield()'>
            <Modal
            v-model="calculatedFieldPreview"
            width ="1200px"
            title="数据预览">
              <iviewtable :chartCmpContent ='calculatedfieldData'></iviewtable>        
            </Modal>            
          </Col>
        </Row>
        <Icon type="ios-plus" @click.native='add_calculatedfield()' class='add_listColumn_Icon'></Icon>
        <Table 
          :columns="columns" 
          :data="currentTableData" 
          ref='table'
          :row-class-name="rowClassName" >   
        </Table>      
      </TabPane>



      <TabPane label="度量">
        <Row>
          <div class='addcalculatedField_title'>Add Metric</div>
          <Form>
            <Col span='22'>
              <FormItem label="columnName" :label-width="100" prop="columnName">
                <Input placeholder="Enter something..."></Input>
              </FormItem> 
              <FormItem label="alias" :label-width="80" prop="alias">
                <Input placeholder="Enter something..."></Input>
              </FormItem>  
            </Col>
          </Form>
        </Row>
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
      Spin_type:false, 
      Spin_type_s:false,
      create_button:true,
      addcalculatedField_show:false,
      calculatedFieldPreview:false,
      column_disabled:false,
      calculatedfieldData:null,
      edit_index:null,
      delete_item:[],
      modal_addField_obj:{},
      columns:[],
      currentTableData:[],
      total:null,
      pageSize:4,
      historyData:null,
      sqlEditor2:null,
      ruleValidate:{
       /* columnName: [{ required: true, message: '字段名不能为空',trigger: 'blur'}]*/
      }
    }
  },  
  methods:{

    /*初始化计算字段expression编辑器*/
    initCalculatedfield(){
      let Vue = this;
      var myTextarea = $("#c_expression")[0];
      Vue.sqlEditor2 = CodeMirror.fromTextArea(myTextarea,{
        lineNumbers: true,  
        extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
        mode: {name: "text/x-mysql"},  
        dragDrop: true
      });  
      Vue.sqlEditor2.on('focus',function(){
        Vue.Spin_type_f();       
      });
      Vue.sqlEditor2.on('blur',function(){
        Vue.modal_addField_obj.expression = Vue.sqlEditor2.doc.getValue();
        Vue.intoType();
      });
    },

    /*进度条控制*/
    Spin_type_f(){
      let Vue = this;
      Vue.Spin_type = true;
      Vue.Spin_type_s = false;
    },

    /*根据所填写的expression判断类型*/
    intoType(){
      let Vue = this;
      let param = {
        dataSourceId:Vue.bizView.dataSourceId,
        bizViewSql : Vue.bizView.defineJSON,
        expression:Vue.modal_addField_obj.expression
      };
      Vue.AxiosPost("calculatedfield",param,
        function(response){
          Vue.modal_addField_obj.columnType = response.data.content.columsType[0];
          Vue.calculatedfieldData = response.data.content;
          Vue.Spin_type = false;
          Vue.Spin_type_s = true;
        },
        function(){
          Vue.$Message.error('请输入正确的expression!');
        }
      )        
    },

    /*添加计算字段*/
    add_calculatedfield(){
      let Vue = this;      
      Vue.create_button = true;//按钮更换为添加
      Vue.column_disabled = false;//columnName 可编辑
      Vue.modal_addField_obj = {
        'columnName':null,
        'columnType':null,
        'columnAlias':null,
        'groupby':0,
        'filterable':0,
        'countDistinct':0,
        'sum':0,
        'max':0,
        'min':0,
        'category':1,
        'expression':''
      };
      Vue.addcalculatedField_show = true;
      Vue.$nextTick(function(){//准备好数据后，加载sql编辑器
        if(Vue.modal_addField_obj.category == 1 && Vue.sqlEditor2 == null){
          Vue.initCalculatedfield();      
        }
        Vue.sqlEditor2.setValue(Vue.modal_addField_obj.expression);
      })            
    },

    /*插入到字段表中*/
    save_calculatedfield(calculatedfield){
      let Vue = this;
      Vue.$refs[calculatedfield].validate((valid) => {
        if(valid){
          Vue.currentTableData.push(Vue.modal_addField_obj);
          Vue.cancel_addCalculatedfield();
        }else{
          Vue.$Message.error('请输入正确的信息!');
        }
      })  
    },

    /*预览计算字段表数据*/
    preview_calculatedfield(){
      let Vue = this;
      Vue.calculatedFieldPreview = true;
    },

    /*编辑表字段*/
    EditField(params){
      let Vue =this;
      Vue.cancel_addCalculatedfield();
      Vue.addcalculatedField_show = true;//展开编辑页面
      Vue.create_button = false;//新建按钮改为更新按钮
      Vue.column_disabled = true;//columnName 不可编辑
      Vue.modal_addField_obj.columnName = params.row.columnName;
      Vue.modal_addField_obj.columnType = params.row.columnType;
      Vue.modal_addField_obj.columnAlias = params.row.columnAlias;
      Vue.modal_addField_obj.groupby = params.row.groupby;
      Vue.modal_addField_obj.filterable = params.row.filterable;
      Vue.modal_addField_obj.countDistinct = params.row.countDistinct;
      Vue.modal_addField_obj.sum = params.row.sum;
      Vue.modal_addField_obj.max = params.row.max;
      Vue.modal_addField_obj.min = params.row.min;
      Vue.modal_addField_obj.category = params.row.category;
      Vue.modal_addField_obj.expression = params.row.expression;
      Vue.$nextTick(function(){//准备好数据后，加载sql编辑器
        if(Vue.modal_addField_obj.category == 1 && Vue.sqlEditor2 == null){
          Vue.initCalculatedfield();      
        }
        Vue.sqlEditor2.setValue(Vue.modal_addField_obj.expression);
      }) 
      Vue.edit_index = params.index;
    },

    /*点击更新计算字段*/
    update_calculatedfield(){
      let Vue = this;
      if(Vue.edit_index){
        Vue.currentTableData[Vue.edit_index].columnName = Vue.modal_addField_obj.columnName;
        Vue.currentTableData[Vue.edit_index].columnType = Vue.modal_addField_obj.columnType;
        Vue.currentTableData[Vue.edit_index].columnAlias = Vue.modal_addField_obj.columnAlias;
        Vue.currentTableData[Vue.edit_index].groupby = Vue.modal_addField_obj.groupby;
        Vue.currentTableData[Vue.edit_index].filterable = Vue.modal_addField_obj.filterable;
        Vue.currentTableData[Vue.edit_index].countDistinct = Vue.modal_addField_obj.countDistinct;
        Vue.currentTableData[Vue.edit_index].sum = Vue.modal_addField_obj.sum;
        Vue.currentTableData[Vue.edit_index].max = Vue.modal_addField_obj.max;
        Vue.currentTableData[Vue.edit_index].min = Vue.modal_addField_obj.min;
        Vue.currentTableData[Vue.edit_index].category = Vue.modal_addField_obj.category;
        Vue.currentTableData[Vue.edit_index].expression = Vue.modal_addField_obj.expression;        
      }

      Vue.cancel_addCalculatedfield();
    },

    /*取消添加计算字段操作*/
    cancel_addCalculatedfield(){
      let Vue = this;
      Vue.addcalculatedField_show = false;
    },
    
    /*保存表编辑*/
    saveEdit(){
      let Vue = this;
      //将字段编辑表数据存储到store
      Vue.$store.commit("save_query_fieldEdit_table",Vue.currentTableData);        
    },

    /*删除表字段*/
    delete_field(){
      let Vue = this;
      Vue.AxiosPost("delete_field",{columnsJSON:JSON.stringify(Vue.delete_item)},function(response){});  
    },

    /*画表*/
    drawTable (){
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
                  for(let i in Vue.currentTableData){
                    if(Vue.currentTableData[i].id == params.row.id){
                      Vue.delete_item.push(Vue.currentTableData[i]);
                      Vue.currentTableData.splice(i,1);
                    }
                  }               
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
                Vue.EditField(params);
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
      
      var rowData = Vue.tableData;
      if(!rowData.stringHeaders){
        Vue.currentTableData = rowData; 
      }else{
        var rows = [];
        var stringHeaders = rowData.stringHeaders;
        var columnType = rowData.columsType;
        for(let r in stringHeaders){
          rows.push({
            'columnName':stringHeaders[r],
            'columnType':columnType[r],
            'columnAlias':stringHeaders[r],            
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
        Vue.total = rows.length;
        Vue.historyData = rows;
        Vue.currentTableData = Vue.historyData;                 
      }
      Vue.columns = cols; 
    }       
    },

    /*刷新表数据*/
    refreshTableData(){
      let Vue = this;
      Vue.drawTable();
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
#calculatedfield .CodeMirror{
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
.addcalculatedField{
  background-color: #ffffff;
  padding: 15px 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #dadcdf;
}
.addcalculatedField_button{
  margin-top:-22px;
}
.addcalculatedField_title{
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
