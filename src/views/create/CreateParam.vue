<template>   
   <Form id="createParam" ref="param" :model="param" :rules="ruleValidate" :label-width="90">
      <Row>
            <Col span="24"> 
             <FormItem label="参数名称" prop="name">
                <Input v-model="param.name" placeholder="输入名称"></Input>
             </FormItem>
             <FormItem label="参数别名" prop="alias">
                <Input v-model="param.alias" placeholder="输入别名"></Input>
             </FormItem>
             <FormItem label="参数描述" prop="desc">
                <Input v-model="param.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
             </FormItem>
             <FormItem label="控件类型" prop="componenttype">
                <Select v-model="param.defineJSON.componenttype" placeholder="Select ...">
                   <Option value="date">日期</Option>
                   <Option value="list">列表</Option>
                   <Option value="Tree">树</Option>
                </Select>
             </FormItem>
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "date"?true:false'>
                <FormItem label="format类型" prop="formattype">
                    <Select v-model="param.defineJSON.formattype" placeholder="Select ...">
                       <Option value="yyyy-MM-dd">yyyy-MM-dd</Option>
                       <Option value="yyyy-MM">yyyy-MM</Option>
                    </Select>
                 </FormItem>                 
                 <FormItem prop="formattype"v-if = "param.defineJSON.formattype =='yyyy-MM-dd'?true:false" >
                    <datePicker :dateType = 'dateType.date' @sentDate = 'getDate'></datePicker>           
                 </FormItem>
                 <FormItem prop="formattype"v-if = "param.defineJSON.formattype =='yyyy-MM'?true:false"  >
                    <datePicker :dateType = 'dateType.month' @sentDate = 'getDate'></datePicker>
                 </FormItem>                   
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "list"?true:false'>
                <FormItem label="数据类型" prop="valuetype">
                    <Select v-model="param.defineJSON.valuetype" placeholder="Select ...">
                       <Option value="String">String</Option>
                       <Option value="Integer ">Integer </Option>
                       <Option value="Double ">Double </Option>
                    </Select>
                 </FormItem>
                <FormItem label="参数源类型" prop="valueSource">
                    <Select v-model="param.defineJSON.standbyDefine.valueSource" @on-change="changeValueSource" placeholder="Select ...">
                       <Option value="static">static</Option>
                       <Option value="SQL">SQL </Option>
                    </Select>
                </FormItem>
                <FormItem label="数据源" prop="dataSource" v-if = 'param.defineJSON.standbyDefine.valueSource == "SQL"?true:false'>
                    <Select v-model="param.defineJSON.standbyDefine.dataSourceID"  placeholder="Select ...">
                       <Option v-for='dataSource in datasourceList' :value="dataSource.id" :key='dataSource.id'>{{dataSource.name}}</Option>
                    </Select>
                </FormItem>                                 
                <FormItem label="候选值" prop="standbyDefine" v-if = 'param.defineJSON.standbyDefine.valueSource == "static"?true:false'>
                    <Col><Tag v-for='el in param.defineJSON.standbyDefine.values' checkable closable type='dot'color="green" :key='el.key'>{{el.value}}/{{el.key}}</Tag></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.value'><span slot="prepend">值</span>standbyData.standbyValue</Input></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.key'><span slot="prepend">码值</span>standbyData.standbyKey</Input></Col>
                    <Col span='4' style='padding-bottom:3px'><Button type="primary" size="small" @click='addStandByValue()'>添加</Button></Col>
                </FormItem>
                <FormItem label="缺省值" prop="defalutDefine"v-if = 'param.defineJSON.standbyDefine.valueSource == "static"?true:false'>
                    <Col span='12'>
                      <Select v-model = 'param.defineJSON.defalutDefine.key' placeholder="Select ...">
                          <Option v-for ='el in param.defineJSON.standbyDefine.values' :key='el.value' :value='el.key'>
                              {{el.value}}
                          </Option>                
                      </Select>
                    </Col> 
                </FormItem>
                <FormItem label="候选值" prop="standbyDefine" v-if = 'param.defineJSON.standbyDefine.valueSource == "SQL"?true:false'>
                    <textarea id='standbyDefineEditor'></textarea>
                </FormItem>                
                <FormItem label="缺省值" prop="defalutDefine"v-if = 'param.defineJSON.standbyDefine.valueSource == "SQL"?true:false'>
                    <Col span='10'><Input size="small" v-model = 'param.defineJSON.defalutDefine.value'><span slot="prepend">值</span></Input></Col>
                    <Col span='10'><Input size="small" v-model = 'param.defineJSON.defalutDefine.key'><span slot="prepend">码值</span></Input></Col>
                </FormItem>
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "tree"?true:false'>
                   tree
            </Col>            
        </Row>
        <Row>
            <Col span="24" style='text-align:center'>
                <FormItem>
                    <Button type="primary" @click="createParam('param')">Submit</Button>
                    <Button type="ghost" @click="handleReset('param')" style="margin-left: 8px">Reset</Button>
                </FormItem>                
            </Col>
        </Row>     
  </Form>
</template>
<script>
import DatePicker from "./../paramcomponents/DatePicker"
import CodeMirror from "codemirror/lib/codemirror.js"
import "codemirror/mode/sql/sql.js"
import {mapGetters} from 'vuex'

// string 转 object
const stringToObject = str => {
  return JSON.stringify(str)
}
// object 转 string
const objectToString = obj => {
  return JSON.parse(obj)
}
export default {
     name:'createDatasource',
     components:{
       "datePicker":DatePicker
     },
    computed: {
      ...mapGetters({
        datasourceList: 'datasourceList',
      })
    },
    filters: {
      stringToObject,
      objectToString
    },
     data () {
        return {
        param:{   
            name:'',
            alias:'',
            desc:'This is param describe for creating param',
            defineJSON:{
              componenttype:'',
              valuetype:'',              
              defalutDefine:{key:"",value:""},
              /*defalutDefine:'',*/
              standbyDefine:{
                valueSource:'',
                values:[],
                dataSourceID:'',
              },
              formattype:'',
              datetime:''
            }
        },
        standbyData:{
            value:null,
            key:null
        },
        dateType:{
          date:"DaterangeShow",
          month:"monthShow"
        },
        editor1:null,
        ruleValidate:{
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            alias: [
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
            ],
            desc: [
                {required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
        }
    }
  },
  methods: {    
    // onChange(){
    //   this.$emit('input', stringToObject(this.param.defineJSON.defalutDefine))
    // },  
    createParam(param){
      let Vue = this;
      if(Vue.param.defineJSON.standbyDefine.valueSource == 'SQL'){
        Vue.param.defineJSON.standbyDefine.values.push(Vue.standbyData);
      }        
      var ClonedParam = JSON.parse(JSON.stringify(Vue.param));
      var defineJSON = JSON.stringify(ClonedParam.defineJSON);
      ClonedParam.defineJSON = defineJSON;
      Vue.$refs[param].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createParam",
              ClonedParam,
               function(){
                  Vue.$Message.success('新建成功!');
                  console.log(Vue.param);
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })   
    },
    handleReset (param) {
         let Vue = this;
         Vue.$refs[param].resetFields();
    },
    getDate(date){
        let Vue = this;
        Vue.param.defineJSON.datetime = date;
    },
    addStandByValue(){
        let Vue = this;
        let sdbData = {};
        sdbData.key = Vue.standbyData.key;
        sdbData.value = Vue.standbyData.value;
        Vue.param.defineJSON.standbyDefine.values.push(sdbData);
        Vue.standbyData.key = null;
        Vue.standbyData.value = null
    },
    initEditor(myTextarea1){
        let Vue = this;
        Vue.editor1 = CodeMirror.fromTextArea(myTextarea1,{
            lineNumbers: true, 
            mode: "text/x-mysql", 
            dragDrop:true,
            extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项 ,
        }); 
        Vue.editor1.on("change",function(){
            Vue.standbyData.value = Vue.editor1.getValue();
        });   
    },
    changeValueSource(currentValueSource){
        let Vue = this;
        if(currentValueSource == "SQL"){
            setTimeout(function(){
               var myTextarea1 = $("#standbyDefineEditor")[0];
               Vue.initEditor(myTextarea1);
            },50)
            
        }else{
            if(Vue.editor1 != null){
                $(".CodeMirror").remove();
                Vue.editor1 = null;
            }
            
        }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
