<template>   
   <Form id="createParam" ref="param" :model="param" :rules="ruleValidate" :label-width="90">
      <Row>
            <Col span="24"> 
             <FormItem label="参数名称" prop="name">
                <Input v-model="param.name" placeholder="输入名称" :disabled ='nameEdit'></Input>
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
                 <FormItem prop="formattype" v-if = "param.defineJSON.formattype == 'yyyy-MM-dd'?true:false">
                    <datePicker :dateType = 'dateType.date' @sentDate = 'getDate'></datePicker>           
                 </FormItem>
                 <FormItem prop="formattype" v-if = "param.defineJSON.formattype == 'yyyy-MM'?true:false">
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
                    <Col>
                      <Tag  @on-close="closeTag" 
                            v-for='el in param.defineJSON.standbyDefine.values'
                            checkable
                            closable 
                            type='dot'
                            color="green" 
                            :key='el.key'
                            :name='el.key'>
                          {{el.value}}/{{el.key}}
                      </Tag></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.value'><span slot="prepend">值</span>standbyData.standbyValue</Input></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.key'><span slot="prepend">码值</span>standbyData.standbyKey</Input></Col>
                    <Col span='4' style='padding-bottom:3px'><Button type="primary" size="small" @click='addStandByValue()'>添加</Button></Col>
                </FormItem>
                <FormItem label="缺省值" prop="defalutDefine"v-if = 'param.defineJSON.standbyDefine.valueSource == "static"?true:false'>
                    <Col span='12'>
                      <Select v-model = 'param.defineJSON.defalutDefine.key' placeholder="Select ..." @on-change='addDefaultDefine'>
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
                    <Col span='1'>码值</Col>
                    <Col span='10'>
                      <Select size="small" v-model = 'param.defineJSON.defalutDefine.key' @on-open-change='getStandByValue'>
                        <Option v-for="key in keyList" :value="key" :key="key">{{ key}}</Option>
                      </Select>
                    </Col>
                    <Col span='1' offset='1'>表现值</Col>
                    <Col span='10'>
                      <Select size="small" v-model = 'param.defineJSON.defalutDefine.value' @on-open-change='getStandByValue'>
                        <Option v-for="value in valueLsit" :value="value" :key="value">{{ value }}</Option>
                      </Select>
                    </Col>
                </FormItem>
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "tree"?true:false'>
                   tree
            </Col>            
        </Row>
        <Row>
            <Col span="24" style='text-align:center'>
                <FormItem>
                    <Button type="primary" @click="createParam('param')">提交</Button>
                    <Button type="ghost" @click="handleReset('param')" style="margin-left: 8px">重置</Button>
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


export default {
     name:'createDatasource',
     components:{
       "datePicker":DatePicker
     },
    computed: {
      ...mapGetters({
        datasourceList: 'datasourceList',
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
     data () {
        return {
        param:null,
        standByisInit:true,
        standbyData:{
            value:null,
            key:null
        },
        keyList:[],
        valueLsit:[],
        dateType:{
          date:"DaterangeShow",
          month:"monthShow"
        },
        editor1:null,
        isCreate:true,
        ruleValidate:{
            name: [
              { required: true, message: '名称不能为空'}
            ],
            alias: [
              { required: true, message: '别名不能为空'}
            ],
            // componenttype:[
            //   { required :true, message:'不能为空',trigger:'change'}
            // ]
        }
    }
  },
  methods: {      
    createParam(param){
      let Vue = this;
      if(Vue.param.defineJSON.standbyDefine.valueSource == 'SQL'){
        //Vue.param.defineJSON.standbyDefine.values.push(Vue.standbyData);
        Vue.param.defineJSON.standbyDefine.values = Vue.standbyData.value
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
                 Vue.closePage(event,'createParam');
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })   
    },
    closePage(event, name){
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
    handleReset (param) {
         let Vue = this;
         Vue.$refs[param].resetFields();
    },
    getDate(date){
        let Vue = this;
        Vue.param.defineJSON.datetime = date;
    },
    addDefaultDefine(key){
      let Vue = this;
      let stdValues = Vue.param.defineJSON.standbyDefine.values;
      for(var i in stdValues){
         if(stdValues[i].key == key){
           Vue.param.defineJSON.defalutDefine.value = stdValues[i].value;
         }
      }
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
    closeTag(event, name){
      let Vue = this;
      let standbyArray = Vue.param.defineJSON.standbyDefine.values;
      for(var i in standbyArray){
        if(standbyArray[i].key == name){
          standbyArray.splice(i,1);
          break;          
        }
      }
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
            Vue.standByisInit = true;
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
    },
    getStandByValue(isOpen){
      let Vue = this;
      let expr = this.standbyData.value;
      let dataSourceId = Vue.param.defineJSON.standbyDefine.dataSourceID;
      if(isOpen && Vue.standByisInit && expr && dataSourceId){
        Vue.keyList = [];
        Vue.valueLsit = [];
        let params = {
          'dataSourceId':dataSourceId,
          'expStr':expr
        }
         Vue.AxiosPost("getSqlStandBy",params,
               function(response){
                 if(response.data.success){
                   let standby = response.data.content;
                   for(let i = 0; i < standby.length; i++){
                     Vue.keyList.push(standby[i].key);
                     Vue.valueLsit.push(standby[i].value);
                   }
                   Vue.standByisInit = false;
                 }
               });

        
        

      }
      
    },
    initParamData(to,from){
      let Vue = this;      
      Vue.isCreate =  $.isEmptyObject(to.params)
      if(!Vue.isCreate){        
        if(to.params != null){
          Vue.param = to.params;
          let paramsJSON = Vue.param.defineJSON;
          Vue.param.defineJSON = JSON.parse(paramsJSON);
        }
      }
      if(Vue.isCreate){
        Vue.param = {   
            name:'',
            alias:'',
            desc:'...',
            defineJSON:{
              componenttype:'',
              valuetype:'',              
              defalutDefine:{key:"",value:""},
              standbyDefine:{
                valueSource:'',
                values:[],
                dataSourceID:'',
              },
              formattype:'',
              datetime:''
            }
        } 
      }   
    }
  },
  beforeMount(){
    let Vue = this;
    Vue.initParamData(Vue.$route/*,{fullPath:'/*'}*/);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

